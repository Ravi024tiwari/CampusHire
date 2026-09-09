'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  RESOURCES_DATA, 
  ResourceItem, 
  ResourceCategory 
} from './_data/resourcesData';
import { ResourceHeroHeader } from './_components/ResourceHeroHeader';
import { CompanyKitsSpotlight } from './_components/CompanyKitsSpotlight';
import { ResourceCategoryFilter } from './_components/ResourceCategoryFilter';
import { ResourceCard } from './_components/ResourceCard';
import { ResourceReaderModal } from './_components/ResourceReaderModal';
import { 
  BookOpen, 
  RotateCcw, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Award
} from 'lucide-react';

export default function StudentResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('ALL');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [activeResource, setActiveResource] = useState<ResourceItem | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('campushire_saved_resources');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync saved bookmarks with localStorage
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('campushire_saved_resources', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Open specific resource modal on URL hash change or direct link
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const found = RESOURCES_DATA.find((r) => r.id === hashId);
      if (found) {
        setActiveResource(found);
        setIsReaderOpen(true);
      }
    }
  }, []);

  const handleOpenReader = (resource: ResourceItem) => {
    setActiveResource(resource);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
    setActiveResource(null);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ResourceCategory, number> = {
      ALL: RESOURCES_DATA.length,
      COMPANY_KITS: 0,
      CORE_CS: 0,
      APTITUDE: 0,
      HR_BEHAVIORAL: 0,
      RESUME_TEMPLATES: 0,
    };

    RESOURCES_DATA.forEach((r) => {
      if (counts[r.category] !== undefined) {
        counts[r.category]++;
      }
    });

    return counts;
  }, []);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return RESOURCES_DATA.filter((item) => {
      // 1. Saved only filter
      if (showSavedOnly && !savedIds.includes(item.id)) {
        return false;
      }

      // 2. Category filter
      if (!showSavedOnly && activeCategory !== 'ALL' && item.category !== activeCategory) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inSummary = item.summary.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const inCat = item.categoryLabel.toLowerCase().includes(q);
        return inTitle || inSummary || inTags || inCat;
      }

      return true;
    });
  }, [activeCategory, searchQuery, showSavedOnly, savedIds]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('ALL');
    setShowSavedOnly(false);
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-7 sm:space-y-8 animate-in fade-in duration-300">
        
        {/* 1. Hero Header with Search Bar */}
        <ResourceHeroHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResources={RESOURCES_DATA.length}
        />

        {/* 2. Top Recruiters Placement Blueprints Spotlight (Visible when no search is active) */}
        {!searchQuery && !showSavedOnly && activeCategory === 'ALL' && (
          <CompanyKitsSpotlight onOpenReader={handleOpenReader} />
        )}

        {/* 3. Category Filter Tabs & Saved Toggle */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h2 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
                {showSavedOnly ? 'Your Saved Guides' : 'Browse Resource Categories'}
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Showing {filteredResources.length} guides
            </span>
          </div>

          <ResourceCategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            categoryCounts={categoryCounts}
            showSavedOnly={showSavedOnly}
            onToggleSavedOnly={() => setShowSavedOnly(!showSavedOnly)}
            savedCount={savedIds.length}
          />
        </div>

        {/* 4. Main Resource Grid */}
        {filteredResources.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-slate-300 bg-white space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-2xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-[#0A2540]">
                {showSavedOnly
                  ? 'No saved guides yet'
                  : 'No resources match your search'}
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {showSavedOnly
                  ? 'Click the bookmark icon on any guide card to save it for quick revision before your interviews.'
                  : 'Try searching for different keywords like SQL, Google, TCS, or Deadlocks.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isSaved={savedIds.includes(resource.id)}
                onToggleSave={handleToggleSave}
                onOpenReader={handleOpenReader}
              />
            ))}
          </div>
        )}

        {/* 5. Placement Preparation Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-amber-50/40 border border-blue-100/90 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600 text-white shrink-0 shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Recruiter-Aligned Rubrics
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Structured specifically around real placement round expectations and technical rounds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Verified ATS Compatibility
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Templates and bullet-point formulas proven to pass corporate ATS keyword scanners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-600 text-white shrink-0 shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Sub-5 Min Revision Notes
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Bite-sized high-yield cheat sheets for rapid revision on the morning of your drive.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 6. Distraction-Free Interactive Guide Reader Modal */}
      <ResourceReaderModal
        resource={activeResource}
        isOpen={isReaderOpen}
        onClose={handleCloseReader}
        isSaved={activeResource ? savedIds.includes(activeResource.id) : false}
        onToggleSave={handleToggleSave}
      />

    </div>
  );
}
