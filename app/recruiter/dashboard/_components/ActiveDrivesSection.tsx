'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { JobDrive } from '../_types/recruiter-dashboard.types';
import { 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Users, 
  Calendar,
  ChevronRight,
  Search,
  Building2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ActiveDrivesSectionProps {
  drives: JobDrive[];
}

export function ActiveDrivesSection({ drives }: ActiveDrivesSectionProps) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredDrives = drives.filter((drive) => {
    if (!filterQuery) return true;
    const query = filterQuery.toLowerCase();
    return (
      drive.title.toLowerCase().includes(query) ||
      drive.college?.name.toLowerCase().includes(query) ||
      drive.college?.code.toLowerCase().includes(query) ||
      drive.type.toLowerCase().includes(query)
    );
  });

  return (
    <div id="drives" className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-6 lg:p-7 shadow-xs space-y-5">
      
      {/* 1. Header & Live Search Filter Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100">
              <Briefcase className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg lg:text-xl font-extrabold font-heading text-[#0A2540] tracking-tight">
              Active Campus Placement Drives
            </h2>
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] sm:text-xs font-black text-blue-700 border border-blue-200">
              {drives.length} Drives
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Hiring campaigns currently live across verified university placement cells.
          </p>
        </div>

        {/* Search Input Filter */}
        <div className="relative w-full md:w-64 lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search drive or college..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-8.5 pr-3 text-xs text-[#0A2540] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 font-medium"
          />
        </div>
      </div>

      {/* 2. Drives Grid */}
      {filteredDrives.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
          <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-[#0A2540]">
            {filterQuery ? 'No drives matching your search' : 'No active campus drives found'}
          </p>
          <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
            {filterQuery ? 'Try clearing or changing your search terms.' : 'Hiring drives will appear here when scheduled with partner universities.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
          {filteredDrives.map((drive) => {
            const packageLpa = (drive.salaryPackage / 100000).toFixed(1);
            return (
              <div
                key={drive.id}
                className="group relative p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: University + CTC Pill */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                        {drive.college?.logoUrl ? (
                          <Image
                            src={drive.college.logoUrl}
                            alt={drive.college.name}
                            fill
                            sizes="40px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#0A2540] truncate group-hover:text-[#2563EB] transition-colors">
                          {drive.college?.name || 'Partner University'}
                        </h4>
                        <p className="text-[10.5px] font-mono font-semibold text-slate-500 flex items-center gap-1.5">
                          <span>{drive.college?.code}</span>
                          {drive.college?.city && (
                            <>
                              <span>•</span>
                              <span>{drive.college.city}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono shrink-0 shadow-2xs">
                      ₹{packageLpa} LPA
                    </span>
                  </div>

                  {/* Drive Role Title */}
                  <h3 className="text-sm sm:text-base font-extrabold font-heading text-[#0A2540] mb-2 line-clamp-1">
                    {drive.title}
                  </h3>

                  {/* Tags & Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 mb-4">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700">
                      {drive.type}
                    </span>
                    {drive.deadline && (
                      <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Closes {new Date(drive.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Telemetry Bar */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Users className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>
                      <strong className="text-[#0A2540] font-bold">{drive._count?.applications || 0}</strong> Candidates Applied
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] group-hover:translate-x-0.5 transition-transform">
                    <span>Manage Drive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
