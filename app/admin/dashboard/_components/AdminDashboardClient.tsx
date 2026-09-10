'use client';

import React, { useEffect, useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { useAuthStore } from '@/store/useAuthStore';
import { AdminHeroBanner } from './AdminHeroBanner';
import { AdminKpiCards } from './AdminKpiCards';
import { AdminUserGrowthChart } from './AdminUserGrowthChart';
import { AdminApplicationsStatusChart } from './AdminApplicationsStatusChart';
import { AdminTopRecruitersCard } from './AdminTopRecruitersCard';
import { AdminRecentStudentsCard } from './AdminRecentStudentsCard';
import { AdminRecentRecruitersCard } from './AdminRecentRecruitersCard';
import { AdminPlatformActivityCard } from './AdminPlatformActivityCard';
import { AdminBottomCtaBanner } from './AdminBottomCtaBanner';
import { CollegeDossierModal } from './CollegeDossierModal';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  RefreshCw,
  Radio
} from 'lucide-react';

export function AdminDashboardClient() {
  const { 
    dashboardData,
    timeframe,
    setTimeframe,
    fetchDashboardData, 
    isLoading,
    toast, 
    dismissToast,
  } = useAdminStore();

  const { user } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData(timeframe);
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchDashboardData(timeframe);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Auto-dismiss toast notification
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, dismissToast]);

  // Loading Skeleton State
  if (isLoading && !dashboardData) {
    return (
      <div className="p-3.5 sm:p-6 lg:p-8 max-w-[1700px] mx-auto space-y-6 animate-pulse select-none">
        <div className="h-44 rounded-3xl bg-slate-200/80" />
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 rounded-3xl bg-slate-200/80" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 h-72 rounded-3xl bg-slate-200/80" />
          <div className="lg:col-span-4 h-72 rounded-3xl bg-slate-200/80" />
          <div className="lg:col-span-3 h-72 rounded-3xl bg-slate-200/80" />
        </div>
      </div>
    );
  }

  const kpis = dashboardData?.kpis || {
    totalStudents: 0,
    studentsMoMGrowth: 0,
    totalRecruiters: 0,
    recruitersMoMGrowth: 0,
    verifiedColleges: 0,
    collegesMoMGrowth: 0,
    activeJobs: 0,
    jobsMoMGrowth: 0,
    totalApplications: 0,
    applicationsMoMGrowth: 0,
    offersMade: 0,
    offersMoMGrowth: 0,
  };

  const userGrowth = dashboardData?.userGrowth || [];
  const applicationsByStatus = dashboardData?.applicationsByStatus || [];
  const topRecruiters = dashboardData?.topRecruiters || [];
  const recentStudents = dashboardData?.recentStudents || [];
  const recentRecruiters = dashboardData?.recentRecruiters || [];
  const platformActivity = dashboardData?.platformActivity || [];

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 pb-24 font-sans transition-all duration-300">
      
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:px-4.5 sm:py-3.5 shadow-xl animate-in slide-in-from-bottom-5 max-w-[90vw]">
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-[#0D8B8A] shrink-0" />}
          <span className="text-xs sm:text-sm font-bold text-slate-900">{toast.message}</span>
          <button 
            onClick={() => dismissToast()}
            className="ml-auto text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 1. Hero Vision Banner & Quick Refresh Toolbar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-600 font-mono">
              Live Database Connected
            </span>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isLoading || isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#0D8B8A] ${isRefreshing || isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>

        <AdminHeroBanner adminName={user?.name ? user.name.split(' ')[0] : 'Admin'} />
      </div>

      {/* 2. Top 6 KPI Metric Cards */}
      <AdminKpiCards kpis={kpis} />

      {/* 3. Middle Visualizations Row (User Growth Multi-Line Chart, Applications Donut, Top Recruiters) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        
        {/* Left: User Growth Chart (5 cols on Desktop, 6 cols on XL) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
          <AdminUserGrowthChart
            data={userGrowth}
            timeframe={timeframe}
            onTimeframeChange={(tf) => setTimeframe(tf)}
          />
        </div>

        {/* Middle: Applications by Status Donut (3.5 cols on Desktop, 4 cols on XL) */}
        <div className="lg:col-span-6 xl:col-span-4 flex flex-col">
          <AdminApplicationsStatusChart
            distribution={applicationsByStatus}
            totalApplications={kpis.totalApplications}
          />
        </div>

        {/* Right: Top Recruiters Ranked List (3 cols on Desktop/XL) */}
        <div className="lg:col-span-12 xl:col-span-3 flex flex-col">
          <AdminTopRecruitersCard recruiters={topRecruiters} />
        </div>

      </div>

      {/* 4. Bottom Data Grid Row (Recent Students, Recent Recruiters, Platform Activity) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        
        {/* Column 1: Recent Students Table */}
        <div className="flex flex-col">
          <AdminRecentStudentsCard students={recentStudents} />
        </div>

        {/* Column 2: Recent Recruiters Table */}
        <div className="flex flex-col">
          <AdminRecentRecruitersCard recruiters={recentRecruiters} />
        </div>

        {/* Column 3: Real-Time Platform Activity Stream */}
        <div className="flex flex-col md:col-span-2 xl:col-span-1">
          <AdminPlatformActivityCard activity={platformActivity} />
        </div>

      </div>

      {/* 5. Bottom Call to Action Banner */}
      <AdminBottomCtaBanner />

      {/* College Inspection Dossier Modal (For instant audits) */}
      <CollegeDossierModal />

    </div>
  );
}

