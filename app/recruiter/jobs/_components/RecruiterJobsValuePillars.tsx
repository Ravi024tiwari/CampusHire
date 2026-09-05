'use client';

import React from 'react';
import { Laptop, Gauge, Building2, ShieldCheck, Sparkles } from 'lucide-react';

export function RecruiterJobsValuePillars() {
  const pillars = [
    {
      title: 'Access Top Talent',
      subtitle: 'From verified university campuses',
      icon: Laptop,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-100/80',
    },
    {
      title: 'Streamline Hiring',
      subtitle: 'Manage applications, tests & drives',
      icon: Gauge,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-100/80',
    },
    {
      title: 'Grow with Campuses',
      subtitle: 'Build long-term university partnerships',
      icon: Building2,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100/80',
    },
  ];

  return (
    <div className="pt-6 pb-2 border-t border-slate-200/90">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-center">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${p.iconColor} shadow-2xs`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-[#0A2540] truncate">
                  {p.title}
                </h4>
                <p className="text-[11px] font-semibold text-slate-400 truncate">
                  {p.subtitle}
                </p>
              </div>
            </div>
          );
        })}

        {/* National Talent Builder Emblem */}
        <div className="flex items-center justify-center lg:justify-end gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-orange-50/70 via-white to-emerald-50/70 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200">
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-1 bg-[#FF9933] rounded-full shadow-2xs" />
            <div className="w-6 h-1 bg-slate-300 rounded-full" />
            <div className="w-6 h-1 bg-[#138808] rounded-full shadow-2xs" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-black tracking-wider uppercase text-slate-900">
              India&apos;s Talent
            </p>
            <p className="text-[10px] font-black tracking-widest uppercase text-blue-600">
              Builds Tomorrow 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
