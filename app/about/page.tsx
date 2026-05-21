'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Globe, Users, Award, TrendingUp, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 导航 */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← 返回首页</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            关于 JUNHAI
          </h1>
          <p className="text-xl text-gray-600">
            全球领先的 B2B 批发平台，致力于为分销商、零售商提供优质产品和卓越服务
          </p>
        </div>
      </section>

      {/* 公司简介 */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              我们的故事
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              JUNHAI 成立于2015年，总部位于中国。我们致力于为全球分销商、零售商和电商卖家提供优质的产品和专业的服务。
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              过去10多年里，JUNHAI 已经为来自50多个国家的1000+客户服务，累计出货超过500万件产品，客户满意度达到98%以上。
            </p>
            <p className="text-gray-600 leading-relaxed">
              我们的使命是简化国际贸易，让每个人都能以合理的价格获得优质的产品。
            </p>
          </div>
          <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-lg font-semibold text-gray-700">全球合作伙伴</p>
            </div>
          </div>
        </div>

        {/* 数据统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-200">
          <div className="text-center">
            <p className="text-4xl font-bold text-rose-600 mb-2">500+</p>
            <p className="text-gray-600">产品 SKU</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-rose-600 mb-2">50+</p>
            <p className="text-gray-600">国家与地区</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-rose-600 mb-2">1000+</p>
            <p className="text-gray-600">满意客户</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-rose-600 mb-2">98%+</p>
            <p className="text-gray-600">客户满意度</p>
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            我们的优势
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <Award className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">国际认证</h3>
              <p className="text-gray-600">
                所有产品通过 CE、RoHS、FDA 认证，符合国际安全和卫生标准。
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <TrendingUp className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">竞争价格</h3>
              <p className="text-gray-600">
                批发价低于美国零售价 30-50%，最大化您的利润空间。
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <Zap className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">灵活订单</h3>
              <p className="text-gray-600">
                MOQ 仅需 10 件，支持混搭。完美适合各种规模的业务。
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <Globe className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">全球物流</h3>
              <p className="text-gray-600">
                与主要快递合作，支持全球发货。美国通常 5-10 天到达。
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <Users className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 支持</h3>
              <p className="text-gray-600">
                专业的销售和客服团队，随时为您解答任何问题。
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <CheckCircle className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">隐私保护</h3>
              <p className="text-gray-600">
                100% 隐蔽包装，外包装无品牌标识，完全保护客户隐私。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 认证与资质 */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          认证与资质
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'CE认证', desc: '欧盟安全标准' },
            { name: 'RoHS', desc: '有害物质限制' },
            { name: 'FDA', desc: '美国食品药品' },
            { name: 'ISO 9001', desc: '质量管理体系' },
          ].map((cert) => (
            <div key={cert.name} className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">✓</div>
              <h4 className="font-bold text-gray-900 mb-1">{cert.name}</h4>
              <p className="text-sm text-gray-600">{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 发货承诺 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            我们的承诺
          </h2>
          <div className="space-y-6">
            {[
              '✓ 5-10 个工作日内发货（美国）',
              '✓ 100% 隐蔽包装，保护隐私',
              '✓ 所有产品 100% 正品保证',
              '✓ 支持退货政策（30 天内）',
              '✓ 免费提供技术支持和指导',
              '✓ OEM 定制支持，无需开模费',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-lg text-gray-700">
                <span className="text-rose-600 font-bold text-xl">✓</span>
                <span>{item.substring(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系 CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            想与我们合作？
          </h2>
          <p className="text-lg mb-8 opacity-90">
            我们随时准备为您的业务提供支持。立即联系我们获取产品信息和报价。
          </p>
          <button className="bg-white text-rose-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition mr-4">
            获取报价
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition">
            联系我们
          </button>
        </div>
      </section>
    </div>
  );
}

