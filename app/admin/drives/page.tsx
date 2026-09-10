'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/axios';
import type { ApiResponse } from '@/lib/api-response';
import { Briefcase, Calendar, MapPin, Building2, Users, Search, Loader2 } from 'lucide-react';
import { AdminDrivesKpiCards } from './_components/AdminDrivesKpiCards';

interface JobItem {
  id: string;
  title: string;
  salaryPackage: string;
  location: string;
  type: string;
  status: string;
  deadline: string;
  createdAt: string;
  company: {
    name: string;
    logoUrl: string | null;
  };
  college: {
    name: string;
    code: string | null;
  };
  _count?: {
    applications: number;
    offers: number;
  };
}

export default function DrivesAdminPage() {
  const [drives, setDrives] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchDrives = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<{ jobs: JobItem[] }>>('/api/admin/jobs?limit=50');
      if (response.data.success && response.data.data) {
        setDrives(response.data.data.jobs || []);
      }
    } catch (err) {
      console.error('Failed to fetch drives:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const filteredPlacementDrives = drives.filter((drive) => {
    if (!search) return true;
    const normalizedSearch = search.toLowerCase().trim();
    return (
      drive.title.toLowerCase().includes(normalizedSearch) ||
      Boolean(drive.company?.name && drive.company.name.toLowerCase().includes(normalizedSearch)) ||
      Boolean(drive.college?.name && drive.college.name.toLowerCase().includes(normalizedSearch))
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-[1700px] mx-auto space-y-5 sm:space-y-6 xl:space-y-8 transition-all duration-300 ease-in-out">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0070F3] border border-blue-200 shadow-2xs shrink-0">
            <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 font-heading tracking-tight">
              Campus Placement Drives & Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-3xl">
              National overview of all recruitment drives scheduled across affiliated universities and engineering institutes.
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search drive, company, or campus..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 sm:py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0070F3] focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 font-medium shadow-xs"
          />
        </div>
      </div>

      {/* KPI Cards Strip - Responsive Smooth Scrollable on Mobile/Tablet */}
      <AdminDrivesKpiCards drives={drives} isLoading={loading} />

      {/* Drives Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 xl:p-8 shadow-xs">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-[#0070F3] mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-slate-600">Loading placement drives...</p>
          </div>
        ) : filteredPlacementDrives.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 mx-auto">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">No Placement Drives Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
              {search ? 'No drives match your search criteria. Try a different keyword.' : 'Recruiter job drives and campus hiring openings will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm xl:text-base">
              <thead className="border-b border-slate-100 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="pb-3.5 xl:pb-4 font-bold">Drive & Role</th>
                  <th className="pb-3.5 xl:pb-4 font-bold">Host University</th>
                  <th className="pb-3.5 xl:pb-4 font-bold">Compensation Package</th>
                  <th className="pb-3.5 xl:pb-4 font-bold">Applicants</th>
                  <th className="pb-3.5 xl:pb-4 font-bold">Deadline</th>
                  <th className="pb-3.5 xl:pb-4 text-right font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlacementDrives.map((drive) => (
                  <tr key={drive.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 xl:py-5 pr-4">
                      <div className="flex items-center gap-3 xl:gap-4">
                        <div className="h-10 w-10 xl:h-12 xl:w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-xs xl:text-sm text-[#0070F3] shadow-2xs">
                          {drive.company?.logoUrl ? (
                            <img src={drive.company.logoUrl} alt={drive.company.name} className="h-full w-full object-cover" />
                          ) : (
                            drive.company?.name ? drive.company.name.slice(0, 2).toUpperCase() : 'CO'
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm sm:text-base xl:text-lg font-heading">{drive.title}</p>
                          <p className="text-xs sm:text-sm text-slate-500">{drive.company?.name} • {drive.type}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 xl:py-5 pr-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-slate-400 shrink-0" />
                        <span className="truncate">{drive.college?.name || 'All Campuses'}</span>
                      </div>
                    </td>

                    <td className="py-4 xl:py-5 pr-4">
                      <span className="font-mono font-bold text-[#0070F3] bg-blue-50 px-2.5 xl:px-3 py-1 rounded-lg border border-blue-200/80 text-xs sm:text-sm xl:text-base inline-block">
                        {drive.salaryPackage}
                      </span>
                    </td>

                    <td className="py-4 xl:py-5 pr-4">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                        <Users className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-slate-400 shrink-0" />
                        <span>{drive._count?.applications || 0} applied</span>
                      </div>
                    </td>

                    <td className="py-4 xl:py-5 pr-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-slate-400 shrink-0" />
                        <span>{new Date(drive.deadline).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-4 xl:py-5 text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 xl:px-3 py-1 text-[11px] xl:text-xs font-black border ${
                          drive.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {drive.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

