import React, { useState } from 'react';
import { BookOpen, Search, Clock, ArrowRight } from 'lucide-react';
import { guidesData } from '../data/guidesData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { AdPlaceholder } from '../components/common/AdPlaceholder';

interface GuidesListPageProps {
  onNavigate: (path: string) => void;
}

export const GuidesListPage: React.FC<GuidesListPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');

  const filteredGuides = query.trim()
    ? guidesData.filter(
        (g) =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          g.category.toLowerCase().includes(query.toLowerCase())
      )
    : guidesData;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      <SEOHead
        title="Guides & Resources - Technical Tutorials & Tips"
        description="Step-by-step guides on image compression, next-gen WebP formats, percentage formulas, JSON formatting, and QR code standards."
        canonicalPath="/guides"
      />

      <Breadcrumbs items={[{ label: 'Guides' }]} onNavigate={onNavigate} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
              <BookOpen className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Knowledge Base
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Guides & Technical Tutorials
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            In-depth explanations, formulas, best practices, and actionable walkthroughs for image optimization, data formats, and mathematics.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            onClick={() => onNavigate(`/guides/${guide.slug}`)}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="mt-3.5 text-base font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition">
                {guide.title}
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
                {guide.shortDescription}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-indigo-600 dark:border-slate-800 dark:text-indigo-400">
              <span>Read Full Article</span>
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <AdPlaceholder slot="leaderboard" />
      </div>
    </div>
  );
};
