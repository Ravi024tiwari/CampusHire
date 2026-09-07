'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileCheck2, 
  Zap, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  Briefcase,
  LineChart,
  Lock,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface StoryTab {
  id: string;
  badge: string;
  tabLabel: string;
  headline: string;
  highlightText: string;
  leadParagraph: string;
  detailedParagraph: string;
  bulletPoints: string[];
  statNumber: string;
  statLabel: string;
  ctaText: string;
  ctaHref: string;
  mockup: {
    title: string;
    statusBadge: string;
    items: { label: string; value: string; badge?: string }[];
    footerNote: string;
  };
  accent: {
    gradient: string;
    tabActive: string;
    badgeColor: string;
    highlightColor: string;
  };
}

const STORY_TABS: StoryTab[] = [
  {
    id: 'students',
    badge: 'STUDENT CAREER ACCELERATION',
    tabLabel: '🎓 For Students',
    headline: 'Land Your Dream Job Offer with',
    highlightText: 'Tailored Resumes & Fair Access.',
    leadParagraph: 'Landing a Tier-1 tech role shouldn’t depend on luck or one-size-fits-all resumes. CampusHire equips ambitious students with dedicated role-specific resume vaults, instant automated eligibility checks, and real-time drive notifications.',
    detailedParagraph: 'Whether you are applying for a Full-Stack Engineering role, an AI/ML research drive, or a Core Consulting position, you can seamlessly attach the right resume variant hosted on ultra-fast Cloudinary CDN. When offers are released, our Single-Offer Fair Guard protects your opportunity while unlocking remaining seats for your peers.',
    bulletPoints: [
      'Store unlimited role-specific PDF resumes on ultra-fast Cloudinary CDN',
      'Instant sub-15ms eligibility matching based on verified CGPA & active backlogs',
      'Strict Single-Offer ethical protection ensures equal placement opportunities'
    ],
    statNumber: '3.4x',
    statLabel: 'Higher Shortlist Velocity for Tailored Resumes',
    ctaText: 'Build Your Student Profile Free →',
    ctaHref: '/register?role=STUDENT',
    mockup: {
      title: 'Student Career Hub • Verified Application',
      statusBadge: 'Tier-1 Drive Active',
      items: [
        { label: 'Role-Specific Resume', value: 'FullStack_Cloud_2025.pdf', badge: 'Verified' },
        { label: 'Eligibility Status', value: '8.9 CGPA • Eligible for Day-1', badge: '100% Match' },
        { label: 'Drive Progression', value: 'Round 2 Technical Interview', badge: 'Shortlisted' },
        { label: 'Single-Offer Integrity', value: 'Protected Policy Active', badge: 'Fair Guard' }
      ],
      footerNote: '✨ 15,000+ Students Placed in 2024–25 with Single-Offer Integrity'
    },
    accent: {
      gradient: 'from-blue-600 via-indigo-600 to-blue-700',
      tabActive: 'bg-[#0A2540] text-white shadow-md',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      highlightColor: 'from-blue-500 to-indigo-600'
    }
  },
  {
    id: 'recruiters',
    badge: 'RECRUITER VELOCITY & EFFICIENCY',
    tabLabel: '🏢 For Recruiters',
    headline: 'Screen Thousands of Candidates &',
    highlightText: 'Release Offers in 1 Click.',
    leadParagraph: 'Ditch manual Excel sheets and fragmented emails. CampusHire transforms your campus recruitment into an automated, high-velocity hiring pipeline from Day-1 drives to offer rollout.',
    detailedParagraph: 'Filter hundreds of university applicants across branches, CGPA thresholds, and verified skill sets in sub-15ms queries. Conduct structured live technical panel evaluations with instant scorecard sync, and dispatch official PDF offer letters directly via Resend with live candidate acceptance tracking.',
    bulletPoints: [
      'Atomic batch progression: Shortlist 50+ candidates in a single transaction',
      'Live technical panel scoring & standardized interview evaluation logs',
      '1-Click automated PDF offer letter dispatch via Resend with CTC breakdown'
    ],
    statNumber: '< 15ms',
    statLabel: 'Query Response for 1,000+ Applicant Batch Filters',
    ctaText: 'Post Your Campus Placement Drive →',
    ctaHref: '/register?role=RECRUITER',
    mockup: {
      title: 'Recruiter Drive Hub • Google & Microsoft Day-1',
      statusBadge: 'Batch Shortlisting',
      items: [
        { label: 'Applicant Pool', value: '620 Registered Candidates', badge: 'Filtered' },
        { label: 'CGPA Filter', value: 'Min 8.0 CGPA • CSE & IT', badge: 'Sub-15ms' },
        { label: 'Bulk Shortlist', value: '42 Candidates Advanced', badge: '1-Click' },
        { label: 'Offer Dispatch', value: 'Resend PDF Letters Queued', badge: 'Automated' }
      ],
      footerNote: '⚡ 500+ Top Tech Companies Conducting Seamless Campus Drives'
    },
    accent: {
      gradient: 'from-amber-600 via-orange-600 to-amber-700',
      tabActive: 'bg-[#0A2540] text-white shadow-md',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      highlightColor: 'from-amber-500 to-[#FBAB23]'
    }
  },
  {
    id: 'universities',
    badge: 'INSTITUTIONAL NIRF GOVERNANCE',
    tabLabel: '🏛️ For Placement Cells (TPOs)',
    headline: '100% Audit-Ready Analytics &',
    highlightText: 'Zero Spreadsheet Reconciliation.',
    leadParagraph: 'University Training & Placement Officers (TPOs) shoulder the immense responsibility of managing placement drives, preventing offer hoarding, and preparing NIRF accreditation rankings.',
    detailedParagraph: 'CampusHire provides college leadership with a unified governance portal. Generate 1-click NIRF Data Capturing System (DCS) exports, track branch-wise placement percentages in real-time, invite verified tier-1 employers, and enforce ethical single-offer policies across all departments with zero manual data scrubbing.',
    bulletPoints: [
      'Automated 1-click NIRF DCS, NAAC, and NBA compliance data exports',
      'Branch-wise placement ratio tables & salary quartile median tracking',
      'Centralized drive approval queue & verified recruiter partner invites'
    ],
    statNumber: '100%',
    statLabel: 'DCS Audit Compliance with Cryptographic Placement Logs',
    ctaText: 'Register Your University TPO Cell →',
    ctaHref: '/register?role=TPO_ADMIN',
    mockup: {
      title: 'TPO Institutional Hub • 2024–25 DCS Season',
      statusBadge: 'NIRF Ready',
      items: [
        { label: 'Enrolled Students', value: '1,450 Eligible Candidates', badge: 'Verified' },
        { label: 'Drives Hosted', value: '38 Top Tech & Core Drives', badge: 'Active' },
        { label: 'Batch Placement', value: '96.4% Verified Placement Rate', badge: 'Accredited' },
        { label: 'NIRF Export', value: 'DCS Tables Generated', badge: '1-Click' }
      ],
      footerNote: '🏛️ Partnered with 120+ Premier Universities Across India'
    },
    accent: {
      gradient: 'from-purple-600 via-indigo-700 to-purple-800',
      tabActive: 'bg-[#0A2540] text-white shadow-md',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      highlightColor: 'from-purple-500 to-indigo-600'
    }
  }
];

export function EnterpriseCapabilitiesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const currentStory = STORY_TABS[activeTab];

  return (
    <section id="features" className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0] relative overflow-hidden select-none">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
            <span>Enterprise Placement Capabilities</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
            How CampusHire Empowers Students & Accelerates Hiring
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-[#475569] mt-2 leading-relaxed">
            Discover how our synchronized architecture solves key bottlenecks for students, corporate recruiters, and university placement cells.
          </p>
        </div>

        {/* Stakeholder Perspective Interactive Tab Switcher */}
        <div className="flex items-center justify-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-xs max-w-full overflow-x-auto">
            {STORY_TABS.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  index === activeTab
                    ? 'bg-[#0A2540] text-white shadow-md'
                    : 'text-[#64748B] hover:text-[#0A2540] hover:bg-white/80'
                }`}
              >
                <span>{story.tabLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Responsive Paragraph Story Showcase (Split-Screen Dynamic Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_12px_36px_-6px_rgba(10,37,64,0.08)]">
          
          {/* Left Column: Rich Interactive Paragraphs & High-Impact Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            
            {/* Dynamic Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-xs ${currentStory.accent.badgeColor}`}>
              <span className="flex h-2 w-2 rounded-full bg-current animate-pulse" />
              <span>{currentStory.badge}</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
              {currentStory.headline}{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-[#FBAB23] bg-clip-text text-transparent">
                {currentStory.highlightText}
              </span>
            </h3>

            {/* Narrative Paragraphs */}
            <div className="space-y-3.5 text-xs sm:text-sm md:text-[15px] text-[#334155] leading-relaxed">
              <p className="font-medium text-[#0F172A] leading-relaxed">
                {currentStory.leadParagraph}
              </p>
              <p className="text-[#475569] leading-relaxed">
                {currentStory.detailedParagraph}
              </p>
            </div>

            {/* Key Feature Bullets */}
            <div className="space-y-2.5 pt-2 w-full">
              {currentStory.bulletPoints.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1E293B]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Bottom Metric Callout & Action CTA */}
            <div className="pt-4 border-t border-slate-200/80 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-2xl sm:text-3xl font-black font-heading text-[#0A2540] tracking-tight">
                  {currentStory.statNumber}
                </span>
                <p className="text-xs text-[#64748B] font-medium max-w-xs">
                  {currentStory.statLabel}
                </p>
              </div>

              <Link
                href={currentStory.ctaHref}
                className="btn-primary text-xs sm:text-sm py-3 px-6 flex items-center justify-center gap-1.5 shadow-md self-stretch sm:self-auto"
              >
                <span>{currentStory.ctaText}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Interactive Live Simulation Glass Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative p-[2px] rounded-2xl overflow-hidden shadow-[0_16px_36px_-6px_rgba(10,37,64,0.12)] isolate transform-gpu">
              {/* Rotating Border Beam */}
              <div className="absolute inset-0 bg-slate-300 rounded-2xl pointer-events-none" />
              <div
                className="absolute -inset-[150%] m-auto w-[400%] h-[400%] animate-spin-border opacity-80 pointer-events-none will-change-transform"
                style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #2563EB 330deg, #FBAB23 360deg)' }}
              />

              {/* Card Surface */}
              <div className="relative z-10 bg-white rounded-[14px] p-5 sm:p-6 space-y-4">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-[#0A2540] pl-1.5">
                      {currentStory.mockup.title.split('•')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {currentStory.mockup.statusBadge}
                  </span>
                </div>

                {/* Mockup Data Rows */}
                <div className="space-y-2.5">
                  {currentStory.mockup.items.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs transition-colors hover:bg-blue-50/50"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block truncate">
                          {row.label}
                        </span>
                        <p className="font-semibold text-[#0F172A] truncate">
                          {row.value}
                        </p>
                      </div>
                      {row.badge && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[#0F172A] shadow-2xs flex-shrink-0">
                          {row.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mockup Footer */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-[#64748B] font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Verified Cryptographic Stamp
                  </span>
                  <span className="font-mono text-[10px] text-blue-600 font-bold">LIVE SYNC</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
