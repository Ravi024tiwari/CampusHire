'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { RecentStudentItem } from '@/store/useAdminStore';

interface AdminRecentStudentsCardProps {
  students: RecentStudentItem[];
}

export function AdminRecentStudentsCard({ students }: AdminRecentStudentsCardProps) {
  const items = students || [];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'offered':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'interview':
      case 'interviewed':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'shortlisted':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h2 className="text-base font-extrabold text-slate-900 font-heading tracking-tight">
          Recent Students
        </h2>
        <Link
          href="/admin/students"
          className="text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-0.5 group"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Responsive Table or Empty State */}
      <div className="overflow-x-auto [scrollbar-width:thin] flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 h-full min-h-[140px]">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-700">No students registered yet</p>
            <p className="text-[11px] text-slate-400">Newly onboarded candidates will appear here</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400">
                <th className="pb-2.5 font-bold">Name</th>
                <th className="pb-2.5 font-bold">College</th>
                <th className="pb-2.5 font-bold hidden sm:table-cell">Branch</th>
                <th className="pb-2.5 font-bold">Status</th>
                <th className="pb-2.5 font-bold text-right hidden md:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {items.slice(0, 5).map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                  
                  {/* Candidate Name & Avatar */}
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar size="sm" className="h-7 w-7 border border-slate-200 shrink-0">
                        {st.avatarUrl && <AvatarImage src={st.avatarUrl} alt={st.name} />}
                        <AvatarFallback className="bg-gradient-to-tr from-teal-700 to-emerald-600 text-white font-extrabold text-[10px]">
                          {st.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-extrabold text-slate-800 truncate">
                        {st.name}
                      </span>
                    </div>
                  </td>

                  {/* College */}
                  <td className="py-2.5 pr-2 text-slate-600 truncate max-w-[100px] font-medium">
                    {st.collegeName}
                  </td>

                  {/* Branch */}
                  <td className="py-2.5 pr-2 text-slate-500 font-mono hidden sm:table-cell">
                    {st.branch}
                  </td>

                  {/* Status Badge */}
                  <td className="py-2.5 pr-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${getStatusBadge(
                        st.status
                      )}`}
                    >
                      {st.status}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="py-2.5 text-right text-slate-400 font-mono text-[11px] hidden md:table-cell whitespace-nowrap">
                    {st.joinedAt}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

