'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle, Smartphone, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [qrCodes, setQrCodes] = useState<{ whatsapp?: string; linkedin?: string }>({});
  const [loading, setLoading] = useState(true);

  // Load QR codes on component mount
  useEffect(() => {
    const loadQrCodes = async () => {
      try {
        const response = await fetch('/api/qrcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'all', size: '200' }),
        });
        const data = await response.json();
        if (data.success) {
          setQrCodes(data.qrCodes);
        }
      } catch (error) {
        console.error('Failed to load QR codes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQrCodes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('感谢您的消息！我们会在24小时内回复您。');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

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
            联系我们
          </h1>
          <p className="text-xl text-gray-600">
            我们随时准备为您服务。有问题或需要报价？请立即与我们联系。
          </p>
        </div>
      </section>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* 邮箱 */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center hover:shadow-lg transition">
            <Mail className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">电子邮件</h3>
            <p className="text-gray-600 mb-2">sales@gilok.com</p>
            <p className="text-gray-600 text-sm">通常在 2 小时内回复</p>
          </div>

          {/* WhatsApp */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center hover:shadow-lg transition">
            <MessageCircle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-2">+86 138 0013 8889</p>
            <p className="text-gray-600 text-sm">实时沟通最快</p>
          </div>

          {/* Telegram */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center hover:shadow-lg transition">
            <Smartphone className="w-12 h-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Telegram</h3>
            <p className="text-gray-600 mb-2">@gilok_sales</p>
            <p className="text-gray-600 text-sm">支持中文和英文</p>
          </div>
        </div>

        {/* 二维码和表单 */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* 左侧：二维码 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              快速添加我们
            </h2>

            {/* WhatsApp 二维码 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp</h3>
              <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center w-48 h-48">
                {loading || !qrCodes.whatsapp ? (
                  <div className="text-center">
                    <div className="animate-spin">⏳</div>
                    <p className="text-sm text-gray-600 mt-2">加载中...</p>
                  </div>
                ) : (
                  <img 
                    src={qrCodes.whatsapp} 
                    alt="WhatsApp QR Code" 
                    className="w-full h-full rounded"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">扫描添加我们</p>
            </div>

            {/* LinkedIn 二维码 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">LinkedIn</h3>
              <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center w-48 h-48">
                {loading || !qrCodes.linkedin ? (
                  <div className="text-center">
                    <div className="animate-spin">⏳</div>
                    <p className="text-sm text-gray-600 mt-2">加载中...</p>
                  </div>
                ) : (
                  <img 
                    src={qrCodes.linkedin} 
                    alt="LinkedIn QR Code" 
                    className="w-full h-full rounded"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">关注我们</p>
            </div>
          </div>

          {/* 右侧：表单 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              发送消息
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                  placeholder="您的姓名"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  电子邮件 *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                  placeholder="您的邮箱"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  公司名称
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500"
                  placeholder="您的公司名称"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  消息 *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 resize-none"
                  placeholder="请告诉我们您的需求..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
              >
                发送消息
              </button>

              <p className="text-sm text-gray-600">
                ✓ 我们会在 24 小时内回复您
              </p>
            </form>
          </div>
        </div>

        {/* 工作时间 */}
        <div className="mt-20 bg-gray-50 p-8 rounded-xl border border-gray-200">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">工作时间</h3>
              <p className="text-gray-600">
                周一至周五：09:00 - 18:00 (中国时间)<br/>
                周末和节假日：可通过 WhatsApp/Telegram 联系
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            常见问题
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'MOQ 是多少？',
                a: '我们的 MOQ 仅需 10 件。您可以选择不同的产品混搭订单。',
              },
              {
                q: '发货需要多久？',
                a: '确认订单后，我们通常在 3-5 个工作日内发货。美国客户通常 5-10 天收货。',
              },
              {
                q: '支持 OEM 定制吗？',
                a: '是的！我们支持私有标签、自定义包装设计，10 件起订，无需开模费。',
              },
              {
                q: '产品有保修吗？',
                a: '所有产品都有 1 年的保修期。如有质量问题，我们会负责处理。',
              },
              {
                q: '支持哪些支付方式？',
                a: '我们支持 T/T、Paypal、信用卡、Alipay 等多种支付方式。',
              },
              {
                q: '如何获取产品目录？',
                a: '您可以在首页下载完整的产品目录，或直接联系我们的销售团队。',
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-lg border border-gray-200 cursor-pointer">
                <summary className="font-bold text-gray-900 flex justify-between items-center">
                  {faq.q}
                  <span className="text-rose-600">+</span>
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
