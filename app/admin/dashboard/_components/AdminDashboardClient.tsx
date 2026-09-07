'use client';

import React, { useEffect } from 'react';
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
  Loader2
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

  useEffect(() => {
    fetchDashboardData(timeframe);
  }, []);

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
    totalStudents: 12842,
    studentsMoMGrowth: 12,
    totalRecruiters: 320,
    recruitersMoMGrowth: 8,
    verifiedColleges: 186,
    collegesMoMGrowth: 6,
    activeJobs: 642,
    jobsMoMGrowth: 14,
    totalApplications: 18520,
    applicationsMoMGrowth: 20,
    offersMade: 3215,
    offersMoMGrowth: 18,
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
          <span className="text-xs sm:text-sm font-bold text-[#0A2540]">{toast.message}</span>
          <button 
            onClick={() => dismissToast()}
            className="ml-auto text-slate-400 hover:text-[#0A2540] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 1. Hero Vision Banner & Inspirational Quote */}
      <AdminHeroBanner adminName={user?.name ? user.name.split(' ')[0] : 'Admin'} />

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
