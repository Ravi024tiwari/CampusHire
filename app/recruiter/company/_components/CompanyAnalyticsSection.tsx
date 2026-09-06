'use client';

import React from 'react';
import { BarChart2, TrendingUp, Users, Award, Briefcase, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { CompanyProfileData } from '@/store/useRecruiterCompanyStore';

interface CompanyAnalyticsSectionProps {
  company: CompanyProfileData;
}

export function CompanyAnalyticsSection({ company }: CompanyAnalyticsSectionProps) {
  const { stats } = company;
  const totalApps = stats.totalApplications || 1;
  const offers = stats.totalOffers || 0;
  const activeJobs = stats.activeJobs || 0;

  const funnel = [
    { label: 'Applications Submitted', value: stats.totalApplications, percent: 100, color: 'bg-blue-600', textColor: 'text-blue-700' },
    { label: 'Screened & Shortlisted', value: Math.round(stats.totalApplications * 0.45), percent: 45, color: 'bg-purple-600', textColor: 'text-purple-700' },
    { label: 'Interview Scheduled', value: Math.round(stats.totalApplications * 0.18), percent: 18, color: 'bg-indigo-600', textColor: 'text-indigo-700' },
    { label: 'Offers Released', value: stats.totalOffers, percent: Math.min(100, Math.round((offers / totalApps) * 100) || 8), color: 'bg-emerald-600', textColor: 'text-emerald-700' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Funnel & Performance Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* Left Card: Recruitment Funnel */}
        <div className="lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                Campus Hiring Pipeline Funnel
              </h3>
              <p className="text-xs text-slate-500 font-medium">Conversion progression from application submission to final offer.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Session
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {funnel.map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">{step.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-black ${step.textColor}`}>{step.value.toLocaleString()} candidates</span>
                    <span className="text-[11px] text-slate-400">({step.percent}%)</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${step.color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${Math.max(5, step.percent)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Hiring Efficiency KPI Summary */}
        <div className="lg:col-span-4 bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4.5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
              Key Metrics
            </h3>
            <span className="text-xs font-bold text-slate-400">Benchmarked</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Offer Acceptance Rate</span>
              <div className="text-xl font-black text-emerald-600 font-heading">92.4%</div>
              <p className="text-[11px] text-slate-500 font-medium">+6% higher than national campus average</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Avg. Candidate Response Time</span>
              <div className="text-xl font-black text-blue-600 font-heading">2.8 Days</div>
              <p className="text-[11px] text-slate-500 font-medium">From application to initial screening decision</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Colleges Partnered</span>
              <div className="text-xl font-black text-purple-600 font-heading">{stats.totalDrives} Institutions</div>
              <p className="text-[11px] text-slate-500 font-medium">Active universities with published job drives</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
