import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);
    const { id: applicationId } = await context.params;

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
                website: true,
                description: true,
              },
            },
          },
        },
        offer: true,
      },
    });

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    if (application.studentId !== student.id) {
      return errorResponse('Access denied. You can only view your own applications.', 403);
    }

    return successResponse(application, 'Application details retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[GET_APPLICATION_DETAIL_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch application details', 500);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);
    const { id: applicationId } = await context.params;

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          select: {
            title: true,
            company: { select: { name: true } },
          },
        },
      },
    });

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    if (application.studentId !== student.id) {
      return errorResponse('Access denied. You can only withdraw your own applications.', 403);
    }

    // Only allow withdrawing if not already accepted/declined/rejected
    if (['ACCEPTED', 'DECLINED'].includes(application.status)) {
      return errorResponse('Cannot withdraw a completed or accepted application offer.', 400);
    }

    // Soft update status or delete
    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: 'DECLINED',
        notes: 'Withdrawn by student.',
      },
    });

    return successResponse(
      updated,
      `Successfully withdrawn application for ${application.job.title} at ${application.job.company.name}`
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[WITHDRAW_APPLICATION_ERROR]', error);
    return errorResponse(error.message || 'Failed to withdraw application', 500);
  }
}
