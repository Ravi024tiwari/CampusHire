import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const createCollegeSchema = z.object({
  name: z.string().trim().min(2, 'College name must be at least 2 characters'),
  code: z.string().trim().toUpperCase().min(2, 'College code must be at least 2 characters').optional().nullable(),
  domain: z.string().trim().toLowerCase().optional().nullable(),
  city: z.string().trim().min(2, 'City is required').optional().nullable(),
  state: z.string().trim().min(2, 'State is required').optional().nullable(),
  contactEmail: z.string().email('Invalid contact email').optional().nullable().or(z.literal('')),
  contactPhone: z.string().optional().nullable().or(z.literal('')),
  logoUrl: z.string().url('Invalid logo URL').optional().nullable().or(z.literal('')),
  images: z.array(z.string().url('Invalid campus photo URL')).default([]),
});

const updateCollegeSchema = createCollegeSchema.partial();

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        college: {
          include: {
            tpos: {
              select: {
                id: true,
                designation: true,
                department: true,
                isActive: true,
                tenureStart: true,
                createdAt: true,
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
            _count: {
              select: {
                students: true,
                jobs: true,
                offers: true,
              },
            },
          },
        },
      },
    });

    if (!tpo) {
      return errorResponse('TPO profile not found', 404);
    }

    return successResponse(
      {
        hasCollege: Boolean(tpo.college),
        college: tpo.college,
      },
      'TPO college status fetched successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[GET_TPO_COLLEGE_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch TPO college', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: { college: true },
    });

    if (!tpo) {
      return errorResponse('TPO profile not found', 404);
    }

    if (tpo.collegeId || tpo.college) {
      return errorResponse(
        'You have already registered and linked a college to your TPO account.',
        400
      );
    }

    const body = await req.json();
    const parsedData = createCollegeSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Check if college with same name already exists
      const existingByName = await tx.college.findFirst({
        where: {
          name: {
            equals: parsedData.name.trim(),
            mode: 'insensitive',
          },
        },
        include: { tpos: true },
      });

      if (existingByName) {
        // Link this TPO to existing verified / registered College
        const updatedTpo = await tx.tpoProfile.update({
          where: { id: tpo.id },
          data: {
            collegeId: existingByName.id,
          },
          include: {
            college: true,
          },
        });

        return updatedTpo;
      }

      // 2. Check if code already taken
      if (parsedData.code) {
        const existingByCode = await tx.college.findUnique({
          where: { code: parsedData.code },
        });

        if (existingByCode) {
          throw new Error(
            `The college code "${parsedData.code}" is already in use by another registered institution.`
          );
        }
      }

      // 3. Create new College and link to this TPO
      const newCollege = await tx.college.create({
        data: {
          name: parsedData.name.trim(),
          code: parsedData.code || null,
          domain: parsedData.domain || null,
          city: parsedData.city || null,
          state: parsedData.state || null,
          contactEmail: parsedData.contactEmail || null,
          contactPhone: parsedData.contactPhone || null,
          logoUrl: parsedData.logoUrl || null,
          images: parsedData.images || [],
          createdRole: Role.TPO_ADMIN,
          createdById: authUser.userId,
          isVerified: false,
        },
      });

      const updatedTpo = await tx.tpoProfile.update({
        where: { id: tpo.id },
        data: {
          collegeId: newCollege.id,
        },
        include: {
          college: true,
        },
      });

      return updatedTpo;
    });

    return successResponse(
      result,
      'Your college has been registered successfully and submitted for platform verification!',
      201
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[POST_TPO_COLLEGE_ERROR]', error);
    return errorResponse(error.message || 'Failed to register college', 400);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.TPO_ADMIN], req);

    const tpo = await prisma.tpoProfile.findUnique({
      where: { userId: authUser.userId },
      include: { college: true },
    });

    if (!tpo || !tpo.collegeId || !tpo.college) {
      return errorResponse('No linked college profile found for this TPO officer.', 404);
    }

    const body = await req.json();
    const parsedData = updateCollegeSchema.parse(body);

    const updatedCollege = await prisma.college.update({
      where: { id: tpo.collegeId },
      data: {
        ...(parsedData.name ? { name: parsedData.name } : {}),
        ...(parsedData.code !== undefined ? { code: parsedData.code } : {}),
        ...(parsedData.domain !== undefined ? { domain: parsedData.domain } : {}),
        ...(parsedData.city !== undefined ? { city: parsedData.city } : {}),
        ...(parsedData.state !== undefined ? { state: parsedData.state } : {}),
        ...(parsedData.contactEmail !== undefined ? { contactEmail: parsedData.contactEmail } : {}),
        ...(parsedData.contactPhone !== undefined ? { contactPhone: parsedData.contactPhone } : {}),
        ...(parsedData.logoUrl !== undefined ? { logoUrl: parsedData.logoUrl } : {}),
        ...(parsedData.images !== undefined ? { images: parsedData.images } : {}),
      },
    });

    return successResponse(updatedCollege, 'College profile updated successfully.');
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return handleValidationError(error);
    }
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }
    console.error('[PATCH_TPO_COLLEGE_ERROR]', error);
    return errorResponse(error.message || 'Failed to update college details', 400);
  }
}
