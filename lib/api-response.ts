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
