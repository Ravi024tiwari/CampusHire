'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileEdit,
  Sparkles
} from 'lucide-react';
import type { 
  AdminJobInsights, 
  AdminJobTopCompany, 
  AdminJobRecentActivityItem 
} from '@/store/useAdminStore';

interface AdminJobsSidebarProps {
  insights: AdminJobInsights | null;
  topCompanies: AdminJobTopCompany[];
  recentActivity: AdminJobRecentActivityItem[];
}

// Donut Chart Component using pure SVG
function DonutChart({ insights }: { insights: AdminJobInsights | null }) {
  const total = insights?.total || 642;
  const activeCount = insights?.active?.count || 412;
  const closedCount = insights?.closed?.count || 128;
  const draftCount = insights?.draft?.count || 72;
  const rejectedCount = insights?.rejected?.count || 30;

  const activePct = insights?.active?.percentage || 64;
  const closedPct = insights?.closed?.percentage || 20;
  const draftPct = insights?.draft?.percentage || 11;
  const rejectedPct = insights?.rejected?.percentage || 5;

  // SVG circle calculations
  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke offsets
  const activeStroke = (activePct / 100) * circumference;
  const closedStroke = (closedPct / 100) * circumference;
  const draftStroke = (draftPct / 100) * circumference;
  const rejectedStroke = (rejectedPct / 100) * circumference;

  const activeOffset = 0;
  const closedOffset = activeStroke;
  const draftOffset = activeStroke + closedStroke;
  const rejectedOffset = activeStroke + closedStroke + draftStroke;

  return (
    <div className="flex flex-col items-center">
      {/* SVG Donut */}
      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Active Slice (Green) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#10B981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${activeStroke} ${circumference}`}
            strokeDashoffset={-activeOffset}
            className="transition-all duration-500 hover:opacity-90"
          />

          {/* Closed Slice (Amber) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#F59E0B"
            strokeWidth={strokeWidth}
            strokeDasharray={`${closedStroke} ${circumference}`}
            strokeDashoffset={-closedOffset}
            className="transition-all duration-500 hover:opacity-90"
          />

          {/* Draft Slice (Indigo/Purple) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#6366F1"
            strokeWidth={strokeWidth}
            strokeDasharray={`${draftStroke} ${circumference}`}
            strokeDashoffset={-draftOffset}
            className="transition-all duration-500 hover:opacity-90"
          />

          {/* Rejected Slice (Rose/Red) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#EF4444"
            strokeWidth={strokeWidth}
            strokeDasharray={`${rejectedStroke} ${circumference}`}
            strokeDashoffset={-rejectedOffset}
            className="transition-all duration-500 hover:opacity-90"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-2xl font-black text-slate-900 font-heading leading-tight">
            {total}
          </span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Jobs
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="w-full space-y-2 mt-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">Active</span>
          </div>
          <span className="font-bold text-slate-900 font-mono">
            {activeCount} <span className="text-slate-400 font-normal">({activePct}%)</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="font-semibold text-slate-700">Closed</span>
          </div>
          <span className="font-bold text-slate-900 font-mono">
            {closedCount} <span className="text-slate-400 font-normal">({closedPct}%)</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="font-semibold text-slate-700">Draft</span>
          </div>
          <span className="font-bold text-slate-900 font-mono">
            {draftCount} <span className="text-slate-400 font-normal">({draftPct}%)</span>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="font-semibold text-slate-700">Rejected</span>
          </div>
          <span className="font-bold text-slate-900 font-mono">
            {rejectedCount} <span className="text-slate-400 font-normal">({rejectedPct}%)</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Company brand icon helper
function SidebarCompanyLogo({ name, logoUrl }: { name: string; logoUrl?: string | null }) {
  const clean = name.toLowerCase();

  if (clean.includes('google')) {
    return (
      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center shrink-0 font-bold text-xs text-[#4285F4]">
        G
      </div>
    );
  }
  if (clean.includes('microsoft')) {
    return (
      <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 shadow-2xs grid grid-cols-2 gap-0.5 p-1 shrink-0">
        <div className="bg-[#F25022] rounded-[0.5px]" />
        <div className="bg-[#7FBA00] rounded-[0.5px]" />
        <div className="bg-[#00A4EF] rounded-[0.5px]" />
        <div className="bg-[#FFB900] rounded-[0.5px]" />
      </div>
    );
  }
  if (clean.includes('amazon')) {
    return (
      <div className="w-7 h-7 rounded-lg bg-[#131921] text-[#FF9900] font-black flex items-center justify-center shrink-0 shadow-2xs text-[11px]">
        a
      </div>
    );
  }
  if (clean.includes('adobe')) {
    return (
      <div className="w-7 h-7 rounded-lg bg-[#FA0F00] text-white font-black flex items-center justify-center shrink-0 shadow-2xs text-[11px] font-serif">
        A
      </div>
    );
  }
  if (clean.includes('infosys')) {
    return (
      <div className="w-7 h-7 rounded-lg bg-[#007CC3] text-white font-bold flex items-center justify-center shrink-0 shadow-2xs text-[9px]">
        infy
      </div>
    );
  }

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="w-7 h-7 rounded-lg object-contain border border-slate-200/80 bg-white p-0.5 shrink-0"
      />
    );
  }

  return (
    <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 text-[#0D8B8A] font-bold text-xs flex items-center justify-center shrink-0">
      {name.charAt(0)}
    </div>
  );
}

export function AdminJobsSidebar({
  insights,
  topCompanies,
  recentActivity,
}: AdminJobsSidebarProps) {
  return (
    <div className="space-y-4">
      
      {/* 1. Job Insights Donut Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
        <h3 className="font-bold text-sm text-[#0A2540] font-heading mb-1">
          Job Insights
        </h3>
        <DonutChart insights={insights} />
      </div>

      {/* 2. Top Companies Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-[#0A2540] font-heading">
            Top Companies
          </h3>
          <Link
            href="/admin/recruiters"
            className="text-xs font-bold text-[#0D8B8A] hover:text-teal-800 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="space-y-3">
          {topCompanies.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <SidebarCompanyLogo name={c.name} logoUrl={c.logoUrl} />
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-[#0D8B8A] transition-colors leading-tight">
                    {c.name}
                  </p>
                  <p className="text-[10.5px] font-medium text-slate-400">
                    {c.jobsCount} Jobs
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Activity Feed Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-[#0A2540] font-heading">
            Recent Activity
          </h3>
          <span className="text-xs font-bold text-[#0D8B8A] cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="space-y-3.5">
          {recentActivity.map((item) => {
            const isPosted = item.type === 'JOB_POSTED';
            const isClosed = item.type === 'JOB_CLOSED';
            const isUpdated = item.type === 'JOB_UPDATED';

            return (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isPosted
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                      : isClosed
                      ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
                      : isUpdated
                      ? 'bg-sky-50 text-sky-600 border border-sky-200/60'
                      : 'bg-rose-50 text-rose-600 border border-rose-200/60'
                  }`}
                >
                  {isPosted ? (
                    <Briefcase className="w-3.5 h-3.5" />
                  ) : isClosed ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : isUpdated ? (
                    <FileEdit className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                    {item.description}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    {item.timeAgo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
