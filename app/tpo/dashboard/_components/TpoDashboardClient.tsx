'use client';

import React, { useEffect } from 'react';
import { useTpoStore } from '@/store/useTpoStore';
import { useAuthStore } from '@/store/useAuthStore';
import { TpoKpiCards } from './TpoKpiCards';
import { PlacementTrendChart } from './PlacementTrendChart';
import { PlacementStatsDonut } from './PlacementStatsDonut';
import { RecentJobsTable } from './RecentJobsTable';
import { RecentApplicationsList } from './RecentApplicationsList';
import { TopRecruitersRow } from './TopRecruitersRow';
import { TpoQuickActionBar } from './TpoQuickActionBar';
import { Calendar, ChevronDown, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export function TpoDashboardClient() {
  const { user } = useAuthStore();
  const { 
    dashboardData, 
    isLoading, 
    error, 
    fetchDashboardData, 
    selectedYear, 
    setSelectedYear 
  } = useTpoStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading && !dashboardData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 shadow-xs">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-[#0A2540] font-heading">
          Loading College Placement Command...
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
          Aggregating live student rosters, campus hiring drives, and placement conversion statistics.
        </p>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-red-200 bg-red-50/80 p-6 sm:p-10 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
          <h3 className="text-lg font-bold text-red-900 font-heading">Unable to load dashboard</h3>
          <p className="text-xs sm:text-sm text-red-700 max-w-md mx-auto">{error}</p>
          <button
            onClick={() => fetchDashboardData()}
            className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const officerName = dashboardData?.tpoOfficer?.name || user?.name || 'TPO Officer';
  const collegeName = dashboardData?.college?.name || user?.tpo?.college?.name || 'College Placement Cell';
  const collegeCode = dashboardData?.college?.code || user?.tpo?.college?.code || 'CAMPUS';
  const dateString = dashboardData?.dateString || new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-7 transition-all duration-300 ease-in-out">
      
      {/* 1. Top Hero Greeting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight flex items-center gap-2">
            <span>Welcome back, {officerName}!</span>
            <span className="text-2xl animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            Here&apos;s what&apos;s happening at <span className="font-bold text-[#0A2540]">{collegeName}</span> today.
          </p>
        </div>

        {/* Date & Academic Year Filter */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>{dateString}</span>
          </div>

          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 shadow-2xs focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="2025–26">Academic Year 2025–26</option>
              <option value="2024–25">Academic Year 2024–25</option>
              <option value="2023–24">Academic Year 2023–24</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. Top 4 KPI Metric Cards */}
      <TpoKpiCards metrics={dashboardData?.metrics!} />

      {/* 3. Analytics & Charts Row (Placement Trend & Current Year Statistics) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-2 min-w-0">
          <PlacementTrendChart trends={dashboardData?.placementTrends} />
        </div>
        <div className="min-w-0">
          <PlacementStatsDonut stats={dashboardData?.placementStatistics} />
        </div>
      </div>

      {/* 4. Activity Rows (Recent Jobs Table & Recent Applications Stream) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
        <div className="min-w-0">
          <RecentJobsTable jobs={dashboardData?.recentJobs} />
        </div>
        <div className="min-w-0">
          <RecentApplicationsList applications={dashboardData?.recentApplications} />
        </div>
      </div>

      {/* 5. Top Recruiters Brand Row & Placement Cell Quote Box */}
      <TopRecruitersRow
        collegeName={collegeName}
        collegeCode={collegeCode}
        recruiters={dashboardData?.topRecruiters}
      />

      {/* 6. Sticky / Floating Quick Actions Bar */}
      <TpoQuickActionBar />

    </div>
  );
}
