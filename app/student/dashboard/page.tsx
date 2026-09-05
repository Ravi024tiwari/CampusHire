'use client';

import React, { useEffect } from 'react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';
import { StudentHeroBanner } from './_components/StudentHeroBanner';
import { StudentKpiStats } from './_components/StudentKpiStats';
import { UpcomingDrivesSection } from './_components/UpcomingDrivesSection';
import { ResumeAnalysisCard } from './_components/ResumeAnalysisCard';
import { PlacementReadinessCard } from './_components/PlacementReadinessCard';
import { RecommendedJobsSection } from './_components/RecommendedJobsSection';
import { RecentUpdatesSection } from './_components/RecentUpdatesSection';
import { MotivationalCard } from './_components/MotivationalCard';
import { StudentFooterTagline } from './_components/StudentFooterTagline';

export default function StudentDashboardPage() {
  const { fetchDashboardData } = useStudentDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Luminous Hero Banner Greeting */}
      <StudentHeroBanner />

      {/* 2. Key Telemetry & KPI Cards (Smooth Horizontal Scroll on <xl Screens) */}
      <StudentKpiStats />

      {/* 3. Main Operational Grid (Upcoming Drives, Resume, Readiness, Recommended, Updates, Motivation) */}
      <div className="space-y-6">
        
        {/* Upper Row: Upcoming Drives (Left) vs Resume Analysis & Placement Readiness (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Upcoming Drives (5 cols on Desktop) */}
          <div className="lg:col-span-5 h-full">
            <UpcomingDrivesSection />
          </div>

          {/* Resume Analysis (3.5 cols) & Placement Readiness (3.5 cols) -> 7 cols on Desktop */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <ResumeAnalysisCard />
            <PlacementReadinessCard />
          </div>

        </div>

        {/* Lower Row: Recommended for You (Left) vs Recent Updates & Daily Motivation (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Recommended Jobs (5 cols on Desktop) */}
          <div className="lg:col-span-5 h-full">
            <RecommendedJobsSection />
          </div>

          {/* Recent Updates (3.5 cols) & Motivational Card (3.5 cols) -> 7 cols on Desktop */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <RecentUpdatesSection />
            <MotivationalCard />
          </div>

        </div>

      </div>

      {/* 4. Industrial Value Pillars & Footer Emblem */}
      <StudentFooterTagline />

    </div>
  );
}
