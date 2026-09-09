'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  Share2, 
  Check, 
  Sparkles,
  BarChart,
  Eye,
  FileCheck2
} from 'lucide-react';
import { ResourceItem } from '../_data/resourcesData';
import { Card } from '@/components/ui/card';

interface ResourceCardProps {
  resource: ResourceItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenReader: (resource: ResourceItem) => void;
}

export function ResourceCard({
  resource,
  isSaved,
  onToggleSave,
  onOpenReader,
}: ResourceCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/student/resources#${resource.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getDifficultyColor = (diff: ResourceItem['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <Card className="flex flex-col justify-between p-5 rounded-3xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
      
      {/* Top Row: Category Badge + Save / Share Actions */}
      <div>
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-black uppercase tracking-wider border ${resource.badgeColor}`}>
              {resource.categoryLabel}
            </span>
            {resource.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-amber-500" /> Must-Read
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Copy share link"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(resource.id);
              }}
              className="p-1.5 rounded-xl hover:bg-amber-50 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
              title={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title and Summary */}
        <div className="mt-3.5 space-y-1.5">
          <h3 
            onClick={() => onOpenReader(resource)}
            className="text-base sm:text-lg font-black text-[#0A2540] font-heading leading-snug group-hover:text-blue-600 transition-colors cursor-pointer"
          >
            {resource.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">
            {resource.summary}
          </p>
        </div>

        {/* Tag Badges */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-slate-600 text-[10.5px] font-semibold"
            >
              #{tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
              +{resource.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Row: Metadata + Open Reader CTA */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{resource.readTime}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className={`px-1.5 py-0.2 rounded border text-[10px] font-bold ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onOpenReader(resource)}
          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all duration-200 cursor-pointer shadow-2xs group-hover:bg-blue-600 group-hover:text-white"
        >
          <span>Read Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </Card>
  );
}
