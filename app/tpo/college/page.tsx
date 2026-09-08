'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle2, 
  Save, 
  Loader2, 
  Code, 
  Sparkles, 
  AlertCircle, 
  RotateCcw, 
  Check, 
  Eye, 
  RefreshCw,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { useTpoStore } from '@/store/useTpoStore';
import { PrefilledInputField } from './_components/PrefilledInputField';
import { CollegeHeroBanner } from './_components/CollegeHeroBanner';
import { CollegeEmblemCard } from './_components/CollegeEmblemCard';
import { CollegePhotoGallery } from './_components/CollegePhotoGallery';
import { CollegePlacementStatsCard } from './_components/CollegePlacementStatsCard';
import { CollegeStickySaveBar } from './_components/CollegeStickySaveBar';
import { CollegePreviewModal } from './_components/CollegePreviewModal';

interface CollegeData {
  id: string;
  name: string;
  code: string;
  domain: string;
  city: string;
  state: string;
  contactEmail: string;
  contactPhone: string;
  logoUrl: string;
  images: string[];
  isVerified: boolean;
}

const defaultCollegeData: CollegeData = {
  id: '',
  name: 'Delhi Technological University',
  code: 'DTU',
  domain: 'dtu.ac.in',
  city: 'New Delhi',
  state: 'Delhi',
  contactEmail: 'placements@dtu.ac.in',
  contactPhone: '+91 11 2787 1018',
  logoUrl: '',
  images: [
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80'
  ],
  isVerified: true,
};

