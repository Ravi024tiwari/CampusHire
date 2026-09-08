'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ChevronRight, ExternalLink } from 'lucide-react';
import {
  TpoCompanyInsights,
  TopRecruitingCompany,
  RecentVisitItem,
} from '../_types/tpo-companies.types';

interface TpoCompaniesInsightsProps {
  insights: TpoCompanyInsights;
  topRecruitingCompanies: TopRecruitingCompany[];
  recentVisits: RecentVisitItem[];
  onSelectCompanyByName?: (name: string) => void;
}

export function TpoCompaniesInsights({
  insights,
  topRecruitingCompanies,
  recentVisits,
  onSelectCompanyByName,
}: TpoCompaniesInsightsProps) {
  const total = insights?.total ?? 0;
  const visited = insights?.visitedThisYear ?? 0;
  const upcoming = insights?.upcoming ?? 0;
  const past = insights?.past ?? 0;

  // SVG Donut calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const safeTotal = total > 0 ? total : 1;
  const visitedPct = total > 0 ? visited / safeTotal : 0;
  const upcomingPct = total > 0 ? upcoming / safeTotal : 0;
  const pastPct = total > 0 ? past / safeTotal : 0;

  const visitedStroke = visitedPct * circumference;
  const upcomingStroke = upcomingPct * circumference;
  const pastStroke = pastPct * circumference;

  const visitedOffset = 0;
  const upcomingOffset = -visitedStroke;
  const pastOffset = -(visitedStroke + upcomingStroke);

  return (
    <div className="space-y-4">
      {/* 1. Recruiter Insights Donut Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <h3 className="text-sm font-extrabold text-[#0A2540] tracking-tight">
          Recruiter Insights
        </h3>

        <div className="mt-4 flex items-center justify-between gap-4">
          {/* Donut Chart */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Visited Segment (Purple / Indigo) */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-blue-600 transition-all duration-500"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${visitedStroke} ${circumference}`}
                strokeDashoffset={visitedOffset}
                strokeLinecap="round"
              />
              {/* Upcoming Segment (Cyan / Light Blue) */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-cyan-500 transition-all duration-500"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${upcomingStroke} ${circumference}`}
                strokeDashoffset={upcomingOffset}
                strokeLinecap="round"
              />
              {/* Past Segment (Slate / Gray) */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-300 transition-all duration-500"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${pastStroke} ${circumference}`}
                strokeDashoffset={pastOffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold text-[#0A2540] leading-none">
                {total}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                Recruiters
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 text-xs flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span className="text-slate-600 font-medium">Visited This Year</span>
              </div>
              <span className="font-bold text-slate-900">{visited}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
                <span className="text-slate-600 font-medium">Upcoming</span>
              </div>
              <span className="font-bold text-slate-900">{upcoming}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
                <span className="text-slate-500 font-medium">Past (Previous Years)</span>
              </div>
              <span className="font-bold text-slate-700">{past}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Recruiting Companies Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-[#0A2540] tracking-tight">
            Top Recruiting Companies
          </h3>
          <button
            onClick={() => onSelectCompanyByName?.('')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {topRecruitingCompanies.map((comp) => (
            <div
              key={comp.id}
              onClick={() => onSelectCompanyByName?.(comp.name)}
              className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                  {comp.logoUrl ? (
                    <img
                      src={comp.logoUrl}
                      alt={comp.name}
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                  {comp.name}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                {comp.studentsPlaced} students
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Visits List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-extrabold text-[#0A2540] tracking-tight">
            Recent Visits
          </h3>
          <button
            onClick={() => onSelectCompanyByName?.('')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="mt-3 space-y-3.5">
          {recentVisits.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCompanyByName?.(item.name)}
              className="flex items-center justify-between gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {item.visitDate}
                  </p>
                </div>
              </div>

              <div className="text-right text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                <span>{item.jobOpportunities} jobs</span>
                <span className="text-slate-300 mx-1">•</span>
                <span>{item.studentsPlaced} placed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
