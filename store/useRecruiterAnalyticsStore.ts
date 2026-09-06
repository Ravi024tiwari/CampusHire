import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface AnalyticsKpiData {
  totalOffers: number;
  totalOffersYoY: number;
  studentsPlaced: number;
  studentsPlacedYoY: number;
  placementRate: number;
  placementRateYoY: number;
  partnerColleges: number;
  partnerCollegesYoY: number;
}

export interface YearlyTrendItem {
  year: number;
  offersMade: number;
  studentsPlaced: number;
  placementRate: number;
}

export interface JobTypeDistributionItem {
  key: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TopCollegeItem {
  id: string;
  name: string;
  logo: string;
  offers: number;
  placementRate: number;
}

export interface TopRoleItem {
  id: string;
  role: string;
  offers: number;
  placementRate: number;
}

export interface BatchYearItem {
  batchYear: number;
  offers: number;
  placed: number;
  placementRate: number;
}

export interface LocationBreakdownItem {
  location: string;
  offers: number;
  percentage: number;
}

export interface PlacementGrowthData {
  growthPercentage: number;
  year2024: number;
  year2025: number;
}

export interface KeyInsightItem {
  id: string;
  type: string;
  icon: string;
  text: string;
  highlight: string;
}

export interface RecruiterAnalyticsData {
  kpis: AnalyticsKpiData;
  yearlyTrends: YearlyTrendItem[];
  jobTypeDistribution: JobTypeDistributionItem[];
  topColleges: TopCollegeItem[];
  topRoles: TopRoleItem[];
  batchYearBreakdown: BatchYearItem[];
  locationBreakdown: LocationBreakdownItem[];
  placementGrowth: PlacementGrowthData;
  keyInsights: KeyInsightItem[];
}

export type AnalyticsNavTab =
  | 'overview'
  | 'trends'
  | 'colleges'
  | 'roles'
  | 'offers'
  | 'insights';

interface RecruiterAnalyticsStore {
  data: RecruiterAnalyticsData | null;
  activeTab: AnalyticsNavTab;
  yearRange: string;
  granularity: 'yearly' | 'monthly';
  isLoading: boolean;
  error: string | null;

  // Actions
  setActiveTab: (tab: AnalyticsNavTab) => void;
  setYearRange: (range: string) => void;
  setGranularity: (granularity: 'yearly' | 'monthly') => void;
  fetchAnalytics: () => Promise<void>;
}

export const useRecruiterAnalyticsStore = create<RecruiterAnalyticsStore>((set, get) => ({
  data: null,
  activeTab: 'overview',
  yearRange: '2021-2025',
  granularity: 'yearly',
  isLoading: true,
  error: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setYearRange: (yearRange) => {
    set({ yearRange });
    get().fetchAnalytics();
  },
  setGranularity: (granularity) => {
    set({ granularity });
    get().fetchAnalytics();
  },

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const { yearRange, granularity, activeTab } = get();
      const params = new URLSearchParams();
      params.append('yearRange', yearRange);
      params.append('granularity', granularity);
      params.append('tab', activeTab);

      const res = await apiClient.get<ApiResponse<RecruiterAnalyticsData>>(
        `/api/recruiter/analytics?${params.toString()}`
      );

      if (res.data?.success && res.data.data) {
        set({ data: res.data.data });
      } else {
        set({ error: res.data?.message || 'Failed to fetch analytics data' });
      }
    } catch (err: any) {
      console.error('[FETCH_ANALYTICS_ERROR]', err);
      set({ error: err.message || 'Network error while fetching analytics' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
