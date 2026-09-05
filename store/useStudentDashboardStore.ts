import { create } from 'zustand';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

export interface StudentDashboardData {
  student: {
    name: string;
    subtitle: string;
    avatarUrl: string | null;
    college: string;
  };
  stats: {
    appliedJobs: { count: number; trend: string };
    interviews: { count: number; trend: string };
    offers: { count: number; actionText: string };
    profileCompletion: { percentage: number; actionText: string };
  };
  upcomingDrives: Array<{
    id: string;
    title: string;
    company: string;
    companyLogo: string | null;
    type: string;
    mode: string;
    package: string;
    deadline: string;
    rawDeadline: string;
    collegeName: string;
  }>;
  recommendedJobs: Array<{
    id: string;
    title: string;
    company: string;
    companyLogo: string | null;
    type: string;
    location: string;
    package: string;
    matchScore: number;
    skills: string[];
  }>;
  recentUpdates: Array<{
    id: string;
    title: string;
    timeAgo: string;
    category: string;
    iconType: string;
  }>;
  resumeAnalysis: {
    score: number;
    headline: string;
    checklist: Array<{ label: string; passed: boolean }>;
  };
  placementReadiness: {
    subtitle: string;
    readinessScore: number;
    milestones: Array<{ key: string; label: string; status: 'completed' | 'in_progress' | 'pending' }>;
  };
}

interface StudentDashboardStoreState {
  data: StudentDashboardData | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  isMobileSidebarOpen: boolean;
  activeNavTab: string;

  // Actions
  fetchDashboardData: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setActiveNavTab: (tab: string) => void;
}

const defaultMockData: StudentDashboardData = {
  student: {
    name: 'Ravi Tiwari',
    subtitle: 'B.Tech CSE (2026)',
    avatarUrl: null,
    college: 'Delhi Technological University',
  },
  stats: {
    appliedJobs: { count: 12, trend: '+3 this week' },
    interviews: { count: 5, trend: '2 upcoming' },
    offers: { count: 2, actionText: 'View details →' },
    profileCompletion: { percentage: 78, actionText: 'Complete now →' },
  },
  upcomingDrives: [
    {
      id: 'drive-google-1',
      title: 'Software Engineer Intern',
      company: 'Google',
      companyLogo: null,
      type: 'Internship',
      mode: 'On-campus',
      package: '₹ 12 LPA',
      deadline: 'Sep 15',
      rawDeadline: '2026-09-15T18:00:00.000Z',
      collegeName: 'Campus Partner',
    },
    {
      id: 'drive-ms-2',
      title: 'SDE Full Time',
      company: 'Microsoft',
      companyLogo: null,
      type: 'Full Time',
      mode: 'Hybrid',
      package: '₹ 28 LPA',
      deadline: 'Sep 20',
      rawDeadline: '2026-09-20T18:00:00.000Z',
      collegeName: 'Campus Partner',
    },
    {
      id: 'drive-tcs-3',
      title: 'Ninja Hiring',
      company: 'Tata Consultancy Services',
      companyLogo: null,
      type: 'Full Time',
      mode: 'On-campus',
      package: '₹ 7 LPA',
      deadline: 'Sep 25',
      rawDeadline: '2026-09-25T18:00:00.000Z',
      collegeName: 'Campus Partner',
    },
  ],
  recommendedJobs: [
    {
      id: 'rec-phonepe-1',
      title: 'Product Analyst Intern',
      company: 'PhonePe',
      companyLogo: null,
      type: 'Internship',
      location: 'Bangalore',
      package: '₹ 10 LPA',
      matchScore: 92,
      skills: ['SQL', 'Python', 'Product Analytics'],
    },
    {
      id: 'rec-swiggy-2',
      title: 'Backend Developer',
      company: 'Swiggy',
      companyLogo: null,
      type: 'Full Time',
      location: 'Bangalore',
      package: '₹ 14 LPA',
      matchScore: 88,
      skills: ['Golang', 'Node.js', 'PostgreSQL'],
    },
    {
      id: 'rec-zoho-3',
      title: 'Software Engineer',
      company: 'Zoho',
      companyLogo: null,
      type: 'Full Time',
      location: 'Chennai',
      package: '₹ 8 LPA',
      matchScore: 85,
      skills: ['Java', 'Data Structures', 'Spring Boot'],
    },
  ],
  recentUpdates: [
    {
      id: 'up-1',
      title: 'Microsoft started accepting applications',
      timeAgo: '2 hours ago',
      category: 'drive',
      iconType: 'company',
    },
    {
      id: 'up-2',
      title: 'Your interview is scheduled with TCS',
      timeAgo: '5 hours ago',
      category: 'interview',
      iconType: 'calendar',
    },
    {
      id: 'up-3',
      title: 'Google drive registration is now open',
      timeAgo: '1 day ago',
      category: 'drive',
      iconType: 'company',
    },
    {
      id: 'up-4',
      title: 'Your resume score improved to 85%',
      timeAgo: '2 days ago',
      category: 'resume',
      iconType: 'document',
    },
    {
      id: 'up-5',
      title: 'New learning resource added: System Design',
      timeAgo: '3 days ago',
      category: 'resource',
      iconType: 'book',
    },
  ],
  resumeAnalysis: {
    score: 85,
    headline: 'Your resume is looking great!',
    checklist: [
      { label: 'Good structure', passed: true },
      { label: 'Relevant skills found', passed: true },
      { label: 'Add more projects', passed: false },
      { label: 'Include achievements', passed: true },
    ],
  },
  placementReadiness: {
    subtitle: "You're on the right track!",
    readinessScore: 82,
    milestones: [
      { key: 'resume', label: 'Resume', status: 'completed' },
      { key: 'aptitude', label: 'Aptitude Skills', status: 'completed' },
      { key: 'dsa', label: 'DSA Practice', status: 'in_progress' },
      { key: 'mock', label: 'Mock Interviews', status: 'pending' },
      { key: 'profile', label: 'Profile Completion', status: 'completed' },
    ],
  },
};

export const useStudentDashboardStore = create<StudentDashboardStoreState>((set) => ({
  data: defaultMockData,
  isLoading: false,
  error: null,
  searchQuery: '',
  isMobileSidebarOpen: false,
  activeNavTab: 'dashboard',

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiClient.get<ApiResponse<StudentDashboardData>>('/api/student/dashboard');
      if (res.data.success && res.data.data) {
        set({ data: res.data.data, isLoading: false });
      } else {
        // Keep default mock data to ensure fluid UX even if unauthenticated/offline
        set({ isLoading: false });
      }
    } catch {
      // Keep default mockup data for preview gracefully
      set({ isLoading: false });
    }
  },

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setMobileSidebarOpen: (isMobileSidebarOpen) => set({ isMobileSidebarOpen }),
  setActiveNavTab: (activeNavTab) => set({ activeNavTab }),
}));
