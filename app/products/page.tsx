'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Filter, Download, ShoppingCart, Heart } from 'lucide-react';
import { products, categories } from '../src/data/products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const certMatch = selectedCerts.length === 0 || selectedCerts.some(cert => product.certified.includes(cert));
    return categoryMatch && certMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航 */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">← 返回首页</Link>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">完整产品目录</h1>
          <p className="text-lg text-gray-600">500+ SKU，品质保证，全球发货</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧筛选 */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
              <h2 className="flex items-center gap-2 font-bold text-lg mb-4">
                <Filter size={20} />
                筛选
              </h2>

              {/* 分类筛选 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">分类</h3>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left px-3 py-2 rounded mb-2 transition ${
                    selectedCategory === 'all'
                      ? 'bg-rose-100 text-rose-700 font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  全部产品
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left px-3 py-2 rounded mb-2 transition ${
                      selectedCategory === cat.id
                        ? 'bg-rose-100 text-rose-700 font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat.name} <span className="text-gray-500">({cat.count})</span>
                  </button>
                ))}
              </div>

              {/* 认证筛选 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">认证</h3>
                {['CE认证', 'RoHS', 'FDA'].map((cert) => (
                  <label key={cert} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCerts.includes(cert)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCerts([...selectedCerts, cert]);
                        } else {
                          setSelectedCerts(selectedCerts.filter(c => c !== cert));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-gray-700">{cert}</span>
                  </label>
                ))}
              </div>

              {/* 下载目录 */}
              <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                <Download size={18} />
                下载产品目录
              </button>
            </div>
          </div>

          {/* 右侧产品列表 */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">显示 {filteredProducts.length} 个产品</p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg">
                <option>按相关度排序</option>
                <option>价格低到高</option>
                <option>价格高到低</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">未找到匹配的产品</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    {/* 图片 */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-4xl">{product.id.includes('LELO') ? '✨' : '💎'}</div>
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-100">
                        <Heart size={18} className="text-gray-400" />
                      </button>
                    </div>

                    {/* 信息 */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* 认证 */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.certified.slice(0, 2).map((cert) => (
                          <span key={cert} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {cert}
                          </span>
                        ))}
                        {product.certified.length > 2 && (
                          <span className="text-xs text-gray-500 px-2 py-1">+{product.certified.length - 2}</span>
                        )}
                      </div>

                      {/* 价格 */}
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <p className="text-xs text-gray-500">批发价</p>
                          <p className="text-xl font-bold text-rose-600">${product.price}</p>
                          <p className="text-xs text-gray-500">MOQ: {product.moq}</p>
                        </div>
                      </div>

                      {/* 按钮 */}
                      <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                        <ShoppingCart size={16} />
                        咨询价格
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部 CTA */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-600 text-white mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">需要批量报价？</h2>
          <p className="text-lg mb-6 opacity-90">
            提交您的采购需求，我们会在24小时内为您提供专业的批发报价
          </p>
          <button className="bg-white text-rose-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            获取报价
          </button>
        </div>
      </section>
    </div>
  );
}
