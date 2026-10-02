import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Trash2, Sparkles, BookOpen } from 'lucide-react';
import { toolsData } from '../../data/toolsData';
import { guidesData } from '../../data/guidesData';
import { getRecentSearches, addRecentSearch, clearRecentSearches } from '../../utils/favorites';
import { trackEvent } from '../../utils/analytics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getRecentSearches());
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Clean query and filter
  const cleanQ = query.trim().toLowerCase();

  const matchedTools = cleanQ
    ? toolsData.filter((t) => {
        return (
          t.name.toLowerCase().includes(cleanQ) ||
          t.shortDescription.toLowerCase().includes(cleanQ) ||
          t.category.toLowerCase().includes(cleanQ) ||
          t.subCategory.toLowerCase().includes(cleanQ) ||
          t.keywords.some((k) => k.toLowerCase().includes(cleanQ))
        );
      })
    : [];

  const matchedGuides = cleanQ
    ? guidesData.filter((g) => {
        return (
          g.title.toLowerCase().includes(cleanQ) ||
          g.shortDescription.toLowerCase().includes(cleanQ) ||
          g.category.toLowerCase().includes(cleanQ)
        );
      })
    : [];

  const totalResults = matchedTools.length + matchedGuides.length;

  const handleSelect = (url: string, searchTitle?: string) => {
    if (searchTitle) {
      addRecentSearch(searchTitle);
    } else if (cleanQ) {
      addRecentSearch(cleanQ);
    }
    trackEvent('search_performed', { query: cleanQ, target: url });
    onClose();
    onNavigate(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < totalResults ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex < matchedTools.length) {
        const item = matchedTools[selectedIndex];
        if (item) handleSelect(item.urlPath, item.name);
      } else {
        const guideIndex = selectedIndex - matchedTools.length;
        const item = matchedGuides[guideIndex];
        if (item) handleSelect(`/guides/${item.slug}`, item.title);
      }
    }
  };

  const popularSearches = [
    'Word Counter',
    'Image Compressor',
    'QR Code Generator',
    'Age Calculator',
    'JSON Formatter',
    'Password Generator',
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 p-4 pt-16 backdrop-blur-xs sm:pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition dark:border-slate-800 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-200 px-4 py-3.5 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools, calculators, converters, guides..."
            className="ml-3 flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 rounded-md p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Search Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {cleanQ ? (
            totalResults > 0 ? (
              <div className="space-y-4">
                {matchedTools.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Tools & Calculators ({matchedTools.length})
                    </span>
                    <div className="mt-2 space-y-1">
                      {matchedTools.map((tool, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                          <div
                            key={tool.id}
                            onClick={() => handleSelect(tool.urlPath, tool.name)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 transition ${
                              isSelected
                                ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-200'
                                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/60 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                                <Sparkles className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold">{tool.name}</p>
                                <p className="text-xs text-slate-400 line-clamp-1">
                                  {tool.shortDescription}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-slate-400 capitalize">
                              {tool.category}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {matchedGuides.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Guides & Articles ({matchedGuides.length})
                    </span>
                    <div className="mt-2 space-y-1">
                      {matchedGuides.map((guide, idx) => {
                        const itemIdx = matchedTools.length + idx;
                        const isSelected = selectedIndex === itemIdx;
                        return (
                          <div
                            key={guide.id}
                            onClick={() => handleSelect(`/guides/${guide.slug}`, guide.title)}
                            onMouseEnter={() => setSelectedIndex(itemIdx)}
                            className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 transition ${
                              isSelected
                                ? 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-200'
                                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100/60 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                                <BookOpen className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold">{guide.title}</p>
                                <p className="text-xs text-slate-400 line-clamp-1">
                                  {guide.shortDescription}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-slate-400">
                              {guide.readTime}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Search className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
                <h4 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                  No matching tools found for "{query}"
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Try searching for keywords like "compress", "calculate", "qr", or "counter".
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {popularSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="space-y-5">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      Recent Searches
                    </span>
                    <button
                      onClick={() => {
                        clearRecentSearches();
                        setRecentSearches([]);
                      }}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                      Clear
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(term)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Popular Searches
                </span>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-2.5 text-left text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300"
                    >
                      <span>{item}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-800 dark:bg-slate-900/50">
          <span>Navigate with ↑ and ↓, press Enter to open</span>
          <span className="hidden sm:inline">100% Privacy Friendly</span>
        </div>
      </div>
    </div>
  );
};
