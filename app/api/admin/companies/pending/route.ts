import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const pendingCompanyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().optional(),
});

/**
 * GET /api/admin/companies/pending
 * Dedicated endpoint for the Super Admin "Pending Company Approvals" dashboard page.
 * Returns only unverified companies (isVerified = false) with primary recruiter contact for fast 1-click verification.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate caller as SUPER_ADMIN
    await requireRole([Role.SUPER_ADMIN], req);

    // 2. Parse query parameters
    const { searchParams } = new URL(req.url);
    const query = pendingCompanyQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    });

    // 3. Strict filter: only unverified companies
    const where: any = {
      isVerified: false,
    };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { website: { contains: query.search, mode: 'insensitive' } },
        { industry: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    // 4. Parallel database query for low latency
    const [totalPending, pendingCompanies] = await Promise.all([
      prisma.company.count({ where }),
      prisma.company.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' }, // Latest pending submissions first
        select: {
          id: true,
          name: true,
          website: true,
          logoUrl: true,
          industry: true,
          location: true,
          description: true,
          isVerified: true,
          createdAt: true,
          recruiters: {
            take: 1, // Primary applicant recruiter contact
            select: {
              id: true,
              designation: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                  createdAt: true,
                },
              },
            },
          },
          _count: {
            select: {
              recruiters: true,
              jobs: true,
            },
          },
        },
      }),
    ]);

    const formattedPendingCompanies = pendingCompanies.map((c) => {
      const primaryRecruiter = c.recruiters[0] || null;
      return {
        id: c.id,
        name: c.name,
        website: c.website,
        logoUrl: c.logoUrl,
        industry: c.industry,
        location: c.location,
        description: c.description,
        isVerified: c.isVerified,
        submittedAt: c.createdAt,
        totalRecruitersRegistered: c._count.recruiters,
        applicantRecruiter: primaryRecruiter
          ? {
              recruiterId: primaryRecruiter.id,
              userId: primaryRecruiter.user.id,
              name: primaryRecruiter.user.name,
              email: primaryRecruiter.user.email,
              avatarUrl: primaryRecruiter.user.avatarUrl,
              designation: primaryRecruiter.designation,
              registeredAt: primaryRecruiter.user.createdAt,
            }
          : null,
      };
    });

    const totalPages = Math.ceil(totalPending / query.limit) || 1;

    return successResponse(
      {
        pendingCompanies: formattedPendingCompanies,
        totalPending,
        pagination: {
          page: query.page,
          limit: query.limit,
          total: totalPending,
          totalPages,
          hasNextPage: query.page < totalPages,
          hasPrevPage: query.page > 1,
        },
      },
      'Pending unverified companies retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_PENDING_COMPANIES_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch pending companies', 500);
  }
}
