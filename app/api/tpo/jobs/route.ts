import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, JobType, JobStatus } from '@/src/generated/prisma';
import { jobQuerySchema } from '@/lib/validations/job.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

/**
 * GET /api/tpo/jobs
 * Production-grade endpoint for TPO & College Admins to fetch:
 * 1. Paginated job opportunities for their specific college
 * 2. Top-level KPI statistics (Total Jobs, Recruiting Companies, New This Week, Closing Soon)
 * 3. Dynamic Tab counters (All, Open, Closing Soon, Internships, Full Time)
 * 4. Sidebar analytics (Job Insights breakdown, Top Companies, Popular Roles, Recent Postings)
 * 5. Dynamic filter facet options (Companies, Roles, Locations, Branches, Batches)
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            code: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!tpo || !tpo.collegeId) {
      return errorResponse('TPO profile or associated college not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const query = jobQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      type: searchParams.get('type') ?? undefined,
      companyId: searchParams.get('companyId') ?? undefined,
      role: searchParams.get('role') ?? undefined,
      location: searchParams.get('location') ?? undefined,
      branch: searchParams.get('branch') ?? undefined,
      batchYear: searchParams.get('batchYear') ?? undefined,
      academicYear: searchParams.get('academicYear') ?? undefined,
      tab: searchParams.get('tab') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      search: searchParams.get('search') ?? undefined,
    });

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 1. Strict Campus Boundary Base Where Clause
    const baseCollegeWhere = {
      collegeId: tpo.collegeId,
    };

    // 2. Build Filtered Query Where Clause
    const where: any = {
      ...baseCollegeWhere,
    };

    // Tab-based primary filtering
    if (query.tab === 'open') {
      where.status = 'ACTIVE';
      where.deadline = { gte: now };
    } else if (query.tab === 'closing_soon') {
      where.status = 'ACTIVE';
      where.deadline = { gte: now, lte: sevenDaysFromNow };
    } else if (query.tab === 'internships') {
      where.type = { in: ['INTERNSHIP', 'INTERN_PLUS_FTE'] };
    } else if (query.tab === 'full_time') {
      where.type = 'FULL_TIME';
    }

    // Explicit Status filter (overrides or adds to tab if specified and not 'ALL')
    if (query.status && query.status !== 'ALL') {
      where.status = query.status as JobStatus;
    }

    // Job Type filter (if explicit dropdown selection is made)
    if (query.type && query.type !== 'ALL') {
      where.type = query.type as JobType;
    }

    // Company filter
    if (query.companyId && query.companyId !== 'ALL') {
      where.companyId = query.companyId;
    }

    // Role filter
    if (query.role && query.role !== 'ALL') {
      where.title = { contains: query.role, mode: 'insensitive' };
    }

    // Location filter
    if (query.location && query.location !== 'ALL') {
      where.location = { contains: query.location, mode: 'insensitive' };
    }

    // Eligible Branch filter (checks array containing specific branch code)
    if (query.branch && query.branch !== 'ALL') {
      where.allowedBranches = { has: query.branch };
    }

    // Batch Year filter (checks array containing integer batch year e.g. 2025, 2026)
    if (query.batchYear) {
      where.eligibleBatches = { has: query.batchYear };
    }

    // Academic Year filter (e.g. "2025-26" -> checks [2025, 2026] batches)
    if (query.academicYear && query.academicYear !== 'ALL') {
      const parts = query.academicYear.split(/[-/]/).map((p) => p.trim());
      const validBatches: number[] = [];
      parts.forEach((p) => {
        const num = parseInt(p, 10);
        if (!isNaN(num)) {
          if (num > 2000) validBatches.push(num);
          else if (num < 100) validBatches.push(2000 + num);
        }
      });
      if (validBatches.length > 0) {
        where.eligibleBatches = { hasSome: validBatches };
      }
    }

    // Search query matching across title, company name, location, and skills
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
        { company: { name: { contains: query.search, mode: 'insensitive' } } },
        { skills: { has: query.search } },
      ];
    }

    // Sort order definition
    let orderBy: any = { createdAt: 'desc' };
    if (query.sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (query.sortBy === 'deadline_asc') {
      orderBy = { deadline: 'asc' };
    } else if (query.sortBy === 'salary_desc') {
      orderBy = { salaryPackage: 'desc' };
    }

    const skip = (query.page - 1) * query.limit;

    // 3. High-Performance Parallel Queries
    const [
      totalFiltered,
      jobs,
      allCollegeJobsSummary,
      distinctCompaniesRaw,
      recentPostingsRaw,
    ] = await Promise.all([
      // 3.1 Total count for current filtered query
      prisma.job.count({ where }),

      // 3.2 Paginated list of jobs
      prisma.job.findMany({
        where,
        skip,
        take: query.limit,
        orderBy,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              website: true,
              industry: true,
              location: true,
              isVerified: true,
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

      // 3.3 Light aggregate dataset across ALL jobs of this college (for KPIs, tabs, sidebar metrics)
      prisma.job.findMany({
        where: baseCollegeWhere,
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          location: true,
          allowedBranches: true,
          eligibleBatches: true,
          companyId: true,
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
          deadline: true,
          createdAt: true,
        },
      }),

      // 3.4 Distinct companies engaged with this college
      prisma.company.findMany({
        where: {
          jobs: {
            some: {
              collegeId: tpo.collegeId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          logoUrl: true,
          industry: true,
        },
        orderBy: { name: 'asc' },
      }),

      // 3.5 Top 5 Most Recent Job Postings
      prisma.job.findMany({
        where: baseCollegeWhere,
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          createdAt: true,
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
            },
          },
        },
      }),
    ]);

    // 4. Compute Top KPI Metrics & Tab Counts
    const totalJobsCount = allCollegeJobsSummary.length;
    const recruitingCompaniesCount = distinctCompaniesRaw.length;

    const newThisWeekCount = allCollegeJobsSummary.filter(
      (j) => new Date(j.createdAt) >= sevenDaysAgo
    ).length;

    const closingSoonCount = allCollegeJobsSummary.filter(
      (j) =>
        j.status === 'ACTIVE' &&
        new Date(j.deadline) >= now &&
        new Date(j.deadline) <= sevenDaysFromNow
    ).length;

    const openJobsCount = allCollegeJobsSummary.filter(
      (j) => j.status === 'ACTIVE' && new Date(j.deadline) >= now
    ).length;

    const internshipJobsCount = allCollegeJobsSummary.filter(
      (j) => j.type === 'INTERNSHIP' || j.type === 'INTERN_PLUS_FTE'
    ).length;

    const fullTimeJobsCount = allCollegeJobsSummary.filter(
      (j) => j.type === 'FULL_TIME'
    ).length;

    // 5. Compute Sidebar Top Recruiting Companies
    const companyJobCountMap: Record<string, { company: any; count: number }> = {};
    allCollegeJobsSummary.forEach((job) => {
      if (job.company) {
        if (!companyJobCountMap[job.company.id]) {
          companyJobCountMap[job.company.id] = { company: job.company, count: 0 };
        }
        companyJobCountMap[job.company.id].count += 1;
      }
    });

    const topRecruitingCompanies = Object.values(companyJobCountMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((item) => ({
        id: item.company.id,
        name: item.company.name,
        logoUrl: item.company.logoUrl,
        jobsCount: item.count,
      }));

    // 6. Compute Popular Job Roles
    const roleCountMap: Record<string, number> = {};
    allCollegeJobsSummary.forEach((job) => {
      const cleanTitle = job.title.trim();
      roleCountMap[cleanTitle] = (roleCountMap[cleanTitle] || 0) + 1;
    });

    const popularJobRoles = Object.entries(roleCountMap)
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // 7. Extract Dynamic Filter Options for Frontend Dropdowns
    const availableBranchesSet = new Set<string>();
    const availableBatchesSet = new Set<number>();
    const availableLocationsSet = new Set<string>();
    const availableRolesSet = new Set<string>();

    allCollegeJobsSummary.forEach((job) => {
      if (job.title) availableRolesSet.add(job.title.trim());
      if (job.location) availableLocationsSet.add(job.location.split(',')[0].trim());
      job.allowedBranches.forEach((b) => availableBranchesSet.add(b));
      job.eligibleBatches.forEach((batch) => availableBatchesSet.add(batch));
    });

    // 8. Transform Job Cards with Computed Flags (days remaining, closing soon, expired)
    const transformedJobs = jobs.map((job) => {
      const deadlineDate = new Date(job.deadline);
      const diffTime = deadlineDate.getTime() - now.getTime();
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const hasExpired = diffTime < 0;
      const isClosingSoon = !hasExpired && daysRemaining <= 7 && job.status === 'ACTIVE';

      return {
        id: job.id,
        title: job.title,
        description: job.description,
        type: job.type,
        status: job.status,
        location: job.location,
        salaryPackage: job.salaryPackage,
        skills: job.skills,
        minCgpa: job.minCgpa,
        allowedBranches: job.allowedBranches,
        eligibleBatches: job.eligibleBatches,
        deadline: job.deadline,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
        company: job.company,
        totalApplications: job._count.applications,
        totalOffers: job._count.offers,
        isClosingSoon,
        daysRemaining: hasExpired ? 0 : daysRemaining,
        hasExpired,
      };
    });

    return successResponse(
      {
        college: tpo.college,
        // Paginated job list
        jobs: transformedJobs,
        // Top 4 KPI metric cards
        kpis: {
          totalJobs: totalJobsCount,
          recruitingCompanies: recruitingCompaniesCount,
          newThisWeek: newThisWeekCount,
          closingSoon: closingSoonCount,
        },
        // Tab counters
        tabCounts: {
          all: totalJobsCount,
          open: openJobsCount,
          closingSoon: closingSoonCount,
          internships: internshipJobsCount,
          fullTime: fullTimeJobsCount,
        },
        // Sidebar analytics & charts data
        insights: {
          breakdown: {
            open: openJobsCount,
            closingSoon: closingSoonCount,
            internships: internshipJobsCount,
            fullTime: fullTimeJobsCount,
          },
          topRecruitingCompanies,
          popularJobRoles,
          recentPostings: recentPostingsRaw,
        },
        // Dynamic Filter dropdown facets
        filterOptions: {
          companies: distinctCompaniesRaw,
          roles: Array.from(availableRolesSet).sort(),
          locations: Array.from(availableLocationsSet).sort(),
          branches: Array.from(availableBranchesSet).sort(),
          batches: Array.from(availableBatchesSet).sort((a, b) => b - a),
        },
        // Strict Pagination Metadata
        pagination: {
          page: query.page,
          limit: query.limit,
          total: totalFiltered,
          totalPages: Math.ceil(totalFiltered / query.limit) || 1,
          hasMore: query.page * query.limit < totalFiltered,
          hasPrev: query.page > 1,
        },
      },
      'Campus placement job opportunities fetched successfully'
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_TPO_JOB_OPPORTUNITIES_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch college job opportunities', 500);
  }
}
