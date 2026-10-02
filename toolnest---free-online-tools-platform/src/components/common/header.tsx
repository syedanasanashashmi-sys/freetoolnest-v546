import React, { useState, useEffect } from 'react';
import {
  Search, Sun, Moon, Laptop, Heart, Menu, X,
  Shield, Layers, ChevronDown
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { getFavorites } from '../../utils/favorites';
import { Theme, getStoredTheme, applyTheme } from '../../utils/theme';
import { PWAInstallButton } from './PWAInstallButton';
import { trackEvent } from '../../utils/analytics';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [favCount, setFavCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const current = getStoredTheme();
    setTheme(current);
    applyTheme(current);

    const updateFavs = () => {
      setFavCount(getFavorites().length);
    };
    updateFavs();

    window.addEventListener('toolnest_favorites_updated', updateFavs);
    return () => {
      window.removeEventListener('toolnest_favorites_updated', updateFavs);
    };
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setThemeDropdownOpen(false);
    trackEvent('theme_changed', { theme: newTheme });
  };

  const navLinks = [
    { name: 'All Tools', path: '/tools' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Converters', path: '/converters' },
    { name: 'Generators', path: '/generators' },
    { name: 'Guides', path: '/guides' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs group-hover:bg-blue-700 transition">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Tool<span className="text-blue-600 dark:text-blue-400">Nest</span>
                </span>
                <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 dark:text-blue-400">
                  FREE
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || currentPath.startsWith(`${link.path}/`);
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-slate-100 text-blue-600 dark:bg-slate-900 dark:text-blue-400'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700"
            aria-label="Search tools"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search tools...</span>
            <kbd className="hidden lg:inline-block rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:border-slate-700 dark:bg-slate-800">
              ⌘K
            </kbd>
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => onNavigate('/favorites')}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            aria-label="View Favorites"
            title="Favorite Tools"
          >
            <Heart className="h-4 w-4" />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {favCount}
              </span>
            )}
          </button>

          {/* PWA Install */}
          <div className="hidden sm:block">
            <PWAInstallButton />
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              aria-label="Change theme"
              title="Theme settings"
            >
              {theme === 'dark' ? (
                <Moon className="h-4 w-4" />
              ) : theme === 'light' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Laptop className="h-4 w-4" />
              )}
            </button>

            {themeDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-900 z-50"
                onClick={() => setThemeDropdownOpen(false)}
              >
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs ${
                    theme === 'light' ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-300'
                  } hover:bg-slate-50 dark:hover:bg-slate-800`}
                >
                  <Sun className="h-3.5 w-3.5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs ${
                    theme === 'dark' ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-300'
                  } hover:bg-slate-50 dark:hover:bg-slate-800`}
                >
                  <Moon className="h-3.5 w-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs ${
                    theme === 'system' ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-300'
                  } hover:bg-slate-50 dark:hover:bg-slate-800`}
                >
                  <Laptop className="h-3.5 w-3.5" />
                  <span>System</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 md:hidden items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(link.path);
                }}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-left transition ${
                  currentPath === link.path
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <span>{link.name}</span>
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/favorites');
              }}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Favorites</span>
              </div>
              {favCount > 0 && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600 dark:bg-red-950 dark:text-red-400">
                  {favCount}
                </span>
              )}
            </button>
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <PWAInstallButton />
          </div>
        </div>
      )}
    </header>
  );
};
