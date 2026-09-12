'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useAdminStore, type AdminJobItem } from '@/store/useAdminStore';
import { AdminJobsHeader } from './AdminJobsHeader';
import { AdminJobsKpiCards } from './AdminJobsKpiCards';
import { AdminJobsFilterBar } from './AdminJobsFilterBar';
import { AdminJobsTable } from './AdminJobsTable';
import { AdminJobsPagination } from './AdminJobsPagination';
import { AdminJobsSidebar } from './AdminJobsSidebar';
import { AdminJobsMobileList } from './AdminJobsMobileList';
import { AdminJobsFilterDrawer } from './AdminJobsFilterDrawer';

export function AdminJobsClient() {
  const {
    adminJobs,
    adminJobKpis,
    adminJobInsights,
    adminJobTopCompanies,
    adminJobRecentActivity,
    adminJobFilters,
    adminJobPagination,
    adminJobFilterOptions,
    isAdminJobsLoading,
    fetchAdminJobs,
    setAdminJobFilters,
    resetAdminJobFilters,
    setToast,
  } = useAdminStore();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [, startTransition] = useTransition();

  // Fetch jobs on component mount
  useEffect(() => {
    fetchAdminJobs();
  }, [fetchAdminJobs]);

  // Handle Multi-Selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === adminJobs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(adminJobs.map((j) => j.id));
    }
  };

  // CSV Data Export
  const handleExportData = () => {
    if (adminJobs.length === 0) {
      setToast({ type: 'info', message: 'No job postings available to export.' });
      return;
    }

    setIsExporting(true);
    try {
      const headers = [
        'Job ID',
        'Job Title',
        'Company',
        'Location',
        'Type',
        'Salary Package',
        'Status',
        'Applicants Count',
        'Offers Count',
        'Min CGPA',
        'Deadline',
        'Posted Date',
      ];

      const rows = adminJobs.map((j) => [
        j.id,
        `"${j.title.replace(/"/g, '""')}"`,
        `"${(j.company?.name || '').replace(/"/g, '""')}"`,
        `"${j.location}"`,
        j.type,
        `"${j.salaryPackage}"`,
        j.status,
        j.applicantsCount,
        j.offersIssuedCount,
        j.minCgpa,
        new Date(j.deadline).toISOString().split('T')[0],
        new Date(j.postedAt).toISOString().split('T')[0],
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `campushire_jobs_export_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToast({
        type: 'success',
        message: `Successfully exported ${adminJobs.length} job records!`,
      });
    } catch (err) {
      console.error('Export error:', err);
      setToast({ type: 'error', message: 'Failed to export jobs CSV.' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleViewJob = (job: AdminJobItem) => {
    setToast({
      type: 'info',
      message: `Viewing job details for ${job.title} at ${job.company?.name}`,
    });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setToast({
      type: 'success',
      message: `Job status updated to ${newStatus}`,
    });
    fetchAdminJobs();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1700px] mx-auto space-y-5 sm:space-y-6">
      
      {/* 1. Header with Title & Actions */}
      <AdminJobsHeader
        onExport={handleExportData}
        isExporting={isExporting}
      />

      {/* 2. Top 4 Metric KPI Cards */}
      <AdminJobsKpiCards
        kpis={adminJobKpis}
        isLoading={isAdminJobsLoading && !adminJobKpis}
      />

      {/* 3. Search & 2-Row Filters Bar */}
      <AdminJobsFilterBar
        filters={adminJobFilters}
        filterOptions={adminJobFilterOptions}
        onFilterChange={(newFilters) => {
          startTransition(() => {
            setAdminJobFilters(newFilters);
          });
        }}
        onResetFilters={resetAdminJobFilters}
        onOpenMobileFilters={() => setIsFilterDrawerOpen(true)}
      />

      {/* 4. Main Body: Grid with Table & Right Sidebar on Desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Column: Jobs Table & Pagination (spans 8-9 cols on XL) */}
        <div className="xl:col-span-8 2xl:col-span-9 space-y-4">
          
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <AdminJobsTable
              jobs={adminJobs}
              isLoading={isAdminJobsLoading}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onViewJob={handleViewJob}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Mobile Card List View */}
          <AdminJobsMobileList
            jobs={adminJobs}
            isLoading={isAdminJobsLoading}
            activeStatus={adminJobFilters.status}
            onStatusSelect={(status) => setAdminJobFilters({ status, page: 1 })}
            onViewJob={handleViewJob}
            onStatusChange={handleStatusChange}
          />

          {/* Production-Grade Pagination Bar */}
          {adminJobPagination.total > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs">
              <AdminJobsPagination
                pagination={adminJobPagination}
                onPageChange={(page) => setAdminJobFilters({ page })}
                onLimitChange={(limit) => setAdminJobFilters({ limit, page: 1 })}
              />
            </div>
          )}

        </div>

        {/* Right Column: Widgets Sidebar (Job Insights, Top Companies, Recent Activity) */}
        <div className="hidden xl:block xl:col-span-4 2xl:col-span-3">
          <AdminJobsSidebar
            insights={adminJobInsights}
            topCompanies={adminJobTopCompanies}
            recentActivity={adminJobRecentActivity}
          />
        </div>

      </div>

      {/* 5. Mobile Filter Drawer */}
      <AdminJobsFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={adminJobFilters}
        filterOptions={adminJobFilterOptions}
        onApplyFilters={(filters) => setAdminJobFilters(filters)}
        onResetFilters={resetAdminJobFilters}
      />

    </div>
  );
}
