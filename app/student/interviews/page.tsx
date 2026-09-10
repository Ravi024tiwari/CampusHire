'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  Video, 
  Sparkles, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Building2, 
  BrainCircuit, 
  Code2, 
  Award, 
  ArrowRight,
  AlertCircle,
  Briefcase,
  MapPin,
  Laptop,
  Check,
  ChevronRight,
  Info,
  CalendarCheck,
  Layers,
  Flame
} from 'lucide-react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

interface ApplicationItem {
  id: string;
  status: string;
  createdAt: string;
  notes?: string | null;
  job: {
    id: string;
    title: string;
    type: string;
    salaryPackage: string;
    location: string;
    company: {
      id: string;
      name: string;
      logoUrl?: string | null;
    };
  };
}

export default function StudentInterviewsPage() {
  const [scheduledInterviews, setScheduledInterviews] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'protocol' | 'roadmap'>('all');

  useEffect(() => {
    async function fetchScheduledInterviews() {
      try {
        setIsLoading(true);
        const res = await apiClient.get<ApiResponse<{ applications: ApplicationItem[] }>>(
          '/api/student/applications?status=INTERVIEW_SCHEDULED'
        );
        if (res.data.success && Array.isArray(res.data.data?.applications)) {
          setScheduledInterviews(res.data.data.applications);
        }
      } catch (err) {
        console.error('[FETCH_SCHEDULED_INTERVIEWS_ERROR]', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchScheduledInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
        
        {/* 1. Modern Interactive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-9 shadow-xs">
          {/* Subtle Modern Ambient Mesh */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-96 h-96 bg-gradient-to-bl from-blue-100/60 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-72 h-72 bg-gradient-to-tr from-emerald-50/50 via-sky-50/30 to-transparent rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left Showcase Information */}
            <div className="space-y-3.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Interview Coordination Hub</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Recruiter Sync</span>
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-heading text-[#0A2540]">
                  Interview Scheduling & Evaluation
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium mt-1.5 max-w-xl">
                  Track real-time placement rounds, direct corporate invitations, and technical assessments coordinated by hiring partners.
                </p>
              </div>

              {/* Quick Navigation Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-[#0A2540] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  All Overviews
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('protocol')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'protocol'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  Placement Protocol
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('roadmap')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'roadmap'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  v2.0 In-App Suite
                </button>
              </div>
            </div>

            {/* Right Interactive KPI Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 shrink-0">
              {/* Card 1 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-50/90 to-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all group">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Rounds</p>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-[#0A2540] mt-1 font-heading">
                  {isLoading ? '...' : scheduledInterviews.length}
                </p>
                <p className="text-[10.5px] font-bold text-emerald-600 mt-0.5">
                  {scheduledInterviews.length > 0 ? 'Actionable Invites' : 'Awaiting Shortlist'}
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-50/90 to-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Evaluation</p>
                <p className="text-sm sm:text-base font-black text-blue-700 mt-1.5 truncate">
                  Direct Email
                </p>
                <p className="text-[10.5px] font-semibold text-slate-400 mt-0.5">
                  Corporate Invites
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-50/90 to-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In-App Suite</p>
                <p className="text-sm sm:text-base font-black text-indigo-700 mt-1.5 flex items-center gap-1">
                  <span>v2.0 Beta</span>
                  <Flame className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                </p>
                <p className="text-[10.5px] font-semibold text-slate-400 mt-0.5">
                  Calendar & Sandbox
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Active Scheduled Interviews Section (If any) */}
        {scheduledInterviews.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#0A2540] font-heading">
                    Active Interview Rounds Scheduled
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    The recruiter has progressed your application to the interview stage.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                {scheduledInterviews.length} Actionable
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {scheduledInterviews.map((app) => (
                <div
                  key={app.id}
                  className="rounded-3xl border border-blue-200/80 bg-gradient-to-b from-white to-blue-50/30 p-5 sm:p-6 space-y-4 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {app.job.company.logoUrl ? (
                        <img
                          src={app.job.company.logoUrl}
                          alt={app.job.company.name}
                          className="w-12 h-12 rounded-2xl object-contain border border-slate-200 bg-white p-1 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A2540] to-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                          {app.job.company.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-[#0A2540] truncate">
                          {app.job.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 truncate">
                          {app.job.company.name}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10.5px] font-extrabold shrink-0 flex items-center gap-1 border border-blue-200">
                      <Clock className="w-3 h-3" />
                      <span>Interviewing</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{app.job.type === 'FULL_TIME' ? 'Full Time' : 'Internship'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{app.job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold col-span-2">
                      <span>💰 {app.job.salaryPackage}</span>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="p-3 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-600 space-y-1">
                      <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">Recruiter Notice</p>
                      <p className="font-medium text-slate-700 line-clamp-2">{app.notes}</p>
                    </div>
                  )}

                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-[11px] text-blue-900 flex items-start gap-2">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      Official video call link & instructions have been dispatched by <strong>{app.job.company.name}</strong> to your registered email.
                    </p>
                  </div>

                  <Link
                    href="/student/applications"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Track Application Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Corporate Interview Coordination Protocol Card */}
        {(activeTab === 'all' || activeTab === 'protocol') && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg sm:text-xl font-black text-[#0A2540] font-heading">
                    How Campus Placement Interviews Are Conducted
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Partner hiring organizations coordinate directly with shortlisted students via corporate channels.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Campus Verified Protocol</span>
              </div>
            </div>

            {/* 3-Step Flow Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
                  01
                </div>
                <h3 className="text-sm font-extrabold text-[#0A2540]">
                  Direct Invitation & Test Link
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Shortlisted candidates receive official test credentials or Google Meet/MS Teams invites sent directly to their registered email address.
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-blue-600">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Check Inbox & Spam Folders</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
                  02
                </div>
                <h3 className="text-sm font-extrabold text-[#0A2540]">
                  Company-Led Evaluation
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Technical assessments, live coding rounds, and managerial HR interviews are hosted on the hiring partner&apos;s verified assessment platforms.
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-purple-600">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Ensure Stable Internet & Webcam</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 space-y-3 relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                  03
                </div>
                <h3 className="text-sm font-extrabold text-[#0A2540]">
                  Real-Time Campus Synchronization
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Recruiters update round outcomes on CampusHire. Selected candidates receive formal Offer Letters and email confirmations instantly.
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <Award className="w-3.5 h-3.5" />
                  <span>Instant Offer Generation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Upcoming In-Platform Feature Suite (CampusHire v2.0 Roadmap) */}
        {(activeTab === 'all' || activeTab === 'roadmap') && (
          <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/40 p-6 sm:p-8 space-y-6 shadow-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10.5px] font-extrabold">
                  <Flame className="w-3 h-3 text-indigo-600" />
                  <span>Coming Soon in CampusHire v2.0</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A2540] font-heading">
                  Integrated In-Platform Interview Experience
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-semibold max-w-sm sm:text-right">
                We are actively developing direct calendar booking and live coding environments right within CampusHire.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Feature 1 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-xs hover:border-indigo-300 transition-colors">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 w-fit">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0A2540]">
                  1-Click Calendar Sync
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Auto-sync scheduled rounds directly with your Google Calendar, Apple iCal, and Outlook with automated reminder notifications.
                </p>
                <span className="inline-block text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Roadmap • Phase 1
                </span>
              </div>

              {/* Feature 2 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-xs hover:border-indigo-300 transition-colors">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 w-fit">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0A2540]">
                  In-Browser Code Pairing Sandbox
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Live interactive coding editor with syntax highlighting, compiler execution, and shared whiteboard for technical interview rounds.
                </p>
                <span className="inline-block text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Roadmap • Phase 2
                </span>
              </div>

              {/* Feature 3 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 space-y-3 shadow-xs hover:border-indigo-300 transition-colors">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-[#0A2540]">
                  AI Mock Interviewer
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Practice technical & behavioral questions generated dynamically by AI based on the exact Job Description and ATS resume match.
                </p>
                <span className="inline-block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Roadmap • Phase 3
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5. Candidate Preparation & Action Checklist */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-black text-[#0A2540] font-heading flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Interview Readiness Checklist</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>1. Registered Email</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ensure your registered email has storage available and whitelist company domain addresses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>2. ATS Optimized Resume</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Have a clean copy of your applied resume ready for quick review before technical rounds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>3. Tech Stack Review</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Review data structures, algorithms, and core system design concepts listed in the job skills.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>4. Digital Acceptance</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Upon selection, review and accept your formal offer letter directly on CampusHire.
              </p>
            </div>
          </div>

          {/* Bottom Quick Action Navigation */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500 font-medium">
              Need to check your applications or update your resume?
            </p>
            <div className="flex items-center gap-2.5">
              <Link
                href="/student/applications"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                View Applied Jobs
              </Link>
              <Link
                href="/student/offers"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                View Offers
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
