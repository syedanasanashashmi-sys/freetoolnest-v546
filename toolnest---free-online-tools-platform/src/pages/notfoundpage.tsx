import React, { useState } from 'react';
import { Search, Home, ArrowRight, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenSearch }) => {
  const popularTools = [
    { name: 'Word Counter', path: '/tools/word-counter' },
    { name: 'Image Compressor', path: '/tools/image-compressor' },
    { name: 'Age Calculator', path: '/calculators/age-calculator' },
    { name: 'JSON Formatter', path: '/tools/json-formatter' },
    { name: 'QR Code Generator', path: '/generators/qr-code-generator' },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <SEOHead
        title="404 - Page Not Found"
        description="The tool or page you are looking for could not be found."
        canonicalPath="/404"
      />

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
        <AlertCircle className="h-8 w-8" />
      </div>

      <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        Error 404
      </span>

      <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
        Page Not Found
      </h1>

      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        The tool, calculator, or guide you requested might have been moved or doesn't exist yet. Try searching below:
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
        >
          <Search className="h-4 w-4" />
          <span>Search All Tools</span>
        </button>
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
        >
          <Home className="h-4 w-4" />
          <span>Go to Home</span>
        </button>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
          Or try our most popular tools:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {popularTools.map((tool) => (
            <button
              key={tool.path}
              onClick={() => onNavigate(tool.path)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition"
            >
              <span>{tool.name}</span>
              <ArrowRight className="h-3 w-3 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
