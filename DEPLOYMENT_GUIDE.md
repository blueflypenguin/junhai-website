# GILOK 独立站 - 完整建设指南

## 🚀 项目概述

GILOK 官方独立站，使用 Next.js 14 + Tailwind CSS 构建，完全响应式设计，SEO 优化。

**网址**：将部署到 Vercel  
**技术栈**：Next.js 14 | React 18 | TypeScript | Tailwind CSS | Lucide Icons  
**部署方案**：Vercel（完全免费）

---

## 📦 项目结构

```
gilok-website/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # 首页
│   ├── layout.tsx               # 根布局
│   ├── globals.css              # 全局样式
│   ├── products/
│   │   └── page.tsx             # 产品中心
│   ├── about/
│   │   └── page.tsx             # 关于我们
│   └── contact/
│       └── page.tsx             # 联系我们
├── src/
│   ├── data/
│   │   └── products.ts          # 产品数据库
│   ├── config/
│   │   └── site.ts              # 网站配置
│   ├── components/              # 可复用组件
│   └── lib/                     # 工具函数
├── public/                      # 静态资源
│   └── images/
│       └── products/            # 产品图片
├── package.json                 # 依赖管理
├── tsconfig.json                # TypeScript 配置
├── tailwind.config.ts           # Tailwind 配置
└── next.config.ts               # Next.js 配置
```

---

## ✨ 功能特性

✅ **首页**
- 品牌 Hero Banner
- 产品快速浏览（精选 6 款）
- 核心优势展示
- 客户推荐
- 邮件订阅

✅ **产品中心**
- 完整产品列表（500+）
- 分类筛选
- 认证筛选
- 价格排序
- 产品详情

✅ **关于我们**
- 公司简介
- 数据统计
- 核心优势
- 认证与资质

✅ **联系我们**
- 联系表单
- 多渠道联系方式
- WhatsApp/Telegram 二维码
- 常见问题 (FAQ)
- 工作时间

✅ **SEO 优化**
- 元标签优化
- Open Graph 卡片
- 结构化数据
- 移动友好

---

## 🔧 本地开发

### 前置要求
- Node.js 18.17+
- npm 或 yarn

### 安装步骤

```bash
# 1. 进入项目目录
cd gilok-website

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器
# http://localhost:3000
```

### 开发命令

```bash
# 开发服务器（带热更新）
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# ESLint 检查
npm run lint
```

---

## 🌍 部署到 Vercel（推荐）

### 方式 1：GitHub + Vercel（最简单，推荐）

1. **上传到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit: GILOK website"
   git push origin main
   ```

2. **在 Vercel 中部署**
   - 访问 [vercel.com](https://vercel.com)
   - 用 GitHub 账号登录
   - 点击 "New Project"
   - 选择 `gilok-website` 仓库
   - Vercel 会自动检测 Next.js 项目
   - 点击 "Deploy"

3. **配置自定义域名**
   - 部署完成后，进入项目设置
   - 添加自定义域名（如 `gilok-wholesale.com`）
   - 按照指示配置 DNS 记录

### 方式 2：CLI 部署

```bash
# 全局安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel
```

---

## 📝 配置指南

### 1. 修改网站信息

编辑 `src/config/site.ts`：
```typescript
export const siteConfig = {
  name: 'GILOK',
  contact: {
    email: 'sales@gilok.com',
    whatsapp: '+86 138 0013 8889',
    // 修改你的联系信息
  },
  // ...
};
```

### 2. 修改产品数据

编辑 `src/data/products.ts`：
```typescript
export const products: Product[] = [
  {
    id: 'TM1',
    name: '产品名称',
    price: 14,
    // 添加或修改产品信息
  },
  // ...
];
```

### 3. 添加产品图片

将产品图片放在 `public/images/products/` 目录，然后在产品数据中引用：
```typescript
image: '/images/products/product-name.jpg'
```

### 4. 修改域名

在 Vercel 项目设置中配置自定义域名。

---

## 🎨 设计指南

### 色彩方案
- **主色**：玫红/粉红（Rose-600）
- **辅助色**：灰色系
- **强调色**：绿色（认证标签）、蓝色（图标）

### 排版
- **标题**：Font Weight 600-700
- **正文**：Font Weight 400-500
- **预留充分的空白区域**

### 响应式设计
- Mobile-first 原则
- Tailwind 断点：sm, md, lg, xl, 2xl

---

## 🔒 安全和性能

✅ **性能优化**
- 图片懒加载
- CSS 代码分割
- 零 JavaScript（大部分页面）
- 自动 CDN 缓存

✅ **安全性**
- HTTPS 加密
- 内容安全策略 (CSP)
- 无外部追踪脚本

✅ **SEO**
- 元标签优化
- 结构化数据
- XML 网站地图
- robots.txt

---

## 📧 邮件订阅功能

### 集成邮件服务（可选）

目前表单提交到本地。若要启用邮件功能，可集成：

1. **Resend**（推荐）
   ```bash
   npm install resend
   ```

2. **SendGrid** 或 **Mailgun**

编辑 `app/api/contact/route.ts`：
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();
  
  const email = await resend.emails.send({
    from: 'contact@gilok.com',
    to: data.email,
    subject: '感谢您的消息',
    html: `<p>我们会在 24 小时内回复您。</p>`,
  });
  
  return Response.json({ email });
}
```

---

## 🐛 常见问题

**Q: 如何修改首页的 Hero 图片？**  
A: 编辑 `app/page.tsx` 中的 Hero 部分，替换 emoji 或添加真实图片。

**Q: 如何添加更多产品？**  
A: 在 `src/data/products.ts` 中添加新产品对象到 `products` 数组。

**Q: 支持多语言吗？**  
A: 当前仅支持中文。若需多语言，可使用 `next-i18n-router`。

**Q: 如何配置 Google Analytics？**  
A: 在 `app/layout.tsx` 中添加 `<GoogleAnalytics />` 组件。

---

## 📞 联系和支持

- **Email**: sales@gilok.com
- **WhatsApp**: +86 138 0013 8889
- **Telegram**: @gilok_sales

---

## 📜 许可证

MIT License - 内部使用

---

## 🎯 下一步

1. ✅ 配置自定义域名
2. ✅ 替换产品图片为高质量图片
3. ✅ 集成邮件订阅功能
4. ✅ 添加 Google Analytics
5. ✅ 配置 Sitemap 和 robots.txt
6. ✅ SEO 优化和测试
7. ✅ 上线发布

祝您部署顺利！🚀
