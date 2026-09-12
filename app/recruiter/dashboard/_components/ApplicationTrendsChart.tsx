'use client';

import React, { useState } from 'react';
import { ChevronDown, BarChart3 } from 'lucide-react';
import { MonthlyTrend } from '../_types/recruiter-dashboard.types';

interface ApplicationTrendsChartProps {
  trends: MonthlyTrend[];
}

export function ApplicationTrendsChart({ trends }: ApplicationTrendsChartProps) {
  const [timeframe, setTimeframe] = useState<'6m' | '3m'>('6m');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const rawData = trends && trends.length > 0 ? trends : [];
  const data = timeframe === '3m' ? rawData.slice(-3) : rawData;

  // Calculate dynamic maximum value based on actual data
  const highestCount = Math.max(
    0,
    ...data.map((d) => Math.max(d.applications || 0, d.shortlisted || 0))
  );

  const maxVal = highestCount > 0 
    ? Math.max(10, Math.ceil((highestCount * 1.25) / 5) * 5)
    : 10;

  const gridSteps = [
    maxVal,
    Math.round(maxVal * 0.75),
    Math.round(maxVal * 0.5),
    Math.round(maxVal * 0.25),
    0,
  ];

  const totalPeriodApps = data.reduce((sum, d) => sum + (d.applications || 0), 0);

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
      
      {/* Chart Header & Filter Selector */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
              Application Trends
            </h3>
          </div>
        </div>

        {/* Timeframe Dropdown Pill */}
        <div className="relative">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as '6m' | '3m')}
            className="appearance-none px-3 py-1.5 pr-7 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer transition-colors"
          >
            <option value="6m">Last 6 months</option>
            <option value="3m">Last 3 months</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative pt-4 pb-2">
        
        {/* Y-Axis Gridlines & Labels */}
        <div className="flex flex-col justify-between h-48 sm:h-52 text-[10.5px] font-semibold text-slate-400 pr-2">
          {gridSteps.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-6 text-right">{val}</span>
              <div className="flex-1 border-b border-slate-100" />
            </div>
          ))}
        </div>

        {/* Bars Container Overlay */}
        <div className="absolute inset-0 left-9 right-2 flex items-end justify-between px-2 pt-2 pb-6">
          {data.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-xs font-medium text-slate-400">
              No historical trends recorded yet
            </div>
          ) : (
            data.map((item, idx) => {
              const appHeightPercent = Math.min(100, ((item.applications || 0) / maxVal) * 100);
              const shortHeightPercent = Math.min(100, ((item.shortlisted || 0) / maxVal) * 100);
              const isHovered = hoveredMonth === item.month;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(item.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Floating Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 z-30 px-2.5 py-1.5 rounded-xl bg-slate-900 text-white text-[10.5px] font-bold shadow-lg flex flex-col items-center pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95">
                      <span>{item.month}: {item.applications || 0} Applied</span>
                      <span className="text-blue-300 font-semibold">{item.shortlisted || 0} Shortlisted</span>
                    </div>
                  )}

                  {/* Dual Column Bars */}
                  <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full pb-0.5">
                    {/* Applications Bar (Light Blue) */}
                    <div
                      style={{ height: item.applications > 0 ? `${Math.max(4, appHeightPercent)}%` : '3px' }}
                      className={`w-2.5 sm:w-3.5 rounded-t-md transition-all duration-300 shadow-2xs ${
                        item.applications > 0
                          ? 'bg-blue-400 group-hover:bg-blue-500'
                          : 'bg-slate-200 group-hover:bg-blue-300'
                      }`}
                    />
                    {/* Shortlisted Bar (Dark Royal Blue) */}
                    <div
                      style={{ height: item.shortlisted > 0 ? `${Math.max(4, shortHeightPercent)}%` : '3px' }}
                      className={`w-2.5 sm:w-3.5 rounded-t-md transition-all duration-300 shadow-2xs ${
                        item.shortlisted > 0
                          ? 'bg-blue-700 group-hover:bg-blue-800'
                          : 'bg-slate-200 group-hover:bg-blue-500'
                      }`}
                    />
                  </div>

                  {/* X-Axis Month Label */}
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-1.5">
                    {item.month}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-blue-400" />
            <span>Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-blue-700" />
            <span>Shortlisted</span>
          </div>
        </div>

        {totalPeriodApps === 0 && (
          <span className="text-[11px] text-slate-400 font-medium">0 applications in selected period</span>
        )}
      </div>

    </div>
  );
}
