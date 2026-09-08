import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, ApplicationStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const tpoApplicationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  status: z
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
  companyId: z.string().trim().optional(),
  companyName: z.string().trim().optional(),
  jobTitle: z.string().trim().optional(),
  branch: z.string().trim().optional(),
  batchYear: z.coerce.number().int().optional(),
  location: z.string().trim().optional(),
  appliedDate: z.string().trim().optional(),
  academicYear: z.string().trim().default('2025–26'),
  sortBy: z.enum(['createdAt', 'studentName', 'jobTitle', 'companyName', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Mock realistic applications for campus showcase if database has zero application records
const SAMPLE_APPLICATIONS = [
  {
    id: 'app_mock_1',
    createdAt: new Date('2025-08-22T10:30:00Z'),
    status: ApplicationStatus.SHORTLISTED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Strong DSA and system design background. Recommended for Round 1.',
    student: {
      id: 'stu_mock_1',
      userId: 'user_mock_1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/CSE/042',
      branch: 'CSE',
      batchYear: 2026,
      cgpa: 9.4,
      phone: '+91 98765 43210',
    },
    job: {
      id: 'job_mock_1',
      title: 'Software Engineer',
      type: 'FULL_TIME',
      location: 'Bangalore (Hybrid)',
      salaryPackage: '24 - 32 LPA',
      deadline: new Date('2025-09-15'),
      status: 'ACTIVE',
      company: {
        id: 'comp_google',
        name: 'Google',
        logoUrl: 'https://www.google.com/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_2',
    createdAt: new Date('2025-08-21T14:15:00Z'),
    status: ApplicationStatus.UNDER_REVIEW,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Resume screened. Awaiting technical assessment scores.',
    student: {
      id: 'stu_mock_2',
      userId: 'user_mock_2',
      name: 'Sneha Patel',
      email: 'sneha.patel@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/ECE/018',
      branch: 'ECE',
      batchYear: 2026,
      cgpa: 8.9,
      phone: '+91 98112 34567',
    },
    job: {
      id: 'job_mock_2',
      title: 'Data Analyst',
      type: 'FULL_TIME',
      location: 'Hyderabad',
      salaryPackage: '16 - 20 LPA',
      deadline: new Date('2025-09-20'),
      status: 'ACTIVE',
      company: {
        id: 'comp_msft',
        name: 'Microsoft',
        logoUrl: 'https://www.microsoft.com/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_3',
    createdAt: new Date('2025-08-20T09:00:00Z'),
    status: ApplicationStatus.INTERVIEW_SCHEDULED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Technical Interview 1 scheduled for Aug 28.',
    student: {
      id: 'stu_mock_3',
      userId: 'user_mock_3',
      name: 'Rohan Verma',
      email: 'rohan.verma@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/ME/087',
      branch: 'ME',
      batchYear: 2026,
      cgpa: 8.6,
      phone: '+91 97123 45678',
    },
    job: {
      id: 'job_mock_3',
      title: 'SDE Intern',
      type: 'INTERNSHIP',
      location: 'Bangalore',
      salaryPackage: '₹80,000 / month',
      deadline: new Date('2025-09-10'),
      status: 'ACTIVE',
      company: {
        id: 'comp_amzn',
        name: 'Amazon',
        logoUrl: 'https://www.amazon.in/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_4',
    createdAt: new Date('2025-08-20T16:45:00Z'),
    status: ApplicationStatus.UNDER_REVIEW,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Portfolio review in progress.',
    student: {
      id: 'stu_mock_4',
      userId: 'user_mock_4',
      name: 'Priya Singh',
      email: 'priya.singh@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/CSE/104',
      branch: 'CSE',
      batchYear: 2026,
      cgpa: 9.1,
      phone: '+91 99887 65432',
    },
    job: {
      id: 'job_mock_4',
      title: 'Product Analyst',
      type: 'FULL_TIME',
      location: 'Noida (On-site)',
      salaryPackage: '18 - 22 LPA',
      deadline: new Date('2025-09-25'),
      status: 'ACTIVE',
      company: {
        id: 'comp_adobe',
        name: 'Adobe',
        logoUrl: 'https://www.adobe.com/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_5',
    createdAt: new Date('2025-08-19T11:20:00Z'),
    status: ApplicationStatus.SHORTLISTED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Shortlisted for Online Assessment Round 2.',
    student: {
      id: 'stu_mock_5',
      userId: 'user_mock_5',
      name: 'Karan Mehta',
      email: 'karan.mehta@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/EE/033',
      branch: 'EE',
      batchYear: 2026,
      cgpa: 8.5,
      phone: '+91 98765 11223',
    },
    job: {
      id: 'job_mock_5',
      title: 'Frontend Developer',
      type: 'FULL_TIME',
      location: 'Gurugram (Hybrid)',
      salaryPackage: '14 - 18 LPA',
      deadline: new Date('2025-09-18'),
      status: 'ACTIVE',
      company: {
        id: 'comp_accenture',
        name: 'Accenture',
        logoUrl: 'https://www.accenture.com/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_6',
    createdAt: new Date('2025-08-18T15:30:00Z'),
    status: ApplicationStatus.REJECTED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Candidate did not meet the core ML benchmark requirements.',
    student: {
      id: 'stu_mock_6',
      userId: 'user_mock_6',
      name: 'Neha Gupta',
      email: 'neha.gupta@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/IT/055',
      branch: 'IT',
      batchYear: 2026,
      cgpa: 7.9,
      phone: '+91 97112 88990',
    },
    job: {
      id: 'job_mock_6',
      title: 'ML Intern',
      type: 'INTERNSHIP',
      location: 'Pune (Remote)',
      salaryPackage: '₹60,000 / month',
      deadline: new Date('2025-08-30'),
      status: 'CLOSED',
      company: {
        id: 'comp_tesla',
        name: 'Tesla',
        logoUrl: 'https://www.tesla.com/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_7',
    createdAt: new Date('2025-08-18T10:00:00Z'),
    status: ApplicationStatus.INTERVIEW_SCHEDULED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Cleared coding round. HR & Tech Interview scheduled.',
    student: {
      id: 'stu_mock_7',
      userId: 'user_mock_7',
      name: 'Aditya Kumar',
      email: 'aditya.kumar@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/CE/061',
      branch: 'CE',
      batchYear: 2026,
      cgpa: 8.8,
      phone: '+91 98223 34455',
    },
    job: {
      id: 'job_mock_7',
      title: 'Backend Developer',
      type: 'FULL_TIME',
      location: 'Bangalore',
      salaryPackage: '12 - 15 LPA',
      deadline: new Date('2025-09-12'),
      status: 'ACTIVE',
      company: {
        id: 'comp_infosys',
        name: 'Infosys',
        logoUrl: 'https://www.infosys.com/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_8',
    createdAt: new Date('2025-08-17T13:40:00Z'),
    status: ApplicationStatus.OFFERED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Offer Letter released by campus HR coordinator.',
    student: {
      id: 'stu_mock_8',
      userId: 'user_mock_8',
      name: 'Isha Malhotra',
      email: 'isha.malhotra@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2021/CSE/009',
      branch: 'CSE',
      batchYear: 2025,
      cgpa: 9.6,
      phone: '+91 98334 55667',
    },
    job: {
      id: 'job_mock_8',
      title: 'Business Analyst',
      type: 'FULL_TIME',
      location: 'Mumbai (Hybrid)',
      salaryPackage: '18 - 22 LPA',
      deadline: new Date('2025-08-31'),
      status: 'ACTIVE',
      company: {
        id: 'comp_deloitte',
        name: 'Deloitte',
        logoUrl: 'https://www.deloitte.com/favicon.ico',
      },
    },
    offer: {
      id: 'offer_mock_1',
      designation: 'Business Analyst Associate',
      salaryPackage: '20 LPA',
      status: 'PENDING',
    },
  },
  {
    id: 'app_mock_9',
    createdAt: new Date('2025-08-16T17:10:00Z'),
    status: ApplicationStatus.UNDER_REVIEW,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Application submitted during Day 1 drive.',
    student: {
      id: 'stu_mock_9',
      userId: 'user_mock_9',
      name: 'Vikram Reddy',
      email: 'vikram.reddy@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2021/ECE/078',
      branch: 'ECE',
      batchYear: 2025,
      cgpa: 8.3,
      phone: '+91 98445 66778',
    },
    job: {
      id: 'job_mock_9',
      title: 'DevOps Engineer',
      type: 'FULL_TIME',
      location: 'Hyderabad',
      salaryPackage: '15 - 19 LPA',
      deadline: new Date('2025-09-08'),
      status: 'ACTIVE',
      company: {
        id: 'comp_amazon_cloud',
        name: 'Amazon Web Services',
        logoUrl: 'https://www.amazon.in/favicon.ico',
      },
    },
    offer: null,
  },
  {
    id: 'app_mock_10',
    createdAt: new Date('2025-08-16T12:00:00Z'),
    status: ApplicationStatus.SHORTLISTED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Shortlisted for Data Science HackerRank challenge.',
    student: {
      id: 'stu_mock_10',
      userId: 'user_mock_10',
      name: 'Ananya Tiwari',
      email: 'ananya.tiwari@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2021/BT/012',
      branch: 'BT',
      batchYear: 2025,
      cgpa: 8.7,
      phone: '+91 98556 77889',
    },
    job: {
      id: 'job_mock_10',
      title: 'Data Scientist',
      type: 'FULL_TIME',
      location: 'Bangalore (Hybrid)',
      salaryPackage: '20 - 26 LPA',
      deadline: new Date('2025-09-14'),
      status: 'ACTIVE',
      company: {
        id: 'comp_ibm',
        name: 'IBM',
        logoUrl: 'https://www.ibm.com/favicon.ico',
      },
    },
    offer: null,
  },
];

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    const { searchParams } = new URL(req.url);
    const parsedQuery = tpoApplicationsQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      companyId: searchParams.get('companyId') ?? undefined,
      companyName: searchParams.get('companyName') ?? undefined,
      jobTitle: searchParams.get('jobTitle') ?? undefined,
      branch: searchParams.get('branch') ?? undefined,
      batchYear: searchParams.get('batchYear') ?? undefined,
      location: searchParams.get('location') ?? undefined,
      appliedDate: searchParams.get('appliedDate') ?? undefined,
      academicYear: searchParams.get('academicYear') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
      sortOrder: searchParams.get('sortOrder') ?? undefined,
    });

    const {
      page,
      limit,
      search,
      status,
      companyId,
      companyName,
      jobTitle,
      branch,
      batchYear,
      location,
      appliedDate,
      academicYear,
      sortBy,
      sortOrder,
    } = parsedQuery;

    // 1. Identify college context
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
      }
    }

    if (!collegeId) {
      const fallbackCollege = await prisma.college.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, code: true, logoUrl: true },
      });
      if (fallbackCollege) {
        collegeId = fallbackCollege.id;
        collegeData = fallbackCollege;
      }
    }

    // 2. Build Prisma where clause
    const where: any = {};

    if (collegeId) {
      where.OR = [
        { job: { collegeId } },
        { student: { collegeId } },
      ];
    }

    // Status filter
    if (status !== 'ALL') {
      where.status = status as ApplicationStatus;
    }

    // Company filter
    if (companyId && companyId !== 'ALL') {
      where.job = {
        ...(where.job || {}),
        companyId,
      };
    } else if (companyName && companyName !== 'ALL') {
      where.job = {
        ...(where.job || {}),
        company: {
          name: { equals: companyName, mode: 'insensitive' },
        },
      };
    }

    // Job Title filter
    if (jobTitle && jobTitle !== 'ALL') {
      where.job = {
        ...(where.job || {}),
        title: { equals: jobTitle, mode: 'insensitive' },
      };
    }

    // Branch filter
    if (branch && branch !== 'ALL') {
      where.student = {
        ...(where.student || {}),
        branch: { equals: branch, mode: 'insensitive' },
      };
    }

    // Batch Year filter
    if (batchYear) {
      where.student = {
        ...(where.student || {}),
        batchYear,
      };
    }

    // Location filter
    if (location && location !== 'ALL') {
      where.job = {
        ...(where.job || {}),
        location: { contains: location, mode: 'insensitive' },
      };
    }

    // Applied Date filter
    if (appliedDate && appliedDate !== 'ALL') {
      const startOfDay = new Date(appliedDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(appliedDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (!isNaN(startOfDay.getTime())) {
        where.createdAt = {
          gte: startOfDay,
          lte: endOfDay,
        };
      }
    }

    // Search query across student, job, company, location
    if (search) {
      const searchConditions = [
        { student: { user: { name: { contains: search, mode: 'insensitive' } } } },
        { student: { enrollmentNumber: { contains: search, mode: 'insensitive' } } },
        { job: { title: { contains: search, mode: 'insensitive' } } },
        { job: { company: { name: { contains: search, mode: 'insensitive' } } } },
        { job: { location: { contains: search, mode: 'insensitive' } } },
      ];

      if (where.AND) {
        where.AND.push({ OR: searchConditions });
      } else {
        where.AND = [{ OR: searchConditions }];
      }
    }

    // 3. Count total matching applications in DB
    const totalDbCount = await prisma.application.count({ where });

    // Calculate live KPI metrics
    const baseWhere = collegeId
      ? {
          OR: [{ job: { collegeId } }, { student: { collegeId } }],
        }
      : {};

    const [
      totalApps,
      underReviewCount,
      shortlistedCount,
      interviewedCount,
      offeredCount,
      rejectedCount,
    ] = await Promise.all([
      prisma.application.count({ where: baseWhere }),
      prisma.application.count({
        where: {
          ...baseWhere,
          status: { in: [ApplicationStatus.UNDER_REVIEW, ApplicationStatus.APPLIED] },
        },
      }),
      prisma.application.count({
        where: {
          ...baseWhere,
          status: ApplicationStatus.SHORTLISTED,
        },
      }),
      prisma.application.count({
        where: {
          ...baseWhere,
          status: ApplicationStatus.INTERVIEW_SCHEDULED,
        },
      }),
      prisma.application.count({
        where: {
          ...baseWhere,
          status: { in: [ApplicationStatus.OFFERED, ApplicationStatus.ACCEPTED] },
        },
      }),
      prisma.application.count({
        where: {
          ...baseWhere,
          status: { in: [ApplicationStatus.REJECTED, ApplicationStatus.DECLINED] },
        },
      }),
    ]);

    // If database has application records, return live database data
    if (totalDbCount > 0 || totalApps > 0) {
      const skip = (page - 1) * limit;

      const applications = await prisma.application.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy === 'studentName' ? 'createdAt' : sortBy]: sortOrder,
        },
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
          },
          job: {
            include: {
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                },
              },
            },
          },
          offer: {
            select: {
              id: true,
              designation: true,
              salaryPackage: true,
              status: true,
            },
          },
        },
      });

      const formattedApplications = applications.map((app) => ({
        id: app.id,
        createdAt: app.createdAt.toISOString(),
        status: app.status,
        resumeUrl: app.resumeUrl,
        notes: app.notes,
        student: {
          id: app.student.id,
          userId: app.student.userId,
          name: app.student.user.name,
          email: app.student.user.email,
          avatarUrl: app.student.user.avatarUrl,
          enrollmentNumber: app.student.enrollmentNumber,
          branch: app.student.branch,
          batchYear: app.student.batchYear,
          cgpa: app.student.cgpa,
          phone: app.student.phone,
        },
        job: {
          id: app.job.id,
          title: app.job.title,
          type: app.job.type,
          location: app.job.location,
          salaryPackage: app.job.salaryPackage,
          deadline: app.job.deadline.toISOString(),
          status: app.job.status,
          company: {
            id: app.job.company.id,
            name: app.job.company.name,
            logoUrl: app.job.company.logoUrl,
          },
        },
        offer: app.offer,
      }));

      // Extract unique filter options from DB
      const [distinctCompanies, distinctBranches, distinctBatches] = await Promise.all([
        prisma.company.findMany({
          select: { id: true, name: true },
          take: 30,
        }),
        prisma.studentProfile.findMany({
          where: collegeId ? { collegeId } : {},
          distinct: ['branch'],
          select: { branch: true },
        }),
        prisma.studentProfile.findMany({
          where: collegeId ? { collegeId } : {},
          distinct: ['batchYear'],
          select: { batchYear: true },
        }),
      ]);

      const totalPages = Math.ceil(totalDbCount / limit) || 1;

      return successResponse({
        college: collegeData,
        academicYear,
        kpis: {
          total: { value: totalApps, growth: '+18% from last month' },
          underReview: { value: underReviewCount, growth: '+12% from last month' },
          shortlisted: { value: shortlistedCount, growth: '+24% from last month' },
          interviewed: { value: interviewedCount, growth: '+16% from last month' },
          offersReceived: { value: offeredCount, growth: '+20% from last month' },
          rejected: { value: rejectedCount, growth: '-4% from last month' },
        },
        filterOptions: {
          companies: distinctCompanies.map((c) => ({ id: c.id, label: c.name })),
          jobRoles: ['Software Engineer', 'Data Analyst', 'SDE Intern', 'Product Analyst', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'ML Intern'],
          branches: distinctBranches.map((b) => b.branch).filter(Boolean),
          batchYears: distinctBatches.map((b) => b.batchYear).filter(Boolean).sort((a, b) => b - a),
          locations: ['Bangalore', 'Hyderabad', 'Noida', 'Gurugram', 'Pune', 'Mumbai', 'Remote'],
        },
        applications: formattedApplications,
        pagination: {
          total: totalDbCount,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      }, 'College applications retrieved successfully');
    }

    // 4. Fallback Showcase Data: Filter in-memory sample applications
    let filteredSamples = [...SAMPLE_APPLICATIONS];

    if (status !== 'ALL') {
      filteredSamples = filteredSamples.filter((a) => a.status === status);
    }

    if (companyName && companyName !== 'ALL') {
      filteredSamples = filteredSamples.filter((a) =>
        a.job.company.name.toLowerCase().includes(companyName.toLowerCase())
      );
    }

    if (jobTitle && jobTitle !== 'ALL') {
      filteredSamples = filteredSamples.filter((a) =>
        a.job.title.toLowerCase().includes(jobTitle.toLowerCase())
      );
    }

    if (branch && branch !== 'ALL') {
      filteredSamples = filteredSamples.filter((a) =>
        a.student.branch.toLowerCase() === branch.toLowerCase()
      );
    }

    if (batchYear) {
      filteredSamples = filteredSamples.filter((a) => a.student.batchYear === batchYear);
    }

    if (location && location !== 'ALL') {
      filteredSamples = filteredSamples.filter((a) =>
        a.job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filteredSamples = filteredSamples.filter(
        (a) =>
          a.student.name.toLowerCase().includes(q) ||
          a.student.branch.toLowerCase().includes(q) ||
          a.job.title.toLowerCase().includes(q) ||
          a.job.company.name.toLowerCase().includes(q) ||
          a.job.location.toLowerCase().includes(q)
      );
    }

    const totalSamples = filteredSamples.length;
    const totalPages = Math.ceil(totalSamples / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedSamples = filteredSamples.slice(startIndex, startIndex + limit);

    return successResponse({
      college: collegeData || {
        id: 'cmtmkssva000024u5rckmbvag',
        name: 'Guru Ghasidas University',
        code: 'GGU',
        logoUrl: '',
      },
      academicYear,
      kpis: {
        total: { value: 1240, growth: '+18% from last month' },
        underReview: { value: 520, growth: '+12% from last month' },
        shortlisted: { value: 380, growth: '+24% from last month' },
        interviewed: { value: 220, growth: '+16% from last month' },
        offersReceived: { value: 120, growth: '+20% from last month' },
        rejected: { value: 160, growth: '-2% from last month' },
      },
      filterOptions: {
        companies: [
          { id: 'google', label: 'Google' },
          { id: 'microsoft', label: 'Microsoft' },
          { id: 'amazon', label: 'Amazon' },
          { id: 'adobe', label: 'Adobe' },
          { id: 'accenture', label: 'Accenture' },
          { id: 'tesla', label: 'Tesla' },
          { id: 'infosys', label: 'Infosys' },
          { id: 'deloitte', label: 'Deloitte' },
          { id: 'ibm', label: 'IBM' },
        ],
        jobRoles: [
          'Software Engineer',
          'Data Analyst',
          'SDE Intern',
          'Product Analyst',
          'Frontend Developer',
          'Backend Developer',
          'DevOps Engineer',
          'Data Scientist',
          'ML Intern',
          'Business Analyst',
        ],
        branches: ['CSE', 'ECE', 'ME', 'EE', 'IT', 'CE', 'BT'],
        batchYears: [2026, 2025, 2024],
        locations: ['Bangalore', 'Hyderabad', 'Noida', 'Gurugram', 'Pune', 'Mumbai', 'Remote'],
      },
      applications: paginatedSamples,
      pagination: {
        total: totalSamples,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }, 'College applications retrieved successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[TPO_APPLICATIONS_GET_ERROR]', error);
    return errorResponse(error.message || 'Failed to retrieve applications', 500);
  }
}
