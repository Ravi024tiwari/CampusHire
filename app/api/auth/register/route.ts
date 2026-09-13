import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { Role } from '@/src/generated/prisma';
import { hashPassword, signToken, setSessionCookie } from '@/lib/auth';
import { registerSchema } from '@/lib/validations/auth.schema';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = registerSchema.parse(body);

    const email = parsedData.email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse('A user with this email already exists', 409);
    }

    const passwordHash = await hashPassword(parsedData.password);

    let newUser;

    switch (parsedData.role) {
      case Role.STUDENT: {
        // Verify target college exists
        const college = await prisma.college.findUnique({
          where: { id: parsedData.collegeId },
        });

        if (!college) {
          return errorResponse('The selected college was not found. Please choose a valid registered college.', 404);
        }

        // Check if enrollment number is already registered
        const existingEnrollment = await prisma.studentProfile.findUnique({
          where: { enrollmentNumber: parsedData.enrollmentNumber.trim() },
        });

        if (existingEnrollment) {
          return errorResponse('A student with this enrollment number is already registered', 409);
        }

        newUser = await prisma.$transaction(async (tx) => {
          const user = await tx.user.create({
            data: {
              name: parsedData.name.trim(),
              email,
              passwordHash,
              role: Role.STUDENT,
              student: {
                create: {
                  collegeId: parsedData.collegeId,
                  enrollmentNumber: parsedData.enrollmentNumber.trim(),
                  branch: parsedData.branch.trim(),
                  batchYear: parsedData.batchYear,
                  cgpa: parsedData.cgpa,
                  phone: parsedData.phone || null,
                  tenthMarks: parsedData.tenthMarks ?? null,
                  twelfthMarks: parsedData.twelfthMarks ?? null,
                  skills: parsedData.skills ?? [],
                  linkedinUrl: parsedData.linkedinUrl || null,
                  githubUrl: parsedData.githubUrl || null,
                },
              },
            },
            include: {
              student: {
                include: {
                  college: true,
                },
              },
            },
          });
          return user;
        });
        break;
      }

      case Role.RECRUITER: {
        newUser = await prisma.$transaction(async (tx) => {
          // 1. Find or create persistent Company entity (Pending Super Admin Verification)
          let company = await tx.company.findFirst({
            where: {
              name: {
                equals: parsedData.companyName.trim(),
                mode: 'insensitive',
              },
            },
          });

          if (!company) {
            company = await tx.company.create({
              data: {
                name: parsedData.companyName.trim(),
                website: parsedData.website || null,
                logoUrl: parsedData.logoUrl || null,
                industry: parsedData.industry || null,
                location: parsedData.location || null,
                description: parsedData.description || null,
                isVerified: false, // Starts as pending Super Admin verification
              },
            });
          }

          // 2. Create Company User Account (login directly with company email & password)
          const user = await tx.user.create({
            data: {
              name: parsedData.companyName.trim(),
              email,
              passwordHash,
              avatarUrl: parsedData.logoUrl || null,
              role: Role.RECRUITER,
              recruiter: {
                create: {
                  companyId: company.id,
                  designation: 'Company Account',
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
        break;
      }

      case Role.TPO_ADMIN: {
        newUser = await prisma.$transaction(async (tx) => {
          // 1. Find or create persistent College entity
          let college = await tx.college.findFirst({
            where: {
              name: {
                equals: parsedData.collegeName.trim(),
                mode: 'insensitive',
              },
            },
          });

          if (!college) {
            college = await tx.college.create({
              data: {
                name: parsedData.collegeName.trim(),
                code: parsedData.collegeCode || null,
                domain: parsedData.collegeDomain || null,
                city: parsedData.collegeCity || null,
                state: parsedData.collegeState || null,
                contactEmail: parsedData.collegeContactEmail || null,
                contactPhone: parsedData.collegeContactPhone || null,
                logoUrl: parsedData.collegeLogoUrl || null,
                images: parsedData.collegeLogoUrl ? [parsedData.collegeLogoUrl] : [],
                createdRole: Role.TPO_ADMIN,
                isVerified: false,
              },
            });
          }

          // 2. Create TPO User and link to the College
          const user = await tx.user.create({
            data: {
              name: parsedData.name.trim(),
              email,
              passwordHash,
              role: Role.TPO_ADMIN,
              tpo: {
                create: {
                  collegeId: college.id,
                  designation: parsedData.designation.trim() || 'Head, Training & Placement Cell',
                  department: parsedData.department?.trim() || 'Central Placement Cell',
                  isActive: true,
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
        break;
      }

      default:
        return errorResponse('Invalid role provided', 400);
    }

    // Generate JWT token
    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    await setSessionCookie(token);

    // Strip passwordHash before returning
    const { passwordHash: _, ...safeUser } = newUser;

    return successResponse(
      {
        user: safeUser,
        token,
      },
      'User registered and authenticated successfully',
      201
    );
  } catch (error: any) {
    return handleApiError(
      error,
      'Unable to complete registration at this time. Please check your information and try again.',
      '[AUTH_REGISTER_ERROR]'
    );
  }
}
