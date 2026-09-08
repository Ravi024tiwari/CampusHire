'use client';

import React from 'react';
import { Save, RotateCcw, Loader2, Sparkles, Check, AlertCircle } from 'lucide-react';

interface CollegeStickySaveBarProps {
  isDirty: boolean;
  isSaving: boolean;
  modifiedCount: number;
  onSave: () => void;
  onReset: () => void;
}

export function CollegeStickySaveBar({
  isDirty,
  isSaving,
  modifiedCount,
  onSave,
  onReset,
}: CollegeStickySaveBarProps) {
  if (!isDirty) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-3.5 right-3.5 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#0A2540] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-slate-700/80 backdrop-blur-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-white truncate">
              {modifiedCount} {modifiedCount === 1 ? 'Field' : 'Fields'} Modified
            </p>
            <p className="text-[10.5px] text-slate-300 truncate">
              Unsaved changes pending
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReset}
            disabled={isSaving}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5 sm:hidden" />
            <span className="hidden sm:inline">Discard</span>
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
