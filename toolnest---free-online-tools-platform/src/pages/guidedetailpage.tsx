import React, { useState } from 'react';
import {
  Clock, Calendar, User, ArrowRight, Sparkles, ChevronDown,
  Info, AlertTriangle, BookOpen, Share2, Check
} from 'lucide-react';
import { getGuideBySlug, guidesData } from '../data/guidesData';
import { getToolBySlug } from '../data/toolsData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { siteConfig } from '../config/siteConfig';

interface GuideDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug, onNavigate }) => {
  const guide = getGuideBySlug(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!guide) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Guide Not Found</h2>
        <button
          onClick={() => onNavigate('/guides')}
          className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
        >
          View All Guides
        </button>
      </div>
    );
  }

  const primaryTool = guide.relatedToolSlugs[0] ? getToolBySlug(guide.relatedToolSlugs[0]) : null;
  const relatedTools = guide.relatedToolSlugs
    .map((s) => getToolBySlug(s))
    .filter(Boolean);

  const relatedGuides = guide.relatedGuideSlugs
    .map((s) => getGuideBySlug(s))
    .filter(Boolean);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.shortDescription,
      author: {
        '@type': 'Organization',
        name: guide.author,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
      },
      datePublished: guide.publishDate,
      dateModified: guide.lastUpdated,
      mainEntityOfPage: `${siteConfig.siteUrl}/guides/${guide.slug}`,
    },
    ...(guide.faqs && guide.faqs.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: guide.faqs.map((f) => ({
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
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      <SEOHead
        title={guide.title}
        description={guide.shortDescription}
        canonicalPath={`/guides/${guide.slug}`}
        ogType="article"
        schemaData={schemaData}
      />

      <Breadcrumbs
        items={[{ label: 'Guides', urlPath: '/guides' }, { label: guide.title }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <header className="space-y-4 border-b border-slate-200/80 pb-6 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {guide.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {guide.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="h-3.5 w-3.5" />
              {guide.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Updated {guide.lastUpdated}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>
      </header>

      {/* Direct Interactive Live Tool Feature Banner */}
      {primaryTool && (
        <aside className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-50/70 to-indigo-50/60 p-5 dark:border-blue-900/50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Companion Free Tool
              </span>
              <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                Try the {primaryTool.name} Online
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                {primaryTool.shortDescription}
              </p>
            </div>
            <button
              onClick={() => onNavigate(primaryTool.urlPath)}
              className="shrink-0 flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              <span>Launch Tool</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Table of Contents */}
      {guide.tableOfContents && guide.tableOfContents.length > 0 && (
        <nav aria-label="Table of contents" className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Table of Contents
          </h2>
          <ul className="space-y-2 text-xs">
            {guide.tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-slate-700 hover:text-indigo-600 hover:underline dark:text-slate-300 dark:hover:text-indigo-400"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Main Body Content Sections */}
      <div className="space-y-10">
        {guide.contentSections.map((sec) => (
          <section key={sec.id} id={sec.id} className="space-y-4 scroll-mt-20">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {sec.heading}
            </h2>

            <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {sec.body.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {sec.callout && (
              <div
                className={`my-4 flex items-start gap-3 rounded-xl border p-4 text-xs ${
                  sec.callout.type === 'tip'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200'
                    : 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200'
                }`}
              >
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{sec.callout.text}</p>
              </div>
            )}

            {sec.codeExample && (
              <div className="my-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-emerald-400">
                <pre className="overflow-x-auto">{sec.codeExample}</pre>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="flex justify-center">
        <AdPlaceholder slot="leaderboard" />
      </div>

      {/* FAQs */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section id="faqs" className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {guide.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'
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

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Related Tools to Try
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedTools.map((t: any) => (
              <div
                key={t.id}
                onClick={() => onNavigate(t.urlPath)}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-500 cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{t.shortDescription}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
