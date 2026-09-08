'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle } from 'lucide-react';
import { 
  TpoApplicationItem, 
  TpoApplicationsFilterOptions, 
  TpoApplicationsFilterState, 
  TpoApplicationsKpis as KpiType, 
  TpoApplicationsResponse 
} from '../_types/tpo-applications.types';
import { TpoApplicationsHeader } from './TpoApplicationsHeader';
import { TpoApplicationsKpis } from './TpoApplicationsKpis';
import { TpoApplicationsFilters } from './TpoApplicationsFilters';
import { TpoApplicationsStatusTabs } from './TpoApplicationsStatusTabs';
import { TpoApplicationsTable } from './TpoApplicationsTable';
import { TpoApplicationsMobileList } from './TpoApplicationsMobileList';
import { TpoApplicationsPagination } from './TpoApplicationsPagination';
import { TpoApplicationDetailModal } from './TpoApplicationDetailModal';

const initialFilters: TpoApplicationsFilterState = {
  search: '',
  status: 'ALL',
  companyName: 'ALL',
  jobTitle: 'ALL',
  branch: 'ALL',
  batchYear: 'ALL',
  location: 'ALL',
  appliedDate: '',
  academicYear: 'Academic Year 2025–26',
  limit: 10,
  page: 1,
};

export function TpoApplicationsClient() {
  const [filters, setFilters] = useState<TpoApplicationsFilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [applications, setApplications] = useState<TpoApplicationItem[]>([]);
  const [kpis, setKpis] = useState<KpiType>({
    total: { value: 1240, growth: '+18% from last month' },
    underReview: { value: 520, growth: '+12% from last month' },
    shortlisted: { value: 380, growth: '+24% from last month' },
    interviewed: { value: 220, growth: '+16% from last month' },
    offersReceived: { value: 120, growth: '+20% from last month' },
    rejected: { value: 160, growth: '-2% from last month' },
  });

  const [filterOptions, setFilterOptions] = useState<TpoApplicationsFilterOptions>({
    companies: [
      { id: 'google', label: 'Google' },
      { id: 'microsoft', label: 'Microsoft' },
      { id: 'amazon', label: 'Amazon' },
      { id: 'adobe', label: 'Adobe' },
      { id: 'accenture', label: 'Accenture' },
      { id: 'tesla', label: 'Tesla' },
      { id: 'infosys', label: 'Infosys' },
      { id: 'deloitte', label: 'Deloitte' },
      { id: 'ibm', label: 'IBM' },
    ],
    jobRoles: [
      'Software Engineer',
      'Data Analyst',
      'SDE Intern',
      'Product Analyst',
      'Frontend Developer',
      'Backend Developer',
      'DevOps Engineer',
      'Data Scientist',
      'ML Intern',
      'Business Analyst',
    ],
    branches: ['CSE', 'ECE', 'ME', 'EE', 'IT', 'CE', 'BT'],
    batchYears: [2026, 2025, 2024],
    locations: ['Bangalore', 'Hyderabad', 'Noida', 'Gurugram', 'Pune', 'Mumbai', 'Remote'],
  });

  const [pagination, setPagination] = useState({
    total: 10,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedAppForDetail, setSelectedAppForDetail] = useState<TpoApplicationItem | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Active filters count
  const activeFilterCount = [
    filters.companyName !== 'ALL' && filters.companyName,
    filters.jobTitle !== 'ALL' && filters.jobTitle,
    filters.branch !== 'ALL' && filters.branch,
    filters.batchYear !== 'ALL' && filters.batchYear,
    filters.location !== 'ALL' && filters.location,
    filters.appliedDate,
    filters.status !== 'ALL' && filters.status,
  ].filter(Boolean).length;

  // Fetch applications from API
  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const params = new URLSearchParams();
      params.set('page', filters.page.toString());
      params.set('limit', filters.limit.toString());
      if (filters.search) params.set('search', filters.search);
      if (filters.status && filters.status !== 'ALL') params.set('status', filters.status);
      if (filters.companyName && filters.companyName !== 'ALL') params.set('companyName', filters.companyName);
      if (filters.jobTitle && filters.jobTitle !== 'ALL') params.set('jobTitle', filters.jobTitle);
      if (filters.branch && filters.branch !== 'ALL') params.set('branch', filters.branch);
      if (filters.batchYear && filters.batchYear !== 'ALL') params.set('batchYear', filters.batchYear);
      if (filters.location && filters.location !== 'ALL') params.set('location', filters.location);
      if (filters.appliedDate) params.set('appliedDate', filters.appliedDate);
      if (filters.academicYear) params.set('academicYear', filters.academicYear);

      const res = await axios.get(`/api/tpo/applications?${params.toString()}`);
      if (res.data.success && res.data.data) {
        const d: TpoApplicationsResponse = res.data.data;
        setApplications(d.applications || []);
        if (d.kpis) setKpis(d.kpis);
        if (d.filterOptions) setFilterOptions(d.filterOptions);
        if (d.pagination) setPagination(d.pagination);
      }
    } catch (err: any) {
      console.error('Failed to fetch TPO applications:', err);
      setErrorMsg('Failed to load applications. Showing cached data.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Handlers
  const handleFilterChange = (updates: Partial<TpoApplicationsFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleClearAll = () => {
    setFilters({
      ...initialFilters,
      academicYear: filters.academicYear,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(applications.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExportCsv = () => {
    try {
      setIsExporting(true);
      const headers = ['Application ID', 'Student Name', 'Branch', 'Batch', 'CGPA', 'Job Title', 'Company', 'Applied Date', 'Current Stage'];
      const rows = applications.map((a) => [
        a.id,
        `"${a.student.name}"`,
        a.student.branch,
        a.student.batchYear,
        a.student.cgpa,
        `"${a.job.title}"`,
        `"${a.job.company?.name}"`,
        `"${a.createdAt}"`,
        a.status,
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `campus_applications_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('CSV export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleStatusUpdated = (updatedApp: TpoApplicationItem) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === updatedApp.id ? updatedApp : a))
    );
    setSelectedAppForDetail(null);
  };

  return (
    <div className="p-3.5 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 transition-all duration-300 ease-in-out pb-24 md:pb-16">
      
      {/* 1. Header */}
      <TpoApplicationsHeader
        totalCount={pagination.total}
        academicYear={filters.academicYear}
        onAcademicYearChange={(yr) => handleFilterChange({ academicYear: yr, page: 1 })}
        onExportCsv={handleExportCsv}
        isExporting={isExporting}
      />

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Top KPI Metric Cards */}
      <TpoApplicationsKpis
        kpis={kpis}
        selectedStatus={filters.status}
        onSelectStatus={(status) => handleFilterChange({ status, page: 1 })}
      />

      {/* 3. Search & Multi-attribute Filters */}
      <TpoApplicationsFilters
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        showAdvanced={showAdvanced}
        onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
        activeFilterCount={activeFilterCount}
      />

      {/* 4. Quick Status Pill Tabs */}
      <TpoApplicationsStatusTabs
        currentStatus={filters.status}
        onSelectStatus={(status) => handleFilterChange({ status, page: 1 })}
        counts={{
          total: kpis.total?.value || pagination.total,
          underReview: kpis.underReview?.value || 0,
          shortlisted: kpis.shortlisted?.value || 0,
          interviewed: kpis.interviewed?.value || 0,
          offered: kpis.offersReceived?.value || 0,
          rejected: kpis.rejected?.value || 0,
        }}
      />

      {/* 5. Main Roster Content (Desktop Table & Mobile Stream) */}
      {isLoading ? (
        <div className="p-12 rounded-3xl bg-white border border-slate-200 flex flex-col items-center justify-center text-center space-y-3 shadow-2xs">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-xs font-bold text-slate-700">Loading candidate applications...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <TpoApplicationsTable
              applications={applications}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onToggleSelect={handleToggleSelect}
              onViewDetails={(app) => setSelectedAppForDetail(app)}
            />
          </div>

          {/* Mobile Stream View */}
          <div className="block sm:hidden">
            <TpoApplicationsMobileList
              applications={applications}
              onViewDetails={(app) => setSelectedAppForDetail(app)}
            />
          </div>

          {/* 6. Pagination Footer */}
          <TpoApplicationsPagination
            total={pagination.total}
            page={pagination.page}
            limit={pagination.limit}
            totalPages={pagination.totalPages}
            onPageChange={(page) => handleFilterChange({ page })}
            onLimitChange={(limit) => handleFilterChange({ limit, page: 1 })}
          />
        </>
      )}

      {/* 7. Application Dossier Modal */}
      <TpoApplicationDetailModal
        application={selectedAppForDetail}
        onClose={() => setSelectedAppForDetail(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </div>
  );
}
