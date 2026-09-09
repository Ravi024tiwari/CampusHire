'use client';

import React, { useState } from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface TrendItem {
  year: number;
  studentsPlaced: number;
  placementRate: number;
}

interface TpoPlacementTrendChartProps {
  data?: TrendItem[];
}

export function TpoPlacementTrendChart({ data }: TpoPlacementTrendChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const trends: TrendItem[] = data && data.length > 0 ? data : [];

  if (trends.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4">
        <div className="pb-1 border-b border-slate-100">
          <h3 className="text-base font-bold text-[#0A2540] font-heading">Placement Trend</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Students placed vs. placement rate over the years</p>
        </div>
        <div className="py-12 text-center text-xs text-slate-400 font-medium">
          No historical placement data recorded yet.
        </div>
      </div>
    );
  }

  // Dynamically compute maximum value from real data (min 5 for clean scaling)
  const maxCalculated = Math.max(...trends.map((t) => t.studentsPlaced), 1);
  const maxPlaced = maxCalculated < 10 ? 10 : maxCalculated < 50 ? 50 : maxCalculated < 200 ? 200 : maxCalculated < 1000 ? 1000 : 2000;
  const chartHeight = 180;

  // Grid steps (4 equal intervals)
  const gridSteps = [
    0,
    Math.round(maxPlaced * 0.25),
    Math.round(maxPlaced * 0.5),
    Math.round(maxPlaced * 0.75),
    maxPlaced,
  ];

  // Compute SVG line points for placement rate (0 to 100%)
  const spacing = Math.max(70, Math.floor(300 / Math.max(trends.length, 2)));
  const points = trends.map((item, idx) => {
    const x = 50 + idx * spacing;
    const y = chartHeight - (item.placementRate / 100) * (chartHeight - 30);
    return { x, y, item };
  });

  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const totalSvgWidth = Math.max(380, 70 + trends.length * spacing);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-[#0A2540] font-heading">
            Placement Trend
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Students placed vs. placement rate over the years
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#93C5FD]" />
            <span>Students Placed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rotate-45 bg-[#2563EB]" />
            <span>Placement Rate</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart Container */}
      <div className="relative w-full overflow-x-auto no-scrollbar pt-2">
        <div className="min-w-[380px] h-[240px] relative">
          <svg className="w-full h-full" viewBox={`0 0 ${totalSvgWidth} 220`} preserveAspectRatio="none">
            {/* Horizontal Gridlines */}
            {gridSteps.map((val, i) => {
              const y = chartHeight - (val / maxPlaced) * (chartHeight - 30);
              return (
                <g key={i}>
                  <line
                    x1="30"
                    y1={y}
                    x2={totalSvgWidth - 20}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  {/* Left Axis Label */}
                  <text
                    x="25"
                    y={y + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill="#94A3B8"
                    fontWeight="600"
                  >
                    {val.toLocaleString()}
                  </text>
                  {/* Right Axis Label (%) */}
                  <text
                    x={totalSvgWidth - 15}
                    y={y + 3}
                    textAnchor="start"
                    fontSize="9"
                    fill="#94A3B8"
                    fontWeight="600"
                  >
                    {Math.round((val / maxPlaced) * 100)}%
                  </text>
                </g>
              );
            })}

            {/* Vertical Bar Columns */}
            {trends.map((item, idx) => {
              const barWidth = 32;
              const x = points[idx].x - barWidth / 2;
              const barHeight = (item.studentsPlaced / maxPlaced) * (chartHeight - 30);
              const y = chartHeight - barHeight;
              const isHovered = hoveredIdx === idx;

              return (
                <g
                  key={item.year}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(barHeight, 4)}
                    rx="6"
                    fill={isHovered ? '#2563EB' : '#93C5FD'}
                    className="transition-colors duration-200"
                  />

                  {/* Top value text on bar */}
                  <text
                    x={points[idx].x}
                    y={y - 6}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#0A2540"
                  >
                    {item.studentsPlaced.toLocaleString()}
                  </text>

                  {/* X-Axis Year label */}
                  <text
                    x={points[idx].x}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="bold"
                    fill="#64748B"
                  >
                    {item.year}
                  </text>
                </g>
              );
            })}

            {/* Trend Connecting Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Line Data Points */}
            {points.map((p, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <g key={`point-${idx}`}>
                  {/* Percentage label above line point */}
                  <text
                    x={p.x}
                    y={p.y - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="black"
                    fill="#2563EB"
                  >
                    {p.item.placementRate}%
                  </text>

                  {/* Diamond marker */}
                  <rect
                    x={p.x - 4}
                    y={p.y - 4}
                    width="8"
                    height="8"
                    transform={`rotate(45 ${p.x} ${p.y})`}
                    fill="#2563EB"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    className="transition-transform duration-200"
                    style={{ transform: isHovered ? `rotate(45deg) scale(1.3)` : undefined }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
