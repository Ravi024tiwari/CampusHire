'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Globe, 
  MapPin, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Plus, 
  Loader2, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { CompanyProfileData, useRecruiterCompanyStore } from '@/store/useRecruiterCompanyStore';

interface CompanyEditProfileModalProps {
  company: CompanyProfileData;
}

export function CompanyEditProfileModal({ company }: CompanyEditProfileModalProps) {
  const { isEditModalOpen, setEditModalOpen, updateCompanyProfile, isSaving } = useRecruiterCompanyStore();

  const [name, setName] = useState(company.name || '');
  const [website, setWebsite] = useState(company.website || '');
  const [industry, setIndustry] = useState(company.industry || '');
  const [location, setLocation] = useState(company.location || '');
  const [description, setDescription] = useState(company.description || '');
  const [logoUrl, setLogoUrl] = useState(company.logoUrl || '');
  const [images, setImages] = useState<string[]>(company.images || []);

  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (company) {
      setName(company.name || '');
      setWebsite(company.website || '');
      setIndustry(company.industry || '');
      setLocation(company.location || '');
      setDescription(company.description || '');
      setLogoUrl(company.logoUrl || '');
      setImages(company.images || []);
    }
  }, [company]);

  if (!isEditModalOpen) return null;

  // Handle file upload to /api/upload
  const handleFileUpload = async (file: File, category: 'logo' | 'general') => {
    setUploadError(null);
    if (category === 'logo') setIsUploadingLogo(true);
    else setIsUploadingGallery(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const res = await apiClient.post<ApiResponse<{ url: string }>>('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = res.data?.data?.url;
      if (res.data?.success && uploadedUrl) {
        if (category === 'logo') {
          setLogoUrl(uploadedUrl);
        } else {
          setImages((prev) => [...prev, uploadedUrl]);
        }
      } else {
        setUploadError(res.data?.message || 'File upload failed');
      }
    } catch (err: any) {
      setUploadError(err.response?.data?.message || err.message || 'Upload error');
    } finally {
      if (category === 'logo') setIsUploadingLogo(false);
      else setIsUploadingGallery(false);
    }
  };

  const handleAddImageLink = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (idxToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanyProfile({
      name,
      website: website || null,
      industry: industry || null,
      location: location || null,
      description: description || null,
      logoUrl: logoUrl || null,
      images,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0A2540] font-heading">
                Edit Company Profile
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Update organizational branding, culture photos and contact information.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {uploadError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
              {uploadError}
            </div>
          )}

          {/* Logo Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Company Brand Logo</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-slate-50 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <Building2 className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer transition-colors shadow-2xs">
                    {isUploadingLogo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-blue-600" />}
                    <span>Upload Logo Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'logo');
                      }}
                    />
                  </label>
                  {logoUrl && (
                    <button
                      type="button"
                      onClick={() => setLogoUrl('')}
                      className="px-2 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="url"
                  placeholder="Or paste direct logo URL (https://...)"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
                />
              </div>
            </div>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Company Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Google, Microsoft, Adobe"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Official Careers / Website URL</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://careers.google.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Industry / Domain</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Technology, FinTech, E-Commerce"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Primary Location / HQ</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mountain View, CA, USA / Bangalore"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Company Overview & Mission Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your organization's mission, engineering culture, employee benefits, and campus recruitment goals..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 leading-relaxed"
            />
          </div>

          {/* Workplace Photos Gallery Management */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Workplace Gallery Photos ({images.length})</label>
              <label className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                {isUploadingGallery ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>Upload New Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'general');
                  }}
                />
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Or enter image URL (https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20"
              />
              <button
                type="button"
                onClick={handleAddImageLink}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Add Link
              </button>
            </div>

            {/* Photos thumbnail preview list */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="group relative h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-md bg-black/60 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
