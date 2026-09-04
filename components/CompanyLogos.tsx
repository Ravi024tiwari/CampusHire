'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Building2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  category: string;
  badge: string;
  accent: string;
  badgeColor: string;
  logo: React.ReactNode;
}

// Crisp Vector Brand Logos
const CompanySVGs = {
  Google: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
  ),
  Microsoft: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z"/>
      <path fill="#7FBA00" d="M13 1h10v10H13z"/>
      <path fill="#00A4EF" d="M1 13h10v10H1z"/>
      <path fill="#FFB900" d="M13 13h10v10H13z"/>
    </svg>
  ),
  Amazon: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#FF9900">
      <path d="M13.957 10.97c-.074-.537-.253-1.02-.63-1.41-.53-.548-1.28-.823-2.16-.823-1.397 0-2.396.71-2.738 2.22-.057.25-.08.5-.08.75 0 1.63 1.05 2.61 2.5 2.61.85 0 1.54-.31 2.05-.88.5-.56.76-1.33.76-2.26 0-.07 0-.14-.01-.2v-.01zm2.71 4.77c-.17.15-.39.18-.58.07-.8-.49-1.34-.84-2.1-1.33-.94.97-2.19 1.48-3.68 1.48-2.2 0-3.92-1.35-3.92-3.79 0-1.89 1.12-3.23 2.62-3.8 1.14-.44 2.82-.52 4.14-.66v-.42c0-.75-.17-1.46-.66-1.87-.52-.45-1.28-.62-2.12-.62-1.37 0-2.42.49-2.75 1.8-.05.21-.21.36-.43.37l-2.48-.27c-.21-.04-.38-.21-.34-.44.59-3.07 3.12-4.22 5.99-4.22 1.64 0 3.32.4 4.38 1.57.99 1.09 1.15 2.45 1.15 3.97v4.61c0 1.25.5 1.77.96 2.43.15.22.12.48-.05.65-.45.43-1.23 1.23-1.63 1.67zM22.84 19.33c-.32.39-1.29 1.04-2.8 1.61-2.44.92-5.46 1.34-8.77 1.34-4.8 0-9.14-1.27-10.97-3.06-.23-.22-.19-.48.06-.63.6-.37 1.94-.97 2.37-1.07.25-.06.49.03.7.23 1.68 1.64 4.65 2.57 7.74 2.57 2.76 0 5.43-.65 7.42-1.69.31-.16.63-.09.76.19.26.57.81 1.63 1.49 2.01.21.11.23.33 0 .5z"/>
    </svg>
  ),
  Apple: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#0F172A">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.93.04-2.06.62-2.73 1.39-.58.67-1.09 1.76-.95 2.82 1.04.08 2.11-.51 2.74-1.28z"/>
    </svg>
  ),
  Meta: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#0081FB">
      <path d="M12 3C6.477 3 2 7.477 2 13c0 3.738 2.052 7.004 5.093 8.715.344-.61.64-1.272.87-1.975-2.16-1.332-3.563-3.69-3.563-6.74 0-4.198 3.402-7.6 7.6-7.6s7.6 3.402 7.6 7.6c0 3.05-1.403 5.408-3.563 6.74.23.703.526 1.365.87 1.975C19.948 20.004 22 16.738 22 13c0-5.523-4.477-10-10-10z"/>
    </svg>
  ),
  TCS: (
    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-black text-[10px] flex items-center justify-center flex-shrink-0 shadow-xs">
      TCS
    </div>
  ),
  Wipro: (
    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-teal-500 via-sky-500 to-indigo-600 text-white font-bold text-[9px] flex items-center justify-center flex-shrink-0 shadow-xs">
      W
    </div>
  ),
  Infosys: (
    <div className="w-5 h-5 rounded-md bg-sky-600 text-white font-black text-[9px] flex items-center justify-center flex-shrink-0 shadow-xs">
      INFY
    </div>
  ),
  Deloitte: (
    <div className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 shadow-xs">
      D.
    </div>
  ),
  Accenture: (
    <div className="w-5 h-5 rounded-md bg-purple-600 text-white font-black text-[10px] flex items-center justify-center flex-shrink-0 shadow-xs">
      &gt;
    </div>
  ),
  Cisco: (
    <div className="w-5 h-5 rounded-md bg-cyan-700 text-white font-black text-[9px] flex items-center justify-center flex-shrink-0 shadow-xs">
      CSC
    </div>
  ),
  IBM: (
    <div className="w-5 h-5 rounded-md bg-blue-800 text-white font-black text-[9px] flex items-center justify-center flex-shrink-0 shadow-xs">
      IBM
    </div>
  ),
  Oracle: (
    <div className="w-5 h-5 rounded-md bg-red-600 text-white font-black text-[9px] flex items-center justify-center flex-shrink-0 shadow-xs">
      ORA
    </div>
  ),
  Capgemini: (
    <div className="w-5 h-5 rounded-md bg-blue-500 text-white font-black text-[9px] flex items-center justify-center flex-shrink-0 shadow-xs">
      CAP
    </div>
  ),
  Stripe: (
    <div className="w-5 h-5 rounded-md bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center flex-shrink-0 shadow-xs">
      S
    </div>
  ),
  Adobe: (
    <div className="w-5 h-5 rounded-md bg-red-600 text-white font-black text-[10px] flex items-center justify-center flex-shrink-0 shadow-xs">
      A
    </div>
  ),
};

