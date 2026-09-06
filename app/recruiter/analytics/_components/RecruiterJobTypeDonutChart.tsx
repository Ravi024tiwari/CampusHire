'use client';

import React, { useState } from 'react';
import { PieChart, Briefcase } from 'lucide-react';
import { JobTypeDistributionItem } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterJobTypeDonutChartProps {
  distribution: JobTypeDistributionItem[];
  totalOffers?: number;
}

export function RecruiterJobTypeDonutChart({
  distribution,
  totalOffers = 1246,
}: RecruiterJobTypeDonutChartProps) {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const items = distribution && distribution.length > 0 ? distribution : [
    { key: 'FULL_TIME', label: 'Full Time', count: 847, percentage: 68, color: '#2563EB' },
    { key: 'INTERNSHIP', label: 'Internship', count: 224, percentage: 18, color: '#8B5CF6' },
    { key: 'PART_TIME', label: 'Part Time', count: 100, percentage: 8, color: '#F59E0B' },
    { key: 'CONTRACT', label: 'Contract', count: 50, percentage: 4, color: '#EF4444' },
    { key: 'OTHER', label: 'Other', count: 25, percentage: 2, color: '#64748B' },
  ];

  const total = items.reduce((acc, curr) => acc + curr.count, 0) || totalOffers;

  // Compute SVG circular strokes
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between space-y-3 sm:space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-purple-50 text-purple-600">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0A2540] font-heading">
            Offers by Job Type
          </h3>
        </div>
      </div>

      {/* Donut and Legend Layout */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6 py-1">
        
        {/* SVG Donut Graphic */}
        <div className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="18"
            />
            
            {/* Slices */}
            {items.map((item) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += item.percentage;
              const isHovered = activeHover === item.key;

              return (
                <circle
                  key={item.key}
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth={isHovered ? 22 : 18}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveHover(item.key)}
                  onMouseLeave={() => setActiveHover(null)}
                />
              );
            })}
          </svg>

          {/* Center Text: Total Offers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-lg sm:text-xl font-black text-[#0A2540] font-heading leading-tight">
              {total.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400">
              Total Offers
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full sm:w-auto flex-1 space-y-1.5">
          {items.map((item) => {
            const isHovered = activeHover === item.key;
            return (
              <div
                key={item.key}
                onMouseEnter={() => setActiveHover(item.key)}
                onMouseLeave={() => setActiveHover(null)}
                className={`flex items-center justify-between p-1 px-2 rounded-xl transition-all cursor-pointer ${
                  isHovered ? 'bg-slate-100/90 scale-101' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] sm:text-xs font-bold text-slate-700 truncate">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="font-black text-[#0A2540]">{item.percentage}%</span>
                  <span className="text-[10.5px] font-medium text-slate-400">
                    ({item.count})
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
