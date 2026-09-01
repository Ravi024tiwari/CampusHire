import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { verifyCompanySchema } from '@/lib/validations/admin.schema';

/**
 * PATCH /api/admin/companies/[id]/verify
 * Toggle or explicitly update company verification status by Super Admin.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: { recruiters: true, jobs: true },
        },
      },
    });

    if (!company) {
      return errorResponse('Company not found', 404);
    }

    let isVerified: boolean;

    try {
      const body = await req.json();
      const validatedData = verifyCompanySchema.parse(body);
      // If explicit boolean provided in body use that; otherwise toggle
      isVerified =
        validatedData.isVerified !== undefined
          ? validatedData.isVerified
          : !company.isVerified;
    } catch {
      // If empty body passed, toggle existing status
      isVerified = !company.isVerified;
    }

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: { isVerified },
      select: {
        id: true,
        name: true,
        website: true,
        logoUrl: true,
        industry: true,
        location: true,
        isVerified: true,
        updatedAt: true,
      },
    });

    return successResponse(
      updatedCompany,
      `Company "${updatedCompany.name}" has been ${isVerified ? 'verified' : 'unverified'} successfully`
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[VERIFY_COMPANY_ERROR]', error);
    return errorResponse(error.message || 'Failed to update company verification status', 500);
  }
}
