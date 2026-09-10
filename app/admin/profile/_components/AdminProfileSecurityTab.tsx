'use client';

import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2,
  Cpu,
  ShieldAlert
} from 'lucide-react';

interface AdminProfileSecurityTabProps {
  securityData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onChange: (field: string, value: string) => void;
  isUpdatingPassword: boolean;
  onUpdatePassword: () => void;
}

export function AdminProfileSecurityTab({
  securityData,
  onChange,
  isUpdatingPassword,
  onUpdatePassword,
}: AdminProfileSecurityTabProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { currentPassword, newPassword, confirmPassword } = securityData;

  // Real-time password strength calculation
  const hasMinLength = newPassword.length >= 6;
  const hasStrongLength = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const hasUpper = /[A-Z]/.test(newPassword);
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  let strengthScore = 0;
  if (hasMinLength) strengthScore += 25;
  if (hasStrongLength) strengthScore += 25;
  if (hasNumber && hasUpper) strengthScore += 25;
  if (hasSpecial) strengthScore += 25;

  const strengthColor =
    strengthScore <= 25
      ? 'bg-rose-500'
      : strengthScore <= 50
      ? 'bg-amber-500'
      : strengthScore <= 75
      ? 'bg-teal-500'
      : 'bg-emerald-500';

  const strengthLabel =
    strengthScore <= 25
      ? 'Weak'
      : strengthScore <= 50
      ? 'Moderate'
      : strengthScore <= 75
      ? 'Good'
      : 'Strong Enterprise';

  const canSubmit =
    Boolean(currentPassword) &&
    Boolean(newPassword) &&
    hasMinLength &&
    Boolean(passwordsMatch);

  return (
    <div className="space-y-6">
      {/* 1. Change Password Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 font-heading">
            Credentials & Password Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Maintain stringent access credentials for national platform administrative authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Current Password */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Current Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => onChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
                className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => onChange('newPassword', e.target.value)}
                placeholder="At least 6 characters"
                className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Confirm New Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => onChange('confirmPassword', e.target.value)}
                placeholder="Re-type new password"
                className="w-full h-11 pl-10 pr-11 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B8A]/20 focus:border-[#0D8B8A] shadow-2xs transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Password Strength Meter */}
        {newPassword && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Password Strength</span>
              <span className="font-black text-slate-900">{strengthLabel}</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${strengthColor} transition-all duration-300`}
                style={{ width: `${strengthScore}%` }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-medium text-slate-600 pt-1">
              <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600 font-bold' : ''}`}>
                <CheckCircle2 className="w-3 h-3" /> Min 6 chars
              </span>
              <span className={`flex items-center gap-1 ${hasUpper ? 'text-emerald-600 font-bold' : ''}`}>
                <CheckCircle2 className="w-3 h-3" /> Uppercase letter
              </span>
              <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-600 font-bold' : ''}`}>
                <CheckCircle2 className="w-3 h-3" /> Includes number
              </span>
              <span className={`flex items-center gap-1 ${passwordsMatch ? 'text-emerald-600 font-bold' : ''}`}>
                <CheckCircle2 className="w-3 h-3" /> Passwords match
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onUpdatePassword}
            disabled={!canSubmit || isUpdatingPassword}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
              canSubmit && !isUpdatingPassword
                ? 'bg-[#0D8B8A] hover:bg-teal-700 text-white cursor-pointer active:scale-98 shadow-teal-700/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            {isUpdatingPassword ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Update Admin Credentials</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Security Architecture Info */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D8B8A] flex items-center justify-center border border-teal-200/80">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 font-heading">
              Cryptographic Protocol & Architecture
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Enterprise hashing algorithms and multi-layered token protection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="font-bold text-slate-900">Bcrypt Salt Iterations</p>
            <p className="text-slate-500 mt-0.5">12 rounds of cryptographic salting protects against brute-force attempts.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="font-bold text-slate-900">HttpOnly Session Token</p>
            <p className="text-slate-500 mt-0.5">Strict SameSite cookies prevent cross-site scripting and unauthorized token extraction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
