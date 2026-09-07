'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { RecentRecruiterItem } from '@/store/useAdminStore';

interface AdminRecentRecruitersCardProps {
  recruiters: RecentRecruiterItem[];
}

export function AdminRecentRecruitersCard({ recruiters }: AdminRecentRecruitersCardProps) {
  const items = recruiters && recruiters.length > 0 ? recruiters : [
    { id: 'r1', companyName: 'Google', logoUrl: '/images/company/google.svg', jobsCount: 12, joinedAt: 'Aug 20, 2025' },
    { id: 'r2', companyName: 'Microsoft', logoUrl: '/images/company/microsoft.svg', jobsCount: 10, joinedAt: 'Aug 19, 2025' },
    { id: 'r3', companyName: 'Amazon', logoUrl: '/images/company/amazon.svg', jobsCount: 8, joinedAt: 'Aug 19, 2025' },
    { id: 'r4', companyName: 'Adobe', logoUrl: '/images/company/adobe.svg', jobsCount: 6, joinedAt: 'Aug 18, 2025' },
    { id: 'r5', companyName: 'Infosys', logoUrl: '/images/company/infosys.svg', jobsCount: 5, joinedAt: 'Aug 18, 2025' },
  ];

  const getCompanyColor = (idx: number) => {
    const colors = [
      'bg-blue-50 text-blue-600 border-blue-200',
      'bg-amber-50 text-amber-700 border-amber-200',
      'bg-emerald-50 text-emerald-600 border-emerald-200',
      'bg-rose-50 text-rose-600 border-rose-200',
      'bg-indigo-50 text-indigo-600 border-indigo-200',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h2 className="text-base font-extrabold text-[#0A2540] font-heading tracking-tight">
          Recent Recruiters
        </h2>
        <Link
          href="/admin/recruiters"
          className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-0.5 group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Table / List */}
      <div className="overflow-x-auto [scrollbar-width:thin] flex-1">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400">
              <th className="pb-2.5 font-bold">Company</th>
              <th className="pb-2.5 font-bold text-center">Jobs</th>
              <th className="pb-2.5 font-bold text-right">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {items.slice(0, 5).map((rec, idx) => (
              <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                
                {/* Company Name & Icon */}
                <td className="py-2.5 pr-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center font-black text-[11px] shrink-0 shadow-2xs ${getCompanyColor(
                        idx
                      )}`}
                    >
                      {rec.companyName.charAt(0)}
                    </div>
                    <span className="font-extrabold text-slate-800 truncate">
                      {rec.companyName}
                    </span>
                  </div>
                </td>

                {/* Jobs Count */}
                <td className="py-2.5 px-2 text-center">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-bold text-[11px]">
                    {rec.jobsCount}
                  </span>
                </td>

                {/* Joined Date */}
                <td className="py-2.5 text-right text-slate-400 font-mono text-[11px] whitespace-nowrap">
                  {rec.joinedAt}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
