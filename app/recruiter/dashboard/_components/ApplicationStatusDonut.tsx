'use client';

import React, { useState } from 'react';
import { PieChart, Info } from 'lucide-react';
import { StatusBreakdownItem } from '../_types/recruiter-dashboard.types';

interface ApplicationStatusDonutProps {
  statusBreakdown: StatusBreakdownItem[];
  totalApplications?: number;
}

export function ApplicationStatusDonut({
  statusBreakdown,
  totalApplications = 1240,
}: ApplicationStatusDonutProps) {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const items = statusBreakdown && statusBreakdown.length > 0 ? statusBreakdown : [
    { key: 'APPLIED', label: 'Applied', count: 620, percentage: 50, color: '#3B82F6' },
    { key: 'UNDER_REVIEW', label: 'Under Review', count: 310, percentage: 25, color: '#F59E0B' },
    { key: 'SHORTLISTED', label: 'Shortlisted', count: 200, percentage: 16, color: '#8B5CF6' },
    { key: 'INTERVIEWING', label: 'Interviewing', count: 64, percentage: 5, color: '#10B981' },
    { key: 'OFFERS', label: 'Offers', count: 18, percentage: 1, color: '#EF4444' },
    { key: 'REJECTED', label: 'Rejected', count: 28, percentage: 3, color: '#64748B' },
  ];

  const total = items.reduce((acc, curr) => acc + curr.count, 0) || totalApplications;

  // Compute SVG circular strokes
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
            <PieChart className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
            Application Status
          </h3>
        </div>
      </div>

      {/* Donut and Legend Layout */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
        
        {/* SVG Donut Graphic */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {/* Background ring */}
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
              const isHovered = activeHover === item.key;

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
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveHover(item.key)}
                  onMouseLeave={() => setActiveHover(null)}
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-heading leading-tight">
              {total.toLocaleString()}
            </span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total
            </span>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="w-full sm:w-auto flex-1 space-y-2">
          {items.map((item) => {
            const isHovered = activeHover === item.key;
            return (
              <div
                key={item.key}
                onMouseEnter={() => setActiveHover(item.key)}
                onMouseLeave={() => setActiveHover(null)}
                className={`flex items-center justify-between p-1.5 px-2.5 rounded-xl transition-all cursor-pointer ${
                  isHovered ? 'bg-slate-100/90 scale-102' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-bold text-slate-700 truncate">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="font-extrabold text-slate-900">{item.count}</span>
                  <span className="text-[11px] font-semibold text-slate-400 w-8 text-right">
                    {item.percentage}%
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
