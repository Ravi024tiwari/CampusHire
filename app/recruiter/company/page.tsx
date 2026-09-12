'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  CheckCircle2, 
  X, 
  Loader2, 
  AlertCircle, 
  ArrowLeft 
} from 'lucide-react';
import { useRecruiterCompanyStore } from '@/store/useRecruiterCompanyStore';
import { useRecruiterCompanyQuery } from '@/hooks/queries/useRecruiterQueries';
import { CompanyHeroBanner } from './_components/CompanyHeroBanner';
import { CompanyIdentityCard } from './_components/CompanyIdentityCard';
import { CompanyProfileTabs } from './_components/CompanyProfileTabs';
import { CompanyKpisRow } from './_components/CompanyKpisRow';
import { CompanyOverviewSection } from './_components/CompanyOverviewSection';
import { CompanyJobsSection } from './_components/CompanyJobsSection';
import { CompanyTeamSection } from './_components/CompanyTeamSection';
import { CompanyGallerySection } from './_components/CompanyGallerySection';
import { CompanyAnalyticsSection } from './_components/CompanyAnalyticsSection';
import { CompanyEditProfileModal } from './_components/CompanyEditProfileModal';

export default function RecruiterCompanyProfilePage() {
  const { 
    company, 
    activeTab, 
    notification, 
    clearNotification, 
  } = useRecruiterCompanyStore();

  const { data: queryCompany, isLoading: isQueryLoading } = useRecruiterCompanyQuery();

  // Sync TanStack query data into company store
  useEffect(() => {
    if (queryCompany) {
      useRecruiterCompanyStore.setState({
        company: queryCompany,
        isLoading: false,
      });
    }
  }, [queryCompany]);

  const isLoading = isQueryLoading && !queryCompany && !company;

  if (isLoading) {
    return (
      <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-6 animate-pulse font-sans">
        {/* Banner Skeleton */}
        <div className="w-full h-44 sm:h-56 md:h-64 lg:h-72 bg-slate-200 rounded-3xl" />
        {/* Identity Skeleton */}
        <div className="h-32 bg-slate-200 rounded-3xl" />
        {/* Tabs Skeleton */}
        <div className="h-10 w-96 bg-slate-200 rounded-xl" />
        {/* KPI Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-28 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-12 text-center space-y-4 max-w-lg mx-auto font-sans">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-black text-[#0A2540] font-heading">
          Company Profile Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          No affiliated company profile was found for your recruiter account. Please contact your organization administrator.
        </p>
        <Link
          href="/recruiter/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const jobsCount = company.jobs?.length || 0;
  const teamCount = company.recruiters?.length || 1;
  const galleryCount = (company.images?.length > 0 ? company.images.length : 4);

  return (
    <div className="p-3 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 pb-28 transition-all duration-300 font-sans">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-[#0A2540] text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{notification.message}</span>
          <button
            type="button"
            onClick={clearNotification}
            className="ml-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Hero Cover Banner */}
      <CompanyHeroBanner
        companyName={company.name}
        isVerified={company.isVerified}
        coverImage={company.images?.[0]}
        headline="Build for a brighter tomorrow."
        subheadline="Innovative people. Impactful work."
      />

      {/* 2. Floating / Overlapping Company Identity Card */}
      <CompanyIdentityCard company={company} />

      {/* 3. Navigation Tabs Bar */}
      <CompanyProfileTabs
        jobsCount={jobsCount}
        teamCount={teamCount}
        galleryCount={galleryCount}
      />

      {/* 4. Unified KPI Cards Row */}
      <CompanyKpisRow stats={company.stats} />

      {/* 5. Dynamic Tab Content Sections */}
      {activeTab === 'overview' && (
        <CompanyOverviewSection company={company} />
      )}

      {activeTab === 'jobs' && (
        <CompanyJobsSection jobs={company.jobs || []} />
      )}

      {activeTab === 'team' && (
        <CompanyTeamSection recruiters={company.recruiters || []} companyName={company.name} />
      )}

      {activeTab === 'gallery' && (
        <CompanyGallerySection images={company.images || []} companyName={company.name} />
      )}

      {activeTab === 'analytics' && (
        <CompanyAnalyticsSection company={company} />
      )}

      {/* 6. Edit Profile Modal */}
      <CompanyEditProfileModal company={company} />

    </div>
  );
}
