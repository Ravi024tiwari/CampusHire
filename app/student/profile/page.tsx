'use client';

import React, { useEffect } from 'react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';
import { ProfileHeroBanner } from './_components/ProfileHeroBanner';
import { ProfileKpiStats } from './_components/ProfileKpiStats';
import { PersonalInfoCard } from './_components/PersonalInfoCard';
import { ResumeCard } from './_components/ResumeCard';
import { SkillsCard } from './_components/SkillsCard';
import { SocialLinksCard } from './_components/SocialLinksCard';
import { AccountStatusCard } from './_components/AccountStatusCard';
import { RecentActivityCard } from './_components/RecentActivityCard';
import { QuickActionsCard } from './_components/QuickActionsCard';
import { MotivationBanner } from './_components/MotivationBanner';
import { EditProfileModal } from './_components/EditProfileModal';
import { ManageResumeModal } from './_components/ManageResumeModal';
import { EditSkillsModal } from './_components/EditSkillsModal';
import { EditSocialsModal } from './_components/EditSocialsModal';
import { 
  User, 
  FileText, 
  Code2, 
  Globe, 
  Activity, 
  Loader2 
} from 'lucide-react';

export default function StudentProfilePage() {
  const { 
    profile, 
    isLoading, 
    fetchProfile, 
    activeTab, 
    setActiveTab 
  } = useStudentProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading && !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-xs font-bold text-slate-500 tracking-wide">
          Loading student profile...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Hero Profile Banner */}
      <ProfileHeroBanner />

      {/* 2. Responsive Tab Switcher (Visible on Mobile & Tablet) */}
      <div className="lg:hidden flex items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-2xl overflow-x-auto [scrollbar-width:none]">
        {[
          { key: 'overview', label: 'Overview', icon: User },
          { key: 'resume', label: 'Resume', icon: FileText },
          { key: 'skills', label: 'Skills', icon: Code2 },
          { key: 'socials', label: 'Links', icon: Globe },
          { key: 'activity', label: 'Activity', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 min-w-[75px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Key Telemetry & KPI Cards */}
      <ProfileKpiStats />

      {/* 4. Desktop 3-Column Layout (lg screens and up) */}
      <div className="hidden lg:grid grid-cols-12 gap-6 items-start">
        
        {/* Column 1: Personal Info & Recent Activity (4 cols) */}
        <div className="col-span-4 space-y-6">
          <PersonalInfoCard />
          <RecentActivityCard />
        </div>

        {/* Column 2: Resume, Links & Social, Quick Actions (4 cols) */}
        <div className="col-span-4 space-y-6">
          <ResumeCard />
          <SocialLinksCard />
          <QuickActionsCard />
        </div>

        {/* Column 3: Skills, Account Status, Motivation Promo (4 cols) */}
        <div className="col-span-4 space-y-6">
          <SkillsCard />
          <AccountStatusCard />
          <MotivationBanner />
        </div>

      </div>

      {/* 5. Mobile / Tablet Dynamic Tab Content (screens < lg) */}
      <div className="lg:hidden space-y-5">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <PersonalInfoCard />
            <ResumeCard />
            <SkillsCard />
            <SocialLinksCard />
            <AccountStatusCard />
            <QuickActionsCard />
            <div className="sm:col-span-2">
              <RecentActivityCard />
            </div>
            <div className="sm:col-span-2">
              <MotivationBanner />
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="space-y-5">
            <ResumeCard />
            <QuickActionsCard />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-5">
            <SkillsCard />
            <AccountStatusCard />
          </div>
        )}

        {activeTab === 'socials' && (
          <div className="space-y-5">
            <SocialLinksCard />
            <PersonalInfoCard />
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-5">
            <RecentActivityCard />
            <AccountStatusCard />
          </div>
        )}
      </div>

      {/* 6. Footer Emblem / Slogan Banner */}
      <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-bold text-slate-700">
            Student Profile Verified & Active for Placements
          </p>
        </div>

        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <span>LEARN • APPLY • GROW</span>
          <span>🇮🇳</span>
          <span className="hidden md:inline text-slate-400">| Empowering India&apos;s Next Generation</span>
        </p>
      </div>

      {/* 7. Interactive Modals */}
      <EditProfileModal />
      <ManageResumeModal />
      <EditSkillsModal />
      <EditSocialsModal />

    </div>
  );
}
