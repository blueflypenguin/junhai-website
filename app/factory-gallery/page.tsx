import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const FACTORY_IMAGES = [
  { src: '/images/materials/factory-exterior.jpg', title: 'Factory Exterior' },
  { src: '/images/materials/factory-assembly-hall.jpg', title: 'Assembly Hall' },
  { src: '/images/materials/factory-molding-workshop.jpg', title: 'Molding Workshop' },
  { src: '/images/materials/factory-airbrush-makeup.jpg', title: 'Airbrush Makeup Area' },
  { src: '/images/materials/factory-face-detailing.jpg', title: 'Face Detailing' },
  { src: '/images/materials/factory-drying-line.jpg', title: 'Drying Line' },
  { src: '/images/materials/factory-packaging-area.jpg', title: 'Packaging Area' },
  { src: '/images/materials/brand-showroom.jpg', title: 'Brand Showroom' },
];

export default function FactoryGalleryPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[linear-gradient(120deg,#020617_0%,#08163a_60%,#112a65_100%)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <ArrowLeft size={16} /> 返回首页
          </Link>
          <h1 className="mt-4 text-3xl md:text-5xl font-black">Factory Real-Scene Gallery</h1>
          <p className="mt-3 text-slate-300">工厂相关实景图素材库，展示生产、包装和展厅场景。</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACTORY_IMAGES.map((item) => (
            <div key={item.src} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.05]">
              <div className="h-52 bg-slate-900">
                <img src={item.src} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
