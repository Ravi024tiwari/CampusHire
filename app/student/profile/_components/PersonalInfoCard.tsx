'use client';

import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Hash, 
  Building, 
  GitBranch, 
  Calendar, 
  GraduationCap, 
  Percent, 
  Edit3 
} from 'lucide-react';
import { useStudentProfileStore } from '@/store/useStudentProfileStore';
import { formatBranchDisplay } from '@/lib/constants/branches';

export function PersonalInfoCard() {
  const { profile, setEditProfileOpen } = useStudentProfileStore();

  if (!profile) return null;

  const infoFields = [
    {
      icon: User,
      label: 'Full Name',
      value: profile.user.name || 'Ravi Tiwari',
    },
    {
      icon: Mail,
      label: 'Email',
      value: profile.user.email || 'ravi.tiwari@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone || '+91 98765 43210',
    },
    {
      icon: Hash,
      label: 'Enrollment No.',
      value: profile.enrollmentNumber || 'GGU/22/CSE/1045',
    },
    {
      icon: Building,
      label: 'College',
      value: profile.college?.name || 'Guru Ghasidas University',
    },
    {
      icon: GitBranch,
      label: 'Branch',
      value: formatBranchDisplay(profile.branch || 'CSE'),
    },
    {
      icon: Calendar,
      label: 'Batch Year',
      value: profile.batchYear ? String(profile.batchYear) : '2026',
    },
    {
      icon: GraduationCap,
      label: 'CGPA',
      value: profile.cgpa ? profile.cgpa.toFixed(2) : '8.75',
    },
    {
      icon: Percent,
      label: '10th Marks',
      value: profile.tenthMarks ? `${profile.tenthMarks}%` : 'Not Specified',
    },
    {
      icon: Percent,
      label: '12th Marks',
      value: profile.twelfthMarks ? `${profile.twelfthMarks}%` : 'Not Specified',
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header with Title and Edit Action */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Personal Information
            </h2>
          </div>

          <button
            onClick={() => setEditProfileOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs hover:bg-blue-700 lg:bg-blue-50 lg:text-blue-700 lg:border lg:border-blue-100 lg:hover:bg-blue-600 lg:hover:text-white lg:hover:border-blue-600 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Info Key-Value List */}
        <div className="space-y-3">
          {infoFields.map((field, idx) => {
            const Icon = field.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 text-xs py-1"
              >
                <div className="flex items-center gap-2 text-slate-500 shrink-0">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{field.label}</span>
                </div>

                <div className="font-semibold text-slate-800 text-right truncate max-w-[200px]">
                  {field.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
