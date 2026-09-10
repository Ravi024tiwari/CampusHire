'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FileText,
  Settings, 
  ChevronRight,
  Activity
} from 'lucide-react';
import type { PlatformActivityItem } from '@/store/useAdminStore';

interface AdminPlatformActivityCardProps {
  activity: PlatformActivityItem[];
}

export function AdminPlatformActivityCard({ activity }: AdminPlatformActivityCardProps) {
  const items = activity || [];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'RECRUITER_REGISTERED':
        return Building2;
      case 'COLLEGE_VERIFICATION':
        return GraduationCap;
      case 'JOB_POSTED':
        return Briefcase;
      case 'OFFER_ACCEPTED':
        return Award;
      case 'APPLICATION_SUBMITTED':
        return FileText;
      default:
        return Activity;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h2 className="text-base font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-teal-600" />
          <span>Platform Activity</span>
        </h2>
        <Link
          href="/admin/colleges"
          className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-0.5 group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Activity Timeline List or Empty State */}
      <div className="space-y-3 flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 h-full min-h-[140px]">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-700">No platform activity yet</p>
            <p className="text-[11px] text-slate-400">System events and user actions will appear here live</p>
          </div>
        ) : (
          items.slice(0, 5).map((ev) => {
            const IconComponent = getEventIcon(ev.type);

            return (
              <div key={ev.id} className="flex items-start gap-3 group">
                <div
                  className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:scale-110 transition-transform ${ev.color || 'text-teal-700 bg-teal-50 border-teal-200'}`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs font-extrabold text-slate-800 truncate leading-tight">
                      {ev.title}
                    </p>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                    {ev.description}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold block mt-0.5">
                    {ev.timeAgo}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

