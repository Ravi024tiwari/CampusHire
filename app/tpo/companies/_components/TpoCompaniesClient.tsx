'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2, AlertCircle } from 'lucide-react';
import {
  TpoCompanyItem,
  TpoCompaniesFilterOptions,
  TpoCompaniesFilterState,
  TpoCompaniesKpis as KpiType,
  TpoCompanyInsights,
  TopRecruitingCompany,
  RecentVisitItem,
  TpoCompaniesResponse,
} from '../_types/tpo-companies.types';
import { TpoCompaniesHeader } from './TpoCompaniesHeader';
import { TpoCompaniesKpis } from './TpoCompaniesKpis';
import { TpoCompaniesFilters } from './TpoCompaniesFilters';
import { TpoCompaniesStatusTabs } from './TpoCompaniesStatusTabs';
import { TpoCompaniesTable } from './TpoCompaniesTable';
import { TpoCompaniesMobileList } from './TpoCompaniesMobileList';
import { TpoCompaniesInsights } from './TpoCompaniesInsights';
import { TpoCompaniesPagination } from './TpoCompaniesPagination';
import { TpoAddCompanyModal } from './TpoAddCompanyModal';

const initialFilters: TpoCompaniesFilterState = {
  search: '',
  status: 'ALL',
  industry: 'ALL',
  visitYear: 'ALL',
  companyType: 'ALL',
  placementStatus: 'ALL',
  location: 'ALL',
  academicYear: 'Academic Year 2025-26',
  limit: 10,
  page: 1,
};

