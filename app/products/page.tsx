'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Filter, PackageCheck } from 'lucide-react';
import { products, categories } from '../../src/data/products';
import { siteConfig } from '../../src/config/site';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const certMatch = selectedCerts.length === 0 || selectedCerts.some((cert) => (product.certified ?? []).includes(cert));
      return categoryMatch && certMatch;
    });
  }, [selectedCategory, selectedCerts]);

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
            <Link href="/products" className="text-sm font-semibold text-slate-900">Products</Link>
            <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">Company</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">Contact</Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Get Price Sheet
            </a>
          </div>
        </nav>
      </header>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black md:text-5xl">B2B Product Portfolio</h1>
          <p className="mt-4 max-w-3xl text-slate-200">Filtered by category and compliance tags for distributor-level sourcing.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Filter size={18} /> Filter
            </h2>

            <div className="mb-6">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Category</h3>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`mb-2 block w-full rounded-lg px-3 py-2 text-left text-sm ${selectedCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                All Products
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`mb-2 block w-full rounded-lg px-3 py-2 text-left text-sm ${selectedCategory === cat.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Certification</h3>
              {['CE认证', 'RoHS', 'FDA'].map((cert) => (
                <label key={cert} className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedCerts.includes(cert)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedCerts([...selectedCerts, cert]);
                      else setSelectedCerts(selectedCerts.filter((c) => c !== cert));
                    }}
                  />
                  {cert}
                </label>
              ))}
            </div>
          </aside>

          <div>
            <p className="mb-5 text-sm text-slate-600">Showing {filteredProducts.length} products</p>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-500">SKU {product.id}</p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900">{product.name}</h3>
                    </div>
                    <PackageCheck className="h-5 w-5 text-slate-500" />
                  </div>
                  <p className="min-h-[48px] text-sm text-slate-600">{product.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {(product.certified ?? []).slice(0, 3).map((cert) => (
                      <span key={cert} className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">{cert}</span>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3 text-sm">
                    <div>
                      <p className="text-slate-500">Unit Price</p>
                      <p className="font-bold text-slate-900">${product.price}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">MOQ</p>
                      <p className="font-bold text-slate-900">{product.moq}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800">WhatsApp</a>
                    <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100">LinkedIn</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
