'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  TrendingUp, 
  Building, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Award,
  Building2
} from 'lucide-react';

interface CollegeMetricCard {
  id: string;
  category: 'ALL' | 'GROWTH' | 'AUDIT';
  title: string;
  value: string;
  subValue: string;
  change: string;
  description: string;
  icon: React.ElementType;
  beamGradient: string;
  accent: {
    badge: string;
    text: string;
    iconBg: string;
    glowShadow: string;
  };
}

const COLLEGE_METRICS: CollegeMetricCard[] = [
  {
    id: '1',
    category: 'ALL',
    title: 'Affiliated Institutions',
    value: '120+',
    subValue: 'Universities & Premier Institutes',
    change: '+48% YoY',
    description: 'Accredited central, state, autonomous, and private campuses using CampusHire ERP.',
    icon: GraduationCap,
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #2563EB 330deg, #60A5FA 360deg)',
    accent: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
      text: 'text-blue-600',
      iconBg: 'bg-blue-50 text-blue-600',
      glowShadow: 'hover:shadow-blue-500/20'
    }
  },
  {
    id: '2',
    category: 'ALL',
    title: 'Avg Placement Per Campus',
    value: '94.2%',
    subValue: 'Batch Success Average',
    change: '+6.8% YoY Avg',
    description: 'Average verified placement rate achieved per affiliated engineering & tech campus.',
    icon: TrendingUp,
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #059669 330deg, #34D399 360deg)',
    accent: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      text: 'text-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-600',
      glowShadow: 'hover:shadow-emerald-500/20'
    }
  },
  {
    id: '3',
    category: 'GROWTH',
    title: 'Annual Campus Growth',
    value: '+65/Yr',
    subValue: 'New Onboarded Campuses',
    change: 'Pan-India Adoption',
    description: 'Consistent month-over-month growth of engineering universities adopting our placement hub.',
    icon: Building,
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #D97706 330deg, #FBAB23 360deg)',
    accent: {
      badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
      text: 'text-amber-600',
      iconBg: 'bg-amber-50 text-amber-600',
      glowShadow: 'hover:shadow-amber-500/20'
    }
  },
  {
    id: '4',
    category: 'GROWTH',
    title: 'Active Student Pool',
    value: '45,000+',
    subValue: 'Verified Enrolled Candidates',
    change: '100% Verified Vault',
    description: 'Talent pipeline with pre-verified CGPA records and role-specific Cloudinary resumes.',
    icon: Users,
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #7C3AED 330deg, #C084FC 360deg)',
    accent: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
      text: 'text-purple-600',
      iconBg: 'bg-purple-50 text-purple-600',
      glowShadow: 'hover:shadow-purple-500/20'
    }
  },
  {
    id: '5',
    category: 'ALL',
    title: 'Avg Placement Drives / Campus',
    value: '38+',
    subValue: 'On-Campus & Virtual Drives',
    change: 'Tier-1 & MNC Visits',
    description: 'Average number of exclusive company recruitment drives hosted per university per season.',
    icon: Award,
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #0284C7 330deg, #38BDF8 360deg)',
    accent: {
      badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
      text: 'text-sky-600',
      iconBg: 'bg-sky-50 text-sky-600',
      glowShadow: 'hover:shadow-sky-500/20'
    }
  },
  {
    id: '6',
    category: 'AUDIT',
    title: 'NIRF & NAAC Audit Score',
    value: '100%',
    subValue: 'Automated DCS Reporting',
    change: 'Audit-Ready Trail',
    description: 'Instant compliance data generation for institutional accreditation ranking bodies.',
    icon: ShieldCheck,
    beamGradient: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #0D9488 330deg, #2DD4BF 360deg)',
    accent: {
      badge: 'bg-teal-50 text-teal-700 border-teal-200/80',
      text: 'text-teal-600',
      iconBg: 'bg-teal-50 text-teal-600',
      glowShadow: 'hover:shadow-teal-500/20'
    }
  }
];

