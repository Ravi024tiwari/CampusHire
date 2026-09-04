'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LiveCountUpProps {
  value: string;
  isHovered?: boolean;
  className?: string;
}

export function LiveCountUp({ value, isHovered, className = '' }: LiveCountUpProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const animFrameRef = useRef<number | null>(null);

  // Parse numeric parts and string decorators (e.g. "₹45.0 LPA" -> prefix: "₹", num: 45.0, suffix: " LPA", decimals: 1)
  const parseValue = (raw: string) => {
    // Match optional prefix, the number (with optional decimals and commas), and suffix
    const match = raw.match(/^([^0-9.]*)([0-9,.]+)(.*)$/);
    if (!match) return { prefix: '', target: 0, suffix: raw, decimals: 0, hasComma: false };

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const hasComma = match[2].includes(',');
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const target = parseFloat(numStr) || 0;

    return { prefix, target, suffix, decimals, hasComma };
  };

  const startCountAnimation = () => {
    const { prefix, target, suffix, decimals, hasComma } = parseValue(value);
    if (target === 0) return;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const duration = 750; // ms
    const startTime = performance.now();
    // Start count from 60% of the target value for rapid, satisfying tick effect
    const startVal = target * 0.45;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * easeProgress;

      let formattedNum = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      if (hasComma) {
        const parts = formattedNum.split('.');
        parts[0] = parseInt(parts[0], 10).toLocaleString('en-US');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  // Trigger on initial mount & whenever isHovered toggles to true
  useEffect(() => {
    startCountAnimation();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [value]);

  useEffect(() => {
    if (isHovered) {
      startCountAnimation();
    }
  }, [isHovered]);

  return (
    <span className={`inline-block font-mono tracking-tight transition-transform duration-200 ${className}`}>
      {displayValue}
    </span>
  );
}
