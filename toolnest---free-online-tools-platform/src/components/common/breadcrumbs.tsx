import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  urlPath?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
      <button
        onClick={() => onNavigate('/')}
        className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="h-3 w-3 mx-1.5 text-slate-400 dark:text-slate-600" />
            {isLast || !item.urlPath ? (
              <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(item.urlPath!)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
