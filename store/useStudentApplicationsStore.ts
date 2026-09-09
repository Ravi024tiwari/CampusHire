import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface AppliedJobItem {
  id: string;
  jobId: string;
  title: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    website?: string | null;
  };
  type: 'FULL_TIME' | 'INTERNSHIP' | 'INTERN_PLUS_FTE';
  mode: 'On-campus' | 'Off-campus';
  status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'OFFERED' | 'REJECTED' | 'ACCEPTED' | 'DECLINED';
  displayStatus: 'Under Review' | 'Shortlisted' | 'Interviewing' | 'Offer' | 'Rejected' | 'Accepted' | 'Declined';
  location: string;
  salaryPackage: string;
  appliedDate: string;
  rawAppliedDate: string;
  skills: string[];
  offerDetails?: {
    id: string;
    designation: string;
    salaryPackage: string;
    location: string;
    letterUrl?: string | null;
    joiningDate?: string | null;
  } | null;
}

export interface SummaryStats {
  total: number;
  underReview: number;
  shortlisted: number;
  interviewing: number;
  offers: number;
  rejected: number;
}

export interface ApplicationsFilterState {
  search: string;
  status: string; // 'ALL', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEWING', 'OFFERS', 'REJECTED'
  jobType: string; // 'ALL', 'FULL_TIME', 'INTERNSHIP'
  location: string;
  sortBy: 'latest' | 'oldest' | 'package_high_to_low';
  page: number;
  limit: number;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

interface StudentApplicationsStoreState {
  applications: AppliedJobItem[];
  summaryStats: SummaryStats;
  filters: ApplicationsFilterState;
  pagination: PaginationState;
  isLoading: boolean;
  error: string | null;
  selectedApplication: AppliedJobItem | null;
  isDetailModalOpen: boolean;
  isWithdrawModalOpen: boolean;
  applicationToWithdraw: AppliedJobItem | null;

