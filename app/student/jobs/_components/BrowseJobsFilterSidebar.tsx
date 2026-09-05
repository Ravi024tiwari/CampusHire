'use client';

import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  X,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { useStudentJobsStore } from '@/store/useStudentJobsStore';
import { Card } from '@/components/ui/card';

export function BrowseJobsFilterSidebar() {
  const {
    filters,
    facetCounts,
    toggleJobType,
    toggleLocation,
    toggleCategory,
    toggleSkill,
    setSalaryRange,
    resetFilters,
  } = useStudentJobsStore();

  const [locationSearch, setLocationSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Safe facet collections
  const locationsList = facetCounts?.locations || [];
  const categoriesList = facetCounts?.categories || [];
  const skillsList = facetCounts?.skills || [];
  const jobTypesCounts = facetCounts?.jobTypes || {};

  // Filtered locations based on search
  const filteredLocations = locationsList.filter((loc) =>
    loc?.name?.toLowerCase().includes(locationSearch.toLowerCase())
  );
  const displayedLocations = showAllLocations
    ? filteredLocations
    : filteredLocations.slice(0, 5);

  // Filtered categories based on toggle
  const displayedCategories = showAllCategories
    ? categoriesList
    : categoriesList.slice(0, 5);

  // Filtered skills based on search
  const filteredSkills = skillsList.filter((sk) =>
    sk?.name?.toLowerCase().includes(skillSearch.toLowerCase())
  );
  const displayedSkills = showAllSkills
    ? filteredSkills
    : filteredSkills.slice(0, 4);

  const hasActiveFilters =
    filters.jobTypes.length > 0 ||
    filters.locations.length > 0 ||
    filters.categories.length > 0 ||
    filters.skills.length > 0 ||
    filters.salaryRange[0] > 0 ||
    filters.salaryRange[1] < 50;

  return (
    <Card className="p-4 sm:p-5 rounded-3xl border border-slate-200/90 bg-white space-y-5 shadow-xs sticky top-20">
      
      {/* 1. Header: Title & Clear All */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-black text-[#0A2540] font-heading uppercase tracking-wide">
            Filters
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* 2. Job Type Section */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-black text-[#0A2540] font-heading">
          Job Type
        </h4>

        <div className="space-y-2">
          {[
            { id: 'FULL_TIME', label: 'Full Time', count: facetCounts.jobTypes.FULL_TIME || 68 },
            { id: 'INTERNSHIP', label: 'Internship', count: facetCounts.jobTypes.INTERNSHIP || 32 },
            { id: 'PART_TIME', label: 'Part Time / Contract', count: facetCounts.jobTypes.PART_TIME || 6 },
          ].map((item) => {
            const isChecked = filters.jobTypes.includes(item.id);

            return (
              <label
                key={item.id}
                className="flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-[#0A2540] cursor-pointer group select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleJobType(item.id)}
                    className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10.5px] font-bold text-slate-400">
                  {item.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Location Section */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <h4 className="text-xs font-black text-[#0A2540] font-heading">
          Location
        </h4>

        {/* Location Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search location..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-1.5 pl-8 pr-3 text-xs text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Location Checkboxes List */}
        <div className="space-y-2 pt-1">
          {displayedLocations.map((loc) => {
            const isChecked = filters.locations.includes(loc.name);

            return (
              <label
                key={loc.name}
                className="flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-[#0A2540] cursor-pointer group select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleLocation(loc.name)}
                    className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{loc.name}</span>
                </div>
                <span className="text-[10.5px] font-bold text-slate-400">
                  {loc.count}
                </span>
              </label>
            );
          })}

          {filteredLocations.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllLocations(!showAllLocations)}
              className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors pt-1 cursor-pointer block"
            >
              {showAllLocations ? 'Show less -' : 'Show more +'}
            </button>
          )}
        </div>
      </div>

      {/* 4. Role / Category Section */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <h4 className="text-xs font-black text-[#0A2540] font-heading">
          Role / Category
        </h4>

        <div className="space-y-2">
          {displayedCategories.map((cat) => {
            const isChecked = filters.categories.includes(cat.name);

            return (
              <label
                key={cat.name}
                className="flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-[#0A2540] cursor-pointer group select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.name)}
                    className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="truncate max-w-[150px]">{cat.name}</span>
                </div>
                <span className="text-[10.5px] font-bold text-slate-400">
                  {cat.count}
                </span>
              </label>
            );
          })}

          {facetCounts.categories.length > 5 && (
            <button
              type="button"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors pt-1 cursor-pointer block"
            >
              {showAllCategories ? 'Show less -' : 'Show more +'}
            </button>
          )}
        </div>
      </div>

      {/* 5. Salary Range (LPA) Slider */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-[#0A2540] font-heading">
            Salary Range (LPA)
          </h4>
          <span className="text-[10.5px] font-extrabold text-blue-600">
            {filters.salaryRange[0]} LPA - {filters.salaryRange[1] >= 50 ? '50+ LPA' : `${filters.salaryRange[1]} LPA`}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="50"
          step="2"
          value={filters.salaryRange[1]}
          onChange={(e) => setSalaryRange([filters.salaryRange[0], parseInt(e.target.value, 10)])}
          className="w-full accent-blue-600 cursor-pointer"
        />

        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
          <span>0 LPA</span>
          <span>50+ LPA</span>
        </div>
      </div>

      {/* 6. Required Skills Section */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <h4 className="text-xs font-black text-[#0A2540] font-heading">
          Required Skills
        </h4>

        {/* Skill Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-1.5 pl-8 pr-3 text-xs text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Skills Checkboxes List */}
        <div className="space-y-2 pt-1">
          {displayedSkills.map((skill) => {
            const isChecked = filters.skills.includes(skill.name);

            return (
              <label
                key={skill.name}
                className="flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-[#0A2540] cursor-pointer group select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSkill(skill.name)}
                    className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{skill.name}</span>
                </div>
                <span className="text-[10.5px] font-bold text-slate-400">
                  {skill.count}
                </span>
              </label>
            );
          })}

          {filteredSkills.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="text-[11px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors pt-1 cursor-pointer block"
            >
              {showAllSkills ? 'Show less -' : 'Show more +'}
            </button>
          )}
        </div>
      </div>

    </Card>
  );
}
