import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

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
