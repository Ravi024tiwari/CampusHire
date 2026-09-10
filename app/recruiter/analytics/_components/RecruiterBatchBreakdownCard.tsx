'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ChevronRight } from 'lucide-react';
import { BatchYearItem } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterBatchBreakdownCardProps {
  batchYears: BatchYearItem[];
}

export function RecruiterBatchBreakdownCard({ batchYears }: RecruiterBatchBreakdownCardProps) {
  const batchItems = batchYears || [];

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between space-y-3 sm:space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
        <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0A2540] font-heading">
          Placement by Batch Year
        </h3>
        <Link
          href="/recruiter/applications"
          className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-0.5 cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Column Headers */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
        <span>Batch</span>
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="w-8 sm:w-10 text-right">Offers</span>
          <span className="w-8 sm:w-10 text-right">Placed</span>
          <span className="w-16 sm:w-20 text-right">Rate</span>
        </div>
      </div>

      {/* Batch Rows */}
      <div className="space-y-2 sm:space-y-2.5">
        {batchItems.map((batch) => (
          <div
            key={batch.batchYear}
            className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            {/* Year */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <GraduationCap className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {batch.batchYear}
              </span>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              <span className="w-8 sm:w-10 text-right text-xs font-bold text-slate-600">
                {batch.offers}
              </span>
              <span className="w-8 sm:w-10 text-right text-xs font-black text-[#0A2540]">
                {batch.placed}
              </span>

              <div className="w-16 sm:w-20 flex items-center justify-end gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-black text-blue-700 w-7 sm:w-8 text-right">
                  {batch.placementRate}%
                </span>
                <div className="w-7 sm:w-10 h-1.5 sm:h-2 rounded-full bg-slate-100 overflow-hidden shrink-0">
                  <div
                    style={{ width: `${batch.placementRate}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
