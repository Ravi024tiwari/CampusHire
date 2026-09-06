import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, ApplicationStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/recruiter/applications
 * Returns all student applications submitted for jobs posted by the logged-in recruiter's company.
 * Supports rich filtering (jobId, status, collegeId, search, minCgpa, branch, batchYear, sortBy) and pagination.
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { company: true },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter company profile not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '15', 10)));
    const skip = (page - 1) * limit;

    const jobId = searchParams.get('jobId') || undefined;
    const status = searchParams.get('status') || undefined;
    const collegeId = searchParams.get('collegeId') || undefined;
    const search = searchParams.get('search')?.trim() || undefined;
    const minCgpa = searchParams.get('minCgpa') ? parseFloat(searchParams.get('minCgpa')!) : undefined;
    const branch = searchParams.get('branch')?.trim() || undefined;
    const batchYear = searchParams.get('batchYear') ? parseInt(searchParams.get('batchYear')!, 10) : undefined;
    const sortBy = searchParams.get('sortBy') || 'latest';

    // Base WHERE condition: only applications for jobs posted by this company
    const whereCondition: any = {
      job: {
        companyId: recruiter.companyId,
      },
    };

    // Filter by specific job
    if (jobId && jobId !== 'ALL') {
      whereCondition.jobId = jobId;
    }

    // Filter by application status
    if (status && status !== 'ALL') {
      whereCondition.status = status as ApplicationStatus;
    }

    // Filter by college
    if (collegeId && collegeId !== 'ALL') {
      whereCondition.student = {
        ...whereCondition.student,
        collegeId: collegeId,
      };
    }

    // Filter by minimum CGPA
    if (minCgpa !== undefined && !isNaN(minCgpa)) {
      whereCondition.student = {
        ...whereCondition.student,
        cgpa: { gte: minCgpa },
      };
    }

    // Filter by branch
    if (branch && branch !== 'ALL') {
      whereCondition.student = {
        ...whereCondition.student,
        branch: { contains: branch, mode: 'insensitive' },
      };
    }

    // Filter by batch year
    if (batchYear && !isNaN(batchYear)) {
      whereCondition.student = {
        ...whereCondition.student,
        batchYear: batchYear,
      };
    }

    // Search query across student name, email, enrollment, skills, or job title
    if (search) {
      whereCondition.OR = [
        {
          student: {
            user: {
              name: { contains: search, mode: 'insensitive' },
            },
          },
        },
        {
          student: {
            user: {
              email: { contains: search, mode: 'insensitive' },
            },
          },
        },
        {
          student: {
            enrollmentNumber: { contains: search, mode: 'insensitive' },
          },
        },
        {
          student: {
            skills: { hasSome: [search] },
          },
        },
        {
          job: {
            title: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    // Sort order mapping
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (sortBy === 'cgpa_desc') {
      orderBy = { student: { cgpa: 'desc' } };
    } else if (sortBy === 'cgpa_asc') {
      orderBy = { student: { cgpa: 'asc' } };
    } else if (sortBy === 'name_asc') {
      orderBy = { student: { user: { name: 'asc' } } };
    }

    // Execute queries in parallel
    const [applications, total, allCompanyApplications, companyJobs] = await Promise.all([
      // 1. Paginated filtered applications
      prisma.application.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy,
        include: {
          job: {
            select: {
              id: true,
              title: true,
              type: true,
              location: true,
              salaryPackage: true,
              skills: true,
              minCgpa: true,
              deadline: true,
              college: {
                select: {
                  id: true,
                  name: true,
                  city: true,
                  logoUrl: true,
                },
              },
            },
          },
          student: {
            select: {
              id: true,
              enrollmentNumber: true,
              branch: true,
              batchYear: true,
              cgpa: true,
              phone: true,
              bio: true,
              tenthMarks: true,
              twelfthMarks: true,
              skills: true,
              resumeUrl: true,
              linkedinUrl: true,
              githubUrl: true,
              portfolioUrl: true,
              isVerified: true,
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
                  city: true,
                  logoUrl: true,
                },
              },
            },
          },
          resume: {
            select: {
              id: true,
              title: true,
              fileUrl: true,
              fileSize: true,
            },
          },
          offer: {
            select: {
              id: true,
              designation: true,
              salaryPackage: true,
              location: true,
              status: true,
              joiningDate: true,
              letterUrl: true,
            },
          },
        },
      }),

      // 2. Total count for active filters
      prisma.application.count({
        where: whereCondition,
      }),

      // 3. Status aggregate for company stats KPIs
      prisma.application.findMany({
        where: {
          job: { companyId: recruiter.companyId },
        },
        select: {
          id: true,
          status: true,
          student: {
            select: {
              collegeId: true,
              college: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),

      // 4. Jobs list for filter dropdown
      prisma.job.findMany({
        where: { companyId: recruiter.companyId },
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          college: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Calculate aggregated stats
    const stats = {
      total: allCompanyApplications.length,
      applied: allCompanyApplications.filter((a) => a.status === 'APPLIED').length,
      underReview: allCompanyApplications.filter((a) => a.status === 'UNDER_REVIEW').length,
      shortlisted: allCompanyApplications.filter((a) => a.status === 'SHORTLISTED').length,
      interviewScheduled: allCompanyApplications.filter((a) => a.status === 'INTERVIEW_SCHEDULED').length,
      offered: allCompanyApplications.filter((a) => a.status === 'OFFERED').length,
      rejected: allCompanyApplications.filter((a) => a.status === 'REJECTED').length,
      accepted: allCompanyApplications.filter((a) => a.status === 'ACCEPTED').length,
      declined: allCompanyApplications.filter((a) => a.status === 'DECLINED').length,
    };

    // Extract unique colleges list from applications
    const collegeMap = new Map<string, { id: string; name: string }>();
    allCompanyApplications.forEach((app) => {
      if (app.student?.college) {
        collegeMap.set(app.student.college.id, {
          id: app.student.college.id,
          name: app.student.college.name,
        });
      }
    });
    const availableColleges = Array.from(collegeMap.values());

    const totalPages = Math.ceil(total / limit) || 1;

    return successResponse({
      applications,
      stats,
      availableJobs: companyJobs.map((j) => ({
        id: j.id,
        title: j.title,
        type: j.type,
        status: j.status,
        collegeName: j.college.name,
        applicationsCount: j._count.applications,
      })),
      availableColleges,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[GET_RECRUITER_APPLICATIONS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch candidate applications', 500);
  }
}
