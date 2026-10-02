export type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'toolnest_theme';

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const val = localStorage.getItem(THEME_KEY) as Theme;
    return val === 'light' || val === 'dark' || val === 'system' ? val : 'system';
  } catch (e) {
    return 'system';
  }
}

export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } else if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}
