'use client';

import React from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  TrendingUp, 
  PieChart, 
  Briefcase
} from 'lucide-react';

export function PlacementVelocityMatrix() {
  const { recentDrives, kpis, ctcDistribution, placementVelocity } = useAdminStore();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xl:gap-6">
      {/* 1. Placement Velocity & Real Monthly Hiring Curve */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 xl:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 xl:pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 xl:h-10 xl:w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-200 shadow-2xs">
              <TrendingUp className="h-4.5 w-4.5 xl:h-5.5 xl:w-5.5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg xl:text-xl font-bold text-[#0A2540] font-heading">Campus Placement Velocity Trends</h3>
              <p className="text-xs sm:text-sm xl:text-base text-slate-500">Monthly corporate hiring and offer distributions calculated from verified database</p>
            </div>
          </div>
          <span className="text-xs sm:text-sm xl:text-base font-mono font-extrabold text-[#2563EB] bg-blue-50 px-2.5 xl:px-3.5 py-1 xl:py-1.5 rounded-lg border border-blue-200 shadow-2xs">
            {kpis?.placementPercentage || '0%'} Velocity
          </span>
        </div>

        {/* Dynamic Velocity Visual Bars with Horizontal Scroll */}
        <div className="mt-5 xl:mt-6 space-y-5 xl:space-y-6">
          <div className="relative w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
            <div className="min-w-[560px] md:min-w-full relative h-44 xl:h-52 rounded-2xl bg-slate-50 p-4 xl:p-6 border border-slate-200 flex items-end justify-between gap-3 sm:gap-4 overflow-hidden">
              {/* Background gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between p-3 xl:p-4 opacity-30 pointer-events-none">
                <div className="border-b border-slate-200 w-full"></div>
                <div className="border-b border-slate-200 w-full"></div>
                <div className="border-b border-slate-200 w-full"></div>
              </div>

              {/* Monthly Bar Chart (Real DB Data) */}
              {placementVelocity.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-xs sm:text-sm text-slate-400">
                  Placement velocity timeline will populate as campus drives and student offers occur.
                </div>
              ) : (
                placementVelocity.map((bar, idx) => (
                  <div key={idx} className="flex-1 min-w-[36px] flex flex-col items-center gap-2 z-10 group">
                    <span className="text-[11px] xl:text-xs font-mono text-[#2563EB] font-bold">
                      {bar.value}
                    </span>
                    <div className="w-full max-w-[44px] rounded-t-lg bg-slate-200 overflow-hidden relative h-26 xl:h-30 flex items-end">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#2563EB] to-[#38BDF8] transition-all duration-700 shadow-xs group-hover:brightness-110"
                        style={{ height: bar.height }}
                      ></div>
                    </div>
                    <span className="text-xs xl:text-sm font-bold text-slate-600 truncate">{bar.month}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Horizontal Scroll Hint for smaller screens */}
          <div className="flex md:hidden items-center justify-between text-[10px] font-bold text-slate-400 px-1 -mt-3">
            <span>← Scroll to view all months →</span>
            <span className="font-mono text-[#2563EB]">12-Month Telemetry</span>
          </div>

          {/* Real Active Drives Feed */}
          <div>
            <h4 className="text-xs xl:text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 xl:h-4.5 xl:w-4.5 text-[#FBAB23]" />
              Active Campus Placement Drives ({recentDrives.length})
            </h4>

            {recentDrives.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-600">No active placement drives scheduled yet.</p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Approved recruiter job openings will automatically appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-4">
                {recentDrives.slice(0, 4).map((drive) => (
                  <div
                    key={drive.id}
                    className="flex items-center justify-between p-3.5 xl:p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 transition-all shadow-2xs"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-9 w-9 xl:h-11 xl:w-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-extrabold text-xs xl:text-sm text-[#0A2540] shadow-2xs">
                        {drive.company?.logoUrl ? (
                          <img src={drive.company.logoUrl} alt={drive.company.name} className="h-full w-full object-cover rounded-xl" />
                        ) : drive.company?.name ? (
                          drive.company.name.slice(0, 2).toUpperCase()
                        ) : (
                          'CO'
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs sm:text-sm xl:text-base font-bold text-[#0A2540] truncate">{drive.title}</p>
                        <p className="text-[11px] sm:text-xs text-slate-500 truncate">{drive.company?.name} • {drive.college?.name || 'Campus'}</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm xl:text-base font-extrabold text-[#2563EB] font-mono shrink-0 ml-2 bg-blue-50 px-2.5 xl:px-3 py-1 rounded-lg border border-blue-200">
                      {drive.salaryPackage}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. CTC Package Real Breakdown */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 xl:p-8 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3.5 xl:pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 xl:h-10 xl:w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs">
                <PieChart className="h-4.5 w-4.5 xl:h-5.5 xl:w-5.5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg xl:text-xl font-bold text-[#0A2540] font-heading">CTC Distribution</h3>
                <p className="text-xs sm:text-sm text-slate-500">Database calculated compensation tiers</p>
              </div>
            </div>
          </div>

          <div className="mt-5 xl:mt-6 space-y-4 xl:space-y-5">
            {ctcDistribution.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-400 py-6 text-center">No CTC package distribution data recorded yet.</p>
            ) : (
              ctcDistribution.map((tier, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm xl:text-base">
                    <span className="font-bold text-[#0A2540]">{tier.label}</span>
                    <span className="font-extrabold text-[#2563EB] font-mono">{tier.percent}%</span>
                  </div>
                  <div className="h-2.5 xl:h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-indigo-600 transition-all duration-500"
                      style={{ width: `${tier.percent}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium">{tier.count} offers issued in this tier</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 xl:pt-5 mt-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Batch Top Offer</span>
            <span className="font-extrabold text-[#0A2540] font-mono text-sm sm:text-base">{kpis?.maxSalaryPackage || '₹0.0 LPA'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
