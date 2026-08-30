import { NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signToken, setSessionCookie } from '@/lib/auth';
import { loginSchema } from '@/lib/validations/auth.schema';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    console.error('[AUTH_LOGIN_ERROR]', error);
    return errorResponse(error.message || 'Internal server error during login', 500);
  }
}
