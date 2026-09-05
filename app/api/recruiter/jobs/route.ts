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

    // Company Verification Guard: unverified companies cannot post drives
    if (!recruiter.company.isVerified) {
      return errorResponse(
        `Company Verification Pending: "${recruiter.company.name}" has not yet been verified by the Super Admin. You cannot create placement drives until verification is complete.`,
        403
      );
    }

    const body = await req.json();
    const parsedData = createJobSchema.parse(body);

    // Verify that the target college exists and is verified by Super Admin
    const college = await prisma.college.findUnique({
      where: { id: parsedData.collegeId },
      select: { id: true, name: true, code: true, isVerified: true },
    });

    if (!college) {
      return errorResponse('The specified target college does not exist', 404);
    }

    if (!college.isVerified) {
      return errorResponse(
        `Institutional Access Restricted: "${college.name}" has not yet been accredited & verified by the Super Admin. You can only dispatch campus placement drives to verified universities.`,
        400
      );
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
        skills: parsedData.skills,
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
            state: true,
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
            offers: true,
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
      type: searchParams.get('type') ?? undefined,
      collegeId: searchParams.get('collegeId') ?? undefined,
      location: searchParams.get('location') ?? undefined,
      timeline: (searchParams.get('timeline') as any) ?? undefined,
      skill: searchParams.get('skill') ?? undefined,
      skills: searchParams.get('skills') ?? undefined,
      skillMatchMode: (searchParams.get('skillMatchMode') as 'all' | 'any') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    });

    const where: any = {
      companyId: recruiter.companyId, // Strict company isolation
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.collegeId) {
      where.collegeId = query.collegeId;
    }

    if (query.location) {
      where.location = { contains: query.location, mode: 'insensitive' };
    }

    // Timeline filtering (Past, Today, Upcoming)
    if (query.timeline && query.timeline !== 'ALL') {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

      if (query.timeline === 'UPCOMING') {
        where.deadline = { gte: now };
      } else if (query.timeline === 'TODAY') {
        where.deadline = { gte: startOfToday, lte: endOfToday };
      } else if (query.timeline === 'PAST') {
        where.deadline = { lt: now };
      }
    }

    // Strict AND multi-skill filtering (jobs must require ALL searched skills, case-insensitive)
    const skillsList: string[] = [];
    if (query.skills) {
      skillsList.push(...query.skills.split(',').map((s) => s.trim()).filter(Boolean));
    } else if (query.skill) {
      skillsList.push(query.skill.trim());
    }

    if (skillsList.length > 0) {
      where.AND = [
        ...(where.AND || []),
        ...skillsList.map((skill) => ({
          skills: {
            hasSome: [
              skill,
              skill.toLowerCase(),
              skill.toUpperCase(),
              skill.charAt(0).toUpperCase() + skill.slice(1).toLowerCase(),
            ],
          },
        })),
      ];
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
        { salaryPackage: { contains: query.search, mode: 'insensitive' } },
        { college: { name: { contains: query.search, mode: 'insensitive' } } },
        { college: { code: { contains: query.search, mode: 'insensitive' } } },
        { skills: { has: query.search } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    const [total, jobs, allCollegesEngaged] = await Promise.all([
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
              state: true,
              logoUrl: true,
            },
          },
          _count: {
            select: {
              applications: true,
              offers: true,
            },
          },
        },
      }),
      // Get all distinct colleges that have jobs from this company for quick filtering
      prisma.job.findMany({
        where: { companyId: recruiter.companyId },
        select: {
          college: {
            select: {
              id: true,
              name: true,
              code: true,
              city: true,
              logoUrl: true,
            },
          },
        },
        distinct: ['collegeId'],
      }),
    ]);

    return successResponse({
      jobs,
      engagedColleges: allCollegesEngaged.map((item) => item.college),
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
