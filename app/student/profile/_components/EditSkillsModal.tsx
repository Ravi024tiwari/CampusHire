'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Code2, 
  Plus, 
  Check, 
  Loader2, 
  AlertCircle, 
  Sparkles 
} from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

const POPULAR_SKILL_SUGGESTIONS = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 
  'Python', 'Java', 'C++', 'DSA', 'System Design', 
  'SQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Tailwind CSS'
];

export function EditSkillsModal() {
  const { 
    profile, 
    isEditSkillsOpen, 
    setEditSkillsOpen, 
    updateProfile, 
    isUpdating 
  } = useStudentProfileStore();

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.skills) {
      setSkills(profile.skills);
    } else {
      setSkills(['React', 'Node.js', 'TypeScript', 'Python', 'DSA', 'System Design', 'JavaScript', 'MongoDB']);
    }
  }, [profile, isEditSkillsOpen]);

  if (!isEditSkillsOpen) return null;

  const handleAddSkill = (skillToAdd?: string) => {
    const raw = (skillToAdd || newSkillInput).trim();
    if (!raw) return;

    if (skills.some((s) => s.toLowerCase() === raw.toLowerCase())) {
      setErrorMessage(`"${raw}" is already added.`);
      setTimeout(() => setErrorMessage(null), 2500);
      return;
    }

    setSkills([...skills, raw]);
    setNewSkillInput('');
    setErrorMessage(null);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSave = async () => {
    setErrorMessage(null);
    const success = await updateProfile({ skills });
    if (success) {
      setSuccessMessage('Skills updated successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        setEditSkillsOpen(false);
      }, 1000);
    } else {
      setErrorMessage('Failed to save skills.');
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
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Edit Technical Skills
              </h2>
              <p className="text-xs text-slate-400">
                Showcase technologies and frameworks to recruiters
              </p>
            </div>
          </div>

          <button
            onClick={() => setEditSkillsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          
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

          {/* Input Row */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g. Next.js, Docker, Java..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />

            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Active Skills Cloud */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Current Skills ({skills.length})
            </label>

            <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 min-h-[90px]">
              {skills.length === 0 ? (
                <p className="text-xs text-slate-400 italic self-center">
                  No skills added yet. Type a skill or choose from suggestions below.
                </p>
              ) : (
                skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold shadow-2xs group"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Quick Suggestions Cloud */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular Suggestions</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {POPULAR_SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddSkill(suggestion)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent text-slate-600 text-[11px] font-medium transition-all cursor-pointer"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setEditSkillsOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
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
                <span>Save Skills</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
