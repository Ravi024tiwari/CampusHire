'use client';

import React from 'react';
import { 
  GitFork, 
  Terminal, 
  Cpu, 
  Layers, 
  Users2, 
  Clock, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { StudentJobItem } from '@/store/useStudentJobsStore';

interface JobDetailSelectionProcessSectionProps {
  job: StudentJobItem;
}

export function JobDetailSelectionProcessSection({ job }: JobDetailSelectionProcessSectionProps) {
  const hiringStages = [
    {
      step: 1,
      title: 'Online Coding & Aptitude Assessment',
      duration: '90 Mins',
      platform: 'HackerEarth / CampusHire Portal',
      description: 'Contains 2 DSA coding problems (Arrays, DP, Graphs) and 20 core CS MCQ questions (OS, DBMS, Computer Networks).',
      icon: Terminal,
      color: 'blue',
    },
    {
      step: 2,
      title: 'Technical Round 1 (DSA & Problem Solving)',
      duration: '45 - 60 Mins',
      platform: 'Google Meet / Video Interview',
      description: 'Live pair programming round focusing on algorithmic problem solving, time/space complexity optimization, and clean code principles.',
      icon: Cpu,
      color: 'indigo',
    },
    {
      step: 3,
      title: 'Technical Round 2 (Systems & Architecture)',
      duration: '45 - 60 Mins',
      platform: 'Virtual Whiteboard Session',
      description: 'Deep dive into candidate resume projects, full-stack architecture, database indexing, caching strategies, and REST API design.',
      icon: Layers,
      color: 'purple',
    },
    {
      step: 4,
      title: 'HR & Cultural Alignment Discussion',
      duration: '30 Mins',
      platform: 'HR Panel Interview',
      description: 'Discussion on behavioral scenarios, collaboration skills, career aspirations, workplace values, and compensation structure.',
      icon: Users2,
      color: 'emerald',
    },
  ];

  return (
    <div id="section-selection-process" className="scroll-mt-28 space-y-6">
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600">
            <GitFork className="w-5 h-5" />
            <h3 className="text-base font-black text-[#0A2540] font-heading">
              Placement Selection Process
            </h3>
          </div>
          <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            4 Structured Rounds
          </span>
        </div>

        {/* 4-Stage Timeline Grid */}
        <div className="space-y-4">
          {hiringStages.map((stage) => {
            const Icon = stage.icon;

            return (
              <div
                key={stage.step}
                className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all duration-200"
              >
                {/* Step Pill */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    0{stage.step}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-sm font-extrabold text-[#0A2540] font-heading">
                      {stage.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{stage.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                    <span>Format:</span>
                    <span className="text-slate-600 font-bold">{stage.platform}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro-Tip Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <p className="font-extrabold text-[#0A2540]">
              Candidate Preparation Advice
            </p>
            <p className="text-slate-600 leading-relaxed">
              Ensure you review your past internships and key projects listed on your selected resume. Interviewers frequently ask you to walk through architecture diagrams and technical trade-offs.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
