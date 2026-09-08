'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ExternalLink, 
  FileText, 
  Mail, 
  Phone, 
  Eye,
  CheckCircle2,
  GraduationCap,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { StudentRowData } from './TpoStudentsTable';
import { FilterState } from './TpoStudentsFilters';

interface TpoStudentsMobileListProps {
  students: StudentRowData[];
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onOpenMobileFilterDrawer: () => void;
  onViewStudent: (student: StudentRowData) => void;
  totalStudentsCount: number;
  placedStudentsCount: number;
  eligibleStudentsCount: number;
  inInterviewCount: number;
  isLoading?: boolean;
}

export function TpoStudentsMobileList({
  students,
  filters,
  onFilterChange,
  onOpenMobileFilterDrawer,
  onViewStudent,
  totalStudentsCount,
  placedStudentsCount,
  eligibleStudentsCount,
  inInterviewCount,
  isLoading,
}: TpoStudentsMobileListProps) {
  const tabs = [
    { key: 'ALL', label: 'All', count: totalStudentsCount },
    { key: 'PLACED', label: 'Placed', count: placedStudentsCount },
    { key: 'ELIGIBLE', label: 'Eligible', count: eligibleStudentsCount },
    { key: 'IN_INTERVIEW', label: 'Interview', count: inInterviewCount },
  ];

  const renderPlacementBadge = (status: string) => {
    switch (status) {
      case 'PLACED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Placed
          </span>
        );
      case 'IN_INTERVIEW':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            In Interview
          </span>
        );
      case 'ELIGIBLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Eligible
          </span>
        );
      case 'APPLIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Applied
          </span>
        );
      case 'NOT_PLACED':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Not Placed
          </span>
        );
    }
  };

  const getCgpaBadge = (cgpa: number) => {
    if (!cgpa) return <span className="text-slate-400 font-bold">—</span>;
    if (cgpa >= 8.5) {
      return (
        <span className="inline-flex items-center gap-1 font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
          <Award className="w-3 h-3 text-emerald-600" />
          <span>{cgpa.toFixed(1)} CGPA</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
        <span>{cgpa.toFixed(1)} CGPA</span>
      </span>
    );
  };

  return (
    <div className="md:hidden space-y-3.5">
      {/* Search & Filter Icon Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search student by name, email, roll no..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-white text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none shadow-2xs transition-all"
          />
        </div>
        <button
          onClick={onOpenMobileFilterDrawer}
          type="button"
          aria-label="Open filter options"
          className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-slate-700 hover:text-blue-600 transition-colors shadow-2xs cursor-pointer shrink-0 active:scale-95"
        >
          <Filter className="w-4 h-4 text-blue-600" />
        </button>
      </div>

      {/* Horizontal Tabs: All, Placed, Eligible, Interview */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-3.5 px-3.5">
        {tabs.map((tab) => {
          const isActive = filters.placementStatus === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onFilterChange('placementStatus', tab.key)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Student Card List */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs animate-pulse space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="w-28 h-3.5 bg-slate-200 rounded-md" />
                  <div className="w-40 h-3 bg-slate-100 rounded-md" />
                </div>
              </div>
              <div className="h-4 bg-slate-100 rounded-md w-3/4" />
            </div>
          ))
        ) : students.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-200/80 shadow-2xs space-y-1.5">
            <p className="text-sm font-bold text-slate-700">No students found</p>
            <p className="text-xs text-slate-400">
              Try adjusting your filter options or search term.
            </p>
          </div>
        ) : (
          students.map((student) => {
            const initials = student.name
              ? student.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : 'ST';

            return (
              <div
                key={student.id}
                onClick={() => onViewStudent(student)}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-md hover:border-blue-300 active:scale-[0.99] transition-all cursor-pointer relative group"
              >
                {/* Top Section: Avatar, Name, Email, Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative shrink-0">
                      {student.avatarUrl ? (
                        <img
                          src={student.avatarUrl}
                          alt={student.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center shadow-2xs">
                          {initials}
                        </div>
                      )}
                      {student.isVerified && (
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow-2xs">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-slate-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                          {student.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                        {student.email}
                      </p>
                      {student.enrollmentNumber && (
                        <p className="text-[10.5px] font-mono font-bold text-slate-500 truncate">
                          {student.enrollmentNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {renderPlacementBadge(student.placementStatus)}
                  </div>
                </div>

                {/* Middle Info Tags: Branch, Batch, CGPA, Applications */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px] font-black text-slate-800 border border-slate-200">
                      {student.branch}
                    </span>
                    <span className="text-slate-400 font-semibold text-[11px]">
                      Batch {student.batchYear}
                    </span>
                    <span className="text-slate-200">•</span>
                    {getCgpaBadge(student.cgpa)}
                  </div>

                  <span className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {student.applicationsCount} {student.applicationsCount === 1 ? 'Application' : 'Applications'}
                  </span>
                </div>

                {/* Bottom Quick Action Row */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/tpo/students/${student.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View 360° Dossier</span>
                  </Link>

                  {student.resumeUrl && (
                    <a
                      href={student.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Resume</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