export default function TpoCollegeProfilePage() {
  const { fetchDashboardData } = useTpoStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Original prefilled data (source of truth from DB)
  const [originalData, setOriginalData] = useState<CollegeData>(defaultCollegeData);
  
  // Current working form data (user interactive edits)
  const [formData, setFormData] = useState<CollegeData>(defaultCollegeData);

  // Placement statistics & TPO records from API
  const [placementStats, setPlacementStats] = useState({
    enrolledStudents: 1420,
    placedStudents: 1180,
    totalOffers: 1540,
    totalApplications: 4890,
    placementRate: 83,
    activeDrives: 24,
  });

  const [tpoOfficers, setTpoOfficers] = useState<any[]>([]);

  // Load college and placement intelligence
  const loadCollegeData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      // 1. Fetch dashboard data to obtain assigned collegeId
      const dashRes = await axios.get('/api/tpo/dashboard');
      let collegeId = '';
      if (dashRes.data.success && dashRes.data.data?.college) {
        collegeId = dashRes.data.data.college.id;
      }

      if (collegeId) {
        // 2. Fetch full comprehensive college profile & stats
        try {
          const collegeRes = await axios.get(`/api/colleges/${collegeId}`);
          if (collegeRes.data.success && collegeRes.data.data) {
            const c = collegeRes.data.data;
            const parsedData: CollegeData = {
              id: c.id || '',
              name: c.name || '',
              code: c.code || '',
              domain: c.domain || '',
              city: c.city || '',
              state: c.state || '',
              contactEmail: c.contactEmail || '',
              contactPhone: c.contactPhone || '',
              logoUrl: c.logoUrl || '',
              images: Array.isArray(c.images) && c.images.length > 0 ? c.images : defaultCollegeData.images,
              isVerified: c.isVerified ?? true,
            };

            setOriginalData(parsedData);
            setFormData(parsedData);

            if (c.placementStats) {
              setPlacementStats(c.placementStats);
            }
            if (c.tpos) {
              setTpoOfficers(c.tpos);
            }
            return;
          }
        } catch (detailErr) {
          console.warn('Failed to fetch detailed college profile, falling back to dashboard college data', detailErr);
        }

        // Fallback to dashboard college
        const c = dashRes.data.data.college;
        const parsedData: CollegeData = {
          id: c.id || '',
          name: c.name || '',
          code: c.code || '',
          domain: c.domain || '',
          city: c.city || '',
          state: c.state || '',
          contactEmail: c.contactEmail || '',
          contactPhone: c.contactPhone || '',
          logoUrl: c.logoUrl || '',
          images: Array.isArray(c.images) && c.images.length > 0 ? c.images : defaultCollegeData.images,
          isVerified: c.isVerified ?? true,
        };
        setOriginalData(parsedData);
        setFormData(parsedData);
      }
    } catch (err: any) {
      console.error('Failed to load college profile:', err);
      setErrorMsg('Could not load college profile from server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCollegeData();
  }, [loadCollegeData]);

  // Field change & revert handlers
  const updateField = <K extends keyof CollegeData>(field: K, value: CollegeData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const revertField = <K extends keyof CollegeData>(field: K) => {
    setFormData((prev) => ({ ...prev, [field]: originalData[field] }));
  };

  const handleResetAll = () => {
    setFormData(originalData);
    setErrorMsg(null);
    setSaveSuccess(false);
  };

  // Calculate modified field count
  const modifiedFields: (keyof CollegeData)[] = (Object.keys(formData) as (keyof CollegeData)[]).filter((key) => {
    if (key === 'images') {
      return JSON.stringify(formData.images) !== JSON.stringify(originalData.images);
    }
    return (formData[key] ?? '').toString().trim() !== (originalData[key] ?? '').toString().trim();
  });

  const isDirty = modifiedFields.length > 0;

  // Save changes to API
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.id) {
      setErrorMsg('College identifier is missing. Please refresh and try again.');
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSaveSuccess(false);

    try {
      const payload = {
        name: formData.name.trim(),
        code: formData.code?.trim() || null,
        domain: formData.domain?.trim() || null,
        city: formData.city?.trim() || null,
        state: formData.state?.trim() || null,
        contactEmail: formData.contactEmail?.trim() || null,
        contactPhone: formData.contactPhone?.trim() || null,
        logoUrl: formData.logoUrl?.trim() || null,
        images: formData.images.filter(Boolean),
      };

      const res = await axios.patch(`/api/colleges/${formData.id}`, payload);
      if (res.data.success) {
        setSaveSuccess(true);
        setOriginalData(formData);
        fetchDashboardData();
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Failed to update college details.';
      setErrorMsg(msg);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center shadow-xs animate-pulse">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Loading College Profile...
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Retrieving verified university identity, placement metrics, and campus gallery.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-7 transition-all duration-300 ease-in-out pb-28 md:pb-16">
      
      {/* 1. Page Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              Campus Management
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-xs font-semibold text-slate-500">
              Institution ID: <span className="font-mono text-slate-700">{formData.code || 'DTU'}</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2540] tracking-tight mt-1">
            College Profile & Institutional Details
          </h1>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
            All fields are prefilled with current active credentials. Edit any element to update campus feeds.
          </p>
        </div>

        {/* Quick Header Actions */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            type="button"
            onClick={loadCollegeData}
            title="Reload from database"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Showcase Preview</span>
          </button>
        </div>
      </div>

      {/* 2. Dynamic Live Hero Banner */}
      <CollegeHeroBanner
        name={formData.name}
        code={formData.code}
        domain={formData.domain}
        city={formData.city}
        state={formData.state}
        logoUrl={formData.logoUrl}
        coverImage={formData.images[0]}
        isVerified={formData.isVerified}
        totalStudents={placementStats.enrolledStudents}
        activeDrives={placementStats.activeDrives}
        onOpenPreview={() => setIsPreviewOpen(true)}
        isDirty={isDirty}
      />

      {/* 3. Alerts (Error / Success) */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>College profile credentials and campus imagery updated successfully!</span>
        </div>
      )}

      {/* 4. Main Edit Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section A: Institutional Identity */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight">
                    Institutional Identity & Accreditation
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Pre-filled university legal name, institutional short code, and academic web domain
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* College Full Name */}
              <PrefilledInputField
                label="College / University Name"
                name="name"
                required
                value={formData.name}
                originalValue={originalData.name}
                onChange={(val) => updateField('name', val)}
                onRevert={() => revertField('name')}
                icon={Building2}
                placeholder="e.g. Delhi Technological University"
                description="Official institutional name as recognized by AICTE / UGC."
              />

              {/* Code & Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PrefilledInputField
                  label="Institution Code"
                  name="code"
                  value={formData.code}
                  originalValue={originalData.code}
                  onChange={(val) => updateField('code', val)}
                  onRevert={() => revertField('code')}
                  icon={Code}
                  placeholder="e.g. DTU"
                  transform="uppercase"
                  description="Unique uppercase acronym used in student roll codes."
                />

                <PrefilledInputField
                  label="Official Domain"
                  name="domain"
                  value={formData.domain}
                  originalValue={originalData.domain}
                  onChange={(val) => updateField('domain', val)}
                  onRevert={() => revertField('domain')}
                  icon={Globe}
                  placeholder="e.g. dtu.ac.in"
                  transform="lowercase"
                  description="Campus email domain for student & recruiter verification."
                />
              </div>
            </div>
          </div>

          {/* Section B: Campus Location */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight">
                    Campus Location & Geographic Zone
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Geographic placement for corporate recruitment visits and interview drives
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PrefilledInputField
                label="City / Campus Metro"
                name="city"
                value={formData.city}
                originalValue={originalData.city}
                onChange={(val) => updateField('city', val)}
                onRevert={() => revertField('city')}
                icon={MapPin}
                placeholder="e.g. New Delhi"
              />

              <PrefilledInputField
                label="State / Province"
                name="state"
                value={formData.state}
                originalValue={originalData.state}
                onChange={(val) => updateField('state', val)}
                onRevert={() => revertField('state')}
                icon={Compass}
                placeholder="e.g. Delhi"
              />
            </div>
          </div>

          {/* Section C: Placement Cell Communication */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-[#0A2540] tracking-tight">
                    Official Placement Cell Contacts
                  </h2>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Corporate contact channels for recruiters, HR teams, and drive coordinators
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PrefilledInputField
                label="TPO Contact Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                originalValue={originalData.contactEmail}
                onChange={(val) => updateField('contactEmail', val)}
                onRevert={() => revertField('contactEmail')}
                icon={Mail}
                placeholder="placements@dtu.ac.in"
                description="Receives corporate drive requests and recruiter queries."
              />

              <PrefilledInputField
                label="Placement Cell Phone / Hotline"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                originalValue={originalData.contactPhone}
                onChange={(val) => updateField('contactPhone', val)}
                onRevert={() => revertField('contactPhone')}
                icon={Phone}
                placeholder="+91 11 2787 1018"
                description="TPO coordinator office telephone line."
              />
            </div>
          </div>

          {/* Section D: Campus Infrastructure Gallery */}
          <CollegePhotoGallery
            images={formData.images}
            originalImages={originalData.images}
            onChange={(imgs) => updateField('images', imgs)}
            onRevert={() => revertField('images')}
          />
        </div>

        {/* Right Column: Emblem, Stats & Publish Card (4 Cols, Sticky) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          
          {/* Institutional Emblem Card */}
          <CollegeEmblemCard
            logoUrl={formData.logoUrl}
            originalLogoUrl={originalData.logoUrl}
            collegeName={formData.name}
            collegeCode={formData.code}
            onChange={(url) => updateField('logoUrl', url)}
            onRevert={() => revertField('logoUrl')}
          />

          {/* Live Placement Intelligence Stats Card */}
          <CollegePlacementStatsCard
            stats={placementStats}
            tpos={tpoOfficers}
          />

          {/* Publish & Save Action Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-[#0A2540] tracking-tight">
                Publish & Save Changes
              </h3>
              {isDirty ? (
                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px]">
                  {modifiedFields.length} modified
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                  All synced
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              <button
                type="submit"
                disabled={isSaving || !isDirty}
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isDirty
                    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Updates...</span>
                  </>
                ) : isDirty ? (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save College Profile</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>All Fields Up to Date</span>
                  </>
                )}
              </button>

              {isDirty && (
                <button
                  type="button"
                  onClick={handleResetAll}
                  disabled={isSaving}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset All to Prefilled Values</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Updates made here immediately reflect on corporate recruiter feeds and student campus headers.
            </p>
          </div>
        </div>

      </form>

      {/* 5. Sticky Bottom Action Bar (when fields are modified) */}
      <CollegeStickySaveBar
        isDirty={isDirty}
        isSaving={isSaving}
        modifiedCount={modifiedFields.length}
        onSave={() => handleSave()}
        onReset={handleResetAll}
      />

      {/* 6. Live Public Preview Modal */}
      <CollegePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        college={formData}
        stats={placementStats}
      />

    </div>
  );
}
