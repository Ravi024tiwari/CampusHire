'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Calendar, 
  MoreHorizontal, 
  Briefcase,
  ExternalLink,
  Copy,
  Clock,
  Trash2,
  X
} from 'lucide-react';
import type { AdminJobItem } from '@/store/useAdminStore';

interface AdminJobsMobileListProps {
  jobs: AdminJobItem[];
  isLoading?: boolean;
  activeStatus: string;
  onStatusSelect: (status: string) => void;
  onViewJob?: (job: AdminJobItem) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
}

// Mobile Logo helper
function MobileCompanyLogo({ name, logoUrl }: { name: string; logoUrl?: string | null }) {
  const clean = name.toLowerCase();

  if (clean.includes('google')) {
    return (
      <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0 font-bold text-base text-[#4285F4]">
        G
      </div>
    );
  }
  if (clean.includes('microsoft')) {
    return (
      <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs grid grid-cols-2 gap-0.5 p-2 shrink-0">
        <div className="bg-[#F25022] rounded-[1px]" />
        <div className="bg-[#7FBA00] rounded-[1px]" />
        <div className="bg-[#00A4EF] rounded-[1px]" />
        <div className="bg-[#FFB900] rounded-[1px]" />
      </div>
    );
  }
  if (clean.includes('amazon')) {
    return (
      <div className="w-10 h-10 rounded-2xl bg-[#131921] text-[#FF9900] font-black flex items-center justify-center shrink-0 shadow-xs text-sm">
        a
      </div>
    );
  }
  if (clean.includes('adobe')) {
    return (
      <div className="w-10 h-10 rounded-2xl bg-[#FA0F00] text-white font-black flex items-center justify-center shrink-0 shadow-xs text-sm font-serif">
        A
      </div>
    );
  }
  if (clean.includes('tesla')) {
    return (
      <div className="w-10 h-10 rounded-2xl bg-[#E82127] text-white font-black flex items-center justify-center shrink-0 shadow-xs text-sm">
        T
      </div>
    );
  }

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="w-10 h-10 rounded-2xl object-contain border border-slate-200/90 bg-white p-1 shrink-0"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-[#0D8B8A] font-bold text-sm flex items-center justify-center shrink-0">
      {name.charAt(0)}
    </div>
  );
}

export function AdminJobsMobileList({
  jobs,
  isLoading = false,
  activeStatus,
  onStatusSelect,
  onViewJob,
  onStatusChange,
}: AdminJobsMobileListProps) {
  const [selectedJobForActions, setSelectedJobForActions] = useState<AdminJobItem | null>(null);

  const statusTabs = [
    { label: 'All', value: 'ALL' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Rejected', value: 'REJECTED' },
  ];

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="block lg:hidden space-y-4">
      
      {/* 1. Status Filter Pills Scrollable Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {statusTabs.map((tab) => {
          const isActive =
            (activeStatus === 'ALL' && tab.value === 'ALL') ||
            activeStatus.toUpperCase() === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onStatusSelect(tab.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0D8B8A] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Job Card List */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs animate-pulse space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-2xl" />
                <div className="space-y-1.5 flex-1">
                  <div className="w-32 h-4 bg-slate-200 rounded" />
                  <div className="w-20 h-3 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="w-28 h-3 bg-slate-100 rounded" />
              <div className="flex gap-2">
                <div className="w-16 h-5 bg-slate-100 rounded-md" />
                <div className="w-16 h-5 bg-slate-100 rounded-full" />
              </div>
            </div>
          ))
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
              <Briefcase className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800">No jobs found</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Try selecting a different filter tab.</p>
          </div>
        ) : (
          jobs.map((job) => {
            const isClosed = job.status === 'CLOSED';
            const isDraft = job.status === 'DRAFT';
            const isRejected = job.status === 'PENDING_APPROVAL' || job.status === ('REJECTED' as any);

            return (
              <div
                key={job.id}
                onClick={() => onViewJob?.(job)}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-3 active:scale-[0.99] transition-all cursor-pointer"
              >
                {/* Header: Company Logo + Title + Action Button */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <MobileCompanyLogo
                      name={job.company?.name || 'Company'}
                      logoUrl={job.company?.logoUrl}
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 leading-tight truncate">
                        {job.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5 truncate">
                        {job.company?.name || 'Partner Company'}
                      </p>
                    </div>
                  </div>

                  {/* Action 3-dots Button: Opens Bottom Action Sheet */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJobForActions(job);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer active:scale-95 transition-all"
                    aria-label="Job actions"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{job.location}</span>
                </div>

                {/* Pill Badges Row: Type + Status */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                    {job.type}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isClosed
                        ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        : isDraft
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                        : isRejected
                        ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isClosed
                          ? 'bg-amber-500'
                          : isDraft
                          ? 'bg-indigo-500'
                          : isRejected
                          ? 'bg-rose-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    {isClosed ? 'Closed' : isDraft ? 'Draft' : isRejected ? 'Rejected' : 'Active'}
                  </span>
                </div>

                {/* Card Footer: Applicants count + Deadline */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-800">{job.applicantsCount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDate(job.deadline)}</span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 3. Interactive Mobile Action Sheet Modal */}
      {selectedJobForActions && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setSelectedJobForActions(null)}
          />

          {/* Action Sheet Card */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="min-w-0">
                <h3 className="text-sm font-black text-slate-900 truncate">
                  {selectedJobForActions.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  {selectedJobForActions.company?.name || 'Company'} • {selectedJobForActions.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobForActions(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Buttons List */}
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => {
                  const target = selectedJobForActions;
                  setSelectedJobForActions(null);
                  onViewJob?.(target);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-left"
              >
                <ExternalLink className="w-4 h-4 text-[#0D8B8A]" />
                <span>View Full Details</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(`${window.location.origin}/jobs/${selectedJobForActions.id}`);
                  }
                  setSelectedJobForActions(null);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-left"
              >
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Job Link</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const target = selectedJobForActions;
                  setSelectedJobForActions(null);
                  onStatusChange?.(target.id, target.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs transition-colors cursor-pointer text-left"
              >
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Toggle Status ({selectedJobForActions.status === 'ACTIVE' ? 'Mark as Closed' : 'Mark as Active'})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedJobForActions(null);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer text-left"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>Archive Drive</span>
              </button>
            </div>

            {/* Cancel / Dismiss */}
            <button
              type="button"
              onClick={() => setSelectedJobForActions(null)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
