import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface RecruiterJobCollege {
  id: string;
  name: string;
  code: string | null;
  city: string | null;
  state?: string | null;
  logoUrl: string | null;
}

export interface RecruiterJobItem {
  id: string;
  companyId: string;
  collegeId: string;
  title: string;
  description: string;
  type: 'FULL_TIME' | 'INTERNSHIP' | 'INTERN_PLUS_FTE';
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'CLOSED';
  location: string;
  salaryPackage: string;
  skills: string[];
  minCgpa: number;
  allowedBranches: string[];
  eligibleBatches: number[];
  deadline: string;
  createdAt: string;
  updatedAt: string;
  college: RecruiterJobCollege;
  _count?: {
    applications: number;
    offers?: number;
  };
}

export interface RecruiterJobsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface RecruiterJobsFilterState {
  searchQuery: string;
  collegeId: string;
  selectedType: string;
  selectedStatus: string;
  selectedLocation: string;
  selectedTimeline: 'ALL' | 'UPCOMING' | 'TODAY' | 'PAST';
  selectedSkills: string[];
  skillMatchMode: 'all' | 'any';
  sortBy: 'latest' | 'deadline' | 'applications';
  viewMode: 'grid' | 'table';
}

export interface CreateJobFormData {
  collegeId: string;
  title: string;
  description: string;
  type: 'FULL_TIME' | 'INTERNSHIP' | 'INTERN_PLUS_FTE';
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'CLOSED';
  location: string;
  salaryPackage: string;
  skills: string[];
  minCgpa: number;
  allowedBranches: string[];
  eligibleBatches: number[];
  deadline: string;
}

export const initialCreateJobForm: CreateJobFormData = {
  collegeId: '',
  title: '',
  description: '',
  type: 'FULL_TIME',
  status: 'ACTIVE',
  location: '',
  salaryPackage: '',
  skills: [],
  minCgpa: 0,
  allowedBranches: ['Computer Science & Engineering (CSE)', 'Information Technology (IT)'],
  eligibleBatches: [new Date().getFullYear(), new Date().getFullYear() + 1],
  deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
};

interface RecruiterJobsStoreState {
  jobs: RecruiterJobItem[];
  engagedColleges: RecruiterJobCollege[];
  verifiedCollegesList: RecruiterJobCollege[];
  pagination: RecruiterJobsPagination | null;
  isLoading: boolean;
  isPosting: boolean;
  error: string | null;
  
  // Filter State
  filters: RecruiterJobsFilterState;
  
  // Create Job Form Draft
  createFormData: CreateJobFormData;
  
  // Actions
  fetchJobs: () => Promise<void>;
  fetchVerifiedColleges: () => Promise<void>;
  createJob: (payload: CreateJobFormData) => Promise<{ success: boolean; data?: RecruiterJobItem; message?: string }>;
  updateJob: (id: string, payload: Partial<CreateJobFormData>) => Promise<{ success: boolean; data?: RecruiterJobItem; message?: string }>;
  deleteJob: (id: string) => Promise<{ success: boolean; message?: string }>;
  
  setFilter: <K extends keyof RecruiterJobsFilterState>(key: K, value: RecruiterJobsFilterState[K]) => void;
  toggleSkillFilter: (skill: string) => void;
  removeSkillFilter: (skill: string) => void;
  clearSkillFilters: () => void;
  resetFilters: () => void;
  
  setCreateFormField: <K extends keyof CreateJobFormData>(field: K, value: CreateJobFormData[K]) => void;
  resetCreateForm: () => void;
}

const initialFilters: RecruiterJobsFilterState = {
  searchQuery: '',
  collegeId: 'ALL',
  selectedType: 'ALL',
  selectedStatus: 'ALL',
  selectedLocation: 'ALL',
  selectedTimeline: 'ALL',
  selectedSkills: [],
  skillMatchMode: 'any',
  sortBy: 'latest',
  viewMode: 'grid',
};

