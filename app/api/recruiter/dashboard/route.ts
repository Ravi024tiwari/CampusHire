import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser, verifyToken } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

/**
 * GET /api/recruiter/dashboard
 * Aggregated Company Hiring Command Telemetry for authenticated recruiters.
 * Resolves User -> RecruiterProfile -> Company Entity
 */
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

    // 3. Fetch applications for this company's jobs
    const recentApplications = await prisma.application.findMany({
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
    });

    // 4. Compute live aggregated KPIs
    const [totalApplicationsCount, shortlistedCount, offersAcceptedCount, totalJobsCount] = await Promise.all([
      prisma.application.count({
        where: {
          job: {
            companyId: company.id,
          },
        },
      }),
      prisma.application.count({
        where: {
          job: {
            companyId: company.id,
          },
          status: {
            in: ['SHORTLISTED', 'INTERVIEW_SCHEDULED'],
          },
        },
      }),
      prisma.offer.count({
        where: {
          job: {
            companyId: company.id,
          },
          status: 'ACCEPTED',
        },
      }),
      prisma.job.count({
        where: {
          companyId: company.id,
        },
      }),
    ]);

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
          designation: recruiterProfile.designation || 'Campus Recruiter',
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
          activeDrives: totalJobsCount,
          totalApplicants: totalApplicationsCount,
          shortlistedCandidates: shortlistedCount,
          confirmedHires: offersAcceptedCount,
        },
        recentJobs: company.jobs,
        recentApplications,
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
