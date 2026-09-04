export interface CompanyInfo {
  id: string;
  name: string;
  logoUrl?: string | null;
  website?: string | null;
  industry?: string | null;
  location?: string | null;
  description?: string | null;
  isVerified: boolean;
  images: string[];
}

export interface CurrentRecruiter {
  id: string;
  name: string;
  email: string;
  designation: string;
  avatarUrl?: string | null;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  designation: string;
  avatarUrl?: string | null;
  isActive: boolean;
}

export interface RecruiterKpis {
  activeDrives: number;
  totalApplicants: number;
  shortlistedCandidates: number;
  confirmedHires: number;
}

export interface CollegeSummary {
  id: string;
  name: string;
  code: string;
  city?: string | null;
  state?: string | null;
  logoUrl?: string | null;
}

export interface JobDrive {
  id: string;
  title: string;
  salaryPackage: number;
  type: string;
  deadline?: string | null;
  createdAt: string;
  college: CollegeSummary;
  _count?: {
    applications: number;
    offers: number;
  };
}

export interface StudentApplicant {
  id: string;
  status: string;
  createdAt: string;
  student: {
    id: string;
    cgpa?: number | null;
    user: {
      id: string;
      name: string;
      email: string;
      avatarUrl?: string | null;
    };
    college?: {
      id: string;
      name: string;
      code: string;
    } | null;
  };
  job: {
    id: string;
    title: string;
    salaryPackage: number;
    type: string;
    college?: {
      id: string;
      name: string;
      code: string;
    } | null;
  };
}

export interface RecruiterDashboardData {
  company: CompanyInfo;
  currentRecruiter: CurrentRecruiter;
  teamMembers: TeamMember[];
  kpis: RecruiterKpis;
  recentJobs: JobDrive[];
  recentApplications: StudentApplicant[];
}
