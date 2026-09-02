import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { deleteFromCloudinaryUrl, deleteMultipleCloudinaryUrls } from '@/lib/cloudinary';

const updateTpoProfileSchema = z.object({
  // TPO User fields
  name: z.string().trim().min(2, 'Name must be at least 2 characters').optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable().or(z.literal('')),
  designation: z.string().trim().min(2, 'Designation must be at least 2 characters').optional(),

  // Associated College fields
  collegeName: z.string().trim().min(2).optional(),
  collegeCode: z.string().trim().toUpperCase().optional().nullable(),
  collegeDomain: z.string().trim().toLowerCase().optional().nullable(),
  collegeCity: z.string().trim().optional().nullable(),
  collegeState: z.string().trim().optional().nullable(),
  collegeLogoUrl: z.string().url('Invalid college logo URL').optional().nullable().or(z.literal('')),
  collegeImages: z.array(z.string().url('Invalid campus photo URL')).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatarUrl: true,
            isActive: true,
            createdAt: true,
          },
        },
        college: {
          include: {
            _count: {
              select: {
                students: true,
                jobs: true,
                tpos: true,
                offers: true,
              },
            },
          },
        },
      },
    });

    if (!tpo) {
      return errorResponse('TPO profile not found', 404);
    }

    return successResponse(tpo, 'TPO profile fetched successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_TPO_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch TPO profile', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        user: true,
        college: true,
      },
    });

    if (!tpo || !tpo.college) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

    const body = await req.json();
    const parsedData = updateTpoProfileSchema.parse(body);

    const oldAvatarUrl = tpo.user.avatarUrl;
    const oldCollegeLogoUrl = tpo.college.logoUrl;
    const oldCollegeImages = tpo.college.images || [];

    const newAvatarUrl =
      parsedData.avatarUrl !== undefined ? (parsedData.avatarUrl || null) : undefined;
    const newCollegeLogoUrl =
      parsedData.collegeLogoUrl !== undefined ? (parsedData.collegeLogoUrl || null) : undefined;
    const newCollegeImages = parsedData.collegeImages;

    const updatedTpo = await prisma.$transaction(async (tx) => {
      // 1. Update TPO User name/avatar
      if (parsedData.name !== undefined || newAvatarUrl !== undefined) {
        await tx.user.update({
          where: { id: authUser.userId },
          data: {
            ...(parsedData.name !== undefined ? { name: parsedData.name } : {}),
            ...(newAvatarUrl !== undefined ? { avatarUrl: newAvatarUrl } : {}),
          },
        });
      }

      // 2. Update TPO designation
      if (parsedData.designation !== undefined) {
        await tx.tpoProfile.update({
          where: { id: tpo.id },
          data: { designation: parsedData.designation },
        });
      }

      // 3. Update College details & campus photos gallery
      const collegeUpdates: any = {};
      if (parsedData.collegeName) collegeUpdates.name = parsedData.collegeName;
      if (parsedData.collegeCode !== undefined) collegeUpdates.code = parsedData.collegeCode || null;
      if (parsedData.collegeDomain !== undefined) collegeUpdates.domain = parsedData.collegeDomain || null;
      if (parsedData.collegeCity !== undefined) collegeUpdates.city = parsedData.collegeCity || null;
      if (parsedData.collegeState !== undefined) collegeUpdates.state = parsedData.collegeState || null;
      if (newCollegeLogoUrl !== undefined) collegeUpdates.logoUrl = newCollegeLogoUrl;
      if (newCollegeImages !== undefined) collegeUpdates.images = newCollegeImages;

      if (Object.keys(collegeUpdates).length > 0) {
        await tx.college.update({
          where: { id: tpo.collegeId },
          data: collegeUpdates,
        });
      }

      return tx.tpoProfile.findUnique({
        where: { id: tpo.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatarUrl: true,
              isActive: true,
            },
          },
          college: true,
        },
      });
    });

    // Cloudinary Cleanup: Delete old avatar if replaced/removed
    if (newAvatarUrl !== undefined && oldAvatarUrl && oldAvatarUrl !== newAvatarUrl) {
      deleteFromCloudinaryUrl(oldAvatarUrl, 'image').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_CLEANUP_TPO_AVATAR_ERROR]', err);
      });
    }

    // Cloudinary Cleanup: Delete old college logo if replaced/removed
    if (newCollegeLogoUrl !== undefined && oldCollegeLogoUrl && oldCollegeLogoUrl !== newCollegeLogoUrl) {
      deleteFromCloudinaryUrl(oldCollegeLogoUrl, 'image').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_CLEANUP_COLLEGE_LOGO_ERROR]', err);
      });
    }

    // Cloudinary Cleanup: Delete removed campus gallery photos
    if (newCollegeImages !== undefined && oldCollegeImages.length > 0) {
      const removedImages = oldCollegeImages.filter((img) => !newCollegeImages.includes(img));
      if (removedImages.length > 0) {
        deleteMultipleCloudinaryUrls(removedImages, 'image').catch((err) => {
          console.error('[BACKGROUND_CLOUDINARY_CLEANUP_COLLEGE_IMAGES_ERROR]', err);
        });
      }
    }

    return successResponse(updatedTpo, 'TPO and College profile updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[PATCH_TPO_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to update TPO profile', 500);
  }
}
