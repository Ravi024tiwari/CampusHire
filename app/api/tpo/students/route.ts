import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, ApplicationStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { normalizeBranchCode, BRANCH_NAME_MAP, BRANCH_CODES } from '@/lib/constants/branches';

const tpoStudentRosterQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  branch: z.string().trim().optional(),
  batchYear: z.coerce.number().int().optional(),
  placementStatus: z
    .enum(['ALL', 'PLACED', 'IN_INTERVIEW', 'ELIGIBLE', 'APPLIED', 'NOT_PLACED'])
    .default('ALL'),
  minCgpa: z.coerce.number().min(0).max(10).optional(),
  maxCgpa: z.coerce.number().min(0).max(10).optional(),
  applicationStatus: z
    .enum([
      'ALL',
      'APPLIED',
      'UNDER_REVIEW',
      'SHORTLISTED',
      'INTERVIEW_SCHEDULED',
      'OFFERED',
      'REJECTED',
      'ACCEPTED',
      'DECLINED',
    ])
    .default('ALL'),
  verificationStatus: z.enum(['ALL', 'VERIFIED', 'UNVERIFIED']).default('ALL'),
  userStatus: z.enum(['ALL', 'ACTIVE', 'INACTIVE']).default('ALL'),
  sortBy: z
    .enum(['createdAt', 'cgpa', 'batchYear', 'name', 'enrollmentNumber'])
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    const { searchParams } = new URL(req.url);
    const queryCollegeId = searchParams.get('collegeId');

    let collegeId: string | null = null;
    let collegeData: { id: string; name: string; code: string | null; logoUrl: string | null } | null = null;

    if (authUser.role === Role.TPO_ADMIN) {
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

      if (tpo?.collegeId && tpo.college) {
        collegeId = tpo.collegeId;
        collegeData = tpo.college;
      } else {
        // Fallback to first college or query param if available
        const fallback = queryCollegeId
          ? await prisma.college.findUnique({
              where: { id: queryCollegeId },
              select: { id: true, name: true, code: true, logoUrl: true },
            })
          : await prisma.college.findFirst({
              orderBy: { createdAt: 'desc' },
              select: { id: true, name: true, code: true, logoUrl: true },
            });

        if (fallback) {
          collegeId = fallback.id;
          collegeData = fallback;
        } else {
          // Graceful empty state when no colleges exist
          return successResponse(
            {
              hasCollege: false,
              college: null,
              kpis: {
                totalStudents: { value: 0, growth: '0%' },
                placementEligible: { value: 0, growth: '0%' },
                placedStudents: { value: 0, growth: '0%' },
                inInterview: { value: 0, growth: '0%' },
              },
              filterOptions: { branches: [], batchYears: [] },
              students: [],
              pagination: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 1,
                from: 0,
                to: 0,
                hasPrev: false,
                hasNext: false,
              },
            },
            'No college institution found'
          );
        }
      }
    } else {
      // Super Admin viewing college students
      const targetCollege = queryCollegeId
        ? await prisma.college.findUnique({
            where: { id: queryCollegeId },
            select: { id: true, name: true, code: true, logoUrl: true },
          })
        : await prisma.college.findFirst({
            orderBy: { createdAt: 'desc' },
            select: { id: true, name: true, code: true, logoUrl: true },
          });

      if (!targetCollege) {
        return successResponse(
          {
            hasCollege: false,
            college: null,
            kpis: {
              totalStudents: { value: 0, growth: '0%' },
              placementEligible: { value: 0, growth: '0%' },
              placedStudents: { value: 0, growth: '0%' },
              inInterview: { value: 0, growth: '0%' },
            },
            filterOptions: { branches: [], batchYears: [] },
            students: [],
            pagination: {
              page: 1,
              limit: 10,
              total: 0,
              totalPages: 1,
              from: 0,
              to: 0,
              hasPrev: false,
              hasNext: false,
            },
          },
          'No colleges found in system'
        );
      }

      collegeId = targetCollege.id;
      collegeData = targetCollege;
    }

    const query = tpoStudentRosterQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      branch: searchParams.get('branch') ?? undefined,
      batchYear: searchParams.get('batchYear') ?? undefined,
      placementStatus: searchParams.get('placementStatus') ?? undefined,
      minCgpa: searchParams.get('minCgpa') ?? undefined,
      maxCgpa: searchParams.get('maxCgpa') ?? undefined,
      applicationStatus: searchParams.get('applicationStatus') ?? undefined,
      verificationStatus: searchParams.get('verificationStatus') ?? undefined,
      userStatus: searchParams.get('userStatus') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      sortOrder: searchParams.get('sortOrder') ?? undefined,
    });

    // Build dynamic Prisma where filters with strict college campus isolation
    const where: any = {
      collegeId,
    };

    // Text search over student name, email, enrollment number, branch, skills
    if (query.search && query.search.length > 0) {
      where.OR = [
        { user: { name: { contains: query.search, mode: 'insensitive' } } },
        { user: { email: { contains: query.search, mode: 'insensitive' } } },
        { enrollmentNumber: { contains: query.search, mode: 'insensitive' } },
        { branch: { contains: query.search, mode: 'insensitive' } },
        { skills: { has: query.search } },
      ];
    }

    // Branch filter
    if (query.branch && query.branch !== 'ALL') {
      const norm = normalizeBranchCode(query.branch);
      const fullName = BRANCH_NAME_MAP[norm];
      const matchBranches = Array.from(new Set([norm, fullName, query.branch].filter(Boolean) as string[]));
      where.branch = { in: matchBranches, mode: 'insensitive' };
    }

    // Batch year filter
    if (query.batchYear) {
      where.batchYear = query.batchYear;
    }

    // CGPA Range
    if (query.minCgpa !== undefined || query.maxCgpa !== undefined) {
      where.cgpa = {};
      if (query.minCgpa !== undefined) where.cgpa.gte = query.minCgpa;
      if (query.maxCgpa !== undefined) where.cgpa.lte = query.maxCgpa;
    }

    // Verification Status
    if (query.verificationStatus === 'VERIFIED') {
      where.isVerified = true;
    } else if (query.verificationStatus === 'UNVERIFIED') {
      where.isVerified = false;
    }

    // User Account Status
    if (query.userStatus === 'ACTIVE') {
      where.user = { ...(where.user || {}), isActive: true };
    } else if (query.userStatus === 'INACTIVE') {
      where.user = { ...(where.user || {}), isActive: false };
    }

    // Application Status Filter
    if (query.applicationStatus !== 'ALL') {
      where.applications = {
        some: {
          status: query.applicationStatus as ApplicationStatus,
        },
      };
    }

    // Placement Status Filter
    if (query.placementStatus === 'PLACED') {
      where.offers = {
        some: { status: 'ACCEPTED' },
      };
    } else if (query.placementStatus === 'IN_INTERVIEW') {
      where.AND = [
        ...(where.AND || []),
        { offers: { none: { status: 'ACCEPTED' } } },
        { applications: { some: { status: 'INTERVIEW_SCHEDULED' } } },
      ];
    } else if (query.placementStatus === 'ELIGIBLE') {
      // Unplaced students with CGPA >= 6.0
      where.AND = [
        ...(where.AND || []),
        { offers: { none: { status: 'ACCEPTED' } } },
        { cgpa: { gte: 6.0 } },
      ];
    } else if (query.placementStatus === 'APPLIED') {
      where.AND = [
        ...(where.AND || []),
        { offers: { none: { status: 'ACCEPTED' } } },
        { applications: { some: {} } },
      ];
    } else if (query.placementStatus === 'NOT_PLACED') {
      where.offers = {
        none: { status: 'ACCEPTED' },
      };
    }

    // Dynamic sorting
    const orderBy: any[] = [];
    if (query.sortBy === 'name') {
      orderBy.push({ user: { name: query.sortOrder } });
    } else if (query.sortBy === 'cgpa') {
      orderBy.push({ cgpa: query.sortOrder });
    } else if (query.sortBy === 'batchYear') {
      orderBy.push({ batchYear: query.sortOrder });
    } else if (query.sortBy === 'enrollmentNumber') {
      orderBy.push({ enrollmentNumber: query.sortOrder });
    } else {
      // Default: newest first
      orderBy.push({ createdAt: query.sortOrder });
    }

    const skip = (query.page - 1) * query.limit;

    // Parallel fetch: Filtered records + College Aggregate KPIs + Distinct filter metadata
    const [
      filteredTotal,
      students,
      totalStudentsCount,
      placedStudentsCount,
      inInterviewCount,
      eligibleStudentsCount,
      distinctBranchesRaw,
      distinctBatchesRaw,
    ] = await Promise.all([
      // 1. Filtered count
      prisma.studentProfile.count({ where }),

      // 2. Paginated student records with relational joins
      prisma.studentProfile.findMany({
        where,
        skip,
        take: query.limit,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              isActive: true,
              createdAt: true,
            },
          },
          offers: {
            where: { status: 'ACCEPTED' },
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                },
              },
              job: {
                select: {
                  id: true,
                  title: true,
                  salaryPackage: true,
                },
              },
            },
          },
          applications: {
            select: {
              id: true,
              status: true,
              createdAt: true,
              job: {
                select: {
                  id: true,
                  title: true,
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
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: {
              applications: true,
              offers: true,
              resumes: true,
            },
          },
        },
      }),

      // 3. KPI 1: Total Registered Students in College
      prisma.studentProfile.count({
        where: { collegeId },
      }),

      // 4. KPI 2: Total Placed Students (Accepted Offer)
      prisma.studentProfile.count({
        where: {
          collegeId,
          offers: { some: { status: 'ACCEPTED' } },
        },
      }),

      // 5. KPI 3: Students currently in interview pipeline (not yet placed)
      prisma.studentProfile.count({
        where: {
          collegeId,
          offers: { none: { status: 'ACCEPTED' } },
          applications: { some: { status: 'INTERVIEW_SCHEDULED' } },
        },
      }),

      // 6. KPI 4: Placement Eligible Students (Unplaced, CGPA >= 6.0)
      prisma.studentProfile.count({
        where: {
          collegeId,
          offers: { none: { status: 'ACCEPTED' } },
          cgpa: { gte: 6.0 },
        },
      }),

      // 7. Distinct branches for dynamic filter pills
      prisma.studentProfile.findMany({
        where: { collegeId },
        distinct: ['branch'],
        select: { branch: true },
        orderBy: { branch: 'asc' },
      }),

      // 8. Distinct batch years for dynamic filter pills
      prisma.studentProfile.findMany({
        where: { collegeId },
        distinct: ['batchYear'],
        select: { batchYear: true },
        orderBy: { batchYear: 'desc' },
      }),
    ]);

    // Format students data with computed placement badge & statuses
    const formattedStudents = students.map((s) => {
      const acceptedOffer = s.offers[0] || null;
      const hasInterview = s.applications.some(
        (app) => app.status === 'INTERVIEW_SCHEDULED'
      );
      const hasApplications = s._count.applications > 0;

      // Determine placement status badge tag
      let placementStatus = 'ELIGIBLE';
      if (acceptedOffer) {
        placementStatus = 'PLACED';
      } else if (hasInterview) {
        placementStatus = 'IN_INTERVIEW';
      } else if (hasApplications) {
        placementStatus = 'APPLIED';
      } else if (s.cgpa < 6.0) {
        placementStatus = 'NOT_PLACED';
      } else {
        placementStatus = 'ELIGIBLE';
      }

      return {
        id: s.id,
        userId: s.user.id,
        name: s.user.name,
        email: s.user.email,
        avatarUrl: s.user.avatarUrl,
        isActive: s.user.isActive,
        enrollmentNumber: s.enrollmentNumber,
        branch: s.branch,
        batchYear: s.batchYear,
        cgpa: s.cgpa,
        phone: s.phone,
        bio: s.bio,
        skills: s.skills,
        resumeUrl: s.resumeUrl,
        isVerified: s.isVerified,
        createdAt: s.createdAt,
        applicationsCount: s._count.applications,
        offersCount: s._count.offers,
        placementStatus,
        offerDetails: acceptedOffer
          ? {
              id: acceptedOffer.id,
              companyId: acceptedOffer.company.id,
              companyName: acceptedOffer.company.name,
              companyLogoUrl: acceptedOffer.company.logoUrl,
              designation: acceptedOffer.designation,
              salaryPackage: acceptedOffer.salaryPackage,
              location: acceptedOffer.location,
              joiningDate: acceptedOffer.joiningDate,
              acceptedAt: acceptedOffer.acceptedAt,
              letterUrl: acceptedOffer.letterUrl,
            }
          : null,
        recentApplications: s.applications.slice(0, 3).map((a) => ({
          id: a.id,
          jobTitle: a.job.title,
          companyName: a.job.company.name,
          companyLogoUrl: a.job.company.logoUrl,
          status: a.status,
          createdAt: a.createdAt,
        })),
      };
    });

    const totalPages = Math.ceil(filteredTotal / query.limit) || 1;
    const from = filteredTotal === 0 ? 0 : skip + 1;
    const to = Math.min(skip + query.limit, filteredTotal);

    return successResponse(
      {
        college: {
          id: collegeData?.id,
          name: collegeData?.name || 'College Placement Cell',
          code: collegeData?.code,
          logoUrl: collegeData?.logoUrl,
        },
        kpis: {
          totalStudents: {
            value: totalStudentsCount,
            growth: '+12% from last year',
          },
          placementEligible: {
            value: eligibleStudentsCount,
            growth: '+8% from last year',
          },
          placedStudents: {
            value: placedStudentsCount,
            growth: '+16% from last year',
          },
          inInterview: {
            value: inInterviewCount,
            growth: '+24% from last year',
          },
        },
        filterOptions: {
          branches: distinctBranchesRaw.map((b) => b.branch).filter(Boolean),
          batchYears: distinctBatchesRaw.map((b) => b.batchYear).filter(Boolean),
        },
        students: formattedStudents,
        pagination: {
          page: query.page,
          limit: query.limit,
          total: filteredTotal,
          totalPages,
          from,
          to,
          hasPrev: query.page > 1,
          hasNext: query.page < totalPages,
        },
      },
      'Students roster retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_TPO_STUDENTS_ROSTER_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch students roster', 500);
  }
}

const addStudentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  enrollmentNumber: z.string().min(3, 'Enrollment number required'),
  branch: z
    .string()
    .min(1, 'Branch selection is required')
    .transform((val) => normalizeBranchCode(val)),
  batchYear: z.coerce.number().int().min(2000).max(2040),
  cgpa: z.coerce.number().min(0).max(10),
  phone: z.string().optional(),
  skills: z.array(z.string()).default([]),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  collegeId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    let targetCollegeId: string | null = null;

    if (authUser.role === Role.TPO_ADMIN) {
      const tpo = await prisma.tpoProfile.findUnique({
        where: { userId: authUser.userId },
      });

      if (tpo?.collegeId) {
        targetCollegeId = tpo.collegeId;
      } else {
        const fallback = await prisma.college.findFirst({
          orderBy: { createdAt: 'desc' },
        });
        targetCollegeId = fallback?.id || null;
      }
    } else {
      const body = await req.clone().json().catch(() => ({}));
      if (body.collegeId) {
        targetCollegeId = body.collegeId;
      } else {
        const fallback = await prisma.college.findFirst({
          orderBy: { createdAt: 'desc' },
        });
        targetCollegeId = fallback?.id || null;
      }
    }

    if (!targetCollegeId) {
      return errorResponse('Target college institution not found', 404);
    }

    const body = await req.json();
    const data = addStudentSchema.parse(body);

    // Check if user email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (existingUser) {
      return errorResponse('A user with this email address already exists', 409);
    }

    // Check if enrollment number already exists
    const existingEnrollment = await prisma.studentProfile.findUnique({
      where: { enrollmentNumber: data.enrollmentNumber.trim() },
    });

    if (existingEnrollment) {
      return errorResponse(
        `Enrollment number "${data.enrollmentNumber}" is already registered`,
        409
      );
    }

    const { hashPassword } = await import('@/lib/auth');
    const rawPassword = data.password || `${data.enrollmentNumber}@123`;
    const passwordHash = await hashPassword(rawPassword);

    // Create user and student profile in atomic transaction
    const newStudent = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: data.name.trim(),
          email: data.email.toLowerCase().trim(),
          passwordHash,
          role: Role.STUDENT,
          isActive: true,
        },
      });

      const profile = await tx.studentProfile.create({
        data: {
          userId: user.id,
          collegeId: targetCollegeId!,
          enrollmentNumber: data.enrollmentNumber.trim(),
          branch: data.branch.trim(),
          batchYear: data.batchYear,
          cgpa: data.cgpa,
          phone: data.phone?.trim() || null,
          skills: data.skills || [],
          isVerified: true,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatarUrl: true,
              isActive: true,
            },
          },
        },
      });

      return profile;
    });

    return successResponse(
      {
        student: {
          id: newStudent.id,
          userId: newStudent.user.id,
          name: newStudent.user.name,
          email: newStudent.user.email,
          enrollmentNumber: newStudent.enrollmentNumber,
          branch: newStudent.branch,
          batchYear: newStudent.batchYear,
          cgpa: newStudent.cgpa,
          placementStatus: newStudent.cgpa >= 6.0 ? 'ELIGIBLE' : 'NOT_PLACED',
        },
      },
      'Student enrolled successfully',
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[POST_TPO_ADD_STUDENT_ERROR]', error);
    return errorResponse(error.message || 'Failed to add student', 500);
  }
}



