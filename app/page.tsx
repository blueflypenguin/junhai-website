'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  PackageCheck,
  Globe2,
  ShieldCheck,
  Boxes,
  MessageCircle,
  Truck,
  BadgeCheck,
  Mail,
  Phone,
  Building2,
  PlayCircle,
} from 'lucide-react';
import { siteConfig } from '../src/config/site';
import LanguageSwitcher, { getBrowserLanguage, SiteLanguage } from '../src/components/LanguageSwitcher';
import catalogProducts from '../src/data/catalogProducts.json';

type CatalogProduct = {
  id: string;
  categoryZh: string;
  categoryEn: string;
  nameZh: string;
  nameEn: string;
  priceWholesale: number | string;
  image: string;
};

const categoryCards = [
  {
    slug: 'full-body-silicone-dolls',
    titleZh: '全身定制硅胶娃娃',
    titleEn: 'Full-Body Custom Silicone Dolls',
    fallback: '/images/docx-template/image4.png',
  },
  {
    slug: 'half-body-molded-dolls',
    titleZh: '半身倒模',
    titleEn: 'Half-Body Molded Dolls',
    fallback: '/images/docx-template/image5.png',
  },
  {
    slug: 'masturbator-cups',
    titleZh: '飞机杯',
    titleEn: 'Masturbator Cups',
    fallback: '/images/catalog/masturbator-cups-01.png',
  },
  {
    slug: 'female-toys',
    titleZh: '女性玩具',
    titleEn: 'Female Toys',
    fallback: '/images/catalog/female-toys-01.png',
  },
  {
    slug: 'lingerie-costumes',
    titleZh: '情趣制服',
    titleEn: 'Lingerie & Costumes',
    fallback: '/images/catalog/lingerie-costumes-01.png',
  },
  {
    slug: 'dildos',
    titleZh: '阳具',
    titleEn: 'Dildos',
    fallback: '/images/catalog/dildos-01.png',
  },
  {
    slug: 'bdsm',
    titleZh: 'BDSM',
    titleEn: 'BDSM',
    fallback: '/images/catalog/bdsm-01.jpg',
  },
  {
    slug: 'chastity-cages',
    titleZh: '贞操锁',
    titleEn: 'Chastity Cages',
    fallback: '/images/catalog/chastity-cages-01.png',
  },
  {
    slug: 'condoms',
    titleZh: '安全套',
    titleEn: 'Condoms',
    fallback: '/images/catalog/condoms-01.png',
  },
];

const legacyProductVisuals = [
  {
    titleEn: 'Silicone Dolls',
    titleZh: '硅胶娃娃',
    descEn: 'Premium models for distributors and private-label adult product brands.',
    descZh: '面向分销商与品牌客户的高品质产品。',
    visual: '/images/docx-template/image4.png',
  },
  {
    titleEn: 'TPE Dolls',
    titleZh: 'TPE 娃娃',
    descEn: 'Cost-effective options for bulk wholesale and market testing.',
    descZh: '适合批量采购与市场测试的高性价比选项。',
    visual: '/images/docx-template/image5.png',
  },
  {
    titleEn: 'Torso & Mini Dolls',
    titleZh: '半身与迷你款',
    descEn: 'Compact products with lower shipping cost and flexible trial orders.',
    descZh: '体积更小、运费更低，适合灵活试单。',
    visual: '/images/docx-template/image6.png',
  },
  {
    titleEn: 'Custom OEM Models',
    titleZh: 'OEM 定制款',
    descEn: 'Face, body, skin tone, makeup, packaging and logo customization.',
    descZh: '支持脸型、体型、肤色、妆容、包装与 logo 定制。',
    visual: '/images/docx-template/image7.png',
  },
];

