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
        _count: {
          select: {
            applications: true,
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
