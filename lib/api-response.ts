import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}


export function successResponse<T>(data: T, message?: string, status: number = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}


export function errorResponse(error: string, status: number = 400, errors?: Record<string, string[]>) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error,
      errors,
    },
    { status }
  );
}

export function handleValidationError(zodError: ZodError) {
  const formattedErrors: Record<string, string[]> = {};

  zodError.errors.forEach((err) => {
    const field = err.path.join('.') || 'root';
    if (!formattedErrors[field]) {
      formattedErrors[field] = [];
    }
    formattedErrors[field].push(err.message);
  });

  return errorResponse('Validation failed. Please check your inputs.', 422, formattedErrors);
}

/**
 * Formats database and system errors (e.g. Prisma / Postgres / Driver) into clean, 
 * user-friendly error messages instead of leaking raw schema/SQL stack details to the UI.
 */
export function sanitizeDatabaseErrorMessage(
  error: any,
  fallbackMessage: string = 'Unable to complete your request. Please try again.'
): { message: string; statusCode: number } {
  if (!error) {
    return { message: fallbackMessage, statusCode: 500 };
  }

  // Handle AuthError
  if (error.name === 'AuthError') {
    return { message: error.message || 'Authentication required.', statusCode: error.statusCode || 401 };
  }

  // Handle Prisma Known Request Errors
  if (error.code) {
    switch (error.code) {
      case 'P2002': {
        const target = Array.isArray(error.meta?.target)
          ? error.meta.target.join(', ')
          : String(error.meta?.target || '');
        if (target.includes('email')) {
          return { message: 'An account with this email address already exists.', statusCode: 409 };
        }
        if (target.includes('enrollmentNumber')) {
          return { message: 'A student profile with this enrollment number already exists.', statusCode: 409 };
        }
        if (target.includes('name')) {
          return { message: 'An institution or company with this name is already registered.', statusCode: 409 };
        }
        if (target.includes('code')) {
          return { message: 'An institution with this code is already registered.', statusCode: 409 };
        }
        return { message: 'A record with these unique details already exists.', statusCode: 409 };
      }
      case 'P2025':
        return { message: 'The requested record could not be found.', statusCode: 404 };
      case 'P2003':
        return { message: 'Associated record not found or invalid reference.', statusCode: 400 };
      case 'P2021':
      case 'P1001':
      case 'P1002':
      case 'P1008':
        return { message: 'Database service is initializing. Please try again in a moment.', statusCode: 503 };
      default:
        return { message: fallbackMessage, statusCode: 500 };
    }
  }

  // If error has a clean string message without database/stack trace dumps
  if (
    error.message &&
    typeof error.message === 'string' &&
    !error.message.includes('Invalid `prisma.') &&
    !error.message.includes('PrismaClient') &&
    !error.message.includes('driverAdapterError') &&
    !error.message.includes('TableDoesNotExist') &&
    !error.message.includes('SELECT') &&
    !error.message.includes('INSERT') &&
    !error.message.includes('at ')
  ) {
    return { message: error.message, statusCode: error.statusCode || 400 };
  }

  return { message: fallbackMessage, statusCode: 500 };
}

/**
 * High-level API error handler for Next.js route handlers
 */
export function handleApiError(
  error: any,
  fallbackMessage: string = 'An error occurred while processing your request.',
  logPrefix: string = '[API_ERROR]'
) {
  if (error instanceof ZodError) {
    return handleValidationError(error);
  }

  console.error(logPrefix, error);
  const { message, statusCode } = sanitizeDatabaseErrorMessage(error, fallbackMessage);
  return errorResponse(message, statusCode);
}

