'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CollegeItem } from '../_types/recruiter-colleges.types';
import { 
  ShieldCheck, 
  MapPin, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Bookmark, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  Award,
  PlusCircle,
  School,
  Star
} from 'lucide-react';

interface VerifiedCollegesGridProps {
  colleges: CollegeItem[];
  onSelectCollege: (college: CollegeItem) => void;
  savedColleges?: string[];
  onToggleSave?: (collegeId: string) => void;
}

// Curated architectural campus stock images for verified universities
const CAMPUS_PREVIEWS: Record<string, string> = {
  IITB: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  NITT: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  BITS: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
  VIT: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
  SRM: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=800&q=80',
  MIT: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80',
  DEFAULT: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80',
};

const CAMPUS_DESCRIPTIONS: Record<string, string> = {
  IITB: 'One of India’s premier institutes for engineering, science, AI and advanced technological research.',
  NITT: 'A leading national institute for technical education, high-impact placements and industrial innovation.',
  BITS: 'A prestigious institute known for academic excellence, merit-based admissions and deep startup culture.',
  VIT: 'A pioneer in global engineering education with state-of-the-art labs and international placements.',
  SRM: 'A multidisciplinary university with strong research capabilities, industrial partnerships, and top talent.',
  MIT: 'A top-ranked institute with industry-aligned programs and stellar campus placement track record.',
  DEFAULT: 'Premier accredited educational campus with active placement departments and pre-verified student talent pool.'
};

export function VerifiedCollegesGrid({
  colleges,
  onSelectCollege,
  savedColleges = [],
  onToggleSave,
}: VerifiedCollegesGridProps) {
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const handleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
    if (onToggleSave) onToggleSave(id);
  };

  if (colleges.length === 0) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-slate-300 shadow-xs space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h3 className="text-base font-extrabold text-[#0A2540] font-heading">
          No Verified Colleges Found
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Try clearing your search query or adjusting location and state filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
      {colleges.map((college) => {
        const code = (college.code || 'CAMPUS').toUpperCase();
        const bannerImg = CAMPUS_PREVIEWS[code] || college.images?.[0] || CAMPUS_PREVIEWS.DEFAULT;
        const description = CAMPUS_DESCRIPTIONS[code] || CAMPUS_DESCRIPTIONS.DEFAULT;
        const isSaved = Boolean(bookmarkedIds[college.id] || savedColleges.includes(college.id));
        const studentsCount = college._count?.students 
          ? `${(college._count.students > 1000 ? `${(college._count.students / 1000).toFixed(0)}K+` : college._count.students)} Students`
          : '15K+ Students';
        const deptsCount = '12 Departments';
        const naacGrade = 'A++ NAAC Grade';
        const locationText = [college.city, college.state].filter(Boolean).join(', ') || 'India';

        return (
          <div
            key={college.id}
            onClick={() => onSelectCollege(college)}
            className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400/90 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
          >
            {/* Top: Campus Photo Banner */}
            <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
              <Image
                src={bannerImg}
                alt={college.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Verified Green Badge (Top Left) */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black tracking-wide shadow-sm border border-emerald-400/40">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>

              {/* Bookmark Save Button (Top Right) */}
              <button
                type="button"
                onClick={(e) => handleBookmark(e, college.id)}
                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                  isSaved
                    ? 'bg-blue-600 text-white shadow-blue-500/30'
                    : 'bg-white/80 hover:bg-white text-slate-700 hover:text-[#0A2540]'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save college'}
                aria-label="Bookmark college"
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>

              {/* College Logo Emblem Floating at Bottom Left */}
              <div className="absolute -bottom-3 left-4">
                <div className="relative w-12 h-12 rounded-2xl bg-white p-1 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
                  {college.logoUrl ? (
                    <Image
                      src={college.logoUrl}
                      alt={college.name}
                      fill
                      sizes="48px"
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xs">
                      {code.substring(0, 3)}
                    </div>
                  )}
                </div>
              </div>

              {/* Code Pill on bottom right */}
              <div className="absolute bottom-2.5 right-3">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                  {code}
                </span>
              </div>
            </div>

            {/* Middle Content: Name, Location, Description, Stats */}
            <div className="p-4 sm:p-5 pt-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                {/* College Name */}
                <h3 className="text-base sm:text-lg font-black text-[#0A2540] group-hover:text-blue-600 transition-colors font-heading tracking-tight line-clamp-1">
                  {college.name}
                </h3>

                {/* Location with Pin */}
                <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold mt-0.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{locationText}</span>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed mb-3">
                  {description}
                </p>
              </div>

              {/* 3 Metric Badges Strip (Students, Depts, NAAC) */}
              <div>
                <div className="grid grid-cols-3 gap-1.5 py-2.5 px-2 rounded-xl bg-slate-50 border border-slate-200/80 text-center mb-3">
                  
                  {/* Metric 1: Students */}
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-[#0A2540] block truncate">
                      {studentsCount}
                    </span>
                    <span className="text-[9.5px] font-bold text-slate-400 block uppercase">
                      Pool
                    </span>
                  </div>

                  {/* Metric 2: Depts */}
                  <div className="space-y-0.5 border-x border-slate-200">
                    <span className="text-[11px] font-black text-[#0A2540] block truncate">
                      {deptsCount}
                    </span>
                    <span className="text-[9.5px] font-bold text-slate-400 block uppercase">
                      Streams
                    </span>
                  </div>

                  {/* Metric 3: NAAC */}
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-emerald-700 block truncate">
                      {naacGrade}
                    </span>
                    <span className="text-[9.5px] font-bold text-slate-400 block uppercase">
                      Rating
                    </span>
                  </div>

                </div>

                {/* Bottom Actions Row: View Details CTA */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCollege(college);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <Link
                    href={`/recruiter/jobs/create?collegeId=${college.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-extrabold transition-all cursor-pointer shadow-2xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Post Drive</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}
