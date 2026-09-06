import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface RecruiterAppStudent {
  id: string;
  enrollmentNumber: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  phone?: string | null;
  bio?: string | null;
  tenthMarks?: number | null;
  twelfthMarks?: number | null;
  skills: string[];
  resumeUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  isVerified: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
  };
  college: {
    id: string;
    name: string;
    city?: string | null;
    logoUrl?: string | null;
  };
}

export interface RecruiterAppJob {
  id: string;
  title: string;
  type: string;
  location: string;
  salaryPackage: string;
  skills: string[];
  minCgpa: number;
  deadline: string;
  college: {
    id: string;
    name: string;
    city?: string | null;
    logoUrl?: string | null;
  };
}

export interface RecruiterAppResume {
  id: string;
  title: string;
  fileUrl: string;
  fileSize?: number | null;
}

export interface RecruiterAppOffer {
  id: string;
  designation: string;
  salaryPackage: string;
  location: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
  joiningDate?: string | null;
  letterUrl?: string | null;
}

export interface RecruiterApplicationItem {
  id: string;
  jobId: string;
  studentId: string;
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'OFFERED' | 'REJECTED' | 'ACCEPTED' | 'DECLINED';
  resumeId?: string | null;
  resumeUrl?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  student: RecruiterAppStudent;
  job: RecruiterAppJob;
  resume?: RecruiterAppResume | null;
  offer?: RecruiterAppOffer | null;
}

export interface RecruiterApplicationsStats {
  total: number;
  applied: number;
  underReview: number;
  shortlisted: number;
  interviewScheduled: number;
  offered: number;
  rejected: number;
  accepted: number;
  declined: number;
}

export interface RecruiterJobOption {
  id: string;
  title: string;
  type: string;
  status: string;
  collegeName: string;
  applicationsCount: number;
}

export interface RecruiterCollegeOption {
  id: string;
  name: string;
}

export interface RecruiterApplicationsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface RecruiterApplicationsFilters {
  searchQuery: string;
  jobId: string;
  status: string;
  collegeId: string;
  branch: string;
  minCgpa: string;
  sortBy: 'latest' | 'oldest' | 'cgpa_desc' | 'cgpa_asc' | 'name_asc';
  viewMode: 'table' | 'cards';
}

interface RecruiterApplicationsState {
  applications: RecruiterApplicationItem[];
  stats: RecruiterApplicationsStats;
  availableJobs: RecruiterJobOption[];
  availableColleges: RecruiterCollegeOption[];
  pagination: RecruiterApplicationsPagination | null;
  filters: RecruiterApplicationsFilters;
  selectedApplicationIds: string[];
  activeCandidateDetail: RecruiterApplicationItem | null;
  
  isLoading: boolean;
  isActionLoading: boolean;
  error: string | null;

  // Actions
  fetchApplications: (pageOverride?: number) => Promise<void>;
  setFilter: <K extends keyof RecruiterApplicationsFilters>(key: K, value: RecruiterApplicationsFilters[K]) => void;
  resetFilters: () => void;
  toggleSelectApplication: (id: string) => void;
  selectAllApplications: () => void;
  clearSelection: () => void;
  setActiveCandidateDetail: (app: RecruiterApplicationItem | null) => void;
  updateApplicationStatus: (
    applicationId: string, 
    status: string, 
    extra?: { notes?: string; salaryPackage?: string; designation?: string; location?: string; joiningDate?: string; offerLetterUrl?: string }
  ) => Promise<{ success: boolean; message?: string }>;
  bulkUpdateStatus: (
    applicationIds: string[], 
    status: string, 
    notes?: string
  ) => Promise<{ success: boolean; message?: string; count?: number }>;
}

export const initialFilterState: RecruiterApplicationsFilters = {
  searchQuery: '',
  jobId: 'ALL',
  status: 'ALL',
  collegeId: 'ALL',
  branch: 'ALL',
  minCgpa: 'ALL',
  sortBy: 'latest',
  viewMode: 'table',
};

const initialStatsState: RecruiterApplicationsStats = {
  total: 0,
  applied: 0,
  underReview: 0,
  shortlisted: 0,
  interviewScheduled: 0,
  offered: 0,
  rejected: 0,
  accepted: 0,
  declined: 0,
};

