import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { adminCompanyQuerySchema } from '@/lib/validations/admin.schema';

/**
 * GET /api/admin/companies
 * Production-grade paginated company list for Super Admin.
 * Default 10 companies/page with verification filter and search.
 */
export async function GET(req: NextRequest) {
  try {
    await requireRole([Role.SUPER_ADMIN], req);

    const { searchParams } = new URL(req.url);
    const query = adminCompanyQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      isVerified: searchParams.get('isVerified') ?? undefined,
      industry: searchParams.get('industry') ?? undefined,
      location: searchParams.get('location') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      sortOrder: searchParams.get('sortOrder') ?? undefined,
    });

    const where: any = {};

    if (query.isVerified === 'true') {
      where.isVerified = true;
    } else if (query.isVerified === 'false') {
      where.isVerified = false;
    }

    if (query.industry) {
      where.industry = { equals: query.industry, mode: 'insensitive' };
    }

    if (query.location) {
      where.location = { contains: query.location, mode: 'insensitive' };
    }

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { website: { contains: query.search, mode: 'insensitive' } },
        { industry: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    const [total, companies, verifiedCount, unverifiedCount] = await Promise.all([
      prisma.company.count({ where }),
      prisma.company.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { [query.sortBy]: query.sortOrder },
        select: {
          id: true,
          name: true,
          website: true,
          logoUrl: true,
          industry: true,
          location: true,
          isVerified: true,
          createdAt: true,
          _count: {
            select: {
              jobs: true,
              recruiters: true,
              offers: true,
            },
          },
        },
      }),
      prisma.company.count({ where: { isVerified: true } }),
      prisma.company.count({ where: { isVerified: false } }),
    ]);

    const totalPages = Math.ceil(total / query.limit) || 1;

    return successResponse(
      {
        companies,
        summary: {
          totalCompanies: verifiedCount + unverifiedCount,
          verifiedCompanies: verifiedCount,
          pendingVerification: unverifiedCount,
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
      'Companies list retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_COMPANIES_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch companies', 500);
  }
}
