'use client';

import React, { useState } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';
import type { UserGrowthDataPoint } from '@/store/useAdminStore';

interface AdminUserGrowthChartProps {
  data: UserGrowthDataPoint[];
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export function AdminUserGrowthChart({
  data,
  timeframe,
  onTimeframeChange,
}: AdminUserGrowthChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // If data is empty, provide dynamic default month points with 0s
  const points = data && data.length > 0 ? data : [
    { month: 'Jan', students: 0, recruiters: 0, colleges: 0 },
    { month: 'Feb', students: 0, recruiters: 0, colleges: 0 },
    { month: 'Mar', students: 0, recruiters: 0, colleges: 0 },
    { month: 'Apr', students: 0, recruiters: 0, colleges: 0 },
    { month: 'May', students: 0, recruiters: 0, colleges: 0 },
    { month: 'Jun', students: 0, recruiters: 0, colleges: 0 },
    { month: 'Jul', students: 0, recruiters: 0, colleges: 0 },
    { month: 'Aug', students: 0, recruiters: 0, colleges: 0 },
  ];

  // Dynamic max value calculation for responsive scaling
  const calculatedMax = Math.max(
    10,
    ...points.map((p) => Math.max(p.students || 0, (p.recruiters || 0) * 10, (p.colleges || 0) * 20))
  );
  // Round up to nice visual interval
  const maxVal = Math.ceil(calculatedMax / 10) * 10 || 50;

  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Calculate coordinates
  const getX = (index: number) => paddingX + (index / Math.max(points.length - 1, 1)) * chartW;
  const getY = (val: number) => paddingY + chartH - (Math.min(val, maxVal) / maxVal) * chartH;

  // Build SVG Path Strings
  const studentsPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.students || 0)}`)
    .join(' ');

  const recruitersPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY((p.recruiters || 0) * 10)}`)
    .join(' ');

  const collegesPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY((p.colleges || 0) * 20)}`)
    .join(' ');

  const yStep = maxVal / 4;
  const yLabels = [0, Math.round(yStep), Math.round(yStep * 2), Math.round(yStep * 3), Math.round(maxVal)];

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between h-full">
      
      {/* Top Header: Title, Legend, and Timeframe Filter Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-100">
        
        {/* Title & Legend */}
        <div className="space-y-1.5">
          <h2 className="text-base font-extrabold text-slate-900 font-heading tracking-tight flex items-center gap-2">
            <span>User Growth</span>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
              Live DB
            </span>
          </h2>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D8B8A]" />
              <span>Students</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBAB23]" />
              <span>Recruiters</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
              <span>Colleges</span>
            </span>
          </div>
        </div>

        {/* Timeframe Dropdown */}
        <div className="relative self-start sm:self-auto shrink-0">
          <select
            value={timeframe}
            onChange={(e) => onTimeframeChange(e.target.value)}
            className="appearance-none pr-7 pl-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-xs font-bold text-slate-700 focus:outline-hidden transition-colors cursor-pointer"
          >
            <option value="8m">Last 8 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

      </div>

      {/* SVG Multi-Line Chart Container */}
      <div className="relative w-full aspect-[2/1] sm:aspect-[2.4/1] min-h-[190px]">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible select-none"
        >
          {/* Y-Axis Grid Lines and Labels */}
          {yLabels.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[9px] font-mono font-bold fill-slate-400"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Line 1: Students (Teal #0D8B8A) */}
          <path
            d={studentsPath}
            fill="none"
            stroke="#0D8B8A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Line 2: Recruiters (Amber #FBAB23) */}
          <path
            d={recruitersPath}
            fill="none"
            stroke="#FBAB23"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Line 3: Colleges (Purple #8B5CF6) */}
          <path
            d={collegesPath}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points and Interaction Circles */}
          {points.map((p, i) => {
            const x = getX(i);
            const yStudents = getY(p.students || 0);
            const isHovered = hoveredIdx === i;

            return (
              <g
                key={p.month}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                {/* Vertical Hover Guide Line */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={svgHeight - paddingY}
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Point: Students */}
                <circle
                  cx={x}
                  cy={yStudents}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#FFFFFF"
                  stroke="#0D8B8A"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />

                {/* Point: Recruiters */}
                <circle
                  cx={x}
                  cy={getY((p.recruiters || 0) * 10)}
                  r={isHovered ? 4.5 : 3}
                  fill="#FFFFFF"
                  stroke="#FBAB23"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                {/* Point: Colleges */}
                <circle
                  cx={x}
                  cy={getY((p.colleges || 0) * 20)}
                  r={isHovered ? 4.5 : 3}
                  fill="#FFFFFF"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                {/* X-Axis Month Label */}
                <text
                  x={x}
                  y={svgHeight - paddingY + 18}
                  textAnchor="middle"
                  className={`text-[10px] font-bold ${
                    isHovered ? 'fill-teal-700 font-extrabold' : 'fill-slate-500'
                  }`}
                >
                  {p.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div
            className="absolute top-2 z-20 pointer-events-none -translate-x-1/2 p-2.5 rounded-xl bg-slate-900 text-white shadow-xl text-xs space-y-1 border border-slate-700 animate-in fade-in duration-150"
            style={{
              left: `${(getX(hoveredIdx) / svgWidth) * 100}%`,
            }}
          >
            <p className="font-extrabold text-[11px] text-teal-300 border-b border-slate-700 pb-0.5">
              Month: {points[hoveredIdx].month}
            </p>
            <div className="space-y-0.5 text-[10.5px]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-teal-400 font-bold">Students:</span>
                <span className="font-mono">{(points[hoveredIdx].students || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-amber-400 font-bold">Recruiters:</span>
                <span className="font-mono">{(points[hoveredIdx].recruiters || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-purple-400 font-bold">Colleges:</span>
                <span className="font-mono">{(points[hoveredIdx].colleges || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

