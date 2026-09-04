import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Role } from '@/src/generated/prisma';
import { hashPassword } from '@/lib/auth';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const addRecruiterSchema = z.object({
  name: z.string().trim().min(2, 'Recruiter name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid work email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  designation: z.string().trim().min(2, 'Designation is required (e.g. Lead Talent Partner)').default('Campus Recruiter'),
  avatarUrl: z.string().url('Invalid avatar URL').optional().or(z.literal('')),
});

/**
 * GET /api/companies/[id]/recruiters
 * List all recruiters assigned to a specific company.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: companyId } = await params;

    const company = await prisma.company.findUnique({
      where: { id: companyId },
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
    });

    if (!company) {
      return errorResponse('Company not found', 404);
    }

    return successResponse(
      {
        company: {
          id: company.id,
          name: company.name,
          isVerified: company.isVerified,
        },
        recruiters: company.recruiters,
      },
      'Company recruiters fetched successfully'
    );
  } catch (error: any) {
    return handleApiError(error, 'Failed to fetch company recruiters', '[GET_COMPANY_RECRUITERS_ERROR]');
  }
}

/**
 * POST /api/companies/[id]/recruiters
 * Add a new recruiter to a verified company.
 * Guard: Company MUST be verified by Super Admin before recruiters can be added.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: companyId } = await params;

    // 1. Verify Company exists and is verified
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return errorResponse('Company not found', 404);
    }

    if (!company.isVerified) {
      return errorResponse(
        `Verification Required: "${company.name}" has not yet been verified by the Super Admin. Recruiters can only be added after the company is verified.`,
        403
      );
    }

    const body = await req.json();
    const parsedData = addRecruiterSchema.parse(body);
    const email = parsedData.email.toLowerCase().trim();

    // 2. Check for duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('A user with this email address already exists on CampusHire', 409);
    }

    const passwordHash = await hashPassword(parsedData.password);

    // 3. Create User and Recruiter Profile in transaction
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
      `Recruiter "${newRecruiter.name}" successfully added to ${company.name}`,
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to add recruiter to company', '[ADD_RECRUITER_ERROR]');
  }
}
