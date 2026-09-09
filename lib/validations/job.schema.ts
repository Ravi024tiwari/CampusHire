import { z } from 'zod';
import { JobType, JobStatus } from '@/src/generated/prisma';

export const createJobSchema = z.object({
  collegeId: z.string().min(1, 'Target college ID is required'),
  title: z.string().trim().min(3, 'Job title must be at least 3 characters'),
  description: z.string().trim().min(20, 'Job description must be at least 20 characters'),
  type: z.nativeEnum(JobType).default(JobType.FULL_TIME),
  status: z.nativeEnum(JobStatus).default(JobStatus.ACTIVE),
  location: z.string().trim().min(2, 'Location is required (e.g. Remote, Bangalore)'),
  salaryPackage: z.string().trim().min(2, 'Salary package or stipend is required (e.g. 14 LPA)'),
  skills: z.array(z.string().trim().min(1)).default([]),
  
  // Eligibility criteria
  minCgpa: z.coerce.number().min(0.0, 'CGPA cannot be negative').max(10.0, 'CGPA cannot exceed 10.0').default(0.0),
  allowedBranches: z.array(z.string().trim()).default([]),
  eligibleBatches: z.array(z.coerce.number().int()).default([]),
  deadline: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Application deadline must be a future date and time',
  }),
});

export const updateJobSchema = createJobSchema.partial().extend({
  status: z.nativeEnum(JobStatus).optional(),
});

export const updateJobStatusSchema = z.object({
  status: z.nativeEnum(JobStatus, {
    errorMap: () => ({ message: 'Please provide a valid job status (DRAFT, PENDING_APPROVAL, ACTIVE, CLOSED)' }),
  }),
});

export const jobQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.string().trim().optional(),
  type: z.string().trim().optional(),
  collegeId: z.string().optional(),
  companyId: z.string().optional(),
  role: z.string().trim().optional(),
  location: z.string().trim().optional(),
  branch: z.string().trim().optional(),
  batchYear: z.coerce.number().int().optional(),
  academicYear: z.string().trim().optional(),
  tab: z.enum(['all', 'open', 'closing_soon', 'internships', 'full_time']).default('all').optional(),
  timeline: z.enum(['ALL', 'UPCOMING', 'TODAY', 'PAST']).default('ALL').optional(),
  skill: z.string().trim().optional(),
  skills: z.string().trim().optional(), // comma-separated skills list e.g. "React,Node.js"
  skillMatchMode: z.enum(['all', 'any']).default('any'),
  sortBy: z.enum(['newest', 'oldest', 'deadline_asc', 'salary_desc']).default('newest').optional(),
  search: z.string().trim().optional(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobQueryInput = z.infer<typeof jobQuerySchema>;
