import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

import { deleteFromCloudinaryUrl } from '@/lib/cloudinary';

const updateStudentProfileSchema = z.object({
  name: z.string().trim().min(2).optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable().or(z.literal('')),
  skills: z.array(z.string().trim()).optional(),
  resumeUrl: z.string().url('Invalid resume URL').optional().nullable().or(z.literal('')),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().nullable().or(z.literal('')),
  githubUrl: z.string().url('Invalid GitHub URL').optional().nullable().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid portfolio URL').optional().nullable().or(z.literal('')),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            role: true,
            createdAt: true,
          },
        },
        college: {
          select: {
            id: true,
            name: true,
            code: true,
            domain: true,
            city: true,
            state: true,
            logoUrl: true,
            images: true,
          },
        },
        resumes: {
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    return successResponse(student, 'Student profile fetched successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_STUDENT_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch student profile', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
      include: { user: true },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const body = await req.json();
    const parsedData = updateStudentProfileSchema.parse(body);

    const oldAvatarUrl = student.user.avatarUrl;
    const oldResumeUrl = student.resumeUrl;

    const newAvatarUrl =
      parsedData.avatarUrl !== undefined ? (parsedData.avatarUrl || null) : undefined;
    const newResumeUrl =
      parsedData.resumeUrl !== undefined ? (parsedData.resumeUrl || null) : undefined;

    const updatedStudent = await prisma.$transaction(async (tx) => {
      if (parsedData.name !== undefined || newAvatarUrl !== undefined) {
        await tx.user.update({
          where: { id: authUser.userId },
          data: {
            ...(parsedData.name !== undefined ? { name: parsedData.name } : {}),
            ...(newAvatarUrl !== undefined ? { avatarUrl: newAvatarUrl } : {}),
          },
        });
      }

      return tx.studentProfile.update({
        where: { id: student.id },
        data: {
          ...(parsedData.skills !== undefined ? { skills: parsedData.skills } : {}),
          ...(newResumeUrl !== undefined ? { resumeUrl: newResumeUrl } : {}),
          ...(parsedData.linkedinUrl !== undefined ? { linkedinUrl: parsedData.linkedinUrl || null } : {}),
          ...(parsedData.githubUrl !== undefined ? { githubUrl: parsedData.githubUrl || null } : {}),
          ...(parsedData.portfolioUrl !== undefined ? { portfolioUrl: parsedData.portfolioUrl || null } : {}),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              role: true,
            },
          },
          college: true,
          resumes: {
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
          },
        },
      });
    });

    // Cloudinary Cleanup: Delete old avatar from Cloudinary if replaced or removed
    if (newAvatarUrl !== undefined && oldAvatarUrl && oldAvatarUrl !== newAvatarUrl) {
      deleteFromCloudinaryUrl(oldAvatarUrl, 'image').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_CLEANUP_AVATAR_ERROR]', err);
      });
    }

    // Cloudinary Cleanup: Delete old resume if replaced or removed
    if (newResumeUrl !== undefined && oldResumeUrl && oldResumeUrl !== newResumeUrl) {
      deleteFromCloudinaryUrl(oldResumeUrl, 'raw').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_CLEANUP_RESUME_ERROR]', err);
      });
    }

    return successResponse(updatedStudent, 'Profile updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[UPDATE_STUDENT_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to update student profile', 500);
  }
}
