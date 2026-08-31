import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
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
        company: true,
      },
    });

    if (!recruiter) {
      return errorResponse('Recruiter profile not found', 404);
    }

    // Get aggregated statistics for this recruiter's company
    const [totalJobs, activeJobs, totalApplications] = await Promise.all([
      prisma.job.count({
        where: { companyId: recruiter.companyId },
      }),
      prisma.job.count({
        where: {
          companyId: recruiter.companyId,
          status: 'ACTIVE',
        },
      }),
      prisma.application.count({
        where: {
          job: {
            companyId: recruiter.companyId,
          },
        },
      }),
    ]);

    return successResponse(
      {
        recruiter,
        stats: {
          totalJobs,
          activeJobs,
          totalApplications,
        },
      },
      'Recruiter profile fetched successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_RECRUITER_PROFILE_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch recruiter profile', 500);
  }
}
