import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { deleteFromCloudinaryUrl, deleteMultipleCloudinaryUrls } from '@/lib/cloudinary';

const updateCompanySchema = z.object({
  name: z.string().trim().min(2, 'Company name must be at least 2 characters').optional(),
  website: z.string().url('Invalid website URL').optional().nullable().or(z.literal('')),
  logoUrl: z.string().url('Invalid logo URL').optional().nullable().or(z.literal('')),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  industry: z.string().trim().optional().nullable(),
  location: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
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
                offers: true,
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
      include: { company: true },
    });

    if (!recruiter || !recruiter.company) {
      return errorResponse('Recruiter profile or company not found', 404);
    }

    const body = await req.json();
    const parsedData = updateCompanySchema.parse(body);

    const oldLogoUrl = recruiter.company.logoUrl;
    const oldImages = recruiter.company.images || [];

    const newLogoUrl =
      parsedData.logoUrl !== undefined ? (parsedData.logoUrl || null) : undefined;
    const newImages = parsedData.images;

    const updatedCompany = await prisma.company.update({
      where: { id: recruiter.companyId },
      data: {
        ...(parsedData.name ? { name: parsedData.name } : {}),
        ...(parsedData.website !== undefined ? { website: parsedData.website || null } : {}),
        ...(newLogoUrl !== undefined ? { logoUrl: newLogoUrl } : {}),
        ...(newImages !== undefined ? { images: newImages } : {}),
        ...(parsedData.industry !== undefined ? { industry: parsedData.industry || null } : {}),
        ...(parsedData.location !== undefined ? { location: parsedData.location || null } : {}),
        ...(parsedData.description !== undefined ? { description: parsedData.description || null } : {}),
      },
    });

    // Cloudinary Cleanup: Delete old logo if replaced or removed
    if (newLogoUrl !== undefined && oldLogoUrl && oldLogoUrl !== newLogoUrl) {
      deleteFromCloudinaryUrl(oldLogoUrl, 'image').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_CLEANUP_LOGO_ERROR]', err);
      });
    }

    // Cloudinary Cleanup: Delete removed gallery images
    if (newImages !== undefined && oldImages.length > 0) {
      const removedImages = oldImages.filter((img) => !newImages.includes(img));
      if (removedImages.length > 0) {
        deleteMultipleCloudinaryUrls(removedImages, 'image').catch((err) => {
          console.error('[BACKGROUND_CLOUDINARY_CLEANUP_COMPANY_IMAGES_ERROR]', err);
        });
      }
    }

    return successResponse(updatedCompany, 'Company details and images updated successfully');
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
