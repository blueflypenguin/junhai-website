#!/usr/bin/env bash

# GILOK 独立站 - 快速部署脚本
# 使用方式: bash deploy.sh

set -e

echo "🚀 GILOK 独立站快速部署指南"
echo "======================================"
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在 gilok-website 项目目录下运行此脚本"
    exit 1
fi

echo "✅ 步骤 1: 检查依赖..."
npm run build
echo "✅ 本地构建成功！"
echo ""

echo "📝 步骤 2: 准备 Git 上传..."
echo ""
echo "请按以下步骤操作："
echo ""
echo "  1. 创建 GitHub 账号（如果还没有）："
echo "     https://github.com/signup"
echo ""
echo "  2. 创建新仓库 'gilok-website'"
echo ""
echo "  3. 执行以下命令："
echo ""
echo "    git init"
echo "    git add ."
echo "    git commit -m 'GILOK 独立站 - 完整版本'"
echo "    git branch -M main"
echo "    git remote add origin https://github.com/YOUR_USERNAME/gilok-website.git"
echo "    git push -u origin main"
echo ""
echo "  4. 如果已经初始化过 git，只需执行："
echo "    git add ."
echo "    git commit -m 'Update: GILOK website'"
echo "    git push"
echo ""

echo "🌐 步骤 3: 在 Vercel 部署（最简单）"
echo ""
echo "  1. 访问 https://vercel.com"
echo "  2. 用 GitHub 账号登录"
echo "  3. 点击 'Add New...' → 'Project'"
echo "  4. 选择 'gilok-website' 仓库"
echo "  5. 点击 'Deploy' 按钮"
echo ""
echo "  完成！你的网站将在 2-3 分钟内上线"
echo ""

echo "🎁 步骤 4: 配置域名"
echo ""
echo "  1. 注册域名（推荐 Namecheap $0.88/年）"
echo "  2. 在 Vercel 项目设置中添加自定义域名"
echo "  3. 按指示配置 DNS"
echo ""

echo "✨ 后续配置"
echo ""
echo "  更新联系信息："
echo "    - 编辑 src/config/site.ts"
echo "    - 修改邮箱、WhatsApp、Telegram"
echo ""
echo "  替换产品数据："
echo "    - 编辑 src/data/products.ts"
echo "    - 添加真实产品信息"
echo ""
echo "  上传产品图片："
echo "    - 放在 public/images/products/"
echo "    - 更新产品数据中的 image 字段"
echo ""

echo "======================================"
echo "📚 更多文档："
echo "  - DEPLOYMENT_GUIDE.md: 详细部署指南"
echo "  - DEPLOYMENT_CHECKLIST.md: 完整检查清单"
echo "  - PROJECT_COMPLETION_REPORT.md: 项目完成报告"
echo ""
echo "🎉 准备好了！现在就开始部署吧！"
echo ""
