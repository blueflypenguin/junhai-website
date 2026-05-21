'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  Download,
  Globe2,
  PackageCheck,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { products } from '../src/data/products';
import { siteConfig } from '../src/config/site';

const capabilityCards = [
  { title: 'OEM / Private Label', value: 'Supported', desc: 'Packaging, insert cards, and barcode labeling.' },
  { title: 'MOQ Strategy', value: 'From 10 pcs', desc: 'Mix-order support for faster market testing.' },
  { title: 'Compliance', value: 'CE / RoHS / FDA', desc: 'Documents can be provided with each shipment.' },
  { title: 'Lead Time', value: '5-10 Days', desc: 'Typical delivery window for key destinations.' },
];

const buyerFlow = [
  { step: '01', title: 'Send Inquiry', desc: 'Share market, category, and target pricing.' },
  { step: '02', title: 'Receive Offer', desc: 'Get quote sheet, MOQ matrix, and lead time plan.' },
  { step: '03', title: 'Sample / PO', desc: 'Sample validation, then bulk order confirmation.' },
  { step: '04', title: 'Dispatch', desc: 'Discreet logistics with export-ready documents.' },
];

export default function Home() {
  const featuredProducts = products.slice(0, 6);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [downloading, setDownloading] = useState(false);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;
  const linkedinHref = siteConfig.social.linkedin;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setSubscribeMessage(data.message || data.error);
      if (response.ok) setEmail('');
    } catch {
      setSubscribeMessage('Submit failed. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  const handleDownload = async (type: 'catalog' | 'pricelist') => {
    setDownloading(true);
    try {
      const response = await fetch(`/api/download?type=${type}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = type === 'catalog' ? 'JUNHAI_Catalog.csv' : 'JUNHAI_PriceList.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-2 text-xs text-slate-600 sm:px-6 lg:px-8">
          B2B Export Supply | Foshan Junhai Trading Co., Ltd.
        </div>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/branding/junhai-logo.jpg" alt="Junhai Logo" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="text-lg font-bold tracking-wide">JUNHAI</p>
              <p className="text-xs uppercase text-slate-500">JUNHAI Wholesale Division</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900">Products</Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">Company</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">Contact</Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get Price Sheet
            </a>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="space-y-7">
            <span className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
              Professional B2B Supplier Network
            </span>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Scalable Wholesale Supply for
              <span className="block text-amber-300">Distributors and Retail Chains</span>
            </h1>
            <p className="max-w-xl text-base text-slate-200 md:text-lg">
              Junhai provides cross-border B2B sourcing solutions with stable MOQ plans, compliant product documentation,
              and export-ready logistics for North America, EU, and APAC buyers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300"
              >
                Request RFQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button
                onClick={() => handleDownload('catalog')}
                className="inline-flex items-center rounded-lg border border-slate-300/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Download Catalog
                <Download className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 text-sm text-slate-200">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-extrabold text-white">500+</p>
                <p>SKU Capacity</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-extrabold text-white">50+</p>
                <p>Countries Served</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="mb-5 text-lg font-bold">Procurement Highlights</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {capabilityCards.map((item) => (
                <div key={item.title} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-300">{item.title}</p>
                  <p className="mt-1 text-xl font-extrabold text-amber-300">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="rounded-xl border border-slate-200 p-5">
            <Building2 className="h-6 w-6 text-slate-800" />
            <p className="mt-3 font-bold">Enterprise Account System</p>
            <p className="mt-1 text-sm text-slate-600">Dedicated account support for recurring B2B orders.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <ShieldCheck className="h-6 w-6 text-slate-800" />
            <p className="mt-3 font-bold">Compliance Documentation</p>
            <p className="mt-1 text-sm text-slate-600">COA, certifications, and product declarations supported.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <Truck className="h-6 w-6 text-slate-800" />
            <p className="mt-3 font-bold">Global Fulfillment</p>
            <p className="mt-1 text-sm text-slate-600">DHL and FedEx channels with discreet shipment options.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-5">
            <Globe2 className="h-6 w-6 text-slate-800" />
            <p className="mt-3 font-bold">Cross-Border Experience</p>
            <p className="mt-1 text-sm text-slate-600">Focused on distributor, marketplace, and chain retail buyers.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected Items</p>
            <h2 className="mt-1 text-3xl font-black">B2B Hot-Selling SKUs</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            View all products
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-500">SKU {product.id}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{product.name}</h3>
                </div>
                <PackageCheck className="h-5 w-5 text-slate-500" />
              </div>
              <p className="min-h-[48px] text-sm text-slate-600">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {(product.certified ?? []).map((cert) => (
                  <span key={cert} className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                    {cert}
                  </span>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-sm">
                <div>
                  <p className="text-slate-500">Unit Price</p>
                  <p className="font-bold text-slate-900">${product.price}</p>
                </div>
                <div>
                  <p className="text-slate-500">MOQ</p>
                  <p className="font-bold text-slate-900">{product.moq}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">How We Work</p>
            <h2 className="mt-2 text-3xl font-black">B2B Cooperation Workflow</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {buyerFlow.map((item) => (
              <div key={item.step} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold text-amber-300">STEP {item.step}</p>
                <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Business Updates</p>
            <h2 className="mt-2 text-3xl font-black">Get Weekly Product and Pricing Updates</h2>
            <p className="mt-3 text-slate-600">
              Subscribe with your business email to receive catalog refresh, stock alerts, and promotional wholesale offers.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-wrap gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Business email"
                required
                className="min-w-[280px] flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
              >
                {subscribing ? 'Submitting...' : 'Subscribe'}
              </button>
            </form>
            {subscribeMessage && <p className="mt-3 text-sm text-slate-600">{subscribeMessage}</p>}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xl font-bold">Quick Access for Buyers</h3>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Compliance-ready catalog and quote sheets
              </div>
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Typical response within 24 business hours
              </div>
              <div className="flex items-center gap-2">
                <PackageCheck className="h-4 w-4" />
                Mixed SKU order support for pilot launches
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => handleDownload('catalog')}
                disabled={downloading}
                className="inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                <Download className="mr-2 h-4 w-4" />
                {downloading ? 'Preparing...' : 'Catalog CSV'}
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                WhatsApp Quote
              </a>
              <a
                href={linkedinHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                LinkedIn Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <img src="/branding/junhai-logo.jpg" alt="Junhai Logo" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-slate-800">Foshan Junhai Trading Co., Ltd.</p>
              <p>Resource Integration · Experience Building · Global Connection</p>
            </div>
          </div>
          <p>© 2026 JUNHAI / JUNHAI Wholesale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

