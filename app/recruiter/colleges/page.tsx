'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { CollegeItem, CollegesApiResponse } from './_types/recruiter-colleges.types';
import { RecruiterCollegesTable } from './_components/RecruiterCollegesTable';
import { RecruiterCollegesCards } from './_components/RecruiterCollegesCards';
import { RecruiterCollegeDossierModal } from './_components/RecruiterCollegeDossierModal';
import { 
  GraduationCap, 
  CheckCircle2, 
  Search, 
  Filter, 
  LayoutGrid, 
  Table as TableIcon, 
  RefreshCw, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function RecruiterCollegesPage() {
  const [colleges, setColleges] = useState<CollegeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & View State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Selected College for Detailed Inspection Modal
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [selectedCollegeObj, setSelectedCollegeObj] = useState<CollegeItem | null>(null);

  // Fetch verified colleges from the API
  const fetchColleges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<ApiResponse<CollegesApiResponse>>(
        '/api/colleges?isVerified=true&limit=50'
      );
      if (response.data.success && response.data.data) {
        setColleges(response.data.data.colleges || []);
      } else {
        setError(response.data.message || 'Failed to fetch verified universities');
      }
    } catch (err: any) {
      setError(err.message || 'Unable to connect to verified college registry');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Unique list of states for filter dropdown
  const statesList = useMemo(() => {
    return Array.from(new Set(colleges.map((c) => c.state).filter(Boolean))) as string[];
  }, [colleges]);

  // Filtered colleges list
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      // 1. State filter
      if (selectedState !== 'ALL' && college.state !== selectedState) {
        return false;
      }

      // 2. Search query filter
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase().trim();

      const matchName = college.name.toLowerCase().includes(q);
      const matchCode = Boolean(college.code && college.code.toLowerCase().includes(q));
      const matchDomain = Boolean(college.domain && college.domain.toLowerCase().includes(q));
      const matchCity = Boolean(college.city && college.city.toLowerCase().includes(q));
      const matchState = Boolean(college.state && college.state.toLowerCase().includes(q));

      return matchName || matchCode || matchDomain || matchCity || matchState;
    });
  }, [colleges, selectedState, searchQuery]);

  const handleSelectCollege = (college: CollegeItem) => {
    setSelectedCollegeId(college.id);
    setSelectedCollegeObj(college);
  };

  const handleCloseModal = () => {
    setSelectedCollegeId(null);
    setSelectedCollegeObj(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 xl:space-y-8 transition-all duration-300 ease-in-out">
      
      {/* 1. Page Header matching Super Admin format */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs shrink-0">
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
                Verified University Directory
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-3xl">
              Institutions accredited by the Super Admin with active departmental placement cells, candidate rosters, and scheduling capacity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-extrabold text-emerald-800 border border-emerald-200 shadow-2xs">
            {colleges.length} Verified {colleges.length === 1 ? 'Campus' : 'Campuses'}
          </span>

          <button
            onClick={fetchColleges}
            disabled={isLoading}
            title="Refresh verified colleges"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-[#2563EB] disabled:opacity-50 cursor-pointer shadow-2xs transition-all"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-[#2563EB]' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Interactive Search, State Filter & View Mode Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Left: Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by university name, code, domain, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 sm:py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 font-medium transition-all"
          />
        </div>

        {/* Right: State Filter + View Mode Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* State Filter Dropdown */}
          {statesList.length > 0 && (
            <div className="flex items-center gap-1.5">
              <Filter className="h-4 w-4 text-slate-400 shrink-0 hidden md:block" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50/80 py-2 sm:py-2.5 px-3 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-[#2563EB] focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="ALL">All States ({colleges.length})</option>
                {statesList.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          )}

          {/* View Mode Switcher (Table vs Grid) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#2563EB] shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Tabular View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-[#2563EB] shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Main Data Presentation */}
      {isLoading && colleges.length === 0 ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-16 rounded-2xl bg-slate-200" />
          <div className="h-16 rounded-2xl bg-slate-200" />
          <div className="h-16 rounded-2xl bg-slate-200" />
        </div>
      ) : error && colleges.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border border-red-200 bg-red-50 text-red-700 space-y-3">
          <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
          <h3 className="text-base font-bold">Unable to load verified university registry</h3>
          <p className="text-xs text-red-600 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchColleges}
            className="btn-primary py-2 px-5 text-xs inline-flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <RecruiterCollegesTable
          colleges={filteredColleges}
          onSelectCollege={handleSelectCollege}
          onResetFilters={() => { setSearchQuery(''); setSelectedState('ALL'); }}
        />
      ) : (
        <RecruiterCollegesCards
          colleges={filteredColleges}
          onSelectCollege={handleSelectCollege}
          onResetFilters={() => { setSearchQuery(''); setSelectedState('ALL'); }}
        />
      )}

      {/* 4. College Inspection Dossier Modal */}
      <RecruiterCollegeDossierModal
        collegeId={selectedCollegeId}
        initialCollege={selectedCollegeObj}
        onClose={handleCloseModal}
      />

    </div>
  );
}
