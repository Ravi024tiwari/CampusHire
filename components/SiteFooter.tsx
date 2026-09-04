'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Lock,
  Terminal
} from 'lucide-react';

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="relative bg-[#0B0F17] text-white overflow-hidden select-none border-t border-slate-800/60">
      
      {/* 1. Celestial Event Horizon & Solar Corona Ambient Light Effects (Soft, Refined & Balanced) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Deep neutral ambient top gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/20 via-transparent to-transparent" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Soft, Natural Solar Corona Light Flare (Reduced Blue, High-Elegance Silver/White Radiance) */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[550px] sm:w-[850px] md:w-[1100px] h-[300px] sm:h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-sky-200/10 to-transparent rounded-full blur-[70px] sm:blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[680px] h-[180px] sm:h-[260px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/35 via-slate-200/15 to-transparent rounded-full blur-[35px] sm:blur-[50px] pointer-events-none" />

        {/* The Eclipse Horizon Rim Light Arc (Minimalist & Crisp) */}
        <div className="absolute -bottom-24 sm:-bottom-32 left-1/2 -translate-x-1/2 w-[420px] sm:w-[680px] md:w-[920px] h-[210px] sm:h-[340px] md:h-[460px] rounded-t-full bg-[#0B0F17] border-t border-white/50 shadow-[0_-10px_35px_rgba(255,255,255,0.22),0_-20px_60px_rgba(186,230,253,0.12)] z-10 pointer-events-none" />
      </div>

      {/* 2. Main Call-to-Action & Newsletter Hero */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 md:pb-24">
        
        {/* Center Typography & Access Form */}
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-semibold backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
            <span className="text-slate-300">2024–25 Campus Placement Ecosystem</span>
          </div>

          {/* Clean Main Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white leading-[1.08] drop-shadow-lg">
            Start exploring the next generation of campus placement.
          </h2>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Join 120+ premier universities, 500+ verified tech recruiters, and 45,000+ candidates on India’s most reliable placement infrastructure.
          </p>

          {/* Interactive Request Access Input */}
          <div className="pt-2 max-w-md sm:max-w-lg mx-auto">
            {isSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-fade-in shadow-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verification invite dispatched to your email inbox!</span>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                className="relative p-1.5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.1] border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-white/30 flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="flex items-center gap-2.5 px-3.5 py-2 w-full">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your college or company email"
                    className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#0A2540] bg-white hover:bg-slate-100 shadow-md transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 flex-shrink-0 active:scale-95"
                >
                  <span>Request access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
            
            <p className="text-[11px] text-slate-400 mt-3 font-medium">
              ⚡ Instant setup for Placement Cells, Students & Corporate HRs
            </p>
          </div>

        </div>

        {/* 3. Multi-Column Platform Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-20 sm:pt-24 pb-12 border-b border-white/10 text-xs">
          
          {/* Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-bold font-heading text-white text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">Multi-Resume Vault</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">Sub-15ms Eligibility</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">Single-Offer Fair Guard</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">Resend PDF Dispatch</Link></li>
              <li><Link href="/#features" className="hover:text-white transition-colors">Live Panel Scorecards</Link></li>
            </ul>
          </div>

          {/* Col 2: Stakeholder Portals */}
          <div className="space-y-3">
            <h4 className="font-bold font-heading text-white text-sm uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/register?role=STUDENT" className="hover:text-white transition-colors">Student Career Hub</Link></li>
              <li><Link href="/register?role=RECRUITER" className="hover:text-white transition-colors">Corporate Recruiter Suite</Link></li>
              <li><Link href="/register?role=TPO_ADMIN" className="hover:text-white transition-colors">University TPO Console</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Super Admin Dashboard</Link></li>
              <li><Link href="/colleges" className="hover:text-white transition-colors">Affiliated Colleges Directory</Link></li>
            </ul>
          </div>

          {/* Col 3: Institutional NIRF */}
          <div className="space-y-3">
            <h4 className="font-bold font-heading text-white text-sm uppercase tracking-wider">Accreditation</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/#colleges-kpis" className="hover:text-white transition-colors">NIRF 2025 DCS Reports</Link></li>
              <li><Link href="/#colleges-kpis" className="hover:text-white transition-colors">NAAC & NBA Data Capturing</Link></li>
              <li><Link href="/#colleges-kpis" className="hover:text-white transition-colors">Salary Quartile Analytics</Link></li>
              <li><Link href="/#colleges-kpis" className="hover:text-white transition-colors">Branch Median Tracking</Link></li>
              <li><Link href="/#colleges-kpis" className="hover:text-white transition-colors">Campus Audit Trail</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Security */}
          <div className="space-y-3">
            <h4 className="font-bold font-heading text-white text-sm uppercase tracking-wider">Compliance</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-400"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ISO 27001 Certified</li>
              <li className="flex items-center gap-1.5 text-slate-400"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SOC-2 Type II Audited</li>
              <li className="flex items-center gap-1.5 text-slate-400"><Lock className="w-3.5 h-3.5 text-slate-300" /> Enterprise Google & Azure SSO</li>
              <li className="flex items-center gap-1.5 text-slate-400"><Terminal className="w-3.5 h-3.5 text-amber-400" /> 99.99% Uptime SLA</li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Data Privacy Charter</Link></li>
            </ul>
          </div>

          {/* Col 5: Company & Direct Support */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-3">
            <h4 className="font-bold font-heading text-white text-sm uppercase tracking-wider">Contact & Support</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Dedicated onboarding for University Deans, TPOs & Corporate Talent Acquisition teams.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
              <span>support@campushire.io</span>
            </div>
          </div>

        </div>

        {/* 4. Bottom Minimalist Clean Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" variant="dark" />
            <span>© {new Date().getFullYear()} CampusHire Technologies Inc. All rights reserved.</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/security" className="hover:text-white transition-colors">Security Audit</Link>
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
