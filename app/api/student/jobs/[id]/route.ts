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
    const authUser = await requireRole([Role.STUDENT], req);
    const { id } = await context.params;

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student || !student.collegeId) {
      return errorResponse('Student profile or associated college not found', 404);
    }

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            website: true,
            industry: true,
            location: true,
            description: true,
            isVerified: true,
          },
        },
        college: {
          select: {
            id: true,
            name: true,
            code: true,
            city: true,
          },
        },
        applications: {
          where: { studentId: student.id },
          select: {
            id: true,
            status: true,
            resumeUrl: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (!job || job.status !== 'ACTIVE') {
      return errorResponse('Job drive not found or is no longer active', 404);
    }

    // Security Check: Verify job belongs to student's college
    if (job.collegeId !== student.collegeId) {
      return errorResponse('Access denied. This placement drive is not open for your college.', 403);
    }

    const acceptedOffer = await prisma.application.findFirst({
      where: {
        studentId: student.id,
        status: 'ACCEPTED',
      },
      include: {
        job: {
          select: {
            company: {
              select: { name: true },
            },
          },
        },
      },
    });

    const now = new Date();
    const isAlreadyPlaced = Boolean(acceptedOffer);
    const isCgpaEligible = student.cgpa >= job.minCgpa;
    const isBranchEligible =
      job.allowedBranches.length === 0 || job.allowedBranches.includes(student.branch);
    const isBatchEligible =
      job.eligibleBatches.length === 0 || job.eligibleBatches.includes(student.batchYear);
    const isDeadlineActive = now <= new Date(job.deadline);
    const isEligible = !isAlreadyPlaced && isCgpaEligible && isBranchEligible && isBatchEligible && isDeadlineActive;

    const application = job.applications[0] || null;
    const { applications: _, ...jobDetails } = job;

    return successResponse(
      {
        job: jobDetails,
        eligibility: {
          isEligible,
          isAlreadyPlaced,
          placedCompany: acceptedOffer?.job.company.name || null,
          isCgpaEligible,
          isBranchEligible,
          isBatchEligible,
          isDeadlineActive,
          studentCgpa: student.cgpa,
          requiredCgpa: job.minCgpa,
          studentBranch: student.branch,
          allowedBranches: job.allowedBranches,
          studentBatch: student.batchYear,
          eligibleBatches: job.eligibleBatches,
        },
        hasApplied: Boolean(application),
        application,
      },
      'Job drive details retrieved successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_STUDENT_JOB_DETAIL_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch job details', 500);
  }
}
