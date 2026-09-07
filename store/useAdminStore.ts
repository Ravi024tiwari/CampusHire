import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import type { 
  AdminRecruiterItem, 
  CompanyOption, 
  RecruiterMeta, 
  RecruiterStats 
} from '@/app/admin/recruiters/_types/recruiter.types';

export interface CollegeItem {
  id: string;
  name: string;
  code: string | null;
  domain: string | null;
  city: string | null;
  state: string | null;
  logoUrl: string | null;
  images?: string[];
  isVerified: boolean;
  contactEmail?: string | null;
  contactPhone?: string | null;
  createdAt: string;
  updatedAt: string;
  tpos?: Array<{
    id: string;
    designation: string | null;
    department: string | null;
    isActive: boolean;
    user?: {
      name: string;
      email: string;
    };
  }>;
  _count?: {
    students: number;
    jobs: number;
    offers: number;
  };
}

export interface KpiData {
  affiliatedCollegesCount: number;
  verifiedCollegesCount: number;
  pendingCollegesCount: number;
  totalEnrolledStudents: number;
  totalPlacedStudents: number;
  placementPercentage: string;
  placementRateNumeric: number;
  totalCompaniesEnrolled: number;
  verifiedCompaniesCount: number;
  pendingVerificationCompanies: number;
  totalPlacementDrives: number;
  activePlacementDrives: number;
  totalApplicationsSubmitted: number;
  totalOffersIssued: number;
  totalOffersAccepted: number;
  offerAcceptanceRate: string;
  maxSalaryPackage?: string;
}

export interface RecentDrive {
  id: string;
  title: string;
  salaryPackage: string;
  location: string;
  deadline: string;
  createdAt: string;
  company: {
    name: string;
    logoUrl: string | null;
  };
  college: {
    name: string;
    code: string | null;
  };
  _count: {
    applications: number;
  };
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  type: 'VERIFICATION' | 'SYSTEM' | 'SECURITY' | 'DRIVE';
}

export interface VelocityBar {
  month: string;
  value: number;
  height: string;
}

export interface CtcTier {
  label: string;
  percent: number;
  count: string;
  color: string;
}

export interface AdminDashboardKpis {
  totalStudents: number;
  studentsMoMGrowth: number;
  totalRecruiters: number;
  recruitersMoMGrowth: number;
  verifiedColleges: number;
  collegesMoMGrowth: number;
  activeJobs: number;
  jobsMoMGrowth: number;
  totalApplications: number;
  applicationsMoMGrowth: number;
  offersMade: number;
  offersMoMGrowth: number;

  // Backward compatibility keys
  affiliatedCollegesCount?: number;
  verifiedCollegesCount?: number;
  totalEnrolledStudents?: number;
  totalPlacedStudents?: number;
  totalPlacementDrives?: number;
  activePlacementDrives?: number;
  totalApplicationsSubmitted?: number;
  totalOffersIssued?: number;
  totalOffersAccepted?: number;
}

export interface UserGrowthDataPoint {
  month: string;
  students: number;
  recruiters: number;
  colleges: number;
}

export interface ApplicationStatusBreakdownItem {
  key: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TopRecruiterItem {
  id: string;
  companyName: string;
  logoUrl: string;
  jobsCount: number;
  applicationsCount: number;
}

export interface RecentStudentItem {
  id: string;
  name: string;
  avatarUrl: string | null;
  collegeName: string;
  branch: string;
  status: string;
  joinedAt: string;
}

export interface RecentRecruiterItem {
  id: string;
  companyName: string;
  logoUrl: string;
  jobsCount: number;
  joinedAt: string;
}

export interface PlatformActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  icon: string;
  color: string;
}

export interface AdminDashboardData {
  kpis: AdminDashboardKpis;
  userGrowth: UserGrowthDataPoint[];
  applicationsByStatus: ApplicationStatusBreakdownItem[];
  topRecruiters: TopRecruiterItem[];
  recentStudents: RecentStudentItem[];
  recentRecruiters: RecentRecruiterItem[];
  platformActivity: PlatformActivityItem[];
  pendingColleges: CollegeItem[];
  verifiedColleges: CollegeItem[];
}

export interface AdminStudentItem {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  enrollmentNumber: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  college: {
    id: string;
    name: string;
    code: string;
  };
  skills: string[];
  status: 'Active' | 'Inactive';
  placementStatus: 'Placed' | 'Interviewing' | 'Offered' | 'Not Placed';
  totalApplications: number;
  totalOffers: number;
  joinedOn: string;
}

