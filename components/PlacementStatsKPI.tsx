'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Award, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  BarChart3
} from 'lucide-react';

interface MetricCard {
  id: string;
  category: 'ALL' | 'TECH' | 'NIRF';
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

const METRICS: MetricCard[] = [
  {
    id: '1',
    category: 'ALL',
    title: 'Total Hiring Partners',
    value: '520+',
    subValue: 'Tier-1 & MNC Recruiters',
    change: '+34% YoY',
    description: 'Active corporate recruiters conducting on-campus & virtual placement drives.',
    icon: Building2,
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
    title: '2024–25 Placement Rate',
    value: '96.4%',
    subValue: 'Batch Success Rate',
    change: '+4.2% YoY',
    description: 'Verified student placement rate achieved across registered departments.',
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
    category: 'TECH',
    title: 'Highest CTC Package',
    value: '₹45.0 LPA',
    subValue: 'Product & AI Engineering',
    change: 'Google & MS',
    description: 'Top compensation packages secured by registered campus students.',
    icon: Award,
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
    category: 'TECH',
    title: 'Average CTC (Tier-1)',
    value: '₹14.2 LPA',
    subValue: 'Median: ₹10.8 LPA',
    change: '+18.6% Jump',
    description: 'Average compensation across full-stack, cloud, and AI engineering cohorts.',
    icon: BarChart3,
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
    title: 'Verified Offers Dispatched',
    value: '18,500+',
    subValue: 'Via Instant Resend Service',
    change: '100% Stamped',
    description: 'Digital offer letters released with official CTC breakdown & audit seals.',
    icon: Briefcase,
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
    category: 'NIRF',
    title: 'Single-Offer Fair Guard',
    value: '100%',
    subValue: 'Zero Offer Hoarding',
    change: 'Strict Lock',
    description: 'Atomic policy enforcement guaranteeing equal opportunity for all students.',
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

export function PlacementStatsKPI() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'TECH' | 'NIRF'>('ALL');

  const filteredMetrics = activeTab === 'ALL' 
    ? METRICS 
    : METRICS.filter(m => m.category === activeTab || m.category === 'ALL');

  return (
    <section id="placement-insights" className="py-12 sm:py-16 bg-[#EBF3FB] border-b border-blue-200/80 relative overflow-hidden select-none">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-xs backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
              <span>Placement Season Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
              Verified 2024–25 Campus Placement Metrics & Hiring Data
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
              Transparent statistics demonstrating placement velocity, compensation benchmarks, and single-offer fairness.
            </p>
          </div>

          {/* Filter Tabs with Elevated Shadow */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white border border-blue-200/70 shadow-[0_4px_16px_rgba(10,37,64,0.06)] self-start md:self-end">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ALL'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-blue-50/60'
              }`}
            >
              All Metrics
            </button>
            <button
              onClick={() => setActiveTab('TECH')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'TECH'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-blue-50/60'
              }`}
            >
              Salary & CTC
            </button>
            <button
              onClick={() => setActiveTab('NIRF')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'NIRF'
                  ? 'bg-[#0A2540] text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#0A2540] hover:bg-blue-50/60'
              }`}
            >
              NIRF
            </button>
          </div>
        </div>

        {/* 6-Grid KPI Cards with Animated Moving Gradient Border Beams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.id}
                className="group relative p-[2px] rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(10,37,64,0.08),0_4px_10px_-2px_rgba(10,37,64,0.04)] hover:shadow-[0_20px_35px_-5px_rgba(10,37,64,0.16)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
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

      </div>
    </section>
  );
}
