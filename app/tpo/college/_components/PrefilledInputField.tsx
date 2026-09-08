'use client';

import React, { useState } from 'react';
import { LucideIcon, Check, RotateCcw, Copy, Sparkles } from 'lucide-react';

interface PrefilledInputFieldProps {
  label: string;
  name: string;
  value: string;
  originalValue: string;
  onChange: (value: string) => void;
  onRevert: () => void;
  icon: LucideIcon;
  placeholder?: string;
  type?: string;
  required?: boolean;
  description?: string;
  transform?: 'uppercase' | 'lowercase' | 'none';
  disabled?: boolean;
}

export function PrefilledInputField({
  label,
  name,
  value,
  originalValue,
  onChange,
  onRevert,
  icon: Icon,
  placeholder,
  type = 'text',
  required = false,
  description,
  transform = 'none',
  disabled = false,
}: PrefilledInputFieldProps) {
  const [copied, setCopied] = useState(false);
  const isModified = (value ?? '').trim() !== (originalValue ?? '').trim();
  const isFilled = (value ?? '').trim().length > 0;

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (transform === 'uppercase') val = val.toUpperCase();
    if (transform === 'lowercase') val = val.toLowerCase();
    onChange(val);
  };

  return (
    <div className="group space-y-1.5 transition-all duration-200">
      {/* Top Header Label & Status Tag */}
      <div className="flex items-center justify-between gap-2">
        <label 
          htmlFor={name}
          className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
        >
          <span>{label}</span>
          {required && <span className="text-rose-500 font-black">*</span>}
        </label>

        <div className="flex items-center gap-1.5">
          {isModified ? (
            <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold text-[10px] tracking-tight">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                <span>Modified</span>
              </span>
              <button
                type="button"
                onClick={onRevert}
                title="Revert to prefilled value"
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10.5px] font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-2.5 h-2.5 text-slate-500" />
                <span className="hidden sm:inline">Revert</span>
              </button>
            </div>
          ) : isFilled ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-semibold text-[10px]">
              <Check className="w-2.5 h-2.5 text-emerald-600" />
              <span>Prefilled & Synced</span>
            </span>
          ) : (
            <span className="text-[10px] font-medium text-slate-400">
              Optional
            </span>
          )}
        </div>
      </div>

      {/* Input Field Container */}
      <div 
        className={`relative flex items-center rounded-xl transition-all duration-200 border ${
          isModified
            ? 'bg-amber-50/20 border-amber-300 ring-2 ring-amber-100/70 shadow-xs'
            : 'bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white border-slate-200 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-100 shadow-2xs'
        }`}
      >
        {/* Left Icon */}
        <div className="pl-3.5 pr-2.5 text-slate-400 group-focus-within:text-blue-600 flex items-center pointer-events-none transition-colors">
          <Icon className="w-4 h-4 shrink-0" />
        </div>

        {/* Input Text Box */}
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value ?? ''}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full py-2.5 pr-10 text-xs sm:text-[13px] font-semibold text-slate-900 placeholder:text-slate-400 bg-transparent outline-none transition-all ${
            transform === 'uppercase' ? 'font-mono tracking-wider' : ''
          }`}
        />

        {/* Right Actions (Copy Button) */}
        {isFilled && (
          <div className="pr-2.5 flex items-center">
            <button
              type="button"
              onClick={handleCopy}
              title="Copy to clipboard"
              className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Description / Helper Subtext */}
      {description && (
        <p className="text-[11px] text-slate-400 leading-tight">
          {description}
        </p>
      )}
    </div>
  );
}