const PREMIER_CAMPUSES = [
  { name: 'IIT Delhi & Bombay Ecosystem', tag: 'Central Tier-1' },
  { name: 'BITS Pilani Network', tag: 'Deemed Tech' },
  { name: 'NIT Trichy & Surathkal', tag: 'Institute of National Importance' },
  { name: 'Delhi Technological University (DTU)', tag: 'State Tech' },
  { name: 'VIT Vellore & Chennai', tag: 'Accredited A++' },
  { name: 'Thapar Institute (TIET)', tag: 'NAAC A+' },
  { name: 'Manipal Tech Institute', tag: 'Private Tech' },
  { name: 'RVCE Bangalore', tag: 'Autonomous' }
];

export function CollegeAffiliationSection() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'GROWTH' | 'AUDIT'>('ALL');

  const filteredMetrics = activeTab === 'ALL' 
    ? COLLEGE_METRICS 
    : COLLEGE_METRICS.filter(m => m.category === activeTab || m.category === 'ALL');

  return (
    <section id="colleges-kpis" className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0] relative overflow-hidden isolate select-none">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
              <span>Institutional Placement Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
              Affiliated Universities & Campus Growth Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
              Track institutional adoption, average placement ratios, talent roster expansion, and accreditation compliance across partner campuses.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-50 border border-[#E2E8F0] shadow-xs self-start md:self-end">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ALL'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-white'
              }`}
            >
              All College Data
            </button>
            <button
              onClick={() => setActiveTab('GROWTH')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'GROWTH'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-white'
              }`}
            >
              Campus Growth
            </button>
            <button
              onClick={() => setActiveTab('AUDIT')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'AUDIT'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-white'
              }`}
            >
              NIRF Compliance
            </button>
          </div>
        </div>

        {/* 6-Grid College KPI Cards with Animated Moving Gradient Border Beams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          {filteredMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.id}
                className="group relative p-[2px] rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(10,37,64,0.08),0_4px_10px_-2px_rgba(10,37,64,0.04)] hover:shadow-[0_20px_35px_-5px_rgba(10,37,64,0.16)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer isolate transform-gpu"
              >
                {/* 1. Base Static Border Background */}
                <div className="absolute inset-0 bg-slate-200/90 rounded-2xl pointer-events-none" />

                {/* 2. Animated Rotating Glowing Color Beam Moving Around Edges */}
                <div
                  className="absolute -inset-[150%] m-auto w-[400%] h-[400%] animate-spin-border opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none will-change-transform"
                  style={{ background: metric.beamGradient }}
                />

                {/* 3. Pure White Foreground Card Container */}
                <div className="relative z-10 w-full h-full bg-white rounded-[14px] p-5 sm:p-5.5 flex flex-col justify-between">
                  
                  {/* Top Row: Icon + Change Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className={`w-10 h-10 rounded-xl ${metric.accent.iconBg} border border-current/15 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${metric.accent.badge}`}>
                      {metric.change}
                    </span>
                  </div>

                  {/* KPI Value & Sub-Label */}
                  <div className="space-y-0.5 mb-2.5">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                      {metric.title}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-[1.85rem] font-black text-[#0A2540] font-heading tracking-tight">
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#1E293B]">
                      {metric.subValue}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[#64748B] leading-relaxed pt-2.5 border-t border-slate-100">
                    {metric.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* World-Class Redesigned Institutional Showcase Bar (Fully Hardware Isolated) */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0A2540] via-[#0E2F52] to-[#153B64] text-white shadow-[0_16px_36px_-6px_rgba(10,37,64,0.3)] overflow-hidden isolate transform-gpu">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* Left Content Area */}
            <div className="space-y-3.5 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FBAB23] text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5" />
                <span>Pan-India Institutional Footprint</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
                Empowering Top Universities & Placement Cells Across India
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Connect your campus placement cell with 500+ verified recruiters, automate NIRF DCS data exports, and eliminate spreadsheet errors.
              </p>

              {/* Campus Badges Grid */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                {PREMIER_CAMPUSES.map((campus, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-slate-100 font-medium transition-colors duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{campus.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action CTA */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 flex-shrink-0 w-full sm:w-auto lg:w-72">
              <Link
                href="/register?role=TPO_ADMIN"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-[#0A2540] bg-[#FBAB23] hover:bg-[#f59e0b] shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                <span>Register College TPO Cell</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-[11px] text-slate-300 text-center">
                ✨ Free onboarding for 2024–25 placement season
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
