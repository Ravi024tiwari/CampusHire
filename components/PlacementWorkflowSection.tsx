'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Zap, 
  Briefcase, 
  Award, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  CloudUpload,
  Cpu,
  Send
} from 'lucide-react';

interface Step {
  stepNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  keyFeature: string;
  beamGradient: string;
  accent: {
    badgeColor: string;
    iconBg: string;
    numberBg: string;
    text: string;
  };
}

const WORKFLOW_STEPS: Step[] = [
  {
    stepNumber: '01',
    badge: 'CANDIDATE ONBOARDING',
    title: 'Multi-Resume Cloud Vault',
    subtitle: 'Tailored Profiles for Every Job Role',
    description: 'Students upload and manage specialized PDF resumes (Full Stack, AI/ML, Core) delivered securely via Cloudinary CDN with automatic portfolio verification.',
    icon: CloudUpload,
    keyFeature: 'Role-Specific Cloudinary Vault',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #2563EB 330deg, #60A5FA 360deg)',
    accent: {
      badgeColor: 'bg-blue-100/90 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-50 text-blue-600',
      numberBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      text: 'text-blue-600'
    }
  },
  {
    stepNumber: '02',
    badge: 'PRECISION SCREENING',
    title: 'Automated Eligibility Engine',
    subtitle: 'Zero Manual Spreadsheet Filtering',
    description: 'Instant sub-15ms candidate matching based on live CGPA cutoffs, branch criteria, and backlogs ensures students only apply to verified eligible drives.',
    icon: Cpu,
    keyFeature: 'Sub-15ms Atomic Filtering',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #D97706 330deg, #FBAB23 360deg)',
    accent: {
      badgeColor: 'bg-amber-100/90 text-amber-900 border-amber-200',
      iconBg: 'bg-amber-50 text-amber-600',
      numberBg: 'bg-gradient-to-br from-[#FBAB23] to-amber-600',
      text: 'text-amber-600'
    }
  },
  {
    stepNumber: '03',
    badge: 'INTERVIEW EVALUATION',
    title: 'Live Technical Rounds Hub',
    subtitle: 'Structured Panel & Code Evaluations',
    description: 'Recruiters advance batches of 50+ candidates in one click, schedule multi-stage interview rounds, and record real-time technical evaluation scorecards.',
    icon: Briefcase,
    keyFeature: 'Atomic Bulk Progression',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #7C3AED 330deg, #C084FC 360deg)',
    accent: {
      badgeColor: 'bg-purple-100/90 text-purple-900 border-purple-200',
      iconBg: 'bg-purple-50 text-purple-600',
      numberBg: 'bg-gradient-to-br from-purple-600 to-indigo-700',
      text: 'text-purple-600'
    }
  },
  {
    stepNumber: '04',
    badge: 'OFFER INTEGRITY',
    title: '1-Click Offer Dispatch & Lock',
    subtitle: 'Guaranteed Single-Offer Fair Guard',
    description: 'Issue official PDF offer letters dispatched via Resend. Candidates accept with atomic single-offer locking that guarantees ethical placement fairness across all drives.',
    icon: Send,
    keyFeature: 'Strict Single-Offer Guard',
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #059669 330deg, #34D399 360deg)',
    accent: {
      badgeColor: 'bg-emerald-100/90 text-emerald-900 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-600',
      numberBg: 'bg-gradient-to-br from-emerald-600 to-teal-700',
      text: 'text-emerald-600'
    }
  }
];

export function PlacementWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-[#EDF5FD] border-b border-blue-200/70 relative overflow-hidden select-none">
      
      {/* Background Subtle Ambient Highlights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-300/80 text-blue-800 text-xs font-bold mb-3 shadow-xs backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
            <span>Synchronized Campus Hiring Pipeline</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
            From Application to Achievement in 4 Seamless Steps
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-[#475569] mt-2.5 leading-relaxed">
            CampusHire unifies ambitious students, college placement cells, and corporate recruiters under one high-velocity, automated placement flywheel.
          </p>
        </div>

        {/* 4-Step Interactive Grid with Moving Border Beams & Connected Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isSelected = index === activeStep;

            return (
              <div
                key={step.stepNumber}
                onMouseEnter={() => setActiveStep(index)}
                className={`group relative p-[2px] rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(10,37,64,0.08),0_4px_10px_-2px_rgba(10,37,64,0.04)] hover:shadow-[0_20px_35px_-5px_rgba(10,37,64,0.16)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col isolate transform-gpu ${
                  isSelected ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                {/* 1. Base Static Border Background */}
                <div className="absolute inset-0 bg-slate-200/90 rounded-2xl pointer-events-none" />

                {/* 2. Animated Rotating Glowing Color Beam Moving Around Edges */}
                <div
                  className="absolute -inset-[150%] m-auto w-[400%] h-[400%] animate-spin-border opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none will-change-transform"
                  style={{ background: step.beamGradient }}
                />

                {/* 3. Pure White Foreground Card Container */}
                <div className="relative z-10 w-full h-full bg-white rounded-[14px] p-5 sm:p-6 flex flex-col justify-between space-y-4">
                  
                  {/* Top Row: Number Badge + Category Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${step.accent.numberBg} text-white font-black text-sm flex items-center justify-center shadow-md shadow-blue-900/15 group-hover:scale-110 transition-transform`}>
                        {step.stepNumber}
                      </div>
                      <span className={`inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${step.accent.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-xs font-semibold text-[#64748B] mb-2.5">
                      {step.subtitle}
                    </p>

                    <p className="text-xs text-[#475569] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Highlight Chip */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-[11px] font-semibold">{step.keyFeature}</span>
                    </span>
                    <Icon className={`w-4 h-4 ${step.accent.text} opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all`} />
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Workflow Callout Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-blue-100 shadow-[0_10px_30px_-5px_rgba(10,37,64,0.06)] flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs hidden sm:flex">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#0A2540] font-heading">
                Experience Fair & Transparent Campus Recruitment
              </h4>
              <p className="text-xs text-[#64748B] mt-0.5">
                Every application, interview round, and offer letter is logged with verifiable cryptographic audit integrity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <Link
              href="/register?role=STUDENT"
              className="btn-primary text-xs sm:text-sm py-3 px-5 w-full sm:w-auto text-center flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Start as Student</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register?role=RECRUITER"
              className="btn-secondary text-xs sm:text-sm py-3 px-5 w-full sm:w-auto text-center whitespace-nowrap"
            >
              Post Recruiter Drive
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
