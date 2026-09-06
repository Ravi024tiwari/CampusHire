import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role, OfferStatus } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { createOfferSchema } from '@/lib/validations/application.schema';
import { sendOfferLetterEmail } from '@/lib/email';

const recruiterOfferQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['ALL', 'ACCEPTED', 'PENDING', 'DECLINED', 'EXPIRED', 'REVOKED']).optional(),
  collegeId: z.string().optional(),
  batchYear: z.coerce.number().int().optional(),
  jobId: z.string().optional(),
  role: z.string().optional(),
  search: z.string().trim().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.enum(['latest', 'oldest', 'salary_high', 'salary_low']).default('latest'),
});

/**
 * GET /api/recruiter/offers
 * Paginated list of all offers issued by this recruiter's company with KPI metrics and filters.
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { company: true },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const { searchParams } = new URL(req.url);
    const query = recruiterOfferQuerySchema.parse({
      page: searchParams.get('page') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      collegeId: searchParams.get('collegeId') ?? undefined,
      batchYear: searchParams.get('batchYear') ?? undefined,
      jobId: searchParams.get('jobId') ?? undefined,
      role: searchParams.get('role') ?? undefined,
      search: searchParams.get('search') ?? undefined,
      startDate: searchParams.get('startDate') ?? undefined,
      endDate: searchParams.get('endDate') ?? undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
    });

    const where: any = {
      companyId: recruiter.companyId, // Strict company boundary
    };

    if (query.status && query.status !== 'ALL') {
      where.status = query.status;
    }

    if (query.collegeId && query.collegeId !== 'ALL') {
      where.collegeId = query.collegeId;
    }

    if (query.batchYear) {
      where.student = { ...where.student, batchYear: query.batchYear };
    }

    if (query.jobId && query.jobId !== 'ALL') {
      where.jobId = query.jobId;
    }

    if (query.role && query.role !== 'ALL') {
      where.designation = { contains: query.role, mode: 'insensitive' };
    }

    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) where.createdAt.gte = new Date(query.startDate);
      if (query.endDate) where.createdAt.lte = new Date(query.endDate);
    }

    if (query.search) {
      where.OR = [
        { student: { user: { name: { contains: query.search, mode: 'insensitive' } } } },
        { student: { user: { email: { contains: query.search, mode: 'insensitive' } } } },
        { student: { enrollmentNumber: { contains: query.search, mode: 'insensitive' } } },
        { designation: { contains: query.search, mode: 'insensitive' } },
        { college: { name: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    // Determine sorting order (newest first by default)
    let orderBy: any = { createdAt: 'desc' };
    if (query.sortBy === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (query.sortBy === 'salary_high' || query.sortBy === 'salary_low') {
      orderBy = { createdAt: 'desc' };
    }

    const skip = (query.page - 1) * query.limit;

    // Concurrently fetch counts, stats, distinct options, and paginated records
    const [totalMatching, offers, statsCounts, distinctColleges, distinctJobs, distinctBatches] = await Promise.all([
      prisma.offer.count({ where }),
      prisma.offer.findMany({
        where,
        skip,
        take: query.limit,
        orderBy,
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  avatarUrl: true,
                },
              },
            },
          },
          college: {
            select: {
              id: true,
              name: true,
              code: true,
              city: true,
              logoUrl: true,
            },
          },
          job: {
            select: {
              id: true,
              title: true,
              type: true,
            },
          },
        },
      }),
      // Aggregate stats for the company
      prisma.offer.groupBy({
        by: ['status'],
        where: { companyId: recruiter.companyId },
        _count: { id: true },
      }),
      // Distinct colleges that have offers from this company
      prisma.college.findMany({
        where: { offers: { some: { companyId: recruiter.companyId } } },
        select: { id: true, name: true, code: true },
        orderBy: { name: 'asc' },
      }),
      // Distinct job postings by this company
      prisma.job.findMany({
        where: { companyId: recruiter.companyId },
        select: { id: true, title: true, type: true },
        orderBy: { title: 'asc' },
      }),
      // Distinct batch years of students with offers
      prisma.studentProfile.findMany({
        where: { offers: { some: { companyId: recruiter.companyId } } },
        select: { batchYear: true },
        distinct: ['batchYear'],
        orderBy: { batchYear: 'desc' },
      }),
    ]);

    // Compute stats map
    const statsMap: Record<string, number> = {};
    let totalAllOffers = 0;
    statsCounts.forEach((sc) => {
      statsMap[sc.status] = sc._count.id;
      totalAllOffers += sc._count.id;
    });

    const acceptedCount = statsMap['ACCEPTED'] || 0;
    const pendingCount = statsMap['PENDING'] || 0;
    const declinedCount = (statsMap['DECLINED'] || 0) + (statsMap['EXPIRED'] || 0);
    const acceptanceRate = totalAllOffers > 0 ? Math.round((acceptedCount / totalAllOffers) * 100) : 0;
    const pendingRate = totalAllOffers > 0 ? Math.round((pendingCount / totalAllOffers) * 100) : 0;
    const declinedRate = totalAllOffers > 0 ? Math.round((declinedCount / totalAllOffers) * 100) : 0;

    const formattedOffers = offers.map((offer) => ({
      id: offer.id,
      applicationId: offer.applicationId,
      status: offer.status,
      designation: offer.designation,
      salaryPackage: offer.salaryPackage,
      location: offer.location,
      joiningDate: offer.joiningDate,
      letterUrl: offer.letterUrl,
      notes: offer.notes,
      expiresAt: offer.expiresAt,
      acceptedAt: offer.acceptedAt,
      declinedAt: offer.declinedAt,
      createdAt: offer.createdAt,
      student: {
        id: offer.student.id,
        name: offer.student.user.name,
        email: offer.student.user.email,
        avatarUrl: offer.student.user.avatarUrl,
        enrollmentNumber: offer.student.enrollmentNumber,
        branch: offer.student.branch,
        batchYear: offer.student.batchYear,
        cgpa: offer.student.cgpa,
        isVerified: offer.student.isVerified,
      },
      college: offer.college,
      job: offer.job,
    }));

    return successResponse(
      {
        offers: formattedOffers,
        stats: {
          total: totalAllOffers,
          accepted: acceptedCount,
          pending: pendingCount,
          declined: declinedCount,
          acceptanceRate,
          pendingRate,
          declinedRate,
        },
        filterOptions: {
          colleges: distinctColleges,
          jobs: distinctJobs,
          batchYears: distinctBatches.map((b) => b.batchYear),
        },
        pagination: {
          page: query.page,
          limit: query.limit,
          total: totalMatching,
          totalPages: Math.ceil(totalMatching / query.limit) || 1,
          hasMore: query.page * query.limit < totalMatching,
        },
      },
      'Company placement offers retrieved successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[GET_RECRUITER_OFFERS_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch company offers', 500);
  }
}

/**
 * POST /api/recruiter/offers
 * Issue a formal on-campus offer letter directly to a candidate and dispatch email notification.
 */
