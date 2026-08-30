import { z } from 'zod';
import { JobType, JobStatus } from '@/src/generated/prisma';

export const createJobSchema = z.object({
  title: z.string().trim().min(3, 'Job title must be at least 3 characters'),
  description: z.string().trim().min(20, 'Job description must be at least 20 characters'),
  type: z.nativeEnum(JobType).default(JobType.FULL_TIME),
  location: z.string().trim().min(2, 'Location is required (e.g. Remote, Bangalore)'),
  salaryPackage: z.string().trim().min(2, 'Salary package or stipend is required (e.g. 14 LPA)'),
  
  // Eligibility criteria
  minCgpa: z.coerce.number().min(0.0).max(10.0).default(0.0),
  allowedBranches: z.array(z.string()).default([]),
  eligibleBatches: z.array(z.coerce.number()).default([]),
  deadline: z.string().datetime('Please provide a valid ISO deadline timestamp').or(z.coerce.date()),
});

export const updateJobSchema = createJobSchema.partial().extend({
  status: z.nativeEnum(JobStatus).optional(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
