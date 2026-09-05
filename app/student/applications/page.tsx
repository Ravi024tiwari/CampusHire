'use client';

import React, { useEffect } from 'react';
import { useStudentApplicationsStore } from '@/store/useStudentApplicationsStore';
import { AppliedJobsHeroHeader } from './_components/AppliedJobsHeroHeader';
import { AppliedJobsKpiStats } from './_components/AppliedJobsKpiStats';
import { AppliedJobsFilterBar } from './_components/AppliedJobsFilterBar';
import { AppliedJobsCard } from './_components/AppliedJobsCard';
import { AppliedJobsPagination } from './_components/AppliedJobsPagination';
import { ApplicationDetailModal } from './_components/ApplicationDetailModal';
import { WithdrawConfirmationModal } from './_components/WithdrawConfirmationModal';
import { StudentApplicationsFooter } from './_components/StudentApplicationsFooter';
import { Briefcase, RotateCcw } from 'lucide-react';

export default function StudentApplicationsPage() {
  const { applications, isLoading, fetchApplications, resetFilters } = useStudentApplicationsStore();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-7">
        
        {/* 1. Page Hero Header with Motivational Target Card */}
        <AppliedJobsHeroHeader />

        {/* 2. Top KPI Metric Stats (Smooth Horizontal Touch Scroll on Mobile/Tablet) */}
        <AppliedJobsKpiStats />

        {/* 3. Status Tabs Bar & Advanced Search/Filters Row */}
        <AppliedJobsFilterBar />

        {/* 4. Applications Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-56 rounded-3xl bg-slate-100 border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-slate-300 bg-white space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#0A2540]">
                No applications match your filter
              </h3>
              <p className="text-xs text-slate-400">
                Try clearing your search or switching to the &ldquo;All&rdquo; status tab.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {applications.map((app) => (
              <AppliedJobsCard key={app.id} application={app} />
            ))}
          </div>
        )}

        {/* 5. Pagination Bar */}
        <AppliedJobsPagination />

        {/* 6. Footer Taglines & Values */}
        <StudentApplicationsFooter />

      </div>

      {/* Interactive Modals */}
      <ApplicationDetailModal />
      <WithdrawConfirmationModal />
    </div>
  );
}
