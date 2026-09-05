'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  Users, 
  Building2,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  X
} from 'lucide-react';
import { 
  useRecruiterJobsStore, 
  RecruiterJobItem 
} from '@/store/useRecruiterJobsStore';
import { RecruiterJobsStats } from './_components/RecruiterJobsStats';
import { RecruiterJobsFilters } from './_components/RecruiterJobsFilters';
import { RecruiterJobsCards } from './_components/RecruiterJobsCards';
import { RecruiterJobsTable } from './_components/RecruiterJobsTable';

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

  const [jobToDelete, setJobToDelete] = useState<RecruiterJobItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Initial fetch and fetch on filter state change
  useEffect(() => {
    fetchJobs();
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
  ]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleStatus = async (job: RecruiterJobItem) => {
    const nextStatus = job.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
    const res = await updateJob(job.id, { status: nextStatus });
    if (res.success) {
      showToast(`Drive is now marked as ${nextStatus}`);
    } else {
      showToast(res.message || 'Failed to update status', 'info');
    }
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    const res = await deleteJob(jobToDelete.id);
    if (res.success) {
      showToast(res.message || 'Job drive removed successfully');
      setJobToDelete(null);
    } else {
      showToast(res.message || 'Failed to delete drive', 'info');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 pb-20 transition-all duration-300">
      
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#0A2540] text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
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

      {/* 1. Page Header with Title & "+ Post New Job" CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs shrink-0">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
                Campus Placement Drives
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-3xl">
              Enterprise management portal for university job postings, skill requirements, candidate applications, and campus schedules.
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <button
            onClick={() => fetchJobs()}
            disabled={isLoading}
            title="Refresh drives data"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 cursor-pointer shadow-2xs transition-all"
          >
            <RefreshCw className={`h-4.5 w-4.5 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          <Link
            href="/recruiter/jobs/create"
            className="inline-flex items-center gap-2 py-2.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Performance Metric Stats Row */}
      <RecruiterJobsStats 
        jobs={jobs} 
        totalColleges={engagedColleges.length} 
      />

      {/* 3. Comprehensive Filtering Bar */}
      <RecruiterJobsFilters />

      {/* 4. Main Drives Listing (Cards vs Table) */}
      {isLoading && jobs.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
          <div className="h-64 rounded-3xl bg-slate-200" />
          <div className="h-64 rounded-3xl bg-slate-200" />
          <div className="h-64 rounded-3xl bg-slate-200" />
        </div>
      ) : error && jobs.length === 0 ? (
        <div className="p-8 text-center rounded-3xl border border-red-200 bg-red-50 text-red-700 space-y-3">
          <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
          <h3 className="text-base font-bold">Unable to retrieve placement drives</h3>
          <p className="text-xs text-red-600 max-w-md mx-auto">{error}</p>
          <button
            onClick={() => fetchJobs()}
            className="py-2 px-5 rounded-xl bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      ) : filters.viewMode === 'grid' ? (
        <RecruiterJobsCards
          jobs={jobs}
          onSelectJob={(j) => router.push(`/recruiter/jobs/${j.id}`)}
          onEditJob={(j) => router.push(`/recruiter/jobs/${j.id}?edit=true`)}
          onToggleStatus={handleToggleStatus}
          onDeleteJob={(j) => setJobToDelete(j)}
        />
      ) : (
        <RecruiterJobsTable
          jobs={jobs}
          onSelectJob={(j) => router.push(`/recruiter/jobs/${j.id}`)}
          onEditJob={(j) => router.push(`/recruiter/jobs/${j.id}?edit=true`)}
          onToggleStatus={handleToggleStatus}
          onDeleteJob={(j) => setJobToDelete(j)}
        />
      )}

      {/* 5. Delete / Safe Close Confirmation Dialog */}
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
              <h3 className="text-base font-extrabold text-[#0A2540]">
                Delete Placement Drive?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>{jobToDelete.title}</strong> for {jobToDelete.college.name}?
                {jobToDelete._count && jobToDelete._count.applications > 0 && (
                  <span className="block mt-2 font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    Note: This drive has {jobToDelete._count.applications} active candidate applications. It will be safely marked as CLOSED to preserve candidate records.
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setJobToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md shadow-red-500/20 transition-all"
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
