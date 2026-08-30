import { NextRequest } from 'next/server';
import { Role } from '@/src/generated/prisma';
import { getSessionUser, TokenPayload } from './auth';

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 401) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

export async function getAuthContext(req?: NextRequest): Promise<TokenPayload | null> {
  if (req) {
    const userId = req.headers.get('x-user-id');
    const role = req.headers.get('x-user-role') as Role | null;
    const email = req.headers.get('x-user-email');
    const rawName = req.headers.get('x-user-name');
    const name = rawName ? decodeURIComponent(rawName) : '';

    if (userId && role && email) {
      return { userId, role, email, name };
    }
  }

  return getSessionUser();
}

export async function requireAuth(req?: NextRequest): Promise<TokenPayload> {
  const user = await getAuthContext(req);
  if (!user) {
    throw new AuthError('Authentication required. Please log in.', 401);
  }
  return user;
}

export async function requireRole(allowedRoles: Role[], req?: NextRequest): Promise<TokenPayload> {
  const user = await requireAuth(req);

  if (!allowedRoles.includes(user.role)) {
    throw new AuthError(
      `Access denied. You do not have permission to access this resource. Required role(s): ${allowedRoles.join(', ')}`,
      403
    );
  }

  return user;
}

