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
        college: true,
      },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

    const collegeId = tpo.collegeId;

    // Parallel aggregate queries for college dashboard
    const [
      totalJobs,
      activeJobs,
      pendingApprovalJobs,
      closedJobs,
      totalStudents,
      totalApplications,
      placedApplications,
      recentDrives,
      branchDistribution,
    ] = await Promise.all([
      // 1. Total jobs posted for this college
      prisma.job.count({ where: { collegeId } }),

      // 2. Active drives
      prisma.job.count({ where: { collegeId, status: 'ACTIVE' } }),

      // 3. Pending approval drives
      prisma.job.count({ where: { collegeId, status: 'PENDING_APPROVAL' } }),

      // 4. Closed drives
      prisma.job.count({ where: { collegeId, status: 'CLOSED' } }),

      // 5. Total registered students in this college
      prisma.studentProfile.count({ where: { collegeId } }),

      // 6. Total applications by students of this college
      prisma.application.count({
        where: {
          student: { collegeId },
        },
      }),

      // 7. Placed/Offered applications
      prisma.application.count({
        where: {
          student: { collegeId },
          status: { in: ['OFFERED', 'ACCEPTED'] },
        },
      }),

      // 8. Recent 5 drives with company details
      prisma.job.findMany({
        where: { collegeId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          salaryPackage: true,
          deadline: true,
          createdAt: true,
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      }),

      // 9. Branch distribution of students
      prisma.studentProfile.groupBy({
        by: ['branch'],
        where: { collegeId },
        _count: { branch: true },
      }),
    ]);

    const stats = {
      college: {
        id: tpo.college.id,
        name: tpo.college.name,
        code: tpo.college.code,
        city: tpo.college.city,
        state: tpo.college.state,
      },
      metrics: {
        totalJobs,
        activeJobs,
        pendingApprovalJobs,
        closedJobs,
        totalStudents,
        totalApplications,
        placedStudentsCount: placedApplications,
        placementRate: totalStudents > 0 ? `${((placedApplications / totalStudents) * 100).toFixed(1)}%` : '0%',
      },
      recentDrives,
      branchDistribution: branchDistribution.map((b) => ({
        branch: b.branch,
        studentCount: b._count.branch,
      })),
    };

    return successResponse(stats, 'College placement statistics retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_TPO_STATS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch college stats', 500);
  }
}
