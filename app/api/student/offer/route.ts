import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    // Find accepted offer first, or any pending offer
    const offer = await prisma.offer.findFirst({
      where: {
        studentId: student.id,
        status: { in: ['ACCEPTED', 'PENDING'] },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            website: true,
            industry: true,
            location: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
            type: true,
            description: true,
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
    });

    if (!offer) {
      return successResponse(null, 'No active or accepted placement offers found');
    }

    return successResponse(offer, 'Placement offer retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_STUDENT_OFFER_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch placement offer', 500);
  }
}
