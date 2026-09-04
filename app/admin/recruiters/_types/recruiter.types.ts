export interface RecruiterUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface RecruiterCompany {
  id: string;
  name: string;
  logoUrl: string | null;
  industry: string | null;
  isVerified: boolean;
  location: string | null;
  _count?: {
    jobs: number;
    offers: number;
  };
}

export interface AdminRecruiterItem {
  id: string;
  userId: string;
  companyId: string;
  designation: string | null;
  createdAt: string;
  updatedAt: string;
  user: RecruiterUser;
  company: RecruiterCompany;
}

export interface CompanyOption {
  id: string;
  name: string;
  logoUrl: string | null;
  industry: string | null;
  isVerified: boolean;
  _count?: {
    recruiters: number;
    jobs: number;
  };
}

export interface RecruiterMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface RecruiterStats {
  totalRecruiters: number;
  verifiedCompaniesCount: number;
  totalDrivesCount: number;
}

export interface CreateRecruiterPayload {
  name: string;
  email: string;
  password: string;
  companyId: string;
  designation: string;
  avatarUrl?: string;
}
