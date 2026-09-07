'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useAdminStore, type AdminStudentItem } from '@/store/useAdminStore';
import { AdminStudentsHeader } from './AdminStudentsHeader';
import { AdminStudentsKpiCards } from './AdminStudentsKpiCards';
import { AdminStudentsFilterBar } from './AdminStudentsFilterBar';
import { AdminStudentsTable } from './AdminStudentsTable';
import { AdminStudentsMobileCardList } from './AdminStudentsMobileCardList';
import { AdminStudentsPagination } from './AdminStudentsPagination';
import { AdminStudentsFilterDrawer } from './AdminStudentsFilterDrawer';
import { AdminAddStudentModal } from './AdminAddStudentModal';

export function AdminStudentsClient() {
  const {
    adminStudents,
    adminStudentKpis,
    adminStudentFilters,
    adminStudentPagination,
    adminStudentFilterOptions,
    isAdminStudentsLoading,
    fetchAdminStudents,
    setAdminStudentFilters,
    resetAdminStudentFilters,
    setToast,
  } = useAdminStore();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [, startTransition] = useTransition();

  // Initial fetch on mount
  useEffect(() => {
    fetchAdminStudents();
  }, [fetchAdminStudents]);

  // Handle Multi-Selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === adminStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(adminStudents.map((s) => s.id));
    }
  };

  // CSV Data Export
  const handleExportData = () => {
    if (adminStudents.length === 0) {
      setToast({ type: 'info', message: 'No student records available to export.' });
      return;
    }

    setIsExporting(true);
    try {
      const headers = [
        'ID',
        'Name',
        'Email',
        'Enrollment Number',
        'College',
        'Branch',
        'Batch Year',
        'CGPA',
        'Status',
        'Placement Status',
        'Skills',
        'Joined Date',
      ];

      const rows = adminStudents.map((s) => [
        s.id,
        `"${s.name}"`,
        s.email,
        s.enrollmentNumber,
        `"${s.college.name}"`,
        `"${s.branch}"`,
        s.batchYear,
        s.cgpa,
        s.status,
        s.placementStatus,
        `"${s.skills.join(', ')}"`,
        new Date(s.joinedOn).toISOString().split('T')[0],
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute(
        'download',
        `campushire_students_export_${new Date().toISOString().split('T')[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToast({
        type: 'success',
        message: `Successfully exported ${adminStudents.length} student records!`,
      });
    } catch (err) {
      console.error('Export error:', err);
      setToast({ type: 'error', message: 'Failed to export CSV data.' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleViewStudent = (student: AdminStudentItem) => {
    setToast({
      type: 'info',
      message: `Viewing candidate dossier for ${student.name} (${student.enrollmentNumber})`,
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-5 sm:space-y-6">
      
      {/* 1. Header with Title & Action Triggers */}
      <AdminStudentsHeader
        onExport={handleExportData}
        onAddStudent={() => setIsAddStudentOpen(true)}
        isExporting={isExporting}
      />

      {/* 2. Top 4 Metric KPI Cards */}
      <AdminStudentsKpiCards
        kpis={adminStudentKpis}
        isLoading={isAdminStudentsLoading && !adminStudentKpis}
      />

      {/* 3. Search & Filter Bar */}
      <AdminStudentsFilterBar
        filters={adminStudentFilters}
        filterOptions={adminStudentFilterOptions}
        onFilterChange={(newFilters) => {
          startTransition(() => {
            setAdminStudentFilters(newFilters);
          });
        }}
        onResetFilters={resetAdminStudentFilters}
        onOpenMobileFilters={() => setIsFilterDrawerOpen(true)}
      />

      {/* 4. Desktop/Tablet Data Table */}
      <div className="hidden lg:block">
        <AdminStudentsTable
          students={adminStudents}
          isLoading={isAdminStudentsLoading}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onViewStudent={handleViewStudent}
        />
      </div>

      {/* 5. Mobile Card View List */}
      <AdminStudentsMobileCardList
        students={adminStudents}
        isLoading={isAdminStudentsLoading}
        onViewStudent={handleViewStudent}
      />

      {/* 6. Pagination Bar */}
      {adminStudentPagination.total > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <AdminStudentsPagination
            pagination={adminStudentPagination}
            onPageChange={(page) => setAdminStudentFilters({ page })}
            onLimitChange={(limit) => setAdminStudentFilters({ limit, page: 1 })}
          />
        </div>
      )}

      {/* 7. Mobile Filter Drawer Modal */}
      <AdminStudentsFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={adminStudentFilters}
        filterOptions={adminStudentFilterOptions}
        onApplyFilters={(filters) => setAdminStudentFilters(filters)}
        onResetFilters={resetAdminStudentFilters}
      />

      {/* 8. Add Student Modal */}
      <AdminAddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        filterOptions={adminStudentFilterOptions}
        onSuccess={() => {
          setToast({ type: 'success', message: 'Candidate added to directory!' });
          fetchAdminStudents();
        }}
      />

    </div>
  );
}
