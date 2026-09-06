'use client';

import React from 'react';
import { TrendingUp, Briefcase, Building2, GraduationCap, Sparkles } from 'lucide-react';
import { KeyInsightItem } from '@/store/useRecruiterAnalyticsStore';

interface RecruiterKeyInsightsCardProps {
  insights: KeyInsightItem[];
}

export function RecruiterKeyInsightsCard({ insights }: RecruiterKeyInsightsCardProps) {
  const items = insights && insights.length > 0 ? insights : [
    {
      id: 'growth',
      type: 'positive',
      icon: 'TrendingUp',
      text: '28% increase in placements compared to last year.',
      highlight: '28% increase',
    },
    {
      id: 'role',
      type: 'info',
      icon: 'Briefcase',
      text: 'Software Engineer is the most hired role across campus drives.',
      highlight: 'Software Engineer',
    },
    {
      id: 'college',
      type: 'highlight',
      icon: 'Building2',
      text: 'IIT Bombay has the highest placement rate (92%).',
      highlight: 'IIT Bombay (92%)',
    },
    {
      id: 'campus',
      type: 'highlight',
      icon: 'GraduationCap',
      text: 'On-campus hiring contributes 78% of total full-time offers.',
      highlight: '78% on-campus',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Briefcase':
        return <Briefcase className="w-3.5 h-3.5 text-blue-600" />;
      case 'Building2':
        return <Building2 className="w-3.5 h-3.5 text-purple-600" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-rose-500" />;
    }
  };

  const getBg = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return 'bg-emerald-50 border-emerald-200/70 text-emerald-700';
      case 'Briefcase':
        return 'bg-blue-50 border-blue-200/70 text-blue-700';
      case 'Building2':
        return 'bg-purple-50 border-purple-200/70 text-purple-700';
      case 'GraduationCap':
      default:
        return 'bg-rose-50 border-rose-200/70 text-rose-700';
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-5 lg:p-6 shadow-2xs flex flex-col justify-between space-y-3 sm:space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-50 text-amber-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0A2540] font-heading">
            Key Insights
          </h3>
        </div>
        <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-wider">
          AI Telemetry
        </span>
      </div>

      {/* Insights List */}
      <div className="space-y-2 sm:space-y-2.5">
        {items.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all cursor-pointer group"
          >
            <span
              className={`p-1.5 rounded-xl shrink-0 shadow-2xs border group-hover:scale-105 transition-transform ${getBg(
                insight.icon
              )}`}
            >
              {getIcon(insight.icon)}
            </span>

            <div className="text-[11.5px] sm:text-xs text-slate-700 font-medium leading-relaxed pt-0.5">
              <span>{insight.text}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

