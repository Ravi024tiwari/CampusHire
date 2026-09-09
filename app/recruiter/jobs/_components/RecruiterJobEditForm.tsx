'use client';

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Loader2, 
  Tag, 
  SlidersHorizontal,
  Building2,
  Banknote,
  MapPin,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { RecruiterJobItem, useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';
import { ACADEMIC_BRANCHES, normalizeBranchCode } from '@/lib/constants/branches';

interface RecruiterJobEditFormProps {
  job: RecruiterJobItem;
  onCancel: () => void;
  onSaved: (updatedJob: RecruiterJobItem) => void;
  showToast: (msg: string) => void;
}

const SUGGESTED_SKILLS = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 
  'SQL', 'PostgreSQL', 'Next.js', 'Docker', 'AWS', 'Tailwind CSS', 
  'Machine Learning', 'Data Structures', 'Git', 'System Design'
];

export function RecruiterJobEditForm({ job, onCancel, onSaved, showToast }: RecruiterJobEditFormProps) {
  const { updateJob } = useRecruiterJobsStore();

  const [title, setTitle] = useState(job.title || '');
  const [description, setDescription] = useState(job.description || '');
  const [type, setType] = useState<'FULL_TIME' | 'INTERNSHIP' | 'INTERN_PLUS_FTE'>(job.type);
  const [status, setStatus] = useState<'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'CLOSED'>(job.status);
  const [location, setLocation] = useState(job.location || '');
  const [salaryPackage, setSalaryPackage] = useState(job.salaryPackage || '');
  const [minCgpa, setMinCgpa] = useState<number>(job.minCgpa || 0);
  const [skills, setSkills] = useState<string[]>(Array.isArray(job.skills) ? job.skills : []);
  const [allowedBranches, setAllowedBranches] = useState<string[]>(Array.isArray(job.allowedBranches) ? job.allowedBranches : []);
  const [eligibleBatches, setEligibleBatches] = useState<number[]>(Array.isArray(job.eligibleBatches) ? job.eligibleBatches : []);
  const [deadline, setDeadline] = useState(() => {
    if (job.deadline) {
      try {
        return new Date(job.deadline).toISOString().slice(0, 16);
      } catch {
        return '';
      }
    }
    return '';
  });
  const [skillInput, setSkillInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const currentYear = new Date().getFullYear();
  const availableBatchYears = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (!skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill(skillInput);
    }
  };

  const toggleBranch = (branch: string) => {
    if (allowedBranches.includes(branch)) {
      setAllowedBranches(allowedBranches.filter((b) => b !== branch));
    } else {
      setAllowedBranches([...allowedBranches, branch]);
    }
  };

  const toggleBatch = (year: number) => {
    if (eligibleBatches.includes(year)) {
      setEligibleBatches(eligibleBatches.filter((y) => y !== year));
    } else {
      setEligibleBatches([...eligibleBatches, year]);
    }
  };

  const handleSaveEdits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 3) {
      showToast('Title must be at least 3 characters');
      return;
    }
    if (!location.trim()) {
      showToast('Location is required');
      return;
    }
    if (!salaryPackage.trim()) {
      showToast('Compensation package is required');
      return;
    }

    setIsSaving(true);
    const result = await updateJob(job.id, {
      title: title.trim(),
      description: description.trim(),
      type,
      status,
      location: location.trim(),
      salaryPackage: salaryPackage.trim(),
      skills,
      minCgpa: Number(minCgpa),
      allowedBranches,
      eligibleBatches,
      deadline: new Date(deadline).toISOString(),
    });

    setIsSaving(false);
    if (result.success && result.data) {
      showToast('Drive parameters updated successfully');
      onSaved(result.data);
    } else {
      showToast(result.message || 'Failed to save changes');
    }
  };

  return (
    <form onSubmit={handleSaveEdits} className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-[#0A2540]">
            Edit Drive Parameters
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Modify placement parameters, required skills, cutoffs, and description.</p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          title="Cancel editing"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Row 1: Title & Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Job Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-semibold focus:border-blue-600 focus:bg-white focus:outline-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Drive Status</label>
          <select
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-semibold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
          >
            <option value="ACTIVE">Active (Live)</option>
            <option value="PENDING_APPROVAL">Pending Approval</option>
            <option value="DRAFT">Draft</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Row 2: Type, Location, Salary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Role Type</label>
          <select
            value={type}
            onChange={(e: any) => setType(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-semibold focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
          >
            <option value="FULL_TIME">Full Time (FTE)</option>
            <option value="INTERNSHIP">Internship</option>
            <option value="INTERN_PLUS_FTE">Intern + FTE</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Location *</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Compensation Package / CTC *</label>
          <input
            type="text"
            value={salaryPackage}
            onChange={(e) => setSalaryPackage(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Row 3: Skills Manager */}
      <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            Required Skills & Tech Stack
          </span>
          <span className="text-[11px] font-normal text-slate-400">Press Enter or comma</span>
        </label>

        <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-xl bg-white border border-slate-200">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200"
            >
              <span>{skill}</span>
              <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <input
            type="text"
            placeholder="Type skill & press Enter..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            className="flex-1 min-w-[140px] text-xs sm:text-sm bg-transparent border-none outline-none font-medium text-[#0A2540]"
          />
        </div>

        {/* Quick Suggestions */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">Suggestions:</span>
          {SUGGESTED_SKILLS.slice(0, 10).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleAddSkill(s)}
              disabled={skills.includes(s)}
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                skills.includes(s)
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      {/* Row 4: CGPA, Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Minimum CGPA Cutoff</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={minCgpa}
            onChange={(e) => setMinCgpa(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Application Deadline *</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
            required
          />
        </div>
      </div>

      {/* Row 5: Batches & Branches */}
      <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Eligible Batches</label>
          <div className="flex flex-wrap gap-2">
            {availableBatchYears.map((year) => {
              const isSelected = eligibleBatches.includes(year);
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => toggleBatch(year)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  Class of {year}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
          <label className="text-xs font-bold text-slate-700">Allowed Academic Disciplines / Branches</label>
          <div className="flex flex-wrap gap-1.5">
            {ACADEMIC_BRANCHES.map((b) => {
              const isSelected = allowedBranches.map(normalizeBranchCode).includes(b.code);
              return (
                <button
                  key={b.code}
                  type="button"
                  onClick={() => toggleBranch(b.code)}
                  title={`${b.name} (${b.category})`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {b.code}
                  <span className="hidden sm:inline text-[10px] ml-1 opacity-75 font-normal">
                    ({b.name.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 6: Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Job Description & Candidate Requirements *</label>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
          required
        />
      </div>

      {/* Submit Actions */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Drive Parameters</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
