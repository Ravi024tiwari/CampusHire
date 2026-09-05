'use client';

import React, { useState } from 'react';
import { X, RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { useStudentJobsStore } from '@/store/useStudentJobsStore';

export function BrowseJobsMobileFilterDrawer() {
  const {
    isMobileFilterOpen,
    setMobileFilterOpen,
    filters,
    facetCounts,
    toggleJobType,
    toggleLocation,
    toggleCategory,
    toggleSkill,
    setSalaryRange,
    resetFilters,
  } = useStudentJobsStore();

  if (!isMobileFilterOpen) return null;

  return (
    <div className="fixed inset-0 z-60 lg:hidden flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0"
        onClick={() => setMobileFilterOpen(false)}
      />

      {/* Drawer Content */}
      <div 
        className="relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-black text-[#0A2540] font-heading">
              Filter Jobs
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Options */}
        <div className="flex-1 p-4 space-y-5 overflow-y-auto [scrollbar-width:thin]">
          
          {/* Job Types */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-[#0A2540]">Job Type</h4>
            <div className="space-y-1.5">
              {[
                { id: 'FULL_TIME', label: 'Full Time', count: 68 },
                { id: 'INTERNSHIP', label: 'Internship', count: 32 },
                { id: 'PART_TIME', label: 'Part Time', count: 6 },
              ].map((item) => {
                const isChecked = filters.jobTypes.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className="flex items-center justify-between text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleJobType(item.id)}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-black text-[#0A2540]">Locations</h4>
            <div className="space-y-1.5">
              {(facetCounts?.locations || []).slice(0, 6).map((loc) => {
                const isChecked = filters.locations.includes(loc.name);

                return (
                  <label
                    key={loc.name}
                    className="flex items-center justify-between text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleLocation(loc.name)}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      <span>{loc.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">({loc.count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-black text-[#0A2540]">Required Skills</h4>
            <div className="space-y-1.5">
              {(facetCounts?.skills || []).slice(0, 6).map((skill) => {
                const isChecked = filters.skills.includes(skill.name);

                return (
                  <label
                    key={skill.name}
                    className="flex items-center justify-between text-xs font-semibold text-slate-600 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSkill(skill.name)}
                        className="w-4 h-4 rounded text-blue-600"
                      />
                      <span>{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">({skill.count})</span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50">
          <button
            type="button"
            onClick={resetFilters}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[#0A2540] text-xs font-bold transition-colors cursor-pointer"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(false)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-blue-500/25"
          >
            Apply Filters
          </button>
        </div>

      </div>

    </div>
  );
}
