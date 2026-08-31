import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, JobType } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const studentJobQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().optional(),
  type: z.nativeEnum(JobType).optional(),
  eligibleOnly: z.enum(['true', 'false']).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student || !student.collegeId) {
      return errorResponse('Student profile or associated college not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const query = studentJobQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      type: searchParams.get('type') ?? undefined,
      eligibleOnly: searchParams.get('eligibleOnly') ?? undefined,
    });

    const where: any = {
      collegeId: student.collegeId, // Strict campus isolation
      status: 'ACTIVE',             // Only active placement drives
    };

    if (query.type) {
      where.type = query.type;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
        { company: { name: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    if (query.eligibleOnly === 'true') {
      where.minCgpa = { lte: student.cgpa };
      where.deadline = { gt: new Date() };
    }

    const skip = (query.page - 1) * query.limit;

    const [total, rawJobs] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              website: true,
              industry: true,
              isVerified: true,
            },
          },
          applications: {
            where: { studentId: student.id },
            select: {
              id: true,
              status: true,
              createdAt: true,
            },
          },
        },
      }),
    ]);

    const now = new Date();

    // Map jobs with dynamic eligibility and application status computation
    const jobs = rawJobs.map((job) => {
      const isCgpaEligible = student.cgpa >= job.minCgpa;
      const isBranchEligible =
        job.allowedBranches.length === 0 || job.allowedBranches.includes(student.branch);
      const isBatchEligible =
        job.eligibleBatches.length === 0 || job.eligibleBatches.includes(student.batchYear);
      const isDeadlineActive = now <= new Date(job.deadline);

      const isEligible = isCgpaEligible && isBranchEligible && isBatchEligible && isDeadlineActive;
      const application = job.applications[0] || null;

      const { applications: _, ...jobData } = job;

      return {
        ...jobData,
        eligibility: {
          isEligible,
          isCgpaEligible,
          isBranchEligible,
          isBatchEligible,
          isDeadlineActive,
          studentCgpa: student.cgpa,
          requiredCgpa: job.minCgpa,
          studentBranch: student.branch,
          allowedBranches: job.allowedBranches,
        },
        hasApplied: Boolean(application),
        application: application
          ? {
              id: application.id,
              status: application.status,
              appliedAt: application.createdAt,
            }
          : null,
      };
    });

    return successResponse(
      {
        jobs,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit),
          hasMore: query.page * query.limit < total,
        },
      },
      'Campus placement jobs fetched successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_STUDENT_JOBS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch student jobs', 500);
  }
}
