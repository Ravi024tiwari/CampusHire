'use client';

import React from 'react';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  Award, 
  GraduationCap, 
  X,
  Target
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ResourceHeroHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalResources: number;
}

export function ResourceHeroHeader({
  searchQuery,
  onSearchChange,
  totalResources,
}: ResourceHeroHeaderProps) {
  return (
    <div className="space-y-4">
      
      {/* Top Banner Row */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10.5px] font-extrabold border border-blue-200/70 uppercase tracking-wider">
              <BookOpen className="w-3 h-3 text-blue-600" /> Placement Prep Hub
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              • {totalResources} Curated Guides
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] font-heading tracking-tight">
            Student Resource Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-xl leading-relaxed">
            Company interview blueprints, core CS cheat sheets, quantitative aptitude formulas, and ATS-ready resume templates to ace your campus placement drives.
          </p>
        </div>

        {/* Motivational Placement Target Card */}
        <Card className="hidden sm:flex items-center gap-3.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-amber-50/70 border-blue-200/70 py-3 px-4.5 shadow-2xs shrink-0">
          <div className="text-right">
            <p className="text-xs font-black text-[#0A2540] leading-tight font-heading">
              &ldquo;Preparation meets Opportunity.&rdquo;
            </p>
            <p className="text-[10px] font-bold text-slate-500 mt-0.5">
              🇮🇳 On-Campus Placement Success
            </p>
          </div>

          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25 ring-2 ring-blue-400/30">
            <Target className="w-5 h-5 animate-pulse" />
          </div>
        </Card>
      </div>

      {/* Global Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by company (Google, TCS), subject (DBMS, OS, SQL), or topic..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-2xl border border-slate-200/90 bg-white py-3 pl-10 pr-10 text-xs sm:text-sm text-[#0A2540] placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 font-medium transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
