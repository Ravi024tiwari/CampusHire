import { z } from 'zod';
import { Role } from '@/src/generated/prisma';
import { normalizeBranchCode } from '@/lib/constants/branches';

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const studentRegisterSchema = z.object({
  role: z.literal(Role.STUDENT),
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid student email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  
  collegeId: z.string().min(1, 'College selection is required'),
  enrollmentNumber: z.string().trim().min(3, 'Enrollment number is required'),
  branch: z
    .string()
    .trim()
    .min(1, 'Academic branch selection is required')
    .transform((val) => normalizeBranchCode(val)),
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
  companyName: z.string().trim().min(2, 'Company name is required'),
  email: z.string().trim().email('Please enter a valid company work email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  industry: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
});


export const companyRegisterSchema = z.object({
  name: z.string().trim().min(2, 'Company name is required'),
  website: z.string().url('Please enter a valid company website URL').optional().or(z.literal('')),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  industry: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
});


export const tpoRegisterSchema = z.object({
  role: z.literal(Role.TPO_ADMIN),
  name: z.string().trim().min(2, 'TPO Officer name is required'),
  email: z.string().trim().email('Please enter a valid institutional email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  designation: z.string().trim().min(2, 'Designation is required (e.g. Head, T&P Cell)').default('Head, Training & Placement Cell'),
  department: z.string().trim().optional(),
  
  // College Institution Data
  collegeName: z.string().trim().min(3, 'College/University name must be at least 3 characters'),
  collegeCode: z.string().trim().toUpperCase().min(2, 'College code must be at least 2 characters').optional().or(z.literal('')),
  collegeDomain: z.string().trim().toLowerCase().optional().or(z.literal('')),
  collegeCity: z.string().trim().optional().or(z.literal('')),
  collegeState: z.string().trim().optional().or(z.literal('')),
  collegeContactEmail: z.string().email('Invalid college contact email').optional().or(z.literal('')),
  collegeContactPhone: z.string().trim().optional().or(z.literal('')),
  collegeLogoUrl: z.string().url('Invalid campus image URL').optional().or(z.literal('')),
});

export const registerSchema = z.discriminatedUnion('role', [
  studentRegisterSchema,
  recruiterRegisterSchema,
  tpoRegisterSchema,
]);

export type LoginInput = z.infer<typeof loginSchema>;
export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
export type RecruiterRegisterInput = z.infer<typeof recruiterRegisterSchema>;
export type CompanyRegisterInput = z.infer<typeof companyRegisterSchema>;
export type TpoRegisterInput = z.infer<typeof tpoRegisterSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

