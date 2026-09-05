'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useStudentJobsStore } from '@/store/useStudentJobsStore';
import { JobDetailHeroHeader } from './_components/JobDetailHeroHeader';
import { JobDetailNavigationTabs, JobDetailTabKey } from './_components/JobDetailNavigationTabs';
import { JobDetailOverviewSection } from './_components/JobDetailOverviewSection';
import { JobDetailSelectionProcessSection } from './_components/JobDetailSelectionProcessSection';
import { JobDetailAboutCompanySection } from './_components/JobDetailAboutCompanySection';
import { JobDetailRightSidebar } from './_components/JobDetailRightSidebar';
import { JobDetailMobileStickyBar } from './_components/JobDetailMobileStickyBar';
import { JobDetailFooterTrustBanner } from './_components/JobDetailFooterTrustBanner';
import { JobDetailAndApplyModal } from '../_components/JobDetailAndApplyModal';
import { ArrowLeft, Briefcase, Search, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StudentJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  const {
    currentJobDetail,
    isDetailLoading,
    fetchJobById,
    fetchStudentResumes,
    openJobDetail,
  } = useStudentJobsStore();

  const [activeTab, setActiveTab] = useState<JobDetailTabKey>('overview');

  useEffect(() => {
    if (jobId) {
      fetchJobById(jobId);
      fetchStudentResumes();
    }
  }, [jobId, fetchJobById, fetchStudentResumes]);

  // Loading skeleton
  if (isDetailLoading && !currentJobDetail) {
    return (
      <div className="w-full bg-[#F8FAFC]">
        <div className="max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded-lg" />
          <div className="h-64 rounded-3xl bg-slate-200" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-12 bg-slate-200 rounded-2xl" />
              <div className="h-96 rounded-3xl bg-slate-200" />
            </div>
            <div className="lg:col-span-4 h-96 rounded-3xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  // Not found fallback
  if (!currentJobDetail) {
    return (
      <div className="w-full bg-[#F8FAFC]">
        <div className="max-w-xl mx-auto p-8 sm:py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-[#0A2540] font-heading">
            Placement Drive Not Found
          </h2>
          <p className="text-sm text-slate-500">
            This job drive may have concluded or is not open for your college.
          </p>
          <Link
            href="/student/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Active Jobs</span>
          </Link>
        </div>
      </div>
    );
  }

  const job = currentJobDetail;

  return (
    <div className="w-full bg-[#F8FAFC] pb-20 lg:pb-8">
      <div className="max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-7 animate-in fade-in duration-300">
        
        {/* 1. Top Breadcrumbs & Luminous Hero Showcase */}
        <JobDetailHeroHeader job={job} />

        {/* 2. Interactive Navigation Tabs */}
        <JobDetailNavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 3. Main 2-Column Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Main Content Column (8 cols on Desktop) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Conditional Tab Views */}
            {activeTab === 'overview' && (
              <JobDetailOverviewSection job={job} />
            )}

            {activeTab === 'job_description' && (
              <JobDetailOverviewSection job={job} />
            )}

            {activeTab === 'eligibility' && (
              <JobDetailOverviewSection job={job} />
            )}

            {activeTab === 'selection_process' && (
              <JobDetailSelectionProcessSection job={job} />
            )}

            {activeTab === 'about_company' && (
              <JobDetailAboutCompanySection job={job} />
            )}

          </div>

          {/* Right Column: Sticky Application & Similar Jobs Sidebar (4 cols on Desktop) */}
          <div className="lg:col-span-4">
            <JobDetailRightSidebar
              job={job}
              onApplyClick={() => openJobDetail(job)}
            />
          </div>

        </div>

        {/* 4. Bottom 5-Pillar Trust Banner */}
        <JobDetailFooterTrustBanner />

      </div>

      {/* 5. Mobile Sticky Bottom Apply Bar */}
      <JobDetailMobileStickyBar
        job={job}
        onApplyClick={() => openJobDetail(job)}
      />

      {/* 6. Multi-Resume Application Modal */}
      <JobDetailAndApplyModal />

    </div>
  );
}
