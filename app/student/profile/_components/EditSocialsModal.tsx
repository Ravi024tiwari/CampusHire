'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Globe, 
  Check, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function EditSocialsModal() {
  const { 
    profile, 
    isEditSocialsOpen, 
    setEditSocialsOpen, 
    updateProfile, 
    isUpdating 
  } = useStudentProfileStore();

  const [links, setLinks] = useState({
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setLinks({
        linkedinUrl: profile.linkedinUrl || '',
        githubUrl: profile.githubUrl || '',
        portfolioUrl: profile.portfolioUrl || '',
      });
    }
  }, [profile, isEditSocialsOpen]);

  if (!isEditSocialsOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const success = await updateProfile({
      linkedinUrl: links.linkedinUrl.trim() || null,
      githubUrl: links.githubUrl.trim() || null,
      portfolioUrl: links.portfolioUrl.trim() || null,
    });

    if (success) {
      setSuccessMessage('Links updated successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        setEditSocialsOpen(false);
      }, 1000);
    } else {
      setErrorMessage('Failed to save social links.');
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Edit Social & Portfolio Links
              </h2>
              <p className="text-xs text-slate-400">
                Help recruiters explore your coding profiles and projects
              </p>
            </div>
          </div>

          <button
            onClick={() => setEditSocialsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          
          {/* Status Banners */}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LinkedIn Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm bg-[#0077B5] text-white flex items-center justify-center font-bold text-[9px]">
                in
              </div>
              <span>LinkedIn Profile URL</span>
            </label>
            <input
              type="url"
              value={links.linkedinUrl}
              onChange={(e) => setLinks({ ...links, linkedinUrl: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* GitHub Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm bg-slate-900 text-white flex items-center justify-center text-[9px]">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <span>GitHub Profile URL</span>
            </label>
            <input
              type="url"
              value={links.githubUrl}
              onChange={(e) => setLinks({ ...links, githubUrl: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Portfolio Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <div className="h-4 w-4 rounded-sm bg-emerald-600 text-white flex items-center justify-center">
                <Globe className="w-2.5 h-2.5" />
              </div>
              <span>Portfolio / Personal Website URL</span>
            </label>
            <input
              type="url"
              value={links.portfolioUrl}
              onChange={(e) => setLinks({ ...links, portfolioUrl: e.target.value })}
              placeholder="https://yourportfolio.dev"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Footer */}
          <div className="px-0 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditSocialsOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Links</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
