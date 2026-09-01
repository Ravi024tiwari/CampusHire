import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { adminStudentQuerySchema } from '@/lib/validations/admin.schema';

/**
 * GET /api/admin/students
 * Supports multi-attribute filtering (college, branch, batch, placement status) with 10 items/page default.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate caller as SUPER_ADMIN
    await requireRole([Role.SUPER_ADMIN], req);

    // 2. Parse & validate query parameters
    const { searchParams } = new URL(req.url);
    const query = adminStudentQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      collegeId: searchParams.get('collegeId') ?? undefined,
      branch: searchParams.get('branch') ?? undefined,
      batchYear: searchParams.get('batchYear') ?? undefined,
      isVerified: searchParams.get('isVerified') ?? undefined,
      placementStatus: searchParams.get('placementStatus') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      sortOrder: searchParams.get('sortOrder') ?? undefined,
    });

    // 3. Build optimized WHERE condition
    const where: any = {};

    if (query.collegeId) {
      where.collegeId = query.collegeId;
    }

    if (query.branch) {
      where.branch = { equals: query.branch, mode: 'insensitive' };
    }

    if (query.batchYear) {
      where.batchYear = query.batchYear;
    }

    if (query.isVerified !== undefined) {
      where.isVerified = query.isVerified === 'true';
    }

    // Filter by placement status via accepted offers
    if (query.placementStatus === 'PLACED') {
      where.offers = {
        some: { status: 'ACCEPTED' },
      };
    } else if (query.placementStatus === 'UNPLACED') {
      where.offers = {
        none: { status: 'ACCEPTED' },
      };
    }

    // Search query spanning user name, email, roll number, branch, and skills
    if (query.search) {
      where.OR = [
        { user: { name: { contains: query.search, mode: 'insensitive' } } },
        { user: { email: { contains: query.search, mode: 'insensitive' } } },
        { enrollmentNumber: { contains: query.search, mode: 'insensitive' } },
        { branch: { contains: query.search, mode: 'insensitive' } },
        { skills: { has: query.search } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    // 4. Parallel execution for high-throughput, low-latency responses
    const [total, students, totalGlobalPlaced, totalGlobalStudents] = await Promise.all([
      prisma.studentProfile.count({ where }),
      prisma.studentProfile.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { [query.sortBy]: query.sortOrder },
        select: {
          id: true,
          enrollmentNumber: true,
          branch: true,
          batchYear: true,
          isVerified: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              isActive: true,
            },
          },
          college: {
            select: {
              id: true,
              name: true,
              code: true,
              city: true,
            },
          },
          offers: {
            where: { status: 'ACCEPTED' },
            take: 1,
            select: {
              id: true,
            },
          },
        },
      }),
      // Global placed students count for fast summary widgets
      prisma.studentProfile.count({
        where: { offers: { some: { status: 'ACCEPTED' } } },
      }),
      // Total registered students count
      prisma.studentProfile.count(),
    ]);

    // 5. Format lean payload with placement boolean
    const roster = students.map((s) => ({
      id: s.id,
      name: s.user.name,
      email: s.user.email,
      avatarUrl: s.user.avatarUrl,
      isActive: s.user.isActive,
      enrollmentNumber: s.enrollmentNumber,
      branch: s.branch,
      batchYear: s.batchYear,
      isVerified: s.isVerified,
      college: s.college,
      isPlaced: s.offers.length > 0,
      createdAt: s.createdAt,
    }));

    const totalPages = Math.ceil(total / query.limit) || 1;

    return successResponse(
      {
        students: roster,
        summary: {
          totalGlobalStudents,
          totalGlobalPlaced,
          totalGlobalUnplaced: totalGlobalStudents - totalGlobalPlaced,
          overallPlacementRate:
            totalGlobalStudents > 0
              ? `${((totalGlobalPlaced / totalGlobalStudents) * 100).toFixed(1)}%`
              : '0%',
        },
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages,
          hasNextPage: query.page < totalPages,
          hasPrevPage: query.page > 1,
        },
      },
      'Students list retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_STUDENTS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch students', 500);
  }
}
