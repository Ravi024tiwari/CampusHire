'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { PendingApprovalsQueue } from '../dashboard/_components/PendingApprovalsQueue';
import { CollegeDossierModal } from '../dashboard/_components/CollegeDossierModal';
import { GraduationCap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function VerifyCollegesPage() {
  const { fetchDashboardData, pendingColleges } = useAdminStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 xl:space-y-8 transition-all duration-300 ease-in-out">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs shrink-0">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              University Accreditation & Verification Queue
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-3xl">
              Review self-registered university campuses, validate domains, and 1-click accredit to unlock departmental TPO cells.
            </p>
          </div>
        </div>

        <div className="flex items-center self-start sm:self-auto shrink-0">
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-extrabold text-amber-800 border border-amber-200 shadow-2xs">
            {pendingColleges.length} {pendingColleges.length === 1 ? 'University' : 'Universities'} Awaiting Accreditation
          </span>
        </div>
      </div>

      {/* Main Queue Component (Header hidden since top page banner provides full overview) */}
      <PendingApprovalsQueue hideHeader={true} />
    </div>
  );
}
