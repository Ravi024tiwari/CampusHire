'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Edit3, 
  FileText, 
  Code2, 
  Briefcase, 
  ChevronRight 
} from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';

export function QuickActionsCard() {
  const { 
    setEditProfileOpen, 
    setManageResumeOpen, 
    setEditSkillsOpen 
  } = useStudentProfileStore();

  const actions = [
    {
      icon: Edit3,
      title: 'Edit Profile',
      desc: 'Update your personal details',
      color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
      onClick: () => setEditProfileOpen(true),
    },
    {
      icon: FileText,
      title: 'Manage Resume',
      desc: 'Upload or replace your resume',
      color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
      onClick: () => setManageResumeOpen(true),
    },
    {
      icon: Code2,
      title: 'Add Skills',
      desc: 'Showcase your technical skills',
      color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      onClick: () => setEditSkillsOpen(true),
    },
    {
      icon: Briefcase,
      title: 'View Applied Jobs',
      desc: 'Track your applications',
      color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
      href: '/student/applications',
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
          <Zap className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Quick Actions
          </h2>
        </div>

        {/* Action Items List */}
        <div className="space-y-2">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            const content = (
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg ${act.color} transition-colors shrink-0 shadow-2xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {act.title}
                    </p>
                    <p className="text-[10.5px] text-slate-400 font-medium truncate">
                      {act.desc}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </div>
            );

            if (act.href) {
              return (
                <Link key={idx} href={act.href}>
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={act.onClick}
                className="w-full text-left"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
