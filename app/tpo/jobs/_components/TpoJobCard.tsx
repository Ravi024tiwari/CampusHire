'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Building2,
  DollarSign
} from 'lucide-react';

export interface TpoJobItem {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  location: string;
  salaryPackage: string;
  skills: string[];
  minCgpa: number;
  allowedBranches: string[];
  eligibleBatches: number[];
  deadline: string;
  createdAt: string;
  updatedAt: string;
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    website?: string | null;
    industry?: string | null;
    location?: string | null;
    isVerified?: boolean;
  };
  totalApplications: number;
  totalOffers: number;
  isClosingSoon: boolean;
  daysRemaining: number;
  hasExpired: boolean;
}

interface TpoJobCardProps {
  job: TpoJobItem;
  onViewDetails?: (job: TpoJobItem) => void;
}

// Company Logo & Stylized Badge Renderer
export function CompanyBrandLogo({
  name,
  logoUrl,
  size = 'md',
}: {
  name: string;
  logoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-sm sm:text-base',
    lg: 'w-14 h-14 rounded-2xl text-lg',
  }[size];

  const clean = (name || '').toLowerCase().trim();

  if (logoUrl) {
    return (
      <div className={`${sizeClasses} bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden`}>
        <img
          src={logoUrl}
          alt={name}
          className="w-full h-full object-contain rounded-md"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Pre-designed iconic brand representations
  if (clean.includes('google')) {
    return (
      <div className={`${sizeClasses} bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 font-bold`}>
        <span className="text-[#4285F4]">G</span>
      </div>
    );
  }

  if (clean.includes('microsoft')) {
    return (
      <div className={`${sizeClasses} bg-white border border-slate-200 shadow-2xs grid grid-cols-2 gap-0.5 p-2 sm:p-2.5 shrink-0`}>
        <div className="bg-[#F25022] rounded-[1px]" />
        <div className="bg-[#7FBA00] rounded-[1px]" />
        <div className="bg-[#00A4EF] rounded-[1px]" />
        <div className="bg-[#FFB900] rounded-[1px]" />
      </div>
    );
  }

  if (clean.includes('amazon')) {
    return (
      <div className={`${sizeClasses} bg-[#131921] text-[#FF9900] font-black flex items-center justify-center shrink-0 shadow-2xs`}>
        a
      </div>
    );
  }

  if (clean.includes('adobe')) {
    return (
      <div className={`${sizeClasses} bg-[#FA0F00] text-white font-black flex items-center justify-center shrink-0 shadow-2xs font-serif`}>
        A
      </div>
    );
  }

  if (clean.includes('infosys')) {
    return (
      <div className={`${sizeClasses} bg-[#007CC3] text-white font-extrabold flex items-center justify-center shrink-0 shadow-2xs text-[11px] sm:text-xs`}>
        infy
      </div>
    );
  }

  if (clean.includes('tcs') || clean.includes('tata consultancy')) {
    return (
      <div className={`${sizeClasses} bg-[#E31837] text-white font-black flex items-center justify-center shrink-0 shadow-2xs text-[11px] sm:text-xs`}>
        tcs
      </div>
    );
  }

  // Elegant fallback with company initial
  const initial = (name || 'C').charAt(0).toUpperCase();
  const colors = [
    'bg-blue-600 text-white',
    'bg-indigo-600 text-white',
    'bg-emerald-600 text-white',
    'bg-purple-600 text-white',
    'bg-amber-600 text-white',
  ];
  const charCode = (name || 'A').charCodeAt(0);
  const color = colors[charCode % colors.length];

  return (
    <div className={`${sizeClasses} ${color} font-bold flex items-center justify-center shrink-0 shadow-2xs tracking-wider`}>
      {initial}
    </div>
  );
}

export function TpoJobCard({ job, onViewDetails }: TpoJobCardProps) {
  // Format deadline date e.g. "Sep 30, 2025"
  const formattedDeadline = job.deadline
    ? new Date(job.deadline).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No deadline';

  // Format job type label
  const formatJobType = (type: string) => {
    switch (type) {
      case 'FULL_TIME':
        return 'Full Time';
      case 'INTERNSHIP':
        return 'Internship';
      case 'INTERN_PLUS_FTE':
        return 'Intern + FTE';
      default:
        return type;
    }
  };

  // Branch string formatting (e.g. "CSE, IT, ECE +2" or "All Branches")
  const formatBranches = (branches: string[]) => {
    if (!branches || branches.length === 0) return 'All Branches';
    if (branches.length <= 3) return branches.join(', ');
    return `${branches.slice(0, 3).join(', ')} +${branches.length - 3}`;
  };

  // Batch string formatting (e.g. "2025, 2026")
  const formatBatches = (batches: number[]) => {
    if (!batches || batches.length === 0) return 'All Batches';
    return batches.join(', ');
  };

  // Status Badge Logic
  const getStatusBadge = () => {
    if (job.hasExpired || job.status === 'CLOSED') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
          Closed
        </span>
      );
    }
    if (job.isClosingSoon) {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Closing Soon
        </span>
      );
    }
    if (job.status === 'PENDING_APPROVAL') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200/80">
          Pending Approval
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Open
      </span>
    );
  };

  return (
    <div className="group bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left Section: Company Logo + Title + Company Name + Metadata */}
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
        {/* Company Avatar */}
        <CompanyBrandLogo name={job.company.name} logoUrl={job.company.logoUrl} size="md" />

        {/* Content Info */}
        <div className="min-w-0 flex-1 space-y-1.5">
          {/* Title & Company Name */}
          <div className="flex items-start sm:items-center justify-between gap-2">
            <div>
              <Link
                href={`/tpo/jobs/${job.id}`}
                className="text-sm sm:text-base font-bold text-[#0A2540] group-hover:text-[#2563EB] hover:underline transition-colors leading-tight line-clamp-1 block"
              >
                {job.title}
              </Link>
              <p className="text-xs font-semibold text-slate-500 mt-0.5 flex items-center gap-1.5">
                <span>{job.company.name}</span>
                {job.salaryPackage && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md text-[11px]">
                      {job.salaryPackage}
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Mobile Status Badge on top-right */}
            <div className="sm:hidden shrink-0">
              {getStatusBadge()}
            </div>
          </div>

          {/* Metadata Badges Row */}
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-500 pt-0.5 font-medium">
            {/* Job Type */}
            <div className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatJobType(job.type)}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-[160px]">{job.location}</span>
            </div>

            {/* Branches */}
            <div className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatBranches(job.allowedBranches)}</span>
            </div>

            {/* Batches */}
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatBatches(job.eligibleBatches)}</span>
            </div>

            {/* Apply By Deadline */}
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Apply by {formattedDeadline}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Status Badge (Desktop) + View Details Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Desktop Status Badge */}
        <div className="hidden sm:block shrink-0">
          {getStatusBadge()}
        </div>

        {/* View Details CTA linking to /tpo/jobs/[id] */}
        <Link
          href={`/tpo/jobs/${job.id}`}
          className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#2563EB] bg-blue-50/70 hover:bg-[#2563EB] hover:text-white border border-blue-200/80 transition-all duration-200 shadow-2xs hover:shadow-sm active:scale-95 flex items-center justify-center gap-1"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
