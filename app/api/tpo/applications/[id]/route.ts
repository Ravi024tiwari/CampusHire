import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, ApplicationStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const updateApplicationStatusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus).optional(),
  notes: z.string().trim().optional().nullable(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    let collegeId: string | null = null;
    if (authUser.role === Role.TPO_ADMIN) {
      const tpo = await prisma.tpoProfile.findUnique({
        where: { userId: authUser.userId },
      });
      collegeId = tpo?.collegeId || null;
    }

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                isActive: true,
              },
            },
            college: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
                website: true,
                location: true,
              },
            },
          },
        },
        resume: true,
        offer: true,
      },
    });

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    // RBAC Campus check
    if (
      collegeId &&
      application.student.collegeId !== collegeId &&
      application.job.collegeId !== collegeId
    ) {
      return errorResponse('Access denied. This application belongs to another institution.', 403);
    }

    return successResponse(application, 'Application details retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return errorResponse(error.message || 'Failed to fetch application details', 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    let collegeId: string | null = null;
    if (authUser.role === Role.TPO_ADMIN) {
      const tpo = await prisma.tpoProfile.findUnique({
        where: { userId: authUser.userId },
      });
      collegeId = tpo?.collegeId || null;
    }

    const existingApp = await prisma.application.findUnique({
      where: { id },
      include: {
        student: true,
        job: true,
      },
    });

    if (!existingApp) {
      return errorResponse('Application record not found', 404);
    }

    if (
      collegeId &&
      existingApp.student.collegeId !== collegeId &&
      existingApp.job.collegeId !== collegeId
    ) {
      return errorResponse('Access denied to update application from another college', 403);
    }

    const body = await req.json();
    const data = updateApplicationStatusSchema.parse(body);

    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(data.status ? { status: data.status } : {}),
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        job: {
          include: {
            company: true,
          },
        },
        offer: true,
      },
    });

    return successResponse(updated, 'Application updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return errorResponse(error.message || 'Failed to update application', 500);
  }
}
