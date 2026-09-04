import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const pendingCollegeQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().optional(),
});

/**
 * GET /api/admin/colleges/pending
 * Dedicated endpoint for the Super Admin "Pending College Approvals" dashboard page.
 * Returns only unverified colleges (isVerified = false) with their TPO contact details for fast verification.
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate caller as SUPER_ADMIN
    await requireRole([Role.SUPER_ADMIN], req);

    // 2. Parse query parameters
    const { searchParams } = new URL(req.url);
    const query = pendingCollegeQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    });

    // 3. Strict filter: only unverified colleges
    const where: any = {
      isVerified: false,
    };

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

    // 4. Parallel database query for low latency
    const [totalPending, pendingColleges] = await Promise.all([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' }, // Latest pending submissions first
        select: {
          id: true,
          name: true,
          code: true,
          domain: true,
          city: true,
          state: true,
          logoUrl: true,
          isVerified: true,
          createdAt: true,
          createdById: true,
          createdRole: true,
          contactEmail: true,
          contactPhone: true,
          tpos: {
            select: {
              id: true,
              designation: true,
              department: true,
              isActive: true,
              createdAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
          },
          _count: {
            select: {
              students: true,
            },
          },
        },
      }),
    ]);

    const formattedPendingColleges = pendingColleges.map((c) => {
      const primaryTpo = c.tpos.find((t) => t.isActive) || c.tpos[0] || null;
      return {
        id: c.id,
        name: c.name,
        code: c.code,
        domain: c.domain,
        city: c.city,
        state: c.state,
        logoUrl: c.logoUrl,
        isVerified: c.isVerified,
        submittedAt: c.createdAt,
        createdById: c.createdById,
        createdRole: c.createdRole,
        contactEmail: c.contactEmail,
        contactPhone: c.contactPhone,
        registeredStudentsCount: c._count.students,
        applicantTpo: primaryTpo
          ? {
              tpoId: primaryTpo.id,
              userId: primaryTpo.user.id,
              name: primaryTpo.user.name,
              email: primaryTpo.user.email,
              avatarUrl: primaryTpo.user.avatarUrl,
              designation: primaryTpo.designation,
              registeredAt: primaryTpo.createdAt,
            }
          : null,
      };
    });

    const totalPages = Math.ceil(totalPending / query.limit) || 1;

    return successResponse(
      {
        pendingColleges: formattedPendingColleges,
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
      'Pending unverified colleges retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_PENDING_COLLEGES_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch pending colleges', 500);
  }
}
