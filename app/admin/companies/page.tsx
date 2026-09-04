'use client';

import React, { useEffect, useState, useMemo } from 'react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { 
  Building2, 
  Search, 
  Loader2, 
  Sparkles, 
  AlertCircle, 
  X 
} from 'lucide-react';
import { CompanyKpiMetricsRow } from './_components/CompanyKpiMetricsRow';
import { CompanyFiltersToolbar } from './_components/CompanyFiltersToolbar';
import { CompanyCard } from './_components/CompanyCard';
import { RecruiterManagementModal } from './_components/RecruiterManagementModal';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { 
  CompanyItem, 
  RecruiterMember, 
  SortOption, 
  StatusFilterOption 
} from './_types/company.types';

export default function CompaniesAdminPage() {
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('NEWEST');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('ALL');
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Recruiter Team Management Modal State
  const [selectedCompany, setSelectedCompany] = useState<CompanyItem | null>(null);
  const [recruiters, setRecruiters] = useState<RecruiterMember[]>([]);
  const [loadingRecruiters, setLoadingRecruiters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add Recruiter Form State
  const [newRecruiterName, setNewRecruiterName] = useState('');
  const [newRecruiterEmail, setNewRecruiterEmail] = useState('');
  const [newRecruiterPassword, setNewRecruiterPassword] = useState('Password@123');
  const [newRecruiterDesignation, setNewRecruiterDesignation] = useState('Senior Campus Recruiter');
  const [newRecruiterAvatarUrl, setNewRecruiterAvatarUrl] = useState('');
  const [isSubmittingRecruiter, setIsSubmittingRecruiter] = useState(false);
  const [recruiterFormError, setRecruiterFormError] = useState<string | null>(null);
  const [recruiterFormSuccess, setRecruiterFormSuccess] = useState<string | null>(null);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<{ companies: CompanyItem[] }>>('/api/admin/companies?limit=100');
      if (response.data.success && response.data.data) {
        setCompanies(response.data.data.companies || []);
      }
    } catch (err) {
      console.error('Failed to fetch companies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleToggleVerification = async (company: CompanyItem) => {
    setVerifyingId(company.id);
    setActionError(null);
    try {
      const nextStatus = !company.isVerified;
      const res = await apiClient.patch<ApiResponse<CompanyItem>>(`/api/admin/companies/${company.id}/verify`, {
        isVerified: nextStatus,
      });

      if (res.data.success) {
        setCompanies((prev) =>
          prev.map((c) => (c.id === company.id ? { ...c, isVerified: nextStatus } : c))
        );
      } else {
        throw new Error(res.data.error || 'Failed to update company verification status');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error updating company verification');
    } finally {
      setVerifyingId(null);
    }
  };

  const openRecruiterTeamModal = async (company: CompanyItem) => {
    setSelectedCompany(company);
    setShowAddForm(false);
    setRecruiterFormError(null);
    setRecruiterFormSuccess(null);
    setLoadingRecruiters(true);

    try {
      const res = await apiClient.get<ApiResponse<{ recruiters: RecruiterMember[] }>>(
        `/api/companies/${company.id}/recruiters`
      );
      if (res.data.success && res.data.data) {
        setRecruiters(res.data.data.recruiters || []);
      }
    } catch (err: any) {
      console.error('Failed to load recruiters:', err);
    } finally {
      setLoadingRecruiters(false);
    }
  };

  const handleAddRecruiter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) return;

    setIsSubmittingRecruiter(true);
    setRecruiterFormError(null);
    setRecruiterFormSuccess(null);

    try {
      const payload = {
        name: newRecruiterName.trim(),
        email: newRecruiterEmail.trim().toLowerCase(),
        password: newRecruiterPassword,
        designation: newRecruiterDesignation.trim(),
        avatarUrl: newRecruiterAvatarUrl.trim() || undefined,
      };

      const res = await apiClient.post<ApiResponse<any>>(
        `/api/companies/${selectedCompany.id}/recruiters`,
        payload
      );

      if (res.data.success) {
        // Refresh recruiters list
        const refreshedRes = await apiClient.get<ApiResponse<{ recruiters: RecruiterMember[] }>>(
          `/api/companies/${selectedCompany.id}/recruiters`
        );
        if (refreshedRes.data.success && refreshedRes.data.data) {
          setRecruiters(refreshedRes.data.data.recruiters || []);
        }

        // Update company recruiter count in parent state
        setCompanies((prev) =>
          prev.map((c) =>
            c.id === selectedCompany.id
              ? {
                  ...c,
                  _count: {
                    jobs: c._count?.jobs || 0,
                    offers: c._count?.offers || 0,
                    recruiters: (c._count?.recruiters || 0) + 1,
                  },
                }
              : c
          )
        );

        setRecruiterFormSuccess('Recruiter successfully provisioned & activated!');

        // Reset form fields
        setNewRecruiterName('');
        setNewRecruiterEmail('');
        setNewRecruiterPassword('Password@123');
        setNewRecruiterDesignation('Senior Campus Recruiter');
        setNewRecruiterAvatarUrl('');

        setTimeout(() => {
          setShowAddForm(false);
          setRecruiterFormSuccess(null);
        }, 1200);
      } else {
        throw new Error(res.data.error || 'Failed to add recruiter');
      }
    } catch (err: any) {
      setRecruiterFormError(err.message || 'Failed to add recruiter to company');
    } finally {
      setIsSubmittingRecruiter(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // Distinct industries for filter dropdown
  const industriesList = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((c) => {
      if (c.industry) set.add(c.industry.trim());
    });
    return Array.from(set);
  }, [companies]);

  // Aggregate KPI Metrics
  const totalPartners = companies.length;
  const verifiedCount = companies.filter((c) => c.isVerified).length;
  const pendingCount = companies.filter((c) => !c.isVerified).length;
  const totalRecruitersCount = companies.reduce((acc, c) => acc + (c._count?.recruiters || 0), 0);
  const totalDrivesCount = companies.reduce((acc, c) => acc + (c._count?.jobs || 0), 0);

  // Filtered & Sorted Companies
  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        if (statusFilter === 'VERIFIED' && !company.isVerified) return false;
        if (statusFilter === 'PENDING' && company.isVerified) return false;
        if (selectedIndustry !== 'ALL' && company.industry !== selectedIndustry) return false;

        if (!search) return true;
        const normalizedSearch = search.toLowerCase().trim();
        return (
          company.name.toLowerCase().includes(normalizedSearch) ||
          Boolean(company.industry && company.industry.toLowerCase().includes(normalizedSearch)) ||
          Boolean(company.location && company.location.toLowerCase().includes(normalizedSearch)) ||
          Boolean(company.website && company.website.toLowerCase().includes(normalizedSearch))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'NAME_ASC') return a.name.localeCompare(b.name);
        if (sortBy === 'MOST_DRIVES') return (b._count?.jobs || 0) - (a._count?.jobs || 0);
        if (sortBy === 'MOST_RECRUITERS') return (b._count?.recruiters || 0) - (a._count?.recruiters || 0);
        // Default NEWEST
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [companies, statusFilter, selectedIndustry, search, sortBy]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8 transition-all duration-300 ease-in-out">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/15 to-blue-500/10 text-purple-700 border border-purple-200/60 shadow-xs shrink-0">
            <Building2 className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
                Corporate Hiring Partners
              </h1>
              <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 border-purple-200/80">
                <Sparkles className="w-3 h-3" />
                <span>Enterprise Directory</span>
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 max-w-3xl">
              Authorize corporate partners, review pending accreditation requests, and provision verified recruitment teams.
            </p>
          </div>
        </div>

        {/* Search Bar using shadcn Input */}
        <div className="relative w-full lg:w-96 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
          <Input
            type="text"
            placeholder="Search by company, industry, or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full h-auto rounded-2xl border-slate-200 bg-white py-2.5 sm:py-3 pl-10 pr-10 text-xs sm:text-sm text-[#0A2540] placeholder:text-slate-400 focus-visible:border-purple-500 focus-visible:ring-4 focus-visible:ring-purple-500/10 font-medium shadow-xs transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-md cursor-pointer z-10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. KPI Metrics Ribbon Component */}
      <CompanyKpiMetricsRow
        totalPartners={totalPartners}
        verifiedCount={verifiedCount}
        pendingCount={pendingCount}
        totalRecruitersCount={totalRecruitersCount}
        totalDrivesCount={totalDrivesCount}
      />

      {/* 3. Filter & Sort Toolbar Component */}
      <CompanyFiltersToolbar
        totalCompanies={companies.length}
        pendingCount={pendingCount}
        verifiedCount={verifiedCount}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        industriesList={industriesList}
        selectedIndustry={selectedIndustry}
        onIndustryChange={setSelectedIndustry}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {actionError && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* 4. Corporate Partners Card Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-2xs">
          <Loader2 className="h-9 w-9 animate-spin text-purple-600 mb-3" />
          <h3 className="text-sm sm:text-base font-bold text-[#0A2540]">Loading Corporate Directory...</h3>
          <p className="text-xs text-slate-500 mt-0.5">Fetching partner records, recruiters roster, and placement statistics.</p>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 text-center p-6 shadow-2xs">
          <div className="h-16 w-16 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-3">
            <Building2 className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-base font-bold text-[#0A2540]">No Corporate Partners Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
            {search || statusFilter !== 'ALL' || selectedIndustry !== 'ALL'
              ? 'No companies match your current search and filter criteria. Try adjusting your filters.'
              : 'Corporate partner profiles will appear here as employers register on the platform.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5 xl:gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              isProcessing={verifyingId === company.id}
              onOpenRecruiters={openRecruiterTeamModal}
              onToggleVerification={handleToggleVerification}
            />
          ))}
        </div>
      )}

      {/* 5. Recruiter Team Management Modal Component */}
      <RecruiterManagementModal
        selectedCompany={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        recruiters={recruiters}
        loadingRecruiters={loadingRecruiters}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        newRecruiterName={newRecruiterName}
        setNewRecruiterName={setNewRecruiterName}
        newRecruiterEmail={newRecruiterEmail}
        setNewRecruiterEmail={setNewRecruiterEmail}
        newRecruiterPassword={newRecruiterPassword}
        setNewRecruiterPassword={setNewRecruiterPassword}
        newRecruiterDesignation={newRecruiterDesignation}
        setNewRecruiterDesignation={setNewRecruiterDesignation}
        isSubmittingRecruiter={isSubmittingRecruiter}
        recruiterFormError={recruiterFormError}
        recruiterFormSuccess={recruiterFormSuccess}
        onAddRecruiter={handleAddRecruiter}
        copiedEmail={copiedEmail}
        onCopyEmail={copyToClipboard}
      />

    </div>
  );
}
