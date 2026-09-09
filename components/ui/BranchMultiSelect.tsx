'use client';

import React from 'react';
import { ACADEMIC_BRANCHES, normalizeBranchCode } from '@/lib/constants/branches';
import { Check, Sparkles, X } from 'lucide-react';

export interface BranchMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  label?: string;
  error?: string;
  helperText?: string;
}

export const BranchMultiSelect: React.FC<BranchMultiSelectProps> = ({
  selected = [],
  onChange,
  label = 'Eligible Branches / Disciplines',
  error,
  helperText = 'Select all academic branches eligible to apply for this position.',
}) => {
  // Normalize incoming selected branches
  const normalizedSelected = selected.map(normalizeBranchCode);

  const toggleBranch = (code: string) => {
    if (normalizedSelected.includes(code)) {
      onChange(normalizedSelected.filter((c) => c !== code));
    } else {
      onChange([...normalizedSelected, code]);
    }
  };

  const selectAll = () => {
    onChange(ACADEMIC_BRANCHES.map((b) => b.code));
  };

  const selectEngineeringOnly = () => {
    onChange(
      ACADEMIC_BRANCHES.filter((b) => b.category === 'Engineering & Technology').map((b) => b.code)
    );
  };

  const clearAll = () => {
    onChange([]);
  };

  const isAllSelected =
    normalizedSelected.length === ACADEMIC_BRANCHES.length && ACADEMIC_BRANCHES.length > 0;

  return (
    <div className="space-y-2.5 w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {label && (
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={selectAll}
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Select All ({ACADEMIC_BRANCHES.length})
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={selectEngineeringOnly}
            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            All Engineering
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={clearAll}
            className="font-medium text-slate-500 hover:text-rose-600 hover:underline transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50/50 min-h-[58px]">
        {ACADEMIC_BRANCHES.map((branch) => {
          const isSelected = normalizedSelected.includes(branch.code);
          return (
            <button
              key={branch.code}
              type="button"
              onClick={() => toggleBranch(branch.code)}
              title={`${branch.name} (${branch.category})`}
              className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 select-none ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 ring-1 ring-blue-500'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-sm'
              }`}
            >
              {isSelected ? (
                <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500" />
              )}
              <span>{branch.code}</span>
              <span
                className={`text-[10px] hidden sm:inline max-w-[140px] truncate ${
                  isSelected ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                ({branch.name})
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <p>{helperText}</p>
        <span className="font-semibold text-slate-700">
          {normalizedSelected.length === 0
            ? 'Open to all (no restriction)'
            : `${normalizedSelected.length} of ${ACADEMIC_BRANCHES.length} selected`}
        </span>
      </div>

      {error && <p className="text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
};
