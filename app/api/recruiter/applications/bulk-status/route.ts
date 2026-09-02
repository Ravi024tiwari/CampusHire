import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { bulkUpdateApplicationStatusSchema } from '@/lib/validations/application.schema';

/**
 * PATCH /api/recruiter/applications/bulk-status
 * Bulk update application status for multiple candidates across the hiring pipeline.
 * e.g., Move 20 candidates from APPLIED -> SHORTLISTED or INTERVIEW_SCHEDULED with 1 click.
 */
export async function PATCH(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { company: true },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const body = await req.json();
    const { applicationIds, status, notes } = bulkUpdateApplicationStatusSchema.parse(body);

    // Security Check: Verify that all selected applications belong to jobs of this recruiter's company
    const applications = await prisma.application.findMany({
      where: {
        id: { in: applicationIds },
        job: { companyId: recruiter.companyId },
      },
      select: { id: true, studentId: true },
    });

    if (applications.length === 0) {
      return errorResponse('No matching applications found for your company', 404);
    }

    const validIds = applications.map((a) => a.id);

    // Perform bulk status update
    const updateResult = await prisma.application.updateMany({
      where: {
        id: { in: validIds },
      },
      data: {
        status,
        ...(notes !== undefined ? { notes } : {}),
      },
    });

    return successResponse(
      {
        updatedCount: updateResult.count,
        targetStatus: status,
        updatedIds: validIds,
      },
      `Successfully updated ${updateResult.count} candidates to "${status}"`
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[BULK_UPDATE_APPLICATION_STATUS_ERROR]', error);
    return errorResponse(error.message || 'Failed to update applications', 500);
  }
}
