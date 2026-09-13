'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { StudentJobItem, useStudentJobsStore } from '@/store/useStudentJobsStore';
import { useStudentJobDetailsQuery } from '@/hooks/queries/useStudentQueries';
import { JobDetailHeroHeader } from './_components/JobDetailHeroHeader';
import { JobDetailNavigationTabs, JobDetailTabKey } from './_components/JobDetailNavigationTabs';
import { JobDetailOverviewSection } from './_components/JobDetailOverviewSection';
import { JobDetailSelectionProcessSection } from './_components/JobDetailSelectionProcessSection';
import { JobDetailAboutCompanySection } from './_components/JobDetailAboutCompanySection';
import { JobDetailRightSidebar } from './_components/JobDetailRightSidebar';
import { JobDetailMobileStickyBar } from './_components/JobDetailMobileStickyBar';
import { JobDetailFooterTrustBanner } from './_components/JobDetailFooterTrustBanner';
import { JobDetailAndApplyModal } from '../_components/JobDetailAndApplyModal';
import { ArrowLeft, Briefcase } from 'lucide-react';

export default function StudentJobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  const {
    currentJobDetail,
    isDetailLoading: isStoreDetailLoading,
    fetchJobById,
    fetchStudentResumes,
    openJobDetail,
  } = useStudentJobsStore();

  const { data: jobQueryData, isLoading: isQueryLoading } = useStudentJobDetailsQuery(jobId);

  const [activeTab, setActiveTab] = useState<JobDetailTabKey>('overview');

  useEffect(() => {
    if (jobId) {
      fetchJobById(jobId);
      fetchStudentResumes();
    }
  }, [jobId, fetchJobById, fetchStudentResumes]);

  // Sync TanStack Query job details cache directly into store for instant rendering
  useEffect(() => {
    if (jobQueryData?.job) {
      const { job: j, eligibility, hasApplied, application } = jobQueryData;
      const created = new Date(j.createdAt);
      const daysAgo = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24));
      const postedAgo = daysAgo <= 0 ? 'Posted today' : daysAgo === 1 ? 'Posted 1 day ago' : `Posted ${daysAgo} days ago`;

      const jobItem: StudentJobItem = {
        ...j,
        postedAgo,
        company: {
          id: j.company?.id || '',
          name: j.company?.name || 'Company',
          logoUrl: j.company?.logoUrl || null,
          website: j.company?.website || null,
          industry: j.company?.industry || null,
          isVerified: j.company?.isVerified ?? true,
        },
        eligibility,
        hasApplied,
        application,
      };

      useStudentJobsStore.setState({ currentJobDetail: jobItem, isDetailLoading: false });
    }
  }, [jobQueryData]);

  const isDetailLoading = isStoreDetailLoading || (isQueryLoading && !currentJobDetail);

  // ScrollSpy: Automatically highlight active tab based on scroll position
  useEffect(() => {
    const sectionMap: Array<{ id: string; tab: JobDetailTabKey }> = [
      { id: 'section-overview', tab: 'overview' },
      { id: 'section-job-description', tab: 'job_description' },
      { id: 'section-eligibility', tab: 'eligibility' },
      { id: 'section-selection-process', tab: 'selection_process' },
      { id: 'section-about-company', tab: 'about_company' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entry with highest intersection ratio
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by bounding top
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const activeEntry = visibleEntries[0];
          const matched = sectionMap.find((s) => s.id === activeEntry.target.id);
          if (matched) {
            setActiveTab(matched.tab);
          }
        }
      },
      {
        rootMargin: '-100px 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sectionMap.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentJobDetail]);

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
        
        {/* 1. Top Breadcrumbs & Hero Showcase */}
        <JobDetailHeroHeader job={job} />

        {/* 2. Sticky Smooth-Scrolling Navigation Tabs */}
        <JobDetailNavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 3. Main 2-Column Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Main Content Column (8 cols on Desktop) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 3a. Overview (ATS Matcher), Job Description, & Eligibility Sections */}
            <JobDetailOverviewSection job={job} />

            {/* 3b. Selection Process Timeline */}
            <JobDetailSelectionProcessSection job={job} />

            {/* 3c. About Company & Benefits */}
            <JobDetailAboutCompanySection job={job} />

          </div>

          {/* Right Column: Sticky Application & Similar Jobs Sidebar (4 cols on Desktop) */}
          <div className="lg:col-span-4 sticky top-20">
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
