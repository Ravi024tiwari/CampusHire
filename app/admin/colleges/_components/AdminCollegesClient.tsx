'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { useAdminCollegesQuery, useVerifyCollegeMutation } from '@/hooks/queries/useAdminQueries';
import { AdminCollegesHeader } from './AdminCollegesHeader';
import { AdminCollegesKpiCards } from './AdminCollegesKpiCards';
import { AdminCollegesFilterBar } from './AdminCollegesFilterBar';
import { AdminCollegesTable } from './AdminCollegesTable';
import { AdminCollegesPagination } from './AdminCollegesPagination';
import { AdminCollegesQuickActions } from './AdminCollegesQuickActions';
import { AdminCollegesInsightsCard } from './AdminCollegesInsightsCard';
import { AdminCollegesRecentActivityCard } from './AdminCollegesRecentActivityCard';
import { AdminCollegesMobileView } from './AdminCollegesMobileView';
import { AdminCollegesFilterDrawer } from './AdminCollegesFilterDrawer';
import { AdminAddCollegeModal } from './AdminAddCollegeModal';

export function AdminCollegesClient() {
  const {
    adminCollegesRoster,
    adminCollegesKpis,
    adminCollegesInsights,
    adminCollegesRecentActivity,
    adminCollegesFilters,
    adminCollegesPagination,
    adminCollegesFilterOptions,
    setAdminCollegesFilters,
    resetAdminCollegesFilters,
    setToast,
  } = useAdminStore();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAddCollegeOpen, setIsAddCollegeOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [, startTransition] = useTransition();

  // TanStack Query for instant SWR caching & zero latency
  const { 
    data: collegesData, 
    isLoading: isCollegesLoading,
    refetch: refetchColleges
  } = useAdminCollegesQuery(adminCollegesFilters);

  const verifyMutation = useVerifyCollegeMutation();

  // Sync query data with store for backwards compatibility with subcomponents
  useEffect(() => {
    if (collegesData) {
      useAdminStore.setState({
        adminCollegesRoster: collegesData.colleges || [],
        adminCollegesKpis: collegesData.kpis,
        adminCollegesInsights: collegesData.insights,
        adminCollegesRecentActivity: collegesData.recentActivity || [],
        adminCollegesPagination: collegesData.pagination,
        adminCollegesFilterOptions: collegesData.filterOptions,
        isAdminCollegesLoading: false,
      });
    }
  }, [collegesData]);

  // Handle Multi-Selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === adminCollegesRoster.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(adminCollegesRoster.map((c) => c.id));
    }
  };

  // Quick Verification handler via TanStack Mutation
  const handleVerifyCollege = async (id: string, isVerified: boolean) => {
    try {
      await verifyMutation.mutateAsync({ collegeId: id, isVerified });
      setToast({
        type: 'success',
        message: `University accreditation ${isVerified ? 'approved' : 'revoked'} successfully!`,
      });
    } catch (err: any) {
      setToast({
        type: 'error',
        message: err.message || 'Failed to update university verification',
      });
    }
  };

  // CSV Data Export
  const handleExportData = () => {
    if (adminCollegesRoster.length === 0) {
      setToast({ type: 'info', message: 'No college records available to export.' });
      return;
    }

    setIsExporting(true);
    try {
      const headers = [
        'ID',
        'Name',
        'Code',
        'Domain',
        'Location',
        'Type',
        'Status',
        'Students Count',
        'Jobs Count',
        'Contact Email',
        'Contact Phone',
        'Joined Date',
      ];

      const rows = adminCollegesRoster.map((c) => [
        c.id,
        `"${c.name}"`,
        c.code || '',
        c.domain || '',
        `"${c.location}"`,
        `"${c.type}"`,
        c.status,
        c.studentsCount || 0,
        c.jobsCount || 0,
        c.contactEmail || '',
        c.contactPhone || '',
        new Date(c.createdAt).toISOString().split('T')[0],
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `campushire_colleges_export_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToast({
        type: 'success',
        message: `Successfully exported ${adminCollegesRoster.length} college records!`,
      });
    } catch (err) {
      console.error('Export error:', err);
      setToast({ type: 'error', message: 'Failed to export CSV data.' });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-5 sm:space-y-6">
      {/* 1. Header with Title & Add College Trigger */}
      <AdminCollegesHeader
        onAddCollege={() => setIsAddCollegeOpen(true)}
        onExportData={handleExportData}
        isExporting={isExporting}
      />

      {/* 2. Top 4 Metric KPI Cards with smooth swipe on mobile */}
      <AdminCollegesKpiCards
        kpis={adminCollegesKpis}
        isLoading={isCollegesLoading && !adminCollegesKpis}
      />

      {/* 3. Omni Search & Dropdowns Filter Bar */}
      <AdminCollegesFilterBar
        filters={adminCollegesFilters}
        filterOptions={adminCollegesFilterOptions}
        onFilterChange={(newFilters) => {
          startTransition(() => {
            setAdminCollegesFilters(newFilters);
          });
        }}
        onResetFilters={resetAdminCollegesFilters}
        onOpenMobileFilters={() => setIsFilterDrawerOpen(true)}
      />

      {/* 4. Main 2-Column Content Layout (Left: Table/Pagination, Right: Widgets) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols on XL desktop): Colleges Data Table & Pagination */}
        <div className="xl:col-span-8 space-y-4">
          {/* Desktop/Tablet Table */}
          <div className="hidden lg:block">
            <AdminCollegesTable
              colleges={adminCollegesRoster}
              isLoading={isCollegesLoading}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onVerifyCollege={handleVerifyCollege}
            />
          </div>

          {/* Mobile View with status tabs & cards */}
          <AdminCollegesMobileView
            colleges={adminCollegesRoster}
            kpis={adminCollegesKpis}
            filters={adminCollegesFilters}
            isLoading={isCollegesLoading}
            onFilterChange={(newFilters) => {
              startTransition(() => {
                setAdminCollegesFilters(newFilters);
              });
            }}
            onVerifyCollege={handleVerifyCollege}
          />

          {/* Pagination Bar */}
          {adminCollegesPagination.total > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
              <AdminCollegesPagination
                pagination={adminCollegesPagination}
                onPageChange={(page) => setAdminCollegesFilters({ page })}
                onLimitChange={(limit) => setAdminCollegesFilters({ limit, page: 1 })}
              />
            </div>
          )}
        </div>

        {/* Right Column (4 cols on XL desktop): Sidebar Widgets */}
        <div className="xl:col-span-4 space-y-5">
          {/* Quick Actions Card */}
          <AdminCollegesQuickActions
            onAddCollege={() => setIsAddCollegeOpen(true)}
            onVerifyColleges={() => setAdminCollegesFilters({ status: 'Pending' })}
            onExportData={handleExportData}
          />

          {/* College Insights Donut Card */}
          <AdminCollegesInsightsCard
            insights={adminCollegesInsights}
            isLoading={isCollegesLoading && !adminCollegesInsights}
          />

          {/* Recent Activity Timeline Stream */}
          <AdminCollegesRecentActivityCard
            recentActivity={adminCollegesRecentActivity}
            isLoading={isCollegesLoading && adminCollegesRecentActivity.length === 0}
          />
        </div>
      </div>

      {/* 5. Mobile Slide-Up Filter Drawer */}
      <AdminCollegesFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={adminCollegesFilters}
        filterOptions={adminCollegesFilterOptions}
        onApplyFilters={(filters) => setAdminCollegesFilters(filters)}
        onResetFilters={resetAdminCollegesFilters}
      />

      {/* 6. Add College Modal */}
      <AdminAddCollegeModal
        isOpen={isAddCollegeOpen}
        onClose={() => setIsAddCollegeOpen(false)}
        onSuccess={() => {
          refetchColleges();
        }}
      />
    </div>
  );
}
