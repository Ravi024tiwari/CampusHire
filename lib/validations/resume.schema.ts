import { z } from 'zod';

export const createResumeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Resume title must be at least 2 characters')
    .max(100, 'Resume title cannot exceed 100 characters'),
  fileUrl: z.string().url('A valid file URL is required'),
  publicId: z.string().optional().nullable(),
  fileType: z.string().default('pdf'),
  fileSize: z.number().int().positive().optional().nullable(),
  isDefault: z.boolean().default(false),
});

export const updateResumeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Resume title must be at least 2 characters')
    .max(100, 'Resume title cannot exceed 100 characters')
    .optional(),
  isDefault: z.boolean().optional(),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>;
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>;
