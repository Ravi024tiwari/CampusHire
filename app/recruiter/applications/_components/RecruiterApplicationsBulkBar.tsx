'use client';

import React, { useState } from 'react';
import { 
  CheckSquare, 
  X, 
  Bookmark, 
  Calendar, 
  Award, 
  XCircle, 
  Sparkles,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useRecruiterApplicationsStore } from '@/store/useRecruiterApplicationsStore';

interface RecruiterApplicationsBulkBarProps {
  onSuccessToast: (msg: string) => void;
}

export function RecruiterApplicationsBulkBar({ onSuccessToast }: RecruiterApplicationsBulkBarProps) {
  const { 
    selectedApplicationIds, 
    clearSelection, 
    bulkUpdateStatus, 
    isActionLoading 
  } = useRecruiterApplicationsStore();

  const [activeAction, setActiveAction] = useState<string | null>(null);

  if (selectedApplicationIds.length === 0) return null;

  const handleBulkAction = async (status: string, label: string) => {
    setActiveAction(status);
    const res = await bulkUpdateStatus(selectedApplicationIds, status);
    setActiveAction(null);
    if (res.success) {
      onSuccessToast(res.message || `Moved ${selectedApplicationIds.length} candidates to ${label}`);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-[#0A2540] text-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-700/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Selection Count Info */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30 font-black text-xs">
            {selectedApplicationIds.length}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-black">
              {selectedApplicationIds.length} {selectedApplicationIds.length === 1 ? 'Candidate' : 'Candidates'} Selected
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              Perform batch operations across your talent pipeline
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          
          {/* Shortlist */}
          <button
            type="button"
            disabled={isActionLoading}
            onClick={() => handleBulkAction('SHORTLISTED', 'Shortlisted')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white text-xs font-black transition-all cursor-pointer disabled:opacity-50"
          >
            {activeAction === 'SHORTLISTED' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
            <span>Shortlist</span>
          </button>

          {/* Schedule Interview */}
          <button
            type="button"
            disabled={isActionLoading}
            onClick={() => handleBulkAction('INTERVIEW_SCHEDULED', 'Interview Scheduled')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-black transition-all cursor-pointer disabled:opacity-50"
          >
            {activeAction === 'INTERVIEW_SCHEDULED' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Calendar className="w-3.5 h-3.5" />
            )}
            <span>Interview</span>
          </button>

          {/* Make Offer */}
          <button
            type="button"
            disabled={isActionLoading}
            onClick={() => handleBulkAction('OFFERED', 'Offered')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer disabled:opacity-50"
          >
            {activeAction === 'OFFERED' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Award className="w-3.5 h-3.5" />
            )}
            <span>Make Offer</span>
          </button>

          {/* Reject */}
          <button
            type="button"
            disabled={isActionLoading}
            onClick={() => handleBulkAction('REJECTED', 'Rejected')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-black transition-all cursor-pointer disabled:opacity-50"
          >
            {activeAction === 'REJECTED' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <XCircle className="w-3.5 h-3.5" />
            )}
            <span>Reject</span>
          </button>

          {/* Deselect All */}
          <button
            type="button"
            onClick={clearSelection}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            title="Deselect all"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
