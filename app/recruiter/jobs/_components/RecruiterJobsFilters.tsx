'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  LayoutGrid, 
  Table as TableIcon,
  Building2,
  Briefcase,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  Check,
  Tag,
  Calendar,
  Clock,
  History,
  Sparkles
} from 'lucide-react';
import { 
  useRecruiterJobsStore, 
  RecruiterJobItem, 
  RecruiterJobCollege 
} from '@/store/useRecruiterJobsStore';

export function RecruiterJobsFilters() {
  const { 
    jobs, 
    engagedColleges, 
    filters, 
    setFilter, 
    toggleSkillFilter,
    removeSkillFilter,
    clearSkillFilters,
    resetFilters,
  } = useRecruiterJobsStore();

  const [skillSearchInput, setSkillSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamically extract all unique skills from currently available jobs
  const dynamicExistingSkills = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((job) => {
      if (Array.isArray(job.skills)) {
        job.skills.forEach((s) => {
          if (s && s.trim()) set.add(s.trim());
        });
      }
    });
    return Array.from(set);
  }, [jobs]);

  // Suggested skills filtered by current input
  const matchingSuggestions = useMemo(() => {
    if (!skillSearchInput.trim()) return [];
    const q = skillSearchInput.toLowerCase().trim();
    return dynamicExistingSkills.filter(
      (s) => s.toLowerCase().includes(q) && !filters.selectedSkills.some((sel) => sel.toLowerCase() === s.toLowerCase())
    );
  }, [skillSearchInput, dynamicExistingSkills, filters.selectedSkills]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (!filters.selectedSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      toggleSkillFilter(trimmed);
    }
    setSkillSearchInput('');
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill(skillSearchInput);
    }
  };

  // Compute number of active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.collegeId !== 'ALL') count++;
    if (filters.selectedType !== 'ALL') count++;
    if (filters.selectedStatus !== 'ALL') count++;
    if (filters.selectedLocation !== 'ALL') count++;
    if (filters.selectedTimeline !== 'ALL') count++;
    if (filters.selectedSkills && filters.selectedSkills.length > 0) {
      count += filters.selectedSkills.length;
    }
    return count;
  }, [filters]);

  return (
    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs">
      
      {/* 1. Top Row: Global Search, College Select, Type, Status, Timeline, and View Switcher */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Global Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search drives by title, college, location, package, description..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/15 font-medium transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilter('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          
          {/* College Filter */}
          <div className="relative min-w-[140px] sm:min-w-[160px] flex-1 sm:flex-initial">
            <select
              value={filters.collegeId}
              onChange={(e) => setFilter('collegeId', e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-3 pr-8 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Universities</option>
              {engagedColleges.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} {col.code ? `(${col.code})` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Job Type Filter */}
          <div className="relative min-w-[110px] flex-1 sm:flex-initial">
            <select
              value={filters.selectedType}
              onChange={(e) => setFilter('selectedType', e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-3 pr-8 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Job Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="INTERN_PLUS_FTE">Intern + FTE</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[110px] flex-1 sm:flex-initial">
            <select
              value={filters.selectedStatus}
              onChange={(e) => setFilter('selectedStatus', e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-3 pr-8 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active (Live)</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="DRAFT">Draft</option>
              <option value="CLOSED">Closed</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Timeline Filter */}
          <div className="relative min-w-[130px] flex-1 sm:flex-initial">
            <select
              value={filters.selectedTimeline}
              onChange={(e) => setFilter('selectedTimeline', e.target.value as any)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-3 pr-8 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Deadlines</option>
              <option value="UPCOMING">Upcoming & Live</option>
              <option value="TODAY">Closing Today</option>
              <option value="PAST">Past / Expired Drives</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* View Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                filters.viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setFilter('viewMode', 'table')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                filters.viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Data Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Quick Timeline Filter Pills (Tactile 1-click Filter Tabs) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-0.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          Drive Timeline:
        </span>
        {[
          { id: 'ALL', label: 'All Drives', icon: Calendar },
          { id: 'UPCOMING', label: 'Upcoming & Live', icon: Sparkles, color: 'text-blue-600' },
          { id: 'TODAY', label: 'Closing Today', icon: Clock, color: 'text-amber-600' },
          { id: 'PAST', label: 'Past / Expired Drives', icon: History, color: 'text-rose-600' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = filters.selectedTimeline === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter('selectedTimeline', tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-[#2563EB] text-white border-blue-600 shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.color || 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Dynamic Search & Add Skills Section (AND Operator) */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          
          {/* Section Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-[#0A2540] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              Filter by Required Skills (AND Logic):
            </span>

            {filters.selectedSkills.length > 0 && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10.5px] font-black text-blue-800 border border-blue-300">
                {filters.selectedSkills.length} Required {filters.selectedSkills.length === 1 ? 'Skill' : 'Skills'}
              </span>
            )}
          </div>

          {/* Reset All Filters Button */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start sm:self-auto inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-200/80 hover:bg-red-100 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters ({activeFiltersCount})</span>
            </button>
          )}

        </div>

        {/* Dynamic Skill Search & Add Bar with Live Tag Chips */}
        <div 
          ref={dropdownRef}
          className="relative flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-slate-50/90 border border-slate-200 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600/15 transition-all"
        >
          <Tag className="w-4 h-4 text-slate-400 shrink-0 ml-1" />

          {/* Active Skill Pills Inside Search Bar */}
          {filters.selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-3 py-1 text-xs font-bold shadow-xs animate-in fade-in zoom-in-95 duration-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkillFilter(skill)}
                className="hover:bg-blue-700 p-0.5 rounded-md cursor-pointer transition-colors"
                title={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* Search/Add Input */}
          <div className="relative flex-1 min-w-[180px]">
            <input
              type="text"
              placeholder={
                filters.selectedSkills.length === 0
                  ? 'Type a skill to filter (e.g. React, Python, Docker) & press Enter...'
                  : 'Add another required skill (AND)...'
              }
              value={skillSearchInput}
              onChange={(e) => {
                setSkillSearchInput(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-[#0A2540] placeholder-slate-400 px-1 py-0.5"
            />

            {/* Auto-suggest dropdown when typing */}
            {isDropdownOpen && matchingSuggestions.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-64 max-h-48 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-30 [scrollbar-width:thin]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1">
                  Matching Campus Skills:
                </p>
                {matchingSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleAddSkill(suggestion)}
                    className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold text-[#0A2540] hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{suggestion}</span>
                    <Plus className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action: Add Button */}
          {skillSearchInput.trim() && (
            <button
              type="button"
              onClick={() => handleAddSkill(skillSearchInput)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 cursor-pointer transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          )}

          {/* Action: Clear All Skills */}
          {filters.selectedSkills.length > 0 && (
            <button
              type="button"
              onClick={clearSkillFilters}
              className="text-[11px] font-bold text-slate-400 hover:text-red-600 hover:underline cursor-pointer px-2 py-1 shrink-0 ml-auto"
            >
              Clear Skills
            </button>
          )}
        </div>

        {/* Helpful Info Note */}
        {filters.selectedSkills.length > 1 && (
          <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 pl-1">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Showing only placement drives that require <strong>all {filters.selectedSkills.length} selected skills</strong> together ({filters.selectedSkills.join(' + ')}).
          </p>
        )}

      </div>

    </div>
  );
}
