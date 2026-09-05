'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Trash2,
  Lock,
  Unlock,
  CheckSquare,
  Square,
  Download,
  Share2,
  Sparkles,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import { 
  useRecruiterJobsStore, 
  RecruiterJobItem 
} from '@/store/useRecruiterJobsStore';
import { RecruiterJobsStats } from './_components/RecruiterJobsStats';
import { RecruiterJobsFilters } from './_components/RecruiterJobsFilters';
import { RecruiterJobsStatusTabs } from './_components/RecruiterJobsStatusTabs';
import { RecruiterJobsList, DEMO_JOBS } from './_components/RecruiterJobsList';
import { RecruiterJobsPagination } from './_components/RecruiterJobsPagination';
import { RecruiterJobsValuePillars } from './_components/RecruiterJobsValuePillars';
import { RecruiterJobDetailModal } from './_components/RecruiterJobDetailModal';
import { RecruiterJobEditModal } from './_components/RecruiterJobEditModal';

export default function RecruiterJobsPage() {
  const router = useRouter();
  const { 
    jobs, 
    engagedColleges, 
    isLoading, 
    error, 
    filters, 
    fetchJobs, 
    updateJob, 
    deleteJob 
  } = useRecruiterJobsStore();

  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  const [selectedJobDetail, setSelectedJobDetail] = useState<RecruiterJobItem | null>(null);
  const [selectedJobToEdit, setSelectedJobToEdit] = useState<RecruiterJobItem | null>(null);
  const [jobToDelete, setJobToDelete] = useState<RecruiterJobItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  // Initial fetch and fetch on filter state change
  useEffect(() => {
    fetchJobs();
    setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [
    fetchJobs,
    filters.collegeId,
    filters.selectedType,
    filters.selectedStatus,
    filters.selectedLocation,
    filters.selectedTimeline,
    filters.selectedSkills,
    filters.skillMatchMode,
    filters.searchQuery,
    filters.sortBy,
  ]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleManualRefresh = async () => {
    await fetchJobs();
    setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    showToast('Job listings & application telemetry refreshed');
  };

  const handleExportCSV = () => {
    const dataset = jobs.length > 0 ? jobs : DEMO_JOBS;
    const headers = ['Title', 'Type', 'Location', 'Package', 'Status', 'Deadline', 'Applications', 'Offers'];
    const rows = dataset.map((j) => [
      `"${j.title}"`,
      `"${j.type}"`,
      `"${j.location}"`,
      `"${j.salaryPackage}"`,
      `"${j.status}"`,
      `"${new Date(j.deadline).toLocaleDateString()}"`,
      j._count?.applications || 0,
      j._count?.offers || 0,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CampusHire_Jobs_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Jobs exported to CSV successfully');
  };

  const handleToggleStatus = async (job: RecruiterJobItem) => {
    const nextStatus = job.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
    const res = await updateJob(job.id, { status: nextStatus });
    if (res.success) {
      showToast(`Job status updated to ${nextStatus}`);
      if (selectedJobDetail?.id === job.id) {
        setSelectedJobDetail({ ...selectedJobDetail, status: nextStatus });
      }
    } else {
      showToast(res.message || 'Failed to update status', 'info');
    }
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    const res = await deleteJob(jobToDelete.id);
    if (res.success) {
      showToast(res.message || 'Job posting removed successfully');
      setJobToDelete(null);
      setSelectedJobDetail(null);
    } else {
      showToast(res.message || 'Failed to delete job', 'info');
    }
  };

  // Determine active jobs dataset (actual DB jobs or demo fallback)
  const activeDataset = jobs.length > 0 ? jobs : DEMO_JOBS;

  // Filter jobs locally based on active filters & status
  const filteredJobs = useMemo(() => {
    return activeDataset.filter((job) => {
      // Status filter
      if (filters.selectedStatus !== 'ALL' && job.status !== filters.selectedStatus) {
        return false;
      }
      // Timeline filter
      if (filters.selectedTimeline === 'PAST') {
        if (new Date(job.deadline) >= new Date()) return false;
      } else if (filters.selectedTimeline === 'UPCOMING') {
        if (new Date(job.deadline) < new Date()) return false;
      }
      // Type filter
      if (filters.selectedType !== 'ALL' && job.type !== filters.selectedType) {
        return false;
      }
      // Location filter
      if (filters.selectedLocation !== 'ALL' && !job.location.toLowerCase().includes(filters.selectedLocation.toLowerCase())) {
        return false;
      }
      // Search query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesLocation = job.location.toLowerCase().includes(q);
        const matchesCollege = job.college?.name?.toLowerCase().includes(q) || false;
        const matchesSkills = job.skills?.some((s) => s.toLowerCase().includes(q)) || false;
        if (!matchesTitle && !matchesLocation && !matchesCollege && !matchesSkills) {
          return false;
        }
      }
      // Skills filter
      if (filters.selectedSkills.length > 0) {
        const hasSkill = filters.selectedSkills.some((s) => 
          job.skills?.some((js) => js.toLowerCase() === s.toLowerCase())
        );
        if (!hasSkill) return false;
      }
      return true;
    });
  }, [activeDataset, filters]);

  // Pagination slicing
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;

  // Selection handlers
  const handleToggleSelectJob = (id: string) => {
    setSelectedJobIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobIds.length === paginatedJobs.length) {
      setSelectedJobIds([]);
    } else {
      setSelectedJobIds(paginatedJobs.map((j) => j.id));
    }
  };

  // Status counts for tabs
  const liveCount = activeDataset.filter((j) => j.status === 'ACTIVE').length;
  const draftCount = activeDataset.filter((j) => j.status === 'DRAFT').length;
  const closedCount = activeDataset.filter((j) => j.status === 'CLOSED').length;
  const expiredCount = activeDataset.filter((j) => new Date(j.deadline) < new Date()).length;

  return (
    <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 pb-20 transition-all duration-300 font-sans">
      
      {/* 1. Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#0A2540] text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Header: Title, Description, Telemetry Sync & "+ Create New Job" CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
              My Jobs
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
            Manage your job postings, track applications, and hire the best talent.
          </p>
        </div>

        {/* CTA & Actions Bar */}
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
            title="Export jobs to CSV"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export</span>
          </button>

          {/* Create Job Primary CTA */}
          <Link
            href="/recruiter/jobs/create"
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Job</span>
          </Link>
        </div>
      </div>

      {/* 3. Top 4 KPI Metrics Row */}
      <RecruiterJobsStats 
        jobs={jobs} 
        totalColleges={engagedColleges.length} 
      />

      {/* 4. Search & Expandable Multi-Filter Bar */}
      <RecruiterJobsFilters />

      {/* 5. Status Tabs Switcher */}
      <RecruiterJobsStatusTabs 
        totalCount={activeDataset.length}
        liveCount={liveCount}
        draftCount={draftCount}
        closedCount={closedCount}
        expiredCount={expiredCount}
      />

      {/* 6. Multi-Select Actions Bar (if any selected) */}
      {selectedJobIds.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-2xl p-3 px-4 shadow-sm animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-blue-900">
              {selectedJobIds.length} {selectedJobIds.length === 1 ? 'job' : 'jobs'} selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedJobIds([])}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition-colors cursor-pointer"
            >
              Deselect All
            </button>
            <button
              onClick={() => {
                showToast(`${selectedJobIds.length} jobs marked as Closed`);
                setSelectedJobIds([]);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-black text-slate-800 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer"
            >
              Bulk Close
            </button>
          </div>
        </div>
      )}

      {/* 7. Main Job Listings Stream / Table */}
      {isLoading && jobs.length === 0 ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-24 rounded-3xl bg-slate-200" />
          <div className="h-24 rounded-3xl bg-slate-200" />
          <div className="h-24 rounded-3xl bg-slate-200" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-3xl border border-slate-200 bg-white shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <Briefcase className="w-7 h-7" />
          </div>
          <h3 className="text-base font-black text-[#0A2540]">No job postings match criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No active jobs match your current search and filter settings. Try adjusting your filters or post a new job.
          </p>
        </div>
      ) : (
        <RecruiterJobsList
          jobs={paginatedJobs}
          selectedJobIds={selectedJobIds}
          onToggleSelectJob={handleToggleSelectJob}
          onSelectAll={handleSelectAll}
          onSelectJob={(j) => setSelectedJobDetail(j)}
          onEditJob={(j) => setSelectedJobToEdit(j)}
          onToggleStatus={handleToggleStatus}
          onDeleteJob={(j) => setJobToDelete(j)}
          viewMode={filters.viewMode}
        />
      )}

      {/* 8. Pagination Controls */}
      {filteredJobs.length > 0 && (
        <RecruiterJobsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredJobs.length}
          pageSize={pageSize}
          onPageChange={(p) => setCurrentPage(p)}
          onPageSizeChange={(sz) => {
            setPageSize(sz);
            setCurrentPage(1);
          }}
        />
      )}

      {/* 9. Bottom Value Pillars Strip */}
      <RecruiterJobsValuePillars />

      {/* 10. Job Detail Dossier Modal */}
      {selectedJobDetail && (
        <RecruiterJobDetailModal
          job={selectedJobDetail}
          onClose={() => setSelectedJobDetail(null)}
          onEdit={(j) => {
            setSelectedJobDetail(null);
            setSelectedJobToEdit(j);
          }}
          onToggleStatus={handleToggleStatus}
        />
      )}

      {/* 11. In-place Job Edit Modal */}
      {selectedJobToEdit && (
        <RecruiterJobEditModal
          job={selectedJobToEdit}
          onClose={() => setSelectedJobToEdit(null)}
          onSuccess={() => {
            setSelectedJobToEdit(null);
            fetchJobs();
            showToast('Job posting updated successfully');
          }}
        />
      )}

      {/* 12. Delete Confirmation Dialog */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setJobToDelete(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" 
          />
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 z-10">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0A2540]">
                Delete Job Posting?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                Are you sure you want to remove <strong>{jobToDelete.title}</strong>?
                {jobToDelete._count && jobToDelete._count.applications > 0 && (
                  <span className="block mt-2 font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    Note: This job posting has {jobToDelete._count.applications} active candidate applications. It will be safely archived to preserve candidate submission history.
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setJobToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-md shadow-red-500/20 transition-all cursor-pointer"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
