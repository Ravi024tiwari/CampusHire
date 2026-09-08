'use strict';
'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { TpoStudentsHeader } from './TpoStudentsHeader';
import { TpoStudentsKpis } from './TpoStudentsKpis';
import { TpoStudentsFilters, FilterState } from './TpoStudentsFilters';
import { TpoStudentsTable, StudentRowData } from './TpoStudentsTable';
import { TpoStudentsMobileList } from './TpoStudentsMobileList';
import { TpoStudentsPagination } from './TpoStudentsPagination';
import { TpoMobileFilterDrawer } from './TpoMobileFilterDrawer';
import { TpoAddStudentModal } from './TpoAddStudentModal';

const initialFilters: FilterState = {
  search: '',
  branch: 'ALL',
  batchYear: 'ALL',
  placementStatus: 'ALL',
  minCgpa: '',
  maxCgpa: '',
  applicationStatus: 'ALL',
  verificationStatus: 'ALL',
};

export function TpoStudentsClient() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [students, setStudents] = useState<StudentRowData[]>([]);
  const [kpis, setKpis] = useState({
    totalStudents: { value: 0, growth: '+ 12% from last year' },
    placementEligible: { value: 0, growth: '+ 8% from last year' },
    placedStudents: { value: 0, growth: '+ 16% from last year' },
    inInterview: { value: 0, growth: '+ 24% from last year' },
  });
  const [collegeInfo, setCollegeInfo] = useState<{ name?: string }>({});
  const [filterOptions, setFilterOptions] = useState<{
    branches: string[];
    batchYears: number[];
  }>({ branches: [], batchYears: [] });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    from: 0,
    to: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Fetch students from backend API with complete filters & pagination
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string | number> = {
        page,
        limit,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      };

      if (debouncedSearch) params.search = debouncedSearch;
      if (filters.branch !== 'ALL') params.branch = filters.branch;
      if (filters.batchYear !== 'ALL') params.batchYear = Number(filters.batchYear);
      if (filters.placementStatus !== 'ALL') params.placementStatus = filters.placementStatus;
      if (filters.minCgpa) params.minCgpa = Number(filters.minCgpa);
      if (filters.maxCgpa) params.maxCgpa = Number(filters.maxCgpa);
      if (filters.applicationStatus !== 'ALL')
        params.applicationStatus = filters.applicationStatus;
      if (filters.verificationStatus !== 'ALL')
        params.verificationStatus = filters.verificationStatus;

      const res = await axios.get('/api/tpo/students', { params });
      if (res.data.success) {
        const { students, kpis, filterOptions, pagination, college } = res.data.data;
        setStudents(students || []);
        if (kpis) setKpis(kpis);
        if (filterOptions) setFilterOptions(filterOptions);
        if (pagination) setPagination(pagination);
        if (college) setCollegeInfo(college);
      }
    } catch (error) {
      console.error('Failed to load students roster:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearch, filters.branch, filters.batchYear, filters.placementStatus, filters.minCgpa, filters.maxCgpa, filters.applicationStatus, filters.verificationStatus]);

  useEffect(() => {
    startTransition(() => {
      fetchStudents();
    });
  }, [fetchStudents]);

  // Filter change handler
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters(initialFilters);
    setPage(1);
  };

  // Calculate active filter count
  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.branch !== 'ALL' ? 1 : 0) +
    (filters.batchYear !== 'ALL' ? 1 : 0) +
    (filters.placementStatus !== 'ALL' ? 1 : 0) +
    (filters.minCgpa ? 1 : 0) +
    (filters.maxCgpa ? 1 : 0) +
    (filters.applicationStatus !== 'ALL' ? 1 : 0) +
    (filters.verificationStatus !== 'ALL' ? 1 : 0);

  // Multi-selection handlers
  const handleSelectStudent = (id: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudentIds.length === students.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(students.map((s) => s.id));
    }
  };

  // View student details - Navigate to dedicated profile dossier page
  const handleViewStudent = (student: StudentRowData) => {
    router.push(`/tpo/students/${student.id}`);
  };

  // Export filtered students as CSV
  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      // Export all matching students (limit: 500)
      const params: Record<string, string | number> = {
        page: 1,
        limit: 500,
      };

      if (filters.branch !== 'ALL') params.branch = filters.branch;
      if (filters.batchYear !== 'ALL') params.batchYear = Number(filters.batchYear);
      if (filters.placementStatus !== 'ALL') params.placementStatus = filters.placementStatus;
      if (debouncedSearch) params.search = debouncedSearch;

      const res = await axios.get('/api/tpo/students', { params });
      const exportList: StudentRowData[] = res.data.data?.students || students;

      const headers = [
        'Name',
        'Email',
        'Enrollment No',
        'Branch',
        'Batch',
        'CGPA',
        'Applications',
        'Placement Status',
        'Account Status',
      ];

      const csvRows = [
        headers.join(','),
        ...exportList.map((s) =>
          [
            `"${s.name.replace(/"/g, '""')}"`,
            `"${s.email}"`,
            `"${s.enrollmentNumber}"`,
            `"${s.branch}"`,
            s.batchYear,
            s.cgpa || '',
            s.applicationsCount,
            s.placementStatus,
            s.isActive ? 'Active' : 'Inactive',
          ].join(',')
        ),
      ];

      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `Students_Roster_${collegeInfo.name?.replace(/\s+/g, '_') || 'College'}_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 lg:space-y-7 transition-all duration-300 ease-in-out pb-20 md:pb-14">
      {/* 1. Top Header */}
      <TpoStudentsHeader
        collegeName={collegeInfo.name || 'Delhi Technological University'}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onExport={handleExportCsv}
        isExporting={isExporting}
      />

      {/* 2. Top 4 KPI Metrics */}
      <TpoStudentsKpis kpis={kpis} isLoading={isLoading} />

      {/* 3. Desktop / Tablet Filter Bar */}
      <div className="hidden md:block">
        <TpoStudentsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          availableBranches={filterOptions.branches}
          availableBatches={filterOptions.batchYears}
          activeFilterCount={activeFilterCount}
        />
      </div>

      {/* 4. Desktop / Tablet Data Table */}
      <div className="hidden md:block">
        <TpoStudentsTable
          students={students}
          selectedStudentIds={selectedStudentIds}
          onSelectStudent={handleSelectStudent}
          onSelectAll={handleSelectAll}
          onViewStudent={handleViewStudent}
          isLoading={isLoading}
        />
      </div>

      {/* 5. Mobile Student Card List */}
      <TpoStudentsMobileList
        students={students}
        filters={filters}
        onFilterChange={handleFilterChange}
        onOpenMobileFilterDrawer={() => setIsFilterDrawerOpen(true)}
        onViewStudent={handleViewStudent}
        totalStudentsCount={kpis.totalStudents.value}
        placedStudentsCount={kpis.placedStudents.value}
        eligibleStudentsCount={kpis.placementEligible.value}
        inInterviewCount={kpis.inInterview.value}
        isLoading={isLoading}
      />

      {/* 6. Production-Grade Pagination */}
      <TpoStudentsPagination
        page={pagination.page}
        limit={pagination.limit}
        total={pagination.total}
        totalPages={pagination.totalPages}
        from={pagination.from}
        to={pagination.to}
        onPageChange={(p) => setPage(p)}
        onLimitChange={(l) => {
          setLimit(l);
          setPage(1);
        }}
      />

      {/* 7. Mobile Bottom Sheet Filter Drawer */}
      <TpoMobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        onApply={() => fetchStudents()}
        availableBranches={filterOptions.branches}
        availableBatches={filterOptions.batchYears}
      />

      {/* 8. Add Student Modal */}
      <TpoAddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onStudentAdded={() => {
          fetchStudents();
        }}
        availableBranches={filterOptions.branches}
      />
    </div>
  );
}
