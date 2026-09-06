'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Pencil, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { useRecruiterCompanyStore } from '@/store/useRecruiterCompanyStore';

interface CompanyIdentityCardProps {
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    industry?: string | null;
    location?: string | null;
    website?: string | null;
    description?: string | null;
    isVerified?: boolean;
  };
}

export function CompanyIdentityCard({ company }: CompanyIdentityCardProps) {
  const { setEditModalOpen } = useRecruiterCompanyStore();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const fallbackDescription =
    `${company.name}'s mission is to empower universities, graduates, and innovators worldwide. We build impactful products and nurture high-potential campus talent across diverse technical and leadership roles.`;

  const description = company.description || fallbackDescription;
  const isLongDescription = description.length > 180;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        
        {/* Left Side: Logo + Info Details */}
        <div className="flex items-start gap-4 sm:gap-5 min-w-0 w-full md:w-auto">
          
          {/* Company Logo / Avatar */}
          <div className="relative shrink-0">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={`${company.name} Logo`}
                loading="lazy"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl object-contain bg-white p-2 border-2 border-slate-100 shadow-md transition-opacity duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/company/google_logo.jpg';
                }}
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md border-2 border-slate-100">
                {company.name ? company.name.slice(0, 2).toUpperCase() : 'CO'}
              </div>
            )}
            {company.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-500 fill-emerald-100" />
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
                {company.name}
              </h1>
              {company.isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified
                </span>
              )}
            </div>

            {/* Meta Row: Industry • Location • Website */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600 font-semibold pt-0.5">
              {company.industry && (
                <span className="inline-flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{company.industry}</span>
                </span>
              )}

              {company.industry && company.location && <span className="text-slate-300">•</span>}

              {company.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{company.location}</span>
                </span>
              )}

              {company.website && (
                <>
                  {(company.industry || company.location) && <span className="text-slate-300">•</span>}
                  <a
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold transition-colors underline-offset-2 hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate max-w-[180px] sm:max-w-xs">{company.website.replace(/^https?:\/\//, '')}</span>
                    <ExternalLink className="w-3 h-3 text-blue-500 shrink-0" />
                  </a>
                </>
              )}
            </div>

            {/* Description Snippet with Expand on Mobile */}
            <div className="pt-1.5">
              <p className={`text-xs sm:text-sm text-slate-500 font-medium leading-relaxed ${
                !isDescriptionExpanded && isLongDescription ? 'line-clamp-2 md:line-clamp-3' : ''
              }`}>
                {description}
              </p>
              {isLongDescription && (
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="md:hidden inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 pt-1 cursor-pointer"
                >
                  <span>{isDescriptionExpanded ? 'Show less' : 'Show more'}</span>
                  {isDescriptionExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Edit Profile Action Button */}
        <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
          <button
            type="button"
            onClick={() => setEditModalOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0A2540] text-xs sm:text-sm font-black transition-all shadow-2xs hover:shadow-md cursor-pointer group active:scale-98"
          >
            <Pencil className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
            <span>Edit Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
}
