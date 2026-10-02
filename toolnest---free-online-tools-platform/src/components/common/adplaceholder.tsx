import React from 'react';
import { siteConfig } from '../../config/siteConfig';

interface AdPlaceholderProps {
  slot: 'leaderboard' | 'rectangle' | 'in-feed' | 'tool-bottom';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, className = '' }) => {
  if (!siteConfig.adSettings.enabled) return null;

  let dimensions = 'min-h-[90px] w-full max-w-[728px]';
  let label = 'Advertisement Space (728 × 90 Responsive Banner)';

  if (slot === 'rectangle') {
    dimensions = 'min-h-[250px] w-full max-w-[300px]';
    label = 'Advertisement (300 × 250 Medium Rectangle)';
  } else if (slot === 'in-feed') {
    dimensions = 'min-h-[100px] w-full';
    label = 'Sponsored Content Placeholder';
  } else if (slot === 'tool-bottom') {
    dimensions = 'min-h-[90px] w-full max-w-[970px]';
    label = 'Advertisement (970 × 90 Large Banner)';
  }

  return (
    <div
      className={`my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100/70 p-4 text-center transition dark:border-slate-800 dark:bg-slate-900/50 ${dimensions} ${className}`}
      data-ad-slot={slot}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Advertisement
      </span>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 font-mono">
        {label}
      </p>
    </div>
  );
};
