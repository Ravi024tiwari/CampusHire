'use client';

import React, { useEffect, useState, useCallback } from 'react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { RecruiterDashboardData } from './_types/recruiter-dashboard.types';
import { RecruiterHeroBanner } from './_components/RecruiterHeroBanner';
import { RecruiterKpiRow } from './_components/RecruiterKpiRow';
import { ApplicationTrendsChart } from './_components/ApplicationTrendsChart';
import { ApplicationStatusDonut } from './_components/ApplicationStatusDonut';
import { RecentApplicationsTable } from './_components/RecentApplicationsTable';
import { UpcomingInterviewsTable } from './_components/UpcomingInterviewsTable';
import { PostJobCalloutBanner } from './_components/PostJobCalloutBanner';
import { RecruiterMotivationCard } from './_components/RecruiterMotivationCard';
import { RecruiterFooterPillars } from './_components/RecruiterFooterPillars';
import { 
  Building2, 
  RefreshCw, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { useRecruiterDashboardQuery } from '@/hooks/queries/useRecruiterQueries';

export default function RecruiterDashboardPage() {
  const { 
    data, 
    isLoading: isQueryLoading, 
    error: queryError, 
    refetch: fetchDashboard 
  } = useRecruiterDashboardQuery();

  const isLoading = isQueryLoading && !data;
  const error = (queryError as any)?.message || null;

  if (isLoading && !data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-pulse max-w-[1700px] mx-auto">
        <div className="h-44 rounded-3xl bg-slate-200" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 h-72 rounded-3xl bg-slate-200" />
          <div className="lg:col-span-5 h-72 rounded-3xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 md:p-12 max-w-2xl mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-[#0A2540]">Unable to Load Company Portal</h2>
        <p className="text-sm text-slate-600">{error || 'Unknown error occurred while retrieving company data.'}</p>
        <button
          onClick={() => fetchDashboard()}
          className="py-2.5 px-6 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 inline-flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* 1. Hero Showcase Banner */}
      <RecruiterHeroBanner
        company={data.company}
        currentRecruiter={data.currentRecruiter}
        kpis={data.kpis}
      />

      {/* 2. Live Hiring 5 KPIs Row */}
      <RecruiterKpiRow kpis={data.kpis} />

      {/* 3. Middle Visualizations Row (Application Trends + Application Status Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Application Trends (7 cols on Desktop) */}
        <div className="lg:col-span-7 h-full">
          <ApplicationTrendsChart trends={data.applicationTrends} />
        </div>

        {/* Application Status Donut (5 cols on Desktop) */}
        <div className="lg:col-span-5 h-full">
          <ApplicationStatusDonut
            statusBreakdown={data.statusBreakdown}
            totalApplications={data.kpis.totalApplications}
          />
        </div>

      </div>

      {/* 4. Candidate Applications & Upcoming Interviews Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Applications (7 cols on Desktop) */}
        <div className="lg:col-span-7 h-full">
          <RecentApplicationsTable applications={data.recentApplications} />
        </div>

        {/* Upcoming Interviews (5 cols on Desktop) */}
        <div className="lg:col-span-5 h-full">
          <UpcomingInterviewsTable interviews={data.upcomingInterviews} />
        </div>

      </div>

      {/* 5. Post Job Callout Banner */}
      <PostJobCalloutBanner />

      {/* 6. Mobile / Tablet Motivation Card */}
      <div className="lg:hidden">
        <RecruiterMotivationCard />
      </div>

      {/* 7. Industrial Value Pillars & Footer Emblem */}
      <RecruiterFooterPillars />

    </div>
  );
}
