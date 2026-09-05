import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { deleteFromCloudinaryUrl } from '@/lib/cloudinary';

const updateStudentProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable().or(z.literal('')),
  phone: z.string().trim().optional().nullable().or(z.literal('')),
  bio: z.string().trim().max(500, 'Bio cannot exceed 500 characters').optional().nullable().or(z.literal('')),
  branch: z.string().trim().optional(),
  batchYear: z.coerce.number().int().min(2000).max(2050).optional(),
  cgpa: z.coerce.number().min(0).max(10).optional(),
  tenthMarks: z.coerce.number().min(0).max(100).optional().nullable(),
  twelfthMarks: z.coerce.number().min(0).max(100).optional().nullable(),
  skills: z.array(z.string().trim()).optional(),
  resumeUrl: z.string().url('Invalid resume URL').optional().nullable().or(z.literal('')),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').optional().nullable().or(z.literal('')),
  githubUrl: z.string().url('Invalid GitHub URL').optional().nullable().or(z.literal('')),
  portfolioUrl: z.string().url('Invalid portfolio URL').optional().nullable().or(z.literal('')),
});

function calculateProfileCompletion(student: any): number {
  let score = 30; // base account registered
  if (student.cgpa) score += 10;
  if (student.phone) score += 10;
  if (student.bio) score += 10;
  if (student.skills && student.skills.length > 0) score += 15;
  if (student.resumeUrl || (student.resumes && student.resumes.length > 0)) score += 15;
  if (student.linkedinUrl) score += 5;
  if (student.githubUrl) score += 5;
  return Math.min(100, score);
}

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
        applications: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            job: {
              select: {
                id: true,
                title: true,
                type: true,
                salaryPackage: true,
                company: {
                  select: {
                    id: true,
                    name: true,
                    logoUrl: true,
                  },
                },
              },
            },
          },
        },
        offers: {
          orderBy: { createdAt: 'desc' },
          include: {
            company: {
              select: {
                name: true,
                logoUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            applications: true,
            offers: true,
          },
        },
      },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const appliedCount = student._count.applications;
    const interviewCount = student.applications.filter(
      (a) => a.status === 'INTERVIEW_SCHEDULED'
    ).length;
    const offerCount = student._count.offers;
    const completionScore = calculateProfileCompletion(student);

    const enrichedProfile = {
      ...student,
      stats: {
        appliedCount,
        interviewCount,
        offerCount,
        cgpa: student.cgpa,
        profileScore: completionScore,
      },
    };

    return successResponse(enrichedProfile, 'Student profile fetched successfully');
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
      // 1. Update User model fields (name, avatarUrl)
      if (parsedData.name !== undefined || newAvatarUrl !== undefined) {
        await tx.user.update({
          where: { id: authUser.userId },
          data: {
            ...(parsedData.name !== undefined ? { name: parsedData.name } : {}),
            ...(newAvatarUrl !== undefined ? { avatarUrl: newAvatarUrl } : {}),
          },
        });
      }

      // 2. Update StudentProfile model fields
      return tx.studentProfile.update({
        where: { id: student.id },
        data: {
          ...(parsedData.phone !== undefined ? { phone: parsedData.phone || null } : {}),
          ...(parsedData.bio !== undefined ? { bio: parsedData.bio || null } : {}),
          ...(parsedData.branch !== undefined ? { branch: parsedData.branch } : {}),
          ...(parsedData.batchYear !== undefined ? { batchYear: parsedData.batchYear } : {}),
          ...(parsedData.cgpa !== undefined ? { cgpa: parsedData.cgpa } : {}),
          ...(parsedData.tenthMarks !== undefined ? { tenthMarks: parsedData.tenthMarks } : {}),
          ...(parsedData.twelfthMarks !== undefined ? { twelfthMarks: parsedData.twelfthMarks } : {}),
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
          applications: {
            orderBy: { createdAt: 'desc' },
            take: 10,
            include: {
              job: {
                select: {
                  id: true,
                  title: true,
                  type: true,
                  company: {
                    select: {
                      id: true,
                      name: true,
                      logoUrl: true,
                    },
                  },
                },
              },
            },
          },
          offers: true,
          _count: {
            select: {
              applications: true,
              offers: true,
            },
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

    const enrichedResult = {
      ...updatedStudent,
      stats: {
        appliedCount: updatedStudent._count.applications,
        interviewCount: updatedStudent.applications.filter((a) => a.status === 'INTERVIEW_SCHEDULED').length,
        offerCount: updatedStudent._count.offers,
        cgpa: updatedStudent.cgpa,
        profileScore: calculateProfileCompletion(updatedStudent),
      },
    };

    return successResponse(enrichedResult, 'Profile updated successfully');
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
