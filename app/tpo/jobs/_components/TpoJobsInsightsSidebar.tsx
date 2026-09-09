'use client';

import React from 'react';
import { CompanyBrandLogo } from './TpoJobCard';
import { 
  TrendingUp, 
  Building2, 
  Briefcase, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarInsights {
  breakdown: {
    open: number;
    closingSoon: number;
    internships: number;
    fullTime: number;
  };
  topRecruitingCompanies: {
    id: string;
    name: string;
    logoUrl?: string | null;
    jobsCount: number;
  }[];
  popularJobRoles: {
    role: string;
    count: number;
  }[];
  recentPostings: {
    id: string;
    title: string;
    createdAt: string;
    company: {
      id: string;
      name: string;
      logoUrl?: string | null;
    };
  }[];
}

interface TpoJobsInsightsSidebarProps {
  insights: SidebarInsights;
  totalJobs: number;
  onSelectCompany?: (companyId: string) => void;
  onSelectRole?: (role: string) => void;
  onViewAllJobs?: () => void;
}

export function TpoJobsInsightsSidebar({
  insights,
  totalJobs,
  onSelectCompany,
  onSelectRole,
  onViewAllJobs,
}: TpoJobsInsightsSidebarProps) {
  const { breakdown, topRecruitingCompanies, popularJobRoles, recentPostings } = insights;

  // Donut chart calculations
  const total = breakdown.open + breakdown.closingSoon + breakdown.internships + breakdown.fullTime || 1;
  const pOpen = (breakdown.open / total) * 100;
  const pClosing = (breakdown.closingSoon / total) * 100;
  const pIntern = (breakdown.internships / total) * 100;
  const pFull = (breakdown.fullTime / total) * 100;

  // Compute SVG stroke-dasharray/dashoffset for clean donut
  const circumference = 2 * Math.PI * 36; // radius 36
  const strokeOpen = (pOpen / 100) * circumference;
  const strokeClosing = (pClosing / 100) * circumference;
  const strokeIntern = (pIntern / 100) * circumference;
  const strokeFull = (pFull / 100) * circumference;

  // Helper for relative time e.g. "2 hours ago"
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-4">
      {/* 1. Job Insights Donut Chart Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#0A2540] font-heading">
            Job Insights
          </h3>
          <span className="text-[11px] font-semibold text-slate-400">Campus Distribution</span>
        </div>

        {/* Donut Chart & Center Counter */}
        <div className="flex items-center gap-5">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#F1F5F9"
                strokeWidth="12"
              />
              {/* Open (Teal / Emerald) */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="12"
                strokeDasharray={`${strokeOpen} ${circumference}`}
                strokeDashoffset="0"
                className="transition-all duration-700 ease-out"
              />
              {/* Closing Soon (Amber) */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#F59E0B"
                strokeWidth="12"
                strokeDasharray={`${strokeClosing} ${circumference}`}
                strokeDashoffset={`${-strokeOpen}`}
                className="transition-all duration-700 ease-out"
              />
              {/* Internships (Sky / Blue) */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#0EA5E9"
                strokeWidth="12"
                strokeDasharray={`${strokeIntern} ${circumference}`}
                strokeDashoffset={`${-(strokeOpen + strokeClosing)}`}
                className="transition-all duration-700 ease-out"
              />
              {/* Full Time (Indigo / Deep Blue) */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="transparent"
                stroke="#6366F1"
                strokeWidth="12"
                strokeDasharray={`${strokeFull} ${circumference}`}
                strokeDashoffset={`${-(strokeOpen + strokeClosing + strokeIntern)}`}
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Inner text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-[#0A2540] font-heading leading-none">
                {totalJobs}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
                Total Jobs
              </span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="flex-1 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                <span className="font-medium text-slate-600">Open</span>
              </div>
              <span className="font-bold text-[#0A2540]">{breakdown.open}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0" />
                <span className="font-medium text-slate-600">Closing Soon</span>
              </div>
              <span className="font-bold text-[#0A2540]">{breakdown.closingSoon}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0EA5E9] shrink-0" />
                <span className="font-medium text-slate-600">Internships</span>
              </div>
              <span className="font-bold text-[#0A2540]">{breakdown.internships}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6366F1] shrink-0" />
                <span className="font-medium text-slate-600">Full Time</span>
              </div>
              <span className="font-bold text-[#0A2540]">{breakdown.fullTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Recruiting Companies Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-[#0A2540] font-heading">
            Top Recruiting Companies
          </h3>
          <button
            onClick={onViewAllJobs}
            className="text-xs font-semibold text-[#2563EB] hover:text-blue-800 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-2.5">
          {topRecruitingCompanies.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">No recruiting companies yet</p>
          ) : (
            topRecruitingCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => onSelectCompany?.(company.id)}
                className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <CompanyBrandLogo name={company.name} logoUrl={company.logoUrl} size="sm" />
                  <span className="text-xs font-bold text-slate-700 group-hover:text-[#2563EB] transition-colors truncate">
                    {company.name}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0 group-hover:bg-blue-50 group-hover:text-[#2563EB] transition-colors">
                  {company.jobsCount} {company.jobsCount === 1 ? 'job' : 'jobs'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 3. Popular Job Roles Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-[#0A2540] font-heading">
            Popular Job Roles
          </h3>
        </div>

        <div className="space-y-2">
          {popularJobRoles.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">No job roles recorded</p>
          ) : (
            popularJobRoles.map((roleItem, idx) => (
              <div
                key={idx}
                onClick={() => onSelectRole?.(roleItem.role)}
                className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="text-xs font-semibold text-slate-700 group-hover:text-[#2563EB] transition-colors truncate mr-2">
                  {roleItem.role}
                </span>
                <span className="text-xs font-bold text-slate-500 shrink-0">
                  {roleItem.count}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 4. Recent Job Postings Card */}
      {recentPostings && recentPostings.length > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold text-[#0A2540] font-heading">
              Recent Job Postings
            </h3>
            <button
              onClick={onViewAllJobs}
              className="text-xs font-semibold text-[#2563EB] hover:text-blue-800 transition-colors"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentPostings.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-start gap-2.5">
                <CompanyBrandLogo name={item.company.name} logoUrl={item.company.logoUrl} size="sm" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    <span className="font-semibold text-slate-600">{item.company.name}</span> • {timeAgo(item.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
