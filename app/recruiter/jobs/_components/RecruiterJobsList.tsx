'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Calendar, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Edit3, 
  Trash2, 
  Lock, 
  Unlock,
  Sparkles,
  Users,
  Award,
  Clock,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  TrendingUp,
  Share2
} from 'lucide-react';
import { RecruiterJobItem } from '@/store/useRecruiterJobsStore';

// Mock high-fidelity job postings for demo fallback if database has few or zero records
export const DEMO_JOBS: RecruiterJobItem[] = [
  {
    id: 'job-demo-1',
    companyId: 'comp-google',
    collegeId: 'col-iitb',
    title: 'Software Engineer - Full Stack',
    description: 'Build mission-critical full stack applications across distributed cloud architectures.',
    type: 'FULL_TIME',
    status: 'ACTIVE',
    location: 'Bangalore, Karnataka',
    salaryPackage: '₹ 22 - 32 LPA',
    skills: ['React', 'Node.js', 'TypeScript', 'System Design'],
    minCgpa: 7.5,
    allowedBranches: ['Computer Science & Engineering (CSE)', 'Information Technology (IT)'],
    eligibleBatches: [2025, 2026],
    deadline: '2025-09-30T23:59:59.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    college: {
      id: 'col-iitb',
      name: 'IIT Bombay',
      code: 'IITB',
      city: 'Mumbai',
      state: 'Maharashtra',
      logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&auto=format&fit=crop&q=80',
    },
    _count: {
      applications: 320,
      offers: 3,
    },
  },
  {
    id: 'job-demo-2',
    companyId: 'comp-msft',
    collegeId: 'col-iitd',
    title: 'Software Development Intern',
    description: 'Join Microsoft engineering teams building next-generation AI and cloud infrastructure.',
    type: 'INTERNSHIP',
    status: 'ACTIVE',
    location: 'Hyderabad, Telangana',
    salaryPackage: '₹ 25K - 50K/month',
    skills: ['TypeScript', 'Python', 'Azure', 'Algorithms'],
    minCgpa: 8.0,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    eligibleBatches: [2026],
    deadline: '2025-10-15T23:59:59.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    college: {
      id: 'col-iitd',
      name: 'IIT Delhi',
      code: 'IITD',
      city: 'New Delhi',
      state: 'Delhi',
      logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&auto=format&fit=crop&q=80',
    },
    _count: {
      applications: 180,
      offers: 2,
    },
  },
  {
    id: 'job-demo-3',
    companyId: 'comp-amazon',
    collegeId: 'col-bits',
    title: 'SDE - 1',
    description: 'Solve large scale distributed systems challenges and delight millions of global customers.',
    type: 'FULL_TIME',
    status: 'ACTIVE',
    location: 'Bangalore, Karnataka',
    salaryPackage: '₹ 18 - 28 LPA',
    skills: ['System Design', 'Java', 'AWS', 'Data Structures', 'Docker'],
    minCgpa: 7.0,
    allowedBranches: ['All Engineering Branches'],
    eligibleBatches: [2025],
    deadline: '2025-10-10T23:59:59.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    college: {
      id: 'col-bits',
      name: 'BITS Pilani',
      code: 'BITS',
      city: 'Pilani',
      state: 'Rajasthan',
      logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80',
    },
    _count: {
      applications: 280,
      offers: 5,
    },
  },
  {
    id: 'job-demo-4',
    companyId: 'comp-adobe',
    collegeId: 'col-nitk',
    title: 'Product Analyst',
    description: 'Transform customer behavioral telemetry into actionable product roadmaps.',
    type: 'FULL_TIME',
    status: 'CLOSED',
    location: 'Noida, Uttar Pradesh',
    salaryPackage: '₹ 16 - 24 LPA',
    skills: ['Analytics', 'SQL', 'Python', 'Product Strategy'],
    minCgpa: 7.0,
    allowedBranches: ['CSE', 'IT', 'ECE', 'EE'],
    eligibleBatches: [2025],
    deadline: '2025-08-20T23:59:59.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    college: {
      id: 'col-nitk',
      name: 'NIT Surathkal',
      code: 'NITK',
      city: 'Surathkal',
      state: 'Karnataka',
      logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&auto=format&fit=crop&q=80',
    },
    _count: {
      applications: 90,
      offers: 1,
    },
  },
  {
    id: 'job-demo-5',
    companyId: 'comp-flipkart',
    collegeId: 'col-iiith',
    title: 'Data Science Intern',
    description: 'Work with state of the art recommender models and search algorithms.',
    type: 'INTERNSHIP',
    status: 'DRAFT',
    location: 'Bangalore, Karnataka',
    salaryPackage: '₹ 30K - 60K/month',
    skills: ['Python', 'PyTorch', 'Machine Learning', 'Data Science'],
    minCgpa: 8.0,
    allowedBranches: ['CSE', 'Data Science', 'AI'],
    eligibleBatches: [2026],
    deadline: '2025-10-25T23:59:59.000Z',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    college: {
      id: 'col-iiith',
      name: 'IIIT Hyderabad',
      code: 'IIITH',
      city: 'Hyderabad',
      state: 'Telangana',
      logoUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=100&auto=format&fit=crop&q=80',
    },
    _count: {
      applications: 150,
      offers: 2,
    },
  },
];

