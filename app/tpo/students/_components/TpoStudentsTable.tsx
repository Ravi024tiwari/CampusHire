'use strict';
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, ExternalLink, FileText, Eye, Mail, Phone } from 'lucide-react';

export interface StudentRowData {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  isActive: boolean;
  enrollmentNumber: string;
  branch: string;
  batchYear: number;
  cgpa: number;
  phone?: string | null;
  bio?: string | null;
  skills: string[];
  resumeUrl?: string | null;
  isVerified: boolean;
  createdAt: string;
  applicationsCount: number;
  offersCount: number;
  placementStatus: string;
  offerDetails?: {
    id: string;
    companyName: string;
    companyLogoUrl?: string | null;
    designation: string;
    salaryPackage: string;
    location: string;
    joiningDate?: string | null;
    letterUrl?: string | null;
  } | null;
  recentApplications?: Array<{
    id: string;
    jobTitle: string;
    companyName: string;
    companyLogoUrl?: string | null;
    status: string;
    createdAt: string;
  }>;
}

interface TpoStudentsTableProps {
  students: StudentRowData[];
  selectedStudentIds: string[];
  onSelectStudent: (id: string) => void;
  onSelectAll: () => void;
  onViewStudent: (student: StudentRowData) => void;
  isLoading?: boolean;
}

export function TpoStudentsTable({
  students,
  selectedStudentIds,
  onSelectStudent,
  onSelectAll,
  onViewStudent,
  isLoading,
}: TpoStudentsTableProps) {
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close action menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenActionMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allSelected =
    students.length > 0 && selectedStudentIds.length === students.length;
  const isIndeterminate =
    selectedStudentIds.length > 0 && selectedStudentIds.length < students.length;

  const renderPlacementBadge = (status: string) => {
    switch (status) {
      case 'PLACED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Placed
          </span>
        );
      case 'IN_INTERVIEW':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            In Interview
          </span>
        );
      case 'ELIGIBLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Eligible
          </span>
        );
      case 'APPLIED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Applied
          </span>
        );
      case 'NOT_PLACED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Not Placed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
              {/* Checkbox Header */}
              <th className="py-3.5 pl-5 pr-3 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={onSelectAll}
                  aria-label="Select all students"
                  className="w-4 h-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Enrollment No.</th>
              <th className="py-3.5 px-4">Branch</th>
              <th className="py-3.5 px-4">Batch</th>
              <th className="py-3.5 px-4">CGPA</th>
              <th className="py-3.5 px-4 text-center">Applications</th>
              <th className="py-3.5 px-4">Placement Status</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 pr-5 pl-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 pl-5 pr-3 text-center">
                    <div className="w-4 h-4 bg-slate-200 rounded-sm mx-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
                      <div className="space-y-1.5">
                        <div className="w-28 h-3.5 bg-slate-200 rounded-md" />
                        <div className="w-36 h-3 bg-slate-100 rounded-md" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 h-3.5 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-12 h-3.5 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-12 h-3.5 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-10 h-3.5 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="w-8 h-3.5 bg-slate-200 rounded-md mx-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-20 h-6 bg-slate-200 rounded-full" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-14 h-4 bg-slate-200 rounded-md" />
                  </td>
                  <td className="py-4 pr-5 pl-4 text-right">
                    <div className="w-6 h-6 bg-slate-200 rounded-md ml-auto" />
                  </td>
                </tr>
              ))
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400 text-sm">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FileText className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-600">No students found</p>
                    <p className="text-xs text-slate-400">
                      Try adjusting your search criteria or filter options.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const isSelected = selectedStudentIds.includes(student.id);
                const initials = student.name
                  ? student.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)
                  : 'ST';

                return (
                  <tr
                    key={student.id}
                    onClick={() => onViewStudent(student)}
                    className={`hover:bg-blue-50/40 transition-colors group cursor-pointer ${
                      isSelected ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    {/* Row Checkbox */}
                    <td
                      className="py-3.5 pl-5 pr-3 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStudent(student.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectStudent(student.id)}
                        aria-label={`Select student ${student.name}`}
                        className="w-4 h-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                      />
                    </td>

                    {/* Student Avatar + Name + Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {student.avatarUrl ? (
                          <img
                            src={student.avatarUrl}
                            alt={student.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {initials}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-400 truncate">{student.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Enrollment No */}
                    <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                      {student.enrollmentNumber}
                    </td>

                    {/* Branch */}
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                      {student.branch}
                    </td>

                    {/* Batch Year */}
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {student.batchYear}
                    </td>

                    {/* CGPA */}
                    <td className="py-3.5 px-4 text-xs font-bold text-slate-900">
                      {student.cgpa ? student.cgpa.toFixed(1) : '—'}
                    </td>

                    {/* Application Count */}
                    <td className="py-3.5 px-4 text-center text-xs font-semibold text-slate-700">
                      {student.applicationsCount}
                    </td>

                    {/* Placement Status Badge */}
                    <td className="py-3.5 px-4">
                      {renderPlacementBadge(student.placementStatus)}
                    </td>

                    {/* User Status (Active/Inactive) */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            student.isActive ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td
                      className="py-3.5 pr-5 pl-4 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setOpenActionMenuId(
                            openActionMenuId === student.id ? null : student.id
                          )
                        }
                        type="button"
                        aria-label="Student options"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {openActionMenuId === student.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-5 top-10 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95 text-left text-xs"
                        >
                          <button
                            onClick={() => {
                              onViewStudent(student);
                              setOpenActionMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Full Profile</span>
                          </button>

                          {student.resumeUrl && (
                            <a
                              href={student.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setOpenActionMenuId(null)}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Resume</span>
                              <ExternalLink className="w-3 h-3 ml-auto text-slate-400" />
                            </a>
                          )}

                          <a
                            href={`mailto:${student.email}`}
                            onClick={() => setOpenActionMenuId(null)}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email Student</span>
                          </a>

                          {student.phone && (
                            <a
                              href={`tel:${student.phone}`}
                              onClick={() => setOpenActionMenuId(null)}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call Student</span>
                            </a>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
