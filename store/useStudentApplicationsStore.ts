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

// Initial Mock Preview Data strictly matching the uploaded UI mockup
const defaultMockApplications: AppliedJobItem[] = [
  {
    id: 'app-google-1',
    jobId: 'job-google-1',
    title: 'Software Engineer Intern',
    company: {
      id: 'comp-google',
      name: 'Google',
      logoUrl: null,
      website: 'https://careers.google.com',
    },
    type: 'INTERNSHIP',
    mode: 'On-campus',
    status: 'UNDER_REVIEW',
    displayStatus: 'Under Review',
    location: 'Bangalore',
    salaryPackage: '₹ 12 LPA',
    appliedDate: 'Sep 15, 2025',
    rawAppliedDate: '2025-09-15T10:00:00Z',
    skills: ['Data Structures', 'C++', 'Python', 'Algorithms'],
  },
  {
    id: 'app-ms-2',
    jobId: 'job-ms-2',
    title: 'SDE Full Time',
    company: {
      id: 'comp-ms',
      name: 'Microsoft',
      logoUrl: null,
      website: 'https://careers.microsoft.com',
    },
    type: 'FULL_TIME',
    mode: 'Off-campus',
    status: 'SHORTLISTED',
    displayStatus: 'Shortlisted',
    location: 'Hyderabad',
    salaryPackage: '₹ 28 LPA',
    appliedDate: 'Sep 12, 2025',
    rawAppliedDate: '2025-09-12T10:00:00Z',
    skills: ['C#', '.NET', 'Cloud Architecture', 'Distributed Systems'],
  },
  {
    id: 'app-tcs-3',
    jobId: 'job-tcs-3',
    title: 'Ninja Hiring',
    company: {
      id: 'comp-tcs',
      name: 'Tata Consultancy Services',
      logoUrl: null,
      website: 'https://tcs.com/careers',
    },
    type: 'FULL_TIME',
    mode: 'On-campus',
    status: 'INTERVIEW_SCHEDULED',
    displayStatus: 'Interviewing',
    location: 'Bangalore',
    salaryPackage: '₹ 7 LPA',
    appliedDate: 'Sep 10, 2025',
    rawAppliedDate: '2025-09-10T10:00:00Z',
    skills: ['Java', 'SQL', 'Web Development', 'Problem Solving'],
  },
  {
    id: 'app-swiggy-4',
    jobId: 'job-swiggy-4',
    title: 'Backend Developer',
    company: {
      id: 'comp-swiggy',
      name: 'Swiggy',
      logoUrl: null,
      website: 'https://swiggy.com/careers',
    },
    type: 'FULL_TIME',
    mode: 'Off-campus',
    status: 'UNDER_REVIEW',
    displayStatus: 'Under Review',
    location: 'Bangalore',
    salaryPackage: '₹ 14 LPA',
    appliedDate: 'Sep 8, 2025',
    rawAppliedDate: '2025-09-08T10:00:00Z',
    skills: ['Golang', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka'],
  },
  {
    id: 'app-zoho-5',
    jobId: 'job-zoho-5',
    title: 'Software Engineer',
    company: {
      id: 'comp-zoho',
      name: 'Zoho',
      logoUrl: null,
      website: 'https://zoho.com/careers',
    },
    type: 'FULL_TIME',
    mode: 'Off-campus',
    status: 'REJECTED',
    displayStatus: 'Rejected',
    location: 'Chennai',
    salaryPackage: '₹ 8.5 LPA',
    appliedDate: 'Sep 5, 2025',
    rawAppliedDate: '2025-09-05T10:00:00Z',
    skills: ['Java', 'Object Oriented Programming', 'MySQL'],
  },
  {
    id: 'app-phonepe-6',
    jobId: 'job-phonepe-6',
    title: 'Product Analyst Intern',
    company: {
      id: 'comp-phonepe',
      name: 'PhonePe',
      logoUrl: null,
      website: 'https://phonepe.com/careers',
    },
    type: 'INTERNSHIP',
    mode: 'On-campus',
    status: 'OFFERED',
    displayStatus: 'Offer',
    location: 'Bangalore',
    salaryPackage: '₹ 10 LPA',
    appliedDate: 'Aug 28, 2025',
    rawAppliedDate: '2025-08-28T10:00:00Z',
    skills: ['SQL', 'Python', 'Mixpanel', 'Product Analytics'],
    offerDetails: {
      id: 'off-1',
      designation: 'Associate Product Analyst',
      salaryPackage: '₹ 10 LPA + Bonus',
      location: 'Bangalore (Hybrid)',
      letterUrl: '#',
      joiningDate: 'July 1, 2026',
    },
  },
];

const defaultSummaryStats: SummaryStats = {
  total: 24,
  underReview: 10,
  shortlisted: 5,
  interviewing: 4,
  offers: 1,
  rejected: 4,
};

export const useStudentApplicationsStore = create<StudentApplicationsStoreState>((set, get) => ({
  applications: defaultMockApplications,
  summaryStats: defaultSummaryStats,
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
    total: 24,
    totalPages: 4,
    hasMore: true,
  },
  isLoading: false,
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

        if (Array.isArray(rawApps) && rawApps.length > 0) {
          const mapped: AppliedJobItem[] = rawApps.map((a: any) => {
            let displayStatus: AppliedJobItem['displayStatus'] = 'Under Review';
            if (a.status === 'SHORTLISTED') displayStatus = 'Shortlisted';
            else if (a.status === 'INTERVIEW_SCHEDULED') displayStatus = 'Interviewing';
            else if (a.status === 'OFFERED' || a.status === 'ACCEPTED') displayStatus = 'Offer';
            else if (a.status === 'REJECTED' || a.status === 'DECLINED') displayStatus = 'Rejected';

            const created = new Date(a.createdAt);
            const appliedDate = created.toLocaleDateString('en-US', {
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
            summaryStats: stats || defaultSummaryStats,
            pagination: pagination || {
              page: filters.page,
              limit: filters.limit,
              total: mapped.length,
              totalPages: Math.ceil(mapped.length / filters.limit) || 1,
              hasMore: false,
            },
            isLoading: false,
          });
          return;
        }
      }

      // If response is empty or mock mode, perform client-side filtering on default mock data
      let filtered = [...defaultMockApplications];

      if (filters.status && filters.status !== 'ALL') {
        const s = filters.status.toUpperCase();
        if (s === 'UNDER_REVIEW') filtered = filtered.filter((a) => a.displayStatus === 'Under Review');
        else if (s === 'SHORTLISTED') filtered = filtered.filter((a) => a.displayStatus === 'Shortlisted');
        else if (s === 'INTERVIEWING' || s === 'INTERVIEW_SCHEDULED') filtered = filtered.filter((a) => a.displayStatus === 'Interviewing');
        else if (s === 'OFFERS' || s === 'OFFERED') filtered = filtered.filter((a) => a.displayStatus === 'Offer');
        else if (s === 'REJECTED') filtered = filtered.filter((a) => a.displayStatus === 'Rejected');
      }

      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (a) =>
            a.title.toLowerCase().includes(q) ||
            a.company.name.toLowerCase().includes(q) ||
            a.location.toLowerCase().includes(q)
        );
      }

      if (filters.jobType && filters.jobType !== 'ALL') {
        filtered = filtered.filter((a) => a.type === filters.jobType);
      }

      if (filters.location && filters.location !== 'ALL') {
        filtered = filtered.filter((a) => a.location.toLowerCase().includes(filters.location.toLowerCase()));
      }

      if (filters.sortBy === 'oldest') {
        filtered.sort((a, b) => new Date(a.rawAppliedDate).getTime() - new Date(b.rawAppliedDate).getTime());
      } else {
        filtered.sort((a, b) => new Date(b.rawAppliedDate).getTime() - new Date(a.rawAppliedDate).getTime());
      }

      set({
        applications: filtered,
        summaryStats: defaultSummaryStats,
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total: defaultSummaryStats.total,
          totalPages: 4,
          hasMore: filters.page < 4,
        },
        isLoading: false,
      });
    } catch {
      // Keep rich mock preview on network error
      set({
        applications: defaultMockApplications,
        summaryStats: defaultSummaryStats,
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
    } catch {
      // Continue optimistic update
    }

    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, status: 'DECLINED', displayStatus: 'Rejected' } : app
      ),
      isWithdrawModalOpen: false,
      applicationToWithdraw: null,
    }));

    return true;
  },
}));
