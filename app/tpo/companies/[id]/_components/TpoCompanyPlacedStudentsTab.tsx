'use client';

import React from 'react';
import Link from 'next/link';
import { Users, GraduationCap, Award, Calendar, ChevronRight, User } from 'lucide-react';

interface PlacedStudentItem {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  branch: string;
  batchYear: number;
  cgpa: number;
  role: string;
  salaryPackage: string;
  placedDate: string;
}

interface TpoCompanyPlacedStudentsTabProps {
  students: PlacedStudentItem[];
  companyName: string;
}

export function TpoCompanyPlacedStudentsTab({
  students,
  companyName,
}: TpoCompanyPlacedStudentsTabProps) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-sm space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">No Placed Students Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          There are no accepted offers or placed candidates recorded for {companyName} yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 pl-5 pr-3">Student Name</th>
              <th className="py-3.5 px-3">Branch & Batch</th>
              <th className="py-3.5 px-3">CGPA</th>
              <th className="py-3.5 px-3">Designation / Role</th>
              <th className="py-3.5 px-3">CTC Package</th>
              <th className="py-3.5 px-3">Offer Date</th>
              <th className="py-3.5 pl-3 pr-5 text-right">Dossier</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {students.map((stu) => (
              <tr key={stu.id} className="hover:bg-slate-50/60 transition-colors">
                {/* Student Avatar + Name */}
                <td className="py-3.5 pl-5 pr-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                      {stu.avatarUrl ? (
                        <img
                          src={stu.avatarUrl}
                          alt={stu.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block truncate">
                        {stu.name}
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        {stu.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Branch & Batch */}
                <td className="py-3.5 px-3 text-slate-700 font-semibold">
                  {stu.branch} • Batch &apos;{String(stu.batchYear).slice(-2)}
                </td>

                {/* CGPA */}
                <td className="py-3.5 px-3 font-bold text-slate-800">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/70 px-2 py-0.5 rounded-lg text-xs">
                    {stu.cgpa}
                  </span>
                </td>

                {/* Role */}
                <td className="py-3.5 px-3 font-bold text-slate-900">
                  {stu.role}
                </td>

                {/* Package */}
                <td className="py-3.5 px-3 font-extrabold text-blue-700">
                  {stu.salaryPackage}
                </td>

                {/* Date */}
                <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                  {stu.placedDate}
                </td>

                {/* Action */}
                <td className="py-3.5 pl-3 pr-5 text-right whitespace-nowrap">
                  <Link
                    href={`/tpo/students/${stu.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 p-1.5 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
