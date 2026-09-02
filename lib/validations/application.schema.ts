import { z } from 'zod';
import { ApplicationStatus } from '@/src/generated/prisma';

export const applyJobSchema = z.object({
  jobId: z.string().min(1, 'Job ID is required'),
  resumeId: z.string().optional(),
  resumeUrl: z.string().url('Please provide a valid resume URL').optional().or(z.literal('')),
});

export const updateApplicationStatusSchema = z.object({
  status: z.nativeEnum(ApplicationStatus),
  notes: z.string().optional(),
  
  // Specific fields when issuing an OFFER
  salaryPackage: z.string().trim().optional(),
  designation: z.string().trim().optional(),
  location: z.string().trim().optional(),
  joiningDate: z.string().trim().optional(),
  offerLetterUrl: z.string().url('Please provide a valid offer letter URL').optional().or(z.literal('')),
});

export const bulkUpdateApplicationStatusSchema = z.object({
  applicationIds: z.array(z.string().min(1)).min(1, 'Please select at least one application'),
  status: z.nativeEnum(ApplicationStatus),
  notes: z.string().trim().optional(),
});

export const studentOfferDecisionSchema = z.object({
  decision: z.enum(['ACCEPTED', 'DECLINED'], {
    errorMap: () => ({ message: 'Decision must be either ACCEPTED or DECLINED' }),
  }),
  notes: z.string().trim().optional(),
});

export const applicationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.nativeEnum(ApplicationStatus).optional(),
});

export const createOfferSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  designation: z.string().trim().optional(),
  salaryPackage: z.string().trim().optional(),
  location: z.string().trim().optional(),
  joiningDate: z.string().trim().optional().nullable(),
  letterUrl: z.string().url('Please provide a valid offer letter URL').optional().nullable().or(z.literal('')),
  notes: z.string().trim().optional().nullable(),
  expiresAt: z.string().trim().optional().nullable(),
});

export type ApplyJobInput = z.infer<typeof applyJobSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
export type CreateOfferInput = z.infer<typeof createOfferSchema>;
export type StudentOfferDecisionInput = z.infer<typeof studentOfferDecisionSchema>;
export type ApplicationQueryInput = z.infer<typeof applicationQuerySchema>;
