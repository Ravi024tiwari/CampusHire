import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const updateStudentProfileSchema = z.object({
  name: z.string().trim().min(2).optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
  skills: z.array(z.string().trim()).optional(),
  resumeUrl: z.string().url('Invalid resume URL').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid portfolio URL').optional().or(z.literal('')),
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
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const body = await req.json();
    const parsedData = updateStudentProfileSchema.parse(body);

    const updatedStudent = await prisma.$transaction(async (tx) => {
      if (parsedData.name !== undefined || parsedData.avatarUrl !== undefined) {
        await tx.user.update({
          where: { id: authUser.userId },
          data: {
            ...(parsedData.name !== undefined ? { name: parsedData.name } : {}),
            ...(parsedData.avatarUrl !== undefined ? { avatarUrl: parsedData.avatarUrl || null } : {}),
          },
        });
      }

      return tx.studentProfile.update({
        where: { id: student.id },
        data: {
          ...(parsedData.skills !== undefined ? { skills: parsedData.skills } : {}),
          ...(parsedData.resumeUrl !== undefined ? { resumeUrl: parsedData.resumeUrl || null } : {}),
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
