import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const updateTpoMemberSchema = z.object({
  designation: z.string().trim().min(2).optional(),
  department: z.string().trim().min(2).optional(),
  isActive: z.boolean().optional(),
});

/**
 * PATCH /api/tpo/team/[id]
 * Update designation, department, or activate/deactivate an appointed TPO officer.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const callerTpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!callerTpo || !callerTpo.collegeId) {
      return errorResponse('Caller TPO or linked college not found', 404);
    }

    const targetTpo = await prisma.tpoProfile.findUnique({
      where: { id },
    });

    if (!targetTpo) {
      return errorResponse('Target placement officer not found', 404);
    }

    // Strict boundary: Must belong to the same college
    if (targetTpo.collegeId !== callerTpo.collegeId) {
      return errorResponse('Access denied. You cannot modify officers from another institution.', 403);
    }

    const body = await req.json();
    const validatedData = updateTpoMemberSchema.parse(body);

    const updated = await prisma.tpoProfile.update({
      where: { id },
      data: {
        ...(validatedData.designation ? { designation: validatedData.designation } : {}),
        ...(validatedData.department ? { department: validatedData.department } : {}),
        ...(validatedData.isActive !== undefined ? { isActive: validatedData.isActive } : {}),
        ...(validatedData.isActive === false ? { tenureEnd: new Date() } : {}),
        ...(validatedData.isActive === true ? { tenureEnd: null } : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return successResponse(
      updated,
      `Officer ${updated.user.name} details updated successfully.`
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to update placement officer', '[PATCH_TPO_MEMBER_ERROR]');
  }
}

/**
 * DELETE /api/tpo/team/[id]
 * Remove an officer assignment from this college.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const callerTpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!callerTpo || !callerTpo.collegeId) {
      return errorResponse('Caller TPO or linked college not found', 404);
    }

    const targetTpo = await prisma.tpoProfile.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!targetTpo) {
      return errorResponse('Target placement officer not found', 404);
    }

    if (targetTpo.collegeId !== callerTpo.collegeId) {
      return errorResponse('Access denied. You cannot remove officers from another institution.', 403);
    }

    // Prevent self-deletion if they are the only officer
    if (targetTpo.userId === authUser.userId) {
      const activeCount = await prisma.tpoProfile.count({
        where: { collegeId: callerTpo.collegeId, isActive: true },
      });
      if (activeCount <= 1) {
        return errorResponse('Cannot remove the last active TPO officer. Appoint a successor first.', 400);
      }
    }

    // Unlink or delete the TPO profile
    await prisma.tpoProfile.delete({
      where: { id },
    });

    return successResponse({ deletedId: id }, 'Officer removed from college placement cell.');
  } catch (error: any) {
    return handleApiError(error, 'Failed to remove placement officer', '[DELETE_TPO_MEMBER_ERROR]');
  }
}
