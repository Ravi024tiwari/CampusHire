'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ChevronRight, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';

export function PlacementReadinessCard() {
  const { data } = useStudentDashboardStore();
  const readiness = data?.placementReadiness || {
    subtitle: "You're on the right track!",
    readinessScore: 82,
    milestones: [
      { key: 'resume', label: 'Resume', status: 'completed' },
      { key: 'aptitude', label: 'Aptitude Skills', status: 'completed' },
      { key: 'dsa', label: 'DSA Practice', status: 'in_progress' },
      { key: 'mock', label: 'Mock Interviews', status: 'pending' },
      { key: 'profile', label: 'Profile Completion', status: 'completed' },
    ],
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'in_progress':
        return (
          <div className="relative flex h-4 w-4 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-60" />
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
          </div>
        );
      case 'pending':
      default:
        return <Circle className="w-4 h-4 text-slate-300 shrink-0" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
      
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
            <h2 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
              Placement Readiness
            </h2>
          </div>

          <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {readiness.readinessScore}% Ready
          </span>
        </div>

        <p className="text-xs font-semibold text-slate-500 mt-2">
          {readiness.subtitle}
        </p>
      </div>

      {/* Milestones List */}
      <div className="space-y-2">
        {readiness.milestones.map((m) => (
          <div
            key={m.key}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {renderStatusIcon(m.status)}
              <span className="text-xs font-bold text-slate-700 group-hover:text-[#0A2540] truncate">
                {m.label}
              </span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="pt-2">
        <Link
          href="/student/assessments"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-[#0A2540] hover:text-blue-600 text-xs font-extrabold shadow-2xs transition-all cursor-pointer"
        >
          <span>View Detailed Report</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
