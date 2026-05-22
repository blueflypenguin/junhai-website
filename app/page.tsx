'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Factory,
  Globe2,
  Mail,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from 'lucide-react';
import { siteConfig } from '../src/config/site';
import LanguageSwitcher, { getBrowserLanguage, SiteLanguage } from '../src/components/LanguageSwitcher';
import catalogProducts from '../src/data/catalogProducts.json';

const categories = [
  {
    title: 'Silicone Dolls',
    desc: 'Premium models for distributors and private-label adult product brands.',
    image: '/images/materials/product-head-pink-wig.jpg',
  },
  {
    title: 'TPE Dolls',
    desc: 'Cost-effective options for bulk wholesale and market testing.',
    image: '/images/materials/factory-face-detailing.jpg',
  },
  {
    title: 'Torso & Mini Dolls',
    desc: 'Compact products with lower shipping cost and flexible trial orders.',
    image: '/images/materials/factory-drying-line.jpg',
  },
  {
    title: 'Custom OEM Models',
    desc: 'Face, body, skin tone, makeup, packaging and logo customization.',
    image: '/images/materials/factory-packaging-area.jpg',
  },
];

const advantages = [
  {
    icon: Factory,
    title: 'China Factory Resources',
    desc: 'Direct access to selected silicone and TPE doll production resources in China.',
  },
  {
    icon: Boxes,
    title: 'Wholesale Price Advantage',
    desc: 'Factory-level pricing for importers, distributors, online stores and adult product brands.',
  },
  {
    icon: BadgeCheck,
    title: 'OEM / ODM Support',
    desc: 'Flexible customization for product design, private label branding and packaging.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Check Before Shipment',
    desc: 'Appearance, material surface, joints, accessories and packaging can be checked before dispatch.',
  },
  {
    icon: PackageCheck,
    title: 'Discreet Packaging',
    desc: 'Neutral cartons without adult-related words on the outside for privacy-focused shipping.',
  },
  {
    icon: Globe2,
    title: 'Global Shipping Support',
    desc: 'Sample express, air freight, sea freight and door-to-door shipping solutions available.',
  },
];

const process = [
  'Send Inquiry',
  'Get Catalog & Quote',
  'Confirm Sample',
  'Bulk Production',
  'Quality Check',
  'Global Shipment',
];

const faq = [
  {
    q: 'Are you a factory or trading company?',
    a: 'We are an integrated manufacturing and trading factory in China, supporting wholesale, OEM/ODM, and private-label cooperation with direct in-house production capability.',
  },
  {
    q: 'Can I order samples before bulk purchase?',
    a: 'Yes. Sample orders and small trial orders can be discussed before mass production.',
  },
  {
    q: 'Do you support private label packaging?',
    a: 'Yes. Logo, packaging box, manuals and accessory sets can be customized for qualified wholesale orders.',
  },
  {
    q: 'Do you provide discreet packaging?',
    a: 'Yes. We can use neutral cartons without adult-related descriptions on the outer packaging.',
  },
];

const CATEGORY_ORDER = [
  { zh: '全身定制硅胶娃娃', en: 'Full-Body Custom Silicone Dolls' },
  { zh: '半身倒模', en: 'Half-Body Molded Dolls' },
  { zh: '飞机杯', en: 'Masturbator Cups' },
  { zh: '女性玩具', en: 'Female Toys' },
  { zh: '情趣制服', en: 'Lingerie & Costumes' },
  { zh: '阳具', en: 'Dildos' },
  { zh: 'BDSM', en: 'BDSM' },
  { zh: '贞操锁', en: 'Chastity Cages' },
  { zh: '安全套', en: 'Condoms' },
] as const;

