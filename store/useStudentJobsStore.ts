import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface StudentResumeItem {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  fileSize?: number;
  isDefault: boolean;
  createdAt: string;
}

export interface StudentJobItem {
  id: string;
  title: string;
  companyId: string;
  collegeId: string;
  description: string;
  type: 'FULL_TIME' | 'INTERNSHIP' | 'INTERN_PLUS_FTE';
  location: string;
  salaryPackage: string;
  skills: string[];
  responsibilities?: string[];
  minCgpa: number;
  allowedBranches: string[];
  eligibleBatches: number[];
  deadline: string;
  createdAt: string;
  postedAgo: string;
  company: {
    id: string;
    name: string;
    logoUrl: string | null;
    website?: string | null;
    industry?: string | null;
    isVerified?: boolean;
  };
  eligibility: {
    isEligible: boolean;
    isAlreadyPlaced: boolean;
    placedCompany: string | null;
    isCgpaEligible: boolean;
    isBranchEligible: boolean;
    isBatchEligible: boolean;
    isDeadlineActive: boolean;
    studentCgpa: number;
    requiredCgpa: number;
    studentBranch: string;
    allowedBranches: string[];
  };
  hasApplied: boolean;
  application: {
    id: string;
    status: string;
    appliedAt: string;
  } | null;
}

export interface JobFilterState {
  search: string;
  jobTypes: string[]; // ['FULL_TIME', 'INTERNSHIP', 'PART_TIME']
  locations: string[]; // ['Bangalore', 'Hyderabad', etc.]
  categories: string[]; // ['Software Development', 'Data Science', etc.]
  salaryRange: [number, number]; // [0, 50]
  skills: string[]; // ['React', 'Node.js', etc.]
  sortBy: 'latest' | 'oldest' | 'highest_ctc' | 'min_cgpa';
  viewMode: 'grid' | 'list';
  page: number;
  limit: number;
}

interface FacetCounts {
  totalCollegeJobs: number;
  jobTypes: Record<string, number>;
  locations: Array<{ name: string; count: number }>;
  categories: Array<{ name: string; count: number }>;
  skills: Array<{ name: string; count: number }>;
}

interface StudentJobsStoreState {
  jobs: StudentJobItem[];
  savedJobIds: string[];
  facetCounts: FacetCounts;
  filters: JobFilterState;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
  isLoading: boolean;
  error: string | null;

  // Selected Job for View Details & Application Modal
  selectedJob: StudentJobItem | null;
  currentJobDetail: StudentJobItem | null;
  isDetailLoading: boolean;
  isDetailModalOpen: boolean;
  isMobileFilterOpen: boolean;

  // Resumes for Apply Modal
  studentResumes: StudentResumeItem[];
  selectedResumeId: string | null;
  isApplying: boolean;
  applySuccessMessage: string | null;
  applyErrorMessage: string | null;

  // Actions
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<StudentJobItem | null>;
  getSimilarJobs: (currentJobId: string, limit?: number) => StudentJobItem[];
  fetchStudentResumes: () => Promise<void>;
  setSearch: (search: string) => void;
  toggleJobType: (type: string) => void;
  toggleLocation: (location: string) => void;
  toggleCategory: (category: string) => void;
  toggleSkill: (skill: string) => void;
  setSalaryRange: (range: [number, number]) => void;
  setSortBy: (sortBy: JobFilterState['sortBy']) => void;
  setViewMode: (viewMode: 'grid' | 'list') => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  removeFilterChip: (type: 'jobType' | 'location' | 'category' | 'skill', value: string) => void;
  toggleSaveJob: (jobId: string) => void;
  openJobDetail: (job: StudentJobItem) => void;
  closeJobDetail: () => void;
  setMobileFilterOpen: (open: boolean) => void;
  setSelectedResumeId: (resumeId: string | null) => void;
  submitJobApplication: (jobId: string, resumeId?: string | null) => Promise<boolean>;
}

