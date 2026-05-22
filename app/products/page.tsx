"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, ExternalLink } from 'lucide-react';
import LanguageSwitcher, { getBrowserLanguage, SiteLanguage } from '../../src/components/LanguageSwitcher';
import { siteConfig } from '../../src/config/site';
import catalogProducts from '../../src/data/catalogProducts.json';

type CatalogProduct = {
  id: string;
  categoryZh: string;
  categoryEn: string;
  nameZh: string;
  nameEn: string;
  priceWholesale: number | string;
  image: string;
};

const CATEGORY_ORDER = [
  { slug: 'full-body-silicone-dolls', zh: '全身定制硅胶娃娃', en: 'Full-Body Custom Silicone Dolls', fallbackImage: '/images/docx-template/image4.png' },
  { slug: 'half-body-molded-dolls', zh: '半身倒模', en: 'Half-Body Molded Dolls', fallbackImage: '/images/docx-template/image5.png' },
  { slug: 'masturbator-cups', zh: '飞机杯', en: 'Masturbator Cups', fallbackImage: '/images/catalog/masturbator-cups-01.png' },
  { slug: 'female-toys', zh: '女性玩具', en: 'Female Toys', fallbackImage: '/images/catalog/female-toys-01.png' },
  { slug: 'lingerie-costumes', zh: '情趣制服', en: 'Lingerie & Costumes', fallbackImage: '/images/catalog/lingerie-costumes-01.png' },
  { slug: 'dildos', zh: '阳具', en: 'Dildos', fallbackImage: '/images/catalog/dildos-01.png' },
  { slug: 'bdsm', zh: 'BDSM', en: 'BDSM', fallbackImage: '/images/catalog/bdsm-01.jpg' },
  { slug: 'chastity-cages', zh: '贞操锁', en: 'Chastity Cages', fallbackImage: '/images/catalog/chastity-cages-01.png' },
  { slug: 'condoms', zh: '安全套', en: 'Condoms', fallbackImage: '/images/catalog/condoms-01.png' },
];

const copy = {
  en: {
    topLineLeft: 'B2B wholesale supply for importers, distributors and private-label adult product brands.',
    topLineRight: 'Fast quote · OEM/ODM · Discreet global shipping',
    home: 'Home',
    catalog: 'Catalog',
    factoryGallery: 'Factory Gallery',
    contact: 'Contact',
    pageTitle: 'Product Catalog',
    pageDesc: 'Same visual style as homepage. Product detail cards hide price, and inquiry is handled via LinkedIn or WhatsApp.',
    allCategories: 'All Categories',
    countSuffix: 'products',
    empty: 'No products imported in this category yet.',
    contactLinkedIn: 'LinkedIn',
    contactWhatsApp: 'WhatsApp',
    footerDesc: 'Factory-direct wholesale supply with OEM/ODM support for global B2B buyers.',
  },
  zh: {
    topLineLeft: '面向进口商、分销商和品牌客户的 B2B 批发供应。',
    topLineRight: '快速报价 · OEM/ODM · 隐私物流',
    home: '首页',
    catalog: '产品目录',
    factoryGallery: '工厂图库',
    contact: '联系',
    pageTitle: '产品分类目录',
    pageDesc: '色彩风格与主页统一。产品详情不显示价格，如需规格和报价请联系 LinkedIn 或 WhatsApp。',
    allCategories: '全部分类',
    countSuffix: '个产品',
    empty: '该分类暂未导入产品数据',
    contactLinkedIn: 'LinkedIn',
    contactWhatsApp: 'WhatsApp',
    footerDesc: '工厂直供，支持 OEM/ODM，为全球 B2B 客户提供稳定供货。',
  },
};

