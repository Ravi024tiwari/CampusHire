'use client';

import React from 'react';
import type { AdminCollegeInsights } from '@/store/useAdminStore';

interface AdminCollegesInsightsCardProps {
  insights: AdminCollegeInsights | null;
  isLoading?: boolean;
}

export function AdminCollegesInsightsCard({
  insights,
  isLoading = false,
}: AdminCollegesInsightsCardProps) {
  const total = insights?.total || 186;
  const verifiedCount = insights?.verified?.count !== undefined ? insights.verified.count : 142;
  const verifiedPct = insights?.verified?.percentage !== undefined ? insights.verified.percentage : 76;

  const pendingCount = insights?.pending?.count !== undefined ? insights.pending.count : 32;
  const pendingPct = insights?.pending?.percentage !== undefined ? insights.pending.percentage : 17;

  const rejectedCount = insights?.rejected?.count !== undefined ? insights.rejected.count : 12;
  const rejectedPct = insights?.rejected?.percentage !== undefined ? insights.rejected.percentage : 7;

  // SVG Donut Circle Parameters
  const radius = 54;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  // Segment stroke lengths
  const verifiedLength = (verifiedPct / 100) * circumference;
  const pendingLength = (pendingPct / 100) * circumference;
  const rejectedLength = (rejectedPct / 100) * circumference;

  // Offsets (starting from top -90deg)
  const verifiedOffset = 0;
  const pendingOffset = -verifiedLength;
  const rejectedOffset = -(verifiedLength + pendingLength);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs animate-pulse space-y-4">
        <div className="h-4 w-32 bg-slate-100 rounded-md" />
        <div className="flex items-center justify-center h-44">
          <div className="w-32 h-32 rounded-full border-8 border-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-sm font-bold text-[#0A2540] font-heading mb-4">
        College Insights
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* SVG Donut Chart */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            {/* Background Ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
            />

            {/* Verified Segment (Teal) */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#0D8B8A"
              strokeWidth={strokeWidth}
              strokeDasharray={`${verifiedLength} ${circumference}`}
              strokeDashoffset={verifiedOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />

            {/* Pending Segment (Amber) */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth={strokeWidth}
              strokeDasharray={`${pendingLength} ${circumference}`}
              strokeDashoffset={pendingOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />

            {/* Rejected Segment (Rose) */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#F43F5E"
              strokeWidth={strokeWidth}
              strokeDasharray={`${rejectedLength} ${circumference}`}
              strokeDashoffset={rejectedOffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-black text-[#0A2540] font-heading tracking-tight leading-tight">
              {total}
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              Colleges
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5 w-full">
          {/* Verified */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D8B8A]" />
              <span className="font-semibold text-slate-700">Verified</span>
            </div>
            <span className="font-bold text-slate-900">
              {verifiedCount} ({verifiedPct}%)
            </span>
          </div>

          {/* Pending */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="font-semibold text-slate-700">Pending</span>
            </div>
            <span className="font-bold text-slate-900">
              {pendingCount} ({pendingPct}%)
            </span>
          </div>

          {/* Rejected */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="font-semibold text-slate-700">Rejected</span>
            </div>
            <span className="font-bold text-slate-900">
              {rejectedCount} ({rejectedPct}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
