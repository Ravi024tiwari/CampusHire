'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ChevronRight, Users } from 'lucide-react';
import type { TopRecruiterItem } from '@/store/useAdminStore';

interface AdminTopRecruitersCardProps {
  recruiters: TopRecruiterItem[];
}

export function AdminTopRecruitersCard({ recruiters }: AdminTopRecruitersCardProps) {
  const items = recruiters || [];

  const getCompanyInitial = (name: string) => name.trim().charAt(0).toUpperCase();

  const getCompanyColor = (idx: number) => {
    const colors = [
      'bg-teal-50 text-teal-700 border-teal-200',
      'bg-amber-50 text-amber-700 border-amber-200',
      'bg-emerald-50 text-emerald-700 border-emerald-200',
      'bg-purple-50 text-purple-700 border-purple-200',
      'bg-rose-50 text-rose-700 border-rose-200',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h2 className="text-base font-extrabold text-slate-900 font-heading tracking-tight">
          Top Recruiters
        </h2>
        <Link
          href="/admin/recruiters"
          className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-0.5 group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Recruiters List or Empty State */}
      <div className="space-y-2 flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 h-full min-h-[140px]">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-700">No recruiters registered yet</p>
            <p className="text-[11px] text-slate-400">Recruiters will appear as companies post jobs</p>
          </div>
        ) : (
          items.slice(0, 5).map((rec, idx) => (
            <Link
              key={rec.id}
              href={`/admin/recruiters?search=${encodeURIComponent(rec.companyName)}`}
              className="flex items-center justify-between gap-3 p-2 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all duration-200 group"
            >
              {/* Logo / Emblem & Name */}
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center font-black text-xs shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${getCompanyColor(idx)}`}
                >
                  {getCompanyInitial(rec.companyName)}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-slate-900 truncate leading-tight group-hover:text-teal-700 transition-colors">
                    {rec.companyName}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                    {rec.jobsCount} Jobs • {(rec.applicationsCount || 0).toLocaleString()} Applications
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
            </Link>
          ))
        )}
      </div>

    </div>
  );
}

