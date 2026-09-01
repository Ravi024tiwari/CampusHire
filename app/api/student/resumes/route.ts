import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { createResumeSchema } from '@/lib/validations/resume.schema';

/**
 * GET /api/student/resumes
 * Retrieve all resume versions uploaded by the authenticated student.
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        resumes: {
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
        },
      },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    return successResponse(
      {
        resumes: student.resumes,
        total: student.resumes.length,
        defaultResumeId: student.resumes.find((r) => r.isDefault)?.id || null,
      },
      'Resumes retrieved successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_STUDENT_RESUMES_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch resumes', 500);
  }
}

/**
 * POST /api/student/resumes
 * Add a new resume version (after uploading file to Cloudinary).
 */
export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        resumes: true,
      },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const body = await req.json();
    const validatedData = createResumeSchema.parse(body);

    // If this is the student's first resume or explicitly set as default, mark isDefault true
    const shouldBeDefault = validatedData.isDefault || student.resumes.length === 0;

    // Use transaction to ensure only one resume is marked as default
    const newResume = await prisma.$transaction(async (tx) => {
      if (shouldBeDefault && student.resumes.length > 0) {
        await tx.studentResume.updateMany({
          where: { studentId: student.id },
          data: { isDefault: false },
        });
      }

      const created = await tx.studentResume.create({
        data: {
          studentId: student.id,
          title: validatedData.title,
          fileUrl: validatedData.fileUrl,
          publicId: validatedData.publicId,
          fileType: validatedData.fileType || 'pdf',
          fileSize: validatedData.fileSize,
          isDefault: shouldBeDefault,
        },
      });

      // Keep student profile default resumeUrl synchronized
      if (shouldBeDefault) {
        await tx.studentProfile.update({
          where: { id: student.id },
          data: { resumeUrl: validatedData.fileUrl },
        });
      }

      return created;
    });

    return successResponse(newResume, 'Resume added successfully', 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[POST_STUDENT_RESUME_ERROR]', error);
    return errorResponse(error.message || 'Failed to add resume', 500);
  }
}
