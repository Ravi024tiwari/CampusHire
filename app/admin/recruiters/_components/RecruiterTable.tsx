'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Mail, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  UserCheck, 
  Plus, 
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AdminRecruiterItem, RecruiterMeta } from '../_types/recruiter.types';

interface RecruiterTableProps {
  recruiters: AdminRecruiterItem[];
  meta: RecruiterMeta;
  onPageChange: (page: number) => void;
  onOpenAddModal: () => void;
  isLoading: boolean;
}

export function RecruiterTable({
  recruiters,
  meta,
  onPageChange,
  onOpenAddModal,
  isLoading,
}: RecruiterTableProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (recruiters.length === 0 && !isLoading) {
    return (
      <Card className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 text-center shadow-2xs">
        <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm mb-4">
          <UserCheck className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading">
          No Corporate Recruiters Found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
          No recruiters matched your current search filters or the selected corporate partner has not appointed recruiters yet.
        </p>
        <Button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold px-5 py-2.5 shadow-md shadow-blue-600/20 transition-all hover:scale-102 cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Provision First Recruiter</span>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {/* 1. Main Enterprise Data Table (Desktop & Tablet) / Responsive Cards (Mobile) */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden">
        
        {/* Desktop Table View (Hidden on mobile < md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 uppercase tracking-wider text-[10.5px] font-bold select-none">
                <th scope="col" className="py-3.5 px-4 lg:px-5">Recruiter Profile</th>
                <th scope="col" className="py-3.5 px-4 lg:px-5">Corporate Partner</th>
                <th scope="col" className="py-3.5 px-4 lg:px-5">Designation</th>
                <th scope="col" className="py-3.5 px-4 lg:px-5">Account Status</th>
                <th scope="col" className="py-3.5 px-4 lg:px-5">Provisioned Date</th>
                <th scope="col" className="py-3.5 px-4 lg:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {recruiters.map((recruiter) => {
                const isCopied = copiedEmail === recruiter.user.email;
                const formattedDate = new Date(recruiter.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <tr 
                    key={recruiter.id} 
                    className="hover:bg-blue-50/40 transition-colors duration-150 group"
                  >
                    {/* Recruiter Info */}
                    <td className="py-3 px-4 lg:px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-xs font-black text-[#2563EB] shadow-2xs shrink-0 overflow-hidden">
                          {recruiter.user.avatarUrl ? (
                            <img
                              src={recruiter.user.avatarUrl}
                              alt={recruiter.user.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span>{recruiter.user.name.slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0A2540] truncate group-hover:text-[#2563EB] transition-colors">
                            {recruiter.user.name}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                            <span className="truncate max-w-[170px] lg:max-w-[220px]">{recruiter.user.email}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyEmail(recruiter.user.email)}
                              className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                              title="Copy email address"
                            >
                              {isCopied ? (
                                <Check className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Corporate Partner */}
                    <td className="py-3 px-4 lg:px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-lg border border-slate-200/80 bg-white p-0.5 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                          {recruiter.company.logoUrl ? (
                            <img
                              src={recruiter.company.logoUrl}
                              alt={recruiter.company.name}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <Building2 className="h-3.5 w-3.5 text-purple-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-extrabold text-slate-800 truncate max-w-[150px]">
                            {recruiter.company.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium truncate">
                            {recruiter.company.industry || 'Enterprise'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Designation */}
                    <td className="py-3 px-4 lg:px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
                        <Briefcase className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{recruiter.designation || 'Campus Recruiter'}</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 lg:px-5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10.5px] font-bold border border-emerald-200">
                        <ShieldCheck className="h-3 w-3 text-emerald-600 shrink-0" />
                        <span>Active Recruiter</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 lg:px-5 text-slate-500 font-mono text-[11px]">
                      {formattedDate}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 lg:px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`mailto:${recruiter.user.email}`}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-[#2563EB] hover:border-blue-300 hover:bg-blue-50 transition-colors shadow-2xs cursor-pointer"
                          title="Send Email"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                        <Link
                          href={`/admin/companies?search=${encodeURIComponent(recruiter.company.name)}`}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-colors shadow-2xs"
                          title="View Company Card"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Card View (Visible on screens < md) */}
        <div className="md:hidden divide-y divide-slate-100">
          {recruiters.map((recruiter) => {
            const isCopied = copiedEmail === recruiter.user.email;
            const formattedDate = new Date(recruiter.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div key={recruiter.id} className="p-3.5 space-y-2.5">
                
                {/* Top Row: User Avatar, Name & Company */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-9 w-9 rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-xs font-black text-[#2563EB] shadow-2xs shrink-0 overflow-hidden">
                      {recruiter.user.avatarUrl ? (
                        <img
                          src={recruiter.user.avatarUrl}
                          alt={recruiter.user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{recruiter.user.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#0A2540] truncate">
                        {recruiter.user.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">
                        {recruiter.user.email}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[9.5px] font-bold border border-emerald-200 shrink-0">
                    <ShieldCheck className="h-2.5 w-2.5 text-emerald-600" />
                    Active
                  </span>
                </div>

                {/* Company & Role Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 font-semibold truncate">
                    <Building2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                    <span className="truncate">{recruiter.company.name}</span>
                  </div>

                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[10.5px]">
                    {recruiter.designation || 'Campus Recruiter'}
                  </span>
                </div>

                {/* Mobile Actions Footer */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Joined {formattedDate}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(recruiter.user.email)}
                      className="px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                    >
                      {isCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy Email'}</span>
                    </button>

                    <a
                      href={`mailto:${recruiter.user.email}`}
                      className="p-1.5 rounded-lg border border-slate-200 bg-blue-50 text-[#2563EB] hover:bg-blue-100 shadow-2xs"
                      title="Email Recruiter"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 2. Enterprise Pagination Controller */}
      {meta.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-1">
          <p className="text-xs text-slate-500 font-medium order-2 sm:order-1">
            Page <strong className="text-slate-800 font-bold">{meta.page}</strong> of{' '}
            <strong className="text-slate-800 font-bold">{meta.totalPages}</strong> ({meta.total} recruiters total)
          </p>

          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!meta.hasPrevPage || isLoading}
              onClick={() => onPageChange(meta.page - 1)}
              className="h-8 px-2.5 text-xs font-bold rounded-xl border-slate-200 bg-white shadow-2xs disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-0.5" />
              Previous
            </Button>

            {/* Page number pill */}
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
              {meta.page} / {meta.totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!meta.hasNextPage || isLoading}
              onClick={() => onPageChange(meta.page + 1)}
              className="h-8 px-2.5 text-xs font-bold rounded-xl border-slate-200 bg-white shadow-2xs disabled:opacity-40 cursor-pointer"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
