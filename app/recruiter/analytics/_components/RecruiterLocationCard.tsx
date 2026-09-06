'use client';

import React from 'react';
import { MapPin, Building } from 'lucide-react';
import { LocationBreakdownItem } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterLocationCardProps {
  locations: LocationBreakdownItem[];
}

export function RecruiterLocationCard({ locations }: RecruiterLocationCardProps) {
  const locationItems = locations && locations.length > 0 ? locations : [
    { location: 'Bangalore', offers: 420, percentage: 34 },
    { location: 'Hyderabad', offers: 280, percentage: 22 },
    { location: 'Pune', offers: 180, percentage: 14 },
    { location: 'Delhi NCR', offers: 160, percentage: 13 },
    { location: 'Mumbai', offers: 120, percentage: 10 },
    { location: 'Other', offers: 86, percentage: 7 },
  ];

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between space-y-3 sm:space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-emerald-50 text-emerald-600">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0A2540] font-heading">
            Offers by Location
          </h3>
        </div>
        <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          City Hubs
        </span>
      </div>

      {/* Column Headers */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-1">
        <span>City / Hub</span>
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="w-10 text-right">Offers</span>
          <span className="w-18 sm:w-20 text-right">Share</span>
        </div>
      </div>

      {/* City Leaderboard List */}
      <div className="space-y-2 sm:space-y-2.5">
        {locationItems.map((loc) => (
          <div
            key={loc.location}
            className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            {/* City Name */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-7 w-7 sm:h-8 sm:w-8 rounded-xl bg-emerald-50 text-emerald-600 text-xs flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Building className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-extrabold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                {loc.location}
              </span>
            </div>

            {/* Metrics: Offers + Share Bar */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              <span className="w-10 text-right text-xs font-black text-[#0A2540]">
                {loc.offers}
              </span>

              <div className="w-18 sm:w-20 flex items-center justify-end gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-black text-emerald-700 w-7 sm:w-8 text-right">
                  {loc.percentage}%
                </span>
                <div className="w-8 sm:w-10 h-1.5 sm:h-2 rounded-full bg-slate-100 overflow-hidden shrink-0">
                  <div
                    style={{ width: `${Math.min(100, loc.percentage * 2.8)}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
