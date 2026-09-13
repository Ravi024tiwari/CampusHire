import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import type { StudentDashboardData } from '@/store/useStudentDashboardStore';

// ==========================================
// 1. Query Keys Factory for Cache Precision
// ==========================================
export const studentKeys = {
  all: ['student'] as const,
  dashboard: () => [...studentKeys.all, 'dashboard'] as const,
  jobs: (filters?: Record<string, any>) => [...studentKeys.all, 'jobs', filters ?? {}] as const,
  jobDetails: (jobId: string) => [...studentKeys.all, 'job', jobId] as const,
  applications: (filters?: Record<string, any>) => [...studentKeys.all, 'applications', filters ?? {}] as const,
  offers: () => [...studentKeys.all, 'offers'] as const,
  profile: () => [...studentKeys.all, 'profile'] as const,
  resumes: () => [...studentKeys.all, 'resumes'] as const,
};

// ==========================================
// 2. Student Dashboard Query Hook (0ms Cache)
// ==========================================
export function useStudentDashboardQuery() {
  return useQuery({
    queryKey: studentKeys.dashboard(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<StudentDashboardData>>('/api/student/dashboard');
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch student telemetry');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes fresh cache
  });
}

// ==========================================
// 3. Student Jobs Browse Query Hook
// ==========================================
export function useStudentJobsQuery(params?: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  mode?: string;
  category?: string;
  skills?: string;
  location?: string;
  sortBy?: string;
  minPackage?: number;
}) {
  return useQuery({
    queryKey: studentKeys.jobs(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.search) searchParams.set('search', params.search);
      if (params?.type && params.type !== 'ALL') searchParams.set('type', params.type);
      if (params?.mode && params.mode !== 'ALL') searchParams.set('mode', params.mode);
      if (params?.category && params.category !== 'ALL') searchParams.set('category', params.category);
      if (params?.skills) searchParams.set('skills', params.skills);
      if (params?.location && params.location !== 'ALL') searchParams.set('location', params.location);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.minPackage) searchParams.set('minPackage', params.minPackage.toString());

      const qs = searchParams.toString();
      const url = `/api/student/jobs${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<any>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch job opportunities');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 3.5 Student Job Detail Query Hook
// ==========================================
export function useStudentJobDetailsQuery(jobId: string) {
  return useQuery({
    queryKey: studentKeys.jobDetails(jobId),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>(`/api/student/jobs/${jobId}`);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch job details');
      }
      return response.data.data;
    },
    enabled: Boolean(jobId),
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 4. Student Applications Query Hook
// ==========================================
export function useStudentApplicationsQuery(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  jobType?: string;
  location?: string;
  sortBy?: string;
}) {
  return useQuery({
    queryKey: studentKeys.applications(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.jobType && params.jobType !== 'ALL') searchParams.set('jobType', params.jobType);
      if (params?.location && params.location !== 'ALL') searchParams.set('location', params.location);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);

      const qs = searchParams.toString();
      const url = `/api/student/applications${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<any>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch student applications');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 5. Student Offers Query Hook
// ==========================================
export function useStudentOffersQuery() {
  return useQuery({
    queryKey: studentKeys.offers(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>('/api/student/offers');
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch placement offers');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 6. Student Profile & Resumes Query Hooks
// ==========================================
export function useStudentProfileQuery() {
  return useQuery({
    queryKey: studentKeys.profile(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>('/api/student/profile');
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch profile details');
      }
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useStudentResumesQuery() {
  return useQuery({
    queryKey: studentKeys.resumes(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>('/api/student/resumes');
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch student resumes');
      }
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==========================================
// 7. Synchronized Cache-Invalidating Mutations
// ==========================================
export function useApplyJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { jobId: string; resumeId?: string; resumeUrl?: string }) => {
      const response = await apiClient.post<ApiResponse<any>>('/api/student/jobs', payload);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to submit application');
      }
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate applications, dashboard telemetry, and jobs lists immediately
      queryClient.invalidateQueries({ queryKey: studentKeys.applications() });
      queryClient.invalidateQueries({ queryKey: studentKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: studentKeys.all });
    },
  });
}

export function useWithdrawApplicationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationId: string) => {
      const response = await apiClient.delete<ApiResponse<any>>(`/api/student/applications?id=${applicationId}`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to withdraw application');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.applications() });
      queryClient.invalidateQueries({ queryKey: studentKeys.dashboard() });
    },
  });
}

export function useRespondOfferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { offerId: string; status: 'ACCEPTED' | 'DECLINED' }) => {
      const response = await apiClient.patch<ApiResponse<any>>('/api/student/offers', payload);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update offer response');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.offers() });
      queryClient.invalidateQueries({ queryKey: studentKeys.dashboard() });
    },
  });
}
