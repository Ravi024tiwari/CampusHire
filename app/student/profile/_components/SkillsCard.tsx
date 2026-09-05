'use client';

import React from 'react';
import { Code2, Plus, Edit3 } from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function SkillsCard() {
  const { profile, setEditSkillsOpen } = useStudentProfileStore();

  if (!profile) return null;

  const skills = profile.skills && profile.skills.length > 0 
    ? profile.skills 
    : ['React', 'Node.js', 'TypeScript', 'Python', 'DSA', 'System Design', 'JavaScript', 'MongoDB'];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Skills
            </h2>
          </div>

          <button
            onClick={() => setEditSkillsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 lg:bg-blue-50 lg:text-blue-700 lg:border lg:border-blue-100 lg:hover:bg-blue-600 lg:hover:text-white lg:hover:border-blue-600 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Skill Tag Cloud */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              {skill}
            </span>
          ))}

          {/* + Add Skill Button */}
          <button
            onClick={() => setEditSkillsOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200/80 text-blue-700 text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>
    </div>
  );
}
