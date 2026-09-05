import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { updateJobSchema } from '@/lib/validations/job.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);
    const { id } = await context.params;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            code: true,
            city: true,
            state: true,
            logoUrl: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            website: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!job) {
      return errorResponse('Job drive not found', 404);
    }

    // Security Check: Enforce company isolation
    if (job.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. You can only view jobs from your company.', 403);
    }

    // Pipeline status distribution statistics
    const statusCounts = await prisma.application.groupBy({
      by: ['status'],
      where: { jobId: id },
      _count: { status: true },
    });

    const pipelineBreakdown = statusCounts.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    return successResponse({
      job,
      pipelineBreakdown,
    }, 'Job drive details retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_RECRUITER_JOB_DETAIL_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch job details', 500);
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);
    const { id } = await context.params;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return errorResponse('Job drive not found', 404);
    }

    // Security Check: Verify company ownership
    if (existingJob.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. You do not have permission to modify this job.', 403);
    }

    const body = await req.json();
    const parsedData = updateJobSchema.parse(body);

    if (parsedData.collegeId) {
      const collegeExists = await prisma.college.findUnique({
        where: { id: parsedData.collegeId },
      });
      if (!collegeExists) {
        return errorResponse('The specified target college does not exist', 404);
      }
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        ...(parsedData.title ? { title: parsedData.title } : {}),
        ...(parsedData.description ? { description: parsedData.description } : {}),
        ...(parsedData.type ? { type: parsedData.type } : {}),
        ...(parsedData.status ? { status: parsedData.status } : {}),
        ...(parsedData.location ? { location: parsedData.location } : {}),
        ...(parsedData.salaryPackage ? { salaryPackage: parsedData.salaryPackage } : {}),
        ...(parsedData.skills ? { skills: parsedData.skills } : {}),
        ...(parsedData.minCgpa !== undefined ? { minCgpa: parsedData.minCgpa } : {}),
        ...(parsedData.allowedBranches ? { allowedBranches: parsedData.allowedBranches } : {}),
        ...(parsedData.eligibleBatches ? { eligibleBatches: parsedData.eligibleBatches } : {}),
        ...(parsedData.deadline ? { deadline: parsedData.deadline } : {}),
        ...(parsedData.collegeId ? { collegeId: parsedData.collegeId } : {}),
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            code: true,
            city: true,
            state: true,
            logoUrl: true,
          },
        },
      },
    });

    return successResponse(updatedJob, 'Job drive updated successfully');
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[UPDATE_JOB_ERROR]', error);
    return errorResponse(error.message || 'Failed to update job drive', 500);
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);
    const { id } = await context.params;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return errorResponse('Job drive not found', 404);
    }

    // Security Check: Verify company ownership
    if (job.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. You do not have permission to delete this job.', 403);
    }

    // Production safety rule: If students have already applied, mark job as CLOSED instead of destructive purge
    if (job._count.applications > 0) {
      const closedJob = await prisma.job.update({
        where: { id },
        data: { status: 'CLOSED' },
      });
      return successResponse(
        closedJob,
        'Job drive has active applications, so it has been marked as CLOSED instead of permanently deleted'
      );
    }

    await prisma.job.delete({
      where: { id },
    });

    return successResponse({ deletedId: id }, 'Job drive removed successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[DELETE_JOB_ERROR]', error);
    return errorResponse(error.message || 'Failed to delete job drive', 500);
  }
}
