'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Globe, 
  Loader2,
  Mail,
  ExternalLink
} from 'lucide-react';
import type { PendingCompanyItem } from './PendingCompaniesQueue';

export function AdminDashboardPendingCompaniesCard() {
  const [companies, setCompanies] = useState<PendingCompanyItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const fetchPendingCompanies = useCallback(async () => {
    try {
      const res = await apiClient.get<ApiResponse<{ pendingCompanies: PendingCompanyItem[]; totalPending: number }>>(
        '/api/admin/companies/pending?limit=3'
      );
      if (res.data.success && res.data.data) {
        setCompanies(res.data.data.pendingCompanies || []);
        setTotalCount(res.data.data.totalPending || 0);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard pending companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingCompanies();
  }, [fetchPendingCompanies]);

  const handleVerifyCompany = async (companyId: string) => {
    setVerifyingId(companyId);
    try {
      const res = await apiClient.patch<ApiResponse<any>>(`/api/admin/companies/${companyId}/verify`, {
        isVerified: true,
      });
      if (res.data.success) {
        setCompanies((prev) => prev.filter((c) => c.id !== companyId));
        setTotalCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error verifying company:', err);
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all hover:border-purple-300/80">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs shrink-0">
              <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading tracking-tight">
                Pending Companies
              </h3>
              <p className="text-xs text-slate-500">
                Corporate employers awaiting recruiter portal verification
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 sm:px-3 py-1 text-xs font-black text-purple-800 border border-purple-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span>{totalCount} Pending</span>
          </span>
        </div>

        {/* List Body */}
        <div className="pt-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600 mb-2" />
              <p className="text-xs text-slate-500">Checking pending employers...</p>
            </div>
          ) : companies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 mb-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0A2540]">All Corporate Employers Verified</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">No companies currently awaiting approval.</p>
            </div>
          ) : (
            companies.map((company) => {
              const isVerifying = verifyingId === company.id;
              return (
                <div
                  key={company.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-purple-700 shrink-0 overflow-hidden shadow-2xs">
                      {company.logoUrl ? (
                        <img 
                          src={company.logoUrl} 
                          alt={company.name} 
                          className="h-full w-full object-cover"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      ) : (
                        <span>{company.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] truncate">
                          {company.name}
                        </h4>
                        {company.industry && (
                          <span className="hidden xs:inline-block px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-semibold text-[9px] border border-purple-200">
                            {company.industry}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-500">
                        {company.location && (
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{company.location}</span>
                          </span>
                        )}
                        {company.applicantRecruiter && (
                          <span className="text-slate-600 truncate max-w-[150px] hidden sm:inline">
                            👤 {company.applicantRecruiter.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleVerifyCompany(company.id)}
                    disabled={isVerifying}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                  >
                    {isVerifying ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accredit</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer / View All Link */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium">
          {totalCount > 3 ? `+${totalCount - 3} more awaiting review` : 'Real-time sync'}
        </span>
        <Link
          href="/admin/verification-queue"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-700 hover:text-purple-800 transition-colors group cursor-pointer"
        >
          <span>View All Companies ({totalCount})</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
