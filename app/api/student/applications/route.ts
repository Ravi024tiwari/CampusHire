import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { applyJobSchema, applicationQuerySchema } from '@/lib/validations/application.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student || !student.collegeId) {
      return errorResponse('Student profile or associated college not found', 404);
    }

    const body = await req.json();
    const parsedData = applyJobSchema.parse(body);

    // Fetch the target job
    const job = await prisma.job.findUnique({
      where: { id: parsedData.jobId },
      include: {
        company: {
          select: { name: true },
        },
      },
    });

    if (!job) {
      return errorResponse('The specified placement drive does not exist', 404);
    }

    if (job.status !== 'ACTIVE') {
      return errorResponse('This placement drive is not currently accepting applications', 400);
    }

    // 0. Single Offer Placement Policy Guard: Check if student has already accepted an offer
    const alreadyAcceptedOffer = await prisma.application.findFirst({
      where: {
        studentId: student.id,
        status: 'ACCEPTED',
      },
      include: {
        job: {
          include: { company: true },
        },
      },
    });

    if (alreadyAcceptedOffer) {
      return errorResponse(
        `Placement Policy Restriction: You have already accepted an on-campus placement offer at ${alreadyAcceptedOffer.job.company.name} and cannot apply to additional placement drives.`,
        403
      );
    }

    // 1. Campus Isolation Guard: Verify college match
    if (job.collegeId !== student.collegeId) {
      return errorResponse('Access denied. You can only apply to placement drives hosted for your college.', 403);
    }

    // 2. Deadline Guard
    if (new Date() > new Date(job.deadline)) {
      return errorResponse('The application deadline for this drive has expired', 400);
    }

    // 3. CGPA Eligibility Guard
    if (student.cgpa < job.minCgpa) {
      return errorResponse(
        `Ineligible for this drive. Minimum required CGPA is ${job.minCgpa} (your CGPA: ${student.cgpa})`,
        400
      );
    }

    // 4. Branch Eligibility Guard
    if (job.allowedBranches.length > 0 && !job.allowedBranches.includes(student.branch)) {
      return errorResponse(
        `Ineligible for this drive. Allowed branch(es): ${job.allowedBranches.join(', ')} (your branch: ${student.branch})`,
        400
      );
    }

    // 5. Batch Year Eligibility Guard
    if (job.eligibleBatches.length > 0 && !job.eligibleBatches.includes(student.batchYear)) {
      return errorResponse(
        `Ineligible for this drive. Eligible batch year(s): ${job.eligibleBatches.join(', ')} (your batch: ${student.batchYear})`,
        400
      );
    }

    // 6. Duplicate Application Guard
    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_studentId: {
          jobId: job.id,
          studentId: student.id,
        },
      },
    });

    if (existingApplication) {
      return errorResponse('You have already applied to this placement drive', 409);
    }

    // Resume snapshot
    const resumeToUse = parsedData.resumeUrl || student.resumeUrl;
    if (!resumeToUse) {
      return errorResponse('A resume is required to apply. Please provide a resume URL or update your profile.', 400);
    }

    // Create Application
    const application = await prisma.application.create({
      data: {
        jobId: job.id,
        studentId: student.id,
        status: 'APPLIED',
        resumeUrl: resumeToUse,
      },
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
    });

    return successResponse(
      application,
      `Successfully applied to ${job.title} at ${job.company.name}`,
      201
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[POST_APPLICATION_ERROR]', error);
    return errorResponse(error.message || 'Failed to submit application', 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const query = applicationQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      status: searchParams.get('status') ?? undefined,
    });

    const where: any = {
      studentId: student.id,
    };

    if (query.status) {
      where.status = query.status;
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
          job: {
            select: {
              id: true,
              title: true,
              type: true,
              status: true,
              location: true,
              salaryPackage: true,
              deadline: true,
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                  website: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return successResponse(
      {
        applications,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit),
          hasMore: query.page * query.limit < total,
        },
      },
      'Applied drives fetched successfully'
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_STUDENT_APPLICATIONS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch applications', 500);
  }
}
