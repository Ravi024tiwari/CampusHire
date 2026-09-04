import { z } from 'zod';
import { JobStatus } from '@/src/generated/prisma';

export const adminCollegeQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  name: z.string().trim().optional(),
  state: z.string().trim().optional(),
  city: z.string().trim().optional(),
  code: z.string().trim().toUpperCase().optional(),
  isVerified: z.enum(['true', 'false', 'all']).default('all'),
  sortBy: z.enum(['name', 'createdAt', 'city', 'state', 'code', 'isVerified']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const verifyCollegeSchema = z.object({
  isVerified: z.boolean().optional(),
});

export const adminStudentQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  collegeId: z.string().optional(),
  branch: z.string().trim().optional(),
  batchYear: z.coerce.number().int().optional(),
  isVerified: z.enum(['true', 'false']).optional(),
  placementStatus: z.enum(['ALL', 'PLACED', 'UNPLACED']).default('ALL'),
  sortBy: z.enum(['createdAt', 'cgpa', 'batchYear', 'enrollmentNumber']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const adminCompanyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  isVerified: z.enum(['true', 'false', 'all']).default('all'),
  industry: z.string().trim().optional(),
  location: z.string().trim().optional(),
  sortBy: z.enum(['name', 'createdAt', 'isVerified']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const verifyCompanySchema = z.object({
  isVerified: z.boolean().optional(),
});

export const adminJobQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  companyName: z.string().trim().optional(),
  companyId: z.string().optional(),
  collegeId: z.string().optional(),
  status: z.nativeEnum(JobStatus).or(z.literal('ALL')).default('ALL'),
  startDate: z.string().trim().optional(), // Filter posted date >= startDate
  endDate: z.string().trim().optional(),   // Filter posted date <= endDate
  sortBy: z.enum(['createdAt', 'deadline', 'title', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type AdminCollegeQueryInput = z.infer<typeof adminCollegeQuerySchema>;
export type VerifyCollegeInput = z.infer<typeof verifyCollegeSchema>;
export type AdminStudentQueryInput = z.infer<typeof adminStudentQuerySchema>;
export type AdminCompanyQueryInput = z.infer<typeof adminCompanyQuerySchema>;
export type VerifyCompanyInput = z.infer<typeof verifyCompanySchema>;
export type AdminJobQueryInput = z.infer<typeof adminJobQuerySchema>;
