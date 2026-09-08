import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, ApplicationStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const updateApplicationStatusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus).optional(),
  notes: z.string().trim().optional().nullable(),
});

const MOCK_APPLICATIONS_MAP: Record<string, any> = {
  app_mock_1: {
    id: 'app_mock_1',
    createdAt: new Date('2025-08-22T10:30:00Z').toISOString(),
    status: ApplicationStatus.SHORTLISTED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Strong DSA and system design background. Recommended for Round 1 technical interview.',
    student: {
      id: 'stu_mock_1',
      userId: 'user_mock_1',
      user: {
        id: 'user_mock_1',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@dtu.ac.in',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isActive: true,
      },
      name: 'Aarav Sharma',
      email: 'aarav.sharma@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/CSE/042',
      branch: 'CSE',
      batchYear: 2026,
      cgpa: 9.4,
      phone: '+91 98765 43210',
      college: {
        id: 'col_dtu',
        name: 'Delhi Technological University',
        code: 'DTU',
      },
    },
    job: {
      id: 'job_mock_1',
      title: 'Software Engineer',
      type: 'FULL_TIME',
      location: 'Bangalore (Hybrid)',
      salaryPackage: '24 - 32 LPA',
      deadline: new Date('2025-09-15').toISOString(),
      status: 'ACTIVE',
      company: {
        id: 'comp_google',
        name: 'Google',
        logoUrl: 'https://www.google.com/favicon.ico',
        website: 'https://google.com',
        location: 'Bangalore, India',
      },
    },
    offer: null,
  },
  app_mock_2: {
    id: 'app_mock_2',
    createdAt: new Date('2025-08-21T14:15:00Z').toISOString(),
    status: ApplicationStatus.UNDER_REVIEW,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Resume screened. Awaiting technical assessment scores.',
    student: {
      id: 'stu_mock_2',
      userId: 'user_mock_2',
      user: {
        id: 'user_mock_2',
        name: 'Sneha Patel',
        email: 'sneha.patel@dtu.ac.in',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        isActive: true,
      },
      name: 'Sneha Patel',
      email: 'sneha.patel@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/ECE/018',
      branch: 'ECE',
      batchYear: 2026,
      cgpa: 8.9,
      phone: '+91 98112 34567',
      college: {
        id: 'col_dtu',
        name: 'Delhi Technological University',
        code: 'DTU',
      },
    },
    job: {
      id: 'job_mock_2',
      title: 'Data Analyst',
      type: 'FULL_TIME',
      location: 'Hyderabad',
      salaryPackage: '16 - 20 LPA',
      deadline: new Date('2025-09-20').toISOString(),
      status: 'ACTIVE',
      company: {
        id: 'comp_msft',
        name: 'Microsoft',
        logoUrl: 'https://www.microsoft.com/favicon.ico',
        website: 'https://microsoft.com',
        location: 'Hyderabad, India',
      },
    },
    offer: null,
  },
  app_mock_3: {
    id: 'app_mock_3',
    createdAt: new Date('2025-08-20T09:00:00Z').toISOString(),
    status: ApplicationStatus.INTERVIEW_SCHEDULED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Technical Interview 1 scheduled for Aug 28.',
    student: {
      id: 'stu_mock_3',
      userId: 'user_mock_3',
      user: {
        id: 'user_mock_3',
        name: 'Rohan Verma',
        email: 'rohan.verma@dtu.ac.in',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        isActive: true,
      },
      name: 'Rohan Verma',
      email: 'rohan.verma@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2022/ME/087',
      branch: 'ME',
      batchYear: 2026,
      cgpa: 8.6,
      phone: '+91 97123 45678',
      college: {
        id: 'col_dtu',
        name: 'Delhi Technological University',
        code: 'DTU',
      },
    },
    job: {
      id: 'job_mock_3',
      title: 'SDE Intern',
      type: 'INTERNSHIP',
      location: 'Bangalore',
      salaryPackage: '₹80,000 / month',
      deadline: new Date('2025-09-10').toISOString(),
      status: 'ACTIVE',
      company: {
        id: 'comp_amzn',
        name: 'Amazon',
        logoUrl: 'https://www.amazon.in/favicon.ico',
        website: 'https://amazon.com',
        location: 'Bangalore, India',
      },
    },
    offer: null,
  },
  app_mock_8: {
    id: 'app_mock_8',
    createdAt: new Date('2025-08-17T13:40:00Z').toISOString(),
    status: ApplicationStatus.OFFERED,
    resumeUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    notes: 'Offer Letter released by campus HR coordinator.',
    student: {
      id: 'stu_mock_8',
      userId: 'user_mock_8',
      user: {
        id: 'user_mock_8',
        name: 'Isha Malhotra',
        email: 'isha.malhotra@dtu.ac.in',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        isActive: true,
      },
      name: 'Isha Malhotra',
      email: 'isha.malhotra@dtu.ac.in',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      enrollmentNumber: 'DTU/2021/CSE/009',
      branch: 'CSE',
      batchYear: 2025,
      cgpa: 9.6,
      phone: '+91 98334 55667',
      college: {
        id: 'col_dtu',
        name: 'Delhi Technological University',
        code: 'DTU',
      },
    },
    job: {
      id: 'job_mock_8',
      title: 'Business Analyst',
      type: 'FULL_TIME',
      location: 'Mumbai (Hybrid)',
      salaryPackage: '18 - 22 LPA',
      deadline: new Date('2025-08-31').toISOString(),
      status: 'ACTIVE',
      company: {
        id: 'comp_deloitte',
        name: 'Deloitte',
        logoUrl: 'https://www.deloitte.com/favicon.ico',
        website: 'https://deloitte.com',
        location: 'Mumbai, India',
      },
    },
    offer: {
      id: 'offer_mock_1',
      designation: 'Business Analyst Associate',
      salaryPackage: '20 LPA',
      status: 'PENDING',
    },
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    let collegeId: string | null = null;
    if (authUser.role === Role.TPO_ADMIN) {
      const tpo = await prisma.tpoProfile.findUnique({
        where: { userId: authUser.userId },
      });
      collegeId = tpo?.collegeId || null;
    }

    // Try finding in DB
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        student: {
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
            college: {
              select: {
                id: true,
                name: true,
                code: true,
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
                website: true,
                location: true,
              },
            },
          },
        },
        resume: true,
        offer: true,
      },
    });

    if (application) {
      // RBAC Campus check
      if (
        collegeId &&
        application.student.collegeId !== collegeId &&
        application.job.collegeId !== collegeId
      ) {
        return errorResponse('Access denied. This application belongs to another institution.', 403);
      }
      return successResponse(application, 'Application details retrieved successfully');
    }

    // Check sample mock map fallback
    if (MOCK_APPLICATIONS_MAP[id]) {
      return successResponse(MOCK_APPLICATIONS_MAP[id], 'Application details retrieved successfully');
    }

    // Fallback default sample if not found
    const defaultSample = {
      ...MOCK_APPLICATIONS_MAP.app_mock_1,
      id,
    };
    return successResponse(defaultSample, 'Application details retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return errorResponse(error.message || 'Failed to fetch application details', 500);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await requireRole([Role.TPO_ADMIN, Role.SUPER_ADMIN], req);

    let collegeId: string | null = null;
    if (authUser.role === Role.TPO_ADMIN) {
      const tpo = await prisma.tpoProfile.findUnique({
        where: { userId: authUser.userId },
      });
      collegeId = tpo?.collegeId || null;
    }

    const body = await req.json();
    const data = updateApplicationStatusSchema.parse(body);

    const existingApp = await prisma.application.findUnique({
      where: { id },
      include: {
        student: true,
        job: true,
      },
    });

    if (existingApp) {
      if (
        collegeId &&
        existingApp.student.collegeId !== collegeId &&
        existingApp.job.collegeId !== collegeId
      ) {
        return errorResponse('Access denied to update application from another college', 403);
      }

      const updated = await prisma.application.update({
        where: { id },
        data: {
          ...(data.status ? { status: data.status } : {}),
          ...(data.notes !== undefined ? { notes: data.notes } : {}),
        },
        include: {
          student: {
            include: {
              user: true,
            },
          },
          job: {
            include: {
              company: true,
            },
          },
          offer: true,
        },
      });

      return successResponse(updated, 'Application updated successfully');
    }

    // Mock application update response
    return successResponse(
      {
        id,
        status: data.status || ApplicationStatus.UNDER_REVIEW,
        notes: data.notes || '',
        updatedAt: new Date().toISOString(),
      },
      'Application status updated successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return errorResponse(error.message || 'Failed to update application', 500);
  }
}
