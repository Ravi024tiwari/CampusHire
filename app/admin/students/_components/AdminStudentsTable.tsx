'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MoreHorizontal, 
  ExternalLink, 
  Mail, 
  UserX, 
  GraduationCap
} from 'lucide-react';
import type { AdminStudentItem } from '@/store/useAdminStore';

interface AdminStudentsTableProps {
  students: AdminStudentItem[];
  isLoading?: boolean;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onViewStudent: (student: AdminStudentItem) => void;
}

export function AdminStudentsTable({
  students,
  isLoading = false,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onViewStudent,
}: AdminStudentsTableProps) {
  // Anchored popover menu state
  const [menuState, setMenuState] = useState<{
    id: string;
    top: number;
    left: number;
    isUpward: boolean;
  } | null>(null);

  // Close menu on scroll or window resize
  useEffect(() => {
    const handleClose = () => setMenuState(null);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, []);

  const handleOpenMenu = (studentId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (menuState?.id === studentId) {
      setMenuState(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const isUpward = spaceBelow < 220;

    setMenuState({
      id: studentId,
      top: isUpward ? rect.top - 8 : rect.bottom + 8,
      left: Math.max(16, rect.right - 190),
      isUpward,
    });
  };

  const isAllSelected = students.length > 0 && selectedIds.length === students.length;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-8 text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D8B8A]" />
          <p className="text-xs font-bold text-slate-500">Loading student directory...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden p-12 text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No students found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Try adjusting your search criteria, college filter, or placement status options.
        </p>
      </div>
    );
  }

  const activeStudent = students.find((s) => s.id === menuState?.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden relative">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[840px] xl:min-w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/85 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all students"
                  className="rounded border-slate-300 text-[#0D8B8A] focus:ring-[#0D8B8A]/30 w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-3">College</th>
              <th className="py-3.5 px-3">Batch</th>
              <th className="py-3.5 px-3">Email</th>
              <th className="py-3.5 px-3">Job Interests</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Placement Status</th>
              <th className="py-3.5 px-3">Joined On</th>
              <th className="py-3.5 px-4 text-center sticky right-0 bg-slate-50/95 backdrop-blur-xs z-10 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.04)]">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {students.map((student) => {
              const isSelected = selectedIds.includes(student.id);
              const isMenuOpen = menuState?.id === student.id;

              // Placement Status Styling
              const placementBadge = {
                Placed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                Interviewing: 'bg-amber-50 text-amber-700 border-amber-200/80',
                Offered: 'bg-blue-50 text-blue-700 border-blue-200/80',
                'Not Placed': 'bg-rose-50 text-rose-700 border-rose-200/80',
              }[student.placementStatus] || 'bg-slate-50 text-slate-700 border-slate-200';

              const formattedDate = new Date(student.joinedOn).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              });

              return (
                <tr
                  key={student.id}
                  className={`hover:bg-teal-50/30 transition-colors group ${
                    isSelected ? 'bg-teal-50/50' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(student.id)}
                      aria-label={`Select ${student.name}`}
                      className="rounded border-slate-300 text-[#0D8B8A] focus:ring-[#0D8B8A]/30 w-4 h-4 cursor-pointer"
                    />
                  </td>

                  {/* Student Name & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0 overflow-hidden">
                        {student.avatarUrl ? (
                          <img
                            src={student.avatarUrl}
                            alt={student.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          student.name.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0 max-w-[150px] sm:max-w-[200px]">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="font-bold text-[#0A2540] hover:text-[#0D8B8A] transition-colors truncate block"
                          title={student.name}
                        >
                          {student.name}
                        </Link>
                        <span className="text-[11px] text-slate-400 font-normal truncate block">
                          #{student.enrollmentNumber}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* College */}
                  <td className="py-3.5 px-3 text-slate-600 truncate max-w-[140px]" title={student.college.name}>
                    {student.college.name}
                  </td>

                  {/* Batch Year */}
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {student.batchYear}
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-3 text-slate-600 truncate max-w-[150px]" title={student.email}>
                    {student.email}
                  </td>

                  {/* Job Interests */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1 flex-wrap max-w-[160px]">
                      {student.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="inline-block px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {student.skills.length > 2 && (
                        <span className="text-[10px] text-slate-400 font-bold">
                          +{student.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Account Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        student.status === 'Active'
                          ? 'bg-teal-50 text-teal-700 border-teal-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          student.status === 'Active' ? 'bg-[#0D8B8A]' : 'bg-slate-400'
                        }`}
                      />
                      {student.status}
                    </span>
                  </td>

                  {/* Placement Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${placementBadge}`}
                    >
                      {student.placementStatus}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-3 text-slate-500 font-medium whitespace-nowrap text-[11px]">
                    {formattedDate}
                  </td>

                  {/* Action Menu (Sticky right) */}
                  <td className="py-3.5 px-4 text-center sticky right-0 bg-white group-hover:bg-[#f6fbfa] transition-colors z-10 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.04)]">
                    <button
                      type="button"
                      onClick={(e) => handleOpenMenu(student.id, e)}
                      aria-label={`Action menu for ${student.name}`}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto transition-all duration-200 cursor-pointer ${
                        isMenuOpen
                          ? 'bg-[#0D8B8A] text-white shadow-xs scale-105'
                          : 'bg-slate-100/80 hover:bg-[#0D8B8A] hover:text-white text-slate-600 border border-slate-200/70'
                      }`}
                    >
                      <MoreHorizontal className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Floating Anchored Popover Menu (Fixed positioning) */}
      {menuState && activeStudent && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-50 bg-transparent"
            onClick={() => setMenuState(null)}
          />

          {/* Popover Dropdown Card */}
          <div
            style={{
              top: `${menuState.top}px`,
              left: `${menuState.left}px`,
              transform: menuState.isUpward ? 'translateY(-100%)' : 'none',
            }}
            className="fixed z-50 w-48 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header info in popover */}
            <div className="px-3.5 py-1.5 border-b border-slate-100 mb-1">
              <p className="text-[11px] font-black text-[#0A2540] truncate">
                {activeStudent.name}
              </p>
              <p className="text-[10px] text-slate-400 font-medium truncate">
                {activeStudent.college?.name || 'Candidate'}
              </p>
            </div>

            {/* 1. View Profile */}
            <Link
              href={`/admin/students/${activeStudent.id}`}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0D8B8A] transition-colors"
              onClick={() => setMenuState(null)}
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0D8B8A]" />
              <span>View Profile</span>
            </Link>

            {/* 2. Contact Email */}
            {activeStudent.email && (
              <a
                href={`mailto:${activeStudent.email}`}
                className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMenuState(null)}
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Contact Email</span>
              </a>
            )}

            <div className="my-1 border-t border-slate-100" />

            {/* 3. Account Action */}
            <button
              type="button"
              onClick={() => {
                setMenuState(null);
                onViewStudent(activeStudent);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <UserX className="w-3.5 h-3.5 text-rose-500" />
              <span>Deactivate Account</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
