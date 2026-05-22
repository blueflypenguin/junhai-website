'use client';

import React, { useEffect, useState } from 'react';

export type SiteLanguage = 'en' | 'zh' | 'es';

const STORAGE_KEY = 'site_language';

export function getBrowserLanguage(): SiteLanguage {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY) as SiteLanguage | null;
  if (saved === 'en' || saved === 'zh' || saved === 'es') return saved;
  window.localStorage.setItem(STORAGE_KEY, 'en');
  return 'en';
}

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<SiteLanguage>('en');

  useEffect(() => {
    setLang(getBrowserLanguage());
  }, []);

  const update = (next: SiteLanguage) => {
    setLang(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent('site-language-change', { detail: next }));
  };

  return (
    <select
      value={lang}
      onChange={(e) => update(e.target.value as SiteLanguage)}
      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
      aria-label="Language"
      title="Language"
    >
      <option value="en">EN</option>
      <option value="zh">中文</option>
      <option value="es">ES</option>
    </select>
  );
}
