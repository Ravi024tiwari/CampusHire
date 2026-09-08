'use client';

import React, { useState } from 'react';
import { TrendingUp, BarChart2, Sparkles, Activity } from 'lucide-react';
import type { TpoDashboardData } from '@/store/useTpoStore';

interface PlacementTrendChartProps {
  trends?: TpoDashboardData['placementTrends'];
}

export function PlacementTrendChart({ trends }: PlacementTrendChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedMobileYearIdx, setSelectedMobileYearIdx] = useState<number>(4); // default 2025

  const defaultTrends = [
    { year: 2021, studentsPlaced: 82, placementRate: 48 },
    { year: 2022, studentsPlaced: 110, placementRate: 56 },
    { year: 2023, studentsPlaced: 138, placementRate: 68 },
    { year: 2024, studentsPlaced: 164, placementRate: 74 },
    { year: 2025, studentsPlaced: 192, placementRate: 82 },
  ];

  const data = trends && trends.length > 0 ? trends : defaultTrends;
  const maxStudents = 250;
  const activeMobileData = data[selectedMobileYearIdx] || data[data.length - 1];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col justify-between space-y-4 overflow-hidden w-full min-w-0">
      
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#0A2540] font-heading flex items-center gap-2">
            <span>Placement Trend</span>
            <span className="md:hidden text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              Live Curve
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Number of students placed over the years
          </p>
        </div>

        {/* Desktop Legend */}
        <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-blue-300" />
            <span>Students Placed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-blue-200" />
            <span>Placement %</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. MOBILE/SMALL SCREENS (<md): Interactive Line Diagram    */}
      {/* ========================================================= */}
      <div className="block md:hidden space-y-3.5 pt-1">
        
        {/* Mobile Active Metric Snapshot */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/50 border border-blue-100/90 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Batch Class {activeMobileData.year}
            </span>
            <h4 className="text-xl font-black text-[#0A2540] font-heading leading-tight">
              {activeMobileData.studentsPlaced} <span className="text-xs font-bold text-slate-500 font-sans">Placed</span>
            </h4>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-sm font-black text-blue-600 font-mono bg-white px-2.5 py-1 rounded-xl shadow-2xs border border-blue-100">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              {activeMobileData.placementRate}% Rate
            </span>
          </div>
        </div>

        {/* Clean Interactive SVG Line Curve */}
        <div className="relative h-28 w-full py-2">
          
          <svg className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="mobileCurveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Fill under Curve */}
            <polygon
              fill="url(#mobileCurveGradient)"
              points={`
                0,100
                ${data
                  .map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - ((d.placementRate - 40) / 50) * 80;
                    return `${x}%,${y}%`;
                  })
                  .join(' ')}
                100%,100
              `}
            />

            {/* Smooth Connected Line */}
            <polyline
              fill="none"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data
                .map((d, i) => {
                  const x = (i / (data.length - 1)) * 100;
                  const y = 100 - ((d.placementRate - 40) / 50) * 80;
                  return `${x}%,${y}%`;
                })
                .join(' ')}
            />

            {/* Interactive Node Circles */}
            {data.map((d, i) => {
              const xPct = (i / (data.length - 1)) * 100;
              const yPct = 100 - ((d.placementRate - 40) / 50) * 80;
              const isSelected = selectedMobileYearIdx === i;

              return (
                <g key={d.year} onClick={() => setSelectedMobileYearIdx(i)} className="cursor-pointer">
                  <circle
                    cx={`${xPct}%`}
                    cy={`${yPct}%`}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? '#2563EB' : '#FFFFFF'}
                    stroke="#2563EB"
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

        </div>

        {/* Year Pills for Quick Tapping on Mobile */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {data.map((d, i) => {
            const isSelected = selectedMobileYearIdx === i;
            return (
              <button
                key={d.year}
                type="button"
                onClick={() => setSelectedMobileYearIdx(i)}
                className={`py-1 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d.year}
              </button>
            );
          })}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP / TABLET (md+): Full Bar + Line Chart Overlay   */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative pt-6 pb-2 min-h-[220px] items-end">
        
        {/* Background Grid Lines (Y-Axis) */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] font-mono text-slate-400">
          <div className="border-b border-slate-100 flex items-center justify-between">
            <span>250</span>
            <span>100%</span>
          </div>
          <div className="border-b border-slate-100 flex items-center justify-between">
            <span>200</span>
            <span>80%</span>
          </div>
          <div className="border-b border-slate-100 flex items-center justify-between">
            <span>150</span>
            <span>60%</span>
          </div>
          <div className="border-b border-slate-100 flex items-center justify-between">
            <span>100</span>
            <span>40%</span>
          </div>
          <div className="border-b border-slate-100 flex items-center justify-between">
            <span>50</span>
            <span>20%</span>
          </div>
          <div className="border-b border-slate-200 flex items-center justify-between">
            <span>0</span>
            <span>0%</span>
          </div>
        </div>

        {/* SVG Trend Line Overlay */}
        <svg className="absolute inset-x-8 top-6 bottom-8 w-[calc(100%-4rem)] h-[calc(100%-3.5rem)] overflow-visible pointer-events-none">
          <polyline
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data
              .map((d, i) => {
                const xPct = (i / (data.length - 1)) * 100;
                const yPct = 100 - (d.placementRate / 100) * 100;
                return `${xPct}%,${yPct}%`;
              })
              .join(' ')}
          />
        </svg>

        {/* Column Bars & Hover Points */}
        <div className="relative z-10 w-full flex items-end justify-around px-4">
          {data.map((item, idx) => {
            const barHeightPct = (item.studentsPlaced / maxStudents) * 100;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.year}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex flex-col items-center group cursor-pointer relative"
              >
                {/* Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-14 z-30 bg-[#0A2540] text-white text-[11px] font-bold py-1 px-2.5 rounded-xl shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
                    <p className="text-blue-300 font-mono">{item.year}</p>
                    <p>{item.studentsPlaced} Placed ({item.placementRate}%)</p>
                  </div>
                )}

                {/* Line Data Point Node */}
                <div
                  className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white shadow-md transition-transform duration-200 group-hover:scale-125 mb-1"
                  style={{
                    marginBottom: `${barHeightPct * 1.5}px`,
                  }}
                />

                {/* Bar */}
                <div
                  className={`w-12 sm:w-16 rounded-t-xl transition-all duration-300 ${
                    isHovered
                      ? 'bg-blue-500 shadow-md'
                      : 'bg-blue-200/90 group-hover:bg-blue-300'
                  }`}
                  style={{ height: `${Math.max(barHeightPct * 1.5, 30)}px` }}
                >
                  <span className="block text-center text-[10px] font-bold text-blue-900 pt-1 font-mono">
                    {item.studentsPlaced}
                  </span>
                </div>

                {/* X-Axis Year Label */}
                <span className="text-xs font-bold text-slate-600 mt-2 font-mono">
                  {item.year}
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
