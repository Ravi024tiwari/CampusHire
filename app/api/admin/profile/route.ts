import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { hashPassword, verifyPassword } from '@/lib/auth';
import { deleteFromCloudinaryUrl } from '@/lib/cloudinary';

const updateAdminProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable().or(z.literal('')),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, 'New password must be at least 6 characters').optional(),
});

/**
 * GET /api/admin/profile
 * Fetch Super Admin profile details.
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.SUPER_ADMIN], req);

    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse(user, 'Super Admin profile retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch admin profile', 500);
  }
}

/**
 * PATCH /api/admin/profile
 * Update Super Admin name, avatar photo, and password with automatic Cloudinary cleanup.
 */
export async function PATCH(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.SUPER_ADMIN], req);

    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    const body = await req.json();
    const parsedData = updateAdminProfileSchema.parse(body);

    const oldAvatarUrl = user.avatarUrl;
    const newAvatarUrl =
      parsedData.avatarUrl !== undefined ? (parsedData.avatarUrl || null) : undefined;

    // Handle password change if requested
    let newPasswordHash: string | undefined = undefined;
    if (parsedData.newPassword) {
      if (!parsedData.currentPassword) {
        return errorResponse('Current password is required to set a new password', 400);
      }

      if (user.passwordHash) {
        const isCurrentValid = await verifyPassword(parsedData.currentPassword, user.passwordHash);
        if (!isCurrentValid) {
          return errorResponse('Incorrect current password', 400);
        }
      }

      newPasswordHash = await hashPassword(parsedData.newPassword);
    }

    const updatedUser = await prisma.user.update({
      where: { id: authUser.userId },
      data: {
        ...(parsedData.name !== undefined ? { name: parsedData.name } : {}),
        ...(newAvatarUrl !== undefined ? { avatarUrl: newAvatarUrl } : {}),
        ...(newPasswordHash !== undefined ? { passwordHash: newPasswordHash } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatarUrl: true,
        isActive: true,
        updatedAt: true,
      },
    });

    // Cloudinary Cleanup: Delete old avatar from Cloudinary if replaced or removed
    if (newAvatarUrl !== undefined && oldAvatarUrl && oldAvatarUrl !== newAvatarUrl) {
      deleteFromCloudinaryUrl(oldAvatarUrl, 'image').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_CLEANUP_ADMIN_AVATAR_ERROR]', err);
      });
    }

    return successResponse(updatedUser, 'Super Admin profile updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[PATCH_ADMIN_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to update admin profile', 500);
  }
}
