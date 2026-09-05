'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Banknote,
  ArrowUpRight
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';

export function UpcomingDrivesSection() {
  const { data } = useStudentDashboardStore();
  const drives = data?.upcomingDrives || [];

  // Helper for brand fallback icons
  const getBrandLogo = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes('google')) {
      return (
        <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center font-black text-lg shadow-2xs">
          <span className="text-blue-600">G</span>
        </div>
      );
    }
    if (c.includes('microsoft')) {
      return (
        <div className="h-10 w-10 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center font-black text-xs shadow-2xs">
          <div className="grid grid-cols-2 gap-0.5">
            <span className="h-2 w-2 bg-red-500 rounded-xs" />
            <span className="h-2 w-2 bg-emerald-500 rounded-xs" />
            <span className="h-2 w-2 bg-blue-500 rounded-xs" />
            <span className="h-2 w-2 bg-amber-500 rounded-xs" />
          </div>
        </div>
      );
    }
    if (c.includes('tata') || c.includes('tcs')) {
      return (
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-800 text-white p-2 flex items-center justify-center font-black text-[11px] shadow-2xs">
          TCS
        </div>
      );
    }
    return (
      <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 p-2 flex items-center justify-center shadow-2xs">
        <Building2 className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
      
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
            Upcoming Drives
          </h2>
        </div>

        <Link
          href="/student/drives"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Drives Items List */}
      <div className="space-y-3">
        {drives.map((drive) => (
          <div
            key={drive.id}
            className="flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200/80 hover:bg-slate-50/60 transition-all duration-200 group cursor-pointer"
          >
            {/* Left: Logo + Title + Tags */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 group-hover:scale-105 transition-transform">
                {drive.companyLogo ? (
                  <img
                    src={drive.companyLogo}
                    alt={drive.company}
                    className="h-10 w-10 rounded-2xl object-contain bg-white border border-slate-200 p-1"
                  />
                ) : (
                  getBrandLogo(drive.company)
                )}
              </div>

              <div className="min-w-0 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0A2540] group-hover:text-blue-600 transition-colors truncate">
                  {drive.title}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 truncate">
                  {drive.company}
                </p>

                {/* Sub Tags */}
                <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200/70">
                    {drive.type}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {drive.mode}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: CTC & Deadline + Chevron */}
            <div className="flex items-center gap-3 shrink-0 text-right pl-2">
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-black text-[#0A2540] font-heading">
                  {drive.package}
                </p>
                <p className="text-[10.5px] font-semibold text-slate-400">
                  {drive.deadline}
                </p>
              </div>

              <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
