'use client';

import React from 'react';
import { 
  Bell, 
  Shield, 
  Mail, 
  CheckCircle2, 
  Clock, 
  Activity,
  Layers,
  Sparkles,
  Sliders
} from 'lucide-react';

interface AdminProfilePreferencesTabProps {
  preferences: {
    emailOnNewCollege: boolean;
    emailOnRecruiterSignup: boolean;
    weeklyPlacementDigest: boolean;
    realtimeTelemetry: boolean;
    strictAuditLogging: boolean;
    timezone: string;
  };
  onToggle: (key: string) => void;
  onSelectTimezone: (tz: string) => void;
  onSavePreferences: () => void;
  isSaving: boolean;
}

export function AdminProfilePreferencesTab({
  preferences,
  onToggle,
  onSelectTimezone,
  onSavePreferences,
  isSaving,
}: AdminProfilePreferencesTabProps) {
  return (
    <div className="space-y-6">
      {/* 1. Governance Alerts & Notifications */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
            Governance & Dispatch Alerts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Configure automated system dispatches, email triggers, and operational telemetry.
          </p>
        </div>

        <div className="space-y-3.5">
          {/* Item 1: College Accreditations */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/80 shrink-0">
                <Bell className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  New University Accreditation Requests
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Receive instant notifications when an engineering college or university requests verification.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggle('emailOnNewCollege')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                preferences.emailOnNewCollege ? 'bg-[#0D8B8A]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  preferences.emailOnNewCollege ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Item 2: Recruiter Signups */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D8B8A] flex items-center justify-center border border-teal-200/80 shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Corporate Employer Onboarding Alerts
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Email updates whenever new enterprise recruiters or hiring partners register.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggle('emailOnRecruiterSignup')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                preferences.emailOnRecruiterSignup ? 'bg-[#0D8B8A]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  preferences.emailOnRecruiterSignup ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Item 3: Weekly Digest */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/80 shrink-0">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Weekly National Placement Intelligence Digest
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Consolidated Monday morning report of campus hiring drives, offers, and salary trends.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggle('weeklyPlacementDigest')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                preferences.weeklyPlacementDigest ? 'bg-[#0D8B8A]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  preferences.weeklyPlacementDigest ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Item 4: Strict Audit Trail Logging */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D8B8A] flex items-center justify-center border border-teal-200/80 shrink-0">
                <Shield className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Strict Audit Trail Logging
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Log comprehensive IP addresses, mutation signatures, and timestamps for all root actions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggle('strictAuditLogging')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                preferences.strictAuditLogging ? 'bg-[#0D8B8A]' : 'bg-slate-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  preferences.strictAuditLogging ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 2. Regional Localization & Timezone */}
        <div className="pt-4 border-t border-slate-100">
          <div className="space-y-1.5 max-w-md">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Operational Timezone & Regional Localization</span>
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) => onSelectTimezone(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs cursor-pointer"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST - UTC+05:30)</option>
              <option value="UTC">Universal Coordinated Time (UTC)</option>
              <option value="America/New_York">America/New_York (EST - UTC-05:00)</option>
              <option value="Europe/London">Europe/London (GMT/BST - UTC+00:00)</option>
              <option value="Asia/Singapore">Asia/Singapore (SGT - UTC+08:00)</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onSavePreferences}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0D8B8A] hover:bg-teal-700 text-white transition-all shadow-sm shadow-teal-700/20 active:scale-98 cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
