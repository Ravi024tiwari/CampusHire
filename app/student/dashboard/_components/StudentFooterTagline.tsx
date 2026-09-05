'use client';

import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  Palette, 
  Zap, 
  UserCheck 
} from 'lucide-react';

export function StudentFooterTagline() {
  const highlights = [
    { label: 'Fully Responsive', desc: 'Works on all devices', icon: Monitor },
    { label: 'Mobile First Approach', desc: 'Optimized for small screens', icon: Smartphone },
    { label: 'Modern & Clean UI', desc: 'Curated gradients & typography', icon: Palette },
    { label: 'Interactive Elements', desc: 'Live updates & micro-animations', icon: Zap },
    { label: 'Student Focused', desc: 'Simple, intuitive, actionable', icon: UserCheck },
  ];

  return (
    <div className="pt-6 border-t border-slate-200/90 space-y-6 text-center">
      
      {/* 5 Value Pillars Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs space-y-1">
              <div className="h-7 w-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <p className="text-[11px] font-black text-[#0A2540]">{item.label}</p>
              <p className="text-[10px] font-medium text-slate-400">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Flagship Indian Career Tagline */}
      <div className="flex items-center justify-center gap-2 text-xs font-black tracking-wider uppercase text-slate-400 pt-2">
        <span className="h-0.5 w-8 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full" />
        <span className="text-slate-700">FROM CAMPUS TO CAREER 🇮🇳</span>
        <span className="h-0.5 w-8 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full" />
      </div>

    </div>
  );
}
