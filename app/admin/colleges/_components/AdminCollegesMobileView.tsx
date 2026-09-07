'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MoreHorizontal, 
  ExternalLink, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Eye, 
  Users, 
  Briefcase 
} from 'lucide-react';
import type { 
  AdminCollegeRosterItem, 
  AdminCollegeKpis, 
  AdminCollegeFilters 
} from '@/store/useAdminStore';

interface AdminCollegesMobileViewProps {
  colleges: AdminCollegeRosterItem[];
  kpis: AdminCollegeKpis | null;
  filters: AdminCollegeFilters;
  isLoading?: boolean;
  onFilterChange: (filters: Partial<AdminCollegeFilters>) => void;
  onVerifyCollege?: (id: string, isVerified: boolean) => void;
}

export function AdminCollegesMobileView({
  colleges,
  kpis,
  filters,
  isLoading = false,
  onFilterChange,
  onVerifyCollege,
}: AdminCollegesMobileViewProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const statusTabs = [
    { id: 'ALL', label: 'All' },
    { id: 'Verified', label: 'Verified' },
    { id: 'Pending', label: 'Pending' },
    { id: 'Rejected', label: 'Rejected' },
  ];

  const totalCount = kpis?.totalColleges?.value ?? 186;
  const verifiedCount = kpis?.verifiedColleges?.value ?? 142;
  const pendingCount = kpis?.pendingVerification?.value ?? 32;
  const rejectedCount = kpis?.rejectedColleges?.value ?? 12;

  return (
    <div className="lg:hidden space-y-4">
      {/* 1. Status Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {statusTabs.map((tab) => {
          const isActive = (filters.status || 'ALL') === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange({ status: tab.id })}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#0D8B8A] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Mini KPI Stats Summary Row */}
      <div className="grid grid-cols-4 gap-2 bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs text-center">
        <div className="space-y-0.5">
          <span className="text-sm font-black text-[#0A2540] block">
            {totalCount}
          </span>
          <span className="text-[10px] font-bold text-slate-400 block">
            Total
          </span>
        </div>
        <div className="space-y-0.5 border-l border-slate-100">
          <span className="text-sm font-black text-emerald-600 block">
            {verifiedCount}
          </span>
          <span className="text-[10px] font-bold text-slate-400 block">
            Verified
          </span>
        </div>
        <div className="space-y-0.5 border-l border-slate-100">
          <span className="text-sm font-black text-amber-600 block">
            {pendingCount}
          </span>
          <span className="text-[10px] font-bold text-slate-400 block">
            Pending
          </span>
        </div>
        <div className="space-y-0.5 border-l border-slate-100">
          <span className="text-sm font-black text-rose-600 block">
            {rejectedCount}
          </span>
          <span className="text-[10px] font-bold text-slate-400 block">
            Rejected
          </span>
        </div>
      </div>

      {/* 3. College Cards List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs animate-pulse space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                  <div className="h-3 w-1/2 bg-slate-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : colleges.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-2 shadow-xs">
          <Building2 className="w-8 h-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No colleges found</h4>
          <p className="text-xs text-slate-500">Try changing your search or status filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {colleges.map((college) => {
            const statusBadge = {
              Verified: {
                bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                dot: 'bg-emerald-500',
                text: 'Verified',
              },
              Pending: {
                bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
                dot: 'bg-amber-500',
                text: 'Pending',
              },
              Rejected: {
                bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
                dot: 'bg-rose-500',
                text: 'Rejected',
              },
            }[college.status] || {
              bg: 'bg-slate-50 text-slate-700 border-slate-200',
              dot: 'bg-slate-400',
              text: college.status,
            };

            const initials = college.code
              ? college.code.slice(0, 3).toUpperCase()
              : college.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

            return (
              <div
                key={college.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs relative"
              >
                {/* Top Row: Logo, Name, Location, Status, Menu */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Logo / Initials */}
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0D8B8A]/10 to-teal-500/20 border border-[#0D8B8A]/20 flex items-center justify-center shrink-0 text-[#0D8B8A] font-black text-xs shadow-xs">
                      {college.logoUrl ? (
                        <img
                          src={college.logoUrl}
                          alt={college.name}
                          className="w-full h-full object-contain p-1 rounded-xl"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>

                    {/* Name & Location */}
                    <div className="min-w-0">
                      <Link
                        href={`/admin/colleges/${college.id}`}
                        className="text-sm font-bold text-[#0A2540] hover:text-[#0D8B8A] transition-colors truncate block"
                      >
                        {college.name}
                      </Link>
                      <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                        {college.location || `${college.city || ''}, ${college.state || ''}`}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status badge & 3-dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                      {statusBadge.text}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuId(activeMenuId === college.id ? null : college.id)
                      }
                      aria-label="Action options"
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Popover Action Menu */}
                {activeMenuId === college.id && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setActiveMenuId(null)}
                    />
                    <div className="absolute right-4 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <Link
                        href={`/admin/colleges/${college.id}`}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0D8B8A]"
                        onClick={() => setActiveMenuId(null)}
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>View Details</span>
                      </Link>

                      {college.status !== 'Verified' && onVerifyCollege && (
                        <button
                          type="button"
                          onClick={() => {
                            onVerifyCollege(college.id, true);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Verify College</span>
                        </button>
                      )}

                      {college.status === 'Verified' && onVerifyCollege && (
                        <button
                          type="button"
                          onClick={() => {
                            onVerifyCollege(college.id, false);
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                          <span>Revoke Verification</span>
                        </button>
                      )}

                      {college.contactEmail && (
                        <a
                          href={`mailto:${college.contactEmail}`}
                          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          onClick={() => setActiveMenuId(null)}
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>Contact TPO</span>
                        </a>
                      )}
                    </div>
                  </>
                )}

                {/* Bottom Row: Students Count & Jobs Posted */}
                <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      <strong className="text-slate-800">{college.studentsCount?.toLocaleString() || 0}</strong> Students
                    </span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      <strong className="text-slate-800">{college.jobsCount || 0}</strong> Jobs
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
