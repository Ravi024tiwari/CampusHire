import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/admin/companies/[id]
 * Returns core details, associated recruiters, placement drives history, offers, and hiring metrics.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        recruiters: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            designation: true,
            createdAt: true,
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
          },
        },
        jobs: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            type: true,
            status: true,
            location: true,
            salaryPackage: true,
            minCgpa: true,
            allowedBranches: true,
            eligibleBatches: true,
            deadline: true,
            createdAt: true,
            college: {
              select: {
                id: true,
                name: true,
                code: true,
                city: true,
              },
            },
            _count: {
              select: {
                applications: true,
                offers: true,
              },
            },
          },
        },
        offers: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            designation: true,
            salaryPackage: true,
            location: true,
            status: true,
            letterUrl: true,
            joiningDate: true,
            acceptedAt: true,
            declinedAt: true,
            createdAt: true,
            job: {
              select: {
                id: true,
                title: true,
              },
            },
            college: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
            student: {
              select: {
                id: true,
                enrollmentNumber: true,
                branch: true,
                batchYear: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!company) {
      return errorResponse('Company not found', 404);
    }

    // Calculate aggregated metrics
    const totalJobs = company.jobs.length;
    const activeJobs = company.jobs.filter((j) => j.status === 'ACTIVE').length;
    const totalApplicants = company.jobs.reduce(
      (sum, j) => sum + j._count.applications,
      0
    );
    const totalOffersIssued = company.offers.length;
    const totalOffersAccepted = company.offers.filter(
      (o) => o.status === 'ACCEPTED'
    ).length;

    return successResponse(
      {
        company: {
          id: company.id,
          name: company.name,
          website: company.website,
          logoUrl: company.logoUrl,
          industry: company.industry,
          location: company.location,
          description: company.description,
          isVerified: company.isVerified,
          createdAt: company.createdAt,
          updatedAt: company.updatedAt,
          recruiters: company.recruiters,
          jobs: company.jobs,
          offers: company.offers,
        },
        metrics: {
          totalRecruiters: company.recruiters.length,
          totalJobsPosted: totalJobs,
          activeJobsCount: activeJobs,
          totalApplicantsReceived: totalApplicants,
          totalOffersIssued,
          totalOffersAccepted,
          offerAcceptanceRate:
            totalOffersIssued > 0
              ? `${((totalOffersAccepted / totalOffersIssued) * 100).toFixed(1)}%`
              : '0%',
        },
      },
      'Company details and performance metrics retrieved successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_COMPANY_DETAILS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch company details', 500);
  }
}
