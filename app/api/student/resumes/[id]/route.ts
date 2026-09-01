import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { updateResumeSchema } from '@/lib/validations/resume.schema';
import { deleteFromCloudinary } from '@/lib/cloudinary';

/**
 * PATCH /api/student/resumes/[id]
 * Update resume title or set as primary/default resume.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const existingResume = await prisma.studentResume.findFirst({
      where: { id, studentId: student.id },
    });

    if (!existingResume) {
      return errorResponse('Resume not found or does not belong to you', 404);
    }

    const body = await req.json();
    const validatedData = updateResumeSchema.parse(body);

    const updatedResume = await prisma.$transaction(async (tx) => {
      // If setting this resume as default, unset others first
      if (validatedData.isDefault === true) {
        await tx.studentResume.updateMany({
          where: { studentId: student.id },
          data: { isDefault: false },
        });

        await tx.studentProfile.update({
          where: { id: student.id },
          data: { resumeUrl: existingResume.fileUrl },
        });
      }

      return tx.studentResume.update({
        where: { id },
        data: {
          title: validatedData.title ?? existingResume.title,
          isDefault: validatedData.isDefault ?? existingResume.isDefault,
        },
      });
    });

    return successResponse(updatedResume, 'Resume updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[PATCH_STUDENT_RESUME_ERROR]', error);
    return errorResponse(error.message || 'Failed to update resume', 500);
  }
}

/**
 * DELETE /api/student/resumes/[id]
 * Delete a resume record and remove the associated file from Cloudinary.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const resume = await prisma.studentResume.findFirst({
      where: { id, studentId: student.id },
    });

    if (!resume) {
      return errorResponse('Resume not found or does not belong to you', 404);
    }

    // Check if any applications are referencing this resume directly
    const linkedApplicationsCount = await prisma.application.count({
      where: { resumeId: id },
    });

    // Delete file from Cloudinary in the background if publicId exists
    if (resume.publicId) {
      deleteFromCloudinary(resume.publicId, 'raw').catch((err) => {
        console.error('[BACKGROUND_CLOUDINARY_DELETE_ERROR]', err);
      });
    }

    await prisma.$transaction(async (tx) => {
      // If linked applications exist, set resumeId to null while retaining snapshot resumeUrl
      if (linkedApplicationsCount > 0) {
        await tx.application.updateMany({
          where: { resumeId: id },
          data: { resumeId: null },
        });
      }

      await tx.studentResume.delete({
        where: { id },
      });

      // If deleted resume was default, set the latest remaining resume as default
      if (resume.isDefault) {
        const nextResume = await tx.studentResume.findFirst({
          where: { studentId: student.id },
          orderBy: { createdAt: 'desc' },
        });

        if (nextResume) {
          await tx.studentResume.update({
            where: { id: nextResume.id },
            data: { isDefault: true },
          });

          await tx.studentProfile.update({
            where: { id: student.id },
            data: { resumeUrl: nextResume.fileUrl },
          });
        } else {
          // No resumes left
          await tx.studentProfile.update({
            where: { id: student.id },
            data: { resumeUrl: null },
          });
        }
      }
    });

    return successResponse({ deletedId: id }, 'Resume deleted successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[DELETE_STUDENT_RESUME_ERROR]', error);
    return errorResponse(error.message || 'Failed to delete resume', 500);
  }
}
