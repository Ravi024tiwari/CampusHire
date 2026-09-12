'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  ChevronRight, 
  MoreHorizontal, 
  Clock, 
  Video 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UpcomingInterviewItem } from '../_types/recruiter-dashboard.types';

interface UpcomingInterviewsTableProps {
  interviews: UpcomingInterviewItem[];
}

export function UpcomingInterviewsTable({ interviews }: UpcomingInterviewsTableProps) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
            <Calendar className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
            Upcoming Interviews
          </h3>
        </div>

        <Link
          href="/recruiter/drives"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table / Empty State Container */}
      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 sm:py-12 px-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shadow-2xs">
            <Calendar className="w-6 h-6" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
            No Scheduled Interviews
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
            Candidate interviews scheduled through your hiring pipeline will be listed here.
          </p>
          <Link
            href="/recruiter/interviews"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
          >
            <span>Manage Interviews</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto [scrollbar-width:thin]">
          <table className="w-full text-left border-collapse min-w-[450px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-2">Candidate</th>
                <th className="py-2.5 px-2">Job Title</th>
                <th className="py-2.5 px-2">Date & Time</th>
                <th className="py-2.5 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {interviews.map((item) => {
                const initial = item.candidateName?.charAt(0).toUpperCase() || 'S';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    
                    {/* Candidate */}
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 border border-slate-200 shadow-2xs shrink-0">
                          {item.candidateAvatar && (
                            <AvatarImage src={item.candidateAvatar} alt={item.candidateName} className="object-cover" />
                          )}
                          <AvatarFallback className="bg-gradient-to-tr from-amber-600 to-amber-500 text-white font-bold text-xs">
                            {initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {item.candidateName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="py-3 px-2 font-bold text-slate-800 truncate">
                      {item.jobTitle}
                    </td>

                    {/* Date & Time */}
                    <td className="py-3 px-2 text-[11.5px] font-semibold text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.scheduledAt}</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-2 text-right">
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Interview Actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
