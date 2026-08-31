import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, handleValidationError } from '@/lib/api-response';

const createCollegeSchema = z.object({
  name: z.string().trim().min(3, 'College name must be at least 3 characters'),
  code: z.string().trim().min(2, 'College code must be at least 2 characters').toUpperCase().optional(),
  domain: z.string().trim().toLowerCase().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim();
    const city = searchParams.get('city')?.trim();
    const state = searchParams.get('state')?.trim();
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }

    const skip = (page - 1) * limit;

    const [total, colleges] = await Promise.all([
      prisma.college.count({ where }),
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          code: true,
          domain: true,
          city: true,
          state: true,
          logoUrl: true,
          _count: {
            select: {
              students: true,
              jobs: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    return successResponse({
      colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    }, 'Colleges fetched successfully');
  } catch (error: any) {
    console.error('[GET_COLLEGES_ERROR]', error);
    return errorResponse(error.message || 'Failed to fetch colleges', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = createCollegeSchema.parse(body);

    const existingCollege = await prisma.college.findFirst({
      where: {
        OR: [
          { name: { equals: parsedData.name, mode: 'insensitive' as const } },
          ...(parsedData.code ? [{ code: { equals: parsedData.code } }] : []),
        ],
      },
    });

    if (existingCollege) {
      return errorResponse('A college with this name or code already exists', 409);
    }

    const college = await prisma.college.create({
      data: {
        name: parsedData.name,
        code: parsedData.code || null,
        domain: parsedData.domain || null,
        city: parsedData.city || null,
        state: parsedData.state || null,
        logoUrl: parsedData.logoUrl || null,
      },
    });

    return successResponse(college, 'College registered successfully', 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }

    console.error('[CREATE_COLLEGE_ERROR]', error);
    return errorResponse(error.message || 'Failed to register college', 500);
  }
}
