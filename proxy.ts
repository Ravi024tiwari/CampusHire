import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Public frontend pages accessible without logging in
const PUBLIC_PAGE_ROUTES = [
  '/',
  '/login',
  '/register',
  '/colleges',
  '/unauthorized',
];

// Public API endpoints accessible without authentication
const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/api/colleges',
  '/api/companies',
  '/api/upload',
];


// Role-specific protected path prefixes
const ROLE_ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/api/student': ['STUDENT'],
  '/api/recruiter': ['RECRUITER'],
  '/api/tpo': ['TPO_ADMIN'],
  '/api/admin': ['SUPER_ADMIN'],

  '/student': ['STUDENT'],
  '/recruiter': ['RECRUITER'],
  '/tpo': ['TPO_ADMIN'],
  '/admin': ['SUPER_ADMIN'],
};

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || 'campushire-fallback-secret-key-for-development';
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public static assets and system routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // 2. Allow public frontend pages (Home, Login, Register, Colleges, etc.)
  if (PUBLIC_PAGE_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // 3. Allow public API endpoints
  if (PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 4. Extract token from HTTP-only session cookie or Bearer Authorization header
  let token = request.cookies.get('campushire_session')?.value;

  if (!token) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  // 5. If no token is found, block unauthenticated access
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required. Please provide a valid session or token.',
        },
        { status: 401 }
      );
    }

    // For protected frontend dashboards, redirect to login with return path
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 6. Verify JWT token signature and expiration
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    const userRole = payload.role as string;
    const userId = payload.userId as string;
    const userEmail = payload.email as string;
    const userName = (payload.name as string) || '';

    // 7. Role-Based Access Control (RBAC) check
    for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTE_PERMISSIONS)) {
      if (pathname.startsWith(routePrefix)) {
        if (!allowedRoles.includes(userRole)) {
          if (pathname.startsWith('/api/')) {
            return NextResponse.json(
              {
                success: false,
                error: `Forbidden: Access restricted to [${allowedRoles.join(', ')}] role. Current role: ${userRole}`,
              },
              { status: 403 }
            );
          }

          // For frontend pages, redirect to unauthorized / forbidden page
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
    }

    // 8. Forward verified user claims via request headers to downstream handlers
    const forwardHeaders = new Headers(request.headers);
    forwardHeaders.set('x-user-id', userId);
    forwardHeaders.set('x-user-role', userRole);
    forwardHeaders.set('x-user-email', userEmail);
    forwardHeaders.set('x-user-name', encodeURIComponent(userName));

    return NextResponse.next({
      request: {
        headers: forwardHeaders,
      },
    });
  } catch {
    // Token is invalid, tampered, or expired
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired session token. Please log in again.',
        },
        { status: 401 }
      );
    }

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Next.js proxy matcher configuration
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
