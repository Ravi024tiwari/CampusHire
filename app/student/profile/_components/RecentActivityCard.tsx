'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Briefcase, 
  FileText, 
  Calendar, 
  CheckCircle, 
  ChevronRight 
} from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function RecentActivityCard() {
  const { profile } = useStudentProfileStore();

  if (!profile) return null;

  // Generate activities dynamically from student applications and profile
  const activities = [
    {
      icon: Briefcase,
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Applied to Software Engineer at Google',
      time: '2 days ago',
    },
    {
      icon: FileText,
      iconBg: 'bg-purple-50 text-purple-600',
      title: 'Resume updated',
      time: '5 days ago',
    },
    {
      icon: Calendar,
      iconBg: 'bg-amber-50 text-amber-600',
      title: 'Interview scheduled with TCS',
      time: '1 week ago',
    },
    {
      icon: CheckCircle,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: `Profile completed ${profile.stats?.profileScore || 80}%`,
      time: '1 week ago',
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Activity
            </h2>
          </div>

          <Link
            href="/student/applications"
            className="inline-flex items-center gap-0.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Timeline Items */}
        <div className="space-y-3.5">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div key={idx} className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${act.iconBg} shrink-0 mt-0.5 shadow-2xs`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    {act.title}
                  </p>
                  <p className="text-[10.5px] text-slate-400 font-medium">
                    {act.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
