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

export type ApplyJobInput = z.infer<typeof applyJobSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
