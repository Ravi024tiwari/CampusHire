'use client';

import React from 'react';
import { 
  FileText, 
  Star, 
  ExternalLink, 
  Download, 
  Edit3, 
  Trash2, 
  Check, 
  Loader2, 
  Eye, 
  Clock 
} from 'lucide-react';
import { useStudentResumeStore, ResumeVersion } from '@/store/useStudentResumeStore';

export function ResumeCardGrid() {
  const { 
    resumes, 
    isLoading, 
    isProcessingId, 
    setDefaultResume, 
    setPreviewResume, 
    setRenameResumeItem, 
    setDeleteConfirmItem 
  } = useStudentResumeStore();

  if (isLoading && resumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
        <p className="text-xs font-semibold text-slate-500">Loading your resumes...</p>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 text-center space-y-3 shadow-xs">
        <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">No Resumes Uploaded Yet</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Use the upload section above to upload your first PDF resume version for campus placement drives.
          </p>
        </div>
      </div>
    );
  }

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes) return 'PDF Document';
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Active Resume Versions</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-100">
            {resumes.length}
          </span>
        </h3>
        <p className="text-xs text-slate-400 hidden sm:block">
          Click &ldquo;Set as Default&rdquo; to use a specific version for 1-click apply
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumes.map((resume) => {
          const isBusy = isProcessingId === resume.id;

          return (
            <div
              key={resume.id}
              className={`relative rounded-2xl bg-white border p-4 sm:p-5 shadow-xs transition-all duration-200 flex flex-col justify-between gap-4 ${
                resume.isDefault
                  ? 'border-blue-400 ring-2 ring-blue-500/10 shadow-sm'
                  : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Top Row: PDF Badge + Title + Default Status */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Red PDF Badge */}
                    <div className="h-10 w-10 rounded-xl bg-rose-500 text-white flex flex-col items-center justify-center font-black text-[9.5px] shrink-0 shadow-xs">
                      <span>PDF</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {resume.title}
                        </h4>
                        {resume.isDefault && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10.5px] font-extrabold">
                            <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                            <span>Primary Default</span>
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                        <span>{formatFileSize(resume.fileSize)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(resume.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Rename button */}
                  <button
                    onClick={() => setRenameResumeItem(resume)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    title="Rename Role Title"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                
                {/* Preview In Modal */}
                <button
                  onClick={() => setPreviewResume(resume)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-bold text-xs transition-colors cursor-pointer active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                {/* Make Default Action */}
                {!resume.isDefault ? (
                  <button
                    onClick={() => setDefaultResume(resume.id)}
                    disabled={isBusy}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isBusy ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Star className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Set Default</span>
                  </button>
                ) : (
                  <div className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <Check className="w-3.5 h-3.5" />
                    <span>Active Default</span>
                  </div>
                )}

                {/* Download PDF */}
                {resume.fileUrl && resume.fileUrl !== '#' && (
                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 shrink-0"
                    title="Download PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                )}

                {/* Delete Resume */}
                <button
                  onClick={() => setDeleteConfirmItem(resume)}
                  disabled={isBusy}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer border border-slate-200 shrink-0"
                  title="Delete Resume Version"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
