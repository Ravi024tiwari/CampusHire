'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Building2, 
  Layers, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound,
  FileCheck2,
  Users,
  BarChart3,
  Cpu
} from 'lucide-react';

interface RoleCard {
  id: string;
  roleType: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accent: {
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    iconText: string;
    topBorder: string;
    buttonBg: string;
    buttonHover: string;
    highlightPill: string;
  };
  metrics: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

const ROLES: RoleCard[] = [
  {
    id: 'student',
    roleType: 'STUDENT',
    badge: 'CANDIDATE ACCESS',
    title: 'Student Portal',
    subtitle: 'Career Hub & Resume Vault',
    description: 'Empowering students to showcase specialized resumes, track live drive stages, and secure verified offers with ethical single-offer protection.',
    icon: GraduationCap,
    accent: {
      badgeBg: 'bg-blue-50 border-blue-200',
      badgeText: 'text-blue-700',
      iconBg: 'bg-blue-50 text-blue-600',
      iconText: 'text-blue-600',
      topBorder: 'border-t-blue-600',
      buttonBg: 'bg-blue-600 text-white',
      buttonHover: 'hover:bg-blue-700 shadow-blue-600/20',
      highlightPill: 'bg-blue-50/80 text-blue-800'
    },
    metrics: '15,000+ Placed Students',
    features: [
      'Multi-resume Cloudinary vault',
      'Instant eligibility match alerts',
      'Live interview round tracker',
      '1-Click offer letter acceptance'
    ],
    ctaText: 'Access Student Portal',
    ctaHref: '/register?role=STUDENT'
  },
  {
    id: 'recruiter',
    roleType: 'RECRUITER',
    badge: 'TALENT ACQUISITION',
    title: 'Recruiter Hub',
    subtitle: 'Drive Velocity & Panel Scoring',
    description: 'End-to-end recruitment suite for corporate HRs to host on-campus drives, bulk shortlist applicants, and dispatch formal offers instantly.',
    icon: Building2,
    accent: {
      badgeBg: 'bg-amber-50 border-amber-200',
      badgeText: 'text-amber-800',
      iconBg: 'bg-amber-50 text-amber-600',
      iconText: 'text-amber-600',
      topBorder: 'border-t-[#FBAB23]',
      buttonBg: 'bg-[#FBAB23] text-[#0A2540]',
      buttonHover: 'hover:bg-[#f59e0b] shadow-amber-500/20',
      highlightPill: 'bg-amber-50/80 text-amber-900'
    },
    metrics: '500+ Active Recruiters',
    features: [
      '1-Click drive creation & publishing',
      'Sub-15ms atomic batch screening',
      'Live technical panel scorecards',
      'Automated PDF offer dispatch'
    ],
    ctaText: 'Access Recruiter Hub',
    ctaHref: '/register?role=RECRUITER'
  },
  {
    id: 'tpo',
    roleType: 'TPO_ADMIN',
    badge: 'CAMPUS PLACEMENT CELL',
    title: 'TPO Governance',
    subtitle: 'NIRF DCS & Drive Control',
    description: 'Unified command center for Placement Officers to supervise drives, prevent offer hoarding, and generate 1-click NIRF compliance reports.',
    icon: Layers,
    accent: {
      badgeBg: 'bg-purple-50 border-purple-200',
      badgeText: 'text-purple-700',
      iconBg: 'bg-purple-50 text-purple-600',
      iconText: 'text-purple-600',
      topBorder: 'border-t-purple-600',
      buttonBg: 'bg-purple-600 text-white',
      buttonHover: 'hover:bg-purple-700 shadow-purple-600/20',
      highlightPill: 'bg-purple-50/80 text-purple-900'
    },
    metrics: '120+ Partner Campuses',
    features: [
      'Automated NIRF DCS data export',
      'Single-Offer fair policy lock',
      'Branch-wise placement ratios',
      'Recruiter drive verification queue'
    ],
    ctaText: 'Access TPO Portal',
    ctaHref: '/register?role=TPO_ADMIN'
  },
  {
    id: 'admin',
    roleType: 'SUPER_ADMIN',
    badge: 'PLATFORM SECURITY',
    title: 'Super Admin',
    subtitle: 'Global Platform Supervision',
    description: 'Enterprise security console with cryptographic audit logs, institute vetting, multi-tenant RBAC permissions, and system health metrics.',
    icon: Shield,
    accent: {
      badgeBg: 'bg-emerald-50 border-emerald-200',
      badgeText: 'text-emerald-700',
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconText: 'text-emerald-600',
      topBorder: 'border-t-emerald-600',
      buttonBg: 'bg-emerald-600 text-white',
      buttonHover: 'hover:bg-emerald-700 shadow-emerald-600/20',
      highlightPill: 'bg-emerald-50/80 text-emerald-900'
    },
    metrics: '99.99% Enterprise Uptime',
    features: [
      'Cryptographic audit trail logs',
      'University & recruiter KYC checks',
      'Multi-tenant role permissions',
      'Global database performance stats'
    ],
    ctaText: 'Access Admin Console',
    ctaHref: '/login'
  }
];

export function StakeholderRolesSection() {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  return (
    <section id="stakeholders" className="py-14 sm:py-20 bg-white border-t border-[#E2E8F0] relative overflow-hidden select-none">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
            <span>Unified Stakeholder Portals</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A2540] font-heading tracking-tight leading-tight">
            Dedicated Experience for Every Role
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-[#475569] mt-2.5 leading-relaxed">
            Purpose-built portals with role-based access control, tailored dashboards, and real-time analytics for all campus placement stakeholders.
          </p>
        </div>

        {/* 4-Role Grid with Elevated Physical Depth & Zero Border Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isHovered = hoveredRole === role.id;

            return (
              <div
                key={role.id}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={`bg-white rounded-2xl border border-slate-200/90 border-t-4 ${role.accent.topBorder} p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_16px_rgba(10,37,64,0.04)] hover:shadow-[0_20px_35px_-5px_rgba(10,37,64,0.12)] hover:-translate-y-2 cursor-pointer group`}
              >
                <div>
                  {/* Top Bar: Icon + Role Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${role.accent.iconBg} border border-current/15 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`inline-flex items-center text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${role.accent.badgeBg} ${role.accent.badgeText}`}>
                      {role.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A2540] font-heading tracking-tight mb-0.5 group-hover:text-blue-600 transition-colors">
                    {role.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#64748B] mb-3">
                    {role.subtitle}
                  </p>

                  <p className="text-xs text-[#475569] leading-relaxed mb-4">
                    {role.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 mb-5">
                    {role.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#334155]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="text-[11px] font-medium leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric Pill & Action Button */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className={`py-1.5 px-3 rounded-lg ${role.accent.highlightPill} text-[11px] font-semibold text-center truncate`}>
                    ✨ {role.metrics}
                  </div>

                  <Link
                    href={role.ctaHref}
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm ${role.accent.buttonBg} ${role.accent.buttonHover} shadow-md transition-all duration-200 transform group-hover:translate-x-0.5 text-center`}
                  >
                    <span>{role.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Access Assurance Strip */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] font-heading">
                Enterprise Single Sign-On (SSO) & Granular RBAC
              </h4>
              <p className="text-[11px] text-[#64748B]">
                Supports Google Workspace, Microsoft Azure AD, and institutional email authentication.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#0A2540]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ISO 27001 & SOC-2 Type II Certified</span>
          </div>
        </div>

      </div>
    </section>
  );
}
