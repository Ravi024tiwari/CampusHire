'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus, FileText, UserCheck, Briefcase } from 'lucide-react';

export function TpoQuickActionBar() {
  const actions = [
    {
      label: 'Add Student Manually',
      href: '/tpo/students?action=create',
      icon: UserPlus,
      color: 'hover:border-blue-300 hover:text-blue-700',
    },
    {
      label: 'Share Placement Report',
      href: '/tpo/analytics?export=true',
      icon: FileText,
      color: 'hover:border-indigo-300 hover:text-indigo-700',
    },
    {
      label: 'Invite Recruiters',
      href: '/tpo/recruiters?action=invite',
      icon: UserCheck,
      color: 'hover:border-teal-300 hover:text-teal-700',
    },
    {
      label: 'Manage Job Drives',
      href: '/tpo/jobs',
      icon: Briefcase,
      color: 'hover:border-amber-300 hover:text-amber-700',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Link
              key={idx}
              href={action.href}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-white text-slate-700 text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer ${action.color}`}
            >
              <Icon className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="truncate">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
