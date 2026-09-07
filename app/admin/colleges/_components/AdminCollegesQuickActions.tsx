'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, CheckCheck, BarChart3, Download } from 'lucide-react';

interface AdminCollegesQuickActionsProps {
  onAddCollege: () => void;
  onVerifyColleges: () => void;
  onExportData: () => void;
}

export function AdminCollegesQuickActions({
  onAddCollege,
  onVerifyColleges,
  onExportData,
}: AdminCollegesQuickActionsProps) {
  const actions = [
    {
      id: 'add-college',
      label: 'Add College',
      icon: Plus,
      iconColor: 'text-[#0D8B8A] bg-teal-50 border border-teal-100',
      onClick: onAddCollege,
    },
    {
      id: 'verify-colleges',
      label: 'Verify Colleges',
      icon: CheckCheck,
      iconColor: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
      onClick: onVerifyColleges,
    },
    {
      id: 'view-reports',
      label: 'View Reports',
      icon: BarChart3,
      iconColor: 'text-sky-600 bg-sky-50 border border-sky-100',
      href: '/admin/reports',
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: Download,
      iconColor: 'text-indigo-600 bg-indigo-50 border border-indigo-100',
      onClick: onExportData,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-sm font-bold text-[#0A2540] font-heading mb-3.5">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          if (act.href) {
            return (
              <Link
                key={act.id}
                href={act.href}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-200 transition-all text-center group cursor-pointer"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform ${act.iconColor}`}
                >
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#0A2540]">
                  {act.label}
                </span>
              </Link>
            );
          }

          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-200 transition-all text-center group cursor-pointer"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform ${act.iconColor}`}
              >
                <Icon className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-[#0A2540]">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
