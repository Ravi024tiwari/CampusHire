import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const verifyCollegeSchema = z.object({
  isVerified: z.boolean({ required_error: 'isVerified boolean is required' }),
  reason: z.string().optional(),
});

/**
 * PATCH /api/admin/colleges/[id]/verify
 * Super Admin endpoint to approve (isVerified: true) or revoke/reject (isVerified: false) a College entity.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const body = await req.json();
    const { isVerified, reason } = verifyCollegeSchema.parse(body);

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        tpos: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!college) {
      return errorResponse('College not found', 404);
    }

    const updatedCollege = await prisma.college.update({
      where: { id },
      data: {
        isVerified,
      },
      include: {
        tpos: {
          select: {
            id: true,
            designation: true,
            department: true,
            isActive: true,
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

    const actionText = isVerified ? 'verified & approved' : 'verification revoked';

    return successResponse(
      {
        college: updatedCollege,
        verifiedAt: new Date().toISOString(),
        reason: reason || null,
      },
      `College "${college.name}" has been ${actionText} successfully.`
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to update college verification status', '[VERIFY_COLLEGE_ERROR]');
  }
}