export interface AdminStudentKpis {
  totalStudents: { value: number; growth: string; period: string };
  totalColleges: { value: number; growth: string; period: string };
  appliedToJobs: { value: number; growth: string; period: string };
  placedStudents: { value: number; growth: string; period: string };
}

export interface AdminStudentFilters {
  search: string;
  collegeId: string;
  batchYear: string;
  jobRole: string;
  status: string;
  placementStatus: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface AdminStudentPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface AdminStudentFilterOptions {
  colleges: Array<{ id: string; name: string; code: string }>;
  batches: number[];
  jobRoles: string[];
  statuses: string[];
  placementStatuses: string[];
}

export interface AdminCollegeRosterItem {
  id: string;
  name: string;
  code: string;
  domain: string;
  city: string;
  state: string;
  location: string;
  logoUrl: string | null;
  type: string;
  isVerified: boolean;
  status: 'Verified' | 'Pending' | 'Rejected';
  studentsCount: number;
  jobsCount: number;
  offersCount?: number;
  tposCount?: number;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
}

export interface AdminCollegeKpis {
  totalColleges: { value: number; growth: string; trend: 'up' | 'down'; period: string };
  verifiedColleges: { value: number; growth: string; trend: 'up' | 'down'; period: string };
  pendingVerification: { value: number; growth: string; trend: 'up' | 'down'; period: string };
  rejectedColleges: { value: number; growth: string; trend: 'up' | 'down'; period: string };
}

export interface AdminCollegeInsights {
  total: number;
  verified: { count: number; percentage: number; color: string };
  pending: { count: number; percentage: number; color: string };
  rejected: { count: number; percentage: number; color: string };
}

export interface AdminCollegeRecentActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  timestamp: string;
  type: string;
  color: string;
}

export interface AdminCollegeFilters {
  search: string;
  status: string;
  location: string;
  type: string;
  domain: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface AdminCollegeFilterOptions {
  locations: string[];
  types: string[];
  domains: string[];
  statuses: string[];
}

export interface AdminState {
  dashboardData: AdminDashboardData | null;
  timeframe: string;
  kpis: KpiData | null;
  recentDrives: RecentDrive[];
  pendingColleges: CollegeItem[];
  verifiedColleges: CollegeItem[];
  allColleges: CollegeItem[];
  placementVelocity: VelocityBar[];
  ctcDistribution: CtcTier[];
  auditEvents: AuditEvent[];
  activeTab: 'overview' | 'pending' | 'colleges' | 'drives' | 'audit';
  searchQuery: string;
  selectedCollegeForDossier: CollegeItem | null;
  isLoading: boolean;
  isVerifyingId: string | null;
  isMobileMenuOpen: boolean;
  isSidebarCollapsed: boolean;
  toast: { type: 'success' | 'error' | 'info'; message: string } | null;

  // Recruiter Operations State in Global Store
  recruiters: AdminRecruiterItem[];
  recruiterCompanies: CompanyOption[];
  recruiterMeta: RecruiterMeta;
  recruiterStats: RecruiterStats;
  isRecruitersLoading: boolean;

  // Student Operations State in Global Store
  adminStudents: AdminStudentItem[];
  adminStudentKpis: AdminStudentKpis | null;
  adminStudentFilters: AdminStudentFilters;
  adminStudentPagination: AdminStudentPagination;
  adminStudentFilterOptions: AdminStudentFilterOptions | null;
  isAdminStudentsLoading: boolean;

  // College Operations State in Global Store
  adminCollegesRoster: AdminCollegeRosterItem[];
  adminCollegesKpis: AdminCollegeKpis | null;
  adminCollegesInsights: AdminCollegeInsights | null;
  adminCollegesRecentActivity: AdminCollegeRecentActivityItem[];
  adminCollegesFilters: AdminCollegeFilters;
  adminCollegesPagination: AdminStudentPagination;
  adminCollegesFilterOptions: AdminCollegeFilterOptions | null;
  isAdminCollegesLoading: boolean;
}

export interface AdminActions {
  fetchDashboardData: (timeframe?: string) => Promise<void>;
  setTimeframe: (timeframe: string) => void;
  verifyCollege: (id: string, isVerified: boolean, reason?: string) => Promise<boolean>;
  setActiveTab: (tab: AdminState['activeTab']) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCollegeForDossier: (college: CollegeItem | null) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setToast: (toast: AdminState['toast']) => void;
  dismissToast: () => void;
  addAuditEvent: (event: Omit<AuditEvent, 'id' | 'timestamp'>) => void;

