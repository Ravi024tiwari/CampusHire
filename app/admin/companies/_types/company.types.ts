export interface CompanyItem {
  id: string;
  name: string;
  website: string | null;
  logoUrl: string | null;
  industry: string | null;
  location: string | null;
  description?: string | null;
  isVerified: boolean;
  createdAt: string;
  _count?: {
    jobs: number;
    offers: number;
    recruiters: number;
  };
}

export interface RecruiterMember {
  id: string;
  designation: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    isActive: boolean;
    createdAt: string;
  };
}

export type SortOption = 'NEWEST' | 'NAME_ASC' | 'MOST_DRIVES' | 'MOST_RECRUITERS';
export type StatusFilterOption = 'ALL' | 'PENDING' | 'VERIFIED';
