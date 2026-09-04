'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { CollegeItem } from '../_types/recruiter-colleges.types';
import { 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Eye,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Copy,
  Check,
  Building2,
  Sparkles,
  ArrowUpDown,
  Filter,
  Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RecruiterCollegesTableProps {
  colleges: CollegeItem[];
  onSelectCollege: (college: CollegeItem) => void;
  onResetFilters?: () => void;
}

type SortField = 'name' | 'code' | 'location' | 'students' | 'jobs';
type SortDirection = 'asc' | 'desc';
type SegmentFilter = 'all' | 'active_drives' | 'large_pool';

export function RecruiterCollegesTable({ 
  colleges, 
  onSelectCollege,
  onResetFilters 
}: RecruiterCollegesTableProps) {
  // Sort State
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Quick Segment Filter State
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Copied State for institutional codes
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopyCode = (e: React.MouseEvent, id: string, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Toggle or Set Sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page on sort change
  };

  // 1. Apply Segment Filter
  const segmentFilteredColleges = useMemo(() => {
    return colleges.filter(college => {
      if (segmentFilter === 'active_drives') {
        return (college._count?.jobs || 0) > 0;
      }
      if (segmentFilter === 'large_pool') {
        return (college._count?.students || 0) >= 10;
      }
      return true;
    });
  }, [colleges, segmentFilter]);

  // 2. Apply Sorting
  const sortedColleges = useMemo(() => {
    return [...segmentFilteredColleges].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'code':
          comparison = (a.code || '').localeCompare(b.code || '');
          break;
        case 'location': {
          const locA = [a.state, a.city].filter(Boolean).join(' ');
          const locB = [b.state, b.city].filter(Boolean).join(' ');
          comparison = locA.localeCompare(locB);
          break;
        }
        case 'students':
          comparison = (a._count?.students || 0) - (b._count?.students || 0);
          break;
        case 'jobs':
          comparison = (a._count?.jobs || 0) - (b._count?.jobs || 0);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [segmentFilteredColleges, sortField, sortDirection]);

  // 3. Apply Pagination
  const totalItems = sortedColleges.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // Guard current page
  const safePage = Math.min(currentPage, totalPages);
  const paginatedColleges = useMemo(() => {
    const startIndex = (safePage - 1) * pageSize;
    return sortedColleges.slice(startIndex, startIndex + pageSize);
  }, [sortedColleges, safePage, pageSize]);

  // Segment Filter Counts for live telemetry
  const counts = useMemo(() => ({
    all: colleges.length,
    active_drives: colleges.filter(c => (c._count?.jobs || 0) > 0).length,
    large_pool: colleges.filter(c => (c._count?.students || 0) >= 10).length,
  }), [colleges]);

  if (colleges.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 bg-white shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs mb-3">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[#0A2540] font-heading">
          No Verified Universities Found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          No accredited university campuses matched your search or state filter. Try adjusting your parameters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  // Render Sort Header Helper
  const renderSortHeader = (label: string, field: SortField, align: 'left' | 'right' = 'left') => {
    const isActive = sortField === field;
    return (
      <th 
        scope="col"
        onClick={() => handleSort(field)}
        className={`py-3.5 px-4 font-extrabold uppercase tracking-wider text-[11px] cursor-pointer select-none transition-colors group ${
          align === 'right' ? 'text-right' : 'text-left'
        } ${
          isActive ? 'text-[#2563EB] bg-blue-50/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
        }`}
      >
        <div className={`inline-flex items-center gap-1.5 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
          <span>{label}</span>
          <span className="shrink-0 text-slate-400 group-hover:text-slate-700 transition-colors">
            {isActive ? (
              sortDirection === 'asc' ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#2563EB] stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#2563EB] stroke-[2.5]" />
              )
            ) : (
              <ChevronsUpDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
            )}
          </span>
        </div>
      </th>
    );
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Quick Segment Filter Pills & Active Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-1">
        
        {/* Filter Segment Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => { setSegmentFilter('all'); setCurrentPage(1); }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              segmentFilter === 'all'
                ? 'bg-[#0A2540] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>All Campuses</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
              segmentFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setSegmentFilter('active_drives'); setCurrentPage(1); }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              segmentFilter === 'active_drives'
                ? 'bg-[#2563EB] text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>Active Drives</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
              segmentFilter === 'active_drives' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2563EB]'
            }`}>
              {counts.active_drives}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { setSegmentFilter('large_pool'); setCurrentPage(1); }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              segmentFilter === 'large_pool'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Candidate Pool (10+)</span>
            <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
              segmentFilter === 'large_pool' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
            }`}>
              {counts.large_pool}
            </span>
          </button>
        </div>

        {/* Live Counter & Page Size Selector */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 font-medium">
          <span className="hidden md:inline">
            Showing <strong className="text-slate-800 font-bold">{paginatedColleges.length}</strong> of{' '}
            <strong className="text-slate-800 font-bold">{totalItems}</strong> entries
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium text-[11px]">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#2563EB] cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

      </div>

      {/* 2. Main Production Table Container */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_2px_6px_-1px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-200">
        
        {/* Desktop / Laptop Table View (Hidden on mobile < md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 sticky top-0 z-10 backdrop-blur-xs">
                {renderSortHeader('University / Institute', 'name')}
                {renderSortHeader('Code & Domain', 'code')}
                {renderSortHeader('Location', 'location')}
                {renderSortHeader('Student Pool', 'students')}
                {renderSortHeader('Active Drives', 'jobs')}
                <th scope="col" className="py-3.5 pr-6 pl-4 text-right font-extrabold uppercase tracking-wider text-[11px] text-slate-500 select-none">
                  Inspection
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {paginatedColleges.map((college) => {
                const isCopied = copiedCodeId === college.id;
                const hasDrives = (college._count?.jobs || 0) > 0;
                const studentsCount = college._count?.students || 0;

                return (
                  <tr
                    key={college.id}
                    onClick={() => onSelectCollege(college)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectCollege(college);
                      }
                    }}
                    className="group hover:bg-blue-50/50 focus:bg-blue-50/70 focus:outline-none transition-all duration-150 cursor-pointer"
                  >
                    {/* 1. University Crest & Name */}
                    <td className="py-3.5 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs group-hover:scale-105 group-hover:border-blue-300 transition-all">
                          {college.logoUrl ? (
                            <Image
                              src={college.logoUrl}
                              alt={college.name}
                              fill
                              sizes="40px"
                              className="object-contain p-1"
                            />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-[#2563EB]" />
                          )}
                        </div>
                        <div className="min-w-0 max-w-[280px] lg:max-w-[320px]">
                          <span className="font-extrabold text-xs sm:text-sm text-[#0A2540] group-hover:text-[#2563EB] transition-colors truncate block">
                            {college.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              Accredited
                            </span>
                            {college.domain && (
                              <span className="text-[10.5px] text-slate-400 font-mono truncate max-w-[120px]">
                                {college.domain}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Code & Quick Copy */}
                    <td className="py-3.5 px-4">
                      {college.code ? (
                        <div className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200/80 px-2 py-1 rounded-lg border border-slate-200/80 transition-colors">
                          <span className="font-mono font-bold text-xs text-slate-800 tracking-wide">
                            {college.code}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyCode(e, college.id, college.code!)}
                            className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer transition-colors"
                            title="Copy university code"
                          >
                            {isCopied ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">—</span>
                      )}
                    </td>

                    {/* 3. Location */}
                    <td className="py-3.5 px-4">
                      {(college.city || college.state) ? (
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate max-w-[160px]">
                            {[college.city, college.state].filter(Boolean).join(', ')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">All-India</span>
                      )}
                    </td>

                    {/* 4. Student Pool Strength */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{studentsCount}</span>
                        </div>
                        <span className="text-[10.5px] text-slate-400 font-medium">
                          Students
                        </span>
                      </div>
                    </td>

                    {/* 5. Active Drives Count */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 font-bold text-xs px-2.5 py-1 rounded-full border transition-all ${
                        hasDrives 
                          ? 'bg-blue-50 text-[#2563EB] border-blue-200' 
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {hasDrives && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                          </span>
                        )}
                        <Briefcase className="w-3 h-3 shrink-0" />
                        <span>{college._count?.jobs || 0} Drives</span>
                      </span>
                    </td>

                    {/* 6. Action: Inspect Dossier Button */}
                    <td className="py-3.5 pr-6 pl-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCollege(college);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white text-xs font-bold text-[#0A2540] shadow-2xs transition-all cursor-pointer group/btn"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-white" />
                          <span>Inspect</span>
                          <ChevronRight className="w-3 h-3 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Interactive Cards Layout (Visible on screens < md) */}
        <div className="md:hidden divide-y divide-slate-100">
          {paginatedColleges.map((college) => {
            const isCopied = copiedCodeId === college.id;
            const hasDrives = (college._count?.jobs || 0) > 0;
            const studentsCount = college._count?.students || 0;

            return (
              <div
                key={college.id}
                onClick={() => onSelectCollege(college)}
                className="p-4 active:bg-blue-50/50 transition-colors space-y-3 cursor-pointer"
              >
                {/* Header: Logo, Name, Verification & Drives Pill */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                      {college.logoUrl ? (
                        <Image
                          src={college.logoUrl}
                          alt={college.name}
                          fill
                          sizes="44px"
                          className="object-contain p-1"
                        />
                      ) : (
                        <GraduationCap className="w-5 h-5 text-[#2563EB]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#0A2540] leading-snug truncate">
                        {college.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {college.code && (
                          <div 
                            onClick={(e) => handleCopyCode(e, college.id, college.code!)}
                            className="inline-flex items-center gap-1 font-mono font-bold text-[10px] text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 active:bg-slate-200 cursor-pointer"
                          >
                            <span>{college.code}</span>
                            {isCopied ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5 text-slate-400" />}
                          </div>
                        )}
                        <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs shrink-0 border ${
                    hasDrives 
                      ? 'bg-blue-50 text-[#2563EB] border-blue-200' 
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {college._count?.jobs || 0} Drives
                  </span>
                </div>

                {/* Metadata row: Location & Student pool */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-600">
                  {(college.city || college.state) ? (
                    <span className="flex items-center gap-1 font-medium truncate max-w-[180px]">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{[college.city, college.state].filter(Boolean).join(', ')}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px] italic">National Campus</span>
                  )}

                  <span className="flex items-center gap-1 font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{studentsCount} Students</span>
                  </span>
                </div>

                {/* Inspect Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCollege(college);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-[#2563EB] text-[#0A2540] hover:text-white text-xs font-bold border border-slate-200 hover:border-[#2563EB] shadow-2xs transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Campus Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 3. Production Pagination & Page Jumping Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-1">
          <p className="text-xs text-slate-500 font-medium order-2 sm:order-1 text-center sm:text-left">
            Showing Page <strong className="text-slate-800 font-bold">{safePage}</strong> of{' '}
            <strong className="text-slate-800 font-bold">{totalPages}</strong> ({totalItems} total universities)
          </p>

          <div className="flex items-center gap-1.5 order-1 sm:order-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="h-8 px-2.5 text-xs font-bold rounded-xl border-slate-200 bg-white shadow-2xs disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-0.5" />
              Previous
            </Button>

            {/* Page number pill */}
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
              {safePage} / {totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="h-8 px-2.5 text-xs font-bold rounded-xl border-slate-200 bg-white shadow-2xs disabled:opacity-40 cursor-pointer"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
