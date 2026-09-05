'use client';

import React, { useEffect } from 'react';
import { useStudentJobsStore } from '@/store/useStudentJobsStore';
import { BrowseJobsHeroBanner } from './_components/BrowseJobsHeroBanner';
import { BrowseJobsFilterSidebar } from './_components/BrowseJobsFilterSidebar';
import { BrowseJobsMobileFilterDrawer } from './_components/BrowseJobsMobileFilterDrawer';
import { BrowseJobsSearchBar } from './_components/BrowseJobsSearchBar';
import { BrowseJobCard } from './_components/BrowseJobCard';
import { BrowseJobsPagination } from './_components/BrowseJobsPagination';
import { JobDetailAndApplyModal } from './_components/JobDetailAndApplyModal';
import { Briefcase, Search, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StudentBrowseJobsPage() {
  const {
    jobs,
    isLoading,
    error,
    filters,
    pagination,
    fetchJobs,
    fetchStudentResumes,
    setPage,
    resetFilters,
  } = useStudentJobsStore();

  useEffect(() => {
    fetchJobs();
    fetchStudentResumes();
  }, [fetchJobs, fetchStudentResumes]);

  // Loading skeleton placeholder
  const renderSkeletons = () => (
    <div
      className={
        filters.viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4.5'
          : 'flex flex-col gap-3.5'
      }
    >
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div
          key={`skeleton-${idx}`}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs animate-pulse"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-slate-100 rounded" />
                <div className="w-24 h-3 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100" />
          </div>
          <div className="w-full h-12 bg-slate-50 rounded-xl mb-4" />
          <div className="flex gap-2 mb-4">
            <div className="w-16 h-6 bg-slate-100 rounded-md" />
            <div className="w-16 h-6 bg-slate-100 rounded-md" />
            <div className="w-16 h-6 bg-slate-100 rounded-md" />
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <div className="w-24 h-4 bg-slate-100 rounded" />
            <div className="w-28 h-8 bg-slate-100 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Container matching Dashboard and Applied Jobs */}
      <div className="max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-7 animate-in fade-in duration-300">
        
        {/* Top Hero Banner */}
        <BrowseJobsHeroBanner />

        {/* Main 2-Column Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Desktop Sticky Filter Sidebar (3 cols on desktop) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <BrowseJobsFilterSidebar />
          </div>

          {/* Right Column: Search & Results Grid (8-9 cols on desktop) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            {/* Search Header Bar (Filter toggle button on mobile, sorting, search box, chips) */}
            <BrowseJobsSearchBar />

            {/* Error Message banner */}
            {error && (
              <div className="p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchJobs()}
                  className="h-8 border-red-200 hover:bg-red-100 text-red-700"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                  Retry
                </Button>
              </div>
            )}

            {/* Loading State */}
            {isLoading && renderSkeletons()}

            {/* Empty State */}
            {!isLoading && jobs.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 sm:p-14 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-inner">
                  <Search className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-lg font-bold text-[#0A2540]">
                    No Matching Placement Drives Found
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    We couldn't find any campus opportunities matching your current filters. Try relaxing your location, role, or salary criteria.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={resetFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm text-xs font-semibold px-4 h-9 cursor-pointer"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Jobs Card Grid / List */}
            {!isLoading && jobs.length > 0 && (
              <div
                className={
                  filters.viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4.5'
                    : 'flex flex-col gap-3.5'
                }
              >
                {jobs.map((job) => (
                  <BrowseJobCard key={job.id} job={job} viewMode={filters.viewMode} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && jobs.length > 0 && pagination.totalPages > 1 && (
              <BrowseJobsPagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalResults={pagination.total}
                pageSize={pagination.limit}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Filter Drawer */}
      <BrowseJobsMobileFilterDrawer />

      {/* Slide-over Job Details & Multi-Resume Application Modal */}
      <JobDetailAndApplyModal />
    </div>
  );
}
