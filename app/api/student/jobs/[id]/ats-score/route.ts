import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/rbac';
import { Role } from '@/src/generated/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';
import { getOrCalculateAtsScore } from '@/lib/services/ats.service';

const atsRequestSchema = z.object({
  resumeUrl: z.string().url('A valid resume URL is required').optional(),
  forceRefresh: z.boolean().default(false),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const authUser = await requireRole([Role.STUDENT], req);
    const { id: jobId } = await context.params;

    if (!jobId) {
      return errorResponse('Job ID is required', 400);
    }

    // 1. Validate student profile
    const student = await prisma.studentProfile.findUnique({
      where: { userId: authUser.userId },
      include: {
        resumes: {
          orderBy: { isDefault: 'desc' },
        },
      },
    });

    if (!student) {
      return errorResponse('Student profile not found', 404);
    }

    // 2. Parse request body
    let bodyData: any = {};
    try {
      bodyData = await req.json();
    } catch {
      // Body can be empty, fallback to default student resume
    }

    const parseResult = atsRequestSchema.safeParse(bodyData);
    if (!parseResult.success) {
      return handleValidationError(parseResult.error);
    }

    const { resumeUrl: requestedResumeUrl, forceRefresh } = parseResult.data;

    // Determine target resume URL
    const targetResumeUrl =
      requestedResumeUrl ||
      student.resumes.find((r) => r.isDefault)?.fileUrl ||
      student.resumes[0]?.fileUrl ||
      student.resumeUrl;

    if (!targetResumeUrl || targetResumeUrl === '#') {
      return errorResponse(
        'No resume found on your profile. Please upload a PDF resume first to calculate ATS match score.',
        400
      );
    }

    // 3. Compute or Fetch Cached ATS Score
    const result = await getOrCalculateAtsScore({
      studentId: student.id,
      jobId,
      resumeUrl: targetResumeUrl,
      forceRefresh,
    });

    return successResponse(
      result,
      result.fromCache
        ? 'ATS Match retrieved from cache'
        : 'ATS Match calculated successfully using AI engine',
      200
    );
  } catch (error: any) {
    if (error.name === 'AuthError') {
      return errorResponse(error.message, error.statusCode);
    }

    console.error('[ATS_SCORE_API_ERROR]', error);
    return errorResponse(
      error.message || 'Failed to calculate ATS match score. Please try again.',
      500
    );
  }
}
