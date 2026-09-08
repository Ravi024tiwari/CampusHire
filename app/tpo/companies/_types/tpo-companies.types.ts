export type RecruiterStatus = 'VISITED' | 'UPCOMING' | 'PAST';

export interface TpoCompanyItem {
  id: string;
  name: string;
  logoUrl?: string | null;
  website?: string | null;
  industry: string;
  location: string;
  companyType: string; // 'Product' | 'Service' | 'MNC' | 'Startup' | 'PSU'
  visitDate: string; // Formatted date e.g. 'Aug 22, 2025'
  rawVisitDate?: string;
  jobOpportunities: number;
  studentsPlaced: number;
  status: RecruiterStatus;
  contactPerson?: {
    name: string;
    email: string;
    phone?: string;
    designation?: string;
  } | null;
  createdAt?: string;
}

export interface TpoCompaniesKpis {
  totalCompanies: {
    value: number;
    growth: string;
  };
  visitedThisYear: {
    value: number;
    growth: string;
  };
  jobOpportunities: {
    value: number;
    growth: string;
  };
  studentsPlaced: {
    value: number;
    growth: string;
  };
}

export interface TpoCompanyInsights {
  total: number;
  visitedThisYear: number;
  upcoming: number;
  past: number;
}

export interface TopRecruitingCompany {
  id: string;
  name: string;
  logoUrl?: string | null;
  studentsPlaced: number;
  industry?: string;
}

export interface RecentVisitItem {
  id: string;
  name: string;
  logoUrl?: string | null;
  visitDate: string;
  jobOpportunities: number;
  studentsPlaced: number;
  industry?: string;
}

export interface TpoCompaniesFilterState {
  search: string;
  status: string; // 'ALL' | 'VISITED' | 'UPCOMING' | 'PAST'
  industry: string;
  visitYear: string;
  companyType: string;
  placementStatus: string;
  location: string;
  academicYear: string;
  limit: number;
  page: number;
}

export interface TpoCompaniesFilterOptions {
  industries: string[];
  visitYears: string[];
  companyTypes: string[];
  placementStatuses: string[];
  locations: string[];
}

export interface TpoCompaniesResponse {
  success: boolean;
  data: TpoCompanyItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  kpis: TpoCompaniesKpis;
  insights: TpoCompanyInsights;
  topRecruitingCompanies: TopRecruitingCompany[];
  recentVisits: RecentVisitItem[];
  filterOptions: TpoCompaniesFilterOptions;
}
