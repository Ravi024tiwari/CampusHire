'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  ExternalLink,
  Loader2 
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { CompanyItem } from '../_types/company.types';

interface CompanyCardProps {
  company: CompanyItem;
  isProcessing: boolean;
  onOpenRecruiters: (company: CompanyItem) => void;
  onToggleVerification: (company: CompanyItem) => void;
}

export function CompanyCard({
  company,
  isProcessing,
  onOpenRecruiters,
  onToggleVerification,
}: CompanyCardProps) {
  const recruitersCount = company._count?.recruiters || 0;
  const drivesCount = company._count?.jobs || 0;
  const offersCount = company._count?.offers || 0;

  return (
    <Card className="group relative rounded-3xl border border-slate-200/90 bg-white p-4.5 sm:p-5 xl:p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_rgba(99,102,241,0.12)] hover:border-purple-300/80 transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Header Section */}
      <div className="space-y-3.5 sm:space-y-4">
        
        {/* Emblem, Company Name & Verification Badge */}
        <div className="flex items-start justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
            {/* Logo / Monogram */}
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-purple-50/30 flex items-center justify-center text-base sm:text-lg font-black text-purple-700 shadow-2xs group-hover:scale-105 transition-transform duration-300">
              {company.logoUrl ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.name} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                <span>{company.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>

            {/* Name & Industry */}
            <div className="min-w-0">
              <h3 className="font-extrabold text-[#0A2540] text-sm sm:text-base xl:text-lg tracking-tight truncate group-hover:text-purple-700 transition-colors">
                {company.name}
              </h3>
              <span className="inline-block text-[11px] sm:text-xs font-semibold text-slate-500 truncate max-w-[150px] sm:max-w-[180px]">
                {company.industry || 'Technology & Enterprise'}
              </span>
            </div>
          </div>

          {/* Status Badge using shadcn Badge */}
          <Badge
            variant={company.isVerified ? "outline" : "secondary"}
            className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-extrabold shadow-2xs border ${
              company.isVerified
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/70'
                : 'bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100/70'
            }`}
          >
            {company.isVerified ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>Verified</span>
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <span>Pending</span>
              </>
            )}
          </Badge>
        </div>

        {/* Company Description (if present) */}
        {company.description && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {company.description}
          </p>
        )}

        {/* Location & Website Meta Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
          {company.location && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px] sm:text-xs font-medium text-slate-600 min-w-0">
              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate max-w-[110px] sm:max-w-[140px]">{company.location}</span>
            </span>
          )}

          {company.website && (
            <a
              href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50/70 hover:bg-blue-100 border border-blue-200/60 text-[11px] sm:text-xs font-mono font-semibold text-[#2563EB] transition-colors min-w-0"
            >
              <Globe className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
              <span className="truncate max-w-[100px] sm:max-w-[130px]">
                {company.website.replace(/^https?:\/\//, '')}
              </span>
              <ExternalLink className="h-2.5 w-2.5 text-blue-400 shrink-0" />
            </a>
          )}
        </div>

        {/* Internal Metrics HUD Compartment */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 rounded-2xl bg-slate-50/90 border border-slate-200/70 p-2.5 sm:p-3">
          {/* Recruiters (Clickable trigger) */}
          <button
            type="button"
            onClick={() => onOpenRecruiters(company)}
            className="flex flex-col items-center justify-center p-1 sm:p-1.5 rounded-xl hover:bg-white transition-all cursor-pointer group/rec min-w-0"
          >
            <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover/rec:text-purple-600 truncate max-w-full">
              Recruiters
            </span>
            <span className="text-sm sm:text-base font-black text-[#0A2540] group-hover/rec:text-purple-700">
              {recruitersCount}
            </span>
          </button>

          {/* Drives Count */}
          <div className="flex flex-col items-center justify-center p-1 sm:p-1.5 border-x border-slate-200/60 min-w-0">
            <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate max-w-full">
              Drives
            </span>
            <span className="text-sm sm:text-base font-black text-[#0A2540]">
              {drivesCount}
            </span>
          </div>

          {/* Hires Count */}
          <div className="flex flex-col items-center justify-center p-1 sm:p-1.5 min-w-0">
            <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate max-w-full">
              Hires
            </span>
            <span className="text-sm sm:text-base font-black text-emerald-700">
              {offersCount}
            </span>
          </div>
        </div>

      </div>

      {/* Card Actions Footer using shadcn Button */}
      <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-slate-100 space-y-2 sm:space-y-2.5">
        
        {/* Recruiter Management Link Button */}
        <Link
          href={`/admin/recruiters?companyId=${company.id}&companyName=${encodeURIComponent(company.name)}`}
          className="w-full py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200/70 text-purple-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
          <span className="truncate">Manage Recruiter Team ({recruitersCount})</span>
          <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0" />
        </Link>

        {/* Verification Status Toggle Button */}
        <Button
          type="button"
          disabled={isProcessing}
          onClick={() => onToggleVerification(company)}
          variant={company.isVerified ? "outline" : "default"}
          className={`w-full h-auto py-2.5 sm:py-3 px-3 sm:px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-2xs disabled:opacity-50 ${
            company.isVerified
              ? 'bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border-slate-200 hover:border-rose-200'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 shadow-md hover:scale-[1.01] active:scale-[0.99]'
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
          ) : company.isVerified ? (
            <>
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
              <span className="truncate">Accredited (Click to Revoke)</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] shrink-0" />
              <span className="truncate">Approve & Accredit Company</span>
            </>
          )}
        </Button>

      </div>

    </Card>
  );
}

