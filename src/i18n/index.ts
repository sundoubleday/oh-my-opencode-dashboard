import * as React from 'react';
import type { Locale, Translations } from './types';
import { en } from './locales/en';
import { zh } from './locales/zh';

const STORAGE_KEY = 'omoDashboardLang';

const translations: Record<Locale, Translations> = { en, zh };

// Detect browser language
function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch {
    // Ignore localStorage errors
  }
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) return 'zh';
  return 'en';
}

interface I18nContextType {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: Translations;
}

const I18nContext = React.createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Locale>(detectLocale);

  const setLang = React.useCallback((newLang: Locale) => {
    setLangState(newLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore localStorage errors
    }
    document.documentElement.setAttribute('data-lang', newLang);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  const value: I18nContextType = React.useMemo(() => ({
    lang,
    setLang,
    t: translations[lang],
  }), [lang, setLang]);

  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useI18n(): I18nContextType {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export type { Locale, Translations };
