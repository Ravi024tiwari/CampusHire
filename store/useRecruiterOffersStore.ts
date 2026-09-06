import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface RecruiterOfferStudent {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  enrollmentNumber: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  isVerified?: boolean;
}

export interface RecruiterOfferCollege {
  id: string;
  name: string;
  code?: string | null;
  city?: string | null;
  logoUrl?: string | null;
}

export interface RecruiterOfferJob {
  id: string;
  title: string;
  type: string;
}

export interface RecruiterOfferItem {
  id: string;
  applicationId: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED' | 'REVOKED';
  designation: string;
  salaryPackage: string;
  location: string;
  joiningDate?: string | null;
  letterUrl?: string | null;
  notes?: string | null;
  expiresAt?: string | null;
  acceptedAt?: string | null;
  declinedAt?: string | null;
  createdAt: string;
  student: RecruiterOfferStudent;
  college: RecruiterOfferCollege;
  job: RecruiterOfferJob;
}

export interface RecruiterOffersStats {
  total: number;
  accepted: number;
  pending: number;
  declined: number;
  acceptanceRate: number;
  pendingRate: number;
  declinedRate: number;
}

export interface RecruiterOffersFilterOptions {
  colleges: Array<{ id: string; name: string; code?: string | null }>;
  jobs: Array<{ id: string; title: string; type: string }>;
  batchYears: number[];
}

export interface RecruiterOffersFilters {
  search: string;
  status: 'ALL' | 'ACCEPTED' | 'PENDING' | 'DECLINED';
  collegeId: string;
  batchYear?: number | null;
  role: string;
  startDate?: string | null;
  endDate?: string | null;
  sortBy: 'latest' | 'oldest' | 'salary_high' | 'salary_low';
  viewMode: 'table' | 'grid';
}

interface RecruiterOffersState {
  offers: RecruiterOfferItem[];
  stats: RecruiterOffersStats;
  filterOptions: RecruiterOffersFilterOptions;
  filters: RecruiterOffersFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  selectedOfferIds: string[];
  isLoading: boolean;
  isExporting: boolean;

  // Actions
  fetchOffers: () => Promise<void>;
  setFilter: (key: keyof RecruiterOffersFilters, value: any) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  toggleSelectOffer: (id: string) => void;
  selectAllOffers: (ids: string[]) => void;
  clearSelection: () => void;
}

export const useRecruiterOffersStore = create<RecruiterOffersState>((set, get) => ({
  offers: [],
  stats: {
    total: 0,
    accepted: 0,
    pending: 0,
    declined: 0,
    acceptanceRate: 0,
    pendingRate: 0,
    declinedRate: 0,
  },
  filterOptions: {
    colleges: [],
    jobs: [],
    batchYears: [],
  },
  filters: {
    search: '',
    status: 'ALL',
    collegeId: 'ALL',
    batchYear: null,
    role: 'ALL',
    startDate: null,
    endDate: null,
    sortBy: 'latest',
    viewMode: 'table',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  selectedOfferIds: [],
  isLoading: true,
  isExporting: false,

  fetchOffers: async () => {
    set({ isLoading: true });
    try {
      const { filters, pagination } = get();
      const params = new URLSearchParams();

      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
      if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
      if (filters.collegeId && filters.collegeId !== 'ALL') params.append('collegeId', filters.collegeId);
      if (filters.batchYear) params.append('batchYear', filters.batchYear.toString());
      if (filters.role && filters.role !== 'ALL') params.append('role', filters.role);
      if (filters.search.trim()) params.append('search', filters.search.trim());
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      params.append('sortBy', filters.sortBy);

      const res = await apiClient.get<
        ApiResponse<{
          offers: RecruiterOfferItem[];
          stats: RecruiterOffersStats;
          filterOptions: RecruiterOffersFilterOptions;
          pagination: { page: number; limit: number; total: number; totalPages: number };
        }>
      >(`/api/recruiter/offers?${params.toString()}`);

      if (res.data?.success && res.data.data) {
        set({
          offers: res.data.data.offers || [],
          stats: res.data.data.stats || get().stats,
          filterOptions: res.data.data.filterOptions || get().filterOptions,
          pagination: res.data.data.pagination || get().pagination,
        });
      }
    } catch (err) {
      console.error('[FETCH_RECRUITER_OFFERS_ERROR]', err);
    } finally {
      set({ isLoading: false });
    }
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      pagination: { ...state.pagination, page: 1 }, // Reset to page 1 on filter changes
    }));
    get().fetchOffers();
  },

  resetFilters: () => {
    set((state) => ({
      filters: {
        search: '',
        status: 'ALL',
        collegeId: 'ALL',
        batchYear: null,
        role: 'ALL',
        startDate: null,
        endDate: null,
        sortBy: 'latest',
        viewMode: state.filters.viewMode,
      },
      pagination: { ...state.pagination, page: 1 },
    }));
    get().fetchOffers();
  },

  setPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));
    get().fetchOffers();
  },

  setLimit: (limit) => {
    set((state) => ({
      pagination: { ...state.pagination, limit, page: 1 },
    }));
    get().fetchOffers();
  },

  toggleSelectOffer: (id) => {
    set((state) => {
      const exists = state.selectedOfferIds.includes(id);
      return {
        selectedOfferIds: exists
          ? state.selectedOfferIds.filter((item) => item !== id)
          : [...state.selectedOfferIds, id],
      };
    });
  },

  selectAllOffers: (ids) => {
    set({ selectedOfferIds: ids });
  },

  clearSelection: () => {
    set({ selectedOfferIds: [] });
  },
}));
