'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Banknote, 
  Calendar, 
  Clock, 
  Tag, 
  Send,
  ArrowLeft, 
  Plus, 
  X, 
  Save, 
  Loader2, 
  AlertCircle, 
  Search, 
  ShieldCheck, 
  Layers,
  GraduationCap
} from 'lucide-react';
import { useRecruiterJobsStore, RecruiterJobCollege } from '@/store/useRecruiterJobsStore';

const COMMON_BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical Engineering (EE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Data Science & AI',
  'Master of Computer Applications (MCA)',
  'MBA / Management',
];

const SUGGESTED_SKILLS = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 
  'SQL', 'PostgreSQL', 'Next.js', 'Docker', 'AWS', 'Tailwind CSS', 
  'Machine Learning', 'Data Structures', 'Git', 'System Design'
];

const SUGGESTED_RESPONSIBILITIES = [
  'Architect, develop, and maintain high-throughput microservices and responsive web applications.',
  'Collaborate with cross-functional teams including product managers and designers to deliver robust features.',
  'Write clean, modular, scalable, and well-tested code following best engineering practices.',
  'Participate in active code reviews, system design sessions, and sprint architectural discussions.',
  'Diagnose latency bottlenecks, optimize database queries, and ensure 99.9% platform availability.',
  'Build and maintain CI/CD pipelines, automated testing suites, and containerized cloud services.',
];

function CreateJobForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCollegeId = searchParams.get('collegeId');

  const { 
    verifiedCollegesList, 
    fetchVerifiedColleges, 
    createJob, 
    isPosting 
  } = useRecruiterJobsStore();

  // Form states
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>(preselectedCollegeId || '');
  const [collegeSearch, setCollegeSearch] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'FULL_TIME' | 'INTERNSHIP' | 'INTERN_PLUS_FTE'>('FULL_TIME');
  const [location, setLocation] = useState('');
  const [salaryPackage, setSalaryPackage] = useState('');
  const [minCgpa, setMinCgpa] = useState<number>(0);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [responsibilities, setResponsibilities] = useState<string[]>([
    'Architect, develop, and maintain high-throughput microservices and responsive web applications.',
    'Collaborate with cross-functional teams including product managers and designers to deliver robust features.',
    'Write clean, modular, scalable, and well-tested code following best engineering practices.',
  ]);
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [allowedBranches, setAllowedBranches] = useState<string[]>([
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
  ]);
  const currentYear = new Date().getFullYear();
  const [eligibleBatches, setEligibleBatches] = useState<number[]>([currentYear, currentYear + 1]);
  
  // Default deadline: 14 days from now
  const defaultDeadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  const [deadline, setDeadline] = useState(defaultDeadline);

  const [skillInput, setSkillInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchVerifiedColleges();
  }, [fetchVerifiedColleges]);

  useEffect(() => {
    if (preselectedCollegeId) {
      setSelectedCollegeId(preselectedCollegeId);
    }
  }, [preselectedCollegeId]);

  // Filter verified colleges by search term
  const filteredColleges = useMemo(() => {
    if (!collegeSearch.trim()) return verifiedCollegesList;
    const q = collegeSearch.toLowerCase().trim();
    return verifiedCollegesList.filter((col) => 
      col.name.toLowerCase().includes(q) || 
      (col.code && col.code.toLowerCase().includes(q)) ||
      (col.city && col.city.toLowerCase().includes(q))
    );
  }, [verifiedCollegesList, collegeSearch]);

  const selectedCollegeObj = useMemo(() => {
    return verifiedCollegesList.find((c) => c.id === selectedCollegeId) || null;
  }, [verifiedCollegesList, selectedCollegeId]);

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

  const handleAddResponsibility = (itemToAdd: string) => {
    const trimmed = itemToAdd.trim();
    if (!trimmed) return;
    if (!responsibilities.includes(trimmed)) {
      setResponsibilities([...responsibilities, trimmed]);
    }
    setResponsibilityInput('');
  };

  const handleRemoveResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleResponsibilityKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddResponsibility(responsibilityInput);
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
      setEligibleBatches([...eligibleBatches, year].sort((a, b) => a - b));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!selectedCollegeId) {
      setErrorMessage('Please select a target accredited university for this campus drive');
      return;
    }
    if (!title.trim() || title.trim().length < 3) {
      setErrorMessage('Job title must be at least 3 characters');
      return;
    }
    if (!location.trim()) {
      setErrorMessage('Location is required (e.g. Bangalore (Hybrid), Remote)');
      return;
    }
    if (!salaryPackage.trim()) {
      setErrorMessage('Salary package or stipend is required (e.g. 14 - 18 LPA)');
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setErrorMessage('Job description must be at least 20 characters');
      return;
    }
    if (!responsibilities || responsibilities.length === 0) {
      setErrorMessage('Please add at least 1 key responsibility for this position');
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

    const payload = {
      collegeId: selectedCollegeId,
      title: title.trim(),
      description: description.trim(),
      type,
      status: 'ACTIVE' as const,
      location: location.trim(),
      salaryPackage: salaryPackage.trim(),
      skills,
      responsibilities,
      minCgpa: Number(minCgpa),
      allowedBranches,
      eligibleBatches,
      deadline: new Date(deadline).toISOString(),
    };

    const res = await createJob(payload);
    if (res.success) {
      setSuccessMessage('Campus placement drive posted successfully!');
      setTimeout(() => {
        router.push('/recruiter/jobs');
      }, 1200);
    } else {
      setErrorMessage(res.message || 'Failed to post campus placement drive');
    }
  };

  const availableBatchYears = [currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-7xl mx-auto space-y-6 pb-20">
      
      {/* 1. Industrial-Grade Action Header (Clean Interactive Back Button) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                router.back();
              } else {
                router.push('/recruiter/jobs');
              }
            }}
            className="group flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:text-[#0A2540] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
            title="Return to previous page"
          >
            <ArrowLeft className="h-4.5 w-4.5 group-hover:-translate-x-0.5 transition-transform text-slate-600 group-hover:text-blue-600" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0A2540] font-heading tracking-tight">
              Post Campus Placement Drive
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Publish a verified recruitment drive to accredited university placement cells and candidate pools.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Success / Error Banners */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{errorMessage}</span>
        </div>
      )}

      {/* 3. Main Form Grid Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 cols: Form Inputs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Target University Selector */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-extrabold text-[#0A2540] flex items-center gap-2">
                <Building2 className="w-4.5 h-4.5 text-blue-600" />
                1. Target Accredited University <span className="text-red-500">*</span>
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                Super Admin Verified
              </span>
            </div>

            {/* University Search & Selection */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter colleges by name, code, or city..."
                  value={collegeSearch}
                  onChange={(e) => setCollegeSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Scrollable College List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1 [scrollbar-width:thin]">
                {filteredColleges.map((college) => {
                  const isSelected = selectedCollegeId === college.id;
                  return (
                    <div
                      key={college.id}
                      onClick={() => setSelectedCollegeId(college.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                        {college.logoUrl ? (
                          <img src={college.logoUrl} alt={college.name} className="h-full w-full object-contain" />
                        ) : (
                          <Building2 className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold text-[#0A2540] truncate flex items-center gap-1">
                          <span>{college.name}</span>
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        </p>
                        <p className="text-[10.5px] font-medium text-slate-400 truncate">
                          {college.city || 'Campus Partner'} {college.code ? `· ${college.code}` : ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedCollegeObj && (
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                  <span>Selected: <strong>{selectedCollegeObj.name}</strong></span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Target
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Role Details */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0A2540] flex items-center gap-2">
              <Briefcase className="w-4.5 h-4.5 text-blue-600" />
              2. Job Profile & Compensation
            </h2>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Job Title / Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Associate Software Engineer - Full Stack"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none"
                required
              />
            </div>

            {/* Type, Location, Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Engagement Type</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 text-xs sm:text-sm font-semibold text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="FULL_TIME">Full Time (FTE)</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="INTERN_PLUS_FTE">Intern + FTE Conversion</option>
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
                  placeholder="e.g. Bangalore (Hybrid), Remote"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 text-xs sm:text-sm font-medium text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Compensation Package / CTC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={salaryPackage}
                  onChange={(e) => setSalaryPackage(e.target.value)}
                  placeholder="e.g. 14 - 18 LPA or ₹45,000/mo"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 text-xs sm:text-sm font-medium text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Skills Required Array */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  Required Skills & Tech Stack
                </span>
                <span className="text-[11px] font-normal text-slate-400">
                  Type and press Enter or comma
                </span>
              </label>

              {/* Tags Box */}
              <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 rounded-xl bg-white border border-slate-200">
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
                  placeholder={skills.length === 0 ? 'Type skill and press Enter (e.g. React, Python)...' : 'Add more...'}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  className="flex-1 min-w-[150px] text-xs sm:text-sm bg-transparent border-none outline-none font-medium text-[#0A2540] placeholder-slate-400 px-1"
                />
              </div>

              {/* Quick suggestions */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Suggestions:
                </span>
                {SUGGESTED_SKILLS.map((suggestion) => (
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

            {/* Key Responsibilities Builder (Required) */}
            <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-blue-50/40 via-slate-50/60 to-slate-50 border border-blue-100 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold text-[#0A2540] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Key Responsibilities & Deliverables <span className="text-red-500">*</span></span>
                </label>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  responsibilities.length > 0 
                    ? 'bg-blue-50 text-blue-700 border-blue-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {responsibilities.length} Defined {responsibilities.length === 0 && '(Required)'}
                </span>
              </div>

              {/* Add Input Bar */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Lead full-stack microservice architecture, optimize REST APIs..."
                  value={responsibilityInput}
                  onChange={(e) => setResponsibilityInput(e.target.value)}
                  onKeyDown={handleResponsibilityKeyDown}
                  className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 text-xs sm:text-sm font-medium text-[#0A2540] focus:border-blue-600 focus:outline-none shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddResponsibility(responsibilityInput)}
                  disabled={!responsibilityInput.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="hidden sm:inline">Add Point</span>
                </button>
              </div>

              {/* Bullet Points List */}
              {responsibilities.length > 0 ? (
                <div className="space-y-2 pt-1">
                  {responsibilities.map((resp, idx) => (
                    <div
                      key={`resp-item-${idx}`}
                      className="group flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all"
                    >
                      <div className="h-5 w-5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </div>
                      <p className="flex-1 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {resp}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(idx)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                        title="Remove responsibility"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-center rounded-xl bg-white border border-dashed border-amber-300 text-amber-800 text-xs font-medium">
                  No responsibilities added yet. Please specify at least 1 key responsibility for candidates to see.
                </div>
              )}

              {/* Suggested Responsibilities */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick Add Recommended Responsibilities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_RESPONSIBILITIES.map((sug, i) => (
                    <button
                      key={`sug-resp-${i}`}
                      type="button"
                      onClick={() => handleAddResponsibility(sug)}
                      disabled={responsibilities.includes(sug)}
                      className={`text-left text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        responsibilities.includes(sug)
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed hidden'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/50'
                      }`}
                    >
                      + {sug.slice(0, 55)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Eligibility Rules & Batches */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0A2540] flex items-center gap-2">
              <GraduationCap className="w-4.5 h-4.5 text-blue-600" />
              3. Student Eligibility & Cutoffs
            </h2>

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
                  placeholder="e.g. 7.5 (0 for no CGPA restriction)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none"
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 text-xs sm:text-sm font-medium focus:border-blue-600 focus:bg-white focus:outline-none cursor-pointer"
                  required
                />
              </div>
            </div>

            {/* Batches */}
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
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
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

            {/* Disciplines */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Allowed Engineering & Academic Disciplines</label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_BRANCHES.map((branch) => {
                  const isSelected = allowedBranches.includes(branch);
                  return (
                    <button
                      key={branch}
                      type="button"
                      onClick={() => toggleBranch(branch)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {branch}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Detailed Description */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0A2540] flex items-center gap-2">
              <Layers className="w-4.5 h-4.5 text-blue-600" />
              4. Job Description & Hiring Process <span className="text-red-500">*</span>
            </h2>

            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline the responsibilities, tech expectations, selection rounds (Online Test, Technical Round, HR), and perks..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs sm:text-sm font-medium text-[#0A2540] focus:border-blue-600 focus:bg-white focus:outline-none"
              required
            />
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/recruiter/jobs"
              className="px-5 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isPosting}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {isPosting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing Drive...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publish Campus Placement Drive</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right 4 cols: Live Preview Card */}
        <div className="lg:col-span-4 sticky top-6 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Live Candidate Preview
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800 border border-emerald-200">
                ACTIVE
              </span>
            </div>

            {/* University Tag */}
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 p-0.5 flex items-center justify-center shrink-0">
                {selectedCollegeObj?.logoUrl ? (
                  <img src={selectedCollegeObj.logoUrl} alt="Logo" className="h-full w-full object-contain" />
                ) : (
                  <Building2 className="h-5 w-5 text-slate-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-[#0A2540] truncate">
                  {selectedCollegeObj?.name || 'Target University'}
                </p>
                <p className="text-[10.5px] text-slate-400">
                  {selectedCollegeObj?.city || 'Accredited Campus'}
                </p>
              </div>
            </div>

            {/* Role Title & Type */}
            <div className="space-y-1">
              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-extrabold text-blue-700">
                {type === 'FULL_TIME' ? 'Full Time' : type === 'INTERNSHIP' ? 'Internship' : 'Intern + FTE'}
              </span>
              <h3 className="text-base font-black text-[#0A2540] font-heading line-clamp-2">
                {title || 'Job Position Title'}
              </h3>
            </div>

            {/* Package & Location */}
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                <Banknote className="w-3.5 h-3.5" />
                <span>{salaryPackage || 'Compensation'}</span>
              </div>
              <div className="inline-flex items-center gap-1 text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{location || 'Location'}</span>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Required Skills</p>
              <div className="flex flex-wrap gap-1">
                {skills.length > 0 ? (
                  skills.map((s) => (
                    <span key={s} className="rounded bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-700">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-400 italic">No skills added</span>
                )}
              </div>
            </div>

            {/* Eligibility */}
            <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <div>
                Cutoff: <strong>{minCgpa > 0 ? `${minCgpa} CGPA` : 'Open'}</strong>
              </div>
              <div>
                Batches: <strong>{eligibleBatches.join(', ')}</strong>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <Clock className="w-3 h-3" />
                <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
              </div>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
}

export default function CreateJobPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading placement drive form...</div>}>
      <CreateJobForm />
    </Suspense>
  );
}
