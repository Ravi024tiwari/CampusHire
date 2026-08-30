import { NextRequest } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(_req: NextRequest) {
  try {
    await clearSessionCookie();
    return successResponse(null, 'Logged out successfully');
  } catch (error: any) {
    console.error('[AUTH_LOGOUT_ERROR]', error);
    return errorResponse('Failed to logout. Please try again.', 500);
  }
}
