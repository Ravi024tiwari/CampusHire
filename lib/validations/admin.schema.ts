import { z } from 'zod';
import { JobStatus } from '@/src/generated/prisma';

export const adminCollegeQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  name: z.string().trim().optional(),
  state: z.string().trim().optional(),
  city: z.string().trim().optional(),
  location: z.string().trim().optional(),
  type: z.string().trim().optional(),
  domain: z.string().trim().optional(),
  status: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? val.toUpperCase() : 'ALL'))
    .pipe(z.enum(['ALL', 'VERIFIED', 'PENDING', 'REJECTED']))
    .default('ALL'),
  code: z.string().trim().toUpperCase().optional(),
  isVerified: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? val.toLowerCase() : 'all'))
    .pipe(z.enum(['true', 'false', 'all']))
    .default('all'),
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
  collegeId: z.string().trim().optional(),
  branch: z.string().trim().optional(),
  batchYear: z.coerce.number().int().optional(),
  jobRole: z.string().trim().optional(),
  status: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? val.toUpperCase() : 'ALL'))
    .pipe(z.enum(['ALL', 'ACTIVE', 'INACTIVE']))
    .default('ALL'),
  isVerified: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? val.toLowerCase() : 'all'))
    .pipe(z.enum(['true', 'false', 'all']))
    .default('all'),
  placementStatus: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? val.toUpperCase().replace(/\s+/g, '_') : 'ALL'))
    .pipe(z.enum(['ALL', 'PLACED', 'INTERVIEWING', 'OFFERED', 'NOT_PLACED', 'UNPLACED']))
    .default('ALL'),
  sortBy: z.enum(['createdAt', 'name', 'cgpa', 'batchYear', 'enrollmentNumber']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const adminCompanyQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
  isVerified: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? val.toLowerCase() : 'all'))
    .pipe(z.enum(['true', 'false', 'all']))
    .default('all'),
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
  jobRole: z.string().trim().optional(),
  type: z.string().trim().optional(),
  location: z.string().trim().optional(),
  experienceLevel: z.string().trim().optional(),
  status: z.string().trim().optional().default('ALL'),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  deadline: z.string().trim().optional(),
  sortBy: z.enum(['createdAt', 'deadline', 'title', 'status', 'salaryPackage']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const createAdminJobSchema = z.object({
  title: z.string().min(2, 'Job title is required'),
  companyId: z.string().min(1, 'Company is required'),
  collegeId: z.string().min(1, 'College is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: z.enum(['FULL_TIME', 'INTERNSHIP', 'INTERN_PLUS_FTE']).default('FULL_TIME'),
  status: z.enum(['DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'CLOSED']).default('ACTIVE'),
  location: z.string().min(2, 'Location is required'),
  salaryPackage: z.string().min(2, 'Salary package is required'),
  minCgpa: z.coerce.number().min(0).max(10).default(0),
  allowedBranches: z.array(z.string()).default([]),
  eligibleBatches: z.array(z.coerce.number()).default([]),
  skills: z.array(z.string()).default([]),
  deadline: z.string().min(1, 'Deadline date is required'),
});

export type AdminCollegeQueryInput = z.infer<typeof adminCollegeQuerySchema>;
export type VerifyCollegeInput = z.infer<typeof verifyCollegeSchema>;
export type AdminStudentQueryInput = z.infer<typeof adminStudentQuerySchema>;
export type AdminCompanyQueryInput = z.infer<typeof adminCompanyQuerySchema>;
export type VerifyCompanyInput = z.infer<typeof verifyCompanySchema>;
export type AdminJobQueryInput = z.infer<typeof adminJobQuerySchema>;
export type CreateAdminJobInput = z.infer<typeof createAdminJobSchema>;

