'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoreHorizontal, ExternalLink, Mail, UserX, GraduationCap } from 'lucide-react';
import type { AdminStudentItem } from '@/store/useAdminStore';

interface AdminStudentsMobileCardListProps {
  students: AdminStudentItem[];
  isLoading?: boolean;
  onViewStudent: (student: AdminStudentItem) => void;
}

export function AdminStudentsMobileCardList({
  students,
  isLoading = false,
  onViewStudent,
}: AdminStudentsMobileCardListProps) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="lg:hidden space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs animate-pulse space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-28 bg-slate-100 rounded-md" />
                <div className="h-3 w-40 bg-slate-100 rounded-md" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-14 bg-slate-100 rounded-md" />
              <div className="h-5 w-14 bg-slate-100 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="lg:hidden bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-800">No students found</h3>
        <p className="text-xs text-slate-500">
          Try adjusting your search criteria or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:hidden space-y-3">
      {students.map((student, index) => {
        const isLowerCard = index >= Math.max(2, students.length - 3);

        // Placement Status Styling
        const placementBadge = {
          Placed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          Interviewing: 'bg-amber-50 text-amber-700 border-amber-200/80',
          Offered: 'bg-blue-50 text-blue-700 border-blue-200/80',
          'Not Placed': 'bg-rose-50 text-rose-700 border-rose-200/80',
        }[student.placementStatus] || 'bg-slate-50 text-slate-700 border-slate-200';

        return (
          <div
            key={student.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3 relative hover:shadow-sm transition-shadow"
          >
            {/* Top Row: Avatar, Name, College & Action */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {student.avatarUrl ? (
                  <Link href={`/admin/students/${student.id}`} className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={student.avatarUrl}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                ) : (
                  <Link href={`/admin/students/${student.id}`} className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0D8B8A] to-teal-400 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                    {student.name.charAt(0).toUpperCase()}
                  </Link>
                )}
                <div>
                  <Link 
                    href={`/admin/students/${student.id}`}
                    className="text-sm font-extrabold text-[#0A2540] font-heading leading-tight hover:text-[#0D8B8A] cursor-pointer block"
                  >
                    {student.name}
                  </Link>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {student.college.name} &bull; {student.batchYear}
                  </p>
                </div>
              </div>

              {/* Status Badges & Action */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Account Status Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    student.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      student.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                  {student.status}
                </span>

                {/* Popover Action Button */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenuId(activeMenuId === student.id ? null : student.id)
                  }
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Row: Skills & Placement Status */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
              {/* Skill Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {student.skills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-sky-800 font-bold text-[10px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Placement Status Badge */}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${placementBadge}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    student.placementStatus === 'Placed'
                      ? 'bg-emerald-500'
                      : student.placementStatus === 'Interviewing'
                      ? 'bg-amber-500'
                      : student.placementStatus === 'Offered'
                      ? 'bg-blue-500'
                      : 'bg-rose-500'
                  }`}
                />
                {student.placementStatus}
              </span>
            </div>

            {/* Popover Action Menu */}
            {activeMenuId === student.id && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setActiveMenuId(null)}
                />
                <div 
                  className={`absolute right-4 w-44 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-30 text-left animate-in fade-in duration-150 ${
                    isLowerCard 
                      ? 'bottom-12 origin-bottom-right slide-in-from-bottom-2' 
                      : 'top-12 origin-top-right slide-in-from-top-2'
                  }`}
                >
                  <Link
                    href={`/admin/students/${student.id}`}
                    onClick={() => setActiveMenuId(null)}
                    className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    View Profile
                  </Link>
                  <a
                    href={`mailto:${student.email}`}
                    className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Contact Email
                  </a>
                  <div className="my-1 border-t border-slate-100" />
                  <button
                    type="button"
                    onClick={() => setActiveMenuId(null)}
                    className="w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <UserX className="w-3.5 h-3.5 text-rose-500" />
                    Deactivate Account
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
