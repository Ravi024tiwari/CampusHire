'use client';

import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { 
  Building2, 
  CheckCircle2, 
  Globe, 
  MapPin, 
  Mail, 
  Loader2, 
  Search, 
  User, 
  Briefcase,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export interface PendingCompanyItem {
  id: string;
  name: string;
  website: string | null;
  logoUrl: string | null;
  industry: string | null;
  location: string | null;
  description: string | null;
  isVerified: boolean;
  submittedAt: string;
  totalRecruitersRegistered: number;
  applicantRecruiter: {
    recruiterId: string;
    userId: string;
    name: string;
    email: string;
    avatarUrl: string | null;
    designation: string | null;
    registeredAt: string;
  } | null;
}

interface PendingCompaniesQueueProps {
  onCountUpdate?: (count: number) => void;
}

export function PendingCompaniesQueue({ onCountUpdate }: PendingCompaniesQueueProps) {
  const [companies, setCompanies] = useState<PendingCompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchPendingCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<{ pendingCompanies: PendingCompanyItem[]; totalPending: number }>>(
        '/api/admin/companies/pending?limit=50'
      );
      if (response.data.success && response.data.data) {
        const list = response.data.data.pendingCompanies || [];
        setCompanies(list);
        if (onCountUpdate) {
          onCountUpdate(response.data.data.totalPending || list.length);
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch pending companies:', err);
    } finally {
      setLoading(false);
    }
  }, [onCountUpdate]);

  useEffect(() => {
    fetchPendingCompanies();
  }, [fetchPendingCompanies]);

  const handleVerifyCompany = async (company: PendingCompanyItem) => {
    setVerifyingId(company.id);
    setActionError(null);
    setActionSuccess(null);

    try {
      const res = await apiClient.patch<ApiResponse<any>>(`/api/admin/companies/${company.id}/verify`, {
        isVerified: true,
      });

      if (res.data.success) {
        setCompanies((prev) => prev.filter((c) => c.id !== company.id));
        setActionSuccess(`"${company.name}" has been accredited and unlocked for placement drives!`);
        if (onCountUpdate) {
          onCountUpdate(Math.max(0, companies.length - 1));
        }

        setTimeout(() => {
          setActionSuccess(null);
        }, 4000);
      } else {
        throw new Error(res.data.error || 'Failed to verify company');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error updating company accreditation status');
    } finally {
      setVerifyingId(null);
    }
  };

  const filteredCompanies = companies.filter((c) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(query) ||
      Boolean(c.industry && c.industry.toLowerCase().includes(query)) ||
      Boolean(c.location && c.location.toLowerCase().includes(query)) ||
      Boolean(c.website && c.website.toLowerCase().includes(query)) ||
      Boolean(c.applicantRecruiter && c.applicantRecruiter.name.toLowerCase().includes(query)) ||
      Boolean(c.applicantRecruiter && c.applicantRecruiter.email.toLowerCase().includes(query))
    );
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-6 xl:p-8 shadow-xs">
      
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search pending companies by name, industry, location, or recruiter email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 sm:py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600/20 font-medium transition-all"
        />
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {actionError && (
        <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Companies List Body */}
      <div className="mt-4 sm:mt-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2.5" />
            <p className="text-xs sm:text-sm font-bold text-slate-700">Loading pending corporate registrations...</p>
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 mb-3 shadow-2xs">
              <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0A2540]">
              {companies.length === 0 ? 'No Pending Company Accreditations' : 'No Companies Match Filter'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
              {companies.length === 0 
                ? 'All registered corporate employers have been verified and granted drive creation access.'
                : 'Try adjusting your search query to view matching unverified companies.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-3.5">
            {filteredCompanies.map((company) => {
              const isVerifying = verifyingId === company.id;
              return (
                <div
                  key={company.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 transition-all duration-200 hover:shadow-md hover:border-purple-300 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4"
                >
                  {/* Left: Logo + Company Info */}
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                    
                    {/* Emblem */}
                    <div className="h-11 w-11 sm:h-13 sm:w-13 xl:h-14 xl:w-14 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-purple-700 font-black shadow-2xs">
                      {company.logoUrl ? (
                        <img 
                          src={company.logoUrl} 
                          alt={company.name} 
                          className="h-full w-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xs sm:text-sm xl:text-base font-extrabold">
                          {company.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0A2540] leading-snug">
                          {company.name}
                        </h4>

                        {company.industry && (
                          <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-purple-700 border border-purple-200">
                            {company.industry}
                          </span>
                        )}

                        <span className="rounded-full bg-amber-50 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-amber-800 border border-amber-200">
                          Pending Approval
                        </span>
                      </div>

                      {/* Detail Tags */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        {company.location && (
                          <span className="flex items-center gap-1 font-medium text-[11px] sm:text-xs">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            {company.location}
                          </span>
                        )}

                        {company.website && (
                          <a
                            href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-[11px] sm:text-xs underline underline-offset-2"
                          >
                            <Globe className="h-3.5 w-3.5 shrink-0" />
                            <span>{company.website.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                          </a>
                        )}

                        {company.applicantRecruiter && (
                          <span className="flex items-center gap-1 font-medium text-[11px] sm:text-xs text-slate-700">
                            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>Recruiter: {company.applicantRecruiter.name} ({company.applicantRecruiter.email})</span>
                          </span>
                        )}
                      </div>

                      {company.description && (
                        <p className="text-xs text-slate-500 line-clamp-1 max-w-2xl pt-0.5">
                          {company.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => handleVerifyCompany(company)}
                      disabled={isVerifying}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-purple-600/25 transition-all hover:scale-102 active:scale-98 disabled:opacity-50 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
                          <span>Accrediting...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                          <span>Accredit & Verify Company</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