const COPY = {
  en: {
    topNotice: 'B2B wholesale supply for importers, distributors and private-label adult product brands.',
    topBadge: 'Fast quote · OEM/ODM · Discreet global shipping',
    navProducts: 'Products',
    navOEM: 'OEM/ODM',
    navFactory: 'Factory & QC',
    navShipping: 'Shipping',
    navContact: 'Contact',
    quote: 'Get Quote',
    catalogTitle: 'Distributor Catalog by Major Category',
    catalogDesc: 'Products synchronized from your latest Excel catalog with bilingual category display.',
    factoryExterior: 'Factory Exterior',
    factoryExteriorDesc: 'Modern production campus and stable large-scale manufacturing support.',
    wholesalePrice: 'Wholesale Price',
  },
  zh: {
    topNotice: '面向进口商、分销商、私牌品牌的B2B批发供货服务。',
    topBadge: '快速报价 · OEM/ODM · 隐私化全球物流',
    navProducts: '产品',
    navOEM: '定制',
    navFactory: '工厂与质检',
    navShipping: '物流',
    navContact: '联系',
    quote: '获取报价',
    catalogTitle: '按大分类展示的分销产品目录',
    catalogDesc: '已根据你提供的Excel同步产品，并支持中英文分类展示。',
    factoryExterior: '工厂外景',
    factoryExteriorDesc: '现代化生产园区，支持稳定规模化制造交付。',
    wholesalePrice: '批发价',
  },
} as const;

type CatalogProduct = {
  id: string;
  categoryZh: string;
  categoryEn: string;
  nameZh: string;
  nameEn: string;
  priceWholesale: string | number;
  image: string;
};

