'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Banknote, 
  CheckCircle2, 
  Clock, 
  Users, 
  Eye, 
  Edit3, 
  Lock, 
  Unlock, 
  Trash2, 
  Sparkles 
} from 'lucide-react';
import { RecruiterJobItem } from '@/store/useRecruiterJobsStore';

interface RecruiterJobsTableProps {
  jobs: RecruiterJobItem[];
  onSelectJob: (job: RecruiterJobItem) => void;
  onEditJob: (job: RecruiterJobItem) => void;
  onToggleStatus: (job: RecruiterJobItem) => void;
  onDeleteJob: (job: RecruiterJobItem) => void;
}

export function RecruiterJobsTable({
  jobs,
  onSelectJob,
  onEditJob,
  onToggleStatus,
  onDeleteJob,
}: RecruiterJobsTableProps) {
  if (jobs.length === 0) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10.5px] font-extrabold text-emerald-800 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'PENDING_APPROVAL':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10.5px] font-extrabold text-amber-800 border border-amber-200">
            Pending
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10.5px] font-bold text-slate-700 border border-slate-200">
            Draft
          </span>
        );
      case 'CLOSED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[10.5px] font-extrabold text-red-700 border border-red-200">
            Closed
          </span>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'FULL_TIME':
        return 'Full Time';
      case 'INTERNSHIP':
        return 'Internship';
      case 'INTERN_PLUS_FTE':
        return 'Intern+FTE';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider text-[10.5px]">
              <th className="py-3.5 px-4">Job Role & Campus</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Required Skills</th>
              <th className="py-3.5 px-4">Package</th>
              <th className="py-3.5 px-4">Applicants</th>
              <th className="py-3.5 px-4">Deadline</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {jobs.map((job) => {
              const isExpired = new Date(job.deadline) < new Date();
              const formattedDeadline = new Date(job.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <tr 
                  key={job.id} 
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  {/* Title & College */}
                  <td className="py-3.5 px-4 max-w-[280px]">
                    <div className="space-y-0.5">
                      <Link 
                        href={`/recruiter/jobs/${job.id}`}
                        className="font-extrabold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate text-sm block"
                      >
                        {job.title}
                      </Link>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{job.college.name}</span>
                        {job.college.code && (
                          <span className="font-mono text-[9.5px] bg-slate-100 px-1 py-0.2 rounded text-slate-600">
                            {job.college.code}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-extrabold text-blue-700 border border-blue-200/80">
                      {getTypeBadge(job.type)}
                    </span>
                  </td>

                  {/* Skills */}
                  <td className="py-3.5 px-4 max-w-[220px]">
                    <div className="flex flex-wrap gap-1">
                      {job.skills && job.skills.length > 0 ? (
                        job.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200/70"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">General</span>
                      )}
                      {job.skills && job.skills.length > 3 && (
                        <span className="rounded bg-blue-50 px-1 py-0.5 text-[9.5px] font-bold text-blue-700">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Package */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-extrabold text-emerald-700">
                    {job.salaryPackage}
                  </td>

                  {/* Applicants */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      {job._count?.applications || 0}
                    </span>
                  </td>

                  {/* Deadline */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[11.5px] font-medium ${isExpired ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                        {formattedDeadline}
                      </span>
                      {isExpired && (
                        <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[9.5px] font-extrabold px-1.5 py-0.2 rounded">
                          Expired
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/recruiter/jobs/${job.id}`}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onEditJob(job)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        title="Edit Drive"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(job)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          job.status === 'ACTIVE'
                            ? 'text-red-500 hover:bg-red-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        title={job.status === 'ACTIVE' ? 'Close Drive' : 'Reactivate Drive'}
                      >
                        {job.status === 'ACTIVE' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => onDeleteJob(job)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Drive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
