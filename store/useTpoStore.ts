import { create } from 'zustand';

export interface TpoDashboardData {
  hasCollege: boolean;
  currentAcademicYear: string;
  dateString: string;
  college: {
    id: string;
    name: string;
    code?: string | null;
    domain?: string | null;
    city?: string | null;
    state?: string | null;
    logoUrl?: string | null;
    images?: string[];
    isVerified: boolean;
    contactEmail?: string | null;
    contactPhone?: string | null;
    motto?: string;
  };
  tpoOfficer: {
    id: string;
    name: string;
    email: string;
    designation: string;
    department: string;
    avatarUrl?: string | null;
    collegeCode?: string;
  };
  metrics: {
    totalStudents: { value: number; growth: string };
    jobOpportunities: { value: number; active: number; growth: string };
    recruiterCompanies: { value: number; growth: string };
    studentsPlaced: { value: number; growth: string };
  };
  placementTrends: {
    year: number;
    studentsPlaced: number;
    placementRate: number;
  }[];
  placementStatistics: {
    placementRate: number;
    eligibleStudents: number;
    studentsPlaced: number;
    higherStudies: number;
    stillLooking: number;
  };
  recentJobs: {
    id: string;
    title: string;
    companyName: string;
    companyLogo?: string | null;
    type: string;
    deadline: string;
    salaryPackage: string;
    status: string;
    applicantsCount: number;
  }[];
  recentApplications: {
    id: string;
    studentName: string;
    studentAvatar?: string | null;
    branch: string;
    jobTitle: string;
    companyName: string;
    status: string;
    appliedAt: string;
  }[];
  topRecruiters: {
    id: string;
    name: string;
    logoUrl?: string | null;
    industry?: string | null;
  }[];
}

interface TpoStoreState {
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  selectedYear: string;
  dashboardData: TpoDashboardData | null;
  isLoading: boolean;
  error: string | null;
  
  toggleSidebar: () => void;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  setSelectedYear: (year: string) => void;
  fetchDashboardData: () => Promise<void>;
}

export const useTpoStore = create<TpoStoreState>((set) => ({
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
  selectedYear: '2025–26',
  dashboardData: null,
  isLoading: true,
  error: null,

  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  setIsSidebarCollapsed: (collapsed) =>
    set({ isSidebarCollapsed: collapsed }),

  setIsMobileMenuOpen: (open) =>
    set({ isMobileMenuOpen: open }),

  setSelectedYear: (year) =>
    set({ selectedYear: year }),

  fetchDashboardData: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch('/api/tpo/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to retrieve TPO dashboard data');
      }

      set({ dashboardData: json.data, isLoading: false });
    } catch (err: any) {
      console.error('[TPO_STORE_FETCH_ERROR]', err);
      set({ error: err.message || 'Error loading dashboard', isLoading: false });
    }
  },
}));
