import Link from 'next/link';
import { Building2, Factory, Globe2, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../src/config/site';
import LanguageSwitcher from '../../src/components/LanguageSwitcher';
import ManufacturingExcellence from '../../src/components/ManufacturingExcellence';

export default function AboutPage() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^\d]/g, '')}`;

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
            <Link href="/about" className="text-sm font-semibold text-slate-900">Company</Link>
            <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">Contact</Link>
            <LanguageSwitcher />
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Get Price Sheet
            </a>
          </div>
        </nav>
      </header>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black md:text-5xl">Built For Reliable Global Supply</h1>
          <p className="mt-4 max-w-3xl text-slate-200">JUNHAI focuses on compliant sourcing, stable delivery, and long-term distributor partnerships.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900"><Building2 /> Company Profile</h2>
          <p className="text-slate-600">Foshan Junhai Trading Co., Ltd. serves B2B buyers with adult wellness categories, from concept selection to export delivery.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Established supplier management and quality checkpoints</li>
            <li>Export-first documentation and compliance process</li>
            <li>Flexible OEM and private-label support</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900"><Factory /> Manufacturing Network</h2>
          <p className="text-slate-600">Strategic factory partners in key production zones ensure product consistency and lead-time control for recurring orders.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Dedicated production windows for peak seasons</li>
            <li>Inline QC checks and random sampling inspection</li>
            <li>Custom packaging and barcode-ready fulfillment</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900"><ShieldCheck /> Compliance Standard</h2>
          <p className="text-slate-600">Core lines support major market entry requirements and can be aligned to buyer-specific certification needs.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>CE / RoHS / FDA-ready categories</li>
            <li>Traceable material and batch records</li>
            <li>Regulatory labeling support</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900"><Globe2 /> Export Capability</h2>
          <p className="text-slate-600">From quote to shipment, JUNHAI aligns logistics, paperwork, and communication for cross-border efficiency.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Standardized quotation and lead-time matrix</li>
            <li>FOB/CIF/DDP coordination support</li>
            <li>One-window account service for repeat clients</li>
          </ul>
        </div>
      </section>

      <ManufacturingExcellence className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" compact />
    </div>
  );
}
