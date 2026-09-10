'use client';

import React from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  Building2, 
  Lock, 
  Sparkles,
  Cpu,
  CheckCircle2,
  Activity
} from 'lucide-react';

export function AdminProfileKpis() {
  const kpiItems = [
    {
      id: 'authority',
      title: 'Authority Tier',
      value: 'Level 0 Root',
      subtitle: 'Highest clearance role',
      icon: ShieldCheck,
      iconBg: 'bg-teal-50 text-[#0D8B8A] border-teal-200/80',
      badge: 'Full RBAC',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      id: 'security',
      title: 'Security Protocol',
      value: 'Argon2 / Bcrypt',
      subtitle: 'Encrypted hash verification',
      icon: KeyRound,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      badge: 'Protected',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'governance',
      title: 'Governance Scope',
      value: 'National Level',
      subtitle: 'All universities & companies',
      icon: Building2,
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
      badge: 'Cross-Tenant',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'session',
      title: 'Session Status',
      value: 'Active & Verified',
      subtitle: 'Authenticated via JWT cookie',
      icon: Lock,
      iconBg: 'bg-slate-100 text-slate-700 border-slate-200/80',
      badge: 'Secured',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <div className="flex lg:grid lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-3 px-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {kpiItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="min-w-[190px] sm:min-w-[220px] lg:min-w-0 flex-1 shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            {/* Top row: Icon + Badge */}
            <div className="flex items-center justify-between gap-2">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.iconBg} transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] sm:text-[10.5px] font-black px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                {item.badge}
              </span>
            </div>

            {/* Middle: Title & Value */}
            <div className="mt-3.5">
              <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-heading truncate">
                {item.value}
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500">
                {item.title}
              </p>
            </div>

            {/* Bottom: Subtitle */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-[10.5px] font-medium text-slate-500">
              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">{item.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
