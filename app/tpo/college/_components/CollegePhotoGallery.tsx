'use client';

import React, { useRef, useState } from 'react';
import axios from 'axios';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  UploadCloud, 
  Loader2, 
  Star, 
  Sparkles, 
  RotateCcw, 
  Eye, 
  X,
  AlertCircle,
  Check
} from 'lucide-react';

interface CollegePhotoGalleryProps {
  images: string[];
  originalImages: string[];
  onChange: (images: string[]) => void;
  onRevert: () => void;
}

export function CollegePhotoGallery({
  images,
  originalImages,
  onChange,
  onRevert,
}: CollegePhotoGalleryProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const isModified = JSON.stringify(images) !== JSON.stringify(originalImages);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setErrorMsg(null);
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) continue;

        const data = new FormData();
        data.append('file', file);
        data.append('category', 'college_campus');

        const res = await axios.post('/api/upload', data);
        if (res.data.success && res.data.data?.url) {
          uploadedUrls.push(res.data.data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        const nextImages = [...images, ...uploadedUrls].slice(0, 10);
        onChange(nextImages);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.response?.data?.message || 'Gallery upload failed');
    } finally {
      setIsUploading(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const handleAddUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanUrl = newImageUrl.trim();
    if (!cleanUrl) return;

    if (images.length >= 10) {
      setErrorMsg('Maximum 10 campus images allowed.');
      return;
    }

    if (images.includes(cleanUrl)) {
      setErrorMsg('This image URL has already been added.');
      return;
    }

    onChange([...images, cleanUrl]);
    setNewImageUrl('');
    setErrorMsg(null);
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetPrimary = (indexToPrimary: number) => {
    if (indexToPrimary === 0) return;
    const target = images[indexToPrimary];
    const rest = images.filter((_, idx) => idx !== indexToPrimary);
    onChange([target, ...rest]);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight">
                Campus Infrastructure & Gallery ({images.length}/10)
              </h2>
              {isModified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold text-[10px]">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  <span>Modified</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Showcase university auditorium, research labs, library, and grounds to recruiters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isModified && (
            <button
              type="button"
              onClick={onRevert}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Revert Gallery</span>
            </button>
          )}

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={isUploading || images.length >= 10}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5" />
            )}
            <span>Upload Photos</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Direct URL Input Bar */}
      <div className="flex items-center gap-2">
        <input
          type="url"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrl(); } }}
          placeholder="Or paste direct image link (https://...)"
          disabled={images.length >= 10}
          className="flex-1 px-3.5 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-xs font-semibold text-slate-800 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 outline-none transition-all"
        />
        <button
          type="button"
          onClick={() => handleAddUrl()}
          disabled={!newImageUrl.trim() || images.length >= 10}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white disabled:text-slate-400 text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add URL</span>
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
        {images.map((img, idx) => {
          const isPrimary = idx === 0;
          return (
            <div
              key={idx}
              className={`relative group rounded-2xl overflow-hidden border aspect-video bg-slate-100 shadow-2xs transition-all duration-200 ${
                isPrimary ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <img
                src={img}
                alt={`Campus infrastructure ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5" />

              {/* Top Action Buttons (Hover) */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setSelectedPreviewImage(img)}
                  className="p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg backdrop-blur-xs transition-colors cursor-pointer"
                  title="Zoom / View Photo"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                  title="Remove Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary Badge or Make Primary Action */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                {isPrimary ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Primary Hero Cover</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(idx)}
                    className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 hover:bg-white text-slate-800 text-[10px] font-bold backdrop-blur-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Star className="w-2.5 h-2.5 text-amber-500" />
                    <span>Set as Cover</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {images.length === 0 && (
          <div className="col-span-full p-8 sm:p-10 rounded-2xl bg-slate-50/80 border border-dashed border-slate-300 text-center space-y-2">
            <ImageIcon className="w-8 h-8 mx-auto text-slate-400" />
            <h4 className="text-xs font-bold text-slate-700">No campus photos added yet</h4>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Upload photos or paste direct URLs to let corporate recruitment teams explore your campus facilities.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPreviewImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-800">Campus Photo Preview</span>
              <button
                type="button"
                onClick={() => setSelectedPreviewImage(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 bg-slate-950 flex items-center justify-center overflow-hidden max-h-[75vh]">
              <img
                src={selectedPreviewImage}
                alt="Campus Zoom"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
