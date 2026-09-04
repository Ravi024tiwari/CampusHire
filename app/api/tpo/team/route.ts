import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const createTpoMemberSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().toLowerCase().email('A valid official college email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  designation: z.string().trim().min(2, 'Designation is required').default('Training & Placement Officer'),
  department: z.string().trim().min(2, 'Department is required').default('Central Placement Cell'),
});

/**
 * GET /api/tpo/team
 * Retrieve all Placement Officers (TPOs) appointed for this College.
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: { college: true },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or linked college not found', 404);
    }

    const collegeId = tpo.collegeId;

    const teamMembers = await prisma.tpoProfile.findMany({
      where: { collegeId },
      orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
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
    });

    const formattedTeam = teamMembers.map((member) => ({
      id: member.id,
      userId: member.user.id,
      name: member.user.name,
      email: member.user.email,
      avatarUrl: member.user.avatarUrl,
      designation: member.designation || 'Training & Placement Officer',
      department: member.department || 'Central Placement Cell',
      isActive: member.isActive,
      tenureStart: member.tenureStart,
      tenureEnd: member.tenureEnd,
      appointedAt: member.createdAt,
      isCurrentUser: member.userId === authUser.userId,
    }));

    return successResponse(
      {
        college: {
          id: tpo.college?.id,
          name: tpo.college?.name,
          isVerified: tpo.college?.isVerified,
        },
        team: formattedTeam,
        totalMembers: formattedTeam.length,
        activeMembers: formattedTeam.filter((m) => m.isActive).length,
      },
      'Placement team retrieved successfully'
    );
  } catch (error: any) {
    return handleApiError(error, 'Failed to fetch college placement team', '[GET_TPO_TEAM_ERROR]');
  }
}

/**
 * POST /api/tpo/team
 * Appoint a new Placement Officer (TPO) to this College.
 */
export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const currentTpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: { college: true },
    });

    if (!currentTpo || !currentTpo.collegeId || !currentTpo.college) {
      return errorResponse('You must have a registered college to appoint placement officers.', 400);
    }

    const college = currentTpo.college;

    const body = await req.json();
    const validatedData = createTpoMemberSchema.parse(body);
    const email = validatedData.email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse(
        `A user account with email "${email}" already exists. Please provide an official email for the new officer.`,
        409
      );
    }

    const passwordHash = await hashPassword(validatedData.password);

    // Create user and link to this specific college
    const newOfficer = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: validatedData.name.trim(),
          email,
          passwordHash,
          role: Role.TPO_ADMIN,
          tpo: {
            create: {
              collegeId: college.id,
              designation: validatedData.designation.trim(),
              department: validatedData.department.trim(),
              isActive: true,
              tenureStart: new Date(),
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

    const { passwordHash: _, ...safeUser } = newOfficer;

    return successResponse(
      {
        officer: {
          id: safeUser.tpo?.id,
          userId: safeUser.id,
          name: safeUser.name,
          email: safeUser.email,
          designation: safeUser.tpo?.designation,
          department: safeUser.tpo?.department,
          isActive: safeUser.tpo?.isActive,
          appointedAt: safeUser.tpo?.createdAt,
        },
        collegeName: college.name,
      },
      `Placement Officer ${validatedData.name} appointed successfully to ${college.name}`,
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to appoint placement officer', '[POST_TPO_TEAM_ERROR]');
  }
}