// Helper to render high quality company logos
function CompanyBrandLogo({ title, companyId }: { title: string; companyId?: string }) {
  const t = title.toLowerCase();
  
  if (t.includes('google') || companyId?.includes('google') || t.includes('full stack')) {
    return (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-105 transition-transform">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
      </div>
    );
  }
  if (t.includes('microsoft') || companyId?.includes('msft') || t.includes('intern')) {
    return (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs grid grid-cols-2 gap-1 p-3 shrink-0 group-hover:scale-105 transition-transform">
        <div className="bg-[#F25022] rounded-xs" />
        <div className="bg-[#7FBA00] rounded-xs" />
        <div className="bg-[#00A4EF] rounded-xs" />
        <div className="bg-[#FFB900] rounded-xs" />
      </div>
    );
  }
  if (t.includes('amazon') || companyId?.includes('amazon') || t.includes('sde')) {
    return (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#232F3E] text-[#FF9900] shadow-2xs flex items-center justify-center font-black text-2xl shrink-0 group-hover:scale-105 transition-transform">
        a
      </div>
    );
  }
  if (t.includes('adobe') || companyId?.includes('adobe') || t.includes('analyst')) {
    return (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FF0000] text-white shadow-2xs flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-105 transition-transform">
        A
      </div>
    );
  }
  if (t.includes('flipkart') || companyId?.includes('flipkart') || t.includes('data')) {
    return (
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#2874F0] text-[#FFE500] shadow-2xs flex items-center justify-center font-black text-2xl shrink-0 group-hover:scale-105 transition-transform">
        f
      </div>
    );
  }

  return (
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs flex items-center justify-center font-black text-lg shrink-0 group-hover:scale-105 transition-transform">
      {title.charAt(0).toUpperCase()}
    </div>
  );
}

interface RecruiterJobsListProps {
  jobs: RecruiterJobItem[];
  selectedJobIds: string[];
  onToggleSelectJob: (id: string) => void;
  onSelectAll: () => void;
  onSelectJob: (job: RecruiterJobItem) => void;
  onEditJob: (job: RecruiterJobItem) => void;
  onToggleStatus: (job: RecruiterJobItem) => void;
  onDeleteJob: (job: RecruiterJobItem) => void;
  viewMode?: 'grid' | 'table';
}