export default function ProductsPage() {
  const [lang, setLang] = useState<SiteLanguage>('en');
  const [categoryParam, setCategoryParam] = useState('');

  useEffect(() => {
    setLang(getBrowserLanguage());

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setCategoryParam(params.get('category') ?? '');
    }

    const onLangChange = (event: Event) => {
      const next = (event as CustomEvent<SiteLanguage>).detail;
      if (next) setLang(next);
    };

    window.addEventListener('site-language-change', onLangChange as EventListener);
    return () => window.removeEventListener('site-language-change', onLangChange as EventListener);
  }, []);

  const selectedCategory = CATEGORY_ORDER.find((item) => item.slug === categoryParam);
  const categoryList = selectedCategory ? [selectedCategory] : CATEGORY_ORDER;
  const allProducts = catalogProducts as CatalogProduct[];
  const t = copy[lang];

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;
  const linkedinHref = siteConfig.social.linkedin;

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
          <Link href="/" className="flex items-center gap-3">
            <img src="/branding/junhai-logo.jpg" alt="Junhai Logo" className="w-10 h-10 rounded-full border border-white/30 object-cover" />
            <div>
              <div className="font-bold tracking-wide">JUNHAI International Trading Co., Ltd.</div>
              <div className="text-xs text-slate-400">Foshan, China · Wholesale · OEM · Factory Resources</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">{t.home}</Link>
            <a href="#catalog" className="hover:text-white">{t.catalog}</a>
            <Link href="/factory-gallery" className="hover:text-white">{t.factoryGallery}</Link>
            <Link href="/#quote" className="hover:text-white">{t.contact}</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full bg-white text-slate-950 px-5 py-2.5 text-sm font-semibold hover:bg-slate-200 transition">
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-white/10 bg-[linear-gradient(130deg,#0a1f43_0%,#163f7a_55%,#2f5ca7_100%)] py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl font-black md:text-5xl">{t.pageTitle}</h1>
          <p className="mt-4 max-w-3xl text-slate-200">{t.pageDesc}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            <Link
              href="/products"
              onClick={() => setCategoryParam('')}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                !selectedCategory ? 'border-white bg-white text-slate-900' : 'border-white/40 text-white hover:bg-white/10'
              }`}
            >
              {t.allCategories}
            </Link>
            {CATEGORY_ORDER.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                onClick={() => setCategoryParam(category.slug)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory?.slug === category.slug
                    ? 'border-white bg-white text-slate-900'
                    : 'border-white/40 text-white hover:bg-white/10'
                }`}
              >
                {lang === 'zh' ? category.zh : category.en}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="space-y-10">
          {categoryList.map((category) => {
            const products = allProducts.filter((item) => item.categoryZh === category.zh);

            return (
              <div key={category.slug} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 md:p-8">
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-black md:text-3xl">{lang === 'zh' ? category.zh : category.en}</h2>
                  </div>
                  <p className="text-sm font-semibold text-slate-300">
                    {lang === 'zh' ? `共 ${products.length} ${t.countSuffix}` : `${products.length} ${t.countSuffix}`}
                  </p>
                </div>

                {products.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/30 bg-slate-900/60 p-8 text-center text-slate-300">
                    {t.empty}
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {products.map((product) => {
                      const imageSrc = product.image || category.fallbackImage;
                      const productNameZh = product.nameZh && product.nameZh !== 'None' ? product.nameZh : product.nameEn;
                      const productName = lang === 'zh' ? productNameZh : product.nameEn;

                      return (
                        <div key={product.id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 transition hover:bg-slate-900">
                          <div className="h-52 bg-slate-900 flex items-center justify-center p-2">
                            <img src={imageSrc} alt={productName} className="h-full w-full object-contain" />
                          </div>
                          <div className="p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">SKU {product.id}</p>
                            <h3 className="mt-1 line-clamp-2 min-h-12 text-sm font-bold text-white">{productName}</h3>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <a
                                href={linkedinHref}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-300/50 px-3 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/10"
                              >
                                <ExternalLink size={14} /> {t.contactLinkedIn}
                              </a>
                              <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-300/50 px-3 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/10"
                              >
                                <MessageCircle size={14} /> {t.contactWhatsApp}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-slate-400">
          <div>
            <div className="text-white font-bold text-lg">JUNHAI International Trading Co., Ltd.</div>
            <div className="mt-1">{t.footerDesc}</div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={linkedinHref} target="_blank" rel="noreferrer" className="hover:text-white">{t.contactLinkedIn}</a>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="hover:text-white">{t.contactWhatsApp}</a>
            <Link href="/factory-gallery" className="hover:text-white">{t.factoryGallery}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
