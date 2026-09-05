'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  LayoutGrid, 
  List,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  Sparkles,
  MapPin,
  Briefcase,
  Check,
  Flame,
  Clock,
  Laptop,
  Coins
} from 'lucide-react';
import { useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';

const POPULAR_LOCATIONS = [
  'All Locations',
  'Bangalore, Karnataka',
  'Hyderabad, Telangana',
  'Pune, Maharashtra',
  'Noida, Uttar Pradesh',
  'Gurugram, Haryana',
  'Mumbai, Maharashtra',
  'Chennai, Tamil Nadu',
  'Remote'
];

const AVAILABLE_SKILLS = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'Java',
  'System Design',
  'Data Structures',
  'SQL',
  'AWS',
  'Next.js',
  'Machine Learning',
  'Analytics',
  'Docker',
  'DevOps',
  'Tailwind CSS'
];

export function RecruiterJobsFilters() {
  const { 
    filters, 
    setFilter, 
    toggleSkillFilter,
    removeSkillFilter,
    clearSkillFilters,
    resetFilters 
  } = useRecruiterJobsStore();

  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [tempTitle, setTempTitle] = useState('');
  const [skillDropdownOpen, setSkillDropdownOpen] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close skill dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (skillRef.current && !skillRef.current.contains(e.target as Node)) {
        setSkillDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyFilters = () => {
    if (tempTitle.trim()) {
      setFilter('searchQuery', tempTitle.trim());
    }
  };

  const handleClearAll = () => {
    setTempTitle('');
    resetFilters();
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.selectedStatus !== 'ALL') count++;
    if (filters.selectedType !== 'ALL') count++;
    if (filters.selectedLocation !== 'ALL') count++;
    if (filters.selectedTimeline !== 'ALL') count++;
    if (filters.selectedSkills.length > 0) count += filters.selectedSkills.length;
    return count;
  }, [filters]);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4 transition-all duration-300">
      
      {/* 1. Main Search & Top Controls Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search by job title, skills, or location */}
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by job title, skills, or location..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-16 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15 font-medium transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {filters.searchQuery ? (
              <button
                onClick={() => setFilter('searchQuery', '')}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-slate-200/60 rounded border border-slate-300/60">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Right Action Tools: Filters toggle, Reset, Sort by, View Mode */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 self-end md:self-auto">
          
          {/* Filters Accordion Toggle */}
          <button
            type="button"
            onClick={() => setIsFiltersOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isFiltersOpen 
                ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-2xs' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px] font-black">
                {activeFiltersCount}
              </span>
            )}
            {isFiltersOpen ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={handleClearAll}
            title="Reset all filters"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="relative min-w-[140px] sm:min-w-[155px]">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold pointer-events-none hidden sm:inline">
              Sort by
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilter('sortBy', e.target.value as any)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 sm:pl-16 pr-8 text-xs sm:text-sm font-bold text-[#0A2540] focus:border-blue-600 focus:outline-none cursor-pointer shadow-2xs"
            >
              <option value="latest">Newest First</option>
              <option value="deadline">Deadline</option>
              <option value="applications">Applications</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle: Grid vs List */}
          <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                filters.viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-2xs font-bold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'table')}
              title="List View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                filters.viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-2xs font-bold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* 2. Quick Filter Presets Row */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 shrink-0">Quick presets:</span>

        <button
          type="button"
          onClick={() => {
            setFilter('selectedTimeline', filters.selectedTimeline === 'TODAY' ? 'ALL' : 'TODAY');
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shrink-0 ${
            filters.selectedTimeline === 'TODAY'
              ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-3 h-3 text-amber-600" />
          <span>⚡ Closing Soon</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setFilter('sortBy', filters.sortBy === 'applications' ? 'latest' : 'applications');
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shrink-0 ${
            filters.sortBy === 'applications'
              ? 'bg-purple-600 text-white border-purple-700 shadow-2xs'
              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-3 h-3 text-purple-600" />
          <span>🔥 High Volume</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setFilter('selectedLocation', filters.selectedLocation === 'Remote' ? 'ALL' : 'Remote');
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shrink-0 ${
            filters.selectedLocation === 'Remote'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
          }`}
        >
          <Laptop className="w-3 h-3 text-emerald-600" />
          <span>🎯 Remote Roles</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setFilter('selectedType', filters.selectedType === 'INTERNSHIP' ? 'ALL' : 'INTERNSHIP');
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all cursor-pointer shrink-0 ${
            filters.selectedType === 'INTERNSHIP'
              ? 'bg-blue-600 text-white border-blue-700 shadow-2xs'
              : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-3 h-3 text-blue-600" />
          <span>🎓 Internships</span>
        </button>
      </div>

      {/* 3. Expandable Multi-Filter Accordion */}
      {isFiltersOpen && (
        <div className="pt-3 border-t border-slate-100 space-y-4 animate-in fade-in-50 duration-200">
          
          {/* First Row of Multi-Filters: Status, Type, Location, Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Job Status */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Job Status
              </label>
              <div className="relative">
                <select
                  value={filters.selectedStatus}
                  onChange={(e) => setFilter('selectedStatus', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs sm:text-sm font-bold text-[#0A2540] focus:border-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">Live (Active)</option>
                  <option value="DRAFT">Drafts</option>
                  <option value="CLOSED">Closed</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Job Type
              </label>
              <div className="relative">
                <select
                  value={filters.selectedType}
                  onChange={(e) => setFilter('selectedType', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs sm:text-sm font-bold text-[#0A2540] focus:border-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Types</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="INTERN_PLUS_FTE">Intern + FTE</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Location
              </label>
              <div className="relative">
                <select
                  value={filters.selectedLocation}
                  onChange={(e) => setFilter('selectedLocation', e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs sm:text-sm font-bold text-[#0A2540] focus:border-blue-600 focus:outline-none cursor-pointer"
                >
                  {POPULAR_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc === 'All Locations' ? 'ALL' : loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Application Deadline
              </label>
              <div className="relative">
                <select
                  value={filters.selectedTimeline}
                  onChange={(e) => setFilter('selectedTimeline', e.target.value as any)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-8 text-xs sm:text-sm font-bold text-[#0A2540] focus:border-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">Select date range (All)</option>
                  <option value="UPCOMING">Upcoming & Live</option>
                  <option value="TODAY">Closing Today</option>
                  <option value="PAST">Expired / Past</option>
                </select>
                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Second Row: Search by Title, Skills, and Apply / Clear Buttons */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-3 pt-1">
            
            {/* Search by Title */}
            <div className="flex-1">
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Search by Title
              </label>
              <input
                type="text"
                placeholder="e.g. Software Engineer"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyFilters();
                }}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:outline-none font-semibold"
              />
            </div>

            {/* Skills Multi-Select */}
            <div className="flex-1 relative" ref={skillRef}>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Skills
              </label>
              <button
                type="button"
                onClick={() => setSkillDropdownOpen((prev) => !prev)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs sm:text-sm font-bold text-[#0A2540] hover:bg-slate-50 transition-all text-left shadow-2xs"
              >
                <span className="truncate">
                  {filters.selectedSkills.length === 0
                    ? 'Select skills'
                    : `${filters.selectedSkills.length} skills selected (${filters.selectedSkills.slice(0, 2).join(', ')}${filters.selectedSkills.length > 2 ? '...' : ''})`}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
              </button>

              {/* Skills Dropdown Content */}
              {skillDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-full max-h-60 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-30 overflow-y-auto space-y-2 animate-in fade-in-50 duration-150">
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_SKILLS.map((skill) => {
                      const isSelected = filters.selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkillFilter(skill)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: Clear Filters & Apply Filters */}
            <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0">
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>

              <button
                type="button"
                onClick={handleApplyFilters}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                Apply Filters
              </button>
            </div>

          </div>

          {/* Selected Skills Chips */}
          {filters.selectedSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-black text-slate-400 mr-1">Active skills:</span>
              {filters.selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black px-2.5 py-0.5 rounded-lg shadow-2xs"
                >
                  {skill}
                  <button
                    onClick={() => removeSkillFilter(skill)}
                    className="hover:text-blue-900 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearSkillFilters}
                className="text-[11px] font-bold text-slate-400 hover:text-red-500 underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
