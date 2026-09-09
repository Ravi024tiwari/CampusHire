'use client';

import React from 'react';
import { Building2, ArrowRight, Sparkles, Award } from 'lucide-react';
import { ResourceItem, RESOURCES_DATA } from '../_data/resourcesData';

interface CompanyKitsSpotlightProps {
  onOpenReader: (resource: ResourceItem) => void;
}

export function CompanyKitsSpotlight({ onOpenReader }: CompanyKitsSpotlightProps) {
  const companyKits = RESOURCES_DATA.filter((r) => r.category === 'COMPANY_KITS');

  const companyMeta: Record<string, { logoText: string; logoBg: string; avgPackage: string }> = {
    'comp-google-prep': { logoText: 'G', logoBg: 'bg-red-500 text-white', avgPackage: '₹ 25 - 45 LPA' },
    'comp-tcs-nqt-kit': { logoText: 'TCS', logoBg: 'bg-purple-800 text-white', avgPackage: '₹ 3.6 - 9.0 LPA' },
    'comp-microsoft-prep': { logoText: 'MS', logoBg: 'bg-blue-600 text-white', avgPackage: '₹ 20 - 40 LPA' },
    'comp-zoho-kit': { logoText: 'Z', logoBg: 'bg-amber-600 text-white', avgPackage: '₹ 6.5 - 12 LPA' },
  };

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <h2 className="text-base sm:text-lg font-black text-[#0A2540] font-heading">
            Top Recruiter Placement Blueprints
          </h2>
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          Campus hiring patterns & syllabus
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {companyKits.map((kit) => {
          const meta = companyMeta[kit.id] || { logoText: '🏢', logoBg: 'bg-blue-600 text-white', avgPackage: 'Competitive CTC' };

          return (
            <div
              key={kit.id}
              onClick={() => onOpenReader(kit)}
              className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center font-black text-xs shadow-2xs ${meta.logoBg}`}>
                    {meta.logoText}
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                    {meta.avgPackage}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-black text-[#0A2540] font-heading group-hover:text-blue-600 transition-colors line-clamp-2">
                    {kit.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 font-medium">
                    {kit.summary}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] font-bold text-blue-600 group-hover:text-blue-700">
                <span>View Full Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
