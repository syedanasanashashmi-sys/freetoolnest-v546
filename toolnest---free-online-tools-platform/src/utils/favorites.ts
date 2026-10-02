const FAVORITES_KEY = 'toolnest_favorites';
const RECENT_TOOLS_KEY = 'toolnest_recent_tools';
const RECENT_SEARCHES_KEY = 'toolnest_recent_searches';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function isFavorite(toolSlug: string): boolean {
  const favs = getFavorites();
  return favs.includes(toolSlug);
}

export function toggleFavorite(toolSlug: string): boolean {
  const favs = getFavorites();
  let updated: string[];
  let added = false;
  if (favs.includes(toolSlug)) {
    updated = favs.filter((s) => s !== toolSlug);
  } else {
    updated = [toolSlug, ...favs];
    added = true;
  }
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('toolnest_favorites_updated', { detail: updated }));
  } catch (e) {}
  return added;
}

export function getRecentTools(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function recordRecentTool(toolSlug: string) {
  if (typeof window === 'undefined') return;
  try {
    const recents = getRecentTools().filter((s) => s !== toolSlug);
    const updated = [toolSlug, ...recents].slice(0, 12);
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('toolnest_recents_updated', { detail: updated }));
  } catch (e) {}
}

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function addRecentSearch(query: string) {
  if (typeof window === 'undefined' || !query.trim()) return;
  try {
    const clean = query.trim();
    const existing = getRecentSearches().filter((q) => q.toLowerCase() !== clean.toLowerCase());
    const updated = [clean, ...existing].slice(0, 8);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch (e) {}
}

export function clearRecentSearches() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (e) {}
}
