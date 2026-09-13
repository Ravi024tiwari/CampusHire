'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { useAdminDashboardQuery } from '@/hooks/queries/useAdminQueries';
import { PlacementVelocityMatrix } from '../dashboard/_components/PlacementVelocityMatrix';
import { KpiMetricsRow } from '../dashboard/_components/KpiMetricsRow';
import { TrendingUp, BarChart3, Award } from 'lucide-react';

export default function AnalyticsAdminPage() {
  const { data: dashboardData } = useAdminDashboardQuery();
  const { kpis } = useAdminStore();

  useEffect(() => {
    if (dashboardData) {
      useAdminStore.setState({
        dashboardData,
        kpis: dashboardData.kpis as any,
      });
    }
  }, [dashboardData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 xl:space-y-8 transition-all duration-300 ease-in-out">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs shrink-0">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              Placement Velocity & Compensation Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-3xl">
              Deep-dive analytics on hiring velocity, batch CTC distribution, and university selection conversion rates.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-extrabold text-[#2563EB] border border-blue-200 shadow-2xs">
            <Award className="h-4 w-4 text-[#FBAB23]" />
            2026 Season Velocity: {kpis?.placementPercentage || '0%'}
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <KpiMetricsRow />

      {/* Velocity Matrix & Distribution Graphs */}
      <PlacementVelocityMatrix />
    </div>
  );
}
