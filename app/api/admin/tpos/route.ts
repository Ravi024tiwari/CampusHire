import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const createAdminTpoSchema = z.object({
  collegeId: z.string().min(1, 'Please select a verified college'),
  name: z.string().trim().min(2, 'TPO Officer name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid institutional email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  designation: z.string().trim().min(2, 'Designation is required').default('Head, Training & Placement Cell'),
  department: z.string().trim().optional().or(z.literal('')),
  avatarUrl: z.string().url().optional().or(z.literal('')).nullable(),
  isActive: z.boolean().optional().default(true),
});

/**
 * GET /api/admin/tpos
 * Returns all TPO profiles across the platform for Super Admin,
 * with search, college filter, and summary metrics.
 */
export async function GET(req: NextRequest) {
  try {
    await requireRole([Role.SUPER_ADMIN], req);

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim() || '';
    const collegeId = searchParams.get('collegeId')?.trim();
    const status = searchParams.get('status')?.trim(); // 'ACTIVE' | 'INACTIVE' | 'ALL'

    const where: any = {};

    if (collegeId) {
      where.collegeId = collegeId;
    }

    if (status === 'ACTIVE') {
      where.isActive = true;
    } else if (status === 'INACTIVE') {
      where.isActive = false;
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { designation: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
        { college: { name: { contains: search, mode: 'insensitive' } } },
        { college: { code: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [tpos, totalCount, activeCount] = await Promise.all([
      prisma.tpoProfile.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              role: true,
              isActive: true,
              createdAt: true,
            },
          },
          college: {
            select: {
              id: true,
              name: true,
              code: true,
              city: true,
              state: true,
              logoUrl: true,
              isVerified: true,
              _count: {
                select: {
                  students: true,
                  jobs: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.tpoProfile.count(),
      prisma.tpoProfile.count({ where: { isActive: true } }),
    ]);

    // Fetch verified colleges for dropdown selection
    const verifiedColleges = await prisma.college.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        name: true,
        code: true,
        city: true,
        state: true,
        logoUrl: true,
        domain: true,
        _count: {
          select: {
            tpos: true,
            students: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return successResponse({
      tpos,
      verifiedColleges,
      stats: {
        total: totalCount,
        active: activeCount,
        inactive: totalCount - activeCount,
        verifiedCollegesCount: verifiedColleges.length,
      },
    }, 'TPO officers retrieved successfully');
  } catch (error: any) {
    return handleApiError(error, 'Failed to fetch TPO officers', '[GET_ADMIN_TPOS_ERROR]');
  }
}

/**
 * POST /api/admin/tpos
 * Super Admin registers a new TPO for a verified college.
 */
export async function POST(req: NextRequest) {
  try {
    await requireRole([Role.SUPER_ADMIN], req);

    const body = await req.json();
    const parsedData = createAdminTpoSchema.parse(body);
    const email = parsedData.email.toLowerCase().trim();

    // Verify the college exists
    const college = await prisma.college.findUnique({
      where: { id: parsedData.collegeId },
      select: {
        id: true,
        name: true,
        code: true,
        isVerified: true,
      },
    });

    if (!college) {
      return errorResponse('Selected college was not found.', 404);
    }

    if (!college.isVerified) {
      return errorResponse(
        `Verification Required: "${college.name}" is not yet verified. Please verify the college first before appointing a TPO officer.`,
        403
      );
    }

    // Check if user email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('An account with this email address already exists on CampusHire.', 409);
    }

    const passwordHash = await hashPassword(parsedData.password);

    const newTpoUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: parsedData.name.trim(),
          email,
          passwordHash,
          avatarUrl: parsedData.avatarUrl || null,
          role: Role.TPO_ADMIN,
          isActive: parsedData.isActive ?? true,
          tpo: {
            create: {
              collegeId: college.id,
              designation: parsedData.designation.trim() || 'Head, Training & Placement Cell',
              department: parsedData.department?.trim() || 'Central Placement Cell',
              isActive: parsedData.isActive ?? true,
            },
          },
        },
        include: {
          tpo: {
            include: {
              college: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  logoUrl: true,
                  city: true,
                  state: true,
                },
              },
            },
          },
        },
      });

      return user;
    });

    const { passwordHash: _, ...safeUser } = newTpoUser;

    return successResponse(
      safeUser,
      `TPO Officer "${newTpoUser.name}" has been successfully appointed to ${college.name}.`,
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to register TPO officer', '[POST_ADMIN_TPO_ERROR]');
  }
}
