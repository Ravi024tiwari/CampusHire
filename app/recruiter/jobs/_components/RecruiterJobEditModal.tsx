'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Loader2, 
  Tag, 
  Building2, 
  AlertCircle, 
  Check, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { RecruiterJobItem, useRecruiterJobsStore } from '@/store/useRecruiterJobsStore';
import { ACADEMIC_BRANCHES, normalizeBranchCode } from '@/lib/constants/branches';

interface RecruiterJobEditModalProps {
  job: RecruiterJobItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

const SUGGESTED_SKILLS = [
  'React', 'Node.js', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'PostgreSQL', 
  'Next.js', 'Docker', 'AWS', 'Tailwind CSS', 'Machine Learning', 'Figma', 'Go', 'GraphQL'
];

export function RecruiterJobEditModal({
  job,
  onClose,
  onSuccess,
}: RecruiterJobEditModalProps) {
  const { updateJob } = useRecruiterJobsStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'FULL_TIME' | 'INTERNSHIP' | 'INTERN_PLUS_FTE'>('FULL_TIME');
  const [status, setStatus] = useState<'DRAFT' | 'PENDING_APPROVAL' | 'ACTIVE' | 'CLOSED'>('ACTIVE');
  const [location, setLocation] = useState('');
  const [salaryPackage, setSalaryPackage] = useState('');
  const [minCgpa, setMinCgpa] = useState<number>(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [allowedBranches, setAllowedBranches] = useState<string[]>([]);
  const [eligibleBatches, setEligibleBatches] = useState<number[]>([]);
  const [deadline, setDeadline] = useState('');

  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setDescription(job.description || '');
      setType(job.type);
      setStatus(job.status);
      setLocation(job.location || '');
      setSalaryPackage(job.salaryPackage || '');
      setMinCgpa(job.minCgpa || 0);
      setSkills(Array.isArray(job.skills) ? job.skills : []);
      setAllowedBranches(Array.isArray(job.allowedBranches) ? job.allowedBranches : []);
      setEligibleBatches(Array.isArray(job.eligibleBatches) ? job.eligibleBatches : []);
      if (job.deadline) {
        try {
          setDeadline(new Date(job.deadline).toISOString().slice(0, 16));
        } catch {
          setDeadline('');
        }
      }
    }
  }, [job]);

  if (!job) return null;

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

  const toggleBatch = (batchYear: number) => {
    if (eligibleBatches.includes(batchYear)) {
      setEligibleBatches(eligibleBatches.filter((b) => b !== batchYear));
    } else {
      setEligibleBatches([...eligibleBatches, batchYear].sort((a, b) => a - b));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim() || title.trim().length < 3) {
      setErrorMessage('Job title must be at least 3 characters');
      return;
    }
    if (!location.trim()) {
      setErrorMessage('Location is required');
      return;
    }
    if (!salaryPackage.trim()) {
      setErrorMessage('Salary package or stipend is required');
      return;
    }
    if (!deadline) {
      setErrorMessage('Application deadline is required');
      return;
    }
    if (new Date(deadline) <= new Date()) {
      setErrorMessage('Deadline must be in the future');
      return;
    }

    setIsSubmitting(true);
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

    setIsSubmitting(false);
    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setErrorMessage(result.message || 'Failed to update job drive');
    }
  };

  const currentYear = new Date().getFullYear();
  const availableBatchYears = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0A2540] text-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
              Edit Drive Parameters
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              {job.title}
            </h2>
            <p className="text-xs text-slate-300">
              Campus: <strong className="text-white">{job.college.name}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 [scrollbar-width:thin]">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Row 1: Title & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Full Stack Developer - Campus Drive"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
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
              <label className="text-xs font-bold text-slate-700">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bangalore (Hybrid) or Remote"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Compensation / CTC <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={salaryPackage}
                onChange={(e) => setSalaryPackage(e.target.value)}
                placeholder="e.g. 14 - 18 LPA"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Row 3: Skills required array */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                Required Skills & Tags
              </span>
              <span className="text-[11px] font-normal text-slate-400">
                Type and press Enter or comma
              </span>
            </label>

            {/* Current Skills Tags */}
            <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-xl bg-white border border-slate-200">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <input
                type="text"
                placeholder={skills.length === 0 ? 'Type a skill and press Enter (e.g. React, Python)...' : 'Add more...'}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="flex-1 min-w-[140px] text-xs sm:text-sm bg-transparent border-none outline-none font-medium text-[#0A2540] placeholder-slate-400 px-1"
              />
            </div>

            {/* Quick suggested skill pills */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Suggested:
              </span>
              {SUGGESTED_SKILLS.slice(0, 8).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleAddSkill(suggestion)}
                  disabled={skills.includes(suggestion)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                    skills.includes(suggestion)
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  + {suggestion}
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
                placeholder="e.g. 7.5 (0 for no cutoff)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Row 5: Allowed Branches & Batches */}
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
                      Batch of {year}
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
            <label className="text-xs font-bold text-slate-700">
              Job Description & Candidate Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job role, core responsibilities, key qualifications, and interview process..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
              required
            />
          </div>

          {/* Footer Submit Button */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Drive Changes</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
