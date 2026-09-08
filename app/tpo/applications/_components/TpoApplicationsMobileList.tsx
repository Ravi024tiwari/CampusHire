'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Building2, Calendar, FileText, ExternalLink, Eye } from 'lucide-react';
import { TpoApplicationItem } from '../_types/tpo-applications.types';

interface TpoApplicationsMobileListProps {
  applications: TpoApplicationItem[];
  onViewDetails: (application: TpoApplicationItem) => void;
}

export function TpoApplicationsMobileList({
  applications,
  onViewDetails,
}: TpoApplicationsMobileListProps) {
  const getStageBadge = (status: string) => {
    switch (status) {
      case 'SHORTLISTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-100 shrink-0 shadow-2xs">
            Shortlisted
          </span>
        );
      case 'UNDER_REVIEW':
      case 'APPLIED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100 shrink-0 shadow-2xs">
            Under Review
          </span>
        );
      case 'INTERVIEW_SCHEDULED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0 shadow-2xs">
            Interviewed
          </span>
        );
      case 'OFFERED':
      case 'ACCEPTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0 shadow-2xs">
            Offered
          </span>
        );
      case 'REJECTED':
      case 'DECLINED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-100 shrink-0 shadow-2xs">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 shrink-0 shadow-2xs">
            {status}
          </span>
        );
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (applications.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-2 shadow-2xs">
        <FileText className="w-8 h-8 mx-auto text-slate-300" />
        <h4 className="text-xs font-bold text-slate-700">No applications found</h4>
        <p className="text-[11px] text-slate-400">Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app) => (
        <div
          key={app.id}
          onClick={() => onViewDetails(app)}
          className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-blue-300 active:scale-[0.99] transition-all cursor-pointer space-y-3 group"
        >
          {/* Top Row: Student Avatar, Name, and Stage Pill */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center shadow-2xs">
                {app.student.avatarUrl ? (
                  <img
                    src={app.student.avatarUrl}
                    alt={app.student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-black text-slate-700">
                    {app.student.name?.[0]?.toUpperCase() || 'S'}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {app.student.name}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                  {app.student.branch} &bull; Batch {app.student.batchYear}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {getStageBadge(app.status)}
            </div>
          </div>

          {/* Job & Company Info Cardlet */}
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-md bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 p-0.5 shadow-2xs">
                {app.job.company?.logoUrl ? (
                  <img
                    src={app.job.company.logoUrl}
                    alt={app.job.company.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Building2 className="w-3 h-3 text-slate-400" />
                )}
              </div>
              <span className="font-bold text-slate-800 truncate">
                {app.job.title}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-semibold truncate">
                {app.job.company?.name}
              </span>
            </div>

            <span className="text-[10.5px] font-bold text-blue-600 shrink-0">
              {app.job.salaryPackage}
            </span>
          </div>

          {/* Bottom Applied Date & 1-Tap Actions */}
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <span className="text-[11px] text-slate-400 font-medium">
              Applied on {formatDate(app.createdAt)}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(app);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Review</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
