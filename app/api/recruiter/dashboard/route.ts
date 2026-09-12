import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser, verifyToken } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate user from session cookie or Authorization Bearer header
    let session = await getSessionUser();

    if (!session) {
      const authHeader = req.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        session = await verifyToken(token);
      }
    }

    if (!session || session.role !== 'RECRUITER') {
      return errorResponse('Unauthorized: Recruiter access required', 401);
    }

    // 2. Fetch Recruiter Profile and Company
    const recruiterProfile = await prisma.recruiterProfile.findUnique({
      where: { userId: session.userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            isActive: true,
            createdAt: true,
          },
        },
        company: {
          include: {
            recruiters: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                    isActive: true,
                  },
                },
              },
              orderBy: { createdAt: 'desc' },
            },
            jobs: {
              include: {
                college: {
                  select: {
                    id: true,
                    name: true,
                    code: true,
                    city: true,
                    state: true,
                    logoUrl: true,
                  },
                },
                _count: {
                  select: {
                    applications: true,
                    offers: true,
                  },
                },
              },
              orderBy: { createdAt: 'desc' },
              take: 10,
            },
          },
        },
      },
    });

    if (!recruiterProfile || !recruiterProfile.company) {
      return errorResponse(
        'Recruiter profile or associated corporate partner record not found.',
        404
      );
    }

    const { company, user } = recruiterProfile;

    // 3. Time boundaries for MoM calculations and rolling 6 months
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const rollingMonths: { month: string; startDate: Date; endDate: Date }[] = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      rollingMonths.push({
        month: MONTH_NAMES[start.getMonth()],
        startDate: start,
        endDate: end,
      });
    }
    const sixMonthsAgo = rollingMonths[0].startDate;

    // 4. Compute Live Aggregated Real KPIs & Applications
    const [
      totalJobsCount,
      jobsThisMonthCount,
      totalApplicationsCount,
      appsThisMonthCount,
      appsPrevMonthCount,
      shortlistedCount,
      interviewCount,
      offersCount,
      applications,
      scheduledInterviews,
      pastSixMonthsApps,
      statusGroups,
    ] = await Promise.all([
      // Jobs
      prisma.job.count({ where: { companyId: company.id } }),
      prisma.job.count({ where: { companyId: company.id, createdAt: { gte: startOfCurrentMonth } } }),
      // Applications
      prisma.application.count({ where: { job: { companyId: company.id } } }),
      prisma.application.count({ where: { job: { companyId: company.id }, createdAt: { gte: startOfCurrentMonth } } }),
      prisma.application.count({ where: { job: { companyId: company.id }, createdAt: { gte: startOfPrevMonth, lt: startOfCurrentMonth } } }),
      prisma.application.count({
        where: {
          job: { companyId: company.id },
          status: 'SHORTLISTED',
        },
      }),
      prisma.application.count({
        where: {
          job: { companyId: company.id },
          status: 'INTERVIEW_SCHEDULED',
        },
      }),
      // Offers
      prisma.offer.count({ where: { companyId: company.id } }),
      // Recent Applications (Latest 10)
      prisma.application.findMany({
        where: {
          job: {
            companyId: company.id,
          },
        },
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
              college: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
          job: {
            select: {
              id: true,
              title: true,
              salaryPackage: true,
              type: true,
              college: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      // Upcoming / Scheduled Interviews
      prisma.application.findMany({
        where: {
          job: { companyId: company.id },
          status: 'INTERVIEW_SCHEDULED',
        },
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatarUrl: true,
                },
              },
            },
          },
          job: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 6,
      }),
      // Rolling 6-month trends
      prisma.application.findMany({
        where: {
          job: { companyId: company.id },
          createdAt: { gte: sixMonthsAgo },
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      }),
      // Group by status
      prisma.application.groupBy({
        by: ['status'],
        where: {
          job: { companyId: company.id },
        },
        _count: {
          status: true,
        },
      }),
    ]);

    // 5. Growth Badges & Percentage Calculations
    const jobsGrowth = jobsThisMonthCount > 0 ? `+${jobsThisMonthCount} this month` : '0 this month';

    let applicationsGrowth = '0% vs last month';
    if (appsPrevMonthCount === 0) {
      applicationsGrowth = appsThisMonthCount > 0 ? `+${appsThisMonthCount} this month` : '0% vs last month';
    } else {
      const growthPct = Math.round(((appsThisMonthCount - appsPrevMonthCount) / appsPrevMonthCount) * 100);
      applicationsGrowth = `${growthPct >= 0 ? '+' : ''}${growthPct}% vs last month`;
    }

    const shortlistedPercent = totalApplicationsCount > 0 
      ? `${Math.round((shortlistedCount / totalApplicationsCount) * 100)}% of total` 
      : '0% of total';
    const interviewsPercent = totalApplicationsCount > 0 
      ? `${((interviewCount / totalApplicationsCount) * 100).toFixed(1)}% of total` 
      : '0% of total';
    const offersPercent = totalApplicationsCount > 0 
      ? `${((offersCount / totalApplicationsCount) * 100).toFixed(1)}% of total` 
      : '0% of total';

    // 6. Monthly Application Trends (Grouped into rolling 6 months)
    const applicationTrends = rollingMonths.map(({ month, startDate, endDate }) => {
      const monthApps = pastSixMonthsApps.filter(
        (a) => a.createdAt >= startDate && a.createdAt < endDate
      );
      const appCount = monthApps.length;
      const shortCount = monthApps.filter(
        (a) => a.status === 'SHORTLISTED' || a.status === 'INTERVIEW_SCHEDULED' || a.status === 'OFFERED' || a.status === 'ACCEPTED'
      ).length;
      return {
        month,
        applications: appCount,
        shortlisted: shortCount,
      };
    });

    // 7. Status Breakdown
    const statusCountsMap: Record<string, number> = {};
    statusGroups.forEach((g) => {
      statusCountsMap[g.status] = g._count.status;
    });

    const appliedCount = statusCountsMap['APPLIED'] || 0;
    const underReviewCount = statusCountsMap['UNDER_REVIEW'] || 0;
    const shortlistedStatusCount = statusCountsMap['SHORTLISTED'] || 0;
    const interviewingCount = statusCountsMap['INTERVIEW_SCHEDULED'] || 0;
    const offersStatusCount = (statusCountsMap['OFFERED'] || 0) + (statusCountsMap['ACCEPTED'] || 0);
    const rejectedStatusCount = (statusCountsMap['REJECTED'] || 0) + (statusCountsMap['DECLINED'] || 0);

    const calcPercent = (count: number) =>
      totalApplicationsCount > 0 ? Math.round((count / totalApplicationsCount) * 100) : 0;

    const statusBreakdown = [
      { key: 'APPLIED', label: 'Applied', count: appliedCount, percentage: calcPercent(appliedCount), color: '#3B82F6' },
      { key: 'UNDER_REVIEW', label: 'Under Review', count: underReviewCount, percentage: calcPercent(underReviewCount), color: '#F59E0B' },
      { key: 'SHORTLISTED', label: 'Shortlisted', count: shortlistedStatusCount, percentage: calcPercent(shortlistedStatusCount), color: '#8B5CF6' },
      { key: 'INTERVIEWING', label: 'Interviewing', count: interviewingCount, percentage: calcPercent(interviewingCount), color: '#10B981' },
      { key: 'OFFERS', label: 'Offers', count: offersStatusCount, percentage: calcPercent(offersStatusCount), color: '#EF4444' },
      { key: 'REJECTED', label: 'Rejected', count: rejectedStatusCount, percentage: calcPercent(rejectedStatusCount), color: '#64748B' },
    ];

    // 8. Format Real Recent Applications
    const formattedRecentApplications = applications.map((app) => ({
      id: app.id,
      candidateName: app.student.user.name,
      candidateAvatar: app.student.user.avatarUrl,
      email: app.student.user.email,
      branch: app.student.branch || 'General',
      batchYear: app.student.batchYear || new Date().getFullYear(),
      cgpa: app.student.cgpa,
      collegeName: app.student.college?.name || 'Affiliated Campus',
      jobId: app.job.id,
      jobTitle: app.job.title,
      jobType: app.job.type === 'FULL_TIME' ? 'Full Time' : app.job.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE',
      appliedOn: new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: app.status === 'INTERVIEW_SCHEDULED' ? 'INTERVIEWING' : app.status,
    }));

    // 9. Format Real Upcoming Interviews
    const formattedUpcomingInterviews = scheduledInterviews.map((item) => ({
      id: item.id,
      candidateName: item.student.user.name,
      candidateAvatar: item.student.user.avatarUrl,
      branch: item.student.branch || 'General',
      batchYear: item.student.batchYear || new Date().getFullYear(),
      jobTitle: item.job.title,
      scheduledAt: new Date(item.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'CONFIRMED',
    }));

    return successResponse(
      {
        company: {
          id: company.id,
          name: company.name,
          logoUrl: company.logoUrl,
          website: company.website,
          industry: company.industry,
          location: company.location,
          description: company.description,
          isVerified: company.isVerified,
          images: company.images || [],
        },
        currentRecruiter: {
          id: recruiterProfile.id,
          name: user.name,
          email: user.email,
          designation: recruiterProfile.designation || 'Lead Technical Recruiter',
          avatarUrl: user.avatarUrl,
        },
        teamMembers: company.recruiters.map((r) => ({
          id: r.id,
          name: r.user.name,
          email: r.user.email,
          designation: r.designation || 'Campus Recruiter',
          avatarUrl: r.user.avatarUrl,
          isActive: r.user.isActive,
        })),
        kpis: {
          totalJobs: totalJobsCount,
          jobsGrowth,
          totalApplications: totalApplicationsCount,
          applicationsGrowth,
          shortlisted: shortlistedCount,
          shortlistedPercent,
          interviews: interviewCount,
          interviewsPercent,
          offers: offersCount,
          offersPercent,
          // Backward-compat aliases
          activeDrives: totalJobsCount,
          totalApplicants: totalApplicationsCount,
          shortlistedCandidates: shortlistedCount,
          confirmedHires: offersCount,
        },
        applicationTrends,
        statusBreakdown,
        recentApplications: formattedRecentApplications,
        upcomingInterviews: formattedUpcomingInterviews,
        recentJobs: company.jobs,
      },
      'Recruiter dashboard data retrieved successfully'
    );
  } catch (error: any) {
    return handleApiError(
      error,
      'Failed to load recruiter company dashboard',
      '[GET_RECRUITER_DASHBOARD_ERROR]'
    );
  }
}

