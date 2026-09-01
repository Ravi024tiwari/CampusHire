import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/admin/jobs/[id]
 * Fetch complete placement drive details along with applicants breakdown for Super Admin.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            website: true,
            industry: true,
            location: true,
            isVerified: true,
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
        applications: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            status: true,
            resumeUrl: true,
            createdAt: true,
            student: {
              select: {
                id: true,
                enrollmentNumber: true,
                branch: true,
                batchYear: true,
                cgpa: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
        offers: {
          select: {
            id: true,
            status: true,
            designation: true,
            salaryPackage: true,
            acceptedAt: true,
            student: {
              select: {
                id: true,
                enrollmentNumber: true,
                user: { select: { name: true, email: true } },
              },
            },
          },
        },
      },
    });

    if (!job) {
      return errorResponse('Placement drive not found', 404);
    }

    return successResponse(job, 'Placement drive details retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_JOB_DETAILS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch job details', 500);
  }
}
