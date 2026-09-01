import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { adminJobQuerySchema } from '@/lib/validations/admin.schema';

/**
 * GET /api/admin/jobs
 * Supports filtering by company name, posted date range (startDate & endDate), college, and drive status.
 */
export async function GET(req: NextRequest) {
  try {
    await requireRole([Role.SUPER_ADMIN], req);

    const { searchParams } = new URL(req.url);
    const query = adminJobQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      companyName: searchParams.get('companyName') ?? undefined,
      companyId: searchParams.get('companyId') ?? undefined,
      collegeId: searchParams.get('collegeId') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      startDate: searchParams.get('startDate') ?? undefined,
      endDate: searchParams.get('endDate') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      sortOrder: searchParams.get('sortOrder') ?? undefined,
    });

    const where: any = {};

    // 1. Filter by Company Name or ID
    if (query.companyName) {
      where.company = {
        name: { contains: query.companyName, mode: 'insensitive' },
      };
    } else if (query.companyId) {
      where.companyId = query.companyId;
    }

    // 2. Filter by College
    if (query.collegeId) {
      where.collegeId = query.collegeId;
    }

    // 3. Filter by Drive Status
    if (query.status && query.status !== 'ALL') {
      where.status = query.status;
    }

    // 4. Filter by Posted Date Range (createdAt)
    if (query.startDate || query.endDate) {
      where.createdAt = {};

      if (query.startDate) {
        const start = new Date(query.startDate);
        if (!isNaN(start.getTime())) {
          where.createdAt.gte = start;
        }
      }

      if (query.endDate) {
        const end = new Date(query.endDate);
        if (!isNaN(end.getTime())) {
          // Set to end of the selected day (23:59:59.999)
          end.setHours(23, 59, 59, 999);
          where.createdAt.lte = end;
        }
      }
    }

    // 5. Global Search across multiple fields
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
        { company: { name: { contains: query.search, mode: 'insensitive' } } },
        { college: { name: { contains: query.search, mode: 'insensitive' } } },
        { college: { code: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const skip = (query.page - 1) * query.limit;

    // 6. Parallel execution for high throughput & minimal latency
    const [total, jobs, totalActiveJobs, totalGlobalJobs] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { [query.sortBy]: query.sortOrder },
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          location: true,
          salaryPackage: true,
          minCgpa: true,
          allowedBranches: true,
          eligibleBatches: true,
          deadline: true,
          createdAt: true,
          updatedAt: true,
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              industry: true,
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
          _count: {
            select: {
              applications: true,
              offers: true,
            },
          },
        },
      }),
      prisma.job.count({ where: { status: 'ACTIVE' } }),
      prisma.job.count(),
    ]);

    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      type: job.type,
      status: job.status,
      location: job.location,
      salaryPackage: job.salaryPackage,
      minCgpa: job.minCgpa,
      allowedBranches: job.allowedBranches,
      eligibleBatches: job.eligibleBatches,
      deadline: job.deadline,
      postedAt: job.createdAt,
      company: job.company,
      college: job.college,
      applicantsCount: job._count.applications,
      offersIssuedCount: job._count.offers,
      isExpired: new Date() > new Date(job.deadline),
    }));

    const totalPages = Math.ceil(total / query.limit) || 1;

    return successResponse(
      {
        jobs: formattedJobs, //here it have all the jobs data which its mapped with that 
        summary: {
          totalGlobalJobs,
          totalActiveJobs,
          filteredTotal: total,
        },
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages,
          hasNextPage: query.page < totalPages,
          hasPrevPage: query.page > 1,
        },
      },
      'Placement drives retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_JOBS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch jobs', 500);
  }
}
