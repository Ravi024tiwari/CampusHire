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

export interface AdminState {
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
}

export interface AdminActions {
  fetchDashboardData: () => Promise<void>;
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
}

export const useAdminStore = create<AdminState & AdminActions>((set, get) => ({
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

  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<
        ApiResponse<{
          kpis: KpiData;
          pendingColleges: CollegeItem[];
          verifiedColleges: CollegeItem[];
          recentDrives: RecentDrive[];
          ctcDistribution: CtcTier[];
          placementVelocity: VelocityBar[];
          auditEvents: AuditEvent[];
        }>
      >('/api/admin/dashboard');

      if (response.data.success && response.data.data) {
        const d = response.data.data;
        const allColleges = [...(d.pendingColleges || []), ...(d.verifiedColleges || [])];

        set({
          kpis: d.kpis,
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
}));
