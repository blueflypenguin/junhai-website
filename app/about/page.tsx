import Link from 'next/link';
import { Building2, Factory, Globe2, ShieldCheck } from 'lucide-react';
import ManufacturingExcellence from '../../src/components/ManufacturingExcellence';
import SiteHeader from '../../src/components/SiteHeader';
import SiteFooter from '../../src/components/SiteFooter';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-[var(--brand-ink)]">
      <SiteHeader />

      <section className="bg-[linear-gradient(135deg,#0b2a55_0%,#133d78_62%,#1a4f96_100%)] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black md:text-5xl">Built For Reliable Global Supply</h1>
          <p className="mt-4 max-w-3xl text-slate-200">工厂能力 + 能力背书 + 合作SOP，构建长期稳定的 B2B 供货关系。</p>
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
      <SiteFooter />
    </div>
  );
}