const ROW_1_COMPANIES: Company[] = [
  { id: 'google', name: 'Google', category: 'Product, AI & Cloud', badge: 'Tier 1', accent: 'bg-red-50/70 border-red-200/80 text-red-950', badgeColor: 'bg-red-100 text-red-700 border-red-200', logo: CompanySVGs.Google },
  { id: 'microsoft', name: 'Microsoft', category: 'Enterprise Tech & AI', badge: 'Tier 1', accent: 'bg-blue-50/70 border-blue-200/80 text-blue-950', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200', logo: CompanySVGs.Microsoft },
  { id: 'amazon', name: 'Amazon', category: 'E-Commerce & AWS', badge: 'Tier 1', accent: 'bg-amber-50/70 border-amber-200/80 text-amber-950', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200', logo: CompanySVGs.Amazon },
  { id: 'tcs', name: 'TCS Digital', category: 'Global IT & Digital', badge: 'Day 1', accent: 'bg-indigo-50/70 border-indigo-200/80 text-indigo-950', badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200', logo: CompanySVGs.TCS },
  { id: 'wipro', name: 'Wipro', category: 'Tech Consulting & Cloud', badge: 'Day 1', accent: 'bg-teal-50/70 border-teal-200/80 text-teal-950', badgeColor: 'bg-teal-100 text-teal-700 border-teal-200', logo: CompanySVGs.Wipro },
  { id: 'infosys', name: 'Infosys', category: 'Digital Next-Gen Tech', badge: 'Day 1', accent: 'bg-sky-50/70 border-sky-200/80 text-sky-950', badgeColor: 'bg-sky-100 text-sky-700 border-sky-200', logo: CompanySVGs.Infosys },
  { id: 'apple', name: 'Apple', category: 'Consumer Hardware & OS', badge: 'Tier 1', accent: 'bg-slate-100/70 border-slate-300/80 text-slate-950', badgeColor: 'bg-slate-200 text-slate-800 border-slate-300', logo: CompanySVGs.Apple },
  { id: 'meta', name: 'Meta', category: 'Social & AI Infrastructure', badge: 'FAANG', accent: 'bg-blue-50/70 border-blue-200/80 text-blue-950', badgeColor: 'bg-blue-100 text-blue-700 border-blue-200', logo: CompanySVGs.Meta },
  { id: 'stripe', name: 'Stripe', category: 'Global Financial Infra', badge: 'Tier 1', accent: 'bg-indigo-50/70 border-indigo-200/80 text-indigo-950', badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200', logo: CompanySVGs.Stripe },
];

const ROW_2_COMPANIES: Company[] = [
  { id: 'deloitte', name: 'Deloitte', category: 'Advisory, Cyber & Tech', badge: 'Big 4', accent: 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', logo: CompanySVGs.Deloitte },
  { id: 'accenture', name: 'Accenture', category: 'Strategy, Cloud & AI', badge: 'Global', accent: 'bg-purple-50/70 border-purple-200/80 text-purple-950', badgeColor: 'bg-purple-100 text-purple-700 border-purple-200', logo: CompanySVGs.Accenture },
  { id: 'cisco', name: 'Cisco Systems', category: 'Networking & Security', badge: 'Tier 1', accent: 'bg-cyan-50/70 border-cyan-200/80 text-cyan-950', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200', logo: CompanySVGs.Cisco },
  { id: 'ibm', name: 'IBM', category: 'AI & Hybrid Cloud (RedHat)', badge: 'Global', accent: 'bg-blue-50/70 border-blue-300/80 text-blue-950', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200', logo: CompanySVGs.IBM },
  { id: 'oracle', name: 'Oracle', category: 'Cloud Infrastructure & DB', badge: 'Tier 1', accent: 'bg-rose-50/70 border-rose-200/80 text-rose-950', badgeColor: 'bg-rose-100 text-rose-700 border-rose-200', logo: CompanySVGs.Oracle },
  { id: 'capgemini', name: 'Capgemini', category: 'Digital Transformation', badge: 'Global', accent: 'bg-sky-50/70 border-sky-200/80 text-sky-950', badgeColor: 'bg-sky-100 text-sky-700 border-sky-200', logo: CompanySVGs.Capgemini },
  { id: 'adobe', name: 'Adobe', category: 'Creative Cloud & Document', badge: 'Tier 1', accent: 'bg-red-50/70 border-red-200/80 text-red-950', badgeColor: 'bg-red-100 text-red-700 border-red-200', logo: CompanySVGs.Adobe },
];

export function CompanyLogos() {
  return (
    <section id="trusted-companies" className="py-14 sm:py-18 bg-white border-b border-[#E2E8F0] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FBAB23]" />
            <span>500+ Verified Campus Recruiters</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
            Trusted by Industry Leaders & Campus Hiring Teams
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-2xl mx-auto">
            Top global tech corporations, consulting firms, and high-growth innovators recruit directly through CampusHire with zero spreadsheet friction.
          </p>
        </div>

      </div>

      {/* Infinite Scrolling Marquee Tracks Container with Fade Edges */}
      <div className="relative w-full overflow-hidden space-y-4 py-2 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        
        {/* Track 1: Right-to-Left */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-left flex shrink-0 items-center gap-4 will-change-transform">
            {[...ROW_1_COMPANIES, ...ROW_1_COMPANIES].map((company, index) => (
              <div
                key={`${company.id}-row1-${index}`}
                className={`min-w-[240px] sm:min-w-[270px] flex flex-col justify-between p-4 rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${company.accent}`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    {company.logo}
                    <span className="text-sm sm:text-base font-bold font-heading tracking-tight text-[#0F172A]">
                      {company.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${company.badgeColor}`}>
                    {company.badge}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#64748B] font-medium truncate">
                  {company.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Left-to-Right (Offset Motion Contrast) */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-right flex shrink-0 items-center gap-4 will-change-transform">
            {[...ROW_2_COMPANIES, ...ROW_2_COMPANIES, ...ROW_2_COMPANIES].map((company, index) => (
              <div
                key={`${company.id}-row2-${index}`}
                className={`min-w-[240px] sm:min-w-[270px] flex flex-col justify-between p-4 rounded-2xl border shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${company.accent}`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    {company.logo}
                    <span className="text-sm sm:text-base font-bold font-heading tracking-tight text-[#0F172A]">
                      {company.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${company.badgeColor}`}>
                    {company.badge}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#64748B] font-medium truncate">
                  {company.category}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Live Metrics Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#475569]">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>Over <strong>18,500+</strong> verified placement offers dispatched with zero spreadsheet leakage</span>
          </div>
          <Link
            href="/register?role=RECRUITER"
            className="font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>Post Your Company Drive on CampusHire</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

    </section>
  );
}
