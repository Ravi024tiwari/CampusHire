import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, ApplicationStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

const applicantQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.nativeEnum(ApplicationStatus).optional(),
  branch: z.string().trim().optional(),
  minCgpa: z.coerce.number().min(0).max(10).optional(),
});

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);
    const { id: jobId } = await context.params;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, companyId: true, title: true },
    });

    if (!job) {
      return errorResponse('Job drive not found', 404);
    }

    // Security Check: Verify company ownership
    if (job.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. You can only view applicants for your company jobs.', 403);
    }

    const { searchParams } = new URL(req.url);
    const query = applicantQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      branch: searchParams.get('branch') ?? undefined,
      minCgpa: searchParams.get('minCgpa') ?? undefined,
    });

    const where: any = {
      jobId,
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.branch) {
      where.student = { branch: { equals: query.branch, mode: 'insensitive' } };
    }

    if (query.minCgpa !== undefined) {
      where.student = {
        ...where.student,
        cgpa: { gte: query.minCgpa },
      };
    }

    const skip = (query.page - 1) * query.limit;

    const [total, applications] = await Promise.all([
      prisma.application.count({ where }),
      prisma.application.findMany({
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
              college: {
                select: {
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const formattedApplicants = applications.map((app) => ({
      applicationId: app.id,
      status: app.status,
      appliedAt: app.createdAt,
      updatedAt: app.updatedAt,
      resumeUrl: app.resumeUrl,
      notes: app.notes,
      student: {
        id: app.student.id,
        name: app.student.user.name,
        email: app.student.user.email,
        avatarUrl: app.student.user.avatarUrl,
        enrollmentNumber: app.student.enrollmentNumber,
        branch: app.student.branch,
        batchYear: app.student.batchYear,
        cgpa: app.student.cgpa,
        tenthMarks: app.student.tenthMarks,
        twelfthMarks: app.student.twelfthMarks,
        skills: app.student.skills,
        linkedinUrl: app.student.linkedinUrl,
        githubUrl: app.student.githubUrl,
        portfolioUrl: app.student.portfolioUrl,
        college: app.student.college,
      },
    }));

    return successResponse(
      {
        jobTitle: job.title,
        applicants: formattedApplicants,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit),
          hasMore: query.page * query.limit < total,
        },
      },
      'Applicants fetched successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_RECRUITER_APPLICANTS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch applicants', 500);
  }
}
