import { z } from 'zod';
import { ApplicationStatus } from '@/src/generated/prisma';

export const applyJobSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  resumeUrl: z.string().url('Please provide a valid resume URL').optional().or(z.literal('')),
});

export const updateApplicationStatusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus),
  notes: z.string().optional(),
});

export const applicationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.nativeEnum(ApplicationStatus).optional(),
});

export type ApplyJobInput = z.infer<typeof applyJobSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
export type ApplicationQueryInput = z.infer<typeof applicationQuerySchema>;
