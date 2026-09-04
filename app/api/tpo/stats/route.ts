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

    if (!tpo || !tpo.collegeId || !tpo.college) {
      return successResponse(
        {
          hasCollege: false,
          college: null,
          metrics: {
            totalJobs: 0,
            activeJobs: 0,
            pendingApprovalJobs: 0,
            closedJobs: 0,
            totalStudents: 0,
            totalApplications: 0,
            placedStudentsCount: 0,
            placementRate: '0%',
          },
          recentDrives: [],
          branchDistribution: [],
        },
        'No college registered yet for this TPO'
      );
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
      placedStudentsCount,
      totalOffers,
      companiesCount,
      recentDrives,
      recentOffers,
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

      // 7. Placed students count (unique students who received or accepted offers)
      prisma.studentProfile.count({
        where: {
          collegeId,
          offers: {
            some: {
              status: { in: ['ACCEPTED', 'PENDING'] },
            },
          },
        },
      }),

      // 8. Total offers generated for this college
      prisma.offer.count({ where: { collegeId } }),

      // 9. Distinct companies that have posted drives for this college
      prisma.company.count({
        where: {
          jobs: {
            some: {
              collegeId,
            },
          },
        },
      }),

      // 10. Recent 6 drives with company details and applications count
      prisma.job.findMany({
        where: { collegeId },
        take: 6,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          salaryPackage: true,
          location: true,
          deadline: true,
          createdAt: true,
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              industry: true,
              location: true,
            },
          },
          _count: {
            select: {
              applications: true,
              offers: true,
            },
          },
        },
      }),

      // 11. Recent 5 Offers generated
      prisma.offer.findMany({
        where: { collegeId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          designation: true,
          salaryPackage: true,
          status: true,
          createdAt: true,
          student: {
            select: {
              id: true,
              branch: true,
              batchYear: true,
              cgpa: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
          },
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
        },
      }),

      // 12. Branch distribution of students
      prisma.studentProfile.groupBy({
        by: ['branch'],
        where: { collegeId },
        _count: { branch: true },
      }),
    ]);

    const stats = {
      hasCollege: true,
      college: {
        id: tpo.college.id,
        name: tpo.college.name,
        code: tpo.college.code,
        domain: tpo.college.domain,
        city: tpo.college.city,
        state: tpo.college.state,
        logoUrl: tpo.college.logoUrl,
        images: tpo.college.images || [],
        contactEmail: tpo.college.contactEmail,
        contactPhone: tpo.college.contactPhone,
        isVerified: tpo.college.isVerified,
        createdAt: tpo.college.createdAt,
      },
      tpoOfficer: {
        id: tpo.id,
        designation: tpo.designation || 'Head, Training & Placement Cell',
        department: tpo.department || 'Central Placement Cell',
        name: authUser.name,
        email: authUser.email,
      },
      metrics: {
        totalJobs,
        activeJobs,
        pendingApprovalJobs,
        closedJobs,
        totalStudents,
        totalApplications,
        placedStudentsCount,
        totalOffers,
        totalAffiliatedCompanies: companiesCount,
        placementRate: totalStudents > 0 ? `${((placedStudentsCount / totalStudents) * 100).toFixed(1)}%` : '0%',
      },
      recentDrives,
      recentOffers,
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
