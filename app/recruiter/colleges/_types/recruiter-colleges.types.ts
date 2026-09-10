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
  description?: string | null;
  salaryPackage: string;
  type: string;
  status?: string;
  location?: string | null;
  deadline?: string;
  skills?: string[];
  minCgpa?: number | null;
  allowedBranches?: string[];
  eligibleBatches?: number[];
  createdAt?: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    industry?: string | null;
    location?: string | null;
    isVerified?: boolean;
  };
  _count?: {
    applications: number;
    offers: number;
  };
}

export interface CollegeHighlight {
  title: string;
  subtitle: string;
  icon: string;
}

export interface RecruitingCompany {
  id: string;
  name: string;
  logoUrl?: string | null;
  industry?: string | null;
  location?: string | null;
  hiresCount?: number;
  tier?: 'Marquee' | 'Tier-1' | 'Tier-2' | 'Core' | 'Startup' | string;
  packageRange?: string;
  roles?: string[];
  category?: 'tech' | 'fintech' | 'consulting' | 'core' | 'startup' | string;
  featured?: boolean;
}

export interface CollegeCourse {
  branch: string;
  level: string;
  duration: string;
  enrolled: number;
  averagePackage?: string;
}

export interface CollegeKeyDetails {
  universityType: string;
  establishedYear: number | string;
  location: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  accreditation: string;
  approvedBy: string;
}

export interface CollegeSocialMedia {
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
}

export interface CollegeBrochure {
  title: string;
  format: string;
  size: string;
  url: string;
}

export interface CollegeMapLocation {
  lat?: number;
  lng?: number;
  label: string;
  mapsUrl: string;
}

export interface PlacementStats {
  enrolledStudents: number;
  placedStudents: number;
  totalOffers: number;
  totalApplications: number;
  placementRate: number;
  activeDrives: number;
  highestPackage?: string;
  averagePackage?: string;
  medianPackage?: string;
  placementEligible?: number;
  recruitingCompaniesCount?: number;
}

export interface CollegeDetail extends CollegeItem {
  about?: {
    summary: string;
    description: string;
  };
  keyDetails?: CollegeKeyDetails;
  highlights?: CollegeHighlight[];
  recruitingCompanies?: RecruitingCompany[];
  socialMedia?: CollegeSocialMedia;
  brochure?: CollegeBrochure;
  mapLocation?: CollegeMapLocation;
  courses?: CollegeCourse[];
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
  stats?: {
    totalVerified: number;
    totalStates: number;
    totalStudents: number;
  };
}
