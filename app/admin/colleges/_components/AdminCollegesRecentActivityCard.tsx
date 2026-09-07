'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, Clock, XCircle, FileText } from 'lucide-react';
import type { AdminCollegeRecentActivityItem } from '@/store/useAdminStore';

interface AdminCollegesRecentActivityCardProps {
  recentActivity: AdminCollegeRecentActivityItem[];
  isLoading?: boolean;
}

export function AdminCollegesRecentActivityCard({
  recentActivity,
  isLoading = false,
}: AdminCollegesRecentActivityCardProps) {
  // Default activities fallback if empty
  const defaultActivities: AdminCollegeRecentActivityItem[] = [
    {
      id: 'act-1',
      title: 'New college registered',
      description: 'ABC Engineering College',
      timeAgo: '2 hours ago',
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      type: 'REGISTRATION',
      color: 'rose',
    },
    {
      id: 'act-2',
      title: 'College verified',
      description: 'LNMIIT Jaipur',
      timeAgo: '5 hours ago',
      timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
      type: 'VERIFICATION',
      color: 'emerald',
    },
    {
      id: 'act-3',
      title: 'Verification request',
      description: 'NIT Patna',
      timeAgo: '1 day ago',
      timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
      type: 'REQUEST',
      color: 'sky',
    },
    {
      id: 'act-4',
      title: 'College rejected',
      description: 'XYZ Institute',
      timeAgo: '2 days ago',
      timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
      type: 'REJECTION',
      color: 'rose',
    },
  ];

  const activities = recentActivity && recentActivity.length > 0 ? recentActivity : defaultActivities;

  const getIcon = (type: string, color: string) => {
    switch (type) {
      case 'VERIFICATION':
        return {
          icon: CheckCircle2,
          bg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
        };
      case 'REJECTION':
        return {
          icon: XCircle,
          bg: 'bg-rose-50 text-rose-600 border border-rose-100',
        };
      case 'REQUEST':
        return {
          icon: Clock,
          bg: 'bg-sky-50 text-sky-600 border border-sky-100',
        };
      case 'REGISTRATION':
      default:
        return {
          icon: Building2,
          bg: 'bg-rose-50 text-rose-500 border border-rose-100',
        };
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs animate-pulse space-y-3">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 w-28 bg-slate-100 rounded-md" />
          <div className="h-3 w-14 bg-slate-100 rounded-md" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-slate-100" />
            <div className="flex-1 space-y-1">
              <div className="h-3 w-32 bg-slate-100 rounded-md" />
              <div className="h-2.5 w-20 bg-slate-100 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Header with View All */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#0A2540] font-heading">
          Recent Activity
        </h3>
        <Link
          href="/admin/activity"
          className="text-xs font-bold text-[#0D8B8A] hover:text-[#0F766E] transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3.5">
        {activities.slice(0, 5).map((act) => {
          const { icon: Icon, bg } = getIcon(act.type, act.color);
          return (
            <div key={act.id} className="flex items-start gap-3 group">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${bg} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {act.title}
                </p>
                <p className="text-[11px] text-slate-500 font-medium truncate">
                  {act.description}
                </p>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                  {act.timeAgo}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
