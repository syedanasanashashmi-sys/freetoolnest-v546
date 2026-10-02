import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { ToolDefinition } from '../../types';
import { getToolBySlug } from '../../data/toolsData';

interface TaskCompletedDiscoveryProps {
  relatedToolSlugs: string[];
  onNavigate: (path: string) => void;
}

export const TaskCompletedDiscovery: React.FC<TaskCompletedDiscoveryProps> = ({
  relatedToolSlugs,
  onNavigate,
}) => {
  const tools: ToolDefinition[] = relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => !!t)
    .slice(0, 4);

  if (tools.length === 0) return null;

  return (
    <div className="my-8 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-6 backdrop-blur-sm dark:border-emerald-500/20 dark:bg-emerald-950/20">
      <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="h-5 w-5" />
        <h3 className="text-base font-bold">
          Your task is complete! You might also need...
        </h3>
      </div>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
        Discover next-step utilities tailored to your current workflow:
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              onNavigate(tool.urlPath);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-xs transition hover:border-blue-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {tool.name}
                </span>
                <Sparkles className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500 transition" />
              </div>
              <p className="mt-1.5 text-[11px] line-clamp-2 text-slate-500 dark:text-slate-400">
                {tool.shortDescription}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              <span>Open Tool</span>
              <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