export async function POST(req: NextRequest) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: { company: true },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile or associated company not found', 404);
    }

    // Guard: Company must be verified by Super Admin
    if (!recruiter.company.isVerified) {
      return errorResponse(
        `Company Verification Pending: "${recruiter.company.name}" has not yet been verified by the Super Admin. You cannot issue placement offers.`,
        403
      );
    }

    const body = await req.json();
    const parsedData = createOfferSchema.parse(body);

    const application = await prisma.application.findUnique({
      where: { id: parsedData.applicationId },
      include: {
        job: true,
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    // Security check: Recruiter's company must own the job drive
    if (application.job.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. You cannot issue offers for other companies.', 403);
    }

    // Single Offer Policy Check: Candidate already accepted another offer
    const alreadyPlacedOffer = await prisma.application.findFirst({
      where: {
        studentId: application.studentId,
        status: 'ACCEPTED',
      },
      include: {
        job: {
          include: { company: true },
        },
      },
    });

    if (alreadyPlacedOffer) {
      return errorResponse(
        `Candidate Already Placed: This student has already accepted an offer at ${alreadyPlacedOffer.job.company.name} and is not eligible for new offers.`,
        409
      );
    }

    const offerTitle = parsedData.designation || application.job.title;
    const offerPackage = parsedData.salaryPackage || application.job.salaryPackage;
    const offerLocation = parsedData.location || application.job.location;
    const joiningDateObj = parsedData.joiningDate ? new Date(parsedData.joiningDate) : null;
    const expiresAtObj = parsedData.expiresAt ? new Date(parsedData.expiresAt) : null;

    // Transactional Upsert: Update Application status to OFFERED and create/update Offer record
    const { offer, updatedApplication } = await prisma.$transaction(async (tx) => {
      const app = await tx.application.update({
        where: { id: application.id },
        data: {
          status: 'OFFERED',
          notes: parsedData.notes || application.notes,
        },
      });

      const off = await tx.offer.upsert({
        where: { applicationId: application.id },
        create: {
          applicationId: application.id,
          studentId: application.studentId,
          jobId: application.jobId,
          companyId: recruiter.companyId,
          collegeId: application.job.collegeId,
          designation: offerTitle,
          salaryPackage: offerPackage,
          location: offerLocation,
          joiningDate: joiningDateObj,
          letterUrl: parsedData.letterUrl || null,
          notes: parsedData.notes || null,
          expiresAt: expiresAtObj,
          status: 'PENDING',
        },
        update: {
          designation: offerTitle,
          salaryPackage: offerPackage,
          location: offerLocation,
          joiningDate: joiningDateObj,
          letterUrl: parsedData.letterUrl || null,
          notes: parsedData.notes || null,
          expiresAt: expiresAtObj,
          status: 'PENDING',
        },
      });

      return { offer: off, updatedApplication: app };
    });

    // Asynchronously dispatch styled HTML email to student's email via Resend
    sendOfferLetterEmail({
      studentName: application.student.user.name,
      studentEmail: application.student.user.email,
      companyName: recruiter.company.name,
      companyLogoUrl: recruiter.company.logoUrl,
      jobTitle: offerTitle,
      salaryPackage: offerPackage,
      location: offerLocation,
      joiningDate: parsedData.joiningDate || null,
      offerLetterUrl: parsedData.letterUrl || null,
      notes: parsedData.notes || null,
    }).catch((err) => {
      console.error('[OFFER_LETTER_EMAIL_BACKGROUND_ERROR]', err);
    });

    return successResponse(
      {
        offer,
        application: updatedApplication,
      },
      `Offer letter issued successfully for ${application.student.user.name} and dispatched to ${application.student.user.email}`,
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[POST_RECRUITER_OFFER_ERROR]', error);
    return errorResponse(error.message || 'Failed to issue offer letter', 500);
  }
}
