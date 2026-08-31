import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, OfferStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const recruiterOfferQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.nativeEnum(OfferStatus).optional(),
  collegeId: z.string().optional(),
  search: z.string().trim().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const query = recruiterOfferQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      collegeId: searchParams.get('collegeId') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    });

    const where: any = {
      companyId: recruiter.companyId, // Strict company boundary
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.collegeId) {
      where.collegeId = query.collegeId;
    }

    if (query.search) {
      where.OR = [
        { student: { user: { name: { contains: query.search, mode: 'insensitive' } } } },
        { designation: { contains: query.search, mode: 'insensitive' } },
        { college: { name: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    const [total, offers] = await Promise.all([
      prisma.offer.count({ where }),
      prisma.offer.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
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
          job: {
            select: {
              id: true,
              title: true,
              type: true,
            },
          },
        },
      }),
    ]);

    const formattedOffers = offers.map((offer) => ({
      id: offer.id,
      applicationId: offer.applicationId,
      status: offer.status,
      designation: offer.designation,
      salaryPackage: offer.salaryPackage,
      location: offer.location,
      joiningDate: offer.joiningDate,
      letterUrl: offer.letterUrl,
      notes: offer.notes,
      expiresAt: offer.expiresAt,
      acceptedAt: offer.acceptedAt,
      declinedAt: offer.declinedAt,
      createdAt: offer.createdAt,
      student: {
        id: offer.student.id,
        name: offer.student.user.name,
        email: offer.student.user.email,
        avatarUrl: offer.student.user.avatarUrl,
        enrollmentNumber: offer.student.enrollmentNumber,
        branch: offer.student.branch,
        batchYear: offer.student.batchYear,
        cgpa: offer.student.cgpa,
      },
      college: offer.college,
      job: offer.job,
    }));

    return successResponse(
      {
        offers: formattedOffers,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit),
          hasMore: query.page * query.limit < total,
        },
      },
      'Company placement offers retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_RECRUITER_OFFERS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch company offers', 500);
  }
}