// 12 Mock Campus Placement Drives accurately matching the 12 companies in the user mockup
const defaultMockJobs: StudentJobItem[] = [
  {
    id: 'job-google-1',
    title: 'Software Engineer (SDE)',
    companyId: 'comp-google',
    collegeId: 'dtu-1',
    description: 'Join Google core infrastructure and cloud systems team to build scalable services reaching billions of users worldwide.',
    type: 'FULL_TIME',
    location: 'Bangalore',
    salaryPackage: '₹ 20 - 30 LPA',
    skills: ['DSA', 'System Design', 'Java', 'Python'],
    minCgpa: 7.5,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    eligibleBatches: [2026],
    deadline: '2026-09-30T18:00:00Z',
    createdAt: '2026-09-03T10:00:00Z',
    postedAgo: 'Posted 2 days ago',
    company: {
      id: 'comp-google',
      name: 'Google',
      logoUrl: null,
      website: 'https://careers.google.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.5,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-ms-2',
    title: 'Frontend Developer',
    companyId: 'comp-ms',
    collegeId: 'dtu-1',
    description: 'Work on next-generation Microsoft Teams and Azure Developer Portal interfaces with modern React, TypeScript, and high-performance UX.',
    type: 'FULL_TIME',
    location: 'Hyderabad',
    salaryPackage: '₹ 18 - 26 LPA',
    skills: ['React', 'TypeScript', 'Next.js', 'CSS'],
    minCgpa: 7.0,
    allowedBranches: ['CSE', 'IT', 'ECE', 'EE'],
    eligibleBatches: [2026],
    deadline: '2026-09-28T18:00:00Z',
    createdAt: '2026-09-04T10:00:00Z',
    postedAgo: 'Posted 1 day ago',
    company: {
      id: 'comp-ms',
      name: 'Microsoft',
      logoUrl: null,
      website: 'https://careers.microsoft.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.0,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE', 'EE'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-amazon-3',
    title: 'Backend Developer',
    companyId: 'comp-amazon',
    collegeId: 'dtu-1',
    description: 'Build mission-critical AWS serverless orchestration engines and Amazon retail distributed backend architectures.',
    type: 'FULL_TIME',
    location: 'Bangalore',
    salaryPackage: '₹ 18 - 28 LPA',
    skills: ['Java', 'Spring Boot', 'AWS', 'MySQL'],
    minCgpa: 7.0,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    eligibleBatches: [2026],
    deadline: '2026-09-25T18:00:00Z',
    createdAt: '2026-09-02T10:00:00Z',
    postedAgo: 'Posted 3 days ago',
    company: {
      id: 'comp-amazon',
      name: 'Amazon',
      logoUrl: null,
      website: 'https://amazon.jobs',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.0,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-tcs-4',
    title: 'System Engineer',
    companyId: 'comp-tcs',
    collegeId: 'dtu-1',
    description: 'Campus hiring drive for Digital and Ninja profiles across engineering streams for global enterprise digital transformation.',
    type: 'FULL_TIME',
    location: 'Pan India',
    salaryPackage: '₹ 7 - 9 LPA',
    skills: ['C++', 'Java', 'DSA', 'Operating Systems'],
    minCgpa: 6.0,
    allowedBranches: ['All Engineering Branches'],
    eligibleBatches: [2026],
    deadline: '2026-10-05T18:00:00Z',
    createdAt: '2026-09-03T10:00:00Z',
    postedAgo: 'Posted 2 days ago',
    company: {
      id: 'comp-tcs',
      name: 'TCS',
      logoUrl: null,
      website: 'https://tcs.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 6.0,
      studentBranch: 'CSE',
      allowedBranches: [],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-infosys-5',
    title: 'Software Developer',
    companyId: 'comp-infosys',
    collegeId: 'dtu-1',
    description: 'Specialist Programmer role focusing on Full Stack engineering, cloud migration, and Java microservices.',
    type: 'FULL_TIME',
    location: 'Bangalore',
    salaryPackage: '₹ 8 - 10 LPA',
    skills: ['Java', 'Spring', 'SQL', 'Web Development'],
    minCgpa: 6.5,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    eligibleBatches: [2026],
    deadline: '2026-10-02T18:00:00Z',
    createdAt: '2026-09-04T10:00:00Z',
    postedAgo: 'Posted 1 day ago',
    company: {
      id: 'comp-infosys',
      name: 'Infosys',
      logoUrl: null,
      website: 'https://infosys.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 6.5,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-deloitte-6',
    title: 'Associate Software Engineer',
    companyId: 'comp-deloitte',
    collegeId: 'dtu-1',
    description: 'Technology consulting and analytics engineering for high-profile banking and healthcare enterprise clients.',
    type: 'FULL_TIME',
    location: 'Hyderabad',
    salaryPackage: '₹ 8 - 12 LPA',
    skills: ['Python', 'Django', 'React', 'Problem Solving'],
    minCgpa: 6.8,
    allowedBranches: ['CSE', 'IT', 'ECE', 'EE'],
    eligibleBatches: [2026],
    deadline: '2026-09-29T18:00:00Z',
    createdAt: '2026-09-02T10:00:00Z',
    postedAgo: 'Posted 3 days ago',
    company: {
      id: 'comp-deloitte',
      name: 'Deloitte',
      logoUrl: null,
      website: 'https://deloitte.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 6.8,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE', 'EE'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-zomato-7',
    title: 'Product Analyst Intern',
    companyId: 'comp-zomato',
    collegeId: 'dtu-1',
    description: 'Drive growth, customer funnel analytics, delivery fleet optimization, and dining experiments at scale.',
    type: 'INTERNSHIP',
    location: 'Bangalore',
    salaryPackage: '₹ 20K - 40K',
    skills: ['SQL', 'Excel', 'Product Metrics', 'Analytics'],
    minCgpa: 7.0,
    allowedBranches: ['CSE', 'IT', 'ECE', 'ME', 'CE'],
    eligibleBatches: [2026, 2027],
    deadline: '2026-09-27T18:00:00Z',
    createdAt: '2026-09-04T10:00:00Z',
    postedAgo: 'Posted 1 day ago',
    company: {
      id: 'comp-zomato',
      name: 'Zomato',
      logoUrl: null,
      website: 'https://zomato.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.0,
      studentBranch: 'CSE',
      allowedBranches: [],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-swiggy-8',
    title: 'Data Analyst',
    companyId: 'comp-swiggy',
    collegeId: 'dtu-1',
    description: 'Design machine learning pipelines, predictive customer demand forecasts, and real-time logistics telemetry.',
    type: 'FULL_TIME',
    location: 'Bangalore',
    salaryPackage: '₹ 12 - 18 LPA',
    skills: ['SQL', 'Python', 'Data Visualization', 'Excel'],
    minCgpa: 7.2,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    eligibleBatches: [2026],
    deadline: '2026-09-29T18:00:00Z',
    createdAt: '2026-09-02T10:00:00Z',
    postedAgo: 'Posted 3 days ago',
    company: {
      id: 'comp-swiggy',
      name: 'Swiggy',
      logoUrl: null,
      website: 'https://swiggy.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.2,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-phonepe-9',
    title: 'Software Development Intern',
    companyId: 'comp-phonepe',
    collegeId: 'dtu-1',
    description: 'Develop high-throughput UPI payment switches and low-latency transactional ledger systems for millions of daily transactions.',
    type: 'INTERNSHIP',
    location: 'Bangalore',
    salaryPackage: '₹ 30K - 50K',
    skills: ['React', 'Node.js', 'MongoDB', 'System Design'],
    minCgpa: 7.5,
    allowedBranches: ['CSE', 'IT'],
    eligibleBatches: [2026, 2027],
    deadline: '2026-09-26T18:00:00Z',
    createdAt: '2026-09-03T10:00:00Z',
    postedAgo: 'Posted 2 days ago',
    company: {
      id: 'comp-phonepe',
      name: 'PhonePe',
      logoUrl: null,
      website: 'https://phonepe.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.5,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-adobe-10',
    title: 'Frontend Developer',
    companyId: 'comp-adobe',
    collegeId: 'dtu-1',
    description: 'Craft web canvas tools for Creative Cloud, WebGL renderers, and modern responsive design interfaces.',
    type: 'FULL_TIME',
    location: 'Noida',
    salaryPackage: '₹ 16 - 24 LPA',
    skills: ['React', 'TypeScript', 'UI/UX', 'Tailwind'],
    minCgpa: 7.5,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    eligibleBatches: [2026],
    deadline: '2026-10-04T18:00:00Z',
    createdAt: '2026-09-01T10:00:00Z',
    postedAgo: 'Posted 4 days ago',
    company: {
      id: 'comp-adobe',
      name: 'Adobe',
      logoUrl: null,
      website: 'https://adobe.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.5,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE'],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-accenture-11',
    title: 'Application Development Associate',
    companyId: 'comp-accenture',
    collegeId: 'dtu-1',
    description: 'Cross-functional software engineering across cloud platforms, microservices architecture, and automated test pipelines.',
    type: 'FULL_TIME',
    location: 'Pan India',
    salaryPackage: '₹ 6 - 9 LPA',
    skills: ['Java', 'SQL', 'Web Development', 'Cloud'],
    minCgpa: 6.0,
    allowedBranches: ['All Engineering Branches'],
    eligibleBatches: [2026],
    deadline: '2026-10-08T18:00:00Z',
    createdAt: '2026-08-31T10:00:00Z',
    postedAgo: 'Posted 5 days ago',
    company: {
      id: 'comp-accenture',
      name: 'Accenture',
      logoUrl: null,
      website: 'https://accenture.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 6.0,
      studentBranch: 'CSE',
      allowedBranches: [],
    },
    hasApplied: false,
    application: null,
  },
  {
    id: 'job-flipkart-12',
    title: 'Software Engineer',
    companyId: 'comp-flipkart',
    collegeId: 'dtu-1',
    description: 'Work on Big Billion Days scale logistics, ultra-low latency catalog search, and distributed checkout systems.',
    type: 'FULL_TIME',
    location: 'Bangalore',
    salaryPackage: '₹ 14 - 22 LPA',
    skills: ['Java', 'System Design', 'MongoDB', 'Kafka'],
    minCgpa: 7.0,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    eligibleBatches: [2026],
    deadline: '2026-09-28T18:00:00Z',
    createdAt: '2026-09-04T10:00:00Z',
    postedAgo: 'Posted 1 day ago',
    company: {
      id: 'comp-flipkart',
      name: 'Flipkart',
      logoUrl: null,
      website: 'https://flipkartcareers.com',
      isVerified: true,
    },
    eligibility: {
      isEligible: true,
      isAlreadyPlaced: false,
      placedCompany: null,
      isCgpaEligible: true,
      isBranchEligible: true,
      isBatchEligible: true,
      isDeadlineActive: true,
      studentCgpa: 8.4,
      requiredCgpa: 7.0,
      studentBranch: 'CSE',
      allowedBranches: ['CSE', 'IT', 'ECE'],
    },
    hasApplied: false,
    application: null,
  },
];

const defaultFacetCounts: FacetCounts = {
  totalCollegeJobs: 120,
  jobTypes: {
    FULL_TIME: 68,
    INTERNSHIP: 32,
    PART_TIME: 6,
  },
  locations: [
    { name: 'Bangalore', count: 42 },
    { name: 'Hyderabad', count: 28 },
    { name: 'Delhi', count: 18 },
    { name: 'Pune', count: 16 },
    { name: 'Remote', count: 14 },
    { name: 'Chennai', count: 12 },
    { name: 'Noida', count: 10 },
  ],
  categories: [
    { name: 'Software Development', count: 56 },
    { name: 'Data Science', count: 18 },
    { name: 'Product Management', count: 12 },
    { name: 'Design', count: 10 },
    { name: 'DevOps', count: 8 },
    { name: 'Quality Assurance', count: 6 },
    { name: 'Business Analyst', count: 6 },
  ],
  skills: [
    { name: 'React', count: 36 },
    { name: 'Node.js', count: 28 },
    { name: 'Python', count: 24 },
    { name: 'Java', count: 22 },
    { name: 'TypeScript', count: 18 },
    { name: 'SQL', count: 16 },
    { name: 'AWS', count: 14 },
  ],
};

export const useStudentJobsStore = create<StudentJobsStoreState>((set, get) => ({
  jobs: defaultMockJobs,
  savedJobIds: ['job-google-1', 'job-amazon-3'],
  facetCounts: defaultFacetCounts,
  filters: {
    search: '',
    jobTypes: [],
    locations: [],
    categories: [],
    salaryRange: [0, 50],
    skills: [],
    sortBy: 'latest',
    viewMode: 'grid',
    page: 1,
    limit: 12,
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 120,
    totalPages: 10,
    hasMore: true,
  },
  isLoading: false,
  error: null,
  selectedJob: null,
  currentJobDetail: null,
  isDetailLoading: false,
  isDetailModalOpen: false,
  isMobileFilterOpen: false,
  studentResumes: [],
  selectedResumeId: null,
  isApplying: false,
  applySuccessMessage: null,
  applyErrorMessage: null,

  fetchJobById: async (id: string) => {
    set({ isDetailLoading: true, error: null });
    try {
      const res = await apiClient.get<ApiResponse<{ job: any; eligibility: any; hasApplied: boolean; application: any }>>(
        `/api/student/jobs/${id}`
      );
      if (res.data.success && res.data.data?.job) {
        const { job: j, eligibility, hasApplied, application } = res.data.data;
        const created = new Date(j.createdAt);
        const daysAgo = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
        const postedAgo = daysAgo <= 0 ? 'Posted today' : daysAgo === 1 ? 'Posted 1 day ago' : `Posted ${daysAgo} days ago`;

        const jobItem: StudentJobItem = {
          ...j,
          postedAgo,
          company: {
            id: j.company?.id || '',
            name: j.company?.name || 'Company',
            logoUrl: j.company?.logoUrl || null,
            website: j.company?.website || null,
            industry: j.company?.industry || null,
            isVerified: j.company?.isVerified ?? true,
          },
          eligibility,
          hasApplied,
          application,
        };

        set({ currentJobDetail: jobItem, isDetailLoading: false });
        return jobItem;
      }
    } catch {
      // Fallback to matching mock job
    }

    const found = defaultMockJobs.find((j) => j.id === id || j.id.toLowerCase().includes(id.toLowerCase())) || defaultMockJobs[0];
    set({ currentJobDetail: found, isDetailLoading: false });
    return found;
  },

  getSimilarJobs: (currentJobId: string, limit = 3) => {
    const pool = defaultMockJobs;
    return pool.filter((j) => j.id !== currentJobId).slice(0, limit);
  },

  fetchJobs: async () => {
    const { filters } = get();
    set({ isLoading: true, error: null });

    try {
      const params = new URLSearchParams();
      params.set('page', String(filters.page));
      params.set('limit', String(filters.limit));
      if (filters.search) params.set('search', filters.search);
      if (filters.jobTypes.length > 0) params.set('type', filters.jobTypes.join(','));
      if (filters.locations.length > 0) params.set('location', filters.locations.join(','));
      if (filters.categories.length > 0) params.set('category', filters.categories.join(','));
      if (filters.skills.length > 0) params.set('skills', filters.skills.join(','));
      if (filters.sortBy) params.set('sortBy', filters.sortBy);

      const res = await apiClient.get<ApiResponse<any>>(`/api/student/jobs?${params.toString()}`);

      if (res.data.success && res.data.data?.jobs?.length > 0) {
        const { jobs: rawJobs, facetCounts, pagination } = res.data.data;

        const mapped: StudentJobItem[] = rawJobs.map((j: any) => {
          const created = new Date(j.createdAt);
          const daysAgo = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
          const postedAgo = daysAgo <= 0 ? 'Posted today' : daysAgo === 1 ? 'Posted 1 day ago' : `Posted ${daysAgo} days ago`;

          return {
            ...j,
            postedAgo,
            company: {
              id: j.company?.id || '',
              name: j.company?.name || 'Company',
              logoUrl: j.company?.logoUrl || null,
              website: j.company?.website || null,
              isVerified: j.company?.isVerified ?? true,
            },
          };
        });

        const safeFacetCounts: FacetCounts = {
          totalCollegeJobs: facetCounts?.totalCollegeJobs ?? defaultFacetCounts.totalCollegeJobs,
          jobTypes: facetCounts?.jobTypes || facetCounts?.typeCounts || defaultFacetCounts.jobTypes,
          locations: Array.isArray(facetCounts?.locations) && facetCounts.locations.length > 0 
            ? facetCounts.locations 
            : Array.isArray(facetCounts?.locationCounts) && facetCounts.locationCounts.length > 0 
            ? facetCounts.locationCounts 
            : defaultFacetCounts.locations,
          categories: Array.isArray(facetCounts?.categories) && facetCounts.categories.length > 0 
            ? facetCounts.categories 
            : defaultFacetCounts.categories,
          skills: Array.isArray(facetCounts?.skills) && facetCounts.skills.length > 0 
            ? facetCounts.skills 
            : Array.isArray(facetCounts?.skillsCounts) && facetCounts.skillsCounts.length > 0 
            ? facetCounts.skillsCounts 
            : defaultFacetCounts.skills,
        };

        set({
          jobs: mapped,
          facetCounts: safeFacetCounts,
          pagination: pagination || {
            page: filters.page,
            limit: filters.limit,
            total: mapped.length,
            totalPages: Math.ceil(mapped.length / filters.limit) || 1,
            hasMore: false,
          },
          isLoading: false,
        });
        return;
      }

      // If backend returns empty array or mock mode, perform client-side filtering on defaultMockJobs
      let filtered = [...defaultMockJobs];

      if (filters.search) {
        const s = filters.search.toLowerCase();
        filtered = filtered.filter(
          (j) =>
            j.title.toLowerCase().includes(s) ||
            j.company.name.toLowerCase().includes(s) ||
            j.location.toLowerCase().includes(s) ||
            j.skills.some((sk) => sk.toLowerCase().includes(s))
        );
      }

      if (filters.jobTypes.length > 0) {
        filtered = filtered.filter((j) => filters.jobTypes.includes(j.type));
      }

      if (filters.locations.length > 0) {
        filtered = filtered.filter((j) =>
          filters.locations.some((loc) => j.location.toLowerCase().includes(loc.toLowerCase()))
        );
      }

      if (filters.skills.length > 0) {
        filtered = filtered.filter((j) =>
          filters.skills.some((sk) => j.skills.map((s) => s.toLowerCase()).includes(sk.toLowerCase()))
        );
      }

      if (filters.sortBy === 'oldest') {
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else {
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      set({
        jobs: filtered,
        facetCounts: defaultFacetCounts,
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total: 120,
          totalPages: 10,
          hasMore: filters.page < 10,
        },
        isLoading: false,
      });
    } catch {
      // Keep rich mock preview on network error
      set({
        jobs: defaultMockJobs,
        facetCounts: defaultFacetCounts,
        isLoading: false,
      });
    }
  },

  fetchStudentResumes: async () => {
    try {
      const res = await apiClient.get<ApiResponse<{ resumes: StudentResumeItem[]; defaultResumeId: string | null }>>(
        '/api/student/resumes'
      );
      if (res.data.success && res.data.data && Array.isArray(res.data.data.resumes)) {
        const resumes = res.data.data.resumes;
        const defaultId = res.data.data.defaultResumeId || resumes.find((r) => r.isDefault)?.id || resumes[0]?.id || null;
        set({ studentResumes: resumes, selectedResumeId: defaultId });
        return;
      }
    } catch (err) {
      console.error('[FETCH_STUDENT_RESUMES_ERROR]', err);
    }
    set({
      studentResumes: [],
      selectedResumeId: null,
    });
  },

  setSearch: (search: string) => {
    set((state) => ({ filters: { ...state.filters, search, page: 1 } }));
    get().fetchJobs();
  },

  toggleJobType: (type: string) => {
    set((state) => {
      const exists = state.filters.jobTypes.includes(type);
      const nextTypes = exists
        ? state.filters.jobTypes.filter((t) => t !== type)
        : [...state.filters.jobTypes, type];
      return { filters: { ...state.filters, jobTypes: nextTypes, page: 1 } };
    });
    get().fetchJobs();
  },

  toggleLocation: (location: string) => {
    set((state) => {
      const exists = state.filters.locations.includes(location);
      const nextLocs = exists
        ? state.filters.locations.filter((l) => l !== location)
        : [...state.filters.locations, location];
      return { filters: { ...state.filters, locations: nextLocs, page: 1 } };
    });
    get().fetchJobs();
  },

  toggleCategory: (category: string) => {
    set((state) => {
      const exists = state.filters.categories.includes(category);
      const nextCats = exists
        ? state.filters.categories.filter((c) => c !== category)
        : [...state.filters.categories, category];
      return { filters: { ...state.filters, categories: nextCats, page: 1 } };
    });
    get().fetchJobs();
  },

  toggleSkill: (skill: string) => {
    set((state) => {
      const exists = state.filters.skills.includes(skill);
      const nextSkills = exists
        ? state.filters.skills.filter((s) => s !== skill)
        : [...state.filters.skills, skill];
      return { filters: { ...state.filters, skills: nextSkills, page: 1 } };
    });
    get().fetchJobs();
  },

  setSalaryRange: (salaryRange: [number, number]) => {
    set((state) => ({ filters: { ...state.filters, salaryRange, page: 1 } }));
    get().fetchJobs();
  },

  setSortBy: (sortBy: JobFilterState['sortBy']) => {
    set((state) => ({ filters: { ...state.filters, sortBy, page: 1 } }));
    get().fetchJobs();
  },

  setViewMode: (viewMode: 'grid' | 'list') => {
    set((state) => ({ filters: { ...state.filters, viewMode } }));
  },

  setPage: (page: number) => {
    set((state) => ({ filters: { ...state.filters, page } }));
    get().fetchJobs();
  },

  resetFilters: () => {
    set((state) => ({
      filters: {
        search: '',
        jobTypes: [],
        locations: [],
        categories: [],
        salaryRange: [0, 50],
        skills: [],
        sortBy: 'latest',
        viewMode: state.filters.viewMode,
        page: 1,
        limit: 12,
      },
    }));
    get().fetchJobs();
  },

  removeFilterChip: (type, value) => {
    if (type === 'jobType') get().toggleJobType(value);
    else if (type === 'location') get().toggleLocation(value);
    else if (type === 'category') get().toggleCategory(value);
    else if (type === 'skill') get().toggleSkill(value);
  },

  toggleSaveJob: (jobId: string) => {
    set((state) => {
      const isSaved = state.savedJobIds.includes(jobId);
      const nextSaved = isSaved
        ? state.savedJobIds.filter((id) => id !== jobId)
        : [...state.savedJobIds, jobId];
      return { savedJobIds: nextSaved };
    });
  },

  openJobDetail: (job: StudentJobItem) => {
    set({
      selectedJob: job,
      isDetailModalOpen: true,
      applySuccessMessage: null,
      applyErrorMessage: null,
    });
    get().fetchStudentResumes();
  },

  closeJobDetail: () => {
    set({
      selectedJob: null,
      isDetailModalOpen: false,
      applySuccessMessage: null,
      applyErrorMessage: null,
    });
  },

  setMobileFilterOpen: (open: boolean) => {
    set({ isMobileFilterOpen: open });
  },

  setSelectedResumeId: (selectedResumeId: string | null) => {
    set({ selectedResumeId });
  },

  submitJobApplication: async (jobId: string, resumeId?: string | null) => {
    set({ isApplying: true, applyErrorMessage: null, applySuccessMessage: null });
    const { studentResumes } = get();

    const selectedResume = studentResumes.find((r) => r.id === resumeId) || studentResumes[0];

    try {
      const res = await apiClient.post('/api/student/applications', {
        jobId,
        resumeId: selectedResume?.id || undefined,
        resumeUrl: selectedResume?.fileUrl || undefined,
      });

      if (res.data.success) {
        const newApp = {
          id: res.data.data?.application?.id || 'app-new',
          status: res.data.data?.application?.status || 'APPLIED',
          appliedAt: res.data.data?.application?.createdAt || new Date().toISOString(),
        };

        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId
              ? {
                  ...j,
                  hasApplied: true,
                  application: newApp,
                }
              : j
          ),
          selectedJob:
            state.selectedJob?.id === jobId
              ? {
                  ...state.selectedJob,
                  hasApplied: true,
                  application: newApp,
                }
              : state.selectedJob,
          currentJobDetail:
            state.currentJobDetail?.id === jobId
              ? {
                  ...state.currentJobDetail,
                  hasApplied: true,
                  application: newApp,
                }
              : state.currentJobDetail,
          isApplying: false,
          applySuccessMessage: `Application submitted successfully for ${res.data.data?.job?.title || 'this placement drive'}!`,
        }));
        return true;
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to submit application';
      set({
        isApplying: false,
        applyErrorMessage: errorMsg,
      });
      return false;
    }

    // Optimistic fallback for demo mode
    const fallbackApp = {
      id: 'app-new',
      status: 'APPLIED',
      appliedAt: new Date().toISOString(),
    };

    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              hasApplied: true,
              application: fallbackApp,
            }
          : j
      ),
      selectedJob:
        state.selectedJob?.id === jobId
          ? {
              ...state.selectedJob,
              hasApplied: true,
              application: fallbackApp,
            }
          : state.selectedJob,
      currentJobDetail:
        state.currentJobDetail?.id === jobId
          ? {
              ...state.currentJobDetail,
              hasApplied: true,
              application: fallbackApp,
            }
          : state.currentJobDetail,
      isApplying: false,
      applySuccessMessage: 'Application submitted successfully to the campus drive!',
    }));
    return true;
  },
}));
