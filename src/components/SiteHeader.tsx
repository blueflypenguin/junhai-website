'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { siteConfig } from '../config/site';

const NAV_ITEMS = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'Company' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const whatsappHref = useMemo(
    () => `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`,
    []
  );

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--brand-line)] bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-2 text-[11px] text-[var(--brand-ink-soft)] sm:px-6 lg:px-8">
        B2B Export Supply | Foshan Junhai Trading Co., Ltd.
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Go to JUNHAI homepage">
          <img src="/branding/junhai-logo.jpg" alt="Junhai Logo" className="h-11 w-11 rounded-full border border-amber-200 object-cover" />
          <div>
            <p className="text-base font-black tracking-wide text-[var(--brand-navy)]">JUNHAI</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--brand-ink-soft)]">Wholesale Division</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? 'text-sm font-bold text-[var(--brand-navy)]'
                    : 'text-sm font-medium text-[var(--brand-ink-soft)] hover:text-[var(--brand-navy)]'
                }
              >
                {item.label}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-[var(--brand-navy)] px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Get Price Sheet
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  pathname === item.href
                    ? 'rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-[var(--brand-navy)]'
                    : 'rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50'
                }
              >
                {item.label}
              </Link>
            ))}
            <div className="px-2">
              <LanguageSwitcher />
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[var(--brand-navy)] px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Get Price Sheet
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