  // Actions
  fetchApplications: () => Promise<void>;
  setSearch: (search: string) => void;
  setStatusTab: (status: string) => void;
  setJobType: (jobType: string) => void;
  setLocation: (location: string) => void;
  setSortBy: (sortBy: 'latest' | 'oldest' | 'package_high_to_low') => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  openDetailModal: (app: AppliedJobItem) => void;
  closeDetailModal: () => void;
  openWithdrawModal: (app: AppliedJobItem) => void;
  closeWithdrawModal: () => void;
  withdrawApplication: (id: string) => Promise<boolean>;
}

const emptySummaryStats: SummaryStats = {
  total: 0,
  underReview: 0,
  shortlisted: 0,
  interviewing: 0,
  offers: 0,
  rejected: 0,
};

export const useStudentApplicationsStore = create<StudentApplicationsStoreState>((set, get) => ({
  applications: [],
  summaryStats: emptySummaryStats,
  filters: {
    search: '',
    status: 'ALL',
    jobType: 'ALL',
    location: 'ALL',
    sortBy: 'latest',
    page: 1,
    limit: 6,
  },
  pagination: {
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
    hasMore: false,
  },
  isLoading: true,
  error: null,
  selectedApplication: null,
  isDetailModalOpen: false,
  isWithdrawModalOpen: false,
  applicationToWithdraw: null,

  fetchApplications: async () => {
    const { filters } = get();
    set({ isLoading: true, error: null });

    try {
      const params = new URLSearchParams();
      params.set('page', String(filters.page));
      params.set('limit', String(filters.limit));
      if (filters.status && filters.status !== 'ALL') params.set('status', filters.status);
      if (filters.search) params.set('search', filters.search);
      if (filters.jobType && filters.jobType !== 'ALL') params.set('jobType', filters.jobType);
      if (filters.location && filters.location !== 'ALL') params.set('location', filters.location);
      if (filters.sortBy) params.set('sortBy', filters.sortBy);

      const res = await apiClient.get<ApiResponse<any>>(`/api/student/applications?${params.toString()}`);

      if (res.data.success && res.data.data) {
        const { applications: rawApps, summaryStats: stats, pagination } = res.data.data;

        const mapped: AppliedJobItem[] = (rawApps || []).map((a: any) => {
          let displayStatus: AppliedJobItem['displayStatus'] = 'Under Review';
          if (a.status === 'SHORTLISTED') displayStatus = 'Shortlisted';
          else if (a.status === 'INTERVIEW_SCHEDULED') displayStatus = 'Interviewing';
          else if (a.status === 'OFFERED' || a.status === 'ACCEPTED') displayStatus = 'Offer';
          else if (a.status === 'REJECTED' || a.status === 'DECLINED') displayStatus = 'Rejected';

          const created = new Date(a.createdAt);
          const appliedDate = isNaN(created.getTime())
            ? 'Recent'
            : created.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

          return {
            id: a.id,
            jobId: a.jobId,
            title: a.job?.title || 'Job Application',
            company: {
              id: a.job?.company?.id || '',
              name: a.job?.company?.name || 'Company',
              logoUrl: a.job?.company?.logoUrl || null,
              website: a.job?.company?.website || null,
            },
            type: a.job?.type || 'FULL_TIME',
            mode: a.job?.collegeId ? 'On-campus' : 'Off-campus',
            status: a.status,
            displayStatus,
            location: a.job?.location || 'India',
            salaryPackage: a.job?.salaryPackage || 'Competitive',
            appliedDate,
            rawAppliedDate: a.createdAt,
            skills: a.job?.skills || [],
            offerDetails: a.offer || null,
          };
        });

        set({
          applications: mapped,
          summaryStats: stats || emptySummaryStats,
          pagination: pagination || {
            page: filters.page,
            limit: filters.limit,
            total: mapped.length,
            totalPages: Math.ceil(mapped.length / filters.limit) || 1,
            hasMore: false,
          },
          isLoading: false,
          error: null,
        });
      } else {
        set({
          applications: [],
          summaryStats: emptySummaryStats,
          pagination: {
            page: filters.page,
            limit: filters.limit,
            total: 0,
            totalPages: 1,
            hasMore: false,
          },
          isLoading: false,
          error: res.data.message || 'Failed to fetch applied jobs',
        });
      }
    } catch (err: any) {
      set({
        applications: [],
        summaryStats: emptySummaryStats,
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total: 0,
          totalPages: 1,
          hasMore: false,
        },
        error: err.response?.data?.message || err.message || 'Failed to fetch applied jobs',
        isLoading: false,
      });
    }
  },

  setSearch: (search: string) => {
    set((state) => ({
      filters: { ...state.filters, search, page: 1 },
    }));
    get().fetchApplications();
  },

  setStatusTab: (status: string) => {
    set((state) => ({
      filters: { ...state.filters, status, page: 1 },
    }));
    get().fetchApplications();
  },

  setJobType: (jobType: string) => {
    set((state) => ({
      filters: { ...state.filters, jobType, page: 1 },
    }));
    get().fetchApplications();
  },

  setLocation: (location: string) => {
    set((state) => ({
      filters: { ...state.filters, location, page: 1 },
    }));
    get().fetchApplications();
  },

  setSortBy: (sortBy: 'latest' | 'oldest' | 'package_high_to_low') => {
    set((state) => ({
      filters: { ...state.filters, sortBy, page: 1 },
    }));
    get().fetchApplications();
  },

  setPage: (page: number) => {
    set((state) => ({
      filters: { ...state.filters, page },
    }));
    get().fetchApplications();
  },

  resetFilters: () => {
    set((state) => ({
      filters: {
        search: '',
        status: 'ALL',
        jobType: 'ALL',
        location: 'ALL',
        sortBy: 'latest',
        page: 1,
        limit: 6,
      },
    }));
    get().fetchApplications();
  },

  openDetailModal: (app: AppliedJobItem) => {
    set({ selectedApplication: app, isDetailModalOpen: true });
  },

  closeDetailModal: () => {
    set({ selectedApplication: null, isDetailModalOpen: false });
  },

  openWithdrawModal: (app: AppliedJobItem) => {
    set({ applicationToWithdraw: app, isWithdrawModalOpen: true });
  },

  closeWithdrawModal: () => {
    set({ applicationToWithdraw: null, isWithdrawModalOpen: false });
  },

  withdrawApplication: async (id: string) => {
    try {
      await apiClient.delete(`/api/student/applications/${id}`);
      await get().fetchApplications();
      set({
        isWithdrawModalOpen: false,
        applicationToWithdraw: null,
      });
      return true;
    } catch {
      return false;
    }
  },
}));
