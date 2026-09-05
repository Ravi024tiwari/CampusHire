'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StudentApplicant } from '../_types/recruiter-dashboard.types';
import { 
  FileText, 
  GraduationCap, 
  Clock, 
  Search,
  Filter,
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  User,
  ArrowUpRight
} from 'lucide-react';

interface RecentApplicationsQueueProps {
  applications: StudentApplicant[];
}

export function RecentApplicationsQueue({ applications }: RecentApplicationsQueueProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredApplications = applications.filter((app) => {
    const studentName = app.student?.user?.name?.toLowerCase() || '';
    const studentEmail = app.student?.user?.email?.toLowerCase() || '';
    const jobTitle = app.job?.title?.toLowerCase() || '';
    const collegeName = app.student?.college?.name?.toLowerCase() || '';
    const query = filterQuery.toLowerCase();

    const matchesQuery = !query || studentName.includes(query) || studentEmail.includes(query) || jobTitle.includes(query) || collegeName.includes(query);
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold shadow-2xs">
            Applied
          </span>
        );
      case 'SHORTLISTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold shadow-2xs">
            Shortlisted
          </span>
        );
      case 'INTERVIEW_SCHEDULED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold shadow-2xs">
            Interview
          </span>
        );
      case 'OFFERED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold shadow-2xs">
            Offered
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold shadow-2xs">
            Declined
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold shadow-2xs">
            {status}
          </span>
        );
    }
  };

  return (
    <div id="applications" className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-6 lg:p-7 shadow-xs space-y-5">
      
      {/* 1. Header & Multi-Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-100">
              <FileText className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg lg:text-xl font-extrabold font-heading text-[#0A2540] tracking-tight">
              Live Candidate Pipeline
            </h2>
            <span className="rounded-md bg-purple-50 px-2 py-0.5 text-[10px] sm:text-xs font-black text-purple-700 border border-purple-200">
              {applications.length} Submissions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Real-time applications submitted by students across college placement portals.
          </p>
        </div>

        {/* Filters Strip */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          {/* Search Bar */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search applicant..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-8.5 pr-3 text-xs text-[#0A2540] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 font-medium"
            />
          </div>

          {/* Status Dropdown Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter candidates by status"
            className="rounded-xl border border-slate-200 bg-slate-50/80 py-2 px-3 text-xs font-semibold text-slate-700 focus:border-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 cursor-pointer"
          >
            <option value="ALL">All Stages</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview</option>
            <option value="OFFERED">Offered</option>
          </select>
        </div>
      </div>

      {/* 2. Candidate Submissions Queue */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-[#0A2540]">
            {filterQuery || statusFilter !== 'ALL' ? 'No candidates matching filter criteria' : 'No applications received yet'}
          </p>
          <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
            {filterQuery || statusFilter !== 'ALL' ? 'Try adjusting your search query or status filter.' : 'Student profiles, academic scores, and resumes will appear here when candidates apply.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredApplications.map((app) => {
            const studentUser = app.student?.user;
            const initials = studentUser?.name
              ? studentUser.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
              : 'ST';
            const appliedDate = new Date(app.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            return (
              <div
                key={app.id}
                className="p-3.5 sm:p-4.5 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/70 hover:border-blue-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-2xs group"
              >
                {/* Left: Student Avatar + Academic Profile */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {studentUser?.avatarUrl ? (
                      <Image
                        src={studentUser.avatarUrl}
                        alt={studentUser.name || 'Student'}
                        width={44}
                        height={44}
                        className="rounded-xl object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#0A2540] group-hover:text-[#2563EB] transition-colors truncate">
                        {studentUser?.name || 'Student Candidate'}
                      </span>
                      {app.student?.cgpa && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black shrink-0">
                          {app.student.cgpa} CGPA
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#64748B] pt-0.5">
                      <span className="font-medium text-slate-700 truncate">{app.job?.title}</span>
                      <span>•</span>
                      <span className="truncate">{app.student?.college?.name || 'University'}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Date, Status, Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{appliedDate}</span>
                  </div>

                  {getStatusBadge(app.status)}

                  <button
                    type="button"
                    className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all cursor-pointer shadow-2xs"
                    title="Review Profile"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
