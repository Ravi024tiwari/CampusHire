'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  CheckCircle2, 
  Eye, 
  MapPin, 
  Globe, 
  Users, 
  Briefcase, 
  ShieldAlert, 
  Loader2,
  GraduationCap,
  Search,
  Filter
} from 'lucide-react';

interface VerifiedInstitutionsTableProps {
  hideHeader?: boolean;
}

export function VerifiedInstitutionsTable({ hideHeader = false }: VerifiedInstitutionsTableProps) {
  const { 
    verifiedColleges, 
    verifyCollege, 
    isVerifyingId, 
    searchQuery 
  } = useAdminStore();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');

  // Collect unique states from accredited colleges
  const statesList = Array.from(
    new Set(verifiedColleges.map((college) => college.state).filter(Boolean))
  ) as string[];

  const activeSearchQuery = localSearch || searchQuery;

  // Filter verified colleges based on search query and state filter
  const filteredVerifiedColleges = verifiedColleges.filter((college) => {
    // 1. State filter
    if (selectedState !== 'ALL' && college.state !== selectedState) {
      return false;
    }

    // 2. Search query filter
    if (!activeSearchQuery) {
      return true;
    }

    const normalizedQuery = activeSearchQuery.toLowerCase().trim();

    const matchesName = college.name.toLowerCase().includes(normalizedQuery);
    const matchesCode = Boolean(college.code && college.code.toLowerCase().includes(normalizedQuery));
    const matchesDomain = Boolean(college.domain && college.domain.toLowerCase().includes(normalizedQuery));
    const matchesCity = Boolean(college.city && college.city.toLowerCase().includes(normalizedQuery));
    const matchesState = Boolean(college.state && college.state.toLowerCase().includes(normalizedQuery));
    const matchesEmail = Boolean(college.contactEmail && college.contactEmail.toLowerCase().includes(normalizedQuery));

    return matchesName || matchesCode || matchesDomain || matchesCity || matchesState || matchesEmail;
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-6 xl:p-8 shadow-xs">
      
      {/* 1. Optional Component Header (Only shown when on dashboard widget mode) */}
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 xl:pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 xl:h-10 xl:w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs shrink-0">
              <CheckCircle2 className="h-4.5 w-4.5 xl:h-6 xl:w-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg xl:text-xl font-bold text-[#0A2540] tracking-tight font-heading">
                Accredited University Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Verified university campuses equipped with departmental TPC cells and active placement rosters
              </p>
            </div>
          </div>

          <span className="inline-flex items-center self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-800 border border-emerald-200 shadow-2xs">
            {verifiedColleges.length} Verified
          </span>
        </div>
      )}

      {/* 2. Interactive Search & State Filter Controls */}
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 ${!hideHeader ? 'mt-4' : ''}`}>
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by university name, code, domain, or city..."
            value={localSearch}
            onChange={(event) => setLocalSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 sm:py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 font-medium transition-all"
          />
        </div>

        {/* State Filter Dropdown (if states available) */}
        {statesList.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="h-4 w-4 text-slate-400 shrink-0 hidden sm:block" />
            <select
              value={selectedState}
              onChange={(event) => setSelectedState(event.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50/80 py-2 sm:py-2.5 px-3 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-[#2563EB] focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="ALL">All States ({verifiedColleges.length})</option>
              {statesList.map((stateName) => (
                <option key={stateName} value={stateName}>{stateName}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 3. Cards Queue Body */}
      <div className="mt-4 sm:mt-5">
        {filteredVerifiedColleges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 border border-slate-200 mb-3 shadow-2xs">
              <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0A2540]">
              {verifiedColleges.length === 0 ? 'No Accredited Universities' : 'No Campuses Match Filter'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
              {verifiedColleges.length === 0 
                ? 'Registered universities awaiting approval can be accredited from the Accreditation Queue.'
                : 'Try adjusting your search query or state filter to view accredited institutions.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-3.5">
            {filteredVerifiedColleges.map((college) => {
              const isVerifying = isVerifyingId === college.id;
              return (
                <div
                  key={college.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5 transition-all duration-200 hover:shadow-md hover:border-blue-300 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4"
                >
                  {/* Left: Crest + Identity & Metadata */}
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    
                    {/* Emblem / Crest */}
                    <div className="h-11 w-11 sm:h-13 sm:w-13 xl:h-14 xl:w-14 shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center text-[#2563EB] font-black shadow-2xs">
                      {college.logoUrl ? (
                        <img 
                          src={college.logoUrl} 
                          alt={college.name} 
                          className="h-full w-full object-cover" 
                          onError={(e) => {
                            // Fallback if image load fails
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xs sm:text-sm xl:text-base font-extrabold">
                          {college.code || college.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Information Cluster */}
                    <div className="space-y-1 sm:space-y-1.5 flex-1 min-w-0">
                      
                      {/* Name & Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <h4 className="text-sm sm:text-base xl:text-lg font-bold text-[#0A2540] hover:text-[#2563EB] transition-colors leading-snug">
                          {college.name}
                        </h4>
                        
                        {college.code && (
                          <span className="rounded-md bg-slate-100 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold text-slate-700 border border-slate-200">
                            {college.code}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-extrabold text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          Accredited
                        </span>
                      </div>

                      {/* Detail Tags */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        {college.domain && (
                          <span className="flex items-center gap-1 text-[#2563EB] font-mono text-[11px] sm:text-xs font-semibold">
                            <Globe className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                            @{college.domain}
                          </span>
                        )}

                        {(college.city || college.state) && (
                          <span className="flex items-center gap-1 font-medium text-[11px] sm:text-xs">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            {[college.city, college.state].filter(Boolean).join(', ')}
                          </span>
                        )}

                        {college._count && (
                          <>
                            <span className="flex items-center gap-1 font-bold text-slate-700 text-[11px] sm:text-xs">
                              <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              {college._count.students || 0} Students
                            </span>
                            <span className="flex items-center gap-1 font-bold text-[#2563EB] text-[11px] sm:text-xs">
                              <Briefcase className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                              {college._count.jobs || 0} Drives
                            </span>
                          </>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Right: Fast Action Buttons - 2-col on mobile, inline on desktop */}
                  <div className="grid grid-cols-2 md:flex md:items-center gap-2 sm:gap-2.5 shrink-0 pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <Link
                      href={`/admin/colleges/${college.id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#0A2540] shadow-2xs transition-all hover:bg-slate-50 hover:border-blue-400 cursor-pointer active:scale-98"
                    >
                      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500" />
                      <span>View Dossier</span>
                    </Link>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to revoke accreditation for ${college.name}?`)) {
                          verifyCollege(college.id, false, 'Super Admin manual revocation');
                        }
                      }}
                      disabled={isVerifying}
                      className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-50 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-red-600 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin text-red-600" />
                          <span>Revoking...</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                          <span>Revoke</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}

