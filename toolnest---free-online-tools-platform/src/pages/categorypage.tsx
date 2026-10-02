import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, BookOpen, ChevronDown } from 'lucide-react';
import { toolsData } from '../data/toolsData';
import { guidesData } from '../data/guidesData';
import { siteConfig } from '../config/siteConfig';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { ToolDefinition } from '../types';

interface CategoryPageProps {
  categoryKey: 'tools' | 'calculators' | 'converters' | 'generators';
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryKey, onNavigate }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categoryMeta = siteConfig.categories.find((c) => c.id === categoryKey) || {
    id: categoryKey,
    name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
    description: 'Explore our fast, free, and privacy-friendly online utilities.',
    slug: `/${categoryKey}`,
    icon: 'Layers',
  };

  // Filter tools for this category
  const categoryTools = useMemo(() => {
    let list: ToolDefinition[] = [];
    if (categoryKey === 'tools') {
      list = toolsData.filter((t) => t.category === 'tools' || t.subCategory === 'text' || t.subCategory === 'developer');
    } else if (categoryKey === 'calculators') {
      list = toolsData.filter((t) => t.category === 'calculators');
    } else if (categoryKey === 'converters') {
      list = toolsData.filter((t) => t.category === 'converters');
    } else if (categoryKey === 'generators') {
      list = toolsData.filter((t) => t.category === 'generators');
    }

    if (selectedSubCat !== 'all') {
      list = list.filter((t) => t.subCategory === selectedSubCat);
    }

    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    return list;
  }, [categoryKey, selectedSubCat, filterQuery]);

  // Subcategories available
  const subCategories = useMemo(() => {
    if (categoryKey === 'tools') return [{ id: 'all', label: 'All' }, { id: 'text', label: 'Text Tools' }, { id: 'image', label: 'Image Tools' }, { id: 'developer', label: 'Developer Tools' }];
    if (categoryKey === 'calculators') return [{ id: 'all', label: 'All Calculators' }];
    if (categoryKey === 'converters') return [{ id: 'all', label: 'All Converters' }, { id: 'image', label: 'Image Converters' }, { id: 'developer', label: 'Data Converters' }];
    if (categoryKey === 'generators') return [{ id: 'all', label: 'All Generators' }];
    return [{ id: 'all', label: 'All' }];
  }, [categoryKey]);

  // Related guides for this category
  const relevantGuides = guidesData.slice(0, 3);

  // Category FAQs
  const categoryFaqs = [
    {
      question: `Are all ${categoryMeta.name} free to use?`,
      answer: `Yes, 100% of the tools in this category are completely free with zero limits, subscriptions, or required account sign-ups.`,
    },
    {
      question: 'Do these tools run on device or cloud servers?',
      answer: 'Every tool in ToolNest runs locally inside your browser using client-side Web APIs, ensuring maximum privacy and instant speed without network latency.',
    },
    {
      question: 'Can I use these tools on my smartphone?',
      answer: 'Yes! All tools are fully mobile-responsive and installable as a Progressive Web App (PWA) for convenient offline access.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      <SEOHead
        title={`${categoryMeta.name} - Free Online Utilities`}
        description={categoryMeta.description}
        canonicalPath={`/${categoryKey}`}
      />

      <Breadcrumbs items={[{ label: categoryMeta.name }]} onNavigate={onNavigate} />

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {categoryMeta.name}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          {categoryMeta.description}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-y border-slate-200/80 py-4 dark:border-slate-800">
        {/* Subcat buttons */}
        <div className="flex flex-wrap gap-1.5">
          {subCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCat(sub.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                selectedSubCat === sub.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Search inside category */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={`Filter ${categoryTools.length} tools...`}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No tools found matching "{filterQuery}"
            </p>
            <button
              onClick={() => {
                setFilterQuery('');
                setSelectedSubCat('all');
              }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <AdPlaceholder slot="leaderboard" />
      </div>

      {/* Relevant Guides */}
      {relevantGuides.length > 0 && (
        <section className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Related Guides & Tutorials
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relevantGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => onNavigate(`/guides/${guide.slug}`)}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-500 hover:shadow-sm cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                    {guide.category} · {guide.readTime}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {guide.shortDescription}
                  </p>
                </div>
                <span className="mt-4 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  Read Guide →
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category FAQs */}
      <section className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {categoryFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 p-4 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
