'use client';

import React from 'react';
import { 
  Laptop, 
  CheckSquare, 
  ShieldCheck, 
  Building, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export function JobDetailFooterTrustBanner() {
  const pillars = [
    {
      title: 'Explore Opportunities',
      desc: 'Build your dream career',
      icon: Laptop,
      color: 'text-blue-600',
    },
    {
      title: 'Get Placed',
      desc: 'Your future starts here',
      icon: CheckSquare,
      color: 'text-indigo-600',
    },
    {
      title: '🇮🇳 Learn · Apply · Grow',
      desc: "Empowering India's Next Gen",
      icon: Sparkles,
      color: 'text-emerald-600',
    },
    {
      title: 'Trusted by 500+ Companies',
      desc: 'From campus to career',
      icon: Building,
      color: 'text-purple-600',
    },
    {
      title: 'Student First',
      desc: 'Simple, Secure, Reliable',
      icon: HeartHandshake,
      color: 'text-sky-600',
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`flex flex-col items-center text-center space-y-1 ${
                idx > 0 ? 'pt-3 sm:pt-0 sm:pl-4' : ''
              }`}
            >
              <div className={`p-2 rounded-xl bg-slate-50 ${item.color} mb-0.5`}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-black text-[#0A2540] font-heading">
                {item.title}
              </h4>
              <p className="text-[10.5px] text-slate-500 font-medium">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
