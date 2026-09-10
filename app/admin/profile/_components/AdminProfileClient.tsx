'use client';

import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import type { ApiResponse } from '@/lib/api-response';
import { 
  AdminProfileHero 
} from './AdminProfileHero';
import { 
  AdminProfileKpis 
} from './AdminProfileKpis';
import { 
  AdminProfileNavTabs, 
  type AdminProfileTabType 
} from './AdminProfileNavTabs';
import { 
  AdminProfileGeneralTab 
} from './AdminProfileGeneralTab';
import { 
  AdminProfileSecurityTab 
} from './AdminProfileSecurityTab';
import { 
  AdminProfilePreferencesTab 
} from './AdminProfilePreferencesTab';
import { 
  AdminProfileAuditTab 
} from './AdminProfileAuditTab';
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  ShieldCheck
} from 'lucide-react';

interface AdminUserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function AdminProfileClient() {
  const { user: authUser, setUser } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<AdminUserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<AdminProfileTabType>('general');

  // General Form Data
  const [generalData, setGeneralData] = useState({
    name: '',
    email: '',
    title: 'Director General & Super Administrator',
    department: 'Directorate of Central Operations & National Placement Cell',
    phone: '+91 (0) 11 2787 1018',
    bio: 'Overseeing nationwide university accreditations, corporate hiring alliances, AI assessment integrity, and platform governance.',
    location: 'New Delhi, India',
  });

