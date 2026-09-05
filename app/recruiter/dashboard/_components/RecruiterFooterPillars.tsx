'use client';

import React from 'react';
import { 
  GraduationCap, 
  CheckSquare, 
  Bell, 
  BarChart2, 
  ShieldCheck 
} from 'lucide-react';

export function RecruiterFooterPillars() {
  const pillars = [
    {
      icon: GraduationCap,
      title: 'Campus Talent',
      desc: 'Pre-verified student profiles',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: CheckSquare,
      title: 'Streamlined Hiring',
      desc: 'Manage the entire process in one place',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      icon: Bell,
      title: 'Real-time Updates',
      desc: 'Get notified about new applications',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: BarChart2,
      title: 'Data Driven Decisions',
      desc: 'Insights to make better hires',
      color: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <div className="pt-6 space-y-6">
      
      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs"
            >
              <div className={`p-2 rounded-xl ${p.color} shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-800 truncate">
                  {p.title}
                </h4>
                <p className="text-[10.5px] font-medium text-slate-400 truncate">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emblem & Indian Flag Slogan */}
      <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-bold text-slate-700">
            Corporate Hiring Command Active & Verified
          </p>
        </div>

        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <span>HIRE • BUILD • GROW</span>
          <span>🇮🇳</span>
          <span className="hidden md:inline text-slate-400">| Empowering India&apos;s Next Generation</span>
        </p>
      </div>

    </div>
  );
}