export const useRecruiterApplicationsStore = create<RecruiterApplicationsState>((set, get) => ({
  applications: [],
  stats: initialStatsState,
  availableJobs: [],
  availableColleges: [],
  pagination: null,
  filters: initialFilterState,
  selectedApplicationIds: [],
  activeCandidateDetail: null,
  isLoading: false,
  isActionLoading: false,
  error: null,

  fetchApplications: async (pageOverride?: number) => {
    set({ isLoading: true, error: null });
    const { filters, pagination } = get();
    const currentPage = pageOverride !== undefined ? pageOverride : pagination?.page || 1;

    try {
      const params = new URLSearchParams();
      params.set('page', currentPage.toString());
      params.set('limit', '15');

      if (filters.searchQuery) params.set('search', filters.searchQuery);
      if (filters.jobId && filters.jobId !== 'ALL') params.set('jobId', filters.jobId);
      if (filters.status && filters.status !== 'ALL') params.set('status', filters.status);
      if (filters.collegeId && filters.collegeId !== 'ALL') params.set('collegeId', filters.collegeId);
      if (filters.branch && filters.branch !== 'ALL') params.set('branch', filters.branch);
      if (filters.minCgpa && filters.minCgpa !== 'ALL') params.set('minCgpa', filters.minCgpa);
      if (filters.sortBy) params.set('sortBy', filters.sortBy);

      const res = await apiClient.get<ApiResponse<{
        applications: RecruiterApplicationItem[];
        stats: RecruiterApplicationsStats;
        availableJobs: RecruiterJobOption[];
        availableColleges: RecruiterCollegeOption[];
        pagination: RecruiterApplicationsPagination;
      }>>(`/api/recruiter/applications?${params.toString()}`);

      if (res.data?.success && res.data.data) {
        const data = res.data.data;
        const realApps = data.applications || [];
        
        set({
          applications: realApps,
          stats: data.stats || {
            total: realApps.length,
            applied: realApps.filter((a) => a.status === 'APPLIED').length,
            underReview: realApps.filter((a) => a.status === 'UNDER_REVIEW').length,
            shortlisted: realApps.filter((a) => a.status === 'SHORTLISTED').length,
            interviewScheduled: realApps.filter((a) => a.status === 'INTERVIEW_SCHEDULED').length,
            offered: realApps.filter((a) => a.status === 'OFFERED').length,
            rejected: realApps.filter((a) => a.status === 'REJECTED').length,
            accepted: realApps.filter((a) => a.status === 'ACCEPTED').length,
            declined: realApps.filter((a) => a.status === 'DECLINED').length,
          },
          availableJobs: data.availableJobs || [],
          availableColleges: data.availableColleges || [],
          pagination: data.pagination || {
            page: currentPage,
            limit: 15,
            total: realApps.length,
            totalPages: Math.ceil(realApps.length / 15) || 1,
            hasMore: false,
          },
          isLoading: false,
        });
      } else {
        set({
          applications: [],
          stats: initialStatsState,
          availableJobs: [],
          availableColleges: [],
          pagination: null,
          isLoading: false,
        });
      }
    } catch (err: any) {
      console.error('[useRecruiterApplicationsStore] Fetch failed:', err);
      set({
        applications: [],
        stats: initialStatsState,
        pagination: null,
        error: err.response?.data?.message || err.message || 'Failed to fetch candidate applications',
        isLoading: false,
      });
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  resetFilters: () => {
    set({
      filters: initialFilterState,
    });
  },

  toggleSelectApplication: (id) => {
    set((state) => {
      const exists = state.selectedApplicationIds.includes(id);
      return {
        selectedApplicationIds: exists
          ? state.selectedApplicationIds.filter((item) => item !== id)
          : [...state.selectedApplicationIds, id],
      };
    });
  },

  selectAllApplications: () => {
    const { applications } = get();
    set({
      selectedApplicationIds: applications.map((a) => a.id),
    });
  },

  clearSelection: () => {
    set({ selectedApplicationIds: [] });
  },

  setActiveCandidateDetail: (app) => {
    set({ activeCandidateDetail: app });
  },

  updateApplicationStatus: async (applicationId, status, extra) => {
    set({ isActionLoading: true });
    try {
      const res = await apiClient.patch<ApiResponse<{ application: RecruiterApplicationItem }>>(
        `/api/recruiter/applications/${applicationId}/status`,
        {
          status,
          ...extra,
        }
      );

      if (res.data?.success) {
        // Optimistically update local application state
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId
              ? {
                  ...app,
                  status: status as any,
                  notes: extra?.notes !== undefined ? extra.notes : app.notes,
                }
              : app
          ),
          activeCandidateDetail: state.activeCandidateDetail?.id === applicationId
            ? {
                ...state.activeCandidateDetail,
                status: status as any,
                notes: extra?.notes !== undefined ? extra.notes : state.activeCandidateDetail.notes,
              }
            : state.activeCandidateDetail,
          isActionLoading: false,
        }));
        return { success: true, message: res.data.message || 'Status updated successfully' };
      }
      set({ isActionLoading: false });
      return { success: false, message: res.data?.message || 'Failed to update status' };
    } catch (err: any) {
      set({ isActionLoading: false });
      return { 
        success: false, 
        message: err.response?.data?.message || err.message || 'Failed to update status' 
      };
    }
  },

  bulkUpdateStatus: async (applicationIds, status, notes) => {
    if (applicationIds.length === 0) return { success: false, message: 'No applications selected' };

    set({ isActionLoading: true });
    try {
      const res = await apiClient.patch<ApiResponse<{ updatedCount: number }>>(
        '/api/recruiter/applications/bulk-status',
        {
          applicationIds,
          status,
          notes,
        }
      );

      if (res.data?.success) {
        set((state) => ({
          applications: state.applications.map((app) =>
            applicationIds.includes(app.id)
              ? { ...app, status: status as any, notes: notes !== undefined ? notes : app.notes }
              : app
          ),
          selectedApplicationIds: [],
          isActionLoading: false,
        }));
        return {
          success: true,
          count: res.data.data?.updatedCount || applicationIds.length,
          message: res.data.message || `Updated ${applicationIds.length} candidates to ${status}`,
        };
      }
      set({ isActionLoading: false });
      return { success: false, message: res.data?.message || 'Failed to update candidates' };
    } catch (err: any) {
      set({ isActionLoading: false });
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Failed to bulk update status',
      };
    }
  },
}));
