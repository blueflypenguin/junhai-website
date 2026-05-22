'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { siteConfig } from '../../src/config/site';
import LanguageSwitcher from '../../src/components/LanguageSwitcher';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('');
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Thanks. Our export team will reply within 24 hours.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-2 text-xs text-slate-600 sm:px-6 lg:px-8">
          B2B Export Supply | Foshan Junhai Trading Co., Ltd.
        </div>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Go to JUNHAI homepage">
            <img src="/branding/junhai-logo.jpg" alt="Junhai Logo" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="text-lg font-bold tracking-wide">JUNHAI</p>
              <p className="text-xs uppercase text-slate-500">JUNHAI Wholesale Division</p>
            </div>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900">Products</Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">Company</Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-900">Contact</Link>
            <LanguageSwitcher />
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Get Price Sheet
            </a>
          </div>
        </nav>
      </header>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black md:text-5xl">Connect With JUNHAI Sales Team</h1>
          <p className="mt-4 max-w-3xl text-slate-200">Send your target market and MOQ plan. We will provide matching SKUs and shipping options.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900">WhatsApp Direct</a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white">LinkedIn Message</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Contact Channels</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail size={16} /> {siteConfig.contact.email}</p>
            <p className="flex items-center gap-2"><Phone size={16} /> {siteConfig.contact.phone}</p>
            <p className="flex items-center gap-2"><MessageCircle size={16} /> {siteConfig.contact.whatsapp}</p>
            <p className="break-all">LinkedIn: <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="font-semibold text-slate-900 underline">{siteConfig.social.linkedin}</a></p>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">WhatsApp QR</p>
              <img src="/branding/whatsapp-qr.jpg" alt="WhatsApp QR Code" className="w-full rounded-xl border border-slate-200" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Business Card</p>
              <img src="/branding/business-card.png" alt="Junhai Business Card" className="w-full rounded-xl border border-slate-200" />
            </div>
          </div>
        </div>

        <div id="inquiry" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Business Inquiry</h2>
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
              required
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Business Email"
              required
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company"
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500 md:col-span-2"
            />
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us product type, target market, and quantity"
              required
              rows={5}
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500 md:col-span-2"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 md:col-span-2"
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Inquiry
            </button>
          </form>
          {status && <p className="mt-4 text-sm text-emerald-700">{status}</p>}
        </div>
      </section>
    </div>
  );
}
