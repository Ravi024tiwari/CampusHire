'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Eye, 
  MoreHorizontal, 
  Building2, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Award, 
  User,
  Download,
  Mail
} from 'lucide-react';
import { TpoApplicationItem } from '../_types/tpo-applications.types';

interface TpoApplicationsTableProps {
  applications: TpoApplicationItem[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onToggleSelect: (id: string) => void;
  onViewDetails: (application: TpoApplicationItem) => void;
}

export function TpoApplicationsTable({
  applications,
  selectedIds,
  onSelectAll,
  onToggleSelect,
  onViewDetails,
}: TpoApplicationsTableProps) {
  const isAllSelected = applications.length > 0 && selectedIds.length === applications.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < applications.length;

  const getStageBadge = (status: string) => {
    switch (status) {
      case 'SHORTLISTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
            Shortlisted
          </span>
        );
      case 'UNDER_REVIEW':
      case 'APPLIED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
            Under Review
          </span>
        );
      case 'INTERVIEW_SCHEDULED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
            Interviewed
          </span>
        );
      case 'OFFERED':
      case 'ACCEPTED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            Offered
          </span>
        );
      case 'REJECTED':
      case 'DECLINED':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
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

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_2px_10px_rgba(15,23,42,0.04)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 pl-5 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isSomeSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-3">Student</th>
              <th className="py-3.5 px-3">Job Title</th>
              <th className="py-3.5 px-3">Company</th>
              <th className="py-3.5 px-3">Applied On</th>
              <th className="py-3.5 px-3">Current Stage</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 pr-5 pl-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {applications.map((app) => {
              const isSelected = selectedIds.includes(app.id);
              const isJobActive = app.job?.status !== 'CLOSED';

              return (
                <tr
                  key={app.id}
                  className={`hover:bg-slate-50/70 transition-colors group ${
                    isSelected ? 'bg-blue-50/30' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 pl-5 pr-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(app.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </td>

                  {/* Student */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                        {app.student.avatarUrl ? (
                          <img
                            src={app.student.avatarUrl}
                            alt={app.student.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold text-slate-600">
                            {app.student.name?.[0]?.toUpperCase() || 'S'}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/tpo/students/${app.student.id}`}
                          className="font-bold text-slate-900 hover:text-blue-600 transition-colors truncate block"
                        >
                          {app.student.name}
                        </Link>
                        <p className="text-[11px] text-slate-400 font-semibold truncate">
                          {app.student.branch} &bull; {app.student.batchYear}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Job Title */}
                  <td className="py-3.5 px-3 font-semibold text-slate-800">
                    <span className="truncate block max-w-[180px]">{app.job.title}</span>
                  </td>

                  {/* Company */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
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
                        {app.job.company?.name}
                      </span>
                    </div>
                  </td>

                  {/* Applied On */}
                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    {formatDate(app.createdAt)}
                  </td>

                  {/* Current Stage */}
                  <td className="py-3.5 px-3">
                    {getStageBadge(app.status)}
                  </td>

                  {/* Status (Active / Closed) */}
                  <td className="py-3.5 px-3">
                    {isJobActive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>Closed</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pr-5 pl-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewDetails(app)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewDetails(app)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title="More Actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {applications.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-bold text-slate-700">No applications match your filter criteria</p>
                  <p className="text-xs text-slate-400 mt-0.5">Try resetting search filters or changing the active status tab.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
