import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const dashboardQuerySchema = z.object({
  timeframe: z.enum(['6m', '8m', '12m', '1y']).optional().default('8m'),
  limit: z.coerce.number().min(1).max(20).optional().default(5),
});

/**
 * Format relative time for real-time telemetry events
 */
function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

/**
 * Compute Month-over-Month Growth Percentage between two 30-day windows
 */
function computeMoMGrowth(currentWindow: number, previousWindow: number): number {
  if (previousWindow === 0) {
    return currentWindow > 0 ? 100 : 0;
  }
  return Math.round(((currentWindow - previousWindow) / previousWindow) * 100);
}

/**
 * GET /api/admin/dashboard
 * Production-Grade Super Admin Dashboard Aggregator.
 * 
 * Delivers 100% genuine database metrics:
 * 1. 6 Primary KPIs with authentic Month-over-Month (MoM) growth rates
 * 2. Real User Growth Timeline (Students, Recruiters, Colleges) over configurable months
 * 3. Authentic Applications by Status Distribution (Percentages & Counts for Donut Chart)
 * 4. Actual Top Recruiters ranked by job & application volumes
 * 5. Recent Students Feed with real College, Branch, & Placement Status
 * 6. Recent Recruiters Feed with actual Job Counts & Onboarding Dates
 * 7. Real-Time Platform Activity Stream aggregated from real DB events
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Enforce SUPER_ADMIN RBAC authorization
    await requireRole([Role.SUPER_ADMIN], req);

    // 2. Parse query parameters
    const { searchParams } = new URL(req.url);
    const query = dashboardQuerySchema.parse({
      timeframe: searchParams.get('timeframe') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
    });

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate());

    // 3. Parallel resilient query execution via Promise.allSettled
    const [
      studentsCountRes,
      studentsPastMonthCountRes,
      studentsPreviousMonthCountRes,
      recruitersCountRes,
      recruitersPastMonthCountRes,
      recruitersPreviousMonthCountRes,
      collegesCountRes,
      verifiedCollegesCountRes,
      verifiedCollegesPastMonthCountRes,
      verifiedCollegesPreviousMonthCountRes,
      jobsCountRes,
      activeJobsCountRes,
      activeJobsPastMonthCountRes,
      activeJobsPreviousMonthCountRes,
      applicationsCountRes,
      applicationsPastMonthCountRes,
      applicationsPreviousMonthCountRes,
      applicationsByStatusRes,
      offersCountRes,
      offersPastMonthCountRes,
      offersPreviousMonthCountRes,
      offersAcceptedCountRes,
      topCompaniesRes,
      recentStudentsRes,
      recentRecruitersRes,
      activityCollegesRes,
      activityJobsRes,
      activityOffersRes,
      activityApplicationsRes,
      activityRecruitersRes,
      pendingCollegesRes,
      verifiedCollegesRes,
    ] = await Promise.allSettled([
      // 1. Students Total & MoM Windows
      prisma.studentProfile.count(),
      prisma.studentProfile.count({ where: { createdAt: { gte: oneMonthAgo } } }),
      prisma.studentProfile.count({ where: { createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),

      // 2. Recruiters Total & MoM Windows
      prisma.recruiterProfile.count(),
      prisma.recruiterProfile.count({ where: { createdAt: { gte: oneMonthAgo } } }),
      prisma.recruiterProfile.count({ where: { createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),

      // 3. Colleges Total & Verified MoM Windows
      prisma.college.count(),
      prisma.college.count({ where: { isVerified: true } }),
      prisma.college.count({ where: { isVerified: true, createdAt: { gte: oneMonthAgo } } }),
      prisma.college.count({ where: { isVerified: true, createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),

      // 4. Jobs Total & Active MoM Windows
      prisma.job.count(),
      prisma.job.count({ where: { status: 'ACTIVE' } }),
      prisma.job.count({ where: { status: 'ACTIVE', createdAt: { gte: oneMonthAgo } } }),
      prisma.job.count({ where: { status: 'ACTIVE', createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),

      // 5. Applications Total & MoM Windows
      prisma.application.count(),
      prisma.application.count({ where: { createdAt: { gte: oneMonthAgo } } }),
      prisma.application.count({ where: { createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),

      // 6. Applications Grouped by Status
      prisma.application.groupBy({
        by: ['status'],
        _count: { id: true },
      }),

      // 7. Offers Total, Accepted, & MoM Windows
      prisma.offer.count(),
      prisma.offer.count({ where: { createdAt: { gte: oneMonthAgo } } }),
      prisma.offer.count({ where: { createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),
      prisma.offer.count({ where: { status: 'ACCEPTED' } }),

      // 8. Top Companies with Job & Application counts
      prisma.company.findMany({
        take: 5,
        orderBy: {
          jobs: { _count: 'desc' },
        },
        select: {
          id: true,
          name: true,
          logoUrl: true,
          _count: {
            select: {
              jobs: true,
              offers: true,
            },
          },
          jobs: {
            select: {
              _count: {
                select: { applications: true },
              },
            },
          },
        },
      }),

      // 9. Recent Students Onboarded
      prisma.studentProfile.findMany({
        take: query.limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          branch: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
              avatarUrl: true,
            },
          },
          college: {
            select: {
              name: true,
              code: true,
            },
          },
          offers: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            select: { status: true },
          },
          applications: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            select: { status: true },
          },
        },
      }),

      // 10. Recent Recruiters Onboarded
      prisma.recruiterProfile.findMany({
        take: query.limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              email: true,
              avatarUrl: true,
            },
          },
          company: {
            select: {
              name: true,
              logoUrl: true,
              _count: {
                select: { jobs: true },
              },
            },
          },
        },
      }),

      // 11. Activity Stream Sources (Colleges, Jobs, Offers, Applications, Recruiters)
      prisma.college.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, createdAt: true, isVerified: true },
      }),
      prisma.job.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: { 
          id: true, 
          title: true, 
          createdAt: true,
          company: { select: { name: true } },
          college: { select: { name: true } },
        },
      }),
      prisma.offer.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          designation: true,
          status: true,
          createdAt: true,
          student: {
            select: {
              user: { select: { name: true } },
              college: { select: { name: true } },
            },
          },
          company: { select: { name: true } },
        },
      }),
      prisma.application.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          createdAt: true,
          job: { select: { title: true, company: { select: { name: true } } } },
          student: { select: { user: { select: { name: true } } } },
        },
      }),
      prisma.recruiterProfile.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          user: { select: { name: true } },
          company: { select: { name: true } },
        },
      }),

      // 12. Pending Accreditation Queue
      prisma.college.findMany({
        where: { isVerified: false },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          logoUrl: true,
          createdAt: true,
        },
      }),

      // 13. Verified Colleges Directory
      prisma.college.findMany({
        where: { isVerified: true },
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          name: true,
          city: true,
          state: true,
          logoUrl: true,
          createdAt: true,
        },
      }),
    ]);

    // Extract Base KPI Counts directly from Database
    const totalStudents = studentsCountRes.status === 'fulfilled' ? studentsCountRes.value : 0;
    const studentsPastMonth = studentsPastMonthCountRes.status === 'fulfilled' ? studentsPastMonthCountRes.value : 0;
    const studentsPrevMonth = studentsPreviousMonthCountRes.status === 'fulfilled' ? studentsPreviousMonthCountRes.value : 0;

    const totalRecruiters = recruitersCountRes.status === 'fulfilled' ? recruitersCountRes.value : 0;
    const recruitersPastMonth = recruitersPastMonthCountRes.status === 'fulfilled' ? recruitersPastMonthCountRes.value : 0;
    const recruitersPrevMonth = recruitersPreviousMonthCountRes.status === 'fulfilled' ? recruitersPreviousMonthCountRes.value : 0;

    const verifiedCollegesCount = verifiedCollegesCountRes.status === 'fulfilled' ? verifiedCollegesCountRes.value : 0;
    const collegesPastMonth = verifiedCollegesPastMonthCountRes.status === 'fulfilled' ? verifiedCollegesPastMonthCountRes.value : 0;
    const collegesPrevMonth = verifiedCollegesPreviousMonthCountRes.status === 'fulfilled' ? verifiedCollegesPreviousMonthCountRes.value : 0;

    const activeJobsCount = activeJobsCountRes.status === 'fulfilled' ? activeJobsCountRes.value : 0;
    const jobsPastMonth = activeJobsPastMonthCountRes.status === 'fulfilled' ? activeJobsPastMonthCountRes.value : 0;
    const jobsPrevMonth = activeJobsPreviousMonthCountRes.status === 'fulfilled' ? activeJobsPreviousMonthCountRes.value : 0;

    const totalApplicationsCount = applicationsCountRes.status === 'fulfilled' ? applicationsCountRes.value : 0;
    const applicationsPastMonth = applicationsPastMonthCountRes.status === 'fulfilled' ? applicationsPastMonthCountRes.value : 0;
    const applicationsPrevMonth = applicationsPreviousMonthCountRes.status === 'fulfilled' ? applicationsPreviousMonthCountRes.value : 0;

    const totalOffersCount = offersCountRes.status === 'fulfilled' ? offersCountRes.value : 0;
    const offersPastMonth = offersPastMonthCountRes.status === 'fulfilled' ? offersPastMonthCountRes.value : 0;
    const offersPrevMonth = offersPreviousMonthCountRes.status === 'fulfilled' ? offersPreviousMonthCountRes.value : 0;

    const totalOffersAccepted = offersAcceptedCountRes.status === 'fulfilled' ? offersAcceptedCountRes.value : 0;
    const totalCollegesCount = collegesCountRes.status === 'fulfilled' ? collegesCountRes.value : 0;

    // Real MoM Growth Percentages
    const studentsMoMGrowth = computeMoMGrowth(studentsPastMonth, studentsPrevMonth);
    const recruitersMoMGrowth = computeMoMGrowth(recruitersPastMonth, recruitersPrevMonth);
    const collegesMoMGrowth = computeMoMGrowth(collegesPastMonth, collegesPrevMonth);
    const jobsMoMGrowth = computeMoMGrowth(jobsPastMonth, jobsPrevMonth);
    const applicationsMoMGrowth = computeMoMGrowth(applicationsPastMonth, applicationsPrevMonth);
    const offersMoMGrowth = computeMoMGrowth(offersPastMonth, offersPrevMonth);

    // --- 2. USER GROWTH DYNAMIC TIMELINE DATA ---
    const monthsCount = query.timeframe === '6m' ? 6 : query.timeframe === '12m' || query.timeframe === '1y' ? 12 : 8;
    const monthBuckets: { monthLabel: string; endOfM: Date }[] = [];
    
    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const endOfM = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
      const monthLabel = d.toLocaleString('en-US', { month: 'short' });
      monthBuckets.push({ monthLabel, endOfM });
    }

    // Query cumulative count per monthly checkpoint
    const userGrowth = await Promise.all(
      monthBuckets.map(async ({ monthLabel, endOfM }) => {
        try {
          const [stCount, recCount, colCount] = await Promise.all([
            prisma.studentProfile.count({ where: { createdAt: { lte: endOfM } } }),
            prisma.recruiterProfile.count({ where: { createdAt: { lte: endOfM } } }),
            prisma.college.count({ where: { isVerified: true, createdAt: { lte: endOfM } } }),
          ]);
          return {
            month: monthLabel,
            students: stCount,
            recruiters: recCount,
            colleges: colCount,
          };
        } catch {
          return {
            month: monthLabel,
            students: 0,
            recruiters: 0,
            colleges: 0,
          };
        }
      })
    );

    // --- 3. APPLICATIONS BY STATUS BREAKDOWN (Live from DB) ---
    const statusGroups = applicationsByStatusRes.status === 'fulfilled' ? applicationsByStatusRes.value : [];
    
    const statusConfigMap: Record<string, { label: string; color: string }> = {
      UNDER_REVIEW: { label: 'Under Review', color: '#0D8B8A' },
      SHORTLISTED: { label: 'Shortlisted', color: '#FBAB23' },
      INTERVIEW_SCHEDULED: { label: 'Interviewed', color: '#8B5CF6' },
      OFFERED: { label: 'Offered', color: '#10B981' },
      ACCEPTED: { label: 'Accepted', color: '#059669' },
      REJECTED: { label: 'Rejected', color: '#EF4444' },
      APPLIED: { label: 'Applied', color: '#06B6D4' },
      DECLINED: { label: 'Declined', color: '#94A3B8' },
    };

    // Calculate dynamic distribution
    const applicationsByStatus = Object.entries(statusConfigMap).map(([statusKey, config]) => {
      const found = statusGroups.find((g) => g.status === statusKey);
      const count = found?._count?.id || 0;
      const percentage = totalApplicationsCount > 0 ? Math.round((count / totalApplicationsCount) * 100) : 0;
      return {
        key: statusKey,
        label: config.label,
        count,
        percentage,
        color: config.color,
      };
    }).filter((item) => {
      if (totalApplicationsCount === 0) {
        return ['UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'REJECTED'].includes(item.key);
      }
      return item.count > 0 || ['UNDER_REVIEW', 'SHORTLISTED', 'OFFERED'].includes(item.key);
    });

    // --- 4. TOP RECRUITERS RANKED (Live from DB) ---
    const dbCompanies = topCompaniesRes.status === 'fulfilled' ? topCompaniesRes.value : [];
    const topRecruiters = dbCompanies.map((c) => {
      const totalApps = c.jobs.reduce((acc, j) => acc + (j._count?.applications || 0), 0);
      return {
        id: c.id,
        companyName: c.name,
        logoUrl: c.logoUrl || '/images/company/generic.svg',
        jobsCount: c._count?.jobs || 0,
        applicationsCount: totalApps,
      };
    });

    // --- 5. RECENT STUDENTS FEED (Live from DB) ---
    const dbStudents = recentStudentsRes.status === 'fulfilled' ? recentStudentsRes.value : [];
    const recentStudents = dbStudents.map((st) => {
      let statusText = 'Applied';
      if (st.offers?.length && st.offers[0].status === 'ACCEPTED') statusText = 'Placed';
      else if (st.offers?.length) statusText = 'Offered';
      else if (st.applications?.length && st.applications[0].status === 'SHORTLISTED') statusText = 'Shortlisted';
      else if (st.applications?.length && st.applications[0].status === 'INTERVIEW_SCHEDULED') statusText = 'Interview';

      return {
        id: st.id,
        name: st.user?.name || 'Student Candidate',
        avatarUrl: st.user?.avatarUrl || null,
        collegeName: st.college?.name || 'Partner Institute',
        branch: st.branch || 'Engineering',
        status: statusText,
        joinedAt: new Date(st.createdAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
    });

    // --- 6. RECENT RECRUITERS FEED (Live from DB) ---
    const dbRecruiters = recentRecruitersRes.status === 'fulfilled' ? recentRecruitersRes.value : [];
    const recentRecruiters = dbRecruiters.map((rec) => ({
      id: rec.id,
      companyName: rec.company?.name || rec.user?.name || 'Hiring Enterprise',
      logoUrl: rec.company?.logoUrl || '/images/company/generic.svg',
      jobsCount: rec.company?._count?.jobs || 0,
      joinedAt: new Date(rec.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    }));

    // --- 7. REAL-TIME PLATFORM ACTIVITY FEED (Live from DB) ---
    const rawEvents: Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      date: Date;
      icon: string;
      color: string;
    }> = [];

    // Recruiter registrations
    if (activityRecruitersRes.status === 'fulfilled') {
      activityRecruitersRes.value.forEach((rec) => {
        rawEvents.push({
          id: `rec-${rec.id}`,
          type: 'RECRUITER_REGISTERED',
          title: 'Recruiter onboarded',
          description: `${rec.user?.name || 'Corporate'} from ${rec.company?.name || 'Enterprise'}`,
          date: new Date(rec.createdAt),
          icon: 'Building2',
          color: 'text-rose-600 bg-rose-50 border-rose-200',
        });
      });
    }

    // College verification/registration
    if (activityCollegesRes.status === 'fulfilled') {
      activityCollegesRes.value.forEach((col) => {
        rawEvents.push({
          id: `col-${col.id}`,
          type: 'COLLEGE_VERIFICATION',
          title: col.isVerified ? 'College accredited' : 'New institution registration',
          description: col.name,
          date: new Date(col.createdAt),
          icon: 'GraduationCap',
          color: 'text-teal-700 bg-teal-50 border-teal-200',
        });
      });
    }

    // Job postings
    if (activityJobsRes.status === 'fulfilled') {
      activityJobsRes.value.forEach((jb) => {
        rawEvents.push({
          id: `jb-${jb.id}`,
          type: 'JOB_POSTED',
          title: 'New campus drive posted',
          description: `${jb.title} • ${jb.company?.name || 'Enterprise'}`,
          date: new Date(jb.createdAt),
          icon: 'Briefcase',
          color: 'text-purple-700 bg-purple-50 border-purple-200',
        });
      });
    }

    // Offers
    if (activityOffersRes.status === 'fulfilled') {
      activityOffersRes.value.forEach((off) => {
        rawEvents.push({
          id: `off-${off.id}`,
          type: 'OFFER_ACCEPTED',
          title: off.status === 'ACCEPTED' ? 'Offer accepted' : 'Offer released',
          description: `${off.student?.user?.name || 'Candidate'} (${off.designation})`,
          date: new Date(off.createdAt),
          icon: 'Award',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        });
      });
    }

    // Applications
    if (activityApplicationsRes.status === 'fulfilled') {
      activityApplicationsRes.value.forEach((app) => {
        rawEvents.push({
          id: `app-${app.id}`,
          type: 'APPLICATION_SUBMITTED',
          title: 'Application received',
          description: `${app.student?.user?.name || 'Student'} applied for ${app.job?.title || 'Position'}`,
          date: new Date(app.createdAt),
          icon: 'FileText',
          color: 'text-amber-700 bg-amber-50 border-amber-200',
        });
      });
    }

    // Sort by timestamp desc and take top 5
    rawEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
    const platformActivity = rawEvents.slice(0, 5).map((ev) => ({
      id: ev.id,
      type: ev.type,
      title: ev.title,
      description: ev.description,
      timeAgo: formatTimeAgo(ev.date),
      timestamp: ev.date.toISOString(),
      icon: ev.icon,
      color: ev.color,
    }));

    // --- 8. COMPOSE UNIFIED DASHBOARD PAYLOAD ---
    const payload = {
      kpis: {
        totalStudents,
        studentsMoMGrowth,
        totalRecruiters,
        recruitersMoMGrowth,
        verifiedColleges: verifiedCollegesCount,
        collegesMoMGrowth,
        activeJobs: activeJobsCount,
        jobsMoMGrowth,
        totalApplications: totalApplicationsCount,
        applicationsMoMGrowth,
        offersMade: totalOffersCount,
        offersMoMGrowth,
        
        // Backward-compatibility keys
        affiliatedCollegesCount: totalCollegesCount,
        verifiedCollegesCount,
        totalEnrolledStudents: totalStudents,
        totalPlacedStudents: totalOffersAccepted,
        totalPlacementDrives: activeJobsCount,
        activePlacementDrives: activeJobsCount,
        totalApplicationsSubmitted: totalApplicationsCount,
        totalOffersIssued: totalOffersCount,
        totalOffersAccepted,
      },
      userGrowth,
      applicationsByStatus,
      topRecruiters,
      recentStudents,
      recentRecruiters,
      platformActivity,
      pendingColleges: pendingCollegesRes.status === 'fulfilled' ? pendingCollegesRes.value : [],
      verifiedColleges: verifiedCollegesRes.status === 'fulfilled' ? verifiedCollegesRes.value : [],
    };

    return successResponse(payload, 'Super Admin Dashboard Telemetry retrieved successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[SUPER_ADMIN_DASHBOARD_API_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch dashboard data', 500);
  }
}

