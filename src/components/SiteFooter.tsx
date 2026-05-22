import React from 'react';
import Link from 'next/link';
import { siteConfig } from '../config/site';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;

  return (
    <footer className="border-t border-[var(--brand-line)] bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <img src="/branding/junhai-logo.jpg" alt="Junhai Logo" className="h-10 w-10 rounded-full border border-amber-200 object-cover" />
          <div>
            <p className="text-sm font-semibold text-[var(--brand-navy)]">Foshan Junhai Trading Co., Ltd.</p>
            <p className="text-xs text-[var(--brand-ink-soft)]">Resource Integration · Experience Building · Global Connection</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50">
            WhatsApp
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50">
            LinkedIn
          </a>
          <Link href="/contact" className="rounded-full bg-[var(--brand-navy)] px-3 py-1.5 text-white">
            Contact
          </Link>
        </div>

        <p className="text-xs text-[var(--brand-ink-soft)]">© {year} JUNHAI Wholesale. All rights reserved.</p>
      </div>
    </footer>
  );
}
