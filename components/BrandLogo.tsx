'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  clickable?: boolean;
}

export function BrandLogo({
  size = 'md',
  variant = 'light',
  clickable = true,
}: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
  };

  const badgeSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
  };

  const content = (
    <div className="flex items-center gap-3 group select-none">
      {/* High-Impact Circular Emblem Icon */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl overflow-hidden shadow-md shadow-blue-500/15 border border-slate-200/80 bg-white p-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1`}
      >
        <Image
          src="/images/campushire-emblem.png"
          alt="CampusHire Emblem"
          fill
          priority
          className="object-contain p-0.5 rounded-xl"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`${textSizes[size]} font-extrabold tracking-tight font-heading leading-none flex items-center gap-0.5`}
        >
          <span className={variant === 'dark' ? 'text-white' : 'text-[#0A2540]'}>
            Campus
          </span>
          <span className="text-[#FBAB23] drop-shadow-sm">Hire</span>
        </span>
        <span
          className={`${badgeSizes[size]} font-bold font-mono mt-0.5 uppercase ${
            variant === 'dark' ? 'text-slate-400' : 'text-[#64748B]'
          }`}
        >
          AI Placement ERP
        </span>
      </div>
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link href="/" className="inline-block outline-none">
      {content}
    </Link>
  );
}
