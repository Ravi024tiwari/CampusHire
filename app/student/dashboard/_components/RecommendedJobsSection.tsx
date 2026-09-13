'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ChevronRight, 
  MapPin, 
  Banknote, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';

export function RecommendedJobsSection() {
  const { data } = useStudentDashboardStore();
  const recommended = data?.recommendedJobs || [];

  const getCompanyBrandLogo = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes('phonepe')) {
      return (
        <div className="h-10 w-10 rounded-2xl bg-[#5F259F] text-white p-2 flex items-center justify-center font-black text-sm shadow-2xs">
          पे
        </div>
      );
    }
    if (c.includes('swiggy')) {
      return (
        <div className="h-10 w-10 rounded-2xl bg-[#FC8019] text-white p-2 flex items-center justify-center font-black text-sm shadow-2xs">
          S
        </div>
      );
    }
    if (c.includes('zoho')) {
      return (
        <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center font-bold text-xs shadow-2xs">
          <div className="grid grid-cols-2 gap-0.5">
            <span className="h-2 w-2 bg-red-500 rounded-xs" />
            <span className="h-2 w-2 bg-green-500 rounded-xs" />
            <span className="h-2 w-2 bg-blue-500 rounded-xs" />
            <span className="h-2 w-2 bg-yellow-500 rounded-xs" />
          </div>
        </div>
      );
    }
    return (
      <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 p-2 flex items-center justify-center shadow-2xs">
        <Building2 className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-blue-600" />
          <h2 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
            Recommended for You
          </h2>
        </div>

        <Link
          href="/student/recommendations"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Recommended Jobs List */}
      <div className="space-y-3">
        {recommended.map((job) => (
          <Link
            key={job.id}
            href={`/student/jobs/${job.id}`}
            prefetch={true}
            className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200/80 hover:bg-slate-50/60 transition-all duration-200 group cursor-pointer block"
          >
            {/* Left: Brand + Details */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 group-hover:scale-105 transition-transform">
                {getCompanyBrandLogo(job.company)}
              </div>

              <div className="min-w-0 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0A2540] group-hover:text-blue-600 transition-colors truncate">
                  {job.title}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 truncate">
                  {job.company}
                </p>

                {/* Sub tags */}
                <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                  <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 border border-purple-200/70">
                    {job.type}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-slate-400" />
                    <span>{job.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Package + Match Score */}
            <div className="flex items-center gap-3 shrink-0 text-right pl-2">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-black text-[#0A2540] font-heading">
                  {job.package}
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-black text-emerald-700 border border-emerald-200">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>Match {job.matchScore}%</span>
                </span>
              </div>

              <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
