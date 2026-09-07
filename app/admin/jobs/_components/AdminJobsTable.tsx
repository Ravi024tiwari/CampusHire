'use client';

import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle,
  Copy,
  Briefcase
} from 'lucide-react';
import type { AdminJobItem } from '@/store/useAdminStore';

interface AdminJobsTableProps {
  jobs: AdminJobItem[];
  isLoading?: boolean;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewJob?: (job: AdminJobItem) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
}

// Helper to render company logo or stylized badge
function CompanyLogo({ name, logoUrl }: { name: string; logoUrl?: string | null }) {
  const cleanName = name.toLowerCase();

  // Known brand icon colors / representations
  if (cleanName.includes('google')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center shrink-0 font-bold text-sm">
        <span className="text-[#4285F4]">G</span>
      </div>
    );
  }
  if (cleanName.includes('microsoft')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-2xs grid grid-cols-2 gap-0.5 p-1.5 shrink-0">
        <div className="bg-[#F25022] rounded-[1px]" />
        <div className="bg-[#7FBA00] rounded-[1px]" />
        <div className="bg-[#00A4EF] rounded-[1px]" />
        <div className="bg-[#FFB900] rounded-[1px]" />
      </div>
    );
  }
  if (cleanName.includes('amazon')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#131921] text-[#FF9900] font-black flex items-center justify-center shrink-0 shadow-2xs text-xs">
        a
      </div>
    );
  }
  if (cleanName.includes('adobe')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#FA0F00] text-white font-black flex items-center justify-center shrink-0 shadow-2xs text-xs font-serif">
        A
      </div>
    );
  }
  if (cleanName.includes('tesla')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#E82127] text-white font-black flex items-center justify-center shrink-0 shadow-2xs text-xs">
        T
      </div>
    );
  }
  if (cleanName.includes('infosys')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#007CC3] text-white font-bold flex items-center justify-center shrink-0 shadow-2xs text-[10px]">
        infy
      </div>
    );
  }
  if (cleanName.includes('flipkart')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#2874F0] text-[#FFE500] font-black flex items-center justify-center shrink-0 shadow-2xs text-xs">
        fk
      </div>
    );
  }
  if (cleanName.includes('wipro')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#341F59] text-white font-bold flex items-center justify-center shrink-0 shadow-2xs text-[10px]">
        W
      </div>
    );
  }
  if (cleanName.includes('deloitte')) {
    return (
      <div className="w-8 h-8 rounded-xl bg-[#86BC25] text-black font-black flex items-center justify-center shrink-0 shadow-2xs text-xs">
        D.
      </div>
    );
  }

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="w-8 h-8 rounded-xl object-contain border border-slate-200/80 bg-white p-1 shrink-0"
      />
    );
  }

  return (
    <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/80 text-[#0D8B8A] font-bold text-xs flex items-center justify-center shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// Status badge pill
function StatusBadge({ status }: { status: string }) {
  const norm = status.toUpperCase();

  if (norm === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Active
      </span>
    );
  }
  if (norm === 'CLOSED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/70 text-[11px] font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Closed
      </span>
    );
  }
  if (norm === 'DRAFT') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70 text-[11px] font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
        Draft
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/70 text-[11px] font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
      Rejected
    </span>
  );
}

export function AdminJobsTable({
  jobs,
  isLoading = false,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onViewJob,
  onStatusChange,
}: AdminJobsTableProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const isAllSelected = jobs.length > 0 && selectedIds.length === jobs.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < jobs.length;

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
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 font-heading">
              
              {/* Multi-Select Checkbox */}
              <th className="py-3.5 pl-4 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={onToggleSelectAll}
                  className="rounded border-slate-300 text-[#0D8B8A] focus:ring-[#0D8B8A] w-4 h-4 cursor-pointer"
                />
              </th>

              <th className="py-3.5 px-3">Job Title</th>
              <th className="py-3.5 px-3">Company</th>
              <th className="py-3.5 px-3">Location</th>
              <th className="py-3.5 px-3">Type</th>
              <th className="py-3.5 px-3 text-center">Applications</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Posted On</th>
              <th className="py-3.5 px-3">Deadline</th>
              <th className="py-3.5 pl-3 pr-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {isLoading ? (
              // Loading Skeleton Slices
              Array.from({ length: 6 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-4 pl-4 pr-2">
                    <div className="w-4 h-4 bg-slate-200 rounded" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-xl" />
                      <div className="space-y-1">
                        <div className="w-28 h-3.5 bg-slate-200 rounded" />
                        <div className="w-16 h-2.5 bg-slate-100 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3"><div className="w-20 h-3 bg-slate-200 rounded" /></td>
                  <td className="py-4 px-3"><div className="w-24 h-3 bg-slate-200 rounded" /></td>
                  <td className="py-4 px-3"><div className="w-16 h-3 bg-slate-200 rounded" /></td>
                  <td className="py-4 px-3 text-center"><div className="w-12 h-3 bg-slate-200 rounded mx-auto" /></td>
                  <td className="py-4 px-3"><div className="w-16 h-5 bg-slate-200 rounded-full" /></td>
                  <td className="py-4 px-3"><div className="w-20 h-3 bg-slate-200 rounded" /></td>
                  <td className="py-4 px-3"><div className="w-20 h-3 bg-slate-200 rounded" /></td>
                  <td className="py-4 pl-3 pr-4 text-right"><div className="w-6 h-6 bg-slate-200 rounded ml-auto" /></td>
                </tr>
              ))
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-800 font-heading">
                    No job postings found
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try clearing or adjusting your search filters to discover more active or archived drives.
                  </p>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const isSelected = selectedIds.includes(job.id);
                const isMenuOpen = activeMenuId === job.id;

                return (
                  <tr
                    key={job.id}
                    className={`hover:bg-slate-50/80 transition-colors group ${
                      isSelected ? 'bg-teal-50/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 pl-4 pr-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(job.id)}
                        className="rounded border-slate-300 text-[#0D8B8A] focus:ring-[#0D8B8A] w-4 h-4 cursor-pointer"
                      />
                    </td>

                    {/* Job Title with Company Logo */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <CompanyLogo
                          name={job.company?.name || 'Company'}
                          logoUrl={job.company?.logoUrl}
                        />
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-[#0D8B8A] transition-colors leading-tight">
                            {job.title}
                          </p>
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                            {job.company?.name || 'Partner Company'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-3 font-semibold text-slate-700">
                      {job.company?.name || 'Company'}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {job.location}
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {job.type}
                      </span>
                    </td>

                    {/* Applications count */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                        {job.applicantsCount.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <StatusBadge status={job.status} />
                    </td>

                    {/* Posted On */}
                    <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {formatDate(job.postedAt)}
                    </td>

                    {/* Deadline */}
                    <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {formatDate(job.deadline)}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-3.5 pl-3 pr-4 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isMenuOpen ? null : job.id);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveMenuId(null)}
                            />
                            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white border border-slate-200/90 shadow-xl z-30 py-1 text-xs animate-in fade-in zoom-in-95 duration-150">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onViewJob?.(job);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer text-left"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Details</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  navigator.clipboard.writeText(`${window.location.origin}/jobs/${job.id}`);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer text-left"
                              >
                                <Copy className="w-3.5 h-3.5 text-slate-400" />
                                <span>Copy Link</span>
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  onStatusChange?.(job.id, job.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE');
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer text-left"
                              >
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>Toggle Status</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer text-left"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                <span>Archive Drive</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
