import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { verifyCollegeSchema } from '@/lib/validations/admin.schema';

/**
 * PATCH /api/admin/colleges/[id]/verify
 * Verify or unverify an institution/college by Super Admin.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      return errorResponse('College not found', 404);
    }

    let isVerified: boolean;

    try {
      const body = await req.json();
      const validatedData = verifyCollegeSchema.parse(body);
      isVerified =
        validatedData.isVerified !== undefined
          ? validatedData.isVerified
          : !college.isVerified;
    } catch {
      // If empty body passed, toggle existing status
      isVerified = !college.isVerified;
    }

    const updatedCollege = await prisma.college.update({
      where: { id },
      data: { isVerified },
      select: {
        id: true,
        name: true,
        code: true,
        domain: true,
        city: true,
        state: true,
        logoUrl: true,
        isVerified: true,
        updatedAt: true,
      },
    });

    return successResponse(
      updatedCollege,
      `College "${updatedCollege.name}" has been ${isVerified ? 'verified' : 'unverified'} successfully`
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[VERIFY_COLLEGE_ERROR]', error);
    return errorResponse(error.message || 'Failed to update college verification status', 500);
  }
}
