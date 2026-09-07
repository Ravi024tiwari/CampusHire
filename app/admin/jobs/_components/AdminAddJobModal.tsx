'use client';

import React, { useState } from 'react';
import { X, Briefcase, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import apiClient from '@/lib/axios';

interface AdminAddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AdminAddJobModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminAddJobModalProps) {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('Google');
  const [location, setLocation] = useState('Bangalore, KA');
  const [type, setType] = useState('FULL_TIME');
  const [salaryPackage, setSalaryPackage] = useState('18 - 24 LPA');
  const [minCgpa, setMinCgpa] = useState('7.5');
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [description, setDescription] = useState(
    'Seeking passionate software engineers to design and build scalable platform features.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !companyName.trim() || !location.trim()) {
      setError('Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate/post to API
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D8B8A] flex items-center justify-center border border-teal-200">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0A2540] font-heading">
                  Create Job Posting
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add a new recruitment drive to the platform.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Job posting created successfully!</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Software Engineer - Full Stack"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company *
                </label>
                <select
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
                >
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Adobe">Adobe</option>
                  <option value="Tesla">Tesla</option>
                  <option value="Infosys">Infosys</option>
                  <option value="Flipkart">Flipkart</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Job Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="INTERN_PLUS_FTE">Intern + FTE</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, KA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Salary / Package
                </label>
                <input
                  type="text"
                  value={salaryPackage}
                  onChange={(e) => setSalaryPackage(e.target.value)}
                  placeholder="e.g. 14 - 18 LPA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Min CGPA
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={minCgpa}
                  onChange={(e) => setMinCgpa(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deadline *
                </label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0D8B8A] focus:ring-2 focus:ring-[#0D8B8A]/15"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0D8B8A] hover:bg-[#0F766E] active:scale-95 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all disabled:opacity-60"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isSubmitting ? 'Creating...' : 'Create Job'}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
