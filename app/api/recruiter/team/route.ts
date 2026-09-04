import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const addTeamMemberSchema = z.object({
  name: z.string().trim().min(2, 'Recruiter name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid work email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  designation: z.string().trim().min(2, 'Designation is required').default('Campus Recruiter'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
});

/**
 * GET /api/recruiter/team
 * Get all recruiters belonging to the currently authenticated recruiter's company.
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const currentRecruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        company: {
          include: {
            recruiters: {
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
        },
      },
    });

    if (!currentRecruiter || !currentRecruiter.company) {
      return errorResponse('Recruiter profile or associated company not found', 404);
    }

    return successResponse(
      {
        company: {
          id: currentRecruiter.company.id,
          name: currentRecruiter.company.name,
          isVerified: currentRecruiter.company.isVerified,
          logoUrl: currentRecruiter.company.logoUrl,
        },
        team: currentRecruiter.company.recruiters,
      },
      'Company recruitment team fetched successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return handleApiError(error, 'Failed to fetch recruitment team', '[GET_RECRUITER_TEAM_ERROR]');
  }
}

/**
 * POST /api/recruiter/team
 * Add another recruiter to this company.
 * Guard: The company must be verified by the Super Admin.
 */
export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const currentRecruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { company: true },
    });

    if (!currentRecruiter || !currentRecruiter.company) {
      return errorResponse('Recruiter profile or associated company not found', 404);
    }

    if (!currentRecruiter.company.isVerified) {
      return errorResponse(
        `Verification Pending: "${currentRecruiter.company.name}" has not yet been verified by the Super Admin. You cannot add team recruiters until the company is verified.`,
        403
      );
    }

    const body = await req.json();
    const parsedData = addTeamMemberSchema.parse(body);
    const email = parsedData.email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('A user with this email address already exists on CampusHire', 409);
    }

    const passwordHash = await hashPassword(parsedData.password);

    const newRecruiterUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: parsedData.name.trim(),
          email,
          passwordHash,
          avatarUrl: parsedData.avatarUrl || null,
          role: Role.RECRUITER,
          recruiter: {
            create: {
              companyId: currentRecruiter.companyId,
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

    const { passwordHash: _, ...safeUser } = newRecruiterUser;

    return successResponse(
      safeUser,
      `Recruiter "${newRecruiterUser.name}" successfully added to ${currentRecruiter.company.name}`,
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return handleApiError(error, 'Failed to add recruiter to team', '[POST_RECRUITER_TEAM_ERROR]');
  }
}
