'use client';

import React, { useEffect, useState, useCallback } from 'react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { RecruiterDashboardData } from './_types/recruiter-dashboard.types';
import { RecruiterHeroBanner } from './_components/RecruiterHeroBanner';
import { RecruiterKpiRow } from './_components/RecruiterKpiRow';
import { ActiveDrivesSection } from './_components/ActiveDrivesSection';
import { RecentApplicationsQueue } from './_components/RecentApplicationsQueue';
import { RecruiterTeamRoster } from './_components/RecruiterTeamRoster';
import { 
  Building2, 
  RefreshCw, 
  AlertCircle, 
  Sparkles,
  Briefcase,
  Users,
  FileText
} from 'lucide-react';

export default function RecruiterDashboardPage() {
  const [data, setData] = useState<RecruiterDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<ApiResponse<RecruiterDashboardData>>(
        '/api/recruiter/dashboard'
      );
      if (response.data.success && response.data.data) {
        setData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to load company telemetry.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load company recruitment data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (isLoading && !data) {
    return (
      <div className="p-4 sm:p-6 md:p-8 space-y-6 animate-pulse max-w-7xl mx-auto">
        {/* Banner Skeleton */}
        <div className="h-44 rounded-3xl bg-slate-200" />
        {/* KPI Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
          <div className="h-28 rounded-2xl bg-slate-200" />
        </div>
        {/* Sections Skeleton */}
        <div className="h-64 rounded-2xl bg-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-200" />
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
          onClick={fetchDashboard}
          className="btn-primary py-2.5 px-6 text-sm inline-flex items-center gap-2 cursor-pointer shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Hero Showcase Banner */}
      <RecruiterHeroBanner
        company={data.company}
        currentRecruiter={data.currentRecruiter}
        kpis={data.kpis}
      />

      {/* 2. Live Hiring KPIs */}
      <RecruiterKpiRow kpis={data.kpis} />

      {/* 3. Active Drives Section */}
      <ActiveDrivesSection drives={data.recentJobs} />

      {/* 4. Live Candidate Stream */}
      <RecentApplicationsQueue applications={data.recentApplications} />

      {/* 5. Fellow Recruiters Team Roster */}
      <RecruiterTeamRoster
        teamMembers={data.teamMembers}
        companyName={data.company.name}
      />

    </div>
  );
}
