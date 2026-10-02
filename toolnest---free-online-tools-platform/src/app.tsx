import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { HomePage } from './pages/HomePage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { GuidesListPage } from './pages/GuidesListPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { toolsData } from './data/toolsData';
import { guidesData } from './data/guidesData';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route Resolver
  const renderCurrentView = () => {
    const cleanPath = currentPath.replace(/\/+$/, '') || '/';

    // 1. Home
    if (cleanPath === '/') {
      return <HomePage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
    }

    // 2. Hub / Category Pages
    if (cleanPath === '/tools') {
      return <CategoryPage categoryKey="tools" onNavigate={navigate} />;
    }
    if (cleanPath === '/calculators') {
      return <CategoryPage categoryKey="calculators" onNavigate={navigate} />;
    }
    if (cleanPath === '/converters') {
      return <CategoryPage categoryKey="converters" onNavigate={navigate} />;
    }
    if (cleanPath === '/generators') {
      return <CategoryPage categoryKey="generators" onNavigate={navigate} />;
    }
    if (cleanPath === '/guides') {
      return <GuidesListPage onNavigate={navigate} />;
    }
    if (cleanPath === '/favorites') {
      return <FavoritesPage onNavigate={navigate} />;
    }

    // 3. Legal & Company Pages
    if (cleanPath === '/about') {
      return <LegalPage pageType="about" onNavigate={navigate} />;
    }
    if (cleanPath === '/contact') {
      return <LegalPage pageType="contact" onNavigate={navigate} />;
    }
    if (cleanPath === '/privacy') {
      return <LegalPage pageType="privacy" onNavigate={navigate} />;
    }
    if (cleanPath === '/terms') {
      return <LegalPage pageType="terms" onNavigate={navigate} />;
    }
    if (cleanPath === '/disclaimer') {
      return <LegalPage pageType="disclaimer" onNavigate={navigate} />;
    }

    // 4. Guide Detail Pages (/guides/:slug)
    if (cleanPath.startsWith('/guides/')) {
      const guideSlug = cleanPath.replace('/guides/', '');
      return <GuideDetailPage slug={guideSlug} onNavigate={navigate} />;
    }

    // 5. Tool Detail Pages (/tools/:slug, /calculators/:slug, /converters/:slug, /generators/:slug)
    const matchTool = toolsData.find((t) => t.urlPath === cleanPath);
    if (matchTool) {
      return <ToolDetailPage slug={matchTool.slug} onNavigate={navigate} />;
    }

    // Check if path is just /:slug matching a tool
    const slugOnly = cleanPath.split('/').filter(Boolean).pop();
    if (slugOnly) {
      const fallbackTool = toolsData.find((t) => t.slug === slugOnly);
      if (fallbackTool) {
        return <ToolDetailPage slug={fallbackTool.slug} onNavigate={navigate} />;
      }
    }

    // 6. 404 Fallback
    return <NotFoundPage onNavigate={navigate} onOpenSearch={() => setIsSearchOpen(true)} />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer onNavigate={navigate} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigate}
      />

      <OfflineIndicator />
    </div>
  );
}
