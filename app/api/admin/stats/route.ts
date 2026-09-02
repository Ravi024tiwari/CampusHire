import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

/**
 * GET /api/admin/stats
 * Production-grade Super Admin Dashboard KPI & Analytics endpoint.
 * Computes platform-wide metrics: Affiliated Colleges, Enrolled Students, Enrolled Companies,
 * Placed Students, Global Selection/Placement Percentage, and Drive Activity.
 */
export async function GET(req: NextRequest) {
  try {
    await requireRole([Role.SUPER_ADMIN], req);

    const [
      totalColleges,
      totalStudents,
      totalPlacedStudents,
      totalCompanies,
      verifiedCompanies,
      pendingCompanies,
      totalJobs,
      activeJobs,
      totalApplications,
      totalOffersIssued,
      totalOffersAccepted,
      totalRecruiters,
      totalTpos,
      recentDrives,
      topCompanies,
    ] = await Promise.all([
      // Affiliated Colleges
      prisma.college.count(),

      // Total Enrolled Students
      prisma.studentProfile.count(),

      // Total Placed Students (Students who have accepted at least one offer)
      prisma.studentProfile.count({
        where: {
          offers: {
            some: { status: 'ACCEPTED' },
          },
        },
      }),

      prisma.company.count(),
      prisma.company.count({ where: { isVerified: true } }),
      prisma.company.count({ where: { isVerified: false } }),

      prisma.job.count(),
      prisma.job.count({ where: { status: 'ACTIVE' } }),

      prisma.application.count(),
      prisma.offer.count(),
      prisma.offer.count({ where: { status: 'ACCEPTED' } }),

      prisma.recruiterProfile.count(),
      prisma.tpoProfile.count(),

      // Top 5 most recent active drives
      prisma.job.findMany({
        where: { status: 'ACTIVE' },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          salaryPackage: true,
          location: true,
          deadline: true,
          createdAt: true,
          company: {
            select: {
              name: true,
              logoUrl: true,
            },
          },
          college: {
            select: {
              name: true,
              code: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      }),

      // Top hiring companies by accepted placements
      prisma.company.findMany({
        take: 5,
        orderBy: {
          offers: {
            _count: 'desc',
          },
        },
        select: {
          id: true,
          name: true,
          logoUrl: true,
          industry: true,
          _count: {
            select: {
              jobs: true,
              offers: true,
            },
          },
        },
      }),
    ]);

    // 3. Compute precise Selection / Placement Percentage with respect to enrolled students
    const totalUnplacedStudents = totalStudents - totalPlacedStudents;
    const placementPercentage =
      totalStudents > 0
        ? Number(((totalPlacedStudents / totalStudents) * 100).toFixed(2))
        : 0;

    const offerAcceptanceRate =
      totalOffersIssued > 0
        ? Number(((totalOffersAccepted / totalOffersIssued) * 100).toFixed(2))
        : 0;

    // 4. Return formatted response payload
    return successResponse(
      {
        kpis: {
          // Affiliated Institutions
          affiliatedCollegesCount: totalColleges,

          // Enrolled Students & Placements
          totalEnrolledStudents: totalStudents,
          totalPlacedStudents,
          totalUnplacedStudents,
          placementPercentage: `${placementPercentage}%`,
          placementRateNumeric: placementPercentage,

          // Enrolled Companies
          totalCompaniesEnrolled: totalCompanies,
          verifiedCompaniesCount: verifiedCompanies,
          pendingVerificationCompanies: pendingCompanies,

          // Placement Drives
          totalPlacementDrives: totalJobs,
          activePlacementDrives: activeJobs,
          closedPlacementDrives: totalJobs - activeJobs,

          // Pipeline & Offers
          totalApplicationsSubmitted: totalApplications,
          totalOffersIssued,
          totalOffersAccepted,
          offerAcceptanceRate: `${offerAcceptanceRate}%`,

          // Platform Personnel
          totalRecruiters,
          totalTpos,
        },
        recentActiveDrives: recentDrives,
        topHiringCompanies: topCompanies,
      },
      'Super Admin dashboard analytics and KPIs retrieved successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[SUPER_ADMIN_STATS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch dashboard metrics', 500);
  }
}
