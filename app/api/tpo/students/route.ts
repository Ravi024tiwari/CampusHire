import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const tpoStudentRosterQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  branch: z.string().trim().optional(),
  batchYear: z.coerce.number().int().optional(),
  placementStatus: z.enum(['ALL', 'PLACED', 'UNPLACED']).default('ALL'),
  search: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const query = tpoStudentRosterQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      branch: searchParams.get('branch') ?? undefined,
      batchYear: searchParams.get('batchYear') ?? undefined,
      placementStatus: searchParams.get('placementStatus') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    });

    const where: any = {
      collegeId: tpo.collegeId, // Strict campus isolation
    };

    if (query.branch) {
      where.branch = { equals: query.branch, mode: 'insensitive' };
    }

    if (query.batchYear) {
      where.batchYear = query.batchYear;
    }

    if (query.search) {
      where.OR = [
        { user: { name: { contains: query.search, mode: 'insensitive' } } },
        { user: { email: { contains: query.search, mode: 'insensitive' } } },
        { enrollmentNumber: { contains: query.search, mode: 'insensitive' } },
        { branch: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // Filter by placement status using Offer relation
    if (query.placementStatus === 'PLACED') {
      where.offers = {
        some: { status: 'ACCEPTED' },
      };
    } else if (query.placementStatus === 'UNPLACED') {
      where.offers = {
        none: { status: 'ACCEPTED' },
      };
    }

    const skip = (query.page - 1) * query.limit;

    const [total, students, totalPlacedCount, totalCollegeStudents] = await Promise.all([
      prisma.studentProfile.count({ where }),
      prisma.studentProfile.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: [{ batchYear: 'desc' }, { cgpa: 'desc' }],
        include: {
          user: {
            select: {
              name: true,
              email: true,
              avatarUrl: true,
              isActive: true,
            },
          },
          offers: {
            where: { status: 'ACCEPTED' },
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                },
              },
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      }),
      // Count total placed students in this college
      prisma.studentProfile.count({
        where: {
          collegeId: tpo.collegeId,
          offers: { some: { status: 'ACCEPTED' } },
        },
      }),
      // Count total registered students in this college
      prisma.studentProfile.count({
        where: { collegeId: tpo.collegeId },
      }),
    ]);

    const roster = students.map((s) => {
      const acceptedOffer = s.offers[0] || null;
      return {
        id: s.id,
        name: s.user.name,
        email: s.user.email,
        avatarUrl: s.user.avatarUrl,
        enrollmentNumber: s.enrollmentNumber,
        branch: s.branch,
        batchYear: s.batchYear,
        cgpa: s.cgpa,
        skills: s.skills,
        resumeUrl: s.resumeUrl,
        applicationsCount: s._count.applications,
        isPlaced: Boolean(acceptedOffer),
        placementDetails: acceptedOffer
          ? {
              companyId: acceptedOffer.company.id,
              companyName: acceptedOffer.company.name,
              companyLogoUrl: acceptedOffer.company.logoUrl,
              designation: acceptedOffer.designation,
              salaryPackage: acceptedOffer.salaryPackage,
              location: acceptedOffer.location,
              joiningDate: acceptedOffer.joiningDate,
              acceptedAt: acceptedOffer.acceptedAt,
              letterUrl: acceptedOffer.letterUrl,
            }
          : null,
      };
    });

    return successResponse(
      {
        students: roster,
        summary: {
          totalCollegeStudents,
          totalPlacedStudents: totalPlacedCount,
          totalUnplacedStudents: totalCollegeStudents - totalPlacedCount,
          overallPlacementRate:
            totalCollegeStudents > 0
              ? `${((totalPlacedCount / totalCollegeStudents) * 100).toFixed(1)}%`
              : '0%',
        },
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit),
          hasMore: query.page * query.limit < total,
        },
      },
      'Student placement roster retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_TPO_STUDENTS_ROSTER_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch student roster', 500);
  }
}