  const [initialName, setInitialName] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Security Credentials Data
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Preferences Data
  const [preferences, setPreferences] = useState({
    emailOnNewCollege: true,
    emailOnRecruiterSignup: true,
    weeklyPlacementDigest: true,
    realtimeTelemetry: true,
    strictAuditLogging: true,
    timezone: 'Asia/Kolkata',
  });
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);

  // Toast System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch initial profile
  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<AdminUserProfile>>('/api/admin/profile');
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        setProfile(data);
        setGeneralData((prev) => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
        }));
        setInitialName(data.name || '');
        setAvatarPreview(data.avatarUrl);
      }
    } catch (err: any) {
      console.error('[AdminProfileClient] Error fetching profile:', err);
      showToast(err.response?.data?.message || 'Failed to load Super Admin profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    // Load saved preferences if any
    try {
      const savedPrefs = localStorage.getItem('campushire_admin_prefs');
      if (savedPrefs) {
        setPreferences((prev) => ({ ...prev, ...JSON.parse(savedPrefs) }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Avatar Upload Handler
  const handleAvatarUpload = async (file: File) => {
    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'avatar');

      const uploadRes = await apiClient.post<ApiResponse<{ url: string }>>('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (uploadRes.data.success && uploadRes.data.data?.url) {
        const newUrl = uploadRes.data.data.url;
        setAvatarPreview(newUrl);

        // Auto-persist new avatar directly to admin profile
        const updateRes = await apiClient.patch<ApiResponse<AdminUserProfile>>('/api/admin/profile', {
          avatarUrl: newUrl,
        });

        if (updateRes.data.success && updateRes.data.data) {
          const updated = updateRes.data.data;
          setProfile(updated);
          // Sync with AuthStore
          if (authUser) {
            setUser({
              ...authUser,
              avatarUrl: updated.avatarUrl,
            });
          }
          showToast('Executive profile photo updated successfully');
        }
      }
    } catch (err: any) {
      console.error('[AdminProfileClient] Avatar upload error:', err);
      showToast(err.response?.data?.message || 'Failed to upload profile photo', 'error');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Remove Avatar Handler
  const handleRemoveAvatar = async () => {
    setIsUploadingAvatar(true);
    try {
      const updateRes = await apiClient.patch<ApiResponse<AdminUserProfile>>('/api/admin/profile', {
        avatarUrl: null,
      });

      if (updateRes.data.success && updateRes.data.data) {
        const updated = updateRes.data.data;
        setAvatarPreview(null);
        setProfile(updated);
        if (authUser) {
          setUser({
            ...authUser,
            avatarUrl: null,
          });
        }
        showToast('Profile photo removed');
      }
    } catch (err: any) {
      console.error('[AdminProfileClient] Remove avatar error:', err);
      showToast(err.response?.data?.message || 'Failed to remove avatar', 'error');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Save General Profile
  const handleSaveGeneralProfile = async () => {
    if (!generalData.name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }

    setIsSavingProfile(true);
    try {
      const updateRes = await apiClient.patch<ApiResponse<AdminUserProfile>>('/api/admin/profile', {
        name: generalData.name.trim(),
      });

      if (updateRes.data.success && updateRes.data.data) {
        const updated = updateRes.data.data;
        setProfile(updated);
        setInitialName(updated.name);
        
        // Sync with global auth store
        if (authUser) {
          setUser({
            ...authUser,
            name: updated.name,
          });
        }
        showToast('Super Admin profile updated successfully');
      }
    } catch (err: any) {
      console.error('[AdminProfileClient] Save profile error:', err);
      showToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Update Password
  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = securityData;

    if (!currentPassword) {
      showToast('Please enter your current password', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const updateRes = await apiClient.patch<ApiResponse<AdminUserProfile>>('/api/admin/profile', {
        currentPassword,
        newPassword,
      });

      if (updateRes.data.success) {
        setSecurityData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        showToast('Admin password updated successfully');
      }
    } catch (err: any) {
      console.error('[AdminProfileClient] Password update error:', err);
      showToast(err.response?.data?.message || 'Incorrect current password or update failed', 'error');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Save Governance Preferences
  const handleSavePreferences = () => {
    setIsSavingPreferences(true);
    try {
      localStorage.setItem('campushire_admin_prefs', JSON.stringify(preferences));
      showToast('System governance preferences saved');
    } catch (err) {
      console.error('Error saving preferences:', err);
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const hasUnsavedGeneral = generalData.name.trim() !== initialName;
  const hasUnsavedSecurity = Boolean(securityData.currentPassword || securityData.newPassword || securityData.confirmPassword);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="h-10 w-10 animate-spin text-[#0D8B8A] mb-3" />
        <p className="text-xs sm:text-sm font-bold text-slate-700">Loading Super Admin Profile...</p>
        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Fetching encrypted credentials and clearance metadata</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-7 xl:space-y-8 transition-all duration-300 ease-in-out relative">
      
      {/* Toast Alert Notification Banner */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200 text-xs sm:text-sm font-bold ${
            toast.type === 'success'
              ? 'bg-teal-900/95 text-white border-teal-700 shadow-teal-950/20'
              : toast.type === 'error'
              ? 'bg-rose-900/95 text-white border-rose-700 shadow-rose-950/20'
              : 'bg-slate-900/95 text-white border-slate-700 shadow-slate-950/20'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* 1. Profile Hero Identity Banner */}
      <AdminProfileHero
        user={profile}
        avatarPreview={avatarPreview}
        isUploadingAvatar={isUploadingAvatar}
        onAvatarUpload={handleAvatarUpload}
        onRemoveAvatar={handleRemoveAvatar}
        isSaving={isSavingProfile}
        onSaveProfile={handleSaveGeneralProfile}
        hasUnsavedChanges={hasUnsavedGeneral}
      />

      {/* 2. Executive Clearance KPI Stats Strip (Responsive Smooth Left-to-Right Scroll) */}
      <AdminProfileKpis />

      {/* 3. Navigation Tabs */}
      <AdminProfileNavTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasUnsavedSecurity={hasUnsavedSecurity}
      />

      {/* 4. Active Tab Content View */}
      {activeTab === 'general' && (
        <AdminProfileGeneralTab
          formData={generalData}
          onChange={(field, value) => setGeneralData((prev) => ({ ...prev, [field]: value }))}
          isSaving={isSavingProfile}
          onSave={handleSaveGeneralProfile}
          hasUnsavedChanges={hasUnsavedGeneral}
        />
      )}

      {activeTab === 'security' && (
        <AdminProfileSecurityTab
          securityData={securityData}
          onChange={(field, value) => setSecurityData((prev) => ({ ...prev, [field]: value }))}
          isUpdatingPassword={isUpdatingPassword}
          onUpdatePassword={handleUpdatePassword}
        />
      )}

      {activeTab === 'preferences' && (
        <AdminProfilePreferencesTab
          preferences={preferences}
          onToggle={(key) =>
            setPreferences((prev) => ({
              ...prev,
              [key]: !prev[key as keyof typeof preferences],
            }))
          }
          onSelectTimezone={(tz) => setPreferences((prev) => ({ ...prev, timezone: tz }))}
          onSavePreferences={handleSavePreferences}
          isSaving={isSavingPreferences}
        />
      )}

      {activeTab === 'audit' && (
        <AdminProfileAuditTab user={profile} />
      )}

    </div>
  );
}
