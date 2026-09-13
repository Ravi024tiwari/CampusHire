'use client';

import React, { useEffect, useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { useAdminDashboardQuery } from '@/hooks/queries/useAdminQueries';
import { PendingApprovalsQueue } from '../dashboard/_components/PendingApprovalsQueue';
import { PendingCompaniesQueue } from '../dashboard/_components/PendingCompaniesQueue';
import { GraduationCap, Building2, ShieldCheck, Sparkles } from 'lucide-react';

export default function VerificationQueuePage() {
  const { data: dashboardData } = useAdminDashboardQuery();
  const { pendingColleges } = useAdminStore();
  const [activeTab, setActiveTab] = useState<'COLLEGES' | 'COMPANIES'>('COLLEGES');
  const [pendingCompaniesCount, setPendingCompaniesCount] = useState<number>(0);

  useEffect(() => {
    if (dashboardData) {
      useAdminStore.setState({
        dashboardData,
        pendingColleges: dashboardData.pendingColleges || [],
        verifiedColleges: dashboardData.verifiedColleges || [],
      });
    }
  }, [dashboardData]);

  const totalPending = pendingColleges.length + pendingCompaniesCount;

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 xl:space-y-8 transition-all duration-300 ease-in-out">
      
      {/* 1. Page Header with Combined Statistics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/15 to-purple-500/10 text-amber-600 border border-amber-200/80 shadow-xs shrink-0">
            <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
                Accreditation & Verification Queue
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                <Sparkles className="w-3 h-3" />
                <span>Super Admin Queue</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-3xl">
              Review and accredit unverified universities and corporate partners to activate placement drives and recruiter portals.
            </p>
          </div>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-extrabold text-amber-800 border border-amber-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{totalPending} Awaiting Approval</span>
          </span>
        </div>
      </div>

      {/* 2. Interactive Segmented Tabs (Colleges vs Companies) */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 max-w-md">
        <button
          type="button"
          onClick={() => setActiveTab('COLLEGES')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            activeTab === 'COLLEGES'
              ? 'bg-white text-[#0A2540] shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${activeTab === 'COLLEGES' ? 'text-amber-600' : 'text-slate-400'}`} />
          <span>Universities</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black ${
            activeTab === 'COLLEGES'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-slate-200/80 text-slate-700'
          }`}>
            {pendingColleges.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('COMPANIES')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            activeTab === 'COMPANIES'
              ? 'bg-white text-[#0A2540] shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Building2 className={`w-4 h-4 ${activeTab === 'COMPANIES' ? 'text-purple-600' : 'text-slate-400'}`} />
          <span>Companies</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-black ${
            activeTab === 'COMPANIES'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-slate-200/80 text-slate-700'
          }`}>
            {pendingCompaniesCount}
          </span>
        </button>
      </div>

      {/* 3. Render Respective Queue Based on Active Tab */}
      <div className="transition-all duration-300">
        {activeTab === 'COLLEGES' ? (
          <PendingApprovalsQueue hideHeader={true} />
        ) : (
          <PendingCompaniesQueue onCountUpdate={(count) => setPendingCompaniesCount(count)} />
        )}
      </div>

    </div>
  );
}
