import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import type { RecruiterDashboardData } from '@/app/recruiter/dashboard/_types/recruiter-dashboard.types';

// ==========================================
// 1. Recruiter Query Key Factory
// ==========================================
export const recruiterKeys = {
  all: ['recruiter'] as const,
  dashboard: () => [...recruiterKeys.all, 'dashboard'] as const,
  jobs: (filters?: Record<string, any>) => [...recruiterKeys.all, 'jobs', filters ?? {}] as const,
  jobDetails: (jobId: string) => [...recruiterKeys.all, 'job', jobId] as const,
  applications: (filters?: Record<string, any>) => [...recruiterKeys.all, 'applications', filters ?? {}] as const,
  applicationDetails: (appId: string) => [...recruiterKeys.all, 'application', appId] as const,
  offers: (filters?: Record<string, any>) => [...recruiterKeys.all, 'offers', filters ?? {}] as const,
  analytics: () => [...recruiterKeys.all, 'analytics'] as const,
  company: () => [...recruiterKeys.all, 'company'] as const,
  colleges: () => [...recruiterKeys.all, 'colleges'] as const,
};

// ==========================================
// 2. Recruiter Dashboard Query Hook (0ms Cache)
// ==========================================
export function useRecruiterDashboardQuery() {
  return useQuery({
    queryKey: recruiterKeys.dashboard(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<RecruiterDashboardData>>('/api/recruiter/dashboard');
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch recruiter telemetry');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes fresh cache
  });
}

// ==========================================
// 3. Recruiter Jobs Browse Query Hook
// ==========================================
export function useRecruiterJobsQuery(params?: {
  collegeId?: string;
  type?: string;
  status?: string;
  location?: string;
  timeline?: string;
  skills?: string;
  search?: string;
  sortBy?: string;
}) {
  return useQuery({
    queryKey: recruiterKeys.jobs(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.collegeId && params.collegeId !== 'ALL') searchParams.set('collegeId', params.collegeId);
      if (params?.type && params.type !== 'ALL') searchParams.set('type', params.type);
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.location && params.location !== 'ALL') searchParams.set('location', params.location);
      if (params?.timeline && params.timeline !== 'ALL') searchParams.set('timeline', params.timeline);
      if (params?.skills) searchParams.set('skills', params.skills);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);

      const qs = searchParams.toString();
      const url = `/api/recruiter/jobs${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<any>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch recruiter job postings');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 4. Recruiter Job Details Hook
// ==========================================
export function useRecruiterJobDetailsQuery(jobId: string) {
  return useQuery({
    queryKey: recruiterKeys.jobDetails(jobId),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>(`/api/recruiter/jobs/${jobId}`);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch job details');
      }
      return response.data.data;
    },
    enabled: !!jobId,
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 5. Recruiter Applications Query Hook
// ==========================================
export function useRecruiterApplicationsQuery(params?: {
  jobId?: string;
  status?: string;
  collegeId?: string;
  branch?: string;
  minCgpa?: number | string;
  search?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: recruiterKeys.applications(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.jobId && params.jobId !== 'ALL') searchParams.set('jobId', params.jobId);
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.collegeId && params.collegeId !== 'ALL') searchParams.set('collegeId', params.collegeId);
      if (params?.branch && params.branch !== 'ALL') searchParams.set('branch', params.branch);
      if (params?.minCgpa) searchParams.set('minCgpa', params.minCgpa.toString());
      if (params?.search) searchParams.set('search', params.search);
      if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
      if (params?.page) searchParams.set('page', params.page.toString());
      if (params?.limit) searchParams.set('limit', params.limit.toString());

      const qs = searchParams.toString();
      const url = `/api/recruiter/applications${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<any>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch applicant pipeline');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 6. Recruiter Offers Query Hook
// ==========================================
export function useRecruiterOffersQuery(params?: {
  status?: string;
  collegeId?: string;
  jobId?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: recruiterKeys.offers(params),
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
      if (params?.collegeId && params.collegeId !== 'ALL') searchParams.set('collegeId', params.collegeId);
      if (params?.jobId && params.jobId !== 'ALL') searchParams.set('jobId', params.jobId);
      if (params?.search) searchParams.set('search', params.search);

      const qs = searchParams.toString();
      const url = `/api/recruiter/offers${qs ? `?${qs}` : ''}`;
      const response = await apiClient.get<ApiResponse<any>>(url);
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch recruiter offers');
      }
      return response.data.data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// ==========================================
// 7. Recruiter Analytics Query Hook
// ==========================================
export function useRecruiterAnalyticsQuery() {
  return useQuery({
    queryKey: recruiterKeys.analytics(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>('/api/recruiter/analytics');
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch recruitment analytics');
      }
      return response.data.data;
    },
    staleTime: 3 * 60 * 1000, // 3 minutes cache for analytics
  });
}

// ==========================================
// 8. Recruiter Company Query Hook
// ==========================================
export function useRecruiterCompanyQuery() {
  return useQuery({
    queryKey: recruiterKeys.company(),
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>('/api/recruiter/company');
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || 'Failed to fetch company profile');
      }
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ==========================================
// 9. Synchronized Mutation Hooks (Auto-Invalidation)
// ==========================================
export function useCreateJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiClient.post<ApiResponse<any>>('/api/recruiter/jobs', payload);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create job posting');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruiterKeys.jobs() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.analytics() });
    },
  });
}

export function useUpdateJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put<ApiResponse<any>>(`/api/recruiter/jobs/${id}`, data);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update job posting');
      }
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: recruiterKeys.jobs() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.jobDetails(variables.id) });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.dashboard() });
    },
  });
}

export function useDeleteJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<ApiResponse<any>>(`/api/recruiter/jobs/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete job posting');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruiterKeys.jobs() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.analytics() });
    },
  });
}

export function useUpdateApplicationStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, remarks }: { id: string; status: string; remarks?: string }) => {
      const response = await apiClient.patch<ApiResponse<any>>(`/api/recruiter/applications/${id}`, { status, remarks });
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to update candidate status');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruiterKeys.applications() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.analytics() });
    },
  });
}

export function useReleaseOfferMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiClient.post<ApiResponse<any>>('/api/recruiter/offers', payload);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to issue offer letter');
      }
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruiterKeys.offers() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.applications() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.dashboard() });
      queryClient.invalidateQueries({ queryKey: recruiterKeys.analytics() });
    },
  });
}
