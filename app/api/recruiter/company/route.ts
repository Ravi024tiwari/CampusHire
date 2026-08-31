import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const updateCompanySchema = z.object({
  name: z.string().trim().min(2, 'Company name must be at least 2 characters').optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  industry: z.string().trim().optional(),
  location: z.string().trim().optional(),
  description: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        company: {
          include: {
            _count: {
              select: {
                jobs: true,
                recruiters: true,
              },
            },
          },
        },
      },
    });

    if (!recruiter || !recruiter.company) {
      return errorResponse('Company not found for this recruiter', 404);
    }

    return successResponse(recruiter.company, 'Company profile fetched successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_COMPANY_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch company profile', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const body = await req.json();
    const parsedData = updateCompanySchema.parse(body);

    const updatedCompany = await prisma.company.update({
      where: { id: recruiter.companyId },
      data: {
        ...(parsedData.name ? { name: parsedData.name } : {}),
        ...(parsedData.website !== undefined ? { website: parsedData.website || null } : {}),
        ...(parsedData.logoUrl !== undefined ? { logoUrl: parsedData.logoUrl || null } : {}),
        ...(parsedData.industry !== undefined ? { industry: parsedData.industry || null } : {}),
        ...(parsedData.location !== undefined ? { location: parsedData.location || null } : {}),
        ...(parsedData.description !== undefined ? { description: parsedData.description || null } : {}),
      },
    });

    return successResponse(updatedCompany, 'Company details updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[UPDATE_COMPANY_ERROR]', error);
    return errorResponse(error.message || 'Failed to update company profile', 500);
  }
}
