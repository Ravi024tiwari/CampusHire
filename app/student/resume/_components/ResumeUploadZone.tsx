'use client';

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Check, 
  Loader2, 
  AlertCircle, 
  Star, 
  Sparkles,
  Plus
} from 'lucide-react';
import { useStudentResumeStore } from '@/store/useStudentResumeStore';

const ROLE_PRESETS = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'Core SDE (DSA)',
  'General Placement',
];

export function ResumeUploadZone() {
  const { uploadResume, isUploading, successMessage, error, clearMessages } = useStudentResumeStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeTitle, setResumeTitle] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      setLocalError('Only PDF format is supported.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setLocalError('File size exceeds 10MB limit.');
      return;
    }

    setLocalError(null);
    clearMessages();
    setSelectedFile(file);
    if (!resumeTitle) {
      // Auto-suggest title based on filename
      const cleanName = file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
      setResumeTitle(cleanName);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setLocalError('Please select a PDF file to upload.');
      return;
    }

    const titleToUse = resumeTitle.trim() || selectedFile.name;
    const success = await uploadResume(selectedFile, titleToUse, isDefault);

    if (success) {
      setSelectedFile(null);
      setResumeTitle('');
      setIsDefault(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div id="resume-upload-section" className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
      
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <UploadCloud className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
              Upload New Resume Version
            </h2>
            <p className="text-xs text-slate-400">
              Add a specialized PDF tailored for upcoming company requirements
            </p>
          </div>
        </div>
      </div>

      {/* Status Notifications */}
      {successMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {(error || localError) && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error || localError}</span>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleUploadSubmit} className="space-y-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />

        {/* Drag & Drop Box */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
            dragOver
              ? 'border-blue-500 bg-blue-50/60 shadow-inner'
              : selectedFile
              ? 'border-emerald-400 bg-emerald-50/40'
              : 'border-slate-200/90 hover:border-blue-400 bg-slate-50/70 hover:bg-slate-50'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shadow-xs transition-colors ${
              selectedFile 
                ? 'bg-emerald-500 text-white' 
                : 'bg-blue-50 text-blue-600'
            }`}>
              {selectedFile ? (
                <FileText className="w-5 h-5" />
              ) : (
                <UploadCloud className="w-5 h-5" />
              )}
            </div>

            {selectedFile ? (
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-emerald-950">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload (Click to change)
                </p>
              </div>
            ) : (
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800">
                  Drag and drop your PDF resume here, or <span className="text-blue-600 underline">browse files</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Supported format: PDF only (Up to 10MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Role / Title Tagging & Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Target Role / Title Tag</span>
          </label>

          <input
            type="text"
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
            placeholder="e.g. Full Stack Developer, Data Analyst, Core SDE..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />

          {/* Quick Preset Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Quick presets:</span>
            {ROLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setResumeTitle(preset)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                  resumeTitle === preset
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border-transparent hover:border-blue-200'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Make Default Checkbox & Upload Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Set as primary default resume for 1-click apply</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={isUploading || !selectedFile}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading to Cloudinary...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Save & Upload Resume</span>
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
}
