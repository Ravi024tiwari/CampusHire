'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  RefreshCw, 
  Download, 
  Plus, 
  CheckCircle2, 
  X, 
  Sparkles,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { 
  useRecruiterApplicationsStore, 
  RecruiterApplicationItem 
} from '@/store/useRecruiterApplicationsStore';
import { RecruiterApplicationsStats } from './_components/RecruiterApplicationsStats';
import { RecruiterApplicationsFilters } from './_components/RecruiterApplicationsFilters';
import { RecruiterApplicationsStageTabs } from './_components/RecruiterApplicationsStageTabs';
import { RecruiterApplicationsTable } from './_components/RecruiterApplicationsTable';
import { RecruiterApplicationsCards } from './_components/RecruiterApplicationsCards';
import { RecruiterCandidateModal } from './_components/RecruiterCandidateModal';
import { RecruiterApplicationsBulkBar } from './_components/RecruiterApplicationsBulkBar';
import { RecruiterApplicationsPagination } from './_components/RecruiterApplicationsPagination';

export default function RecruiterApplicationsPage() {
  const { 
    applications, 
    stats, 
    pagination, 
    filters, 
    isLoading, 
    fetchApplications 
  } = useRecruiterApplicationsStore();

  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState<RecruiterApplicationItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  // Trigger initial fetch and reload on filter changes
  useEffect(() => {
    fetchApplications();
    setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [
    fetchApplications,
    filters.jobId,
    filters.status,
    filters.collegeId,
    filters.branch,
    filters.minCgpa,
    filters.searchQuery,
    filters.sortBy,
  ]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleManualRefresh = async () => {
    await fetchApplications();
    setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    showToast('Candidate pipeline & telemetry refreshed');
  };

  const handleExportCSV = () => {
    if (applications.length === 0) {
      showToast('No applications to export', 'info');
      return;
    }

    const headers = ['Candidate Name', 'Email', 'College', 'Branch', 'CGPA', 'Job Title', 'Status', 'Applied Date'];
    const rows = applications.map((app) => [
      `"${app.student.user.name}"`,
      `"${app.student.user.email}"`,
      `"${app.student.college.name}"`,
      `"${app.student.branch}"`,
      app.student.cgpa,
      `"${app.job.title}"`,
      `"${app.status}"`,
      `"${new Date(app.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CampusHire_Applications_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Applications exported to CSV successfully');
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 pb-28 transition-all duration-300 font-sans">
      
      {/* 1. Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#0A2540] text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Header: Title, Live Telemetry & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
              Candidate Applications
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
            Review student applicants, evaluate resumes, advance candidates across stages, and issue offer letters.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start md:self-auto">
          
          {/* Refresh button */}
          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isLoading}
            title={`Last updated: ${lastRefreshed}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          {/* Export CSV button */}
          <button
            type="button"
            onClick={handleExportCSV}
            title="Export applications to CSV"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 3. Top 5 KPI Metrics Carousel with Horizontal Scrolling */}
      <RecruiterApplicationsStats stats={stats} />

      {/* 4. Search & Multi-Filter Bar */}
      <RecruiterApplicationsFilters />

      {/* 5. Pipeline Stage Tabs Switcher */}
      <RecruiterApplicationsStageTabs stats={stats} />

      {/* 6. Candidate Applications List (Responsive: Always Cards on Mobile/Tablet, Switchable on Desktop) */}
      <div className="block lg:hidden">
        <RecruiterApplicationsCards
          applications={applications}
          onOpenCandidateModal={(app) => setSelectedCandidateForModal(app)}
          onSuccessToast={showToast}
        />
      </div>

      <div className="hidden lg:block">
        {filters.viewMode === 'table' ? (
          <RecruiterApplicationsTable
            applications={applications}
            onOpenCandidateModal={(app) => setSelectedCandidateForModal(app)}
            onSuccessToast={showToast}
          />
        ) : (
          <RecruiterApplicationsCards
            applications={applications}
            onOpenCandidateModal={(app) => setSelectedCandidateForModal(app)}
            onSuccessToast={showToast}
          />
        )}
      </div>

      {/* 7. Pagination */}
      <RecruiterApplicationsPagination
        pagination={pagination}
        onPageChange={(p) => fetchApplications(p)}
      />

      {/* 8. Candidate Review & Evaluation Modal */}
      {selectedCandidateForModal && (
        <RecruiterCandidateModal
          application={selectedCandidateForModal}
          onClose={() => setSelectedCandidateForModal(null)}
          onSuccessToast={showToast}
        />
      )}

      {/* 9. Floating Bulk Action Toolbar */}
      <RecruiterApplicationsBulkBar onSuccessToast={showToast} />

    </div>
  );
}
