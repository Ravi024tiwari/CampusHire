'use client';

import React from 'react';
import { 
  Laptop, 
  Filter, 
  Bell, 
  Palette, 
  GraduationCap, 
  Sparkles 
} from 'lucide-react';

export function StudentApplicationsFooter() {
  const pillars = [
    {
      icon: Laptop,
      title: 'Responsive Design',
      desc: 'Optimized for all devices',
    },
    {
      icon: Filter,
      title: 'Smart Filtering',
      desc: 'Find applications easily',
    },
    {
      icon: Bell,
      title: 'Real-time Updates',
      desc: 'Get notified about status changes',
    },
    {
      icon: Palette,
      title: 'Clean & Interactive UI',
      desc: 'Built for better user experience',
    },
    {
      icon: GraduationCap,
      title: 'Student Focused',
      desc: 'Designed for your career growth',
    },
  ];

  return (
    <footer className="pt-6 pb-2 space-y-6">
      
      {/* 5 Core Feature Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/70 border border-slate-200/80 shadow-2xs hover:bg-white transition-all"
            >
              <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-[#0A2540] leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[10.5px] font-medium text-slate-400 mt-0.5 leading-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tricolor Tagline & Bottom Signoff */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200/80 text-center sm:text-left">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <div className="h-1 w-6 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full" />
          <span className="text-[11px] font-black tracking-widest text-[#0A2540] uppercase">
            APPLY • LEARN • GROW
          </span>
          <div className="h-1 w-6 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full" />
        </div>

        <p className="text-xs font-bold text-slate-500 italic mx-auto sm:mx-0">
          Your Career Our Support 🇮🇳
        </p>
      </div>

    </footer>
  );
}
