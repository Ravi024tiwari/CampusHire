import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/recruiter/applications/[id]
 * Retrieves comprehensive details for a specific student application.
 * Ensures security by checking that the associated job belongs to the logged-in recruiter's company.
 * Also returns adjacent application IDs (previousId and nextId) for quick navigation.
 */
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);
    const { id: applicationId } = await context.params;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { company: true },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter company profile not found', 404);
    }

    // Fetch the target application with all related models
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            college: {
              select: {
                id: true,
                name: true,
                city: true,
                state: true,
                logoUrl: true,
              },
            },
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
                industry: true,
                location: true,
              },
            },
          },
        },
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
                city: true,
                state: true,
                logoUrl: true,
              },
            },
          },
        },
        resume: true,
        offer: true,
      },
    });

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    // Security Check: recruiter's company must own the job
    if (application.job.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. This application belongs to another company.', 403);
    }

    // Find adjacent applications for this company's jobs (for Previous / Next navigation buttons)
    const companyApplications = await prisma.application.findMany({
      where: {
        job: { companyId: recruiter.companyId },
      },
      select: { id: true },
      orderBy: { createdAt: 'desc' },
    });

    const currentIndex = companyApplications.findIndex((a) => a.id === applicationId);
    const previousId = currentIndex > 0 ? companyApplications[currentIndex - 1].id : null;
    const nextId = currentIndex < companyApplications.length - 1 ? companyApplications[currentIndex + 1].id : null;

    return successResponse({
      application,
      adjacent: {
        previousId,
        nextId,
        currentIndex: currentIndex + 1,
        total: companyApplications.length,
      },
    });
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[GET_RECRUITER_APPLICATION_DETAIL_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch application details', 500);
  }
}
