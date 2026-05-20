'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Truck, Lock, Zap, Download, Mail } from 'lucide-react';
import { products, categories, features } from '../src/data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 6);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [downloading, setDownloading] = useState(false);

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
      if (response.ok) {
        setEmail('');
      }
    } catch (error) {
      setSubscribeMessage('订阅失败，请稍后重试');
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
      a.download = type === 'catalog' ? 'GILOK_Catalog.csv' : 'GILOK_PriceList.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GILOK</span>
            <span className="text-xs text-gray-500 ml-2">WHOLESALE</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 font-medium">产品中心</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">关于我们</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">联系方式</Link>
            <button 
              onClick={() => handleDownload('pricelist')}
              className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
            >
              获取价格表
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左侧文本 */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold">
                  ⚡ 全球领先的B2B 批发平台
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                优质产品 <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">批发价格</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                为全球分销商、零售商提供500+产品，超过10年的国际贸易经验。医学级安全认证、隐私包装、快速物流。
              </p>
              <div className="flex gap-4 pt-4 flex-wrap">
                <Link href="/products" className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition inline-flex items-center">
                  浏览产品 <ChevronRight size={20} className="ml-2" />
                </Link>
                <Link href="/contact" className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition inline-block">
                  与我们联系
                </Link>
              </div>
            </div>

            {/* 右侧图片 */}
            <div className="relative h-96 md:h-full min-h-[400px] bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl">🎁</div>
                <p className="text-gray-600 mt-4 font-semibold">高质量产品展示</p>
                <p className="text-gray-500 text-sm">隐私包装 · 国际认证 · 快速发货</p>
              </div>
            </div>
          </div>
        </div>
      </section>
              <h3 className="font-semibold text-gray-900 mb-1">快速物流</h3>
              <p className="text-sm text-gray-600">5-10工作日</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Lock className="text-purple-600" size={24} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">隐私保护</h3>
              <p className="text-sm text-gray-600">完全隐蔽包装</p>
            </div>
          </div>
        </div>
      </section>

      {/* 产品展示 */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              精选产品
            </h2>
            <p className="text-xl text-gray-600">
              500+ SKU，覆盖个护、配饰、高级系列
            </p>
          </div>

          {/* 产品网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300">
                {/* 产品图片 */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {product.id.includes('LELO') ? '✨' : '💎'}
                  </div>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">缺货</span>
                    </div>
                  )}
                </div>

                {/* 产品信息 */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* 认证标签 */}
                  <div className="flex flex-wrap gap-2">
                    {product.certified.map((cert) => (
                      <span key={cert} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* 价格 */}
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-gray-600 text-sm">批发价</span>
                      <p className="text-2xl font-bold text-rose-600 mt-1">
                        ${product.price}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        起批：{product.moq}
                      </p>
                    </div>
                    <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="inline-block bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition">
              查看全部产品 (500+)
            </Link>
          </div>
        </div>
      </section>

      {/* 为什么选择 GILOK */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择 GILOK
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ✓ 无与伦比的价格
              </h3>
              <p className="text-gray-600">
                与美国零售价相比，我们的批发价低30-50%。让你的利润空间最大化。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ✓ 灵活的订单
              </h3>
              <p className="text-gray-600">
                MOQ仅需10件，支持混搭。完美适合小型零售商和创业者。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ✓ 国际认证
              </h3>
              <p className="text-gray-600">
                所有产品通过CE、RoHS、FDA认证。符合国际安全和卫生标准。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ✓ 快速物流
              </h3>
              <p className="text-gray-600">
                与全球主要快递合作。美国通常5-10天到达。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ✓ 隐私保护
              </h3>
              <p className="text-gray-600">
                100%隐蔽包装，保护客户隐私。外包装无品牌标识。
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                ✓ OEM定制
              </h3>
              <p className="text-gray-600">
                支持私有标签、自定义包装设计。10件起订，无需开模费。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 联系 CTA */}
      <section id="contact" className="py-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            立即获取产品目录、批发价格表，与我们的销售团队联系。
          </p>
          
          {/* 订阅表单 */}
          <form onSubmit={handleSubscribe} className="flex gap-2 justify-center flex-wrap mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="输入您的邮箱"
              required
              className="px-6 py-3 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-rose-300 min-w-[300px]"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="bg-white text-rose-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition disabled:opacity-50"
            >
              {subscribing ? '提交中...' : '订阅'}
            </button>
          </form>
          
          {subscribeMessage && (
            <p className={`text-sm mb-4 ${subscribeMessage.includes('感谢') ? 'text-green-100' : 'text-red-100'}`}>
              {subscribeMessage}
            </p>
          )}

          {/* 下载按钮 */}
          <div className="flex gap-4 justify-center flex-wrap mb-6">
            <button
              onClick={() => handleDownload('catalog')}
              disabled={downloading}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              <Download size={18} />
              {downloading ? '生成中...' : '下载产品目录'}
            </button>
            <button
              onClick={() => handleDownload('pricelist')}
              disabled={downloading}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              <Download size={18} />
              {downloading ? '生成中...' : '下载价格表'}
            </button>
          </div>

          <p className="text-sm opacity-75">
            我们会在24小时内回复您。承诺：无垃圾邮件 ✓
          </p>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">GILOK</h3>
              <p className="text-gray-400 text-sm">
                全球领先的B2B批发平台，为分销商提供优质产品。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">产品</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">个人护理</a></li>
                <li><a href="#" className="hover:text-white">配件系列</a></li>
                <li><a href="#" className="hover:text-white">高级系列</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">关于</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white">关于我们</a></li>
                <li><a href="#" className="hover:text-white">联系我们</a></li>
                <li><a href="#" className="hover:text-white">隐私政策</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">联系方式</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: sales@gilok.com</li>
                <li>WhatsApp: 扫码添加</li>
                <li>Telegram: @gilok_sales</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 GILOK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
