'use client';

import React from 'react';
import { BRANCHES_BY_CATEGORY, normalizeBranchCode } from '@/lib/constants/branches';

export interface BranchSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  includeAllOption?: boolean;
  allOptionLabel?: string;
}

export const BranchSelect: React.FC<BranchSelectProps> = ({
  label,
  error,
  helperText,
  value,
  onChange,
  className = '',
  includeAllOption = false,
  allOptionLabel = 'All Branches',
  required,
  ...props
}) => {
  // Normalize current value to canonical code if possible
  const normalizedValue = value ? normalizeBranchCode(String(value)) : '';

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          value={normalizedValue}
          onChange={onChange}
          required={required}
          className={`w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${
            error ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : ''
          } ${className}`}
          {...props}
        >
          {includeAllOption ? (
            <option value="ALL">{allOptionLabel}</option>
          ) : (
            <option value="" disabled>
              Select Academic Branch...
            </option>
          )}

          {Object.entries(BRANCHES_BY_CATEGORY).map(([category, branches]) => (
            <optgroup key={category} label={category}>
              {branches.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.name} ({b.code})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-rose-600">{error}</p>
      )}
    </div>
  );
};
