'use client';

import React from 'react';

interface PlacementStatusBreakdown {
  totalEligible: number;
  placed: { count: number; percentage: number };
  inProcess: { count: number; percentage: number };
  notPlaced: { count: number; percentage: number };
  notEligible: { count: number; percentage: number };
}

interface TpoPlacementStatusDonutProps {
  statusData?: PlacementStatusBreakdown;
  selectedYear?: string;
}

export function TpoPlacementStatusDonut({
  statusData,
  selectedYear = 'ALL',
}: TpoPlacementStatusDonutProps) {
  const data = statusData || {
    totalEligible: 0,
    placed: { count: 0, percentage: 0 },
    inProcess: { count: 0, percentage: 0 },
    notPlaced: { count: 0, percentage: 0 },
    notEligible: { count: 0, percentage: 0 },
  };

  const total = data.totalEligible || 0;
  const radius = 38;
  const circumference = 2 * Math.PI * radius; // ~238.76

  // Dash calculations
  const strokePlaced = total > 0 ? (data.placed.percentage / 100) * circumference : 0;
  const strokeInProcess = total > 0 ? (data.inProcess.percentage / 100) * circumference : 0;
  const strokeNotPlaced = total > 0 ? (data.notPlaced.percentage / 100) * circumference : 0;
  const strokeNotEligible = total > 0 ? (data.notEligible.percentage / 100) * circumference : 0;


  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4 flex flex-col justify-between">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-[#0A2540] font-heading">
          Placement Status ({selectedYear})
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Real-time candidate placement funnel breakdown
        </p>
      </div>

      {/* Donut & Legend Container */}
      <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
        {/* Donut Visual */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Base track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#F8FAFC"
              strokeWidth="11"
            />
            {/* Placed (Emerald #10B981) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#10B981"
              strokeWidth="11"
              strokeDasharray={`${strokePlaced} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            {/* In Process (Sky #0EA5E9) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#0EA5E9"
              strokeWidth="11"
              strokeDasharray={`${strokeInProcess} ${circumference}`}
              strokeDashoffset={`${-strokePlaced}`}
              className="transition-all duration-700 ease-out"
            />
            {/* Not Placed (Amber #F59E0B) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="11"
              strokeDasharray={`${strokeNotPlaced} ${circumference}`}
              strokeDashoffset={`${-(strokePlaced + strokeInProcess)}`}
              className="transition-all duration-700 ease-out"
            />
            {/* Not Eligible (Purple/Indigo #8B5CF6) */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#8B5CF6"
              strokeWidth="11"
              strokeDasharray={`${strokeNotEligible} ${circumference}`}
              strokeDashoffset={`${-(strokePlaced + strokeInProcess + strokeNotPlaced)}`}
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <span className="text-xl font-black text-[#0A2540] font-heading leading-tight">
              {total.toLocaleString()}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
              Eligible Students
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2.5 w-full sm:flex-1 text-xs">
          {/* Placed */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="font-semibold text-slate-700">Placed</span>
            </div>
            <span className="font-black text-[#0A2540]">
              {data.placed.count.toLocaleString()} ({data.placed.percentage}%)
            </span>
          </div>

          {/* In Process */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shrink-0" />
              <span className="font-semibold text-slate-700">In Process</span>
            </div>
            <span className="font-black text-[#0A2540]">
              {data.inProcess.count.toLocaleString()} ({data.inProcess.percentage}%)
            </span>
          </div>

          {/* Not Placed */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
              <span className="font-semibold text-slate-700">Not Placed</span>
            </div>
            <span className="font-black text-[#0A2540]">
              {data.notPlaced.count.toLocaleString()} ({data.notPlaced.percentage}%)
            </span>
          </div>

          {/* Not Eligible */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0" />
              <span className="font-semibold text-slate-700">Not Eligible</span>
            </div>
            <span className="font-black text-[#0A2540]">
              {data.notEligible.count.toLocaleString()} ({data.notEligible.percentage}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
