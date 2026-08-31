import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { createJobSchema, jobQuerySchema } from '@/lib/validations/job.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { company: true },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile or associated company not found', 404);
    }

    const body = await req.json();
    const parsedData = createJobSchema.parse(body);

    // Verify that the target college exists
    const college = await prisma.college.findUnique({
      where: { id: parsedData.collegeId },
      select: { id: true, name: true, code: true },
    });

    if (!college) {
      return errorResponse('The specified target college does not exist', 404);
    }

    // Create the job strictly linked to this recruiter's company and the selected college
    const job = await prisma.job.create({
      data: {
        companyId: recruiter.companyId,
        collegeId: parsedData.collegeId,
        title: parsedData.title,
        description: parsedData.description,
        type: parsedData.type,
        status: parsedData.status,
        location: parsedData.location,
        salaryPackage: parsedData.salaryPackage,
        minCgpa: parsedData.minCgpa,
        allowedBranches: parsedData.allowedBranches,
        eligibleBatches: parsedData.eligibleBatches,
        deadline: parsedData.deadline,
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            code: true,
            city: true,
            logoUrl: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    return successResponse(job, 'Campus placement drive posted successfully', 201);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[POST_JOB_ERROR]', error);
    return errorResponse(error.message || 'Failed to post campus job drive', 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile or associated company not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const query = jobQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      collegeId: searchParams.get('collegeId') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    });

    const where: any = {
      companyId: recruiter.companyId, // Strict company isolation
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.collegeId) {
      where.collegeId = query.collegeId;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
        { college: { name: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    const [total, jobs] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { createdAt: 'desc' },
        include: {
          college: {
            select: {
              id: true,
              name: true,
              code: true,
              city: true,
              logoUrl: true,
            },
          },
          _count: {
            select: {
              applications: true,
            },
          },
        },
      }),
    ]);

    return successResponse({
      jobs,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
        hasMore: query.page * query.limit < total,
      },
    }, 'Company jobs fetched successfully');
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_RECRUITER_JOBS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch jobs', 500);
  }
}
