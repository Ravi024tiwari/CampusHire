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
  totalJobs: number;
  jobsGrowth?: string;
  totalApplications: number;
  applicationsGrowth?: string;
  shortlisted: number;
  shortlistedPercent?: string;
  interviews: number;
  interviewsPercent?: string;
  offers: number;
  offersPercent?: string;

  // Backward compatibility aliases
  activeDrives?: number;
  totalApplicants?: number;
  shortlistedCandidates?: number;
  confirmedHires?: number;
}

export interface MonthlyTrend {
  month: string;
  applications: number;
  shortlisted: number;
}

export interface StatusBreakdownItem {
  key: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CandidateApplicationItem {
  id: string;
  candidateName: string;
  candidateAvatar?: string | null;
  email: string;
  branch: string;
  batchYear: number;
  cgpa?: number | null;
  collegeName: string;
  jobId: string;
  jobTitle: string;
  jobType: string;
  appliedOn: string;
  status: string;
}

export interface UpcomingInterviewItem {
  id: string;
  candidateName: string;
  candidateAvatar?: string | null;
  branch: string;
  batchYear: number;
  jobTitle: string;
  scheduledAt: string;
  status: string;
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
  salaryPackage: string | number;
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
    salaryPackage: string | number;
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
  applicationTrends: MonthlyTrend[];
  statusBreakdown: StatusBreakdownItem[];
  recentApplications: CandidateApplicationItem[];
  upcomingInterviews: UpcomingInterviewItem[];
  recentJobs: JobDrive[];
}
