import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser, verifyToken, clearSessionCookie } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    // 1. Try session cookie first
    let session = await getSessionUser();

    // 2. If no cookie session, check Authorization Bearer header
    if (!session) {
      const authHeader = req.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        session = await verifyToken(token);
      }
    }

    if (!session) {
      return successResponse({ user: null }, 'No active session');
    }

    // Fetch latest user data from database
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        student: {
          include: {
            college: true,
          },
        },
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

    if (!user || !user.isActive) {
      await clearSessionCookie();
      return successResponse({ user: null }, 'User account not found or deactivated');
    }

    // Exclude passwordHash
    const { passwordHash: _, ...safeUser } = user;

    return successResponse(
      {
        user: safeUser,
      },
      'Current user profile retrieved successfully'
    );
  } catch (error: any) {
    console.error('[AUTH_ME_ERROR]', error);
    return errorResponse('Failed to retrieve current user', 500);
  }
}
