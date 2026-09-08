'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MoreHorizontal, Eye, ExternalLink, Calendar, Briefcase, Users } from 'lucide-react';
import { TpoCompanyItem } from '../_types/tpo-companies.types';

interface TpoCompaniesMobileListProps {
  companies: TpoCompanyItem[];
  onViewCompany: (company: TpoCompanyItem) => void;
  isLoading?: boolean;
}

export function TpoCompaniesMobileList({
  companies,
  onViewCompany,
  isLoading,
}: TpoCompaniesMobileListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm animate-pulse flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100" />
              <div className="space-y-2">
                <div className="w-24 h-4 bg-slate-100 rounded" />
                <div className="w-36 h-3 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="w-16 h-6 bg-slate-100 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Building2 className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800">No companies found</h3>
        <p className="text-xs text-slate-500 mt-1">
          Try changing your search query or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {companies.map((company) => (
        <Link
          key={company.id}
          href={`/tpo/companies/${company.id}`}
          className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.99] hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between gap-3 block"
        >
          {/* Left: Logo + Details */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <Building2 className="w-5 h-5 text-slate-400" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-slate-900 text-sm truncate">
                {company.name}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                {company.industry}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                {company.visitDate}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-slate-600">
                <span>{company.jobOpportunities} jobs</span>
                <span className="text-slate-300">•</span>
                <span>{company.studentsPlaced} placed</span>
              </div>
            </div>
          </div>

          {/* Right: Status Pill & Action */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {company.status === 'VISITED' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Visited
              </span>
            )}
            {company.status === 'UPCOMING' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Upcoming
              </span>
            )}
            {company.status === 'PAST' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Past
              </span>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onViewCompany(company);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
