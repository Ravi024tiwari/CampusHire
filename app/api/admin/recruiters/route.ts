import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Role } from '@/src/generated/prisma';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const createRecruiterSchema = z.object({
  name: z.string().trim().min(2, 'Recruiter name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid work email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  companyId: z.string().min(1, 'Please select a corporate partner'),
  designation: z.string().trim().min(2, 'Designation is required').default('Campus Recruiter'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
});

/**
 * GET /api/admin/recruiters
 * Paginated, filtered list of all corporate recruiters across companies for Super Admin.
 * Supports filtering by search (name/email), companyId, designation, and pagination.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim() || '';
    const companyId = searchParams.get('companyId')?.trim() || '';
    const designation = searchParams.get('designation')?.trim() || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    // Build dynamic Prisma filter clause
    const whereClause: any = {};

    if (companyId && companyId !== 'all') {
      whereClause.companyId = companyId;
    }

    if (designation && designation !== 'all') {
      whereClause.designation = {
        contains: designation,
        mode: 'insensitive',
      };
    }

    if (search) {
      whereClause.OR = [
        {
          user: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          company: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          designation: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    // Execute queries in parallel
    const [totalRecruitersCount, recruiters, allCompanies, verifiedCompaniesCount, totalDrivesCount] = await Promise.all([
      prisma.recruiterProfile.count({ where: whereClause }),
      prisma.recruiterProfile.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              isActive: true,
              createdAt: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              industry: true,
              isVerified: true,
              location: true,
              _count: {
                select: {
                  jobs: true,
                  offers: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      // Fetch verified companies for selection & filter dropdown
      prisma.company.findMany({
        where: { isVerified: true },
        select: {
          id: true,
          name: true,
          logoUrl: true,
          industry: true,
          isVerified: true,
          _count: {
            select: {
              recruiters: true,
              jobs: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.company.count({ where: { isVerified: true } }),
      prisma.job.count(),
    ]);

    const totalPages = Math.ceil(totalRecruitersCount / limit) || 1;

    return successResponse(
      {
        recruiters,
        companies: allCompanies,
        meta: {
          total: totalRecruitersCount,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        stats: {
          totalRecruiters: totalRecruitersCount,
          verifiedCompaniesCount,
          totalDrivesCount,
        },
      },
      'Recruiters fetched successfully'
    );
  } catch (error: any) {
    return handleApiError(error, 'Failed to fetch recruiters list', '[GET_ADMIN_RECRUITERS_ERROR]');
  }
}

/**
 * POST /api/admin/recruiters
 * Super Admin provision a new corporate recruiter for any verified partner company.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = createRecruiterSchema.parse(body);
    const email = parsedData.email.toLowerCase().trim();

    // 1. Verify that target company exists and is verified
    const company = await prisma.company.findUnique({
      where: { id: parsedData.companyId },
    });

    if (!company) {
      return errorResponse('Target company not found', 404);
    }

    if (!company.isVerified) {
      return errorResponse(
        `Verification Required: "${company.name}" has not yet been verified by the Super Admin. Recruiters can only be provisioned for verified partner companies.`,
        403
      );
    }

    // 2. Check for duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('A user with this email address already exists on CampusHire', 409);
    }

    const passwordHash = await hashPassword(parsedData.password);

    // 3. Atomically create User (role: RECRUITER) + RecruiterProfile
    const newRecruiter = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: parsedData.name.trim(),
          email,
          passwordHash,
          avatarUrl: parsedData.avatarUrl || null,
          role: Role.RECRUITER,
          recruiter: {
            create: {
              companyId: company.id,
              designation: parsedData.designation.trim(),
            },
          },
        },
        include: {
          recruiter: {
            include: {
              company: true,
            },
          },
        },
      });

      return user;
    });

    const { passwordHash: _, ...safeUser } = newRecruiter;

    return successResponse(
      safeUser,
      `Recruiter "${newRecruiter.name}" successfully provisioned for ${company.name}`,
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to provision new recruiter', '[CREATE_ADMIN_RECRUITER_ERROR]');
  }
}
