'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, ChevronRight } from 'lucide-react';
import type { TopRecruiterItem } from '@/store/useAdminStore';

interface AdminTopRecruitersCardProps {
  recruiters: TopRecruiterItem[];
}

export function AdminTopRecruitersCard({ recruiters }: AdminTopRecruitersCardProps) {
  const items = recruiters && recruiters.length > 0 ? recruiters : [
    { id: 'c-google', companyName: 'Google', logoUrl: '/images/company/google.svg', jobsCount: 120, applicationsCount: 2840 },
    { id: 'c-msft', companyName: 'Microsoft', logoUrl: '/images/company/microsoft.svg', jobsCount: 98, applicationsCount: 2120 },
    { id: 'c-amzn', companyName: 'Amazon', logoUrl: '/images/company/amazon.svg', jobsCount: 76, applicationsCount: 1980 },
    { id: 'c-adobe', companyName: 'Adobe', logoUrl: '/images/company/adobe.svg', jobsCount: 64, applicationsCount: 1450 },
    { id: 'c-tcs', companyName: 'TCS', logoUrl: '/images/company/tcs.svg', jobsCount: 58, applicationsCount: 1320 },
  ];

  const getCompanyInitial = (name: string) => name.trim().charAt(0).toUpperCase();

  const getCompanyColor = (idx: number) => {
    const colors = [
      'bg-blue-50 text-blue-600 border-blue-200',
      'bg-emerald-50 text-emerald-600 border-emerald-200',
      'bg-amber-50 text-amber-700 border-amber-200',
      'bg-rose-50 text-rose-600 border-rose-200',
      'bg-purple-50 text-purple-600 border-purple-200',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h2 className="text-base font-extrabold text-[#0A2540] font-heading tracking-tight">
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

      {/* Recruiters List */}
      <div className="space-y-2.5 flex-1">
        {items.slice(0, 5).map((rec, idx) => (
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
                <p className="text-xs font-extrabold text-[#0A2540] truncate leading-tight group-hover:text-teal-700 transition-colors">
                  {rec.companyName}
                </p>
                <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                  {rec.jobsCount} Jobs • {rec.applicationsCount.toLocaleString()} Applications
                </p>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
          </Link>
        ))}
      </div>

    </div>
  );
}
