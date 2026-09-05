'use client';

import React, { useState, useEffect } from 'react';
import { X, Edit3, Check, Loader2 } from 'lucide-react';
import { useStudentResumeStore } from '@/store/useStudentResumeStore';

const PRESETS = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'Core SDE (DSA)',
  'General Placement',
];

export function RenameResumeModal() {
  const { renameResumeItem, setRenameResumeItem, renameResume, isProcessingId } = useStudentResumeStore();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (renameResumeItem) {
      setTitle(renameResumeItem.title);
    }
  }, [renameResumeItem]);

  if (!renameResumeItem) return null;

  const isSaving = isProcessingId === renameResumeItem.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await renameResume(renameResumeItem.id, title);
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                Rename Resume Version
              </h2>
              <p className="text-xs text-slate-400">
                Update the role title for this resume
              </p>
            </div>
          </div>

          <button
            onClick={() => setRenameResumeItem(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Role Title Tag
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400">Suggestions:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTitle(preset)}
                  className="px-2.5 py-1 rounded-lg text-[10.5px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200 transition-all cursor-pointer text-slate-600"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setRenameResumeItem(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving || !title.trim()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Title</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
