'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Phone, 
  FileText, 
  GitBranch, 
  Calendar, 
  GraduationCap, 
  Percent, 
  Camera, 
  Loader2, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';
import { BRANCHES_BY_CATEGORY, normalizeBranchCode } from '@/lib/constants/branches';

export function EditProfileModal() {
  const { 
    profile, 
    isEditProfileOpen, 
    setEditProfileOpen, 
    updateProfile, 
    uploadAvatar, 
    isUpdating, 
    isUploadingAvatar 
  } = useStudentProfileStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    branch: '',
    batchYear: 2026,
    cgpa: 8.75,
    tenthMarks: 90,
    twelfthMarks: 85,
    avatarUrl: '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.user.name || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
        branch: profile.branch || '',
        batchYear: profile.batchYear || 2026,
        cgpa: profile.cgpa || 8.75,
        tenthMarks: profile.tenthMarks || 90,
        twelfthMarks: profile.twelfthMarks || 85,
        avatarUrl: profile.user.avatarUrl || '',
      });
      setAvatarPreview(profile.user.avatarUrl || null);
    }
  }, [profile, isEditProfileOpen]);

  if (!isEditProfileOpen) return null;

  const handleAvatarSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Local preview
      const localUrl = URL.createObjectURL(file);
      setAvatarPreview(localUrl);

      // Upload to server
      const uploadedUrl = await uploadAvatar(file);
      if (uploadedUrl) {
        setFormData((prev) => ({ ...prev, avatarUrl: uploadedUrl }));
        setSuccessMessage('Photo uploaded successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const success = await updateProfile({
      name: formData.name.trim(),
      phone: formData.phone.trim() || null,
      bio: formData.bio.trim() || null,
      branch: formData.branch.trim(),
      batchYear: Number(formData.batchYear),
      cgpa: Number(formData.cgpa),
      tenthMarks: formData.tenthMarks ? Number(formData.tenthMarks) : null,
      twelfthMarks: formData.twelfthMarks ? Number(formData.twelfthMarks) : null,
      avatarUrl: formData.avatarUrl || null,
    });

    if (success) {
      setSuccessMessage('Profile saved successfully!');
      setTimeout(() => {
        setSuccessMessage(null);
        setEditProfileOpen(false);
      }, 1000);
    } else {
      setErrorMessage('Failed to save profile changes.');
    }
  };

  const initial = formData.name.trim().charAt(0).toUpperCase() || 'S';

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Edit Student Profile
              </h2>
              <p className="text-xs text-slate-400">
                Update your identity, academic records, and photo
              </p>
            </div>
          </div>

          <button
            onClick={() => setEditProfileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 [scrollbar-width:thin]">
          
          {/* Alerts */}
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

          {/* Avatar Upload Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/40 border border-blue-100 flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarSelect}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />

            <div className="relative group">
              <Avatar className="h-16 w-16 border-2 border-white shadow-md ring-2 ring-blue-300">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Avatar" className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-gradient-to-tr from-[#0A2540] to-[#2563EB] text-white text-xl font-bold">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all cursor-pointer"
                title="Change Photo"
              >
                {isUploadingAvatar ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Camera className="w-3 h-3" />
                )}
              </button>
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left space-y-1">
              <h4 className="text-xs font-bold text-slate-900">
                Profile Photo
              </h4>
              <p className="text-[11px] text-slate-500">
                Accepted: JPG, PNG, WebP (Max 10MB). Changes reflect across student and recruiters.
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
              >
                {isUploadingAvatar ? 'Uploading image...' : 'Choose new photo'}
              </button>
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="e.g. Ravi Tiwari"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Branch */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-blue-600" />
                <span>Branch / Specialization</span>
              </label>
              <select
                required
                value={normalizeBranchCode(formData.branch)}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="" disabled>Select Academic Branch...</option>
                {Object.entries(BRANCHES_BY_CATEGORY).map(([category, branches]) => (
                  <optgroup key={category} label={category}>
                    {branches.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name} ({b.code})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Batch Year */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Batch Year</span>
              </label>
              <input
                type="number"
                min="2020"
                max="2035"
                required
                value={formData.batchYear}
                onChange={(e) => setFormData({ ...formData, batchYear: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* CGPA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>CGPA (Out of 10)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* 10th Marks */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span>10th Marks (%)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.tenthMarks}
                onChange={(e) => setFormData({ ...formData, tenthMarks: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="92.4"
              />
            </div>

            {/* 12th Marks */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span>12th Marks (%)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.twelfthMarks}
                onChange={(e) => setFormData({ ...formData, twelfthMarks: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                placeholder="88.6"
              />
            </div>

          </div>

          {/* Bio / Motto */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Bio & Motto (Featured on Profile Banner)</span>
            </label>
            <textarea
              rows={3}
              maxLength={300}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              placeholder="e.g. Passionate about building scalable web applications and solving real world problems."
            />
            <p className="text-[10px] text-slate-400 text-right">
              {formData.bio.length}/300 characters
            </p>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditProfileOpen(false)}
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
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
