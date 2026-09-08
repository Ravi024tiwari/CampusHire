'use client';

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { 
  UploadCloud, 
  Loader2, 
  Sparkles, 
  RotateCcw, 
  Trash2, 
  Link as LinkIcon, 
  School,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface CollegeEmblemCardProps {
  logoUrl: string;
  originalLogoUrl: string;
  collegeName: string;
  collegeCode?: string | null;
  onChange: (url: string) => void;
  onRevert: () => void;
}

export function CollegeEmblemCard({
  logoUrl,
  originalLogoUrl,
  collegeName,
  collegeCode,
  onChange,
  onRevert,
}: CollegeEmblemCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isModified = (logoUrl ?? '').trim() !== (originalLogoUrl ?? '').trim();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Emblem file size must be less than 2MB.');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg(null);
      const data = new FormData();
      data.append('file', file);
      data.append('category', 'college_logo');

      const res = await axios.post('/api/upload', data);
      if (res.data.success && res.data.data?.url) {
        onChange(res.data.data.url);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.response?.data?.message || 'Logo upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-black text-[#0A2540] tracking-tight">
            Institutional Emblem
          </h3>
          {isModified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold text-[10px]">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              <span>Modified</span>
            </span>
          )}
        </div>

        {isModified && (
          <button
            type="button"
            onClick={onRevert}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Revert Logo</span>
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Emblem Display Box */}
      <div className="flex flex-col items-center justify-center p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
        <div className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2.5 border-2 border-slate-200 shadow-2xs flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-sm">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={collegeName || 'Emblem'}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center font-black text-xl shadow-inner">
              <span>{collegeCode ? collegeCode.slice(0, 3) : 'COL'}</span>
              <span className="text-[9px] font-medium text-blue-100 mt-0.5">Emblem</span>
            </div>
          )}

          {logoUrl && (
            <button
              type="button"
              onClick={() => onChange('')}
              title="Remove emblem"
              className="absolute top-1 right-1 p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Upload & Actions */}
        <div className="flex items-center gap-2 w-full pt-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
            )}
            <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Paste Image Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">URL</span>
          </button>
        </div>

        {showUrlInput && (
          <div className="w-full space-y-2 pt-2 animate-in fade-in duration-150">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste direct logo image URL (https://...)"
              className="w-full px-3 py-2 bg-white text-xs font-medium rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleApplyUrl}
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Apply URL
              </button>
              <button
                type="button"
                onClick={() => { setShowUrlInput(false); setUrlInput(''); }}
                className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <p className="text-[10.5px] text-slate-400 text-center">
          PNG, SVG, JPG format supported (Max 2MB)
        </p>
      </div>
    </div>
  );
}
