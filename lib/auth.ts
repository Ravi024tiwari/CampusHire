import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { Role } from '@/src/generated/prisma';

export const AUTH_COOKIE_NAME = 'campushire_session';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET
);

const SALT_ROUNDS = 12;

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
  name: string;
}


export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}


export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}


export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}


export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
}


export async function getSessionUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  return verifyToken(sessionToken);
}

/**
 * Sets the secure HTTP-Only session cookie.
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
  });
}

/**
 * Clears the session cookie.
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
