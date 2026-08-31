import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { studentOfferDecisionSchema } from '@/lib/validations/application.schema';
import {
  sendOfferDecisionToRecruiterEmail,
  sendOfferConfirmationToStudentEmail,
} from '@/lib/email';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);
    const { id: applicationId } = await context.params;

    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          include: {
            company: {
              include: {
                recruiters: {
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
            },
          },
        },
      },
    });

    if (!application) {
      return errorResponse('Application not found', 404);
    }

    // Security Check: Verify application belongs to this student
    if (application.studentId !== student.id) {
      return errorResponse('Access denied. You can only respond to your own job offers.', 403);
    }

    // Validation: Offer can only be accepted/declined if in OFFERED status
    if (application.status !== 'OFFERED') {
      return errorResponse(
        `Cannot submit decision for application with status "${application.status}". An offer must be in "OFFERED" state.`,
        400
      );
    }

    const body = await req.json();
    const parsedData = studentOfferDecisionSchema.parse(body);

    const primaryRecruiter = application.job.company.recruiters[0]?.user;
    const companyName = application.job.company.name;
    const jobTitle = application.job.title;

    if (parsedData.decision === 'ACCEPTED') {
      // Check if student has already accepted another offer (Campus Placement Single Offer Policy)
      const existingAcceptedOffer = await prisma.application.findFirst({
        where: {
          studentId: student.id,
          status: 'ACCEPTED',
        },
      });

      if (existingAcceptedOffer) {
        return errorResponse(
          'Campus Placement Policy Violation: You have already accepted a placement offer and cannot accept another.',
          409
        );
      }

      // Atomic Transaction: Accept this offer and auto-withdraw any other pending applications
      const updatedApplication = await prisma.$transaction(async (tx) => {
        // 1. Accept chosen application
        const accepted = await tx.application.update({
          where: { id: applicationId },
          data: {
            status: 'ACCEPTED',
            notes: parsedData.notes ? `Student Remarks: ${parsedData.notes}` : application.notes,
          },
        });

        // 2. Update formal Offer record
        await tx.offer.updateMany({
          where: { applicationId },
          data: {
            status: 'ACCEPTED',
            acceptedAt: new Date(),
            notes: parsedData.notes ? `Accepted: ${parsedData.notes}` : undefined,
          },
        });

        // 3. Auto-withdraw any other active applications
        await tx.application.updateMany({
          where: {
            studentId: student.id,
            id: { not: applicationId },
            status: { in: ['APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED'] },
          },
          data: {
            status: 'DECLINED',
            notes: `Auto-withdrawn: Candidate accepted on-campus placement offer at ${companyName}.`,
          },
        });

        return accepted;
      });

      // Email notifications (Async)
      if (primaryRecruiter) {
        sendOfferDecisionToRecruiterEmail({
          recruiterName: primaryRecruiter.name,
          recruiterEmail: primaryRecruiter.email,
          studentName: student.user.name,
          studentEmail: student.user.email,
          companyName,
          jobTitle,
          decision: 'ACCEPTED',
          notes: parsedData.notes || null,
        }).catch((err) => console.error('[RECRUITER_NOTIFICATION_FAILED]', err));
      }

      sendOfferConfirmationToStudentEmail({
        studentName: student.user.name,
        studentEmail: student.user.email,
        companyName,
        jobTitle,
        salaryPackage: application.job.salaryPackage,
        location: application.job.location,
      }).catch((err) => console.error('[STUDENT_CONFIRMATION_FAILED]', err));

      return successResponse(
        updatedApplication,
        `Congratulations! You have accepted the placement offer from ${companyName}. Other active drive applications have been automatically withdrawn in accordance with the campus placement policy.`
      );
    } else {
      // Student DECLINES the offer
      const updatedApplication = await prisma.$transaction(async (tx) => {
        const app = await tx.application.update({
          where: { id: applicationId },
          data: {
            status: 'DECLINED',
            notes: parsedData.notes ? `Decline reason: ${parsedData.notes}` : 'Offer declined by candidate.',
          },
        });

        await tx.offer.updateMany({
          where: { applicationId },
          data: {
            status: 'DECLINED',
            declinedAt: new Date(),
            notes: parsedData.notes ? `Declined: ${parsedData.notes}` : 'Declined by student',
          },
        });

        return app;
      });

      // Notify recruiter
      if (primaryRecruiter) {
        sendOfferDecisionToRecruiterEmail({
          recruiterName: primaryRecruiter.name,
          recruiterEmail: primaryRecruiter.email,
          studentName: student.user.name,
          studentEmail: student.user.email,
          companyName,
          jobTitle,
          decision: 'DECLINED',
          notes: parsedData.notes || null,
        }).catch((err) => console.error('[RECRUITER_DECLINE_NOTIFICATION_FAILED]', err));
      }

      return successResponse(
        updatedApplication,
        `You have declined the offer from ${companyName}. You remain eligible for other campus placement drives.`
      );
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[STUDENT_OFFER_DECISION_ERROR]', error);
    return errorResponse(error.message || 'Failed to submit offer decision', 500);
  }
}
