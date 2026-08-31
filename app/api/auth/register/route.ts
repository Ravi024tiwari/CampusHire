import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { Role } from '@/src/generated/prisma';
import { hashPassword, signToken, setSessionCookie } from '@/lib/auth';
import { registerSchema } from '@/lib/validations/auth.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

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
          // Find or create company
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
                website: parsedData.companyWebsite || null,
                industry: parsedData.companyIndustry || null,
              },
            });
          }

          const user = await tx.user.create({
            data: {
              name: parsedData.name.trim(),
              email,
              passwordHash,
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
        break;
      }

      case Role.TPO_ADMIN: {
        newUser = await prisma.$transaction(async (tx) => {
          let collegeId = parsedData.collegeId;

          // If collegeId is provided, verify it exists
          if (collegeId) {
            const existingCollege = await tx.college.findUnique({
              where: { id: collegeId },
            });
            if (!existingCollege) {
              throw new Error('The selected college was not found');
            }
          } else if (parsedData.collegeName) {
            // Onboard/Find college by name
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
                },
              });
            }
            collegeId = college.id;
          }

          if (!collegeId) {
            throw new Error('College information is required for TPO registration');
          }

          const user = await tx.user.create({
            data: {
              name: parsedData.name.trim(),
              email,
              passwordHash,
              role: Role.TPO_ADMIN,
              tpo: {
                create: {
                  collegeId,
                  designation: parsedData.designation?.trim() || 'TPO Officer',
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
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    console.error('[AUTH_REGISTER_ERROR]', error);
    return errorResponse(error.message || 'Internal server error during registration', 500);
  }
}
