'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { VerifiedInstitutionsTable } from '../dashboard/_components/VerifiedInstitutionsTable';
import { CheckCircle2 } from 'lucide-react';

export default function VerifiedCollegesPage() {
  const { fetchDashboardData, verifiedColleges } = useAdminStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 xl:space-y-8 transition-all duration-300 ease-in-out">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs shrink-0">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              Accredited University Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-3xl">
              Complete institutional directory of verified universities with active departmental placement teams and student rosters.
            </p>
          </div>
        </div>

        <div className="flex items-center self-start sm:self-auto shrink-0">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-extrabold text-emerald-800 border border-emerald-200 shadow-2xs">
            {verifiedColleges.length} {verifiedColleges.length === 1 ? 'Verified Institution' : 'Verified Institutions'}
          </span>
        </div>
      </div>

      {/* Main Directory Component (hideHeader={true} since top page header provides overview) */}
      <VerifiedInstitutionsTable hideHeader={true} />
    </div>
  );
}
