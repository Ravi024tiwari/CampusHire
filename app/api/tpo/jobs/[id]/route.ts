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
    const authUser = await requireRole([Role.TPO_ADMIN], req);
    const { id } = await context.params;

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

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
            description: true,
            isVerified: true,
          },
        },
        applications: {
          take: 50,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            status: true,
            createdAt: true,
            resumeUrl: true,
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
        _count: {
          select: {
            applications: true,
            offers: true,
          },
        },
      },
    });

    if (!job) {
      return errorResponse('Job drive not found', 404);
    }

    // Security Check: Strict campus boundary enforcement
    if (job.collegeId !== tpo.collegeId) {
      return errorResponse('Access denied. This job drive belongs to a different college.', 403);
    }

    // Group applications by status for college placement tracking
    const statusCounts = await prisma.application.groupBy({
      by: ['status'],
      where: { jobId: id },
      _count: { status: true },
    });

    const pipelineBreakdown = statusCounts.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    return successResponse(
      {
        job,
        pipelineBreakdown,
      },
      'Job drive details fetched successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_TPO_JOB_DETAIL_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch job details', 500);
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);
    const { id } = await context.params;

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return errorResponse('Job drive not found', 404);
    }

    if (job.collegeId !== tpo.collegeId) {
      return errorResponse('Access denied. This job drive belongs to a different college.', 403);
    }

    const body = await req.json();
    const { status } = body;

    if (status && !['ACTIVE', 'PENDING_APPROVAL', 'CLOSED', 'DRAFT'].includes(status)) {
      return errorResponse('Invalid job status provided', 400);
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    return successResponse(
      updatedJob,
      `Placement drive status updated to ${status}`
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[PATCH_TPO_JOB_ERROR]', error);
    return errorResponse(error.message || 'Failed to update job drive', 500);
  }
}

