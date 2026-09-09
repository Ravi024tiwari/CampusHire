'use client';

import React from 'react';
import { 
  Building2, 
  Globe, 
  HeartHandshake, 
  Coffee, 
  Laptop, 
  GraduationCap, 
  ShieldCheck, 
  TrendingUp,
  ExternalLink 
} from 'lucide-react';
import { StudentJobItem } from '@/store/useStudentJobsStore';

interface JobDetailAboutCompanySectionProps {
  job: StudentJobItem;
}

export function JobDetailAboutCompanySection({ job }: JobDetailAboutCompanySectionProps) {
  const perks = [
    { title: 'Comprehensive Healthcare', desc: '100% premium coverage for medical, dental, and dependent parental insurance.', icon: HeartHandshake },
    { title: 'Learning & Dev Stipend', desc: '₹ 75,000 / year budget for certifications, books, and international conferences.', icon: GraduationCap },
    { title: 'Flexible & Hybrid Work', desc: 'Work from state-of-the-art innovation hubs or remote options with home setup allowance.', icon: Laptop },
    { title: 'Free Gourmet Meals & Snacks', desc: 'Unlimited healthy snacks, catered lunches, and specialty coffee micro-kitchens.', icon: Coffee },
    { title: 'Equity Grants & ESOPs', desc: 'Long-term equity wealth creation programs and performance-linked bonuses.', icon: TrendingUp },
    { title: 'Wellness & Gym Allowance', desc: 'Monthly wellness reimbursement for gym memberships, sports clubs, and mental health.', icon: ShieldCheck },
  ];

  return (
    <div id="section-about-company" className="scroll-mt-28 space-y-6">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-blue-600">
            <Building2 className="w-5 h-5" />
            <div>
              <h3 className="text-base font-black text-[#0A2540] font-heading">
                About {job.company.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Leading Technology & Innovation Enterprise
              </p>
            </div>
          </div>

          {job.company.website && (
            <a
              href={job.company.website.startsWith('http') ? job.company.website : `https://${job.company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Visit Official Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          )}
        </div>

        {/* Company Description */}
        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
          <p>
            <span className="font-extrabold text-[#0A2540]">{job.company.name}</span> is an industry pioneer dedicated to organizing world information, building next-generation cloud infrastructure, and creating transformative consumer and enterprise software products used by billions.
          </p>
          <p>
            With world-class engineering campuses across India (Bangalore, Hyderabad, Pune, Gurgaon), the company fosters a culture of high ownership, psychological safety, continuous learning, and boundless curiosity.
          </p>
        </div>

        {/* Perks & Benefits Section */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider font-heading">
            Campus Hire Perks & Benefits
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-1 hover:bg-white hover:border-blue-200 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-100/60 text-blue-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-[#0A2540]">
                      {perk.title}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal pl-8">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
