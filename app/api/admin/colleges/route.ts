import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { adminCollegeQuerySchema } from '@/lib/validations/admin.schema';

/**
 * GET /api/admin/colleges
 * Defaults to 10 colleges per page with parallel count/data execution for minimal latency.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate caller as SUPER_ADMIN
    await requireRole([Role.SUPER_ADMIN], req);

    // 2. Extract & validate query parameters
    const { searchParams } = new URL(req.url);
    const query = adminCollegeQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      name: searchParams.get('name') ?? undefined,
      state: searchParams.get('state') ?? undefined,
      city: searchParams.get('city') ?? undefined,
      code: searchParams.get('code') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      sortOrder: searchParams.get('sortOrder') ?? undefined,
    });

    // 3. Build optimized WHERE condition
    const where: any = {};

    if (query.name) {
      where.name = { contains: query.name, mode: 'insensitive' };
    }

    if (query.state) {
      where.state = { equals: query.state, mode: 'insensitive' };
    }

    if (query.city) {
      where.city = { equals: query.city, mode: 'insensitive' };
    }

    if (query.code) {
      where.code = { equals: query.code, mode: 'insensitive' };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { code: { contains: query.search, mode: 'insensitive' } },
        { domain: { contains: query.search, mode: 'insensitive' } },
        { city: { contains: query.search, mode: 'insensitive' } },
        { state: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    // 4. Execute count and findMany in parallel via Promise.all for low-latency DB roundtrip
    const [total, colleges] = await Promise.all([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { [query.sortBy]: query.sortOrder },
        select: {
          id: true,
          name: true,
          code: true,
          domain: true,
          city: true,
          state: true,
          logoUrl: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              students: true,
              tpos: true,
              jobs: true,
              offers: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / query.limit) || 1;

    // 5. Structure payload response
    return successResponse(
      {
        colleges,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages,
          hasNextPage: query.page < totalPages,
          hasPrevPage: query.page > 1,
        },
      },
      'Colleges retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_COLLEGES_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch colleges', 500);
  }
}
