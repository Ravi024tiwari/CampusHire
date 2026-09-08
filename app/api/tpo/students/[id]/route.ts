import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

/**
 * GET /api/tpo/students/[id]
 * Fetches 360-degree Student Profile Dossier for TPO with campus isolation
 */
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

    // Query student profile with relations (search by StudentProfile.id OR User.id)
    const student = await prisma.studentProfile.findFirst({
      where: {
        OR: [{ id }, { userId: id }],
        ...(collegeId ? { collegeId } : {}), // Campus isolation for TPO
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        college: {
          select: {
            id: true,
            name: true,
            code: true,
            domain: true,
            city: true,
            state: true,
            logoUrl: true,
          },
        },
        resumes: {
          orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
          select: {
            id: true,
            title: true,
            fileUrl: true,
            fileSize: true,
            fileType: true,
            isDefault: true,
            createdAt: true,
          },
        },
        applications: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            status: true,
            resumeUrl: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
            job: {
              select: {
                id: true,
                title: true,
                type: true,
                salaryPackage: true,
                location: true,
                status: true,
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
        },
        offers: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            status: true,
            designation: true,
            salaryPackage: true,
            location: true,
            joiningDate: true,
            letterUrl: true,
            acceptedAt: true,
            declinedAt: true,
            createdAt: true,
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

    if (!student) {
      return errorResponse('Student record not found or does not belong to your college', 404);
    }

    // Derive Placement Status & Statistics
    const acceptedOffers = student.offers.filter((o) => o.status === 'ACCEPTED');
    const pendingOffers = student.offers.filter((o) => o.status === 'PENDING');
    const interviewApps = student.applications.filter((a) =>
      ['INTERVIEW_SCHEDULED', 'SHORTLISTED'].includes(a.status)
    );

    let placementStatus: 'Placed' | 'Interviewing' | 'Offered' | 'Not Placed' = 'Not Placed';
    if (acceptedOffers.length > 0) {
      placementStatus = 'Placed';
    } else if (pendingOffers.length > 0) {
      placementStatus = 'Offered';
    } else if (interviewApps.length > 0) {
      placementStatus = 'Interviewing';
    }

    // Profile Completion Percentage
    let completionScore = 0;
    if (student.user.name) completionScore += 15;
    if (student.user.email) completionScore += 15;
    if (student.collegeId) completionScore += 15;
    if (student.branch && student.batchYear) completionScore += 15;
    if (student.skills && student.skills.length > 0) completionScore += 15;
    if (student.resumes && student.resumes.length > 0) completionScore += 15;
    if (student.phone || student.linkedinUrl || student.githubUrl) completionScore += 10;
    const profileCompletion = Math.min(completionScore, 100);

    const dossier = {
      id: student.id,
      userId: student.user.id,
      name: student.user.name,
      email: student.user.email,
      avatarUrl: student.user.avatarUrl,
      isActive: student.user.isActive,
      enrollmentNumber: student.enrollmentNumber,
      branch: student.branch,
      batchYear: student.batchYear,
      cgpa: student.cgpa,
      phone: student.phone,
      bio: student.bio,
      tenthMarks: student.tenthMarks,
      twelfthMarks: student.twelfthMarks,
      skills: student.skills,
      resumeUrl: student.resumeUrl,
      socialLinks: {
        linkedin: student.linkedinUrl || null,
        github: student.githubUrl || null,
        portfolio: student.portfolioUrl || null,
      },
      isVerified: student.isVerified,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      registeredAt: student.user.createdAt,
      placementStatus,
      profileCompletion,
      college: student.college,
      metrics: {
        totalApplications: student.applications.length,
        interviewCount: interviewApps.length,
        offersReceived: student.offers.length,
        offersAccepted: acceptedOffers.length,
        isPlaced: acceptedOffers.length > 0,
        acceptedOfferPackage: acceptedOffers[0]?.salaryPackage || null,
        acceptedOfferCompany: acceptedOffers[0]?.company.name || null,
      },
      primaryResume: student.resumes[0] || null,
      resumes: student.resumes,
      jobInterests: [],
      projects: [],
      activityStream: [
        ...student.offers.map((o) => ({
          id: `act-offer-${o.id}`,
          type: 'OFFER',
          title: `Received formal offer from ${o.company.name} for ${o.designation}`,
          timeAgo: 'Recently',
        })),
        ...student.applications.map((a) => ({
          id: `act-app-${a.id}`,
          type: a.status === 'INTERVIEW_SCHEDULED' ? 'INTERVIEW' : 'APPLICATION',
          title: `Application status updated to ${a.status} for ${a.job.title}`,
          timeAgo: 'Recently',
        })),
      ],
      applications: student.applications.map((app) => ({
        id: app.id,
        status: app.status,
        resumeUrl: app.resumeUrl,
        notes: app.notes,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt,
        jobId: app.job.id,
        jobTitle: app.job.title,
        jobType: app.job.type,
        salaryPackage: app.job.salaryPackage,
        location: app.job.location,
        companyName: app.job.company.name,
        companyLogoUrl: app.job.company.logoUrl,
      })),
      offers: student.offers.map((offer) => ({
        id: offer.id,
        status: offer.status,
        designation: offer.designation,
        salaryPackage: offer.salaryPackage,
        location: offer.location,
        joiningDate: offer.joiningDate,
        letterUrl: offer.letterUrl,
        acceptedAt: offer.acceptedAt,
        declinedAt: offer.declinedAt,
        createdAt: offer.createdAt,
        companyName: offer.company.name,
        companyLogoUrl: offer.company.logoUrl,
      })),
    };

    return successResponse(dossier, 'Student candidate dossier retrieved successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[GET_TPO_STUDENT_DOSSIER_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch student dossier', 500);
  }
}

const updateStudentSchema = z.object({
  name: z.string().min(2).optional(),
  branch: z.string().min(2).optional(),
  batchYear: z.coerce.number().int().min(2000).max(2040).optional(),
  cgpa: z.coerce.number().min(0).max(10).optional(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  skills: z.array(z.string()).optional(),
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

/**
 * PATCH /api/tpo/students/[id]
 * Allows TPO to update student academic fields or verification
 */
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

    const student = await prisma.studentProfile.findFirst({
      where: {
        OR: [{ id }, { userId: id }],
        ...(collegeId ? { collegeId } : {}),
      },
    });

    if (!student) {
      return errorResponse('Student not found or unauthorized', 404);
    }

    const body = await req.json();
    const data = updateStudentSchema.parse(body);

    await prisma.$transaction(async (tx) => {
      if (data.name !== undefined || data.isActive !== undefined) {
        await tx.user.update({
          where: { id: student.userId },
          data: {
            ...(data.name !== undefined ? { name: data.name.trim() } : {}),
            ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
          },
        });
      }

      await tx.studentProfile.update({
        where: { id: student.id },
        data: {
          ...(data.branch !== undefined ? { branch: data.branch.trim() } : {}),
          ...(data.batchYear !== undefined ? { batchYear: data.batchYear } : {}),
          ...(data.cgpa !== undefined ? { cgpa: data.cgpa } : {}),
          ...(data.phone !== undefined ? { phone: data.phone } : {}),
          ...(data.bio !== undefined ? { bio: data.bio } : {}),
          ...(data.skills !== undefined ? { skills: data.skills } : {}),
          ...(data.isVerified !== undefined ? { isVerified: data.isVerified } : {}),
        },
      });
    });

    return successResponse({ updated: true }, 'Student updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[PATCH_TPO_STUDENT_ERROR]', error);
    return errorResponse(error.message || 'Failed to update student', 500);
  }
}
