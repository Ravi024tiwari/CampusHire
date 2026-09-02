import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { deleteFromCloudinaryUrl } from '@/lib/cloudinary';

const updateRecruiterProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable().or(z.literal('')),
  designation: z.string().trim().min(2, 'Designation must be at least 2 characters').optional(),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
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
        company: true,
      },
    });

    if (!recruiter) {
      return errorResponse('Recruiter profile not found', 404);
    }

    // Get aggregated statistics for this recruiter's company
    const [totalJobs, activeJobs, totalApplications] = await Promise.all([
      prisma.job.count({
        where: { companyId: recruiter.companyId },
      }),
      prisma.job.count({
        where: {
          companyId: recruiter.companyId,
          status: 'ACTIVE',
        },
      }),
      prisma.application.count({
        where: {
          job: {
            companyId: recruiter.companyId,
          },
        },
      }),
    ]);

    return successResponse(
      {
        recruiter,
        stats: {
          totalJobs,
          activeJobs,
          totalApplications,
        },
      },
      'Recruiter profile fetched successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_RECRUITER_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch recruiter profile', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { user: true },
    });

    if (!recruiter) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const body = await req.json();
    const parsedData = updateRecruiterProfileSchema.parse(body);

    const oldAvatarUrl = recruiter.user.avatarUrl;
    const newAvatarUrl =
      parsedData.avatarUrl !== undefined ? (parsedData.avatarUrl || null) : undefined;

    const updatedRecruiter = await prisma.$transaction(async (tx) => {
      if (parsedData.name !== undefined || newAvatarUrl !== undefined) {
        await tx.user.update({
          where: { id: authUser.userId },
          data: {
            ...(parsedData.name !== undefined ? { name: parsedData.name } : {}),
            ...(newAvatarUrl !== undefined ? { avatarUrl: newAvatarUrl } : {}),
          },
        });
      }

      if (parsedData.designation !== undefined) {
        await tx.recruiterProfile.update({
          where: { id: recruiter.id },
          data: { designation: parsedData.designation },
        });
      }

      return tx.recruiterProfile.findUnique({
        where: { id: recruiter.id },
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
          company: true,
        },
      });
    });

    // Cloudinary Cleanup: Delete old avatar if replaced or removed
    if (newAvatarUrl !== undefined && oldAvatarUrl && oldAvatarUrl !== newAvatarUrl) {
      deleteFromCloudinaryUrl(oldAvatarUrl, 'image').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_CLEANUP_RECRUITER_AVATAR_ERROR]', err);
      });
    }

    return successResponse(updatedRecruiter, 'Recruiter profile updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[PATCH_RECRUITER_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to update recruiter profile', 500);
  }
}
