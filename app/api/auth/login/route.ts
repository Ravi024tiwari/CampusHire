import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signToken, setSessionCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/auth.schema';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';
 
export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return errorResponse('Invalid or empty JSON request body', 400);
    }

    const { email, password } = loginSchema.parse(body);
    const normalizedEmail = email.toLowerCase().trim();

    // Query user by email with role-specific profile relations
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        student: true,
        recruiter: {
          include: {
            company: true,
          },
        },
        tpo: {
          include: {
            college: true,
          },
        },
      },
    });

    if (!user || !user.passwordHash) {
      return errorResponse('Invalid email or password', 401);
    }

    if (!user.isActive) {
      return errorResponse('Your account is inactive. Please contact the administrator.', 403);
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return errorResponse('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    await setSessionCookie(token);

    const { passwordHash: _, ...safeUser } = user;

    return successResponse(
      {
        user: safeUser,
        token,
      },
      'Logged in successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(
      error,
      'Unable to sign in. Please verify your credentials and try again.',
      '[AUTH_LOGIN_ERROR]'
    );
  }
}

