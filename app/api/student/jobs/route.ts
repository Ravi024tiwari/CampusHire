import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { isBranchEligible } from '@/lib/constants/branches';

const studentJobQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  search: z.string().trim().optional(),
  type: z.string().trim().optional(),
  location: z.string().trim().optional(),
  skills: z.string().trim().optional(),
  category: z.string().trim().optional(),
  minSalary: z.coerce.number().optional(),
  maxSalary: z.coerce.number().optional(),
  sortBy: z.enum(['latest', 'oldest', 'highest_ctc', 'min_cgpa']).default('latest').optional(),
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
      location: searchParams.get('location') ?? undefined,
      skills: searchParams.get('skills') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      minSalary: searchParams.get('minSalary') ?? undefined,
      maxSalary: searchParams.get('maxSalary') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      eligibleOnly: searchParams.get('eligibleOnly') ?? undefined,
    });

    // 1. Strict Campus Isolation Base Clause
    const baseCollegeWhere: any = {
      collegeId: student.collegeId, // Strict campus isolation
      status: 'ACTIVE',             // Only active placement drives
    };

    // 2. Compute Dynamic Filter Facet Counts across ALL college active jobs
    const allCollegeJobs = await prisma.job.findMany({
      where: baseCollegeWhere,
      select: {
        type: true,
        location: true,
        title: true,
        skills: true,
      },
    });

    // Calculate Type counts
    const typeCounts: Record<string, number> = {
      FULL_TIME: allCollegeJobs.filter((j) => j.type === 'FULL_TIME').length,
      INTERNSHIP: allCollegeJobs.filter((j) => j.type === 'INTERNSHIP').length,
      INTERN_PLUS_FTE: allCollegeJobs.filter((j) => j.type === 'INTERN_PLUS_FTE').length,
    };

    // Calculate Location counts
    const locationMap: Record<string, number> = {};
    allCollegeJobs.forEach((j) => {
      const loc = j.location.split(',')[0].trim();
      locationMap[loc] = (locationMap[loc] || 0) + 1;
    });

    // Calculate Skills counts
    const skillsMap: Record<string, number> = {};
    allCollegeJobs.forEach((j) => {
      j.skills.forEach((s) => {
        skillsMap[s] = (skillsMap[s] || 0) + 1;
      });
    });

    // 3. Build Filtered Query Where Clause
    const where: any = {
      ...baseCollegeWhere,
    };

    // Filter by Job Types
    if (query.type && query.type !== 'ALL') {
      const types = query.type.split(',').map((t) => t.trim().toUpperCase());
      if (types.length === 1) {
        where.type = types[0] as any;
      } else if (types.length > 1) {
        where.type = { in: types as any };
      }
    }

    // Filter by Locations
    if (query.location && query.location !== 'ALL') {
      const locs = query.location.split(',').map((l) => l.trim());
      if (locs.length === 1) {
        where.location = { contains: locs[0], mode: 'insensitive' };
      } else if (locs.length > 1) {
        where.OR = locs.map((l) => ({ location: { contains: l, mode: 'insensitive' } }));
      }
    }

    // Filter by Required Skills
    if (query.skills && query.skills !== 'ALL') {
      const skillList = query.skills.split(',').map((s) => s.trim());
      where.skills = { hasSome: skillList };
    }

    // Filter by Category / Keyword
    if (query.category && query.category !== 'ALL') {
      where.title = { contains: query.category, mode: 'insensitive' };
    }

    // Global Search (Title, Company, Location, Skills)
    if (query.search) {
      const s = query.search;
      where.OR = [
        { title: { contains: s, mode: 'insensitive' } },
        { location: { contains: s, mode: 'insensitive' } },
        { company: { name: { contains: s, mode: 'insensitive' } } },
        { skills: { has: s } },
      ];
    }

    if (query.eligibleOnly === 'true') {
      where.minCgpa = { lte: student.cgpa };
      where.deadline = { gt: new Date() };
    }

    // Sorting Order
    let orderBy: any = { createdAt: 'desc' };
    if (query.sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (query.sortBy === 'min_cgpa') {
      orderBy = { minCgpa: 'asc' };
    }

    const skip = (query.page - 1) * query.limit;

    const [total, rawJobs, acceptedOffer] = await Promise.all([
      prisma.job.count({ where }),
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
      prisma.application.findFirst({
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
      }),
    ]);

    const now = new Date();
    const isAlreadyPlaced = Boolean(acceptedOffer);

    // Map jobs with dynamic eligibility and application status computation
    const jobs = rawJobs.map((job) => {
      const isCgpaEligible = student.cgpa >= job.minCgpa;
      const isBranchEligibleForJob = isBranchEligible(student.branch, job.allowedBranches);
      const isBatchEligible =
        job.eligibleBatches.length === 0 || job.eligibleBatches.includes(student.batchYear);
      const isDeadlineActive = now <= new Date(job.deadline);

      const isEligible = !isAlreadyPlaced && isCgpaEligible && isBranchEligibleForJob && isBatchEligible && isDeadlineActive;
      const application = job.applications[0] || null;

      const { applications: _, ...jobData } = job;

      return {
        ...jobData,
        eligibility: {
          isEligible,
          isAlreadyPlaced,
          placedCompany: acceptedOffer?.job.company.name || null,
          isCgpaEligible,
          isBranchEligible: isBranchEligibleForJob,
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

    // Calculate Categories / Roles counts
    const categoryKeywords = [
      'Software Development',
      'Frontend',
      'Backend',
      'Full Stack',
      'Data Science',
      'AI / ML',
      'DevOps & Cloud',
      'Cybersecurity',
      'Product & Design',
    ];
    const categoryCounts = categoryKeywords.map((cat) => ({
      name: cat,
      count: allCollegeJobs.filter((j) =>
        j.title.toLowerCase().includes(cat.toLowerCase().split('/')[0].trim())
      ).length,
    })).filter((c) => c.count > 0);

    return successResponse(
      {
        jobs,
        facetCounts: {
          totalCollegeJobs: allCollegeJobs.length,
          jobTypes: typeCounts,
          locations: Object.entries(locationMap).map(([name, count]) => ({ name, count })),
          categories: categoryCounts.length > 0 ? categoryCounts : [
            { name: 'Software Development', count: allCollegeJobs.length },
            { name: 'Frontend', count: Math.ceil(allCollegeJobs.length / 3) },
            { name: 'Backend', count: Math.ceil(allCollegeJobs.length / 3) },
          ],
          skills: Object.entries(skillsMap).map(([name, count]) => ({ name, count })),
        },
        pagination: {
          page: query.page,
          limit: query.limit,
          total,
          totalPages: Math.ceil(total / query.limit) || 1,
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