  // Recruiter Operations Actions
  fetchRecruiters: (params?: {
    search?: string;
    companyId?: string;
    designation?: string;
    page?: number;
    limit?: number;
    forceRefresh?: boolean;
  }) => Promise<void>;

  // Student Operations Actions
  fetchAdminStudents: (params?: Partial<AdminStudentFilters>) => Promise<void>;
  setAdminStudentFilters: (filters: Partial<AdminStudentFilters>) => void;
  resetAdminStudentFilters: () => void;

  // College Operations Actions
  fetchAdminColleges: (params?: Partial<AdminCollegeFilters>) => Promise<void>;
  setAdminCollegesFilters: (filters: Partial<AdminCollegeFilters>) => void;
  resetAdminCollegesFilters: () => void;
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
  dashboardData: null,
  timeframe: '8m',
  kpis: null,
  recentDrives: [],
  pendingColleges: [],
  verifiedColleges: [],
  allColleges: [],
  placementVelocity: [],
  ctcDistribution: [],
  auditEvents: [],
  activeTab: 'overview',
  searchQuery: '',
  selectedCollegeForDossier: null,
  isLoading: false,
  isVerifyingId: null,
  isMobileMenuOpen: false,
  isSidebarCollapsed: false,
  toast: null,

  // Initial Recruiter State
  recruiters: [],
  recruiterCompanies: [],
  recruiterMeta: {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
  recruiterStats: {
    totalRecruiters: 0,
    verifiedCompaniesCount: 0,
    totalDrivesCount: 0,
  },
  isRecruitersLoading: false,

  // Initial Student State
  adminStudents: [],
  adminStudentKpis: null,
  adminStudentFilters: {
    search: '',
    collegeId: 'ALL',
    batchYear: 'ALL',
    jobRole: 'ALL',
    status: 'ALL',
    placementStatus: 'ALL',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  adminStudentPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
  adminStudentFilterOptions: null,
  isAdminStudentsLoading: false,

  // Initial College State
  adminCollegesRoster: [],
  adminCollegesKpis: null,
  adminCollegesInsights: null,
  adminCollegesRecentActivity: [],
  adminCollegesFilters: {
    search: '',
    status: 'ALL',
    location: 'ALL',
    type: 'ALL',
    domain: 'ALL',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  adminCollegesPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  },
  adminCollegesFilterOptions: null,
  isAdminCollegesLoading: false,

  setTimeframe: (timeframe: string) => {
    set({ timeframe });
    get().fetchDashboardData(timeframe);
  },

  fetchDashboardData: async (customTimeframe?: string) => {
    set({ isLoading: true });
    try {
      const timeframeToUse = customTimeframe || get().timeframe || '8m';
      const response = await apiClient.get<
        ApiResponse<AdminDashboardData & {
          kpis: any;
          pendingColleges: CollegeItem[];
          verifiedColleges: CollegeItem[];
          recentDrives?: RecentDrive[];
          ctcDistribution?: CtcTier[];
          placementVelocity?: VelocityBar[];
          auditEvents?: AuditEvent[];
        }>
      >(`/api/admin/dashboard?timeframe=${timeframeToUse}`);

      if (response.data.success && response.data.data) {
        const d = response.data.data;
        const allColleges = [...(d.pendingColleges || []), ...(d.verifiedColleges || [])];

        set({
          dashboardData: d as AdminDashboardData,
          kpis: d.kpis as unknown as KpiData,
          pendingColleges: d.pendingColleges || [],
          verifiedColleges: d.verifiedColleges || [],
          allColleges,
          recentDrives: d.recentDrives || [],
          ctcDistribution: d.ctcDistribution || [],
          placementVelocity: d.placementVelocity || [],
          auditEvents: d.auditEvents || [],
          isLoading: false,
        });
        return;
      }
      throw new Error('Fallback to sub-endpoints');
    } catch (err) {
      try {
        const [statsRes, pendingRes, verifiedRes] = await Promise.allSettled([
          apiClient.get<ApiResponse<{ kpis: KpiData; recentActiveDrives: RecentDrive[] }>>('/api/admin/stats'),
          apiClient.get<ApiResponse<{ colleges: CollegeItem[] }>>('/api/admin/colleges?isVerified=false&limit=50'),
          apiClient.get<ApiResponse<{ colleges: CollegeItem[] }>>('/api/admin/colleges?isVerified=true&limit=50'),
        ]);

        let kpis: KpiData | null = null;
        let recentDrives: RecentDrive[] = [];
        let pendingColleges: CollegeItem[] = [];
        let verifiedColleges: CollegeItem[] = [];

        if (statsRes.status === 'fulfilled' && statsRes.value.data.success && statsRes.value.data.data) {
          kpis = statsRes.value.data.data.kpis;
          recentDrives = statsRes.value.data.data.recentActiveDrives || [];
        }

        if (pendingRes.status === 'fulfilled' && pendingRes.value.data.success && pendingRes.value.data.data) {
          pendingColleges = pendingRes.value.data.data.colleges || [];
        }

        if (verifiedRes.status === 'fulfilled' && verifiedRes.value.data.success && verifiedRes.value.data.data) {
          verifiedColleges = verifiedRes.value.data.data.colleges || [];
        }

        set({
          kpis,
          recentDrives,
          pendingColleges,
          verifiedColleges,
          allColleges: [...pendingColleges, ...verifiedColleges],
          isLoading: false,
        });
      } catch (finalErr: any) {
        console.error('[useAdminStore] Error fetching dashboard data:', finalErr);
        set({
          isLoading: false,
          toast: {
            type: 'error',
            message: finalErr.message || 'Failed to fetch live dashboard telemetry',
          },
        });
      }
    }
  },

  fetchRecruiters: async (params = {}) => {
    const { search = '', companyId = '', designation = '', page = 1, limit = 20 } = params;
    set({ isRecruitersLoading: true });
    
    try {
      const queryParams = new URLSearchParams();
      if (search.trim()) queryParams.set('search', search.trim());
      if (companyId && companyId !== 'all') queryParams.set('companyId', companyId);
      if (designation && designation !== 'all') queryParams.set('designation', designation);
      queryParams.set('page', page.toString());
      queryParams.set('limit', limit.toString());

      const response = await apiClient.get<
        ApiResponse<{
          recruiters: AdminRecruiterItem[];
          companies: CompanyOption[];
          meta: RecruiterMeta;
          stats: RecruiterStats;
        }>
      >(`/api/admin/recruiters?${queryParams.toString()}`);

      if (response.data.success && response.data.data) {
        set({
          recruiters: response.data.data.recruiters || [],
          recruiterCompanies: response.data.data.companies || [],
          recruiterMeta: response.data.data.meta || get().recruiterMeta,
          recruiterStats: response.data.data.stats || get().recruiterStats,
          isRecruitersLoading: false,
        });
      }
    } catch (error: any) {
      console.error('[useAdminStore] Error fetching recruiters:', error);
      set({
        isRecruitersLoading: false,
        toast: {
          type: 'error',
          message: error.message || 'Failed to fetch corporate recruiters',
        },
      });
    }
  },

  verifyCollege: async (id: string, isVerified: boolean, reason?: string) => {
    set({ isVerifyingId: id });
    const targetCollege = get().allColleges.find((c) => c.id === id);
    const collegeName = targetCollege?.name || 'Institution';

    try {
      const response = await apiClient.patch<ApiResponse<{ college: CollegeItem }>>(
        `/api/admin/colleges/${id}/verify`,
        { isVerified, reason }
      );

      if (response.data.success) {
        const updated = response.data.data?.college;

        const prevPending = get().pendingColleges;
        const prevVerified = get().verifiedColleges;

        if (isVerified) {
          const newPending = prevPending.filter((c) => c.id !== id);
          const newVerified = [
            { ...(targetCollege || {}), ...updated, isVerified: true } as CollegeItem,
            ...prevVerified.filter((c) => c.id !== id),
          ];
          set({
            pendingColleges: newPending,
            verifiedColleges: newVerified,
            allColleges: [...newPending, ...newVerified],
          });
        } else {
          const newVerified = prevVerified.filter((c) => c.id !== id);
          const newPending = [
            { ...(targetCollege || {}), ...updated, isVerified: false } as CollegeItem,
            ...prevPending.filter((c) => c.id !== id),
          ];
          set({
            pendingColleges: newPending,
            verifiedColleges: newVerified,
            allColleges: [...newPending, ...newVerified],
          });
        }

        get().addAuditEvent({
          actor: 'Super Admin',
          action: isVerified ? `Accredited & Verified "${collegeName}"` : `Revoked verification for "${collegeName}"`,
          target: collegeName,
          type: 'VERIFICATION',
        });

        if (get().selectedCollegeForDossier?.id === id) {
          set({
            selectedCollegeForDossier: updated ? { ...get().selectedCollegeForDossier!, ...updated, isVerified } : null,
          });
        }

        set({
          isVerifyingId: null,
          toast: {
            type: 'success',
            message: `"${collegeName}" ${isVerified ? 'verified & unlocked' : 'revoked'} successfully!`,
          },
        });
        return true;
      }
      throw new Error(response.data.message || 'Verification update failed');
    } catch (error: any) {
      console.error('[useAdminStore] Verification error:', error);
      set({
        isVerifyingId: null,
        toast: {
          type: 'error',
          message: error.message || 'Failed to update verification status',
        },
      });
      return false;
    }
  },

  setActiveTab: (activeTab) => set({ activeTab }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSelectedCollegeForDossier: (selectedCollegeForDossier) => set({ selectedCollegeForDossier }),

  setIsMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),

  setIsSidebarCollapsed: (isSidebarCollapsed) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('campushire_admin_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
      } catch (err) {
        console.error('[useAdminStore] Error saving sidebar state:', err);
      }
    }
    set({ isSidebarCollapsed });
  },

