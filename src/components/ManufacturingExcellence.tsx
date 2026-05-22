import React from 'react';

type Props = {
  className?: string;
  compact?: boolean;
};

const blocks = [
  {
    title: 'R&D Sculpting',
    desc: 'Clay sculpting drafts and head sculpting semi-finished assets for custom development.',
    image: '/images/manufacturing/rd-sculpting.jpg',
  },
  {
    title: 'TPE/Silicone Production',
    desc: 'Medical-grade material filling and inner metal skeleton baking/forming process.',
    image: '/images/manufacturing/tpe-production.jpg',
  },
  {
    title: 'Hand-painted Makeup',
    desc: 'Clean workshop detailing for realistic face finishing and stable quality control.',
    image: '/images/manufacturing/hand-painted-makeup.jpg',
  },
  {
    title: 'QC & Secure Logistics',
    desc: 'Pre-shipment tensile checks and neutral heavy-duty packing for discreet export.',
    image: '/images/manufacturing/qc-logistics.jpg',
  },
];

export default function ManufacturingExcellence({ className = '', compact = false }: Props) {
  return (
    <section className={className}>
      <div className={compact ? 'rounded-3xl bg-slate-900 p-8 text-white' : ''}>
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Manufacturing Excellence</p>
        <h2 className="mt-2 text-3xl font-black">Verified Source Manufacturing Capability</h2>
        <p className="mt-3 max-w-3xl text-slate-200">
          Over 5,000 m2 cooperative manufacturing base. Strict QC inspection standard before global discreet shipping.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {blocks.map((item) => (
            <div key={item.title} className={compact ? 'rounded-xl border border-white/20 bg-white/5 p-4' : 'rounded-2xl border border-slate-200 bg-slate-50 p-5'}>
              <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 px-3 text-center text-xs text-slate-200">
                Image Slot: {item.image}
              </div>
              <p className={compact ? 'text-base font-bold text-white' : 'text-lg font-bold text-slate-900'}>{item.title}</p>
              <p className={compact ? 'mt-2 text-sm text-slate-200' : 'mt-2 text-sm text-slate-600'}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
