import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { updateJobStatusSchema } from '@/lib/validations/job.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);
    const { id } = await context.params;

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

    const existingJob = await prisma.job.findUnique({
      where: { id },
      select: { id: true, collegeId: true, status: true, title: true },
    });

    if (!existingJob) {
      return errorResponse('Job drive not found', 404);
    }

    // Security Check: Verify job belongs to TPO's college
    if (existingJob.collegeId !== tpo.collegeId) {
      return errorResponse('Access denied. You can only manage jobs for your college.', 403);
    }

    const body = await req.json();
    const parsedData = updateJobStatusSchema.parse(body);

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        status: parsedData.status,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    const statusMessage =
      parsedData.status === 'ACTIVE'
        ? `Placement drive "${updatedJob.title}" has been approved and is now visible to eligible students.`
        : `Placement drive status updated to ${parsedData.status}.`;

    return successResponse(updatedJob, statusMessage);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[UPDATE_TPO_JOB_STATUS_ERROR]', error);
    return errorResponse(error.message || 'Failed to update job status', 500);
  }
}
