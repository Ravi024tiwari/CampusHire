'use client';

import React from 'react';
import { 
  Sparkles, 
  Building2, 
  Cpu, 
  Calculator, 
  Users2, 
  FileText,
  Bookmark
} from 'lucide-react';
import { ResourceCategory } from '../_data/resourcesData';

interface ResourceCategoryFilterProps {
  activeCategory: ResourceCategory;
  onSelectCategory: (cat: ResourceCategory) => void;
  categoryCounts: Record<ResourceCategory, number>;
  showSavedOnly: boolean;
  onToggleSavedOnly: () => void;
  savedCount: number;
}

export function ResourceCategoryFilter({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  showSavedOnly,
  onToggleSavedOnly,
  savedCount,
}: ResourceCategoryFilterProps) {
  const categories: Array<{ id: ResourceCategory; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'ALL', label: 'All Resources', icon: Sparkles },
    { id: 'COMPANY_KITS', label: 'Company Kits', icon: Building2 },
    { id: 'CORE_CS', label: 'Core CS Sheets', icon: Cpu },
    { id: 'APTITUDE', label: 'Aptitude & Quant', icon: Calculator },
    { id: 'HR_BEHAVIORAL', label: 'HR & Behavioral', icon: Users2 },
    { id: 'RESUME_TEMPLATES', label: 'ATS Templates', icon: FileText },
  ];

  return (
    <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Category Pills List */}
      <div className="flex items-center gap-2 flex-nowrap">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = !showSavedOnly && activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                if (showSavedOnly) onToggleSavedOnly();
                onSelectCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs active:scale-95 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20'
                  : 'bg-white border border-slate-200/90 text-slate-600 hover:text-[#0A2540] hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookmarks Toggle Pill */}
      <button
        type="button"
        onClick={onToggleSavedOnly}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs active:scale-95 ${
          showSavedOnly
            ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-500/20'
            : 'bg-white border border-slate-200/90 text-slate-600 hover:text-amber-700 hover:bg-amber-50/50'
        }`}
      >
        <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'text-white fill-white' : 'text-amber-500'}`} />
        <span>Saved Guides</span>
        <span
          className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
            showSavedOnly ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
          }`}
        >
          {savedCount}
        </span>
      </button>

    </div>
  );
}
