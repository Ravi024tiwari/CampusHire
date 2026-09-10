'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ChevronRight } from 'lucide-react';
import { TopCollegeItem } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterTopCollegesCardProps {
  colleges: TopCollegeItem[];
}

export function RecruiterTopCollegesCard({ colleges }: RecruiterTopCollegesCardProps) {
  const items = colleges || [];

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between space-y-3 sm:space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
        <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0A2540] font-heading">
          Top Recruiting Colleges
        </h3>
        <Link
          href="/recruiter/colleges"
          className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5 cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {items.length > 0 ? (
        <>
          {/* Column Headers */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
            <span>College</span>
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="w-8 sm:w-10 text-right">Offers</span>
              <span className="w-18 sm:w-22 text-right">Placement Rate</span>
            </div>
          </div>

          {/* College List */}
          <div className="space-y-2 sm:space-y-2.5">
            {items.map((college) => (
              <div
                key={college.id}
                className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                {/* College Name & Logo */}
                <div className="flex items-center gap-2 min-w-0">
                  <span className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-slate-100 text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    {college.logo}
                  </span>
                  <span className="text-xs font-extrabold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                    {college.name}
                  </span>
                </div>

                {/* Metrics: Offers + Progress Bar */}
                <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                  <span className="w-8 sm:w-10 text-right text-xs font-black text-[#0A2540]">
                    {college.offers}
                  </span>

                  <div className="w-18 sm:w-22 flex items-center justify-end gap-1.5 sm:gap-2">
                    <span className="text-[11px] sm:text-xs font-black text-blue-700 w-7 sm:w-8 text-right">
                      {college.placementRate}%
                    </span>
                    <div className="w-9 sm:w-11 h-1.5 sm:h-2 rounded-full bg-slate-100 overflow-hidden shrink-0">
                      <div
                        style={{ width: `${college.placementRate}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="py-8 text-center space-y-2">
          <p className="text-xs font-bold text-slate-400">No college engagement data yet</p>
          <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
            Engage with colleges and post campus jobs to see real-time placement stats.
          </p>
        </div>
      )}

    </div>
  );
}

