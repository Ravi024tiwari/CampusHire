import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const updateCollegeSchema = z.object({
  name: z.string().trim().min(2, 'College name must be at least 2 characters').optional(),
  code: z.string().trim().toUpperCase().min(2, 'College code must be at least 2 characters').optional().nullable(),
  domain: z.string().trim().toLowerCase().optional().nullable(),
  city: z.string().trim().min(2, 'City is required').optional().nullable(),
  state: z.string().trim().min(2, 'State is required').optional().nullable(),
  contactEmail: z.string().trim().email('Invalid contact email address').optional().nullable().or(z.literal('')),
  contactPhone: z.string().trim().optional().nullable(),
  logoUrl: z.string().url('Invalid logo URL').optional().nullable().or(z.literal('')),
  images: z.array(z.string().url('Invalid image URL')).max(10, 'Maximum 10 campus images allowed').optional(),
});

/**
 * GET /api/colleges/[id]
 * Fetch comprehensive institutional profile for a college including TPO coordinators,
 * active campus recruitment drives, student enrollment, and placement statistics.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [college, placedStudentsCount, totalOffersCount, totalApplicationsCount] = await Promise.all([
      prisma.college.findUnique({
        where: { id },
        include: {
          tpos: {
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
            orderBy: { createdAt: 'desc' },
          },
          jobs: {
            include: {
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
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
          _count: {
            select: {
              students: true,
              jobs: true,
              tpos: true,
              offers: true,
            },
          },
        },
      }),
      prisma.offer.count({
        where: {
          collegeId: id,
          status: 'ACCEPTED',
        },
      }),
      prisma.offer.count({
        where: {
          collegeId: id,
        },
      }),
      prisma.application.count({
        where: {
          job: {
            collegeId: id,
          },
        },
      }),
    ]);

    if (!college) {
      return errorResponse('University / College institution not found', 404);
    }

    const payload = {
      ...college,
      placementStats: {
        enrolledStudents: college._count?.students || 0,
        placedStudents: placedStudentsCount,
        totalOffers: totalOffersCount,
        totalApplications: totalApplicationsCount,
        placementRate: college._count?.students 
          ? Math.min(100, Math.round((placedStudentsCount / college._count.students) * 100))
          : 0,
        activeDrives: college._count?.jobs || 0,
      },
    };

    return successResponse(payload, 'College profile details and placement intelligence retrieved successfully');
  } catch (error: any) {
    return handleApiError(error, 'Failed to retrieve college profile', '[GET_COLLEGE_BY_ID_ERROR]');
  }
}

/**
 * PATCH /api/colleges/[id]
 * Secure production-grade endpoint for authorized TPOs and College Creators (or Super Admins)
 * to update their institution's profile details.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 1. Authenticate user
    const authUser = await requireAuth(req);

    // 2. Fetch target college and requesting user's profiles
    const [college, userProfile] = await Promise.all([
      prisma.college.findUnique({
        where: { id },
        include: {
          tpos: true,
        },
      }),
      prisma.user.findUnique({
        where: { id: authUser.userId },
        include: {
          tpo: true,
          recruiter: true,
        },
      }),
    ]);

    if (!college) {
      return errorResponse('University / College institution not found', 404);
    }

    // 3. Granular Production-Grade RBAC Authorization Check:
    // - SUPER_ADMIN: Can update any college
    // - TPO_ADMIN: Can only update if they belong to this college (TpoProfile.collegeId === college.id or user.tpo.collegeId === id)
    // - RECRUITER: Can only update if they were the creator/onboarder of this college (college.createdById === authUser.userId)
    const isSuperAdmin = authUser.role === Role.SUPER_ADMIN;
    const isCollegeTpo = 
      authUser.role === Role.TPO_ADMIN && 
      (userProfile?.tpo?.collegeId === id || college.tpos.some((t) => t.userId === authUser.userId));
    const isCollegeCreator = college.createdById === authUser.userId;

    if (!isSuperAdmin && !isCollegeTpo && !isCollegeCreator) {
      return errorResponse(
        'Access denied. You do not have authorization to edit this college profile. Only assigned TPO administrators or institutional onboarding creators may perform this action.',
        403
      );
    }

    // 4. Validate payload with Zod
    const body = await req.json();
    const validatedData = updateCollegeSchema.parse(body);

    // 5. Unique checks if name or code or domain are being changed
    if (validatedData.name && validatedData.name !== college.name) {
      const duplicateName = await prisma.college.findUnique({
        where: { name: validatedData.name },
      });
      if (duplicateName && duplicateName.id !== id) {
        return errorResponse('Another institution is already registered with this name.', 400);
      }
    }

    if (validatedData.code && validatedData.code !== college.code) {
      const duplicateCode = await prisma.college.findUnique({
        where: { code: validatedData.code },
      });
      if (duplicateCode && duplicateCode.id !== id) {
        return errorResponse('Institutional code (e.g. DTU) is already assigned to another campus.', 400);
      }
    }

    // 6. Update college record
    const updatedCollege = await prisma.college.update({
      where: { id },
      data: {
        ...(validatedData.name !== undefined ? { name: validatedData.name } : {}),
        ...(validatedData.code !== undefined ? { code: validatedData.code || null } : {}),
        ...(validatedData.domain !== undefined ? { domain: validatedData.domain || null } : {}),
        ...(validatedData.city !== undefined ? { city: validatedData.city || null } : {}),
        ...(validatedData.state !== undefined ? { state: validatedData.state || null } : {}),
        ...(validatedData.contactEmail !== undefined ? { contactEmail: validatedData.contactEmail || null } : {}),
        ...(validatedData.contactPhone !== undefined ? { contactPhone: validatedData.contactPhone || null } : {}),
        ...(validatedData.logoUrl !== undefined ? { logoUrl: validatedData.logoUrl || null } : {}),
        ...(validatedData.images !== undefined ? { images: validatedData.images } : {}),
      },
      include: {
        tpos: {
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
      },
    });

    return successResponse(updatedCollege, 'College profile details updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    return handleApiError(error, 'Failed to update college details', '[PATCH_COLLEGE_DETAILS_ERROR]');
  }
}
