import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { updateApplicationStatusSchema } from '@/lib/validations/application.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);
    const { id: applicationId } = await context.params;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          select: {
            id: true,
            companyId: true,
            title: true,
          },
        },
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    // Security Check: Verify recruiter's company owns this job
    if (application.job.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. You cannot modify applications for other companies.', 403);
    }

    const body = await req.json();
    const parsedData = updateApplicationStatusSchema.parse(body);

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: parsedData.status,
        ...(parsedData.notes !== undefined ? { notes: parsedData.notes } : {}),
      },
    });

    return successResponse(
      updatedApplication,
      `Application for ${application.student.user.name} moved to ${parsedData.status}`
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[UPDATE_APPLICATION_STATUS_ERROR]', error);
    return errorResponse(error.message || 'Failed to update application status', 500);
  }
}
