'use client';

import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { useStudentResumeStore } from '@/store/useStudentResumeStore';

export function ResumePreviewModal() {
  const { previewResume, setPreviewResume } = useStudentResumeStore();

  if (!previewResume) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-[10px] shrink-0">
              PDF
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate font-heading">
                {previewResume.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                In-browser Document Preview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {previewResume.fileUrl && previewResume.fileUrl !== '#' && (
              <>
                <a
                  href={previewResume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>

                <a
                  href={previewResume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </>
            )}

            <button
              onClick={() => setPreviewResume(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Frame */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden">
          {previewResume.fileUrl && previewResume.fileUrl !== '#' ? (
            <iframe
              src={`${previewResume.fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              className="w-full h-full border-0"
              title={previewResume.title}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
              <FileText className="w-12 h-12 stroke-1" />
              <p className="text-xs font-semibold">Resume preview unavailable</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
