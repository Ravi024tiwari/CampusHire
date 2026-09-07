'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MoreHorizontal, 
  ExternalLink, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Building2,
  Eye,
  AlertCircle
} from 'lucide-react';
import type { AdminCollegeRosterItem } from '@/store/useAdminStore';

interface AdminCollegesTableProps {
  colleges: AdminCollegeRosterItem[];
  isLoading?: boolean;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onVerifyCollege?: (id: string, isVerified: boolean) => void;
}

export function AdminCollegesTable({
  colleges,
  isLoading = false,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onVerifyCollege,
}: AdminCollegesTableProps) {
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

  const handleOpenMenu = (collegeId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (menuState?.id === collegeId) {
      setMenuState(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const isUpward = spaceBelow < 220;

    setMenuState({
      id: collegeId,
      top: isUpward ? rect.top - 8 : rect.bottom + 8,
      left: Math.max(16, rect.right - 200),
      isUpward,
    });
  };

  const isAllSelected = colleges.length > 0 && selectedIds.length === colleges.length;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-12 text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D8B8A]" />
          <p className="text-xs font-bold text-slate-500">Loading colleges directory...</p>
        </div>
      </div>
    );
  }

  if (colleges.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden p-12 text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#0D8B8A] flex items-center justify-center mx-auto">
          <Building2 className="w-7 h-7 stroke-[2]" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No colleges found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Try adjusting your search query, status filter, or location selector.
        </p>
      </div>
    );
  }

  const activeCollege = colleges.find((c) => c.id === menuState?.id);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden relative">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[760px] xl:min-w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/85 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all colleges"
                  className="rounded border-slate-300 text-[#0D8B8A] focus:ring-[#0D8B8A]/30 w-4 h-4 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-4">College Name</th>
              <th className="py-3.5 px-3">Location</th>
              <th className="py-3.5 px-3">Type</th>
              <th className="py-3.5 px-3">Students</th>
              <th className="py-3.5 px-3">Jobs</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Joined On</th>
              <th className="py-3.5 px-4 text-center sticky right-0 bg-slate-50/95 backdrop-blur-xs z-10 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.04)]">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {colleges.map((college) => {
              const isSelected = selectedIds.includes(college.id);
              const isMenuOpen = menuState?.id === college.id;

              // Status Styling
              const statusBadge = {
                Verified: {
                  bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
                  dot: 'bg-emerald-500',
                  text: 'Verified',
                },
                Pending: {
                  bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
                  dot: 'bg-amber-500',
                  text: 'Pending',
                },
                Rejected: {
                  bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
                  dot: 'bg-rose-500',
                  text: 'Rejected',
                },
              }[college.status] || {
                bg: 'bg-slate-50 text-slate-700 border-slate-200',
                dot: 'bg-slate-400',
                text: college.status,
              };

              const formattedDate = new Date(college.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              });

              // Initials for avatar fallback
              const initials = college.code
                ? college.code.slice(0, 3).toUpperCase()
                : college.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

              return (
                <tr
                  key={college.id}
                  className={`hover:bg-teal-50/30 transition-colors group ${
                    isSelected ? 'bg-teal-50/50' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(college.id)}
                      aria-label={`Select ${college.name}`}
                      className="rounded border-slate-300 text-[#0D8B8A] focus:ring-[#0D8B8A]/30 w-4 h-4 cursor-pointer"
                    />
                  </td>

                  {/* College Name & Logo */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D8B8A]/10 to-teal-500/20 border border-[#0D8B8A]/20 flex items-center justify-center shrink-0 text-[#0D8B8A] font-black text-xs shadow-xs">
                        {college.logoUrl ? (
                          <img
                            src={college.logoUrl}
                            alt={college.name}
                            className="w-full h-full object-contain p-1 rounded-xl"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <div className="min-w-0 max-w-[170px] sm:max-w-[220px]">
                        <Link
                          href={`/admin/colleges/${college.id}`}
                          className="text-xs sm:text-sm font-bold text-[#0A2540] hover:text-[#0D8B8A] transition-colors truncate block"
                          title={college.name}
                        >
                          {college.name}
                        </Link>
                        <span className="text-[11px] text-slate-400 font-medium truncate block">
                          {college.code || college.domain || college.city}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {college.location || `${college.city || ''}, ${college.state || ''}`}
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100/80 text-slate-700 text-[11px] font-semibold">
                      {college.type || 'Government'}
                    </span>
                  </td>

                  {/* Students Count */}
                  <td className="py-3.5 px-3 text-slate-800 font-bold whitespace-nowrap">
                    {college.studentsCount?.toLocaleString() || '0'}
                  </td>

                  {/* Jobs Posted */}
                  <td className="py-3.5 px-3 text-slate-800 font-bold whitespace-nowrap">
                    {college.jobsCount || 0}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusBadge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                      {statusBadge.text}
                    </span>
                  </td>

                  {/* Joined On */}
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                    {formattedDate}
                  </td>

                  {/* Action Menu (Sticky right on table) */}
                  <td className="py-3.5 px-4 text-center sticky right-0 bg-white group-hover:bg-[#f6fbfa] transition-colors z-10 shadow-[-6px_0_10px_-4px_rgba(0,0,0,0.04)]">
                    <button
                      type="button"
                      onClick={(e) => handleOpenMenu(college.id, e)}
                      aria-label={`Action menu for ${college.name}`}
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
      {menuState && activeCollege && (
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
            className="fixed z-50 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header info in popover */}
            <div className="px-3.5 py-1.5 border-b border-slate-100 mb-1">
              <p className="text-[11px] font-black text-[#0A2540] truncate">
                {activeCollege.name}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {activeCollege.code || activeCollege.domain || 'Actions'}
              </p>
            </div>

            {/* 1. View Details */}
            <Link
              href={`/admin/colleges/${activeCollege.id}`}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-[#0D8B8A] transition-colors"
              onClick={() => setMenuState(null)}
            >
              <Eye className="w-3.5 h-3.5 text-[#0D8B8A]" />
              <span>View Details</span>
            </Link>

            {/* 2. Verify College */}
            {activeCollege.status !== 'Verified' && onVerifyCollege && (
              <button
                type="button"
                onClick={() => {
                  onVerifyCollege(activeCollege.id, true);
                  setMenuState(null);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verify College</span>
              </button>
            )}

            {/* 3. Revoke Verification */}
            {activeCollege.status === 'Verified' && onVerifyCollege && (
              <button
                type="button"
                onClick={() => {
                  onVerifyCollege(activeCollege.id, false);
                  setMenuState(null);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Revoke Verification</span>
              </button>
            )}

            {/* 4. Contact TPO */}
            {activeCollege.contactEmail && (
              <a
                href={`mailto:${activeCollege.contactEmail}`}
                className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMenuState(null)}
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Contact TPO</span>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}
