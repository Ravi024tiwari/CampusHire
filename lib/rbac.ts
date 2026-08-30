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


export async function requireAuth(): Promise<TokenPayload> {
  const user = await getSessionUser();
  if (!user) {
    throw new AuthError('Authentication required. Please log in.', 401);
  }
  return user;
}


export async function requireRole(allowedRoles: Role[]): Promise<TokenPayload> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw new AuthError(
      `Access denied. You do not have permission to access this resource. Required role(s): ${allowedRoles.join(', ')}`,
      403
    );
  }

  return user;
}