export function TpoCompaniesClient() {
  const router = useRouter();
  const [filters, setFilters] = useState<TpoCompaniesFilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [companies, setCompanies] = useState<TpoCompanyItem[]>([]);
  const [kpis, setKpis] = useState<KpiType>({
    totalCompanies: { value: 64, growth: '+18% from last year' },
    visitedThisYear: { value: 48, growth: '+20% from last year' },
    jobOpportunities: { value: 186, growth: '+32% from last year' },
    studentsPlaced: { value: 142, growth: '+26% from last year' },
  });

  const [insights, setInsights] = useState<TpoCompanyInsights>({
    total: 64,
    visitedThisYear: 48,
    upcoming: 6,
    past: 10,
  });

  const [topRecruitingCompanies, setTopRecruitingCompanies] = useState<TopRecruitingCompany[]>([
    { id: 'comp_google', name: 'Google', logoUrl: 'https://www.google.com/favicon.ico', studentsPlaced: 18, industry: 'Technology' },
    { id: 'comp_microsoft', name: 'Microsoft', logoUrl: 'https://www.microsoft.com/favicon.ico', studentsPlaced: 15, industry: 'Technology' },
    { id: 'comp_amazon', name: 'Amazon', logoUrl: 'https://www.amazon.com/favicon.ico', studentsPlaced: 12, industry: 'E-commerce' },
    { id: 'comp_adobe', name: 'Adobe', logoUrl: 'https://www.adobe.com/favicon.ico', studentsPlaced: 10, industry: 'Software' },
    { id: 'comp_infosys', name: 'Infosys', logoUrl: 'https://www.infosys.com/favicon.ico', studentsPlaced: 9, industry: 'IT Services' },
  ]);

  const [recentVisits, setRecentVisits] = useState<RecentVisitItem[]>([
    { id: 'comp_google', name: 'Google', logoUrl: 'https://www.google.com/favicon.ico', visitDate: 'Aug 22, 2025', jobOpportunities: 12, studentsPlaced: 18, industry: 'Technology' },
    { id: 'comp_microsoft', name: 'Microsoft', logoUrl: 'https://www.microsoft.com/favicon.ico', visitDate: 'Aug 18, 2025', jobOpportunities: 10, studentsPlaced: 15, industry: 'Technology' },
    { id: 'comp_amazon', name: 'Amazon', logoUrl: 'https://www.amazon.com/favicon.ico', visitDate: 'Aug 12, 2025', jobOpportunities: 8, studentsPlaced: 12, industry: 'E-commerce' },
    { id: 'comp_adobe', name: 'Adobe', logoUrl: 'https://www.adobe.com/favicon.ico', visitDate: 'Jul 28, 2025', jobOpportunities: 6, studentsPlaced: 10, industry: 'Software' },
  ]);

  const [filterOptions, setFilterOptions] = useState<TpoCompaniesFilterOptions>({
    industries: ['Technology', 'E-commerce', 'Software', 'IT Services', 'Consulting', 'Finance', 'Healthcare'],
    visitYears: ['2025', '2024', '2023'],
    companyTypes: ['Product', 'Service', 'Consulting', 'MNC', 'Startup'],
    placementStatuses: ['Visited', 'Upcoming', 'Past'],
    locations: ['Bangalore', 'Hyderabad', 'Noida', 'Gurugram', 'Pune', 'Mumbai', 'Chennai', 'Remote'],
  });

  const [pagination, setPagination] = useState({
    total: 12,
    page: 1,
    limit: 10,
    totalPages: 2,
    hasNextPage: true,
    hasPrevPage: false,
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Active filters count
  const activeFilterCount = [
    filters.industry !== 'ALL' && filters.industry,
    filters.visitYear !== 'ALL' && filters.visitYear,
    filters.companyType !== 'ALL' && filters.companyType,
    filters.placementStatus !== 'ALL' && filters.placementStatus,
    filters.location !== 'ALL' && filters.location,
  ].filter(Boolean).length;

  const fetchCompanies = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);

      const params: Record<string, string> = {
        page: String(filters.page),
        limit: String(filters.limit),
        status: filters.status,
        academicYear: filters.academicYear,
      };

      if (filters.search.trim()) params.search = filters.search.trim();
      if (filters.industry !== 'ALL') params.industry = filters.industry;
      if (filters.visitYear !== 'ALL') params.visitYear = filters.visitYear;
      if (filters.companyType !== 'ALL') params.companyType = filters.companyType;
      if (filters.placementStatus !== 'ALL') params.placementStatus = filters.placementStatus;
      if (filters.location !== 'ALL') params.location = filters.location;

      const res = await axios.get<TpoCompaniesResponse>('/api/tpo/companies', { params });

      if (res.data?.success) {
        setCompanies(res.data.data || []);
        if (res.data.pagination) setPagination(res.data.pagination);
        if (res.data.kpis) setKpis(res.data.kpis);
        if (res.data.insights) setInsights(res.data.insights);
        if (res.data.topRecruitingCompanies) setTopRecruitingCompanies(res.data.topRecruitingCompanies);
        if (res.data.recentVisits) setRecentVisits(res.data.recentVisits);
        if (res.data.filterOptions) setFilterOptions(res.data.filterOptions);
      }
    } catch (err: any) {
      console.error('Failed to load companies:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to load companies. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleFilterChange = (key: keyof TpoCompaniesFilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1, // Reset to page 1 on filter/search change
    }));
  };

  const handleClearFilters = () => {
    setFilters((prev) => ({
      ...initialFilters,
      academicYear: prev.academicYear,
      status: prev.status,
    }));
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === companies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(companies.map((c) => c.id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
      {/* 1. Header Section */}
      <TpoCompaniesHeader
        academicYear={filters.academicYear}
        onAcademicYearChange={(year) => handleFilterChange('academicYear', year)}
        onAddCompany={() => setIsAddModalOpen(true)}
      />

      {/* 2. Primary KPI Cards */}
      <TpoCompaniesKpis kpis={kpis} isLoading={isLoading} />

      {/* 3. Search & Multi-Attribute Filters */}
      <TpoCompaniesFilters
        filters={filters}
        options={filterOptions}
        activeFilterCount={activeFilterCount}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* 4. Status Tabs */}
      <TpoCompaniesStatusTabs
        currentStatus={filters.status}
        onStatusChange={(status) => handleFilterChange('status', status)}
        insights={insights}
      />

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-3 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
          <button
            onClick={() => fetchCompanies()}
            className="ml-auto font-bold underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* 5. Main 2-Column Layout (Left: Table/Cards, Right: Insights Panel on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols on lg): Table on Desktop, Cards on Mobile, and Pagination */}
        <div className="lg:col-span-8 space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <TpoCompaniesTable
              companies={companies}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onViewCompany={(company) => router.push(`/tpo/companies/${company.id}`)}
              isLoading={isLoading}
            />
          </div>

          {/* Mobile Card List Stream */}
          <div className="block md:hidden">
            <TpoCompaniesMobileList
              companies={companies}
              onViewCompany={(company) => router.push(`/tpo/companies/${company.id}`)}
              isLoading={isLoading}
            />
          </div>

          {/* Pagination Controls */}
          <TpoCompaniesPagination
            total={pagination.total}
            page={pagination.page}
            limit={pagination.limit}
            totalPages={pagination.totalPages}
            onPageChange={(p) => handleFilterChange('page', p)}
            onLimitChange={(l) => handleFilterChange('limit', l)}
          />
        </div>

        {/* Right Column (4 cols on lg): Recruiter Insights Donut + Top Recruiters + Recent Visits */}
        <div className="lg:col-span-4 hidden lg:block space-y-4">
          <TpoCompaniesInsights
            insights={insights}
            topRecruitingCompanies={topRecruitingCompanies}
            recentVisits={recentVisits}
            onSelectCompanyByName={(name) => {
              if (name) {
                handleFilterChange('search', name);
              } else {
                handleClearFilters();
              }
            }}
          />
        </div>
      </div>

      {/* Mobile-only Insights Section at bottom */}
      <div className="block lg:hidden pt-4">
        <TpoCompaniesInsights
          insights={insights}
          topRecruitingCompanies={topRecruitingCompanies}
          recentVisits={recentVisits}
          onSelectCompanyByName={(name) => {
            if (name) {
              handleFilterChange('search', name);
            } else {
              handleClearFilters();
            }
          }}
        />
      </div>

      {/* Add Company Modal */}
      <TpoAddCompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => fetchCompanies()}
      />
    </div>
  );
}
