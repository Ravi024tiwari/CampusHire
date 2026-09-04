'use client';

import React, { useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { 
  ScrollText, 
  ShieldCheck, 
  Lock, 
  Briefcase,
  GraduationCap,
  Search,
  CheckCircle2,
  Clock,
  Building2
} from 'lucide-react';

export function AuditLogFeed() {
  const { auditEvents } = useAdminStore();
  const [filterType, setFilterType] = useState<'ALL' | 'VERIFICATION' | 'DRIVE' | 'SECURITY'>('ALL');
  const [search, setSearch] = useState('');

  const filteredEvents = auditEvents.filter((evt) => {
    // 1. Type Filter
    if (filterType !== 'ALL' && evt.type !== filterType) {
      return false;
    }
    // 2. Search Filter
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      evt.action.toLowerCase().includes(q) ||
      evt.actor.toLowerCase().includes(q) ||
      evt.target.toLowerCase().includes(q)
    );
  });

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'VERIFICATION':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'SECURITY':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'DRIVE':
        return 'bg-blue-50 text-[#2563EB] border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getBorderAccent = (type: string) => {
    switch (type) {
      case 'VERIFICATION':
        return 'hover:border-emerald-300 border-l-4 border-l-emerald-500';
      case 'SECURITY':
        return 'hover:border-purple-300 border-l-4 border-l-purple-500';
      case 'DRIVE':
        return 'hover:border-blue-300 border-l-4 border-l-[#2563EB]';
      default:
        return 'hover:border-slate-300 border-l-4 border-l-slate-400';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'VERIFICATION':
        return <GraduationCap className="h-4.5 w-4.5 text-emerald-600" />;
      case 'SECURITY':
        return <ShieldCheck className="h-4.5 w-4.5 text-purple-600" />;
      case 'DRIVE':
        return <Briefcase className="h-4.5 w-4.5 text-[#2563EB]" />;
      default:
        return <ScrollText className="h-4.5 w-4.5 text-slate-500" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'VERIFICATION':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'SECURITY':
        return 'bg-purple-50 text-purple-600 border border-purple-200';
      case 'DRIVE':
        return 'bg-blue-50 text-[#2563EB] border border-blue-200';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  const counts = {
    ALL: auditEvents.length,
    VERIFICATION: auditEvents.filter(e => e.type === 'VERIFICATION').length,
    DRIVE: auditEvents.filter(e => e.type === 'DRIVE').length,
    SECURITY: auditEvents.filter(e => e.type === 'SECURITY').length,
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4.5 sm:p-6 xl:p-8 shadow-xs">
      
      {/* 1. Header with Title and Event Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 xl:pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 xl:h-11 xl:w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200 shadow-2xs shrink-0">
            <ScrollText className="h-5 w-5 xl:h-6 xl:w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg xl:text-2xl font-bold text-[#0A2540] font-heading tracking-tight">
              National Placement Governance & Audit Trail
            </h3>
            <p className="text-xs sm:text-sm xl:text-base text-slate-500">
              Immutable institutional activity stream recording university accreditations, job drives, and administrative authorizations.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-purple-50 px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm font-extrabold text-purple-800 border border-purple-200 shadow-2xs">
          <CheckCircle2 className="h-3.5 w-3.5 text-purple-600" />
          {auditEvents.length} Events Logged
        </span>
      </div>

      {/* 2. Interactive Search & Category Filter Pills */}
      <div className="mt-4 xl:mt-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { id: 'ALL' as const, label: 'All Activities', count: counts.ALL },
            { id: 'VERIFICATION' as const, label: 'Accreditations', count: counts.VERIFICATION },
            { id: 'DRIVE' as const, label: 'Placement Drives', count: counts.DRIVE },
            { id: 'SECURITY' as const, label: 'Governance', count: counts.SECURITY },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-[#2563EB] text-white shadow-xs font-black'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`rounded-md px-1.5 py-0.2 text-[10px] font-mono ${
                filterType === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input Filter */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by university or actor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 pl-8.5 pr-3 text-xs xl:text-sm text-[#0A2540] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 font-medium"
          />
        </div>
      </div>

      {/* 3. Event Cards List */}
      <div className="mt-4 space-y-2.5">
        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <ScrollText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-bold text-[#0A2540]">No matching governance events</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Try selecting another filter or clearing your search.</p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 transition-all shadow-2xs hover:shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${getBorderAccent(evt.type)}`}
            >
              <div className="flex items-start sm:items-center gap-3 xl:gap-3.5">
                <div className={`mt-0.5 sm:mt-0 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl shadow-2xs ${getIconBg(evt.type)}`}>
                  {getIcon(evt.type)}
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm xl:text-base font-extrabold text-[#0A2540] leading-snug">
                    {evt.action}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-slate-700 font-bold">
                      <Building2 className="h-3 w-3 text-slate-400" />
                      {evt.actor}
                    </span>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 font-mono font-bold text-[#2563EB] bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100">
                      {evt.target}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges & Timestamp */}
              <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                <span className={`rounded-md px-2.5 py-0.5 text-[10px] xl:text-xs font-black border ${getBadgeStyle(evt.type)}`}>
                  {evt.type}
                </span>
                
                <span className="flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold text-slate-400">
                  <Clock className="h-3 w-3 text-slate-400" />
                  {evt.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