const homeCopy = {
  en: {
    topLineLeft: 'B2B wholesale supply for importers, distributors and private-label adult product brands.',
    topLineRight: 'Fast quote · OEM/ODM · Discreet global shipping',
    companyCardTitle: 'JUNHAI Business Card',
    companyCardSub: 'Factory + Trading integrated service for global B2B buyers',
    companyName: 'Company Name',
    companyType: 'Company Type',
    companyTypeValue: 'Integrated Factory + Trading',
    email: 'Email',
    whatsapp: 'WhatsApp',
    productLinesTag: 'Product Lines',
    productLinesTitle: 'Wholesale Products for Different Markets',
    productLinesDesc: '',
    quickEntry: '9 Categories Quick Entry',
    factoryMediaTag: 'Factory Media',
    factoryMediaTitle: 'Factory Videos & Real-Scene Gallery',
    factoryMediaDesc: 'Homepage displays factory video. Click the button to open the real factory gallery.',
    factoryMediaButton: 'View Factory Gallery',
  },
  zh: {
    topLineLeft: '面向进口商、分销商和品牌客户的 B2B 批发供应。',
    topLineRight: '快速报价 · OEM/ODM · 隐私物流',
    companyCardTitle: 'JUNHAI 企业名片',
    companyCardSub: '工厂 + 外贸一体化服务，面向全球 B2B 买家',
    companyName: '公司名称',
    companyType: '公司类型',
    companyTypeValue: '工贸一体化工厂',
    email: '邮箱',
    whatsapp: 'WhatsApp',
    productLinesTag: '产品线',
    productLinesTitle: '面向不同市场的批发产品',
    productLinesDesc: '',
    quickEntry: '9 大分类快速入口',
    factoryMediaTag: '工厂媒体',
    factoryMediaTitle: '工厂视频与实景图库',
    factoryMediaDesc: '首页展示工厂视频，点击按钮进入工厂实景图素材库。',
    factoryMediaButton: '查看工厂实景图库',
  },
};

const categoryToZh: Record<string, string> = {
  'full-body-silicone-dolls': '全身定制硅胶娃娃',
  'half-body-molded-dolls': '半身倒模',
  'masturbator-cups': '飞机杯',
  'female-toys': '女性玩具',
  'lingerie-costumes': '情趣制服',
  dildos: '阳具',
  bdsm: 'BDSM',
  'chastity-cages': '贞操锁',
  condoms: '安全套',
};

