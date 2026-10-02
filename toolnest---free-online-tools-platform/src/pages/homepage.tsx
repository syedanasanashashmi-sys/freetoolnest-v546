import React, { useState } from 'react';
import {
  Search, Sparkles, ArrowRight, ShieldCheck, Zap, Lock, BookOpen,
  Layers, ArrowUpRight, CheckCircle2, ChevronRight
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { toolsData, getPopularTools, getTrendingTools } from '../data/toolsData';
import { guidesData } from '../data/guidesData';
import { ToolCard } from '../components/common/ToolCard';
import { AdPlaceholder } from '../components/common/AdPlaceholder';
import { SEOHead } from '../components/common/SEOHead';
import { ToolDefinition } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const popularTools = getPopularTools(8);
  const trendingTools = getTrendingTools(6);
  const textTools = toolsData.filter((t) => t.subCategory === 'text').slice(0, 6);
  const imageTools = toolsData.filter((t) => t.subCategory === 'image').slice(0, 6);
  const calculators = toolsData.filter((t) => t.category === 'calculators').slice(0, 6);
  const devTools = toolsData.filter((t) => t.subCategory === 'developer').slice(0, 5);
  const generators = toolsData.filter((t) => t.category === 'generators' && t.subCategory === 'generator').slice(0, 5);
  const latestGuides = guidesData.slice(0, 4);

  const popularSearchPills = [
    { label: 'Word Counter', path: '/tools/word-counter' },
    { label: 'Image Compressor', path: '/tools/image-compressor' },
    { label: 'QR Generator', path: '/generators/qr-code-generator' },
    { label: 'Age Calculator', path: '/calculators/age-calculator' },
    { label: 'JSON Formatter', path: '/tools/json-formatter' },
    { label: 'Password Generator', path: '/generators/password-generator' },
  ];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onOpenSearch();
    }
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.tagline,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.siteUrl}/tools?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="space-y-16 pb-16">
      <SEOHead
        title="Free Online Tools Platform That Actually Get Things Done"
        description="Fast, free and privacy-friendly tools, calculators, converters, and generators for work, study, and everyday tasks. 100% browser-side processing."
        canonicalPath="/"
        schemaData={schemaData}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-8 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/70 px-3.5 py-1 text-xs font-semibold text-blue-700 backdrop-blur-xs dark:bg-blue-950/40 dark:text-blue-300 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>35+ Free Utilities · 100% Client-Side Privacy</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Free Online Tools for Work, Study & Everyday Tasks
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Fast, simple and privacy-friendly tools that help you get things done. No registration, no server uploads, and no hidden subscriptions.
          </p>

          {/* Large Hero Search Input */}
          <div className="mt-8 max-w-xl mx-auto">
            <div
              onClick={onOpenSearch}
              className="group relative flex items-center rounded-2xl border border-slate-300/80 bg-white p-2 shadow-lg hover:border-blue-500 transition-all cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:shadow-2xl"
            >
              <Search className="ml-3 h-5 w-5 text-slate-400 group-hover:text-blue-600 transition" />
              <input
                type="text"
                readOnly
                placeholder="Search for a tool (e.g. compress, counter, qr, age)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none cursor-pointer dark:text-white"
              />
              <kbd className="hidden sm:inline-block rounded-xl border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-mono text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                ⌘K
              </kbd>
            </div>

            {/* Popular Search Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <span className="text-slate-400 mr-1 font-medium">Popular:</span>
              {popularSearchPills.map((pill) => (
                <button
                  key={pill.path}
                  onClick={() => onNavigate(pill.path)}
                  className="rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-1 text-slate-600 hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('/tools')}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
              >
                <span>Explore All 35+ Tools</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RECEPTIVE AD PLACEHOLDER */}
      <div className="mx-auto max-w-7xl px-4 flex justify-center">
        <AdPlaceholder slot="leaderboard" />
      </div>

      {/* POPULAR TOOLS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Most Popular Utilities
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Popular Tools
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/tools')}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            <span>View All Tools</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* TRENDING TOOLS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              High Traffic Right Now
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Trending Tools
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trendingTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* IMAGE TOOLS SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Fast & Private Media Processing
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Image Tools & Converters
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/converters')}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            <span>View All Converters</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imageTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* CALCULATORS SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Instant Math & Formulas
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Calculators
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/calculators')}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            <span>View All Calculators</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* TEXT TOOLS SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Writing & Content Utilities
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Text & String Tools
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/tools')}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            <span>View All Text Tools</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {textTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* DEVELOPER TOOLS & GENERATORS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Dev Tools */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Data & Web Development
                </span>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  Developer Tools
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/tools')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {devTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onNavigate(tool.urlPath)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 hover:border-blue-500 hover:shadow-sm cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDescription}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Generators */}
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Creative & Security Generators
                </span>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  Generators
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/generators')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {generators.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onNavigate(tool.urlPath)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 hover:border-blue-500 hover:shadow-sm cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDescription}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST HIGH-TRAFFIC GUIDES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                <BookOpen className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Knowledge Base & Tutorials
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              Latest Guides & Resources
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/guides')}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            <span>View All Guides</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {latestGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => onNavigate(`/guides/${guide.slug}`)}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:-translate-y-1 hover:border-indigo-500 hover:shadow-md cursor-pointer transition dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  {guide.category}
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                  {guide.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                  {guide.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{guide.readTime}</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY TOOLNEST PILLARS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-8 sm:p-12 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Users Choose ToolNest
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Unlike traditional utility sites bloated with intrusive popups and server delays, ToolNest is designed from the ground up for modern web standards.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Device-Side Privacy
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Your images, files, passwords, and JSON payloads are processed in your browser memory. We never store or upload your private content.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Zero Latency
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Eliminate round-trip server waiting times. Tools execute in milliseconds using hardware acceleration and modern HTML5 APIs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Reliable & Offline Ready
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Equipped with Progressive Web App (PWA) offline service workers so you can use key utilities anywhere, even without Wi-Fi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
