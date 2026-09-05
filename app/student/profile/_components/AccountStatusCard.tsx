'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function AccountStatusCard() {
  const { profile } = useStudentProfileStore();

  if (!profile) return null;

  const isVerified = profile.isVerified ?? true;

  const checks = [
    { label: 'Identity Verified', passed: true },
    { label: 'College Verified', passed: isVerified },
    { label: 'Eligible for Campus Drives', passed: isVerified },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Account Status
          </h2>
        </div>

        {/* Big Verified Student Highlight */}
        <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100/90 mb-4">
          <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-xs font-bold text-emerald-950">
              Verified Student
            </h3>
            <p className="text-[11px] text-emerald-700 font-medium">
              Your profile is verified by your college.
            </p>
          </div>
        </div>

        {/* Verification Criteria Checklist */}
        <div className="space-y-2.5">
          {checks.map((check, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-700">{check.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
