import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import type { 
  AdminDashboardData,
  AdminCollegeRosterItem,
  AdminCollegeKpis,
  AdminCollegeInsights,
  AdminCollegeRecentActivityItem,
  AdminCollegeFilterOptions,
  AdminStudentItem,
  AdminStudentKpis,
  AdminStudentPagination,
  AdminStudentFilterOptions,
} from '@/store/useAdminStore';
import type { 
  AdminRecruiterItem, 
  CompanyOption, 
  RecruiterMeta, 
  RecruiterStats 
} from '@/app/admin/recruiters/_types/recruiter.types';

// ==========================================
// 1. Admin Query Keys Factory
// ==========================================
export const adminKeys = {
  all: ['admin'] as const,
  dashboard: (timeframe?: string) => [...adminKeys.all, 'dashboard', timeframe ?? '30d'] as const,
  colleges: (filters?: Record<string, any>) => [...adminKeys.all, 'colleges', filters ?? {}] as const,
  collegeDetails: (id: string) => [...adminKeys.all, 'college', id] as const,
  recruiters: (filters?: Record<string, any>) => [...adminKeys.all, 'recruiters', filters ?? {}] as const,
  recruiterDetails: (id: string) => [...adminKeys.all, 'recruiter', id] as const,
  students: (filters?: Record<string, any>) => [...adminKeys.all, 'students', filters ?? {}] as const,
  studentDetails: (id: string) => [...adminKeys.all, 'student', id] as const,
  tpos: (filters?: Record<string, any>) => [...adminKeys.all, 'tpos', filters ?? {}] as const,
  jobs: (filters?: Record<string, any>) => [...adminKeys.all, 'jobs', filters ?? {}] as const,
  jobDetails: (id: string) => [...adminKeys.all, 'job', id] as const,
  companies: (filters?: Record<string, any>) => [...adminKeys.all, 'companies', filters ?? {}] as const,
  verificationQueue: () => [...adminKeys.all, 'verificationQueue'] as const,
  analytics: (timeframe?: string) => [...adminKeys.all, 'analytics', timeframe ?? '30d'] as const,
  stats: () => [...adminKeys.all, 'stats'] as const,
  audit: (filters?: Record<string, any>) => [...adminKeys.all, 'audit', filters ?? {}] as const,
};

// ==========================================
// 2. Admin Dashboard Query Hook
// ==========================================
export function useAdminDashboardQuery(timeframe: string = '30d') {
  return useQuery({
    queryKey: adminKeys.dashboard(timeframe),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<AdminDashboardData>>(`/api/admin/dashboard?timeframe=${timeframe}`);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch admin telemetry');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes fresh cache
  });
}

