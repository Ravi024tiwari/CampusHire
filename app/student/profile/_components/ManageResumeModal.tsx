'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  FileText, 
  UploadCloud, 
  ExternalLink, 
  Check, 
  Trash2, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function ManageResumeModal() {
  const { 
    profile, 
    isManageResumeOpen, 
    setManageResumeOpen, 
    uploadResume, 
    isUploadingResume 
  } = useStudentProfileStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeTitle, setResumeTitle] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isManageResumeOpen) return null;

  const resumes = profile?.resumes || [];

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setErrorMessage('Please upload a valid PDF document.');
      return;
    }

    setErrorMessage(null);
    const title = resumeTitle.trim() || file.name;
    const url = await uploadResume(file, title);
    if (url) {
      setSuccessMessage('Resume uploaded successfully!');
      setResumeTitle('');
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setErrorMessage('Failed to upload resume to Cloudinary.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-heading">
                Manage Resume
              </h2>
              <p className="text-xs text-slate-400">
                Upload and organize your campus placement resumes
              </p>
            </div>
          </div>

          <button
            onClick={() => setManageResumeOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
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

          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              dragOver
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-slate-200 hover:border-blue-400 bg-slate-50/60'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />

            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                {isUploadingResume ? (
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">
                  {isUploadingResume ? 'Uploading resume to Cloudinary...' : 'Drag & drop your PDF resume here'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  PDF format only (Max 10MB)
                </p>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingResume}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-50"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Active Resumes List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Resume Versions ({resumes.length})
            </h4>

            {resumes.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                No resumes uploaded yet. Upload your first PDF above.
              </p>
            ) : (
              <div className="space-y-2">
                {resumes.map((res, idx) => (
                  <div
                    key={res.id || idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-black text-[9px] shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {res.title}
                          </p>
                          {res.isDefault && (
                            <span className="px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-extrabold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">
                          {new Date(res.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {res.fileUrl && res.fileUrl !== '#' && (
                        <a
                          href={res.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-white border border-slate-200 transition-colors"
                          title="View PDF"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={() => setManageResumeOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
