'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  UserCheck, 
  Plus, 
  Building2, 
  Loader2, 
  ShieldCheck, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecruiterKpiMetricsRow } from './_components/RecruiterKpiMetricsRow';
import { RecruiterFiltersToolbar } from './_components/RecruiterFiltersToolbar';
import { RecruiterTable } from './_components/RecruiterTable';
import { AddRecruiterModal } from './_components/AddRecruiterModal';

function RecruitersHubContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Query Parameters
  const initialCompanyId = searchParams.get('companyId') || 'all';
  const initialCompanyName = searchParams.get('companyName') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(initialCompanyId);
  const [selectedDesignation, setSelectedDesignation] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Global Zustand Admin Store
  const {
    recruiters,
    recruiterCompanies,
    recruiterMeta,
    recruiterStats,
    isRecruitersLoading,
    fetchRecruiters,
  } = useAdminStore();

  // Fetch or filter through Zustand Store / API
  const handleFetch = useCallback(() => {
    fetchRecruiters({
      search: searchQuery,
      companyId: selectedCompanyId,
      designation: selectedDesignation,
      page: currentPage,
      limit: 20,
    });
  }, [fetchRecruiters, searchQuery, selectedCompanyId, selectedDesignation, currentPage]);

  // Reactive debounce fetch
  useEffect(() => {
    const handler = setTimeout(() => {
      handleFetch();
    }, 200);
    return () => clearTimeout(handler);
  }, [handleFetch]);

  // Sync URL search parameter changes
  useEffect(() => {
    const cid = searchParams.get('companyId');
    if (cid && cid !== selectedCompanyId) {
      setSelectedCompanyId(cid);
      setCurrentPage(1);
    }
  }, [searchParams, selectedCompanyId]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCompanyId('all');
    setSelectedDesignation('all');
    setCurrentPage(1);
    router.replace('/admin/recruiters');
  };

  const isFiltered = searchQuery !== '' || (selectedCompanyId !== 'all' && selectedCompanyId !== '') || selectedDesignation !== 'all';
  const activeCompanyName = recruiterCompanies.find((c) => c.id === selectedCompanyId)?.name || initialCompanyName;

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out">
      
      {/* 1. Page Header & Primary Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-2xs shrink-0">
            <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
                Corporate Recruiter Operations
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-black text-indigo-700 border border-indigo-200">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                Authorized Teams
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-3xl">
              Inspect corporate talent leads, manage partner access, and provision certified company recruiters.
            </p>
          </div>
        </div>

        {/* Primary Action Button to Add New Recruiter */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 shadow-md shadow-blue-600/20 transition-all hover:scale-102 cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Provision Recruiter</span>
          </Button>
        </div>
      </div>

      {/* 2. Active Company Filter Banner (Displays when navigated from a specific Company Card) */}
      {selectedCompanyId !== 'all' && activeCompanyName && (
        <div className="flex items-center justify-between gap-2 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border border-purple-200/80 shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-900 min-w-0">
            <Building2 className="h-4 w-4 text-purple-600 shrink-0" />
            <span className="truncate">
              Filtered for Corporate Partner: <strong className="text-purple-950 underline underline-offset-2">{activeCompanyName}</strong>
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="h-7 px-2 text-xs font-bold text-purple-700 hover:text-purple-900 hover:bg-purple-100 rounded-lg shrink-0 gap-1"
          >
            <X className="h-3.5 w-3.5" />
            <span>Show All Companies</span>
          </Button>
        </div>
      )}

      {/* 3. KPI Metrics Row (Compact responsive mobile sizing) */}
      <RecruiterKpiMetricsRow
        totalRecruiters={recruiterStats.totalRecruiters}
        verifiedCompaniesCount={recruiterStats.verifiedCompaniesCount}
        totalDrivesCount={recruiterStats.totalDrivesCount}
        filteredCount={recruiterMeta.total}
      />

      {/* 4. Multi-Dimensional Filter Toolbar */}
      <RecruiterFiltersToolbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedCompanyId={selectedCompanyId}
        onCompanyChange={(cid) => {
          setSelectedCompanyId(cid);
          setCurrentPage(1);
        }}
        selectedDesignation={selectedDesignation}
        onDesignationChange={(d) => {
          setSelectedDesignation(d);
          setCurrentPage(1);
        }}
        companies={recruiterCompanies}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
        totalResults={recruiterMeta.total}
      />

      {/* 5. Recruiters Data Table & Pagination */}
      <RecruiterTable
        recruiters={recruiters}
        meta={recruiterMeta}
        onPageChange={(page) => {
          setCurrentPage(page);
          fetchRecruiters({
            search: searchQuery,
            companyId: selectedCompanyId,
            designation: selectedDesignation,
            page,
            limit: 20,
          });
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        isLoading={isRecruitersLoading}
      />

      {/* 6. Provision Recruiter Modal */}
      <AddRecruiterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        companies={recruiterCompanies}
        preSelectedCompanyId={selectedCompanyId !== 'all' ? selectedCompanyId : undefined}
        onSuccess={() => {
          handleFetch();
        }}
      />

    </div>
  );
}

export default function AdminRecruitersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
        </div>
      }
    >
      <RecruitersHubContent />
    </Suspense>
  );
}
