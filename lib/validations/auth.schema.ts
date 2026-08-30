import { z } from 'zod';
import { Role } from '@/src/generated/prisma';

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const studentRegisterSchema = z.object({
  role: z.literal(Role.STUDENT),
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid student email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  
  enrollmentNumber: z.string().trim().min(3, 'Enrollment number is required'),
  branch: z.string().trim().min(2, 'Branch is required (e.g. Computer Science)'),
  batchYear: z.coerce.number().int().min(2020).max(2028, 'Please provide a valid batch year'),
  cgpa: z.coerce.number().min(0.0).max(10.0, 'CGPA must be between 0.0 and 10.0'),
  tenthMarks: z.coerce.number().min(0).max(100).optional(),
  twelfthMarks: z.coerce.number().min(0).max(100).optional(),
  skills: z.array(z.string()).default([]),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
});

export const recruiterRegisterSchema = z.object({
  role: z.literal(Role.RECRUITER),
  name: z.string().trim().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid work email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  
  companyName: z.string().trim().min(2, 'Company name is required'),
  companyWebsite: z.string().url('Please enter a valid company website URL').optional().or(z.literal('')),
  companyIndustry: z.string().optional(),
  designation: z.string().trim().min(2, 'Designation is required (e.g. Talent Acquisition Lead)'),
});

export const tpoRegisterSchema = z.object({
  role: z.literal(Role.TPO_ADMIN),
  name: z.string().trim().min(2, 'TPO Officer name is required'),
  email: z.string().trim().email('Please enter a valid institutional email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
export type RecruiterRegisterInput = z.infer<typeof recruiterRegisterSchema>;
export type TpoRegisterInput = z.infer<typeof tpoRegisterSchema>;
