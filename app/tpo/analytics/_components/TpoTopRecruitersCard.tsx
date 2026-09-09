'use client';

import React from 'react';
import Link from 'next/link';
import { CompanyBrandLogo } from '@/app/tpo/jobs/_components/TpoJobCard';
import { Building2 } from 'lucide-react';

interface RecruiterRankItem {
  rank: number;
  id: string;
  name: string;
  logoUrl?: string | null;
  studentsPlaced: number;
}

interface TpoTopRecruitersCardProps {
  companies?: RecruiterRankItem[];
}

export function TpoTopRecruitersCard({ companies }: TpoTopRecruitersCardProps) {
  const items = companies || [];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-[#0A2540] font-heading">
            Top Recruiting Companies
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Leading employers by successful student offers
          </p>
        </div>

        <Link
          href="/tpo/jobs"
          className="text-xs font-bold text-[#2563EB] hover:text-blue-800 transition-colors"
        >
          View Drives
        </Link>
      </div>

      {/* Companies List / Empty State */}
      {items.length === 0 ? (
        <div className="py-8 text-center flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-2">
            <Building2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-500">
            No company offers recorded yet.
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Placed recruiters will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          {items.map((c) => (
            <div
              key={c.id || c.rank}
              className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 transition-colors group"
            >
              {/* Logo + Company Name + Student Count */}
              <div className="flex items-center gap-3 min-w-0">
                <CompanyBrandLogo name={c.name} logoUrl={c.logoUrl} size="sm" />
                <div className="min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#2563EB] transition-colors truncate block">
                    {c.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    {c.studentsPlaced} {c.studentsPlaced === 1 ? 'student placed' : 'students placed'}
                  </span>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-slate-400 font-heading">
                  #{c.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

