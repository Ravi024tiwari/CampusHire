'use client';

import React, { useState } from 'react';
import type { ApplicationStatusBreakdownItem } from '@/store/useAdminStore';

interface AdminApplicationsStatusChartProps {
  distribution: ApplicationStatusBreakdownItem[];
  totalApplications?: number;
}

export function AdminApplicationsStatusChart({
  distribution,
  totalApplications = 18520,
}: AdminApplicationsStatusChartProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const items = distribution && distribution.length > 0 ? distribution : [
    { key: 'UNDER_REVIEW', label: 'Under Review', count: 7778, percentage: 42, color: '#0D8B8A' },
    { key: 'SHORTLISTED', label: 'Shortlisted', count: 5185, percentage: 28, color: '#FBAB23' },
    { key: 'INTERVIEWED', label: 'Interviewed', count: 2963, percentage: 16, color: '#3B82F6' },
    { key: 'OFFERED', label: 'Offered', count: 1852, percentage: 10, color: '#10B981' },
    { key: 'REJECTED', label: 'Rejected', count: 1111, percentage: 6, color: '#EF4444' },
  ];

  // SVG Donut calculation
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="pb-1 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-[#0A2540] font-heading tracking-tight">
          Applications by Status
        </h2>
        <span className="text-[11px] font-mono font-bold text-slate-400">
          {(totalApplications || 18520).toLocaleString()} Submissions
        </span>
      </div>

      {/* Donut & Legend Content */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 my-auto">
        
        {/* Left: SVG Donut */}
        <div className="relative w-40 h-40 shrink-0 select-none flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="20"
            />

            {/* Segments */}
            {items.map((item) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += item.percentage;
              const isHovered = hoveredKey === item.key;

              return (
                <circle
                  key={item.key}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? 24 : 20}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  onMouseEnter={() => setHoveredKey(item.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className="transition-all duration-300 cursor-pointer"
                />
              );
            })}
          </svg>

          {/* Center Metric Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-black text-[#0A2540] font-heading tracking-tight leading-tight">
              {(totalApplications || 18520).toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total
            </span>
          </div>
        </div>

        {/* Right: Legend Breakdown with Percentage */}
        <div className="w-full sm:w-auto flex-1 space-y-2 text-xs">
          {items.map((item) => {
            const isHovered = hoveredKey === item.key;

            return (
              <div
                key={item.key}
                onMouseEnter={() => setHoveredKey(item.key)}
                onMouseLeave={() => setHoveredKey(null)}
                className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-xl transition-all duration-150 cursor-pointer ${
                  isHovered ? 'bg-slate-50 scale-102 font-extrabold' : 'hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 truncate font-semibold">
                    {item.label}
                  </span>
                </div>
                
                <span className="font-mono font-black text-slate-900 shrink-0">
                  {item.percentage}%
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