const factoryCapabilities = [
  {
    title: 'R&D Sculpting',
    desc: 'Clay sculpting drafts and head sculpting semi-finished assets for custom development.',
    image: '/images/docx-template/image11.png',
  },
  {
    title: 'TPE/Silicone Production',
    desc: 'Medical-grade material filling and inner metal skeleton baking/forming process.',
    image: '/images/docx-template/image12.png',
  },
  {
    title: 'Hand-painted Makeup',
    desc: 'Clean workshop detailing for realistic face finishing and stable quality control.',
    image: '/images/docx-template/image13.png',
  },
  {
    title: 'QC & Secure Logistics',
    desc: 'Pre-shipment tensile checks and neutral heavy-duty packing for discreet export.',
    image: '/images/docx-template/image14.png',
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
    a: 'We are a direct factory with integrated manufacturing and trading operations in China, offering one-stop OEM/ODM and wholesale support.',
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

export default function Home() {
  const [lang, setLang] = useState<SiteLanguage>('en');
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;
  const catalogItems = catalogProducts as CatalogProduct[];
  const t = homeCopy[lang];

  useEffect(() => {
    setLang(getBrowserLanguage());

    const onLangChange = (event: Event) => {
      const next = (event as CustomEvent<SiteLanguage>).detail;
      if (next) setLang(next);
    };

    window.addEventListener('site-language-change', onLangChange as EventListener);
    return () => window.removeEventListener('site-language-change', onLangChange as EventListener);
  }, []);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewImage(null);
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  const categoryCover: Record<string, string> = {};
  for (const card of categoryCards) {
    const found = catalogItems.find((item) => item.categoryZh === categoryToZh[card.slug] && item.image);
    categoryCover[card.slug] = found?.image || card.fallback;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-900/80 text-xs md:text-sm text-slate-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <span>{t.topLineLeft}</span>
          <span className="text-slate-400">{t.topLineRight}</span>
        </div>
      </div>

      <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/branding/junhai-logo.jpg" alt="Junhai Logo" className="w-10 h-10 rounded-full border border-white/30 object-cover" />
            <div>
              <div className="font-bold tracking-wide">JUNHAI International Trading Co., Ltd.</div>
              <div className="text-xs text-slate-400">Foshan, China · Wholesale · OEM · Factory Resources</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-300">
            <a href="#products" className="hover:text-white">Products</a>
            <a href="#oem" className="hover:text-white">OEM/ODM</a>
            <a href="#quality" className="hover:text-white">Factory & QC</a>
            <a href="#shipping" className="hover:text-white">Shipping</a>
            <a href="#quote" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a href="#quote" className="rounded-full bg-white text-slate-950 px-5 py-2.5 text-sm font-semibold hover:bg-slate-200 transition">
              Get Quote
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 mb-6">
              <CheckCircle2 size={16} /> Factory-direct B2B supply from China
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Silicone Doll Wholesale Supplier for Global Buyers
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Wholesale silicone and TPE dolls for importers, distributors, adult stores and private-label brands. We support OEM/ODM customization, discreet packaging and global shipping solutions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#quote" className="rounded-full bg-white text-slate-950 px-7 py-4 font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition">
                Request Wholesale Quote <ArrowRight size={18} />
              </a>
              <a href="#products" className="rounded-full border border-white/20 px-7 py-4 font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition">
                View Product Lines
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-300">
              {[
                'OEM/ODM Available',
                'Private Label Packaging',
                'Sample Orders',
                'Global Shipping',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-w-[560px] mx-auto">
            <div className="rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl p-3 md:p-4 backdrop-blur-sm">
              <div className="rounded-[1.5rem] bg-slate-900 border border-white/10 overflow-hidden">
                <img src="/images/docx-template/image2.png" alt="Hero right visual" className="block w-full h-auto object-contain bg-slate-950" />
                <div className="grid grid-cols-3 border-t border-white/10">
                  <div className="p-4 border-r border-white/10">
                    <div className="text-2xl font-black">24h</div>
                    <div className="text-xs text-slate-400">Quote Response</div>
                  </div>
                  <div className="p-4 border-r border-white/10">
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
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm text-slate-300">
          <div>Factory Resources</div>
          <div>Wholesale Price</div>
          <div>OEM/ODM</div>
          <div>Discreet Packaging</div>
          <div>Global Shipping</div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black">{t.companyCardTitle}</h2>
              <p className="text-sm text-slate-300">{t.companyCardSub}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-slate-400">{t.companyName}</p>
              <p className="mt-1 font-semibold">{siteConfig.company.name}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-slate-400">{t.companyType}</p>
              <p className="mt-1 font-semibold">{t.companyTypeValue}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-slate-400">{t.email}</p>
              <p className="mt-1 font-semibold">{siteConfig.contact.email}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-slate-400">{t.whatsapp}</p>
              <p className="mt-1 font-semibold">{siteConfig.contact.whatsapp}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{t.productLinesTag}</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black">{t.productLinesTitle}</h2>
          </div>
          {t.productLinesDesc ? (
            <p className="text-slate-300 max-w-xl leading-relaxed">
              {t.productLinesDesc}
            </p>
          ) : null}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {legacyProductVisuals.map((item) => (
            <div key={item.titleEn} className="rounded-[1.5rem] bg-white/[0.06] border border-white/10 overflow-hidden hover:bg-white/[0.09] transition">
              <div className="h-52 bg-slate-900 flex items-center justify-center p-2">
                <img src={item.visual} alt={lang === 'zh' ? item.titleZh : item.titleEn} className="h-full w-full object-contain" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold">{lang === 'zh' ? item.titleZh : item.titleEn}</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{lang === 'zh' ? item.descZh : item.descEn}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-sm text-slate-300 mb-4">{t.quickEntry}</p>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {categoryCards.map((cat) => (
            <div key={cat.slug} className="rounded-xl bg-white/[0.05] border border-white/10 overflow-hidden hover:bg-white/[0.09] transition">
              <Link href={`/products?category=${cat.slug}`} className="block h-28 bg-slate-900 flex items-center justify-center p-1.5">
                <img src={categoryCover[cat.slug]} alt={lang === 'zh' ? cat.titleZh : cat.titleEn} className="h-full w-full object-contain" />
              </Link>
              <div className="p-2.5">
                <Link href={`/products?category=${cat.slug}`} className="text-xs font-semibold leading-tight hover:underline line-clamp-2 block">
                  {lang === 'zh' ? cat.titleZh : cat.titleEn}
                </Link>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Why Work With Us</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black">Built for Adult Product Importers</h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              We help overseas buyers reduce sourcing risk with stable factory resources, flexible customization, quality checks and privacy-focused shipping support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] bg-white/[0.05] border border-white/10 p-6">
                  <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-slate-300 leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="oem" className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">OEM / ODM</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black">Custom Doll Solutions for Your Brand</h2>
          <p className="mt-6 text-slate-300 leading-relaxed text-lg">
            From body shape and face design to packaging and private label branding, we support flexible OEM/ODM services for qualified wholesale buyers.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
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
              <div key={item} className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3">
                <CheckCircle2 size={16} className="text-emerald-300" /> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-sky-400/[0.08] p-4 md:p-6 shadow-[0_20px_60px_-30px_rgba(56,189,248,0.45)]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200/30 bg-sky-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100">
            OEM / ODM Preview
          </div>
          <div className="rounded-[1.5rem] overflow-hidden border border-white/10 bg-black/60 backdrop-blur-sm">
            <img src="/images/docx-template/image9.png" alt="OEM ODM configuration solutions" className="w-full max-h-[560px] object-contain bg-slate-950/80" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Manufacturing Excellence</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black">Verified Source Manufacturing Capability</h2>
          <p className="mt-4 text-slate-300 max-w-3xl">
            Over 5,000 m2 cooperative manufacturing base. Strict QC inspection standard before global discreet shipping.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {factoryCapabilities.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.05] overflow-hidden">
              <div className="h-52 bg-slate-900 flex items-center justify-center p-2">
                <img src={item.image} alt={item.title} className="h-full w-full object-contain" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{t.factoryMediaTag}</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black">{t.factoryMediaTitle}</h2>
              <p className="mt-3 text-slate-300">{t.factoryMediaDesc}</p>
            </div>
            <Link href="/factory-gallery" className="rounded-full border border-white/20 px-6 py-3 font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/10">
              {t.factoryMediaButton} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
            <video className="w-full h-[260px] md:h-[420px] object-cover" controls muted preload="metadata" poster="/images/materials/factory-exterior.jpg">
              <source src="/videos/factory-production-walkthrough.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300">
            <PlayCircle size={16} /> factory-production-walkthrough.mp4
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="rounded-[2rem] bg-white text-slate-950 p-6 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Cooperation Process</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black">How Wholesale Cooperation Works</h2>
            </div>
            <a href="#quote" className="rounded-full bg-slate-950 text-white px-6 py-3 font-bold inline-flex items-center justify-center gap-2">
              Start Inquiry <ArrowRight size={18} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {process.map((step, index) => (
              <div key={step} className="rounded-2xl bg-slate-100 p-5 min-h-32">
                <div className="w-9 h-9 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold mb-4">{index + 1}</div>
                <div className="font-bold leading-tight">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" className="bg-slate-900/60 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid lg:grid-cols-2 gap-8">
          <div className="rounded-[2rem] bg-white/[0.05] border border-white/10 p-7">
            <div className="w-14 h-14 rounded-2xl bg-white text-slate-950 flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-3xl font-black">Factory Resources & Quality Control</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              We support buyers with product selection, customization coordination, pre-shipment checking, packaging confirmation and shipment arrangement.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
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

          <div id="shipping" className="rounded-[2rem] bg-white/[0.05] border border-white/10 p-7">
            <div className="w-14 h-14 rounded-2xl bg-white text-slate-950 flex items-center justify-center mb-6">
              <Truck size={28} />
            </div>
            <h2 className="text-3xl font-black">Discreet Packaging & Global Shipping</h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Products can be shipped in neutral cartons without adult-related words on the outside. Shipping solutions are selected based on destination, quantity and buyer requirements.
            </p>
            <div className="mt-7 grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
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

      <section id="quote" className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">FAQ</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black">Common Questions from Buyers</h2>
          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-2xl bg-white/[0.05] border border-white/10 p-5">
                <h3 className="font-bold">{item.q}</h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white text-slate-950 p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center">
              <MessageCircle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Request Wholesale Quote</h2>
              <p className="text-sm text-slate-500">Tell us your market, quantity and customization needs.</p>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Name" />
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Company Name" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Country" />
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Email" />
            </div>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="WhatsApp / LinkedIn" />
            <div className="grid md:grid-cols-2 gap-4">
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Product Type" />
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="Estimated Quantity" />
            </div>
            <textarea className="w-full min-h-32 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-950" placeholder="OEM/ODM needs, target price range, shipping country or other requirements" />
            <button type="button" className="w-full rounded-full bg-slate-950 text-white py-4 font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition">
              Get My Wholesale Quote <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Mail size={16} /> {siteConfig.contact.email}</div>
            <div className="flex items-center gap-2"><Phone size={16} /> WhatsApp: {siteConfig.contact.whatsapp}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">WhatsApp</a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">LinkedIn</a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="rounded-[2rem] bg-white text-slate-950 p-6 md:p-8 shadow-2xl">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
            <div>
              <h3 className="text-2xl font-black">Contact Channels</h3>
              <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-100 px-4 py-3 font-medium">{siteConfig.contact.email}</div>
                <div className="rounded-xl bg-slate-100 px-4 py-3 font-medium">{siteConfig.contact.phone}</div>
                <div className="rounded-xl bg-slate-100 px-4 py-3 font-medium">{siteConfig.contact.whatsapp}</div>
                <div className="rounded-xl bg-slate-100 px-4 py-3 font-medium break-all">LinkedIn: {siteConfig.social.linkedin}</div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-slate-950 text-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-800">WhatsApp</a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">LinkedIn</a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">WhatsApp QR Code</p>
                <button
                  type="button"
                  onClick={() => setPreviewImage({ src: '/branding/whatsapp-qr.jpg', alt: 'WhatsApp QR Code' })}
                  className="w-full max-w-[280px] aspect-square rounded-xl border border-slate-300 bg-white p-2 cursor-zoom-in"
                >
                  <img src="/branding/whatsapp-qr.jpg" alt="WhatsApp QR Code" className="w-full h-full object-contain" />
                </button>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">Junhai Business Card</p>
                <button
                  type="button"
                  onClick={() => setPreviewImage({ src: '/branding/business-card.png', alt: 'Junhai Business Card' })}
                  className="w-full max-w-[320px] rounded-xl border border-slate-300 cursor-zoom-in"
                >
                  <img src="/branding/business-card.png" alt="Junhai Business Card" className="w-full rounded-xl object-contain bg-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 rounded-full border border-white/30 px-3 py-1.5 text-sm text-white hover:bg-white/10"
            >
              Close
            </button>
            <div className="rounded-2xl bg-white p-3">
              <img src={previewImage.src} alt={previewImage.alt} className="w-full max-h-[82vh] object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-slate-400">
          <div>
            <div className="text-white font-bold text-lg">JUNHAI International Trading Co., Ltd.</div>
            <div className="mt-1">Factory-direct wholesale supply with OEM/ODM support for global B2B buyers.</div>
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
