import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { updateApplicationStatusSchema } from '@/lib/validations/application.schema';
import { sendOfferLetterEmail } from '@/lib/email';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.RECRUITER], req);
    const { id: applicationId } = await context.params;

    const recruiter = await prisma.recruiterProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        company: true,
      },
    });

    if (!recruiter || !recruiter.companyId) {
      return errorResponse('Recruiter profile not found', 404);
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          select: {
            id: true,
            companyId: true,
            collegeId: true,
            title: true,
            salaryPackage: true,
            location: true,
          },
        },
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

    // Security Check: Verify recruiter's company owns this job
    if (application.job.companyId !== recruiter.companyId) {
      return errorResponse('Access denied. You cannot modify applications for other companies.', 403);
    }

    const body = await req.json();
    const parsedData = updateApplicationStatusSchema.parse(body);

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: parsedData.status,
        ...(parsedData.notes !== undefined ? { notes: parsedData.notes } : {}),
      },
    });

    // If candidate is marked as OFFERED, create/update Offer record and trigger Resend email
    let offerRecord = null;
    if (parsedData.status === 'OFFERED') {
      const offeredSalary = parsedData.salaryPackage || application.job.salaryPackage;
      const offerLocation = parsedData.location || application.job.location;
      const offerTitle = parsedData.designation || application.job.title;
      const joiningDateObj = parsedData.joiningDate ? new Date(parsedData.joiningDate) : null;

      // Upsert formal Offer model
      offerRecord = await prisma.offer.upsert({
        where: { applicationId },
        create: {
          applicationId,
          studentId: application.studentId,
          jobId: application.jobId,
          companyId: recruiter.companyId,
          collegeId: application.job.collegeId,
          designation: offerTitle,
          salaryPackage: offeredSalary,
          location: offerLocation,
          joiningDate: joiningDateObj,
          letterUrl: parsedData.offerLetterUrl || null,
          notes: parsedData.notes || null,
          status: 'PENDING',
        },
        update: {
          designation: offerTitle,
          salaryPackage: offeredSalary,
          location: offerLocation,
          joiningDate: joiningDateObj,
          letterUrl: parsedData.offerLetterUrl || null,
          notes: parsedData.notes || null,
          status: 'PENDING',
        },
      });

      // Asynchronous email dispatch (non-blocking)
      sendOfferLetterEmail({
        studentName: application.student.user.name,
        studentEmail: application.student.user.email,
        companyName: recruiter.company.name,
        companyLogoUrl: recruiter.company.logoUrl,
        jobTitle: offerTitle,
        salaryPackage: offeredSalary,
        location: offerLocation,
        joiningDate: parsedData.joiningDate || null,
        offerLetterUrl: parsedData.offerLetterUrl || null,
        notes: parsedData.notes || null,
      }).catch((err) => console.error('[OFFER_EMAIL_DISPATCH_FAILED]', err));
    }

    return successResponse(
      {
        application: updatedApplication,
        offer: offerRecord,
      },
      `Application for ${application.student.user.name} moved to ${parsedData.status}${parsedData.status === 'OFFERED' ? ' with formal Offer Letter created and email dispatched.' : '.'}`
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[UPDATE_APPLICATION_STATUS_ERROR]', error);
    return errorResponse(error.message || 'Failed to update application status', 500);
  }
}
