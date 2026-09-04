import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

/**
 * GET /api/colleges/[id]
 * Fetch comprehensive institutional profile for a college including TPO coordinators,
 * active campus recruitment drives, student enrollment, and placement statistics.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [college, placedStudentsCount, totalOffersCount, totalApplicationsCount] = await Promise.all([
      prisma.college.findUnique({
        where: { id },
        include: {
          tpos: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                  isActive: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          jobs: {
            include: {
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
                  offers: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
          _count: {
            select: {
              students: true,
              jobs: true,
              tpos: true,
              offers: true,
            },
          },
        },
      }),
      prisma.offer.count({
        where: {
          collegeId: id,
          status: 'ACCEPTED',
        },
      }),
      prisma.offer.count({
        where: {
          collegeId: id,
        },
      }),
      prisma.application.count({
        where: {
          job: {
            collegeId: id,
          },
        },
      }),
    ]);

    if (!college) {
      return errorResponse('University / College institution not found', 404);
    }

    const payload = {
      ...college,
      placementStats: {
        enrolledStudents: college._count?.students || 0,
        placedStudents: placedStudentsCount,
        totalOffers: totalOffersCount,
        totalApplications: totalApplicationsCount,
        placementRate: college._count?.students 
          ? Math.min(100, Math.round((placedStudentsCount / college._count.students) * 100))
          : 0,
        activeDrives: college._count?.jobs || 0,
      },
    };

    return successResponse(payload, 'College profile details and placement intelligence retrieved successfully');
  } catch (error: any) {
    return handleApiError(error, 'Failed to retrieve college profile', '[GET_COLLEGE_BY_ID_ERROR]');
  }
}
