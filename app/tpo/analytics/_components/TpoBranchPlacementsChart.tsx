'use client';

import React, { useState } from 'react';

interface BranchItem {
  branch: string;
  fullName: string;
  placed: number;
  eligible: number;
}

interface TpoBranchPlacementsChartProps {
  branchData?: BranchItem[];
}

export function TpoBranchPlacementsChart({ branchData }: TpoBranchPlacementsChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const branches: BranchItem[] = branchData && branchData.length > 0 ? branchData : [];

  if (branches.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4">
        <div className="pb-1 border-b border-slate-100">
          <h3 className="text-base font-bold text-[#0A2540] font-heading">Placements by Branch</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Placed students compared against eligible batch strength</p>
        </div>
        <div className="py-12 text-center text-xs text-slate-400 font-medium">
          No branch records found for this selection.
        </div>
      </div>
    );
  }

  // Dynamically compute max value from real branch data
  const maxRaw = Math.max(...branches.map((b) => Math.max(b.eligible, b.placed)), 1);
  const maxVal = maxRaw < 5 ? 5 : maxRaw < 20 ? 20 : maxRaw < 100 ? 100 : maxRaw < 500 ? 500 : 800;
  const chartHeight = 170;

  const gridSteps = [
    0,
    Math.round(maxVal * 0.25),
    Math.round(maxVal * 0.5),
    Math.round(maxVal * 0.75),
    maxVal,
  ];

  const groupSpacing = Math.max(50, Math.floor(340 / Math.max(branches.length, 2)));
  const totalSvgWidth = Math.max(400, 60 + branches.length * groupSpacing);

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-[#0A2540] font-heading">
            Placements by Branch
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Placed students compared against eligible batch strength
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#2563EB]" />
            <span>Placed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#93C5FD]" />
            <span>Eligible</span>
          </div>
        </div>
      </div>

      {/* SVG Double Bar Chart */}
      <div className="w-full overflow-x-auto no-scrollbar pt-2">
        <div className="min-w-[400px] h-[220px] relative">
          <svg className="w-full h-full" viewBox={`0 0 ${totalSvgWidth} 200`} preserveAspectRatio="none">
            {/* Gridlines */}
            {gridSteps.map((val, i) => {
              const y = chartHeight - (val / maxVal) * (chartHeight - 20);
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
                  <text
                    x="25"
                    y={y + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill="#94A3B8"
                    fontWeight="600"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Double Bar Pairs per Branch */}
            {branches.map((b, idx) => {
              const groupX = 45 + idx * groupSpacing;
              const barWidth = Math.min(18, Math.max(10, Math.floor(groupSpacing * 0.35)));

              const placedHeight = (b.placed / maxVal) * (chartHeight - 20);
              const placedY = chartHeight - placedHeight;

              const eligibleHeight = (b.eligible / maxVal) * (chartHeight - 20);
              const eligibleY = chartHeight - eligibleHeight;

              const isHovered = hoveredIdx === idx;

              return (
                <g
                  key={b.branch}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Placed Bar (Deep Blue #2563EB) */}
                  <rect
                    x={groupX}
                    y={placedY}
                    width={barWidth}
                    height={Math.max(placedHeight, 4)}
                    rx="3"
                    fill="#2563EB"
                  />
                  {/* Placed number */}
                  <text
                    x={groupX + barWidth / 2}
                    y={placedY - 4}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="#0A2540"
                  >
                    {b.placed}
                  </text>

                  {/* Eligible Bar (Light Blue #93C5FD) */}
                  <rect
                    x={groupX + barWidth + 2}
                    y={eligibleY}
                    width={barWidth}
                    height={Math.max(eligibleHeight, 4)}
                    rx="3"
                    fill="#93C5FD"
                  />
                  {/* Eligible number */}
                  <text
                    x={groupX + barWidth + 2 + barWidth / 2}
                    y={eligibleY - 4}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    fill="#64748B"
                  >
                    {b.eligible}
                  </text>

                  {/* Branch label on X-axis */}
                  <text
                    x={groupX + barWidth + 1}
                    y={chartHeight + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    fill={isHovered ? '#2563EB' : '#64748B'}
                  >
                    {b.branch}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