export default function Home() {
  const [lang, setLang] = useState<SiteLanguage>('en');
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;
  const linkedinHref = siteConfig.social.linkedin;
  const t = lang === 'zh' ? COPY.zh : COPY.en;

  const cleanCatalog = useMemo(
    () => (catalogProducts as CatalogProduct[]).filter((p) => p.nameZh && p.nameZh !== 'None'),
    []
  );

  const groupedCatalog = useMemo(
    () =>
      CATEGORY_ORDER.map((cat) => ({
        ...cat,
        items: cleanCatalog.filter((p) => p.categoryZh === cat.zh).slice(0, 4),
      })),
    [cleanCatalog]
  );

  useEffect(() => {
    setLang(getBrowserLanguage());
    const onLangChange = (event: Event) => {
      const next = (event as CustomEvent<SiteLanguage>).detail;
      if (next) setLang(next);
    };
    window.addEventListener('site-language-change', onLangChange as EventListener);
    return () => window.removeEventListener('site-language-change', onLangChange as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-900/80 text-xs text-slate-300 md:text-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:px-8">
          <span>{t.topNotice}</span>
          <span className="text-slate-400">{t.topBadge}</span>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white font-black text-slate-950">CN</div>
            <div>
              <div className="font-bold tracking-wide">China Doll Supply</div>
              <div className="text-xs text-slate-400">Wholesale · OEM · Factory Resources</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-slate-300 lg:flex">
            <a href="#products" className="hover:text-white">{t.navProducts}</a>
            <a href="#oem" className="hover:text-white">{t.navOEM}</a>
            <a href="#quality" className="hover:text-white">{t.navFactory}</a>
            <a href="#shipping" className="hover:text-white">{t.navShipping}</a>
            <a href="#quote" className="hover:text-white">{t.navContact}</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a href="#quote" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
              {t.quote}
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <CheckCircle2 size={16} /> Factory-direct B2B supply from China
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Silicone Doll Wholesale Supplier for Global Buyers
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Wholesale silicone and TPE dolls for importers, distributors, adult stores and private-label brands. We support OEM/ODM customization, discreet packaging and global shipping solutions.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#quote" className="flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-slate-950 transition hover:bg-slate-200">
                Request Wholesale Quote <ArrowRight size={18} />
              </a>
              <a href="#products" className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-bold transition hover:bg-white/10">
                View Product Lines
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-slate-300 md:grid-cols-4">
              {['OEM/ODM Available', 'Private Label Packaging', 'Sample Orders', 'Global Shipping'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-sm md:p-6">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
                <img src="/images/materials/brand-showroom.jpg" alt="Silicone doll wholesale hero" className="h-80 w-full object-cover md:h-[430px]" />
                <div className="grid grid-cols-3 border-t border-white/10">
                  <div className="border-r border-white/10 p-4">
                    <div className="text-2xl font-black">24h</div>
                    <div className="text-xs text-slate-400">Quote Response</div>
                  </div>
                  <div className="border-r border-white/10 p-4">
                    <div className="text-2xl font-black">OEM</div>
                    <div className="text-xs text-slate-400">Brand Support</div>
                  </div>
                  <div className="p-4">
                    <div className="text-2xl font-black">B2B</div>
                    <div className="text-xs text-slate-400">Wholesale Focus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 text-center text-sm text-slate-300 md:grid-cols-5 md:px-8">
          <div>Factory Resources</div>
          <div>Wholesale Price</div>
          <div>OEM/ODM</div>
          <div>Discreet Packaging</div>
          <div>Global Shipping</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] lg:grid lg:grid-cols-2">
          <img src="/images/materials/factory-exterior.jpg" alt="Factory exterior" className="h-72 w-full object-cover lg:h-full" />
          <div className="p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{t.factoryExterior}</p>
            <h2 className="mt-3 text-3xl font-black">{lang === 'zh' ? '规模化制造基地' : 'Large-Scale Manufacturing Base'}</h2>
            <p className="mt-4 text-slate-300">{t.factoryExteriorDesc}</p>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Product Lines</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Wholesale Products for Different Markets</h2>
          </div>
          <p className="max-w-xl leading-relaxed text-slate-300">
            Choose from silicone dolls, TPE dolls, torso models and custom OEM designs for online stores, distributors and adult product brands.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.title} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] transition hover:bg-white/[0.09]">
              <img src={cat.image} alt={cat.title} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold">{cat.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Distributor Catalog</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">{t.catalogTitle}</h2>
          <p className="mt-3 max-w-3xl text-slate-300">{t.catalogDesc}</p>
        </div>

        <div className="space-y-10">
          {groupedCatalog.map((group) => (
            <div key={group.zh}>
              <h3 className="mb-4 text-xl font-bold text-white">
                {lang === 'zh' ? group.zh : group.en}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                    <img
                      src={item.image || '/images/materials/factory-exterior.jpg'}
                      alt={lang === 'zh' ? item.nameZh : item.nameEn}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="line-clamp-2 text-sm font-semibold text-white">{lang === 'zh' ? item.nameZh : item.nameEn}</p>
                      <p className="mt-2 text-xs text-slate-400">
                        {lang === 'zh' ? '分类' : 'Category'}: {lang === 'zh' ? group.zh : group.en}
                      </p>
                      {item.priceWholesale !== '' && (
                        <p className="mt-2 text-sm text-emerald-300">
                          {t.wholesalePrice}: {item.priceWholesale}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Why Work With Us</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Built for Adult Product Importers</h2>
            <p className="mt-5 leading-relaxed text-slate-300">
              We help overseas buyers reduce sourcing risk with stable factory resources, flexible customization, quality checks and privacy-focused shipping support.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="oem" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">OEM / ODM</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Custom Doll Solutions for Your Brand</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            From body shape and face design to packaging and private label branding, we support flexible OEM/ODM services for qualified wholesale buyers.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {[
              'Custom face design',
              'Body shape options',
              'Skin tone selection',
              'Makeup customization',
              'Wig and eye options',
              'Private label logo',
              'Custom packaging box',
              'Accessory set planning',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <CheckCircle2 size={16} className="text-emerald-300" /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
          <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900 p-4">
            <img src="/images/materials/factory-airbrush-makeup.jpg" alt="Airbrush makeup process" className="h-44 w-full rounded-xl object-cover" />
            <img src="/images/materials/factory-face-detailing.jpg" alt="Face detailing process" className="h-44 w-full rounded-xl object-cover" />
            <p className="text-center text-sm text-slate-300">
              Real production snapshots: makeup refinement and detail finishing for OEM requests.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="rounded-[2rem] bg-white p-6 text-slate-950 md:p-10">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Cooperation Process</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">How Wholesale Cooperation Works</h2>
            </div>
            <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-bold text-white">
              Start Inquiry <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {process.map((step, index) => (
              <div key={step} className="min-h-32 rounded-2xl bg-slate-100 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 font-bold text-white">{index + 1}</div>
                <div className="font-bold leading-tight">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" className="border-y border-white/10 bg-slate-900/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 md:px-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-3xl font-black">Factory Resources & Quality Control</h2>
            <img src="/images/materials/factory-molding-workshop.jpg" alt="Factory molding workshop" className="mt-4 h-48 w-full rounded-xl object-cover" />
            <p className="mt-4 leading-relaxed text-slate-300">
              We support buyers with product selection, customization coordination, pre-shipment checking, packaging confirmation and shipment arrangement.
            </p>
            <div className="mt-7 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              {[
                'Appearance check',
                'Material surface check',
                'Joint movement check',
                'Accessory check',
                'Packaging check',
                'Buyer-specific requirements',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-300" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div id="shipping" className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950">
              <Truck size={28} />
            </div>
            <h2 className="text-3xl font-black">Discreet Packaging & Global Shipping</h2>
            <img src="/images/materials/factory-assembly-hall.jpg" alt="Factory assembly hall" className="mt-4 h-48 w-full rounded-xl object-cover" />
            <p className="mt-4 leading-relaxed text-slate-300">
              Products can be shipped in neutral cartons without adult-related words on the outside. Shipping solutions are selected based on destination, quantity and buyer requirements.
            </p>
            <div className="mt-7 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              {[
                'Neutral outer carton',
                'Privacy-focused shipment',
                'Sample express shipping',
                'Air freight',
                'Sea freight',
                'Door-to-door support',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-300" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
            <h3 className="text-2xl font-black">Factory Production Walkthrough</h3>
            <p className="mt-2 text-sm text-slate-300">Live clip from workshop floor, used for buyer trust verification.</p>
            <video
              className="mt-4 h-[420px] w-full rounded-xl object-cover"
              src="/videos/factory-production-walkthrough.mp4"
              poster="/images/materials/factory-drying-line.jpg"
              controls
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6">
            <h3 className="text-2xl font-black">Packing & Shipment Readiness</h3>
            <p className="mt-2 text-sm text-slate-300">Finished goods staging and carton preparation before export shipment.</p>
            <img src="/images/materials/factory-packaging-area.jpg" alt="Packing and shipment area" className="mt-4 h-[420px] w-full rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-20 md:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">FAQ</p>
          <h2 className="mt-3 text-3xl font-black md:text-5xl">Common Questions from Buyers</h2>
          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <h3 className="font-bold">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <MessageCircle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Request Wholesale Quote</h2>
              <p className="text-sm text-slate-500">Tell us your market, quantity and customization needs.</p>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Name" />
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Company Name" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Country" />
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Email" />
            </div>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="WhatsApp / Telegram" />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Product Type" />
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Estimated Quantity" />
            </div>
            <textarea className="min-h-32 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="OEM/ODM needs, target price range, shipping country or other requirements" />
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 py-4 font-bold text-white transition hover:bg-slate-800">
              Get My Wholesale Quote <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="flex items-center gap-2"><Mail size={16} /> {siteConfig.contact.email}</div>
            <div className="flex items-center gap-2"><Phone size={16} /> WhatsApp: {siteConfig.contact.whatsapp}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">WhatsApp</a>
            <a href={linkedinHref} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">LinkedIn</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <div className="text-lg font-bold text-white">China Doll Supply</div>
            <div className="mt-1">Factory-direct silicone and TPE doll wholesale supply from China.</div>
          </div>
          <div className="flex flex-wrap gap-5">
            <a href="#products" className="hover:text-white">Products</a>
            <a href="#oem" className="hover:text-white">OEM/ODM</a>
            <a href="#quality" className="hover:text-white">Factory & QC</a>
            <a href="#quote" className="hover:text-white">Get Quote</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

