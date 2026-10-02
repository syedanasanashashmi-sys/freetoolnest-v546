import React, { useState, useEffect } from 'react';
import {
  Heart, Share2, Shield, HelpCircle, Lightbulb, BookOpen,
  ArrowRight, Check, CheckCircle2, ChevronDown, Sparkles
} from 'lucide-react';
import { ToolDefinition } from '../types';
import { getToolBySlug, toolsData } from '../data/toolsData';
import { guidesData } from '../data/guidesData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { ToolRenderer } from '../components/tools/ToolRenderer';
import { TaskCompletedDiscovery } from '../components/common/TaskCompletedDiscovery';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { AffiliateCallout } from '../components/common/AffiliateCallout';
import { isFavorite, toggleFavorite, recordRecentTool } from '../utils/favorites';
import { trackEvent } from '../utils/analytics';
import { siteConfig } from '../config/siteConfig';

interface ToolDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ slug, onNavigate }) => {
  const tool = getToolBySlug(slug);
  const [favorite, setFavorite] = useState(false);
  const [taskDone, setTaskDone] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (tool) {
      setFavorite(isFavorite(tool.slug));
      recordRecentTool(tool.slug);
      trackEvent('tool_opened', { tool: tool.slug });
      setTaskDone(false);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Tool Not Found</h2>
        <p className="mt-2 text-slate-500">The tool you are looking for does not exist.</p>
        <button
          onClick={() => onNavigate('/tools')}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white"
        >
          Browse All Tools
        </button>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    const added = toggleFavorite(tool.slug);
    setFavorite(added);
    trackEvent('favorite_toggled', { tool: tool.slug, state: added ? 'added' : 'removed' });
  };

  const handleShare = async () => {
    const shareData = {
      title: `${tool.name} - Free Online Tool | ToolNest`,
      text: tool.shortDescription,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const relatedTools: ToolDefinition[] = tool.relatedToolSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolDefinition => !!t);

  const relatedGuides = tool.relatedGuideSlugs
    .map((s) => guidesData.find((g) => g.slug === s))
    .filter(Boolean);

  // Schema.org structured data
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${tool.name} - ToolNest`,
      url: `${siteConfig.siteUrl}${tool.urlPath}`,
      description: tool.shortDescription,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteConfig.siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: tool.category.charAt(0).toUpperCase() + tool.category.slice(1),
          item: `${siteConfig.siteUrl}/${tool.category}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: tool.name,
          item: `${siteConfig.siteUrl}${tool.urlPath}`,
        },
      ],
    },
    ...(tool.faqs && tool.faqs.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: tool.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <SEOHead
        title={`${tool.name} - Free Online Tool`}
        description={tool.shortDescription}
        canonicalPath={tool.urlPath}
        schemaData={schemaData}
      />

      {/* Semantic Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: tool.category.charAt(0).toUpperCase() + tool.category.slice(1), urlPath: `/${tool.category}` },
          { label: tool.name },
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Bar */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {tool.category}
            </span>
            <span className="text-xs text-slate-400">· Free Online Utility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {tool.name}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            {tool.shortDescription}
          </p>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={handleFavoriteToggle}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              favorite
                ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
            title={favorite ? 'Favorited' : 'Add to Favorites'}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{favorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Share this tool"
          >
            {shareCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
            <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* WORKING TOOL COMPONENT (Near top of page!) */}
      <section className="relative my-6" aria-label={`Interactive ${tool.name}`}>
        <ToolRenderer
          slug={tool.slug}
          onTaskCompleted={() => {
            setTaskDone(true);
            trackEvent('tool_completed', { tool: tool.slug });
          }}
        />
      </section>

      {/* "YOUR TASK IS COMPLETE! YOU MIGHT ALSO NEED..." */}
      {taskDone && (
        <TaskCompletedDiscovery
          relatedToolSlugs={tool.relatedToolSlugs}
          onNavigate={onNavigate}
        />
      )}

      {/* Top Ad Unit */}
      <div className="my-8 flex justify-center">
        <AdPlaceholder slot="tool-bottom" />
      </div>

      {/* DEVICE PRIVACY NOTICE */}
      <div className="my-8 flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-xs dark:border-slate-800 dark:bg-slate-900/40">
        <Shield className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white">
            100% Privacy Guarantee
          </h4>
          <p className="mt-0.5 text-slate-500 dark:text-slate-400 leading-relaxed">
            {tool.privacyNotice}
          </p>
        </div>
      </div>

      {/* HOW TO USE GUIDE */}
      <section className="my-10 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          How to Use {tool.name}
        </h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <ol className="space-y-3">
            {tool.howToUse.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DETAILED EXPLANATION & FORMULAS */}
      <section className="my-10 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Detailed Explanation & Architecture
        </h2>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>{tool.fullDescription}</p>

          {tool.formulaOrMethod && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Formula / Algorithm Applied
              </span>
              <p className="mt-1 font-mono text-xs text-slate-800 dark:text-slate-200">
                {tool.formulaOrMethod}
              </p>
            </div>
          )}

          {tool.examples && tool.examples.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Real-World Example
              </span>
              {tool.examples.map((ex, i) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{ex.title}</span>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="rounded bg-white p-2 dark:bg-slate-900">
                      <span className="text-slate-400 block mb-0.5">Input:</span>
                      <span>{ex.input}</span>
                    </div>
                    <div className="rounded bg-white p-2 dark:bg-slate-900">
                      <span className="text-emerald-500 block mb-0.5">Result:</span>
                      <span>{ex.output}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PRO TIPS */}
      {tool.tips && tool.tips.length > 0 && (
        <section className="my-10 space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Tips for Best Results
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {tool.tips.map((tip, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                {tip}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AFFILIATE RECOMMENDATION */}
      <AffiliateCallout
        category={
          tool.subCategory === 'image'
            ? 'image'
            : tool.subCategory === 'developer'
            ? 'developer'
            : 'general'
        }
      />

      {/* FAQ ACCORDION (Schema.org compliant) */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="my-10 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {tool.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
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
      )}

      {/* RELATED TOOLS */}
      {relatedTools.length > 0 && (
        <section className="my-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((rt) => (
              <div
                key={rt.id}
                onClick={() => {
                  onNavigate(rt.urlPath);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500 hover:shadow-xs cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {rt.name}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">{rt.shortDescription}</p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED GUIDES */}
      {relatedGuides.length > 0 && (
        <section className="my-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Related Guides & Tutorials
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedGuides.map((guide: any) => (
              <div
                key={guide.id}
                onClick={() => {
                  onNavigate(`/guides/${guide.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-500 hover:shadow-xs cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                    {guide.category} · {guide.readTime}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                    {guide.title}
                  </h4>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
