'use client';

import React, { useRef } from 'react';
import {
  Award,
  Clock,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Building2,
  DollarSign
} from 'lucide-react';

interface StudentOfferKpiStatsProps {
  offers: any[];
  pendingOffers: any[];
  acceptedOffer: any | null;
}

export function StudentOfferKpiStats({
  offers,
  pendingOffers,
  acceptedOffer,
}: StudentOfferKpiStatsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const highestPackage = acceptedOffer
    ? acceptedOffer.salaryPackage
    : offers.length > 0
    ? offers[0]?.salaryPackage
    : '—';

  const kpis = [
    {
      id: 'total-offers',
      label: 'Offers Received',
      value: offers.length,
      subText: offers.length > 0 ? `${offers.length} placement drives` : 'Drives in progress',
      icon: Award,
      cardBg: 'bg-blue-50/50 hover:bg-blue-50/80 border-blue-200/80 hover:border-blue-300',
      iconBg: 'bg-blue-100/80 text-blue-700',
      numColor: 'text-blue-700',
      textColor: 'text-blue-700',
      actionText: 'View all offers',
    },
    {
      id: 'pending-offers',
      label: 'Action Required',
      value: pendingOffers.length,
      subText: pendingOffers.length > 0 ? `${pendingOffers.length} awaiting decision` : 'All responded',
      icon: Clock,
      cardBg: 'bg-amber-50/50 hover:bg-amber-50/80 border-amber-200/80 hover:border-amber-300',
      iconBg: 'bg-amber-100/80 text-amber-700',
      numColor: 'text-amber-700',
      textColor: 'text-amber-700',
      actionText: pendingOffers.length > 0 ? 'Respond now' : 'Clear',
    },
    {
      id: 'placement-status',
      label: 'Placement Status',
      value: acceptedOffer ? 'Placed 🎉' : 'Active',
      subText: acceptedOffer ? acceptedOffer.company?.name : 'Explore campus drives',
      icon: ShieldCheck,
      cardBg: 'bg-emerald-50/50 hover:bg-emerald-50/80 border-emerald-200/80 hover:border-emerald-300',
      iconBg: 'bg-emerald-100/80 text-emerald-700',
      numColor: 'text-emerald-700',
      textColor: 'text-emerald-700',
      actionText: acceptedOffer ? 'Contract locked' : 'In process',
    },
    {
      id: 'offered-package',
      label: 'Package (CTC)',
      value: highestPackage,
      subText: acceptedOffer ? 'Accepted offer CTC' : 'Drive allocation',
      icon: TrendingUp,
      cardBg: 'bg-purple-50/50 hover:bg-purple-50/80 border-purple-200/80 hover:border-purple-300',
      iconBg: 'bg-purple-100/80 text-purple-700',
      numColor: 'text-purple-700',
      textColor: 'text-purple-700',
      actionText: acceptedOffer ? acceptedOffer.designation : 'Target salary',
    },
  ];

  return (
    <div className="relative group/kpis space-y-2">
      
      {/* Interactive Left & Right Scroll Navigation Arrows (Desktop / Tablet) */}
      <div className="hidden sm:flex items-center justify-between absolute -top-11 right-0 gap-1.5 z-10">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="h-8 w-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition shadow-2xs cursor-pointer"
          title="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="h-8 w-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition shadow-2xs cursor-pointer"
          title="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Smooth Horizontal Scrollable Container with exact matching Dashboard Dimensions */}
      <div
        ref={scrollContainerRef}
        className="flex xl:grid xl:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto xl:overflow-x-visible pb-2 xl:pb-0 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0.5 xl:px-0"
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div
              key={kpi.id}
              className={`min-w-[170px] xs:min-w-[200px] sm:min-w-[230px] md:min-w-[260px] xl:min-w-0 flex-1 shrink-0 snap-start p-4 sm:p-5 rounded-3xl border shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer ${kpi.cardBg}`}
            >
              {/* Top Row: Icon + Number & Label */}
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${kpi.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <p className={`text-xl sm:text-2xl lg:text-3xl font-black font-heading tracking-tight truncate ${kpi.numColor}`}>
                    {kpi.value}
                  </p>
                  <span className="text-xs font-bold text-slate-700 block truncate">
                    {kpi.label}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Subtext & Action Hint */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold">
                <span className={`inline-flex items-center gap-1 truncate ${kpi.textColor}`}>
                  {kpi.subText}
                </span>

                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Touch Swipe Hint for mobile */}
      <div className="flex xl:hidden items-center justify-center gap-1 text-[10.5px] text-slate-400 font-medium pt-0.5">
        <span>← Swipe horizontally to explore key metrics →</span>
      </div>

    </div>
  );
}
