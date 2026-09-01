import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/admin/students/[id]
 * Loaded on-demand when navigating to the student details view.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const student = await prisma.studentProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
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
          select: {
            id: true,
            title: true,
            fileUrl: true,
            fileSize: true,
            fileType: true,
            isDefault: true,
            createdAt: true,
          },
        },
        applications: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            status: true,
            resumeUrl: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
            job: {
              select: {
                id: true,
                title: true,
                type: true,
                salaryPackage: true,
                location: true,
                status: true,
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
          select: {
            id: true,
            status: true,
            designation: true,
            salaryPackage: true,
            location: true,
            joiningDate: true,
            letterUrl: true,
            acceptedAt: true,
            declinedAt: true,
            createdAt: true,
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
    });

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    return successResponse(student, 'Student details retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_STUDENT_DETAILS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch student details', 500);
  }
}
