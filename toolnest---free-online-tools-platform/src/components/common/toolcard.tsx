import React, { useState, useEffect } from 'react';
import {
  Type, Hash, AlignLeft, Pilcrow, Clock, CaseSensitive, ListFilter,
  ArrowDownAZ, Search, Repeat, Minimize2, Maximize2, Crop, FileImage,
  Binary, Layers, Calendar, Percent, Tag, DollarSign, Activity,
  CalendarDays, Timer, Code, Minimize, Cpu, Link, Key, QrCode,
  ShieldCheck, FileText, Dices, Palette, Heart, ArrowUpRight
} from 'lucide-react';
import { ToolDefinition } from '../../types';
import { isFavorite, toggleFavorite } from '../../utils/favorites';
import { trackEvent } from '../../utils/analytics';

const ICON_MAP: Record<string, React.ElementType> = {
  Type, Hash, AlignLeft, Pilcrow, Clock, CaseSensitive, ListFilter,
  ArrowDownAZ, Search, Repeat, Minimize2, Maximize2, Crop, FileImage,
  Binary, Layers, Calendar, Percent, Tag, DollarSign, Activity,
  CalendarDays, Timer, Code, Minimize, Cpu, Link, Key, QrCode,
  ShieldCheck, FileText, Dices, Palette
};

interface ToolCardProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onNavigate }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(tool.slug));
  }, [tool.slug]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleFavorite(tool.slug);
    setFavorite(added);
    trackEvent('favorite_toggled', { tool: tool.slug, state: added ? 'added' : 'removed' });
  };

  const IconComponent = ICON_MAP[tool.icon] || FileText;

  return (
    <div
      onClick={() => onNavigate(tool.urlPath)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/80 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/70 cursor-pointer"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
            <IconComponent className="h-5 w-5" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.isTrending && (
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                Trending
              </span>
            )}
            {tool.isPopular && !tool.isTrending && (
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                Popular
              </span>
            )}
            <button
              onClick={handleFavoriteClick}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-red-500 dark:hover:bg-slate-800 transition"
            >
              <Heart
                className={`h-4 w-4 transition ${
                  favorite ? 'fill-red-500 text-red-500 scale-110' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <h3 className="mt-3.5 text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition">
          {tool.name}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {tool.category}
        </span>
        <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
          <span>Open</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
