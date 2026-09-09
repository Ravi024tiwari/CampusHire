'use strict';
'use client';

import React, { useState } from 'react';
import { X, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { ACADEMIC_BRANCHES } from '@/lib/constants/branches';

interface TpoAddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentAdded: () => void;
  availableBranches?: string[];
}

export function TpoAddStudentModal({
  isOpen,
  onClose,
  onStudentAdded,
  availableBranches,
}: TpoAddStudentModalProps) {
  const branchesList = availableBranches && availableBranches.length > 0
    ? availableBranches
    : ACADEMIC_BRANCHES.map((b) => b.code);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enrollmentNumber: '',
    branch: branchesList[0] || 'CSE',
    batchYear: new Date().getFullYear(),
    cgpa: '8.0',
    phone: '',
    skills: 'JavaScript, React, Node.js',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        enrollmentNumber: formData.enrollmentNumber.trim(),
        branch: formData.branch.trim(),
        batchYear: Number(formData.batchYear),
        cgpa: parseFloat(formData.cgpa),
        phone: formData.phone.trim() || undefined,
        skills: skillsArray,
        password: formData.password.trim() || undefined,
      };

      const res = await axios.post('/api/tpo/students', payload);
      if (res.data.success) {
        setSuccessMsg('Student enrolled successfully!');
        setTimeout(() => {
          onStudentAdded();
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to enroll student. Please check the details.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Enroll New Student</h2>
              <p className="text-xs text-slate-500">
                Register student under your college roster
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white outline-none"
            />
          </div>

          {/* Email & Enrollment Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                College Email *
              </label>
              <input
                type="email"
                required
                placeholder="aarav.sharma@dtu.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Enrollment Number *
              </label>
              <input
                type="text"
                required
                placeholder="DTU2023001"
                value={formData.enrollmentNumber}
                onChange={(e) =>
                  setFormData({ ...formData, enrollmentNumber: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Branch, Batch, CGPA */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Branch *</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
              >
                {branchesList.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Batch *</label>
              <input
                type="number"
                required
                min={2020}
                max={2035}
                value={formData.batchYear}
                onChange={(e) =>
                  setFormData({ ...formData, batchYear: Number(e.target.value) })
                }
                className="w-full px-3 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-center"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">CGPA *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-center"
              />
            </div>
          </div>

          {/* Phone & Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Phone</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Skills (comma separated)
              </label>
              <input
                type="text"
                placeholder="React, TypeScript, SQL"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm disabled:opacity-60 flex items-center gap-1.5"
            >
              {isLoading ? 'Enrolling...' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
