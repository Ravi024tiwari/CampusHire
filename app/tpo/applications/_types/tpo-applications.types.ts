export type ApplicationStatusType =
  | 'ALL'
  | 'APPLIED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'OFFERED'
  | 'REJECTED'
  | 'ACCEPTED'
  | 'DECLINED';

export interface ApplicationStudent {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  enrollmentNumber: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  phone?: string | null;
}

export interface ApplicationJob {
  id: string;
  title: string;
  type: string;
  location: string;
  salaryPackage: string;
  deadline: string;
  status: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
  };
}

export interface ApplicationOffer {
  id: string;
  designation?: string;
  salaryPackage?: string;
  status?: string;
}

export interface TpoApplicationItem {
  id: string;
  createdAt: string;
  status: string;
  resumeUrl?: string | null;
  notes?: string | null;
  student: ApplicationStudent;
  job: ApplicationJob;
  offer?: ApplicationOffer | null;
}

export interface TpoApplicationsKpis {
  total: { value: number; growth: string };
  underReview: { value: number; growth: string };
  shortlisted: { value: number; growth: string };
  interviewed: { value: number; growth: string };
  offersReceived: { value: number; growth: string };
  rejected: { value: number; growth: string };
}

export interface TpoApplicationsFilterOptions {
  companies: Array<{ id: string; label: string }>;
  jobRoles: string[];
  branches: string[];
  batchYears: number[];
  locations: string[];
}

export interface TpoApplicationsResponse {
  college?: {
    id: string;
    name: string;
    code: string | null;
    logoUrl: string | null;
  };
  academicYear: string;
  kpis: TpoApplicationsKpis;
  filterOptions: TpoApplicationsFilterOptions;
  applications: TpoApplicationItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface TpoApplicationsFilterState {
  search: string;
  status: ApplicationStatusType;
  companyName: string;
  jobTitle: string;
  branch: string;
  batchYear: string;
  location: string;
  appliedDate: string;
  academicYear: string;
  limit: number;
  page: number;
}
