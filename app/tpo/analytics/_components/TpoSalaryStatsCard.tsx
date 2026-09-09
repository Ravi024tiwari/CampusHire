'use client';

import React from 'react';
import { DollarSign, Briefcase, TrendingUp, Building2, UserPlus, Sparkles } from 'lucide-react';

interface SalaryStats {
  average: string;
  highest: string;
  median: string;
}

interface RecruiterEngagement {
  totalRecruiters: number;
  firstTimeRecruiters: number;
}

interface TpoSalaryStatsCardProps {
  salaryStats?: SalaryStats;
  recruiterEngagement?: RecruiterEngagement;
}

export function TpoSalaryStatsCard({
  salaryStats,
  recruiterEngagement,
}: TpoSalaryStatsCardProps) {
  const stats = salaryStats || {
    average: 'N/A',
    highest: 'N/A',
    median: 'N/A',
  };

  const engagement = recruiterEngagement || {
    totalRecruiters: 0,
    firstTimeRecruiters: 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* 1. Placement Statistics Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4">
        <div className="pb-1 border-b border-slate-100">
          <h3 className="text-base font-bold text-[#0A2540] font-heading">
            Placement Statistics
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Key compensation metrics and salary benchmarks
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {/* Average Package */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-[#0A2540] font-heading block leading-tight">
                  {stats.average}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Average Package
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>Real DB</span>
            </div>
          </div>

          {/* Highest Package */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-purple-700 font-heading block leading-tight">
                  {stats.highest}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Highest Package
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span>Top CTC</span>
            </div>
          </div>

          {/* Median Package */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black text-[#0A2540] font-heading block leading-tight">
                  {stats.median}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Median Package
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              <span>Benchmark</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recruiter Engagement Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4 flex flex-col justify-between">
        <div className="pb-1 border-b border-slate-100">
          <h3 className="text-base font-bold text-[#0A2540] font-heading">
            Recruiter Engagement
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Corporate partnership expansion and employer participation
          </p>
        </div>

        <div className="space-y-3 pt-1">
          {/* Total Recruiters */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-black text-[#0A2540] font-heading block leading-tight">
                  {engagement.totalRecruiters}
                </span>
                <span className="text-xs font-semibold text-slate-500 block">
                  Total Active Campus Recruiters
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>Active</span>
            </div>
          </div>

          {/* First Time Recruiters */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-black text-[#0A2540] font-heading block leading-tight">
                  {engagement.firstTimeRecruiters}
                </span>
                <span className="text-xs font-semibold text-slate-500 block">
                  First Time Campus Recruiters
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
              <span>New</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

