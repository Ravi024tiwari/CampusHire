'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Settings, 
  ChevronRight,
  Activity
} from 'lucide-react';
import type { PlatformActivityItem } from '@/store/useAdminStore';

interface AdminPlatformActivityCardProps {
  activity: PlatformActivityItem[];
}

export function AdminPlatformActivityCard({ activity }: AdminPlatformActivityCardProps) {
  const items = activity && activity.length > 0 ? activity : [
    {
      id: 'act-1',
      type: 'RECRUITER_REGISTERED',
      title: 'New recruiter registered',
      description: 'Tech Mahindra',
      timeAgo: '10 minutes ago',
      timestamp: new Date().toISOString(),
      icon: 'Building2',
      color: 'text-rose-500 bg-rose-50 border-rose-200',
    },
    {
      id: 'act-2',
      type: 'COLLEGE_VERIFICATION',
      title: 'New college verification request',
      description: 'ABC Engineering College',
      timeAgo: '2 hours ago',
      timestamp: new Date().toISOString(),
      icon: 'GraduationCap',
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
    {
      id: 'act-3',
      type: 'JOB_POSTED',
      title: 'New job posted',
      description: 'Google - Software Engineer',
      timeAgo: '3 hours ago',
      timestamp: new Date().toISOString(),
      icon: 'Briefcase',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      id: 'act-4',
      type: 'OFFER_ACCEPTED',
      title: 'Offer accepted',
      description: 'Sneha Patel (NIT Trichy)',
      timeAgo: '5 hours ago',
      timestamp: new Date().toISOString(),
      icon: 'Award',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'act-5',
      type: 'SYSTEM_UPDATE',
      title: 'System update',
      description: 'New features deployed',
      timeAgo: '1 day ago',
      timestamp: new Date().toISOString(),
      icon: 'Settings',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
  ];

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
      default:
        return Settings;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h2 className="text-base font-extrabold text-[#0A2540] font-heading tracking-tight flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-teal-600" />
          <span>Platform Activity</span>
        </h2>
        <Link
          href="/admin/audit"
          className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-0.5 group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3 flex-1">
        {items.slice(0, 5).map((ev) => {
          const IconComponent = getEventIcon(ev.type);

          return (
            <div key={ev.id} className="flex items-start gap-3 group">
              <div
                className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:scale-110 transition-transform ${ev.color}`}
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
        })}
      </div>

    </div>
  );
}
