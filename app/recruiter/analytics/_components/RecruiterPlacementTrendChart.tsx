'use client';

import React, { useState } from 'react';
import { TrendingUp, ChevronDown, BarChart3, Info } from 'lucide-react';
import { YearlyTrendItem, useRecruiterAnalyticsStore } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterPlacementTrendChartProps {
  trends: YearlyTrendItem[];
}

export function RecruiterPlacementTrendChart({ trends }: RecruiterPlacementTrendChartProps) {
  const { granularity, setGranularity } = useRecruiterAnalyticsStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = trends || [];
  const maxVal = Math.max(10, ...data.map((d) => Math.max(d.offersMade, d.studentsPlaced, 1)));

  const count = data.length;

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between space-y-3 sm:space-y-4">
      
      {/* Chart Header & Granularity Control */}
      <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0A2540] font-heading">
              Placement Trend (5-Year Overview)
            </h3>
          </div>
        </div>

        {/* Granularity Dropdown */}
        <div className="relative">
          <select
            value={granularity}
            onChange={(e) => setGranularity(e.target.value as 'yearly' | 'monthly')}
            className="appearance-none pl-2.5 pr-6 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer transition-colors"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Main Dual-Axis Chart Canvas */}
      <div className="relative pt-2 pb-1 select-none">
        
        {/* Left & Right Y-Axes Gridlines */}
        <div className="flex flex-col justify-between h-36 sm:h-44 md:h-48 text-[10px] sm:text-[10.5px] font-bold text-slate-400">
          {[
            { left: 400, right: '100%' },
            { left: 300, right: '80%' },
            { left: 200, right: '60%' },
            { left: 100, right: '40%' },
            { left: 0, right: '0%' },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between gap-1.5 sm:gap-2">
              <span className="w-5 sm:w-6 text-right shrink-0">{row.left}</span>
              <div className="flex-1 border-b border-slate-100 border-dashed" />
              <span className="w-6 sm:w-8 text-left shrink-0">{row.right}</span>
            </div>
          ))}
        </div>

        {/* Interactive Year Columns & Dual Bars */}
        <div className="absolute inset-0 left-6 sm:left-8 right-7 sm:right-10 flex items-end justify-between pt-2 pb-5">
          {data.map((item, idx) => {
            const offersHeight = Math.min(100, (item.offersMade / maxVal) * 100);
            const placedHeight = Math.min(100, (item.studentsPlaced / maxVal) * 100);
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                className={`flex-1 flex flex-col items-center justify-end h-full relative cursor-pointer rounded-xl transition-all duration-200 px-0.5 ${
                  isHovered ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(hoveredIndex === idx ? null : idx)}
              >
                {/* Floating Interactive Tooltip */}
                {isHovered && (
                  <div className="absolute -top-16 z-30 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-[#0A2540] text-white text-[10px] sm:text-[11px] shadow-2xl flex flex-col gap-0.5 pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 border border-slate-700 left-1/2 -translate-x-1/2">
                    <span className="font-black text-white border-b border-slate-700/80 pb-0.5 mb-0.5">
                      Batch {item.year}
                    </span>
                    <div className="flex items-center gap-1.5 text-blue-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>Offers: <strong>{item.offersMade}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>Placed: <strong>{item.studentsPlaced}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>Rate: {item.placementRate}%</span>
                    </div>
                  </div>
                )}

                {/* Dual Column Bars */}
                <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 md:gap-2 h-full pb-0.5">
                  {/* Offers Made Bar */}
                  <div
                    style={{ height: `${offersHeight}%` }}
                    className={`w-2 xs:w-3 sm:w-3.5 md:w-4 rounded-t-md transition-all duration-300 shadow-2xs ${
                      isHovered ? 'bg-blue-400 scale-y-102' : 'bg-blue-300/90'
                    }`}
                  />
                  {/* Students Placed Bar */}
                  <div
                    style={{ height: `${placedHeight}%` }}
                    className={`w-2 xs:w-3 sm:w-3.5 md:w-4 rounded-t-md transition-all duration-300 shadow-2xs ${
                      isHovered ? 'bg-blue-700 scale-y-102' : 'bg-blue-600'
                    }`}
                  />
                </div>

                {/* X-Axis Year Label */}
                <span className={`text-[10px] sm:text-[11px] font-black mt-1.5 transition-colors ${
                  isHovered ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {item.year}
                </span>
              </div>
            );
          })}
        </div>

        {/* SVG Placement Rate Curve Overlay */}
        <div className="absolute inset-0 left-6 sm:left-8 right-7 sm:right-10 top-2 bottom-5 pointer-events-none">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${count * 100} 100`} preserveAspectRatio="none">
            {/* Smooth trend curve */}
            <path
              d={(() => {
                const points = data.map((item, idx) => {
                  // Center in each of the count columns
                  const x = idx * 100 + 50;
                  const y = 100 - (item.placementRate / 100) * 95;
                  return { x, y };
                });
                return points.reduce((acc, curr, i, arr) => {
                  if (i === 0) return `M ${curr.x} ${curr.y}`;
                  const prev = arr[i - 1];
                  const cx = (prev.x + curr.x) / 2;
                  return `${acc} C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
                }, '');
              })()}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-xs"
            />

            {/* Line Dots */}
            {data.map((item, idx) => {
              const x = idx * 100 + 50;
              const y = 100 - (item.placementRate / 100) * 95;
              const isHovered = hoveredIndex === idx;

              return (
                <circle
                  key={idx}
                  cx={x}
                  cy={y}
                  r={isHovered ? 5 : 3.5}
                  fill="#10B981"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
              );
            })}
          </svg>
        </div>

      </div>

      {/* Chart Legend Footer */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2.5 border-t border-slate-100 text-[11px] sm:text-xs font-bold text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-300" />
          <span>Offers Made</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
          <span>Students Placed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 rounded-full bg-emerald-500" />
          <span className="text-emerald-700">Placement Rate</span>
        </div>
      </div>

    </div>
  );
}