  toggleSidebar: () => {
    const nextCollapsed = !get().isSidebarCollapsed;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('campushire_admin_sidebar_collapsed', JSON.stringify(nextCollapsed));
      } catch (err) {
        console.error('[useAdminStore] Error saving sidebar state:', err);
      }
    }
    set({ isSidebarCollapsed: nextCollapsed });
  },

  setToast: (toast) => set({ toast }),

  dismissToast: () => set({ toast: null }),

  addAuditEvent: (event) => {
    const newEvent: AuditEvent = {
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      ...event,
    };
    set((state) => ({
      auditEvents: [newEvent, ...state.auditEvents.slice(0, 19)],
    }));
  },

  // Student Management Actions
  fetchAdminStudents: async (customFilters?: Partial<AdminStudentFilters>) => {
    set({ isAdminStudentsLoading: true });
    const currentFilters = {
      ...get().adminStudentFilters,
      ...(customFilters || {}),
    };

    try {
      const params = new URLSearchParams();
      if (currentFilters.page) params.set('page', String(currentFilters.page));
      if (currentFilters.limit) params.set('limit', String(currentFilters.limit));
      if (currentFilters.search) params.set('search', currentFilters.search);
      if (currentFilters.collegeId && currentFilters.collegeId !== 'ALL') {
        params.set('collegeId', currentFilters.collegeId);
      }
      if (currentFilters.batchYear && currentFilters.batchYear !== 'ALL') {
        params.set('batchYear', currentFilters.batchYear);
      }
      if (currentFilters.jobRole && currentFilters.jobRole !== 'ALL') {
        params.set('jobRole', currentFilters.jobRole);
      }
      if (currentFilters.status && currentFilters.status !== 'ALL') {
        params.set('status', currentFilters.status);
      }
      if (currentFilters.placementStatus && currentFilters.placementStatus !== 'ALL') {
        params.set('placementStatus', currentFilters.placementStatus);
      }
      if (currentFilters.sortBy) params.set('sortBy', currentFilters.sortBy);
      if (currentFilters.sortOrder) params.set('sortOrder', currentFilters.sortOrder);

      const response = await apiClient.get<
        ApiResponse<{
          students: AdminStudentItem[];
          kpis: AdminStudentKpis;
          filterOptions: AdminStudentFilterOptions;
          pagination: AdminStudentPagination;
        }>
      >(`/api/admin/students?${params.toString()}`);

      if (response.data.success && response.data.data) {
        const { students, kpis, filterOptions, pagination } = response.data.data;
        set({
          adminStudents: students,
          adminStudentKpis: kpis,
          adminStudentFilterOptions: filterOptions,
          adminStudentPagination: pagination,
          adminStudentFilters: currentFilters,
          isAdminStudentsLoading: false,
        });
      } else {
        set({ isAdminStudentsLoading: false });
      }
    } catch (error: any) {
      console.error('[useAdminStore] Error fetching students:', error);
      set({
        isAdminStudentsLoading: false,
        toast: {
          type: 'error',
          message: error.response?.data?.message || error.message || 'Failed to fetch students roster',
        },
      });
    }
  },

  setAdminStudentFilters: (filters: Partial<AdminStudentFilters>) => {
    const updatedFilters = {
      ...get().adminStudentFilters,
      ...filters,
    };
    // Reset page to 1 if search or dropdown filters change (except when page itself is passed)
    if (!('page' in filters)) {
      updatedFilters.page = 1;
    }
    set({ adminStudentFilters: updatedFilters });
    get().fetchAdminStudents(updatedFilters);
  },

  resetAdminStudentFilters: () => {
    const resetFilters: AdminStudentFilters = {
      search: '',
      collegeId: 'ALL',
      batchYear: 'ALL',
      jobRole: 'ALL',
      status: 'ALL',
      placementStatus: 'ALL',
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    set({ adminStudentFilters: resetFilters });
    get().fetchAdminStudents(resetFilters);
  },

  // College Management Actions
  fetchAdminColleges: async (customFilters?: Partial<AdminCollegeFilters>) => {
    set({ isAdminCollegesLoading: true });
    const currentFilters = {
      ...get().adminCollegesFilters,
      ...(customFilters || {}),
    };

    try {
      const params = new URLSearchParams();
      if (currentFilters.page) params.set('page', String(currentFilters.page));
      if (currentFilters.limit) params.set('limit', String(currentFilters.limit));
      if (currentFilters.search) params.set('search', currentFilters.search);
      if (currentFilters.status && currentFilters.status !== 'ALL') {
        params.set('status', currentFilters.status);
      }
      if (currentFilters.location && currentFilters.location !== 'ALL') {
        params.set('location', currentFilters.location);
      }
      if (currentFilters.type && currentFilters.type !== 'ALL') {
        params.set('type', currentFilters.type);
      }
      if (currentFilters.domain && currentFilters.domain !== 'ALL') {
        params.set('domain', currentFilters.domain);
      }
      if (currentFilters.sortBy) params.set('sortBy', currentFilters.sortBy);
      if (currentFilters.sortOrder) params.set('sortOrder', currentFilters.sortOrder);

      const response = await apiClient.get<
        ApiResponse<{
          colleges: AdminCollegeRosterItem[];
          kpis: AdminCollegeKpis;
          insights: AdminCollegeInsights;
          recentActivity: AdminCollegeRecentActivityItem[];
          filterOptions: AdminCollegeFilterOptions;
          pagination: AdminStudentPagination;
        }>
      >(`/api/admin/colleges?${params.toString()}`);

      if (response.data.success && response.data.data) {
        const { colleges, kpis, insights, recentActivity, filterOptions, pagination } = response.data.data;
        set({
          adminCollegesRoster: colleges,
          adminCollegesKpis: kpis,
          adminCollegesInsights: insights,
          adminCollegesRecentActivity: recentActivity,
          adminCollegesFilterOptions: filterOptions,
          adminCollegesPagination: pagination,
          adminCollegesFilters: currentFilters,
          isAdminCollegesLoading: false,
        });
      } else {
        set({ isAdminCollegesLoading: false });
      }
    } catch (error: any) {
      console.error('[useAdminStore] Error fetching colleges:', error);
      set({
        isAdminCollegesLoading: false,
        toast: {
          type: 'error',
          message: error.response?.data?.message || error.message || 'Failed to fetch colleges directory',
        },
      });
    }
  },

  setAdminCollegesFilters: (filters: Partial<AdminCollegeFilters>) => {
    const updatedFilters = {
      ...get().adminCollegesFilters,
      ...filters,
    };
    if (!('page' in filters)) {
      updatedFilters.page = 1;
    }
    set({ adminCollegesFilters: updatedFilters });
    get().fetchAdminColleges(updatedFilters);
  },

  resetAdminCollegesFilters: () => {
    const resetFilters: AdminCollegeFilters = {
      search: '',
      status: 'ALL',
      location: 'ALL',
      type: 'ALL',
      domain: 'ALL',
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    set({ adminCollegesFilters: resetFilters });
    get().fetchAdminColleges(resetFilters);
  },
}));
