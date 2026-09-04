export interface CollegeItem {
  id: string;
  name: string;
  code?: string | null;
  domain?: string | null;
  websiteUrl?: string | null;
  city?: string | null;
  state?: string | null;
  address?: string | null;
  pincode?: string | null;
  logoUrl?: string | null;
  images?: string[];
  isVerified: boolean;
  contactEmail?: string | null;
  contactPhone?: string | null;
  createdAt?: string;
  _count?: {
    students: number;
    jobs: number;
    tpos?: number;
    offers?: number;
  };
}

export interface TPOCoordinator {
  id: string;
  designation?: string | null;
  department?: string | null;
  isActive?: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    isActive: boolean;
  };
}

export interface CollegeJobSummary {
  id: string;
  title: string;
  salaryPackage: string;
  type: string;
  status?: string;
  location?: string;
  deadline?: string;
  createdAt?: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
  };
  _count?: {
    applications: number;
    offers: number;
  };
}

export interface PlacementStats {
  enrolledStudents: number;
  placedStudents: number;
  totalOffers: number;
  totalApplications: number;
  placementRate: number;
  activeDrives: number;
}

export interface CollegeDetail extends CollegeItem {
  tpos?: TPOCoordinator[];
  jobs?: CollegeJobSummary[];
  placementStats?: PlacementStats;
}

export interface CollegesApiResponse {
  colleges: CollegeItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}
