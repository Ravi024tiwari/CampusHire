'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Users, 
  Video, 
  FileCheck2, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Info, 
  Wrench, 
  MessageSquare, 
  Clock, 
  ChevronRight, 
  ExternalLink, 
  UserCheck, 
  X, 
  Check, 
  Building2, 
  GraduationCap, 
  ThumbsUp, 
  Search,
  Laptop
} from 'lucide-react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';

interface ScheduledCandidate {
  id: string;
  studentName: string;
  studentEmail: string;
  collegeName: string;
  jobTitle: string;
  status: string;
  updatedAt: string;
}

export default function RecruiterInterviewsPage() {
  const [scheduledCandidates, setScheduledCandidates] = useState<ScheduledCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Interactive Feedback & Suggestions Modal State
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customSuggestion, setCustomSuggestion] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Mock mini-calendar state
  const [activeDate, setActiveDate] = useState<number>(18);

  const featureVotingList = [
    { id: 'meet_sync', label: '1-Click Google Meet & Zoom Auto-Generator' },
    { id: 'live_code', label: 'In-browser Live Collaborative Coding Sandbox' },
    { id: 'panel_rubric', label: 'Multi-interviewer Structured Evaluation Rubric' },
    { id: 'reminders', label: 'Automated WhatsApp & Email Interview Reminders' },
    { id: 'ai_transcribe', label: 'AI Interview Notes & Candidate Summary' },
  ];

  useEffect(() => {
    async function fetchScheduledInterviews() {
      try {
        setIsLoading(true);
        const res = await apiClient.get<ApiResponse<any>>('/api/recruiter/applications');
        if (res.data.success && Array.isArray(res.data.data?.applications)) {
          const filtered = res.data.data.applications
            .filter((app: any) => app.status === 'INTERVIEW_SCHEDULED')
            .map((app: any) => ({
              id: app.id,
              studentName: app.student?.name || app.user?.name || 'Shortlisted Candidate',
              studentEmail: app.student?.email || app.user?.email || 'candidate@college.edu',
              collegeName: app.student?.college?.name || app.student?.collegeName || 'Verified Campus',
              jobTitle: app.job?.title || 'Engineering Role',
              status: app.status,
              updatedAt: app.updatedAt || app.createdAt || new Date().toISOString(),
            }));
          setScheduledCandidates(filtered);
        }
      } catch (err) {
        console.error('[FETCH_RECRUITER_INTERVIEWS_ERROR]', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchScheduledInterviews();
  }, []);

  const handleToggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      // Auto-close after 2.5 seconds
      setIsFeedbackModalOpen(false);
      setFeedbackSubmitted(false);
      setSelectedFeatures([]);
      setCustomSuggestion('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      <div className="max-w-[1500px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-300">
        
        {/* =========================================================================
            1. TOP HEADER SECTION (Matches Mockup)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
              Interviews
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Manage and schedule interviews with shortlisted candidates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFeedbackModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Share Feedback</span>
          </button>
        </div>

        {/* =========================================================================
            2. MAIN SHOWCASE BANNER (High-Fidelity Native Implementation)
           ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs">
          
          {/* Ambient Lighting & Backdrop Glow */}
          <div className="absolute -top-16 -right-16 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Heading, Subtitle, 4 Feature Badges & Why this matters */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Feature in Development Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100/90 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs">
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>Feature in Development</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight font-heading text-[#0A2540] leading-tight">
                  Interview Management
                </h2>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight">
                  Coming Soon!
                </h3>
              </div>

              {/* Subheadline */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-xl">
                We&apos;re working on bringing you a seamless interview management experience. This feature will help you schedule, conduct, and track interviews — all in one place.
              </p>

              {/* 4 Feature Badges in Responsive 4-Column Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                
                {/* 1. Schedule Interviews */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-blue-50/60 border border-blue-100/80 shadow-2xs space-y-2 hover:bg-blue-50 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0A2540] leading-snug">
                    Schedule<br />Interviews
                  </span>
                </div>

                {/* 2. Manage Panels */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-purple-50/60 border border-purple-100/80 shadow-2xs space-y-2 hover:bg-purple-50 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0A2540] leading-snug">
                    Manage<br />Panels
                  </span>
                </div>

                {/* 3. Integrate with Video Platforms */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 shadow-2xs space-y-2 hover:bg-emerald-50 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0A2540] leading-snug">
                    Integrate with<br />Video Platforms
                  </span>
                </div>

                {/* 4. Track Feedback & Results */}
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-violet-50/60 border border-violet-100/80 shadow-2xs space-y-2 hover:bg-violet-50 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0A2540] leading-snug">
                    Track Feedback<br />& Results
                  </span>
                </div>

              </div>

              {/* Info Box: Why this matters? */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-3.5 shadow-2xs">
                <div className="p-1 rounded-full bg-blue-600 text-white shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#0A2540]">
                    Why this matters?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    We&apos;re building this feature to make your hiring process more efficient and organized. Until then, you can manage interviews through your preferred tools and platforms.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Schedule Scene & Visual Badges */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              
              {/* Floating Slogan: "Better Hiring Ahead" */}
              <div className="w-full flex justify-end mb-2 pr-4 pointer-events-none">
                <p className="font-serif italic font-black text-blue-900 text-base sm:text-lg leading-tight transform rotate-6">
                  Better<br />
                  <span className="text-blue-600">Hiring Ahead</span>
                </p>
              </div>

              {/* Interactive Calendar Preview Card */}
              <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-blue-50/80 via-white to-slate-50 border border-blue-200/90 shadow-md p-5 space-y-4 relative">
                
                {/* Floating Video Platform Pill */}
                <div className="absolute -top-3 -right-2 p-2 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/30 flex items-center justify-center">
                  <Video className="w-4 h-4" />
                </div>

                {/* Floating Panelists Pill */}
                <div className="absolute top-1/3 -left-3 p-2 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-500/30 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>

                {/* Calendar Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-xs font-extrabold text-[#0A2540]">
                      Upcoming Interview Schedule
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    Live Slot Preview
                  </span>
                </div>

                {/* Mini Calendar Grid Preview */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10.5px]">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i} className="text-slate-400 font-bold py-0.5">{d}</span>
                  ))}
                  {[14, 15, 16, 17, 18, 19, 20].map((num) => {
                    const isSelected = activeDate === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setActiveDate(num)}
                        className={`py-1.5 rounded-xl font-extrabold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-xs scale-105'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Slot Card */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-extrabold">
                    <span className="text-[#0A2540]">Technical Round 1</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 text-[10px]">
                      11:00 AM
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    Google Meet &bull; 45 Mins &bull; 2 Panelists
                  </p>
                </div>

                {/* Coffee Mug Slogan Quote */}
                <div className="p-2 rounded-xl bg-slate-100/80 border border-slate-200/70 text-center">
                  <p className="text-[10.5px] font-serif italic text-slate-600 font-bold">
                    &quot;Good People Build Great Teams&quot;
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* =========================================================================
            3. CURRENT SHORTLISTED INTERVIEWS (Real-Time Database Sync)
           ========================================================================= */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-black text-[#0A2540] font-heading">
                  Active Shortlisted Candidates ({scheduledCandidates.length})
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Candidates you have moved to the interview round in the Applications pipeline.
              </p>
            </div>

            <Link
              href="/recruiter/applications"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors"
            >
              <span>Manage in Applications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              <p className="text-xs font-bold text-slate-400">Loading interview candidates...</p>
            </div>
          ) : scheduledCandidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scheduledCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0A2540]">
                          {candidate.studentName}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                          {candidate.studentEmail}
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] border border-blue-200">
                        Interview Scheduled
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Role: <strong className="text-slate-800 font-bold">{candidate.jobTitle}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span>Campus: <strong className="text-slate-800 font-bold">{candidate.collegeName}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <Link
                      href={`/recruiter/applications?search=${encodeURIComponent(candidate.studentName)}`}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => alert(`Interview link can be shared directly via email to ${candidate.studentEmail}`)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <span>Share Meet Link</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="text-sm font-extrabold text-[#0A2540]">
                  No Interviews Scheduled Right Now
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Review applicant profiles in your Applications dashboard and move candidates to the &quot;Interview Scheduled&quot; stage.
                </p>
              </div>
              <Link
                href="/recruiter/applications"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Review Applicants</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* =========================================================================
            4. BOTTOM SUGGESTIONS & IDEAS BAR (Matches Mockup)
           ========================================================================= */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-extrabold text-[#0A2540]">
                Have suggestions for this feature?
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                We&apos;d love to hear from you! Your feedback helps us build a better experience.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFeedbackModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-extrabold border border-blue-200 shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <span>Share Your Ideas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* =========================================================================
          5. INTERACTIVE FEEDBACK MODAL
         ========================================================================= */}
      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0A2540]">
                    Interview Management Wishlist
                  </h3>
                  <p className="text-[11px] font-bold text-slate-400">
                    Help us shape the v2.0 recruiter interview suite
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!feedbackSubmitted ? (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Which capabilities would be most valuable for your team?
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {featureVotingList.map((item) => {
                      const isChecked = selectedFeatures.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggleFeature(item.id)}
                          className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          <div className={`w-4 h-4 rounded-lg border flex items-center justify-center ${isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Any specific tool integration or custom requirements?
                  </label>
                  <textarea
                    rows={3}
                    value={customSuggestion}
                    onChange={(e) => setCustomSuggestion(e.target.value)}
                    placeholder="e.g. Need HackerRank integration, customized rubric scorecards for coding rounds..."
                    className="w-full p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs font-medium text-slate-700 placeholder:text-slate-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsFeedbackModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Submit Suggestions</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-[#0A2540]">
                    Thank you for your feedback!
                  </h4>
                  <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                    Your suggestions have been recorded and prioritized for the upcoming recruiter interview suite release.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
