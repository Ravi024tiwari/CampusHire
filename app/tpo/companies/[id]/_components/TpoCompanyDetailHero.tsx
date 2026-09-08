'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  CheckCircle2,
  Calendar,
  Mail,
  ExternalLink,
  Share2,
  Briefcase,
} from 'lucide-react';

interface TpoCompanyDetailHeroProps {
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    website?: string | null;
    industry: string;
    location: string;
    companyType: string;
    description: string;
    isVerified?: boolean;
  };
  onScheduleDrive: () => void;
  onContactRecruiter: () => void;
}

export function TpoCompanyDetailHero({
  company,
  onScheduleDrive,
  onContactRecruiter,
}: TpoCompanyDetailHeroProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/tpo/companies"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors group"
        >
          <div className="p-1.5 rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 shadow-xs">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span>Back to Companies</span>
        </Link>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onContactRecruiter}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-xs transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Contact HR</span>
          </button>

          <button
            onClick={onScheduleDrive}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Drive</span>
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Logo Box */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-200/90 p-3 flex items-center justify-center shadow-xs shrink-0">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <Building2 className="w-8 h-8 text-blue-600" />
            )}
          </div>

          {/* Details */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A2540] tracking-tight">
                {company.name}
              </h1>
              {company.isVerified !== false && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Verified Recruiter
                </span>
              )}
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {company.companyType}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {company.description}
            </p>

            {/* Badges Info */}
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{company.industry}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{company.location}</span>
              </div>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline font-bold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Careers Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
