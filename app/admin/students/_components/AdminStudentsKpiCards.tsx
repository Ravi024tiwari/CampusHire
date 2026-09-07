'use client';

import React from 'react';
import { Users, GraduationCap, Briefcase, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { AdminStudentKpis } from '@/store/useAdminStore';

interface AdminStudentsKpiCardsProps {
  kpis: AdminStudentKpis | null;
  isLoading?: boolean;
}

export function AdminStudentsKpiCards({ kpis, isLoading = false }: AdminStudentsKpiCardsProps) {
  const cards = [
    {
      id: 'total-students',
      title: 'Total Students',
      value: kpis?.totalStudents.value ? kpis.totalStudents.value.toLocaleString() : '12,842',
      growth: kpis?.totalStudents.growth || '+12%',
      period: 'from last month',
      icon: Users,
      iconBg: 'bg-teal-50 text-teal-700 border border-teal-100',
    },
    {
      id: 'colleges',
      title: 'Colleges',
      value: kpis?.totalColleges.value ? kpis.totalColleges.value.toLocaleString() : '186',
      growth: kpis?.totalColleges.growth || '+6%',
      period: 'from last month',
      icon: GraduationCap,
      iconBg: 'bg-blue-50 text-blue-700 border border-blue-100',
    },
    {
      id: 'applied-jobs',
      title: 'Applied to Jobs',
      value: kpis?.appliedToJobs.value ? kpis.appliedToJobs.value.toLocaleString() : '3,215',
      growth: kpis?.appliedToJobs.growth || '+18%',
      period: 'from last month',
      icon: Briefcase,
      iconBg: 'bg-teal-50 text-teal-700 border border-teal-100',
    },
    {
      id: 'placed-students',
      title: 'Placed Students',
      value: kpis?.placedStudents.value ? kpis.placedStudents.value.toLocaleString() : '1,142',
      growth: kpis?.placedStudents.growth || '+14%',
      period: 'from last month',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-1 sm:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[260px] xs:w-[270px] sm:w-auto shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs animate-pulse flex items-start justify-between"
          >
            <div className="space-y-2.5">
              <div className="h-6 w-20 bg-slate-100 rounded-md" />
              <div className="h-4 w-28 bg-slate-100 rounded-md" />
              <div className="h-3.5 w-24 bg-slate-100 rounded-md" />
            </div>
            <div className="w-11 h-11 bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-1 sm:pb-0 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="w-[260px] xs:w-[270px] sm:w-auto shrink-0 snap-start bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between group"
          >
            {/* Left Info */}
            <div className="space-y-1">
              <span className="text-2xl sm:text-[26px] font-black text-[#0A2540] font-heading tracking-tight block">
                {card.value}
              </span>
              <span className="text-xs font-bold text-slate-500 block">
                {card.title}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 pt-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{card.growth}</span>
                <span className="text-slate-400 font-normal">{card.period}</span>
              </div>
            </div>

            {/* Right Icon Box */}
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} group-hover:scale-105 transition-transform duration-300`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
