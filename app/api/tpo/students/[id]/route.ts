import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);
    const { id: studentId } = await context.params;

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatarUrl: true,
            isActive: true,
            createdAt: true,
          },
        },
        college: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        applications: {
          orderBy: { createdAt: 'desc' },
          include: {
            job: {
              select: {
                id: true,
                title: true,
                type: true,
                salaryPackage: true,
                location: true,
                company: {
                  select: {
                    id: true,
                    name: true,
                    logoUrl: true,
                  },
                },
              },
            },
          },
        },
        offers: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
              },
            },
            job: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      return errorResponse('Student not found', 404);
    }

    // Security Check: Verify student belongs to TPO's college
    if (student.collegeId !== tpo.collegeId) {
      return errorResponse('Access denied. Student belongs to a different college.', 403);
    }

    const acceptedOffer = student.offers.find((o) => o.status === 'ACCEPTED') || null;

    const portfolio = {
      id: student.id,
      name: student.user.name,
      email: student.user.email,
      avatarUrl: student.user.avatarUrl,
      enrollmentNumber: student.enrollmentNumber,
      branch: student.branch,
      batchYear: student.batchYear,
      cgpa: student.cgpa,
      tenthMarks: student.tenthMarks,
      twelfthMarks: student.twelfthMarks,
      skills: student.skills,
      resumeUrl: student.resumeUrl,
      linkedinUrl: student.linkedinUrl,
      githubUrl: student.githubUrl,
      portfolioUrl: student.portfolioUrl,
      isPlaced: Boolean(acceptedOffer),
      acceptedOffer,
      applications: student.applications.map((app) => ({
        applicationId: app.id,
        status: app.status,
        appliedAt: app.createdAt,
        updatedAt: app.updatedAt,
        jobTitle: app.job.title,
        jobType: app.job.type,
        salaryPackage: app.job.salaryPackage,
        location: app.job.location,
        companyName: app.job.company.name,
        companyLogoUrl: app.job.company.logoUrl,
      })),
      allOffers: student.offers,
    };

    return successResponse(portfolio, 'Student placement portfolio fetched successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_TPO_STUDENT_PORTFOLIO_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch student details', 500);
  }
}
