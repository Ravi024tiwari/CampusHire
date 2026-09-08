'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, MoreHorizontal, ExternalLink, Mail, Phone, Building2 } from 'lucide-react';
import { TpoCompanyItem } from '../_types/tpo-companies.types';

interface TpoCompaniesTableProps {
  companies: TpoCompanyItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewCompany: (company: TpoCompanyItem) => void;
  isLoading?: boolean;
}

export function TpoCompaniesTable({
  companies,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onViewCompany,
  isLoading,
}: TpoCompaniesTableProps) {
  const isAllSelected = companies.length > 0 && selectedIds.length === companies.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < companies.length;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
        <div className="p-8 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Loading campus companies...</p>
        </div>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
          <Building2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No companies found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No campus recruiters match the selected search terms or filters. Try clearing filters or searching for another company.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {/* Checkbox */}
              <th className="py-3.5 pl-4 pr-2 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isSomeSelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>

              <th className="py-3.5 px-3">Company</th>
              <th className="py-3.5 px-3">Industry</th>
              <th className="py-3.5 px-3">Visit Date</th>
              <th className="py-3.5 px-3 text-center">Job Opportunities</th>
              <th className="py-3.5 px-3 text-center">Students Placed</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 pl-3 pr-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {companies.map((company) => {
              const isSelected = selectedIds.includes(company.id);

              return (
                <tr
                  key={company.id}
                  className={`hover:bg-blue-50/30 transition-colors group ${
                    isSelected ? 'bg-blue-50/40' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 pl-4 pr-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(company.id)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </td>

                  {/* Company Logo + Name */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                        {company.logoUrl ? (
                          <img
                            src={company.logoUrl}
                            alt={company.name}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Building2 className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors block truncate">
                          {company.name}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Industry */}
                  <td className="py-3.5 px-3 text-slate-600 font-medium">
                    {company.industry}
                  </td>

                  {/* Visit Date */}
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {company.visitDate}
                  </td>

                  {/* Job Opportunities */}
                  <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                    {company.jobOpportunities}
                  </td>

                  {/* Students Placed */}
                  <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                    {company.studentsPlaced}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {company.status === 'VISITED' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Visited
                      </span>
                    )}
                    {company.status === 'UPCOMING' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Upcoming
                      </span>
                    )}
                    {company.status === 'PAST' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Past
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pl-3 pr-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`/tpo/companies/${company.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1.5 rounded-lg transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </a>

                      <button
                        onClick={() => onViewCompany(company)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                        title="More actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
