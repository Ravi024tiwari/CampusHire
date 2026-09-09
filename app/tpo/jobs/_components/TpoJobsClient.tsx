'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { TpoJobsHeader } from './TpoJobsHeader';
import { TpoJobsKpiCards } from './TpoJobsKpiCards';
import { TpoJobsFilterBar, FilterState, FilterOptions } from './TpoJobsFilterBar';
import { TpoJobsTabsAndSort, JobTabType, TabCounts } from './TpoJobsTabsAndSort';
import { TpoJobCard, TpoJobItem } from './TpoJobCard';
import { TpoJobsInsightsSidebar } from './TpoJobsInsightsSidebar';
import { TpoJobsPagination } from './TpoJobsPagination';
import { TpoJobDetailModal } from './TpoJobDetailModal';
import { TpoMobileFilterDrawer } from './TpoMobileFilterDrawer';
import { 
  Briefcase, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  FileSpreadsheet, 
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';

export function TpoJobsClient() {
  const [selectedYear, setSelectedYear] = useState('2025-26');
  const [activeTab, setActiveTab] = useState<JobTabType>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    companyId: 'ALL',
    role: 'ALL',
    type: 'ALL',
    location: 'ALL',
    branch: 'ALL',
    batchYear: 'ALL',
  });

  // Debounced search query
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // UI state
  const [jobs, setJobs] = useState<TpoJobItem[]>([]);
  const [kpis, setKpis] = useState({
    totalJobs: 0,
    recruitingCompanies: 0,
    newThisWeek: 0,
    closingSoon: 0,
  });
  const [tabCounts, setTabCounts] = useState<TabCounts>({
    all: 0,
    open: 0,
    closingSoon: 0,
    internships: 0,
    fullTime: 0,
  });
  const [insights, setInsights] = useState({
    breakdown: { open: 0, closingSoon: 0, internships: 0, fullTime: 0 },
    topRecruitingCompanies: [],
    popularJobRoles: [],
    recentPostings: [],
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    companies: [],
    roles: [],
    locations: [],
    branches: [],
    batches: [],
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasMore: false,
    hasPrev: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobForModal, setSelectedJobForModal] = useState<TpoJobItem | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search);
      setPage(1); // Reset page on search change
    }, 350);

    return () => clearTimeout(handler);
  }, [filters.search]);

  // Toast Helper
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Compute active filters count (excluding default 'ALL' or empty)
  const activeFilterCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'search') return val.trim().length > 0;
    return val && val !== 'ALL';
  }).length;

  // Handle single filter change
  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset page on filter changes
  };

  // Clear all filters
  const handleClearAll = () => {
    setFilters({
      search: '',
      companyId: 'ALL',
      role: 'ALL',
      type: 'ALL',
      location: 'ALL',
      branch: 'ALL',
      batchYear: 'ALL',
    });
    setDebouncedSearch('');
    setActiveTab('all');
    setPage(1);
    showToast('All filters have been reset', 'info');
  };

  // Fetch Jobs from backend API
  const fetchJobs = useCallback(
    async (isManualRefresh = false) => {
      try {
        if (isManualRefresh) setIsRefreshing(true);
        else setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('limit', limit.toString());
        params.set('sortBy', sortBy);

        if (selectedYear && selectedYear !== 'ALL') {
          params.set('academicYear', selectedYear);
        }

        if (activeTab && activeTab !== 'all') {
          params.set('tab', activeTab);
        }

        if (debouncedSearch.trim()) {
          params.set('search', debouncedSearch.trim());
        }

        if (filters.companyId && filters.companyId !== 'ALL') {
          params.set('companyId', filters.companyId);
        }

        if (filters.role && filters.role !== 'ALL') {
          params.set('role', filters.role);
        }

        if (filters.type && filters.type !== 'ALL') {
          params.set('type', filters.type);
        }

        if (filters.location && filters.location !== 'ALL') {
          params.set('location', filters.location);
        }

        if (filters.branch && filters.branch !== 'ALL') {
          params.set('branch', filters.branch);
        }

        if (filters.batchYear && filters.batchYear !== 'ALL') {
          params.set('batchYear', filters.batchYear);
        }

        const res = await fetch(`/api/tpo/jobs?${params.toString()}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.error || 'Failed to load job opportunities');
        }

        const data = json.data;
        setJobs(data.jobs || []);
        if (data.kpis) setKpis(data.kpis);
        if (data.tabCounts) setTabCounts(data.tabCounts);
        if (data.insights) setInsights(data.insights);
        if (data.filterOptions) setFilterOptions(data.filterOptions);
        if (data.pagination) setPagination(data.pagination);

        if (isManualRefresh) {
          showToast('Job opportunities refreshed successfully');
        }
      } catch (err: any) {
        console.error('[TPO_JOBS_FETCH_ERROR]', err);
        setError(err.message || 'Error loading job opportunities');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [page, limit, sortBy, selectedYear, activeTab, debouncedSearch, filters]
  );

  // Trigger fetch when query dependencies change
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Status Change handler from Job Detail Modal
  const handleJobStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tpo/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update job status');
      }

      showToast(`Drive status successfully updated to ${newStatus}`);
      // Refresh current dataset
      fetchJobs(true);
      if (selectedJobForModal && selectedJobForModal.id === jobId) {
        setSelectedJobForModal({ ...selectedJobForModal, status: newStatus });
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update job status', 'error');
    }
  };

  // Export current filtered jobs as CSV
  const handleExportCSV = () => {
    try {
      setIsExporting(true);
      if (jobs.length === 0) {
        showToast('No job records available to export', 'info');
        return;
      }

      const headers = [
        'Job ID',
        'Job Title',
        'Company Name',
        'Job Type',
        'Status',
        'Location',
        'Package CTC',
        'Min CGPA',
        'Allowed Branches',
        'Eligible Batches',
        'Application Deadline',
        'Total Applicants',
      ];

      const rows = jobs.map((j) => [
        `"${j.id}"`,
        `"${j.title.replace(/"/g, '""')}"`,
        `"${j.company.name.replace(/"/g, '""')}"`,
        `"${j.type}"`,
        `"${j.status}"`,
        `"${j.location.replace(/"/g, '""')}"`,
        `"${j.salaryPackage || ''}"`,
        `"${j.minCgpa}"`,
        `"${(j.allowedBranches || []).join(', ')}"`,
        `"${(j.eligibleBatches || []).join(', ')}"`,
        `"${j.deadline ? new Date(j.deadline).toLocaleDateString() : ''}"`,
        `"${j.totalApplications}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `CampusHire_Jobs_${selectedYear}_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('Job records exported successfully to CSV');
    } catch (err: any) {
      showToast('Failed to export jobs', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-5">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md text-xs sm:text-sm font-semibold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-900/90 text-white border-emerald-500/30'
                : toastMessage.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-500/30'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toastMessage.type === 'info' && <AlertCircle className="w-4 h-4 text-blue-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* 1. Header Section */}
      <TpoJobsHeader
        selectedYear={selectedYear}
        onYearChange={(yr) => {
          setSelectedYear(yr);
          setPage(1);
        }}
        onExport={handleExportCSV}
        isExporting={isExporting}
        onRefresh={() => fetchJobs(true)}
        isLoading={isRefreshing}
      />

      {/* 2. Top 4 Summary KPI Metric Cards */}
      <TpoJobsKpiCards
        kpis={kpis}
        isLoading={isLoading && jobs.length === 0}
        onCardClick={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
      />

      {/* 3. Search & Multi-Faceted Filters Bar */}
      <TpoJobsFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        filterOptions={filterOptions}
        activeFilterCount={activeFilterCount}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
      />

      {/* 4. Tabs & Sort Ordering Bar */}
      <TpoJobsTabsAndSort
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setPage(1);
        }}
        tabCounts={tabCounts}
        sortBy={sortBy}
        onSortChange={(val) => {
          setSortBy(val);
          setPage(1);
        }}
      />

      {/* 5. Main Content Grid (Left: Job Cards Feed | Right: Insights Analytics Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        {/* Left Column: Job Cards Feed (8 cols on large, 12 on mobile) */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-3.5">
          {/* Loading Skeletons */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs animate-pulse flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="w-48 h-4 rounded-md bg-slate-200" />
                      <div className="w-32 h-3 rounded-md bg-slate-100" />
                      <div className="w-64 h-3 rounded-md bg-slate-100 pt-1" />
                    </div>
                  </div>
                  <div className="w-24 h-8 rounded-xl bg-slate-100 shrink-0 hidden sm:block" />
                </div>
              ))}
            </div>
          ) : error ? (
            /* Error State */
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
              <h3 className="text-sm font-bold text-rose-900">Failed to load placement opportunities</h3>
              <p className="text-xs text-rose-700 max-w-md mx-auto">{error}</p>
              <button
                onClick={() => fetchJobs(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          ) : jobs.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-slate-200/90 rounded-2xl p-10 text-center space-y-3.5 shadow-2xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto shadow-2xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0A2540] font-heading">
                  No Job Opportunities Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  We couldn&apos;t find any placement drives matching your current filter criteria or academic year.
                </p>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          ) : (
            /* Job Cards Feed List */
            <div className="space-y-3">
              {jobs.map((job) => (
                <TpoJobCard
                  key={job.id}
                  job={job}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!isLoading && jobs.length > 0 && (
            <TpoJobsPagination
              page={pagination.page}
              limit={pagination.limit}
              total={pagination.total}
              totalPages={pagination.totalPages}
              onPageChange={(p) => setPage(p)}
              onLimitChange={(l) => {
                setLimit(l);
                setPage(1);
              }}
            />
          )}
        </div>

        {/* Right Column: Job Insights Sidebar (4 cols on large) */}
        <div className="lg:col-span-4 xl:col-span-4">
          <TpoJobsInsightsSidebar
            insights={insights}
            totalJobs={kpis.totalJobs}
            onSelectCompany={(companyId) => {
              handleFilterChange('companyId', companyId);
            }}
            onSelectRole={(role) => {
              handleFilterChange('role', role);
            }}
            onViewAllJobs={() => {
              handleClearAll();
            }}
          />
        </div>
      </div>

      {/* 7. Mobile Slide-Over Filter Drawer */}
      <TpoMobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        filterOptions={filterOptions}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
}
