'use client';

import React, { useState } from 'react';

interface SalaryDistributionData {
  '0-5 LPA': number;
  '5-10 LPA': number;
  '10-20 LPA': number;
  '20-30 LPA': number;
  '30+ LPA': number;
}

interface TpoSalaryDistributionChartProps {
  distribution?: SalaryDistributionData;
}

export function TpoSalaryDistributionChart({
  distribution,
}: TpoSalaryDistributionChartProps) {
  const [hoveredBracket, setHoveredBracket] = useState<string | null>(null);

  const data = distribution || {
    '0-5 LPA': 0,
    '5-10 LPA': 0,
    '10-20 LPA': 0,
    '20-30 LPA': 0,
    '30+ LPA': 0,
  };

  const brackets = [
    { label: '0-5 LPA', count: data['0-5 LPA'] || 0 },
    { label: '5-10 LPA', count: data['5-10 LPA'] || 0 },
    { label: '10-20 LPA', count: data['10-20 LPA'] || 0 },
    { label: '20-30 LPA', count: data['20-30 LPA'] || 0 },
    { label: '30+ LPA', count: data['30+ LPA'] || 0 },
  ];

  // Dynamically compute maximum offer count in buckets
  const maxRaw = Math.max(...brackets.map((b) => b.count), 1);
  const maxOffers = maxRaw < 5 ? 5 : maxRaw < 20 ? 20 : maxRaw < 100 ? 100 : maxRaw < 500 ? 500 : 800;
  const chartHeight = 160;

  const gridSteps = [
    0,
    Math.round(maxOffers * 0.25),
    Math.round(maxOffers * 0.5),
    Math.round(maxOffers * 0.75),
    maxOffers,
  ];

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 lg:p-7 shadow-2xs space-y-4">
      {/* Header */}
      <div className="pb-1 border-b border-slate-100">
        <h3 className="text-base font-bold text-[#0A2540] font-heading">
          Placement Offers
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Distribution of offers by compensation salary package
        </p>
      </div>

      {/* SVG Bar Histogram */}
      <div className="w-full overflow-x-auto no-scrollbar pt-2">
        <div className="min-w-[380px] h-[200px] relative">
          <svg className="w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="none">
            {/* Gridlines */}
            {gridSteps.map((val, i) => {
              const y = chartHeight - (val / maxOffers) * (chartHeight - 20);
              return (
                <g key={i}>
                  <line
                    x1="25"
                    y1={y}
                    x2="350"
                    y2={y}
                    stroke="#F1F5F9"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x="20"
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

            {/* Bars */}
            {brackets.map((b, idx) => {
              const barWidth = 36;
              const x = 40 + idx * 62;
              const barHeight = (b.count / maxOffers) * (chartHeight - 20);
              const y = chartHeight - barHeight;
              const isHovered = hoveredBracket === b.label;

              return (
                <g
                  key={b.label}
                  onMouseEnter={() => setHoveredBracket(b.label)}
                  onMouseLeave={() => setHoveredBracket(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Bar */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(barHeight, b.count > 0 ? 4 : 0)}
                    rx="5"
                    fill={isHovered ? '#2563EB' : '#93C5FD'}
                    className="transition-colors duration-200"
                  />

                  {/* Top value */}
                  <text
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill="#0A2540"
                  >
                    {b.count}
                  </text>

                  {/* Bracket label on X-axis */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 16}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill={isHovered ? '#2563EB' : '#64748B'}
                  >
                    {b.label}
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