// ==========================================
// 3. Admin Colleges Query Hook
// ==========================================
export interface AdminCollegesResponseData {
  colleges: AdminCollegeRosterItem[];
  kpis: AdminCollegeKpis;
  insights: AdminCollegeInsights;
  recentActivity: AdminCollegeRecentActivityItem[];
  filterOptions: AdminCollegeFilterOptions;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function useAdminCollegesQuery(params?: {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
  state?: string;
  city?: string;
  location?: string;
  type?: string;
  domain?: string;
  status?: string;
  code?: string;
  isVerified?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: adminKeys.colleges(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.search) searchParams.set('search', params.search);
      if (params?.name) searchParams.set('name', params.name);
      if (params?.state && params.state !== 'ALL') searchParams.set('state', params.state);
      if (params?.city && params.city !== 'ALL') searchParams.set('city', params.city);
      if (params?.location && params.location !== 'ALL') searchParams.set('location', params.location);
      if (params?.type && params.type !== 'ALL') searchParams.set('type', params.type);
      if (params?.domain) searchParams.set('domain', params.domain);
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.code) searchParams.set('code', params.code);
      if (params?.isVerified) searchParams.set('isVerified', params.isVerified);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

      const qs = searchParams.toString();
      const url = `/api/admin/colleges${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<AdminCollegesResponseData>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch colleges roster');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 4. Admin Recruiters Query Hook
// ==========================================
export interface AdminRecruitersResponseData {
  recruiters: AdminRecruiterItem[];
  meta: RecruiterMeta;
  stats: RecruiterStats;
  companies: CompanyOption[];
}

export function useAdminRecruitersQuery(params?: {
  page?: number;
  limit?: number;
  search?: string;
  companyId?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: adminKeys.recruiters(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.search) searchParams.set('search', params.search);
      if (params?.companyId && params.companyId !== 'ALL') searchParams.set('companyId', params.companyId);
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

      const qs = searchParams.toString();
      const url = `/api/admin/recruiters${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<AdminRecruitersResponseData>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch recruiters roster');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 5. Admin Students Query Hook
// ==========================================
export interface AdminStudentsResponseData {
  students: AdminStudentItem[];
  kpis: AdminStudentKpis;
  pagination: AdminStudentPagination;
  filterOptions: AdminStudentFilterOptions;
}

export function useAdminStudentsQuery(params?: {
  page?: number;
  limit?: number;
  search?: string;
  collegeId?: string;
  branch?: string;
  batchYear?: string;
  jobRole?: string;
  status?: string;
  placementStatus?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: adminKeys.students(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.search) searchParams.set('search', params.search);
      if (params?.collegeId && params.collegeId !== 'ALL') searchParams.set('collegeId', params.collegeId);
      if (params?.branch && params.branch !== 'ALL') searchParams.set('branch', params.branch);
      if (params?.batchYear && params.batchYear !== 'ALL') searchParams.set('batchYear', params.batchYear);
      if (params?.jobRole && params.jobRole !== 'ALL') searchParams.set('jobRole', params.jobRole);
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.placementStatus && params.placementStatus !== 'ALL') searchParams.set('placementStatus', params.placementStatus);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

      const qs = searchParams.toString();
      const url = `/api/admin/students${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<AdminStudentsResponseData>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch student registry');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 6. Admin Jobs Query Hook
// ==========================================
export function useAdminJobsQuery(params?: {
  page?: number;
  limit?: number;
  search?: string;
  companyName?: string;
  companyId?: string;
  collegeId?: string;
  jobRole?: string;
  type?: string;
  location?: string;
  experienceLevel?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: adminKeys.jobs(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.search) searchParams.set('search', params.search);
      if (params?.companyName) searchParams.set('companyName', params.companyName);
      if (params?.companyId && params.companyId !== 'ALL') searchParams.set('companyId', params.companyId);
      if (params?.collegeId && params.collegeId !== 'ALL') searchParams.set('collegeId', params.collegeId);
      if (params?.jobRole && params.jobRole !== 'ALL') searchParams.set('jobRole', params.jobRole);
      if (params?.type && params.type !== 'ALL') searchParams.set('type', params.type);
      if (params?.location && params.location !== 'ALL') searchParams.set('location', params.location);
      if (params?.experienceLevel && params.experienceLevel !== 'ALL') searchParams.set('experienceLevel', params.experienceLevel);
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

      const qs = searchParams.toString();
      const url = `/api/admin/jobs${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<any>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch jobs data');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 7. Mutations & Surgical Invalidation Hooks
// ==========================================

/**
 * Accredit / Verify a College Institution
 */
export function useVerifyCollegeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ collegeId, isVerified = true }: { collegeId: string; isVerified?: boolean }) => {
      const response = await apiClient.patch<ApiResponse<any>>(`/api/admin/colleges/${collegeId}/verify`, {
        isVerified,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Verification update failed');
      }
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate both colleges roster and admin dashboard KPIs/queues
      queryClient.invalidateQueries({ queryKey: adminKeys.colleges() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: adminKeys.verificationQueue() });
    },
  });
}

/**
 * Verify Corporate Partner / Company
 */
export function useVerifyCompanyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ companyId, isVerified = true }: { companyId: string; isVerified?: boolean }) => {
      const response = await apiClient.patch<ApiResponse<any>>(`/api/admin/companies/${companyId}/verify`, {
        isVerified,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Company verification failed');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: adminKeys.companies() });
      queryClient.invalidateQueries({ queryKey: adminKeys.recruiters() });
    },
  });
}

/**
 * Toggle / Update Recruiter User Active Status
 */
export function useUpdateRecruiterStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ recruiterId, isActive }: { recruiterId: string; isActive: boolean }) => {
      const response = await apiClient.patch<ApiResponse<any>>(`/api/admin/recruiters/${recruiterId}/status`, {
        isActive,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update recruiter status');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.recruiters() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

/**
 * Toggle / Update Student Account Status
 */
export function useUpdateStudentStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ studentId, isActive }: { studentId: string; isActive: boolean }) => {
      const response = await apiClient.patch<ApiResponse<any>>(`/api/admin/students/${studentId}/status`, {
        isActive,
      });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update student status');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.students() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

/**
 * Delete / Archive Platform Job
 */
export function useAdminDeleteJobMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jobId: string) => {
      const response = await apiClient.delete<ApiResponse<any>>(`/api/admin/jobs/${jobId}`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete job posting');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.jobs() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}

/**
 * Add / Provision New College
 */
export function useAdminCreateCollegeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      code: string;
      domain?: string;
      type?: string;
      city?: string;
      state?: string;
      location?: string;
      contactEmail?: string;
      contactPhone?: string;
      logoUrl?: string;
    }) => {
      const response = await apiClient.post<ApiResponse<any>>('/api/admin/colleges', payload);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to provision college');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.colleges() });
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
}
