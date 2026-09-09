import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { applyJobSchema, applicationQuerySchema } from '@/lib/validations/application.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { isBranchEligible, formatBranchDisplay } from '@/lib/constants/branches';

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
    if (!isBranchEligible(student.branch, job.allowedBranches)) {
      return errorResponse(
        `Ineligible for this drive. Allowed branch(es): ${job.allowedBranches.map(formatBranchDisplay).join(', ')} (your branch: ${formatBranchDisplay(student.branch)})`,
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

    // Determine resume to use (Specific Resume ID -> Explicit Resume URL -> Default Profile Resume)
    let selectedResumeId: string | null = null;
    let resumeToUse = parsedData.resumeUrl || null;

    if (parsedData.resumeId) {
      const targetResume = await prisma.studentResume.findFirst({
        where: { id: parsedData.resumeId, studentId: student.id },
      });

      if (!targetResume) {
        return errorResponse('Selected resume not found or does not belong to you', 400);
      }

      selectedResumeId = targetResume.id;
      resumeToUse = targetResume.fileUrl;
    } else if (!resumeToUse) {
      // Find student default resume
      const defaultResume = await prisma.studentResume.findFirst({
        where: { studentId: student.id, isDefault: true },
      });

      if (defaultResume) {
        selectedResumeId = defaultResume.id;
        resumeToUse = defaultResume.fileUrl;
      } else {
        resumeToUse = student.resumeUrl;
      }
    }

    if (!resumeToUse) {
      return errorResponse('A resume is required to apply. Please upload a resume to your profile first.', 400);
    }

    // Create Application
    const application = await prisma.application.create({
      data: {
        jobId: job.id,
        studentId: student.id,
        status: 'APPLIED',
        resumeId: selectedResumeId,
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
      search: searchParams.get('search') ?? undefined,
      jobType: searchParams.get('jobType') ?? undefined,
      location: searchParams.get('location') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
    });

    // 1. Calculate Aggregated Status Metrics across ALL applications of this student
    const allApplications = await prisma.application.findMany({
      where: { studentId: student.id },
      select: { status: true },
    });

    const summaryStats = {
      total: allApplications.length,
      underReview: allApplications.filter((a) => a.status === 'APPLIED' || a.status === 'UNDER_REVIEW').length,
      shortlisted: allApplications.filter((a) => a.status === 'SHORTLISTED').length,
      interviewing: allApplications.filter((a) => a.status === 'INTERVIEW_SCHEDULED').length,
      offers: allApplications.filter((a) => a.status === 'OFFERED' || a.status === 'ACCEPTED').length,
      rejected: allApplications.filter((a) => a.status === 'REJECTED' || a.status === 'DECLINED').length,
    };

    // 2. Build Filtered Query Where Clause
    const where: any = {
      studentId: student.id,
    };

    // Filter by Status Tab
    if (query.status && query.status !== 'ALL') {
      const statusUpper = query.status.toUpperCase();
      if (statusUpper === 'UNDER_REVIEW') {
        where.status = { in: ['APPLIED', 'UNDER_REVIEW'] };
      } else if (statusUpper === 'OFFERS' || statusUpper === 'OFFERED') {
        where.status = { in: ['OFFERED', 'ACCEPTED'] };
      } else if (statusUpper === 'INTERVIEWING' || statusUpper === 'INTERVIEW_SCHEDULED') {
        where.status = 'INTERVIEW_SCHEDULED';
      } else if (statusUpper === 'REJECTED') {
        where.status = { in: ['REJECTED', 'DECLINED'] };
      } else {
        where.status = statusUpper;
      }
    }

    // Filter by Search Query (Job title, Company Name, Location)
    if (query.search) {
      where.OR = [
        {
          job: {
            title: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          job: {
            company: {
              name: {
                contains: query.search,
                mode: 'insensitive',
              },
            },
          },
        },
      ];
    }

    // Filter by Job Type (FULL_TIME, INTERNSHIP, INTERN_PLUS_FTE)
    if (query.jobType && query.jobType !== 'ALL') {
      const typeUpper = query.jobType.toUpperCase();
      where.job = {
        ...(where.job || {}),
        type: typeUpper as any,
      };
    }

    // Filter by Location
    if (query.location && query.location !== 'ALL') {
      where.job = {
        ...(where.job || {}),
        location: {
          contains: query.location,
          mode: 'insensitive',
        },
      };
    }

    // Sorting Order
    let orderBy: any = { createdAt: 'desc' };
    if (query.sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' };
    }

    const skip = (query.page - 1) * query.limit;

    const [total, applications] = await Promise.all([
      prisma.application.count({ where }),
      prisma.application.findMany({
        where,
        skip,
        take: query.limit,
        orderBy,
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
              skills: true,
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
          offer: {
            select: {
              id: true,
              status: true,
              designation: true,
              salaryPackage: true,
              location: true,
              joiningDate: true,
              letterUrl: true,
              expiresAt: true,
            },
          },
        },
      }),
    ]);

    return successResponse(
      {
        applications,
        summaryStats,
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit) || 1,
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
