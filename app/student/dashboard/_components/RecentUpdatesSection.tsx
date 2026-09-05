'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Calendar, 
  FileText, 
  BookOpen, 
  Building2, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { useStudentDashboardStore } from '@/store/useStudentDashboardStore';

export function RecentUpdatesSection() {
  const { data } = useStudentDashboardStore();
  const updates = data?.recentUpdates || [];

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return (
          <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/70">
            <Calendar className="w-4 h-4" />
          </div>
        );
      case 'document':
        return (
          <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/70">
            <FileText className="w-4 h-4" />
          </div>
        );
      case 'book':
        return (
          <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/70">
            <BookOpen className="w-4 h-4" />
          </div>
        );
      case 'company':
      default:
        return (
          <div className="h-8 w-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/70">
            <Building2 className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4.5 h-4.5 text-blue-600" />
          <h2 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
            Recent Updates
          </h2>
        </div>

        <Link
          href="/student/notifications"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Activity Feed */}
      <div className="space-y-3">
        {updates.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {getUpdateIcon(item.iconType)}
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-[#0A2540] group-hover:text-blue-600 transition-colors truncate">
                  {item.title}
                </p>
                <span className="text-[10.5px] font-semibold text-slate-400">
                  {item.timeAgo}
                </span>
              </div>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </div>
        ))}
      </div>

    </div>
  );
}
