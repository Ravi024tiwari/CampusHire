'use client';

import React from 'react';
import Link from 'next/link';
import { Quote, GraduationCap, Building2 } from 'lucide-react';
import type { TpoDashboardData } from '@/store/useTpoStore';

interface TopRecruitersRowProps {
  collegeName?: string;
  collegeCode?: string;
  recruiters?: TpoDashboardData['topRecruiters'];
}

export function TopRecruitersRow({ collegeName, collegeCode, recruiters }: TopRecruitersRowProps) {
  const defaultRecruiters = [
    { id: 'rec-1', name: 'Google', initial: 'G', color: 'text-red-500 bg-red-50 border-red-100' },
    { id: 'rec-2', name: 'Microsoft', initial: 'M', color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { id: 'rec-3', name: 'Amazon', initial: 'A', color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { id: 'rec-4', name: 'Adobe', initial: 'A', color: 'text-rose-600 bg-rose-50 border-rose-100' },
    { id: 'rec-5', name: 'Tesla', initial: 'T', color: 'text-slate-800 bg-slate-100 border-slate-200' },
    { id: 'rec-6', name: 'Infosys', initial: 'I', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      
      {/* Left: Top Recruiters This Year */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
            Top Recruiters This Year
          </h3>
          <Link
            href="/tpo/recruiters"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Brand Logos Row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {defaultRecruiters.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50/70 hover:bg-white transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-lg font-heading shadow-2xs group-hover:scale-105 transition-transform ${rec.color}`}>
                {rec.initial}
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-2 truncate max-w-full text-center">
                {rec.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Inspirational Placement Cell Quote Box */}
      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-indigo-50/40 p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col justify-center">
        
        {/* Background Subtle Watermark */}
        <div className="absolute -right-4 -bottom-6 text-blue-200/40 pointer-events-none">
          <GraduationCap className="w-40 h-40" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Quote className="w-4 h-4" />
          </div>

          <p className="text-base sm:text-lg font-extrabold text-[#0A2540] font-heading leading-snug">
            &ldquo;Together we build brighter careers for tomorrow.&rdquo;
          </p>

          <p className="text-xs font-bold text-blue-700">
            — Training & Placement Cell, {collegeCode || 'DTU'}
          </p>
        </div>

      </div>

    </div>
  );
}