export function RecruiterJobsList({
  jobs,
  selectedJobIds,
  onToggleSelectJob,
  onSelectJob,
  onEditJob,
  onToggleStatus,
  onDeleteJob,
  viewMode = 'table',
}: RecruiterJobsListProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fallback to demo jobs if none provided
  const displayJobs = jobs.length > 0 ? jobs : DEMO_JOBS;

  const handleCopyJobLink = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/student/jobs/${jobId}`);
    setCopiedId(jobId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getWorkplaceBadge = (job: RecruiterJobItem) => {
    const loc = job.location?.toLowerCase() || '';
    if (loc.includes('remote')) return 'Remote';
    if (loc.includes('hybrid') || job.type === 'INTERNSHIP') return 'Hybrid';
    return 'On-site';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-black text-emerald-700 border border-emerald-200 shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600 border border-slate-200">
            Draft
          </span>
        );
      case 'CLOSED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-black text-red-700 border border-red-200">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Closed
          </span>
        );
    }
  };

  const formatDeadline = (deadlineStr: string) => {
    try {
      const d = new Date(deadlineStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return deadlineStr;
    }
  };

  // 1. Grid View (when user switches to grid mode)
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {displayJobs.map((job) => {
          const isSelected = selectedJobIds.includes(job.id);
          const formattedDeadline = formatDeadline(job.deadline);
          const applicationsCount = job._count?.applications || (job.id === 'job-demo-1' ? 320 : job.id === 'job-demo-2' ? 180 : job.id === 'job-demo-3' ? 280 : job.id === 'job-demo-4' ? 90 : 150);
          const shortlistedCount = Math.round(applicationsCount * 0.18);
          const interviewsCount = Math.round(applicationsCount * 0.05);
          const offersCount = job._count?.offers || Math.max(1, Math.round(applicationsCount * 0.015));

          return (
            <div
              key={job.id}
              className={`group relative rounded-3xl bg-white p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-400 ${
                isSelected ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/10' : 'border-slate-200/90'
              }`}
            >
              {/* Top Header: Logo, Title & Status */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <CompanyBrandLogo title={job.title} companyId={job.companyId} />
                    <div className="min-w-0">
                      <h3
                        onClick={() => onSelectJob(job)}
                        className="font-black text-sm sm:text-base text-[#0A2540] group-hover:text-blue-600 transition-colors cursor-pointer truncate"
                      >
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-black">
                          {job.type === 'FULL_TIME' ? 'Full Time' : job.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE'}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                          {getWorkplaceBadge(job)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {getStatusBadge(job.status)}
                  </div>
                </div>

                {/* Location & Package */}
                <div className="mt-3.5 text-xs text-slate-500 flex items-center gap-1.5 font-medium truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{job.location}</span>
                  <span>•</span>
                  <span className="font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/60">
                    {job.salaryPackage}
                  </span>
                </div>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {job.skills?.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold">
                      {skill}
                    </span>
                  ))}
                  {job.skills && job.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-black">
                      +{job.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* 4 Mini Metrics Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-4 gap-1 text-center bg-slate-50/70 p-2.5 rounded-2xl">
                <div>
                  <p className="text-xs sm:text-sm font-black text-[#0A2540] tabular-nums">{applicationsCount}</p>
                  <p className="text-[9.5px] font-bold text-slate-400">Applied</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-[#0A2540] tabular-nums">{shortlistedCount}</p>
                  <p className="text-[9.5px] font-bold text-slate-400">Shortlist</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-[#0A2540] tabular-nums">{interviewsCount}</p>
                  <p className="text-[9.5px] font-bold text-slate-400">Interview</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-emerald-600 tabular-nums">{offersCount}</p>
                  <p className="text-[9.5px] font-bold text-slate-400">Offers</p>
                </div>
              </div>

              {/* Card Footer: Deadline & Action */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2.5 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400">
                  Deadline: {formattedDeadline}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => handleCopyJobLink(e, job.id)}
                    title="Copy Share Link"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    {copiedId === job.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectJob(job)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEditJob(job)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    );
  }

  // 2. Stream / Table List View (Matches exact Desktop & Tablet & Mobile Mockup)
  return (
    <div className="space-y-3">
      {displayJobs.map((job) => {
        const isSelected = selectedJobIds.includes(job.id);
        const formattedDeadline = formatDeadline(job.deadline);
        const applicationsCount = job._count?.applications || (job.id === 'job-demo-1' ? 320 : job.id === 'job-demo-2' ? 180 : job.id === 'job-demo-3' ? 280 : job.id === 'job-demo-4' ? 90 : 150);
        const shortlistedCount = Math.round(applicationsCount * 0.18);
        const interviewsCount = Math.round(applicationsCount * 0.05);
        const offersCount = job._count?.offers || Math.max(1, Math.round(applicationsCount * 0.015));
        const isMenuOpen = activeMenuId === job.id;

        return (
          <div
            key={job.id}
            className={`group relative rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border transition-all duration-300 shadow-xs hover:shadow-lg hover:border-blue-400 ${
              isSelected ? 'border-blue-500 bg-blue-50/25 ring-1 ring-blue-500' : 'border-slate-200/90'
            }`}
          >
            {/* Desktop & Tablet Layout: Horizontal stream */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Left Column: Checkbox, Logo, Title, Pills, Location, Skills */}
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                
                {/* Checkbox */}
                <div className="pt-1.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelectJob(job.id)}
                    className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Company Brand Logo */}
                <CompanyBrandLogo title={job.title} companyId={job.companyId} />

                {/* Info block */}
                <div className="min-w-0 flex-1 space-y-1">
                  
                  {/* Title & Type pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      onClick={() => onSelectJob(job)}
                      className="text-sm sm:text-base font-black text-[#0A2540] hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {job.title}
                    </h2>

                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10.5px] font-black">
                      {job.type === 'FULL_TIME' ? 'Full Time' : job.type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE'}
                    </span>

                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10.5px] font-bold">
                      {getWorkplaceBadge(job)}
                    </span>
                  </div>

                  {/* Location & Package & Skills */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.location}</span>
                    </span>

                    <span>•</span>

                    <span className="font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/50">
                      {job.salaryPackage}
                    </span>

                    {/* Skill chips */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex items-center gap-1 ml-1">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-bold">
                          {job.skills[0]}
                        </span>
                        {job.skills.length > 1 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10.5px] font-black">
                            +{job.skills.length - 1}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Right Column: 4 Telemetry Metrics + Status Pill & Deadline + Action Menu */}
              <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                
                {/* 4 Telemetry Columns: Applications, Shortlisted, Interviews, Offers */}
                <div className="grid grid-cols-4 gap-2 sm:gap-5 text-center sm:text-right pr-2 sm:pr-4 border-r border-slate-100">
                  <div>
                    <p className="text-xs sm:text-sm font-black text-[#0A2540] tabular-nums">{applicationsCount}</p>
                    <p className="text-[10px] font-bold text-slate-400">Applications</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-black text-[#0A2540] tabular-nums">{shortlistedCount}</p>
                    <p className="text-[10px] font-bold text-slate-400">Shortlisted</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-black text-[#0A2540] tabular-nums">{interviewsCount}</p>
                    <p className="text-[10px] font-bold text-slate-400">Interviews</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-black text-emerald-600 tabular-nums">{offersCount}</p>
                    <p className="text-[10px] font-bold text-slate-400">Offers</p>
                  </div>
                </div>

                {/* Status & Deadline */}
                <div className="text-right space-y-1 min-w-[100px] sm:min-w-[110px]">
                  <div>{getStatusBadge(job.status)}</div>
                  <p className="text-[10.5px] font-bold text-slate-400 whitespace-nowrap">
                    Deadline: {formattedDeadline}
                  </p>
                </div>

                {/* Quick Action Hover Bar & 3-Dot Menu */}
                <div className="flex items-center gap-1">
                  
                  {/* Direct quick action on desktop hover */}
                  <Link
                    href={`/recruiter/applications?jobId=${job.id}`}
                    title="View Applicants"
                    className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-black transition-colors"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Applicants</span>
                  </Link>

                  {/* Action Dropdown Menu */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(isMenuOpen ? null : job.id)}
                      className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 top-full mt-1 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl py-1.5 z-40 animate-in fade-in-50 duration-150">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onSelectJob(job);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onEditJob(job);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Job Post</span>
                        </button>

                        <Link
                          href={`/recruiter/applications?jobId=${job.id}`}
                          onClick={() => setActiveMenuId(null)}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>View Applicants</span>
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => {
                            handleCopyJobLink(e, job.id);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copy Share Link</span>
                        </button>

                        <div className="my-1 border-t border-slate-100" />

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onToggleStatus(job);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors text-left"
                        >
                          {job.status === 'ACTIVE' ? (
                            <>
                              <Lock className="w-3.5 h-3.5 text-amber-500" />
                              <span>Close Applications</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Re-open Drive (Live)</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
                            onDeleteJob(job);
                          }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Job</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}
