import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface CompanyJob {
  id: string;
  title: string;
  type: string;
  status: string;
  location: string;
  salaryPackage: string;
  skills: string[];
  minCgpa: number;
  allowedBranches: string[];
  eligibleBatches: number[];
  deadline: string;
  createdAt: string;
  college?: {
    id: string;
    name: string;
    logoUrl?: string;
    city?: string;
  };
  _count?: {
    applications: number;
    offers: number;
  };
}

export interface CompanyRecruiter {
  id: string;
  userId: string;
  designation?: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: string;
  };
}

export interface CompanyProfileData {
  id: string;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  images: string[];
  industry?: string | null;
  location?: string | null;
  description?: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  jobs: CompanyJob[];
  recruiters: CompanyRecruiter[];
  _count: {
    jobs: number;
    recruiters: number;
    offers: number;
  };
  stats: {
    activeJobs: number;
    totalJobs: number;
    totalApplications: number;
    totalOffers: number;
    totalDrives: number;
  };
}

export type CompanyProfileTab = 'overview' | 'jobs' | 'team' | 'gallery' | 'analytics';

interface RecruiterCompanyState {
  company: CompanyProfileData | null;
  isLoading: boolean;
  isSaving: boolean;
  activeTab: CompanyProfileTab;
  isEditModalOpen: boolean;
  notification: { message: string; type: 'success' | 'error' | 'info' } | null;

  // Actions
  setActiveTab: (tab: CompanyProfileTab) => void;
  setEditModalOpen: (open: boolean) => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearNotification: () => void;
  fetchCompanyProfile: () => Promise<void>;
  updateCompanyProfile: (data: Partial<CompanyProfileData>) => Promise<boolean>;
}

export const useRecruiterCompanyStore = create<RecruiterCompanyState>((set, get) => ({
  company: null,
  isLoading: true,
  isSaving: false,
  activeTab: 'overview',
  isEditModalOpen: false,
  notification: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setEditModalOpen: (open) => set({ isEditModalOpen: open }),

  showNotification: (message, type = 'success') => {
    set({ notification: { message, type } });
    setTimeout(() => {
      set({ notification: null });
    }, 4000);
  },

  clearNotification: () => set({ notification: null }),

  fetchCompanyProfile: async () => {
    set({ isLoading: true });
    try {
      const res = await apiClient.get<ApiResponse<CompanyProfileData>>('/api/recruiter/company');
      if (res.data?.success && res.data.data) {
        set({ company: res.data.data });
      } else {
        get().showNotification(res.data?.message || 'Failed to load company profile', 'error');
      }
    } catch (err: any) {
      console.error('[FETCH_COMPANY_PROFILE_ERROR]', err);
      get().showNotification(
        err.response?.data?.message || err.message || 'Error fetching company profile',
        'error'
      );
    } finally {
      set({ isLoading: false });
    }
  },

  updateCompanyProfile: async (payload) => {
    set({ isSaving: true });
    try {
      const res = await apiClient.patch<ApiResponse<CompanyProfileData>>(
        '/api/recruiter/company',
        payload
      );
      if (res.data?.success && res.data.data) {
        set((state) => ({
          company: state.company ? { ...state.company, ...res.data.data } : res.data.data,
          isEditModalOpen: false,
        }));
        get().showNotification('Company profile updated successfully', 'success');
        // Refresh full data with updated stats/jobs
        get().fetchCompanyProfile();
        return true;
      } else {
        get().showNotification(res.data?.message || 'Failed to update company', 'error');
        return false;
      }
    } catch (err: any) {
      console.error('[UPDATE_COMPANY_PROFILE_ERROR]', err);
      get().showNotification(
        err.response?.data?.message || err.message || 'Failed to update company profile',
        'error'
      );
      return false;
    } finally {
      set({ isSaving: false });
    }
  },
}));
