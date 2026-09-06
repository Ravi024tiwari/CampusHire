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
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
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

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    // Fetch all offers for this student
    const offers = await prisma.offer.findMany({
      where: {
        studentId: student.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        application: {
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
        },
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
            location: true,
            salaryPackage: true,
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

    return successResponse(
      {
        student: {
          id: student.id,
          name: student.user.name,
          email: student.user.email,
          avatarUrl: student.user.avatarUrl,
          enrollmentNumber: student.enrollmentNumber,
          branch: student.branch,
          batchYear: student.batchYear,
          college: student.college,
        },
        offers,
      },
      'Student placement offers retrieved successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_STUDENT_OFFERS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch student offers', 500);
  }
}
