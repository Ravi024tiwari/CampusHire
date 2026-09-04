import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse, handleApiError, handleValidationError } from '@/lib/api-response';

const createCompanySchema = z.object({
  name: z.string().trim().min(2, 'Company name must be at least 2 characters'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  images: z.array(z.string().url()).optional().default([]),
  industry: z.string().trim().min(2, 'Industry is required').optional().or(z.literal('')),
  location: z.string().trim().optional().or(z.literal('')),
  description: z.string().trim().optional().or(z.literal('')),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim();
    const industry = searchParams.get('industry')?.trim();
    const location = searchParams.get('location')?.trim();
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (industry) {
      where.industry = { contains: industry, mode: 'insensitive' };
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    const isVerifiedParam = searchParams.get('isVerified');
    if (isVerifiedParam === 'true') {
      where.isVerified = true;
    } else if (isVerifiedParam === 'false') {
      where.isVerified = false;
    }

    const skip = (page - 1) * limit;

    const [total, companies] = await Promise.all([
      prisma.company.count({ where }),
      prisma.company.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          website: true,
          logoUrl: true,
          industry: true,
          location: true,
          description: true,
          isVerified: true,
          _count: {
            select: {
              recruiters: true,
              jobs: true,
              offers: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),
    ]);

    return successResponse(
      {
        companies,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit) || 1,
          hasMore: page * limit < total,
        },
      },
      'Companies fetched successfully'
    );
  } catch (error: any) {
    if (error.code === 'P2021' || error.message?.includes('does not exist')) {
      return successResponse(
        {
          companies: [],
          pagination: {
            page: 1,
            limit: 50,
            total: 0,
            totalPages: 0,
            hasMore: false,
          },
        },
        'No companies found'
      );
    }
    return handleApiError(error, 'Failed to fetch companies', '[GET_COMPANIES_ERROR]');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = createCompanySchema.parse(body);

    const existingCompany = await prisma.company.findFirst({
      where: {
        name: { equals: parsedData.name.trim(), mode: 'insensitive' },
      },
    });

    if (existingCompany) {
      return errorResponse('A company with this name is already registered on CampusHire', 409);
    }

    const company = await prisma.company.create({
      data: {
        name: parsedData.name.trim(),
        website: parsedData.website || null,
        logoUrl: parsedData.logoUrl || null,
        images: parsedData.images || [],
        industry: parsedData.industry || null,
        location: parsedData.location || null,
        description: parsedData.description || null,
        isVerified: false, // Pending Super Admin verification
      },
    });

    return successResponse(
      company,
      'Company profile registered successfully and submitted for Super Admin verification',
      201
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return handleValidationError(error);
    }
    return handleApiError(error, 'Failed to register company', '[CREATE_COMPANY_ERROR]');
  }
}
