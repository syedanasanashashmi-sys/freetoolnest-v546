import React, { useState, useEffect } from 'react';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { getFavorites } from '../utils/favorites';
import { toolsData, getToolBySlug } from '../data/toolsData';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { ToolDefinition } from '../types';

interface FavoritesPageProps {
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  const loadFavorites = () => {
    setFavoriteSlugs(getFavorites());
  };

  useEffect(() => {
    loadFavorites();
    window.addEventListener('toolnest_favorites_updated', loadFavorites);
    return () => {
      window.removeEventListener('toolnest_favorites_updated', loadFavorites);
    };
  }, []);

  const favoriteTools: ToolDefinition[] = favoriteSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => !!t);

  const handleClearAll = () => {
    localStorage.removeItem('toolnest_favorites');
    setFavoriteSlugs([]);
    window.dispatchEvent(new CustomEvent('toolnest_favorites_updated', { detail: [] }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <SEOHead
        title="Your Favorite Tools - ToolNest"
        description="Quickly access your bookmarked online tools, calculators, and converters."
        canonicalPath="/favorites"
      />

      <Breadcrumbs items={[{ label: 'Favorites' }]} onNavigate={onNavigate} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-6 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Favorite Utilities
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {favoriteTools.length === 0
              ? 'Bookmark tools you frequently use by tapping the heart icon.'
              : `You have ${favoriteTools.length} saved tool${favoriteTools.length === 1 ? '' : 's'} on this device.`}
          </p>
        </div>

        {favoriteTools.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-red-300 hover:text-red-600 dark:border-slate-800 dark:text-slate-300 dark:hover:text-red-400 transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Favorites</span>
          </button>
        )}
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950/40">
            <Heart className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            No favorite tools yet
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Click the heart icon on any tool card or tool page to pin it here for instantaneous 1-click access.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => onNavigate('/tools')}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              Explore Tools
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
