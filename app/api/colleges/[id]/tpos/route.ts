import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Role } from '@/src/generated/prisma';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const createTpoSchema = z.object({
  name: z.string().trim().min(2, 'TPO Officer name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid institutional email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  designation: z.string().trim().min(2, 'Designation is required').default('Head, Training & Placement Cell'),
  department: z.string().trim().optional().or(z.literal('')),
  avatarUrl: z.string().url().optional().or(z.literal('')).nullable(),
  isActive: z.boolean().optional().default(true),
});

/**
 * GET /api/colleges/[id]/tpos
 * List all TPO officers appointed to a college.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: collegeId } = await params;

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
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
                createdAt: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!college) {
      return errorResponse('College not found', 404);
    }

    return successResponse(
      {
        college: {
          id: college.id,
          name: college.name,
          isVerified: college.isVerified,
        },
        tpos: college.tpos,
      },
      'College TPO officers fetched successfully'
    );
  } catch (error: any) {
    return handleApiError(error, 'Failed to fetch college TPOs', '[GET_COLLEGE_TPOS_ERROR]');
  }
}

/**
 * POST /api/colleges/[id]/tpos
 * Appoint a new TPO officer to a verified college.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: collegeId } = await params;

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return errorResponse('College not found', 404);
    }

    if (!college.isVerified) {
      return errorResponse(
        `Verification Required: "${college.name}" has not yet been verified by the Super Admin. TPO officers can only be appointed to verified institutions.`,
        403
      );
    }

    const body = await req.json();
    const parsedData = createTpoSchema.parse(body);
    const email = parsedData.email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('A user with this email address already exists on CampusHire', 409);
    }

    const passwordHash = await hashPassword(parsedData.password);

    const newTpo = await prisma.$transaction(async (tx) => {
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
              college: true,
            },
          },
        },
      });

      return user;
    });

    const { passwordHash: _, ...safeUser } = newTpo;

    return successResponse(
      safeUser,
      `TPO Officer "${newTpo.name}" successfully appointed to ${college.name}`,
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to appoint TPO officer', '[APPOINT_TPO_ERROR]');
  }
}
