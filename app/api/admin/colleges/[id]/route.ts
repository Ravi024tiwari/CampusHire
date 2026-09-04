import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const updateCollegeSchema = z.object({
  name: z.string().trim().min(3, 'College name must be at least 3 characters').optional(),
  code: z.string().trim().toUpperCase().min(2, 'College code must be at least 2 characters').optional().nullable(),
  domain: z.string().trim().toLowerCase().optional().nullable(),
  city: z.string().trim().optional().nullable(),
  state: z.string().trim().optional().nullable(),
  logoUrl: z.string().url('Invalid logo URL').optional().nullable().or(z.literal('')),
  isVerified: z.boolean().optional(),
});

/**
 * GET /api/admin/colleges/[id]
 * Fetch complete details of a specific college for Super Admin.
 * Returns core information, assigned TPO officers, active campus drives, and placement metrics.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const [college, branchStats, batchStats, totalPlacedStudents] = await Promise.all([
      prisma.college.findUnique({
        where: { id },
        include: {
          tpos: {
            select: {
              id: true,
              designation: true,
              department: true,
              isActive: true,
              tenureStart: true,
              tenureEnd: true,
              createdAt: true,
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
            },
          },
          jobs: {
            orderBy: { createdAt: 'desc' },
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
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                  industry: true,
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
          },
          _count: {
            select: {
              students: true,
              jobs: true,
              offers: true,
            },
          },
        },
      }),
      // Students grouped by branch in this college
      prisma.studentProfile.groupBy({
        by: ['branch'],
        where: { collegeId: id },
        _count: { id: true },
      }),
      // Students grouped by batch year in this college
      prisma.studentProfile.groupBy({
        by: ['batchYear'],
        where: { collegeId: id },
        _count: { id: true },
      }),
      // Placed students count in this college
      prisma.studentProfile.count({
        where: {
          collegeId: id,
          offers: { some: { status: 'ACCEPTED' } },
        },
      }),
    ]);

    if (!college) {
      return errorResponse('College not found', 404);
    }

    const totalStudents = college._count.students;
    const totalUnplaced = totalStudents - totalPlacedStudents;
    const placementRate =
      totalStudents > 0
        ? `${((totalPlacedStudents / totalStudents) * 100).toFixed(1)}%`
        : '0%';

    const branchDistribution = branchStats.map((b) => ({
      branch: b.branch,
      count: b._count.id,
    }));

    const batchDistribution = batchStats.map((b) => ({
      batchYear: b.batchYear,
      count: b._count.id,
    }));

    return successResponse(
      {
        college: {
          id: college.id,
          name: college.name,
          code: college.code,
          domain: college.domain,
          city: college.city,
          state: college.state,
          logoUrl: college.logoUrl,
          images: college.images,
          isVerified: college.isVerified,
          createdAt: college.createdAt,
          updatedAt: college.updatedAt,
          tpos: college.tpos,
          primaryTpo: college.tpos.find((t) => t.isActive) || college.tpos[0] || null,
          jobs: college.jobs,
        },
        analytics: {
          totalEnrolledStudents: totalStudents,
          totalPlacedStudents,
          totalUnplacedStudents: totalUnplaced,
          placementRate,
          totalPlacementDrives: college._count.jobs,
          totalOffersGenerated: college._count.offers,
          branchDistribution,
          batchDistribution,
        },
      },
      'College details and student analytics retrieved successfully'
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_ADMIN_COLLEGE_DETAILS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch college details', 500);
  }
}

/**
 * PATCH /api/admin/colleges/[id]
 * Update college details (name, code, domain, city, state, logoUrl) by Super Admin.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const existing = await prisma.college.findUnique({
      where: { id },
    });

    if (!existing) {
      return errorResponse('College not found', 404);
    }

    const body = await req.json();
    const validatedData = updateCollegeSchema.parse(body);

    const updatedCollege = await prisma.college.update({
      where: { id },
      data: {
        ...(validatedData.name !== undefined ? { name: validatedData.name } : {}),
        ...(validatedData.code !== undefined ? { code: validatedData.code || null } : {}),
        ...(validatedData.domain !== undefined ? { domain: validatedData.domain || null } : {}),
        ...(validatedData.city !== undefined ? { city: validatedData.city || null } : {}),
        ...(validatedData.state !== undefined ? { state: validatedData.state || null } : {}),
        ...(validatedData.logoUrl !== undefined ? { logoUrl: validatedData.logoUrl || null } : {}),
        ...(validatedData.isVerified !== undefined ? { isVerified: validatedData.isVerified } : {}),
      },
    });

    return successResponse(updatedCollege, 'College updated successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[PATCH_ADMIN_COLLEGE_ERROR]', error);
    return errorResponse(error.message || 'Failed to update college', 500);
  }
}

/**
 * DELETE /api/admin/colleges/[id]
 * Delete a college by Super Admin.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole([Role.SUPER_ADMIN], req);

    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      return errorResponse('College not found', 404);
    }

    await prisma.college.delete({
      where: { id },
    });

    return successResponse({ deletedId: id }, 'College deleted successfully');
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[DELETE_ADMIN_COLLEGE_ERROR]', error);
    return errorResponse(error.message || 'Failed to delete college', 500);
  }
}