export const useRecruiterJobsStore = create<RecruiterJobsStoreState>((set, get) => ({
  jobs: [],
  engagedColleges: [],
  verifiedCollegesList: [],
  pagination: null,
  isLoading: false,
  isPosting: false,
  error: null,
  
  filters: { ...initialFilters },
  createFormData: { ...initialCreateJobForm },

  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const { filters } = get();
      const params = new URLSearchParams();
      params.set('limit', '100');

      if (filters.selectedStatus && filters.selectedStatus !== 'ALL') {
        params.set('status', filters.selectedStatus);
      }
      if (filters.selectedType && filters.selectedType !== 'ALL') {
        params.set('type', filters.selectedType);
      }
      if (filters.collegeId && filters.collegeId !== 'ALL') {
        params.set('collegeId', filters.collegeId);
      }
      if (filters.selectedLocation && filters.selectedLocation !== 'ALL') {
        params.set('location', filters.selectedLocation);
      }
      if (filters.selectedTimeline && filters.selectedTimeline !== 'ALL') {
        params.set('timeline', filters.selectedTimeline);
      }
      if (filters.selectedSkills && filters.selectedSkills.length > 0) {
        params.set('skills', filters.selectedSkills.join(','));
        params.set('skillMatchMode', filters.skillMatchMode);
      }
      if (filters.searchQuery) {
        params.set('search', filters.searchQuery);
      }

      const res = await apiClient.get<ApiResponse<{
        jobs: RecruiterJobItem[];
        engagedColleges: RecruiterJobCollege[];
        pagination: RecruiterJobsPagination;
      }>>(`/api/recruiter/jobs?${params.toString()}`);

      if (res.data.success && res.data.data) {
        set({
          jobs: res.data.data.jobs || [],
          engagedColleges: res.data.data.engagedColleges || [],
          pagination: res.data.data.pagination,
          isLoading: false,
        });
      } else {
        set({ error: res.data.message || 'Failed to fetch job drives', isLoading: false });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message || 'Network error fetching jobs',
        isLoading: false,
      });
    }
  },

  fetchVerifiedColleges: async () => {
    try {
      const res = await apiClient.get<ApiResponse<{ colleges: RecruiterJobCollege[] }>>(
        '/api/colleges?isVerified=true&limit=100'
      );
      if (res.data.success && res.data.data) {
        set({ verifiedCollegesList: res.data.data.colleges || [] });
      }
    } catch (err) {
      console.error('Failed to fetch verified colleges list:', err);
    }
  },

  createJob: async (payload: CreateJobFormData) => {
    set({ isPosting: true, error: null });
    try {
      const res = await apiClient.post<ApiResponse<RecruiterJobItem>>('/api/recruiter/jobs', payload);
      if (res.data.success && res.data.data) {
        // Prepend to current list
        set((state) => ({
          jobs: [res.data.data!, ...state.jobs],
          isPosting: false,
          createFormData: { ...initialCreateJobForm },
        }));
        return { success: true, data: res.data.data, message: res.data.message };
      }
      set({ isPosting: false, error: res.data.message || 'Failed to post job' });
      return { success: false, message: res.data.message };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error posting job drive';
      set({ isPosting: false, error: msg });
      return { success: false, message: msg };
    }
  },

  updateJob: async (id: string, payload: Partial<CreateJobFormData>) => {
    try {
      const res = await apiClient.patch<ApiResponse<RecruiterJobItem>>(`/api/recruiter/jobs/${id}`, payload);
      if (res.data.success && res.data.data) {
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...res.data.data } : j)),
        }));
        return { success: true, data: res.data.data, message: res.data.message };
      }
      return { success: false, message: res.data.message };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error updating job drive';
      return { success: false, message: msg };
    }
  },

  deleteJob: async (id: string) => {
    try {
      const res = await apiClient.delete<ApiResponse<{ deletedId?: string; status?: string }>>(`/api/recruiter/jobs/${id}`);
      if (res.data.success) {
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        }));
        return { success: true, message: res.data.message };
      }
      return { success: false, message: res.data.message };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error deleting job drive';
      return { success: false, message: msg };
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  toggleSkillFilter: (skill: string) => {
    set((state) => {
      const exists = state.filters.selectedSkills.includes(skill);
      const nextSkills = exists
        ? state.filters.selectedSkills.filter((s) => s !== skill)
        : [...state.filters.selectedSkills, skill];
      return {
        filters: { ...state.filters, selectedSkills: nextSkills },
      };
    });
  },

  removeSkillFilter: (skill: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        selectedSkills: state.filters.selectedSkills.filter((s) => s !== skill),
      },
    }));
  },

  clearSkillFilters: () => {
    set((state) => ({
      filters: { ...state.filters, selectedSkills: [] },
    }));
  },

  resetFilters: () => {
    set({ filters: { ...initialFilters } });
  },

  setCreateFormField: (field, value) => {
    set((state) => ({
      createFormData: { ...state.createFormData, [field]: value },
    }));
  },

  resetCreateForm: () => {
    set({ createFormData: { ...initialCreateJobForm } });
  },
}));
