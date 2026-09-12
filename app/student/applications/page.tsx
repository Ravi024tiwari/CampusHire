'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useStudentApplicationsStore, AppliedJobItem } from '@/store/useStudentApplicationsStore';
import { useStudentApplicationsQuery } from '@/hooks/queries/useStudentQueries';
import { AppliedJobsHeroHeader } from './_components/AppliedJobsHeroHeader';
import { AppliedJobsKpiStats } from './_components/AppliedJobsKpiStats';
import { AppliedJobsFilterBar } from './_components/AppliedJobsFilterBar';
import { AppliedJobsCard } from './_components/AppliedJobsCard';
import { AppliedJobsPagination } from './_components/AppliedJobsPagination';
import { ApplicationDetailModal } from './_components/ApplicationDetailModal';
import { WithdrawConfirmationModal } from './_components/WithdrawConfirmationModal';
import { StudentApplicationsFooter } from './_components/StudentApplicationsFooter';
import { Briefcase, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

export default function StudentApplicationsPage() {
  const { applications, summaryStats, filters, resetFilters } = useStudentApplicationsStore();

  const queryParams = useMemo(() => ({
    page: filters.page,
    limit: filters.limit,
    status: filters.status,
    search: filters.search || undefined,
    jobType: filters.jobType,
    location: filters.location,
    sortBy: filters.sortBy,
  }), [filters]);

  const { data: queryData, isLoading: isQueryLoading, error: queryError } = useStudentApplicationsQuery(queryParams);

  useEffect(() => {
    if (queryData?.applications) {
      const rawApps = queryData.applications;
      const stats = queryData.summaryStats;
      const pagination = queryData.pagination;

      const mapped: AppliedJobItem[] = (rawApps || []).map((a: any) => {
        let displayStatus: AppliedJobItem['displayStatus'] = 'Under Review';
        if (a.status === 'SHORTLISTED') displayStatus = 'Shortlisted';
        else if (a.status === 'INTERVIEW_SCHEDULED') displayStatus = 'Interviewing';
        else if (a.status === 'OFFERED' || a.status === 'ACCEPTED') displayStatus = 'Offer';
        else if (a.status === 'REJECTED' || a.status === 'DECLINED') displayStatus = 'Rejected';

        const created = new Date(a.createdAt);
        const appliedDate = isNaN(created.getTime())
          ? 'Recent'
          : created.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

        return {
          id: a.id,
          jobId: a.jobId,
          title: a.job?.title || 'Job Application',
          company: {
            id: a.job?.company?.id || '',
            name: a.job?.company?.name || 'Company',
            logoUrl: a.job?.company?.logoUrl || null,
            website: a.job?.company?.website || null,
          },
          type: a.job?.type || 'FULL_TIME',
          mode: a.job?.collegeId ? 'On-campus' : 'Off-campus',
          status: a.status,
          displayStatus,
          location: a.job?.location || 'India',
          salaryPackage: a.job?.salaryPackage || 'Competitive',
          appliedDate,
          rawAppliedDate: a.createdAt,
          skills: a.job?.skills || [],
          offerDetails: a.offer || null,
        };
      });

      useStudentApplicationsStore.setState({
        applications: mapped,
        summaryStats: stats || {
          total: 0,
          underReview: 0,
          shortlisted: 0,
          interviewing: 0,
          offers: 0,
          rejected: 0,
        },
        pagination: pagination || {
          page: filters.page,
          limit: filters.limit,
          total: mapped.length,
          totalPages: Math.ceil(mapped.length / filters.limit) || 1,
          hasMore: false,
        },
        isLoading: false,
        error: null,
      });
    } else if (queryData) {
      useStudentApplicationsStore.setState({
        applications: [],
        isLoading: false,
      });
    }
  }, [queryData, filters.page, filters.limit]);

  const isLoading = isQueryLoading && !queryData && applications.length === 0;

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-7">
        
        {/* 1. Page Hero Header with Motivational Target Card */}
        <AppliedJobsHeroHeader />

        {/* 2. Top KPI Metric Stats */}
        <AppliedJobsKpiStats />

        {/* 3. Status Tabs Bar & Advanced Search/Filters Row */}
        <AppliedJobsFilterBar />

        {/* 4. Applications Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-56 rounded-3xl bg-slate-100 border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : applications.length === 0 ? (
          summaryStats.total === 0 ? (
            /* Empty State when student has no applications yet in DB */
            <div className="py-16 px-4 text-center rounded-3xl border border-dashed border-slate-200 bg-white space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
                <Briefcase className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-lg font-black text-[#0A2540] font-heading">
                  No Applications Submitted Yet
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  You have not applied to any on-campus placement drives yet. Explore eligible opportunities hosted for your college and submit your application.
                </p>
              </div>
              <Link
                href="/student/jobs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Campus Drives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            /* Filter Match Empty State */
            <div className="py-16 text-center rounded-3xl border border-dashed border-slate-300 bg-white space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-[#0A2540]">
                  No applications match your filter
                </h3>
                <p className="text-xs text-slate-400">
                  Try clearing your search or switching to the &ldquo;All&rdquo; status tab.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {applications.map((app) => (
              <AppliedJobsCard key={app.id} application={app} />
            ))}
          </div>
        )}

        {/* 5. Pagination Bar */}
        <AppliedJobsPagination />

        {/* 6. Footer Taglines & Values */}
        <StudentApplicationsFooter />

      </div>

      {/* Interactive Modals */}
      <ApplicationDetailModal />
      <WithdrawConfirmationModal />
    </div>
  );
}
