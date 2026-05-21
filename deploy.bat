@echo off
REM JUNHAI 独立站 - Windows 快速部署脚本
REM 使用方式: 双击 deploy.bat

title JUNHAI 独立站快速部署

echo.
echo =========================================
echo   JUNHAI 独立站快速部署指南
echo =========================================
echo.

REM 检查是否在项目目录
if not exist "package.json" (
    echo.
    echo ❌ 错误：请在 junhai-website 项目目录下运行此脚本
    echo.
    pause
    exit /b 1
)

echo ✅ 步骤 1: 验证项目...
echo.

REM 尝试构建
echo 正在执行本地构建检查...
call npm run build
if errorlevel 1 (
    echo.
    echo ❌ 构建失败！请检查项目文件
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 本地构建成功！
echo.

REM 显示后续步骤
cls
echo.
echo =========================================
echo   JUNHAI 独立站快速部署 - 后续步骤
echo =========================================
echo.

echo 📝 步骤 1: 上传到 GitHub
echo ─────────────────────────────────────
echo.
echo   1. 创建 GitHub 账号（如果还没有）：
echo      https://github.com/signup
echo.
echo   2. 创建新仓库 'junhai-website'
echo.
echo   3. 在本项目目录打开 PowerShell 或 CMD，执行：
echo.
echo      git init
echo      git add .
echo      git commit -m "JUNHAI 独立站 - 完整版本"
echo      git branch -M main
echo      git remote add origin https://github.com/YOUR_USERNAME/junhai-website.git
echo      git push -u origin main
echo.

echo 🌐 步骤 2: 在 Vercel 部署
echo ─────────────────────────────────────
echo.
echo   1. 访问 https://vercel.com
echo   2. 用 GitHub 账号登录
echo   3. 点击 'Add New...' ^> 'Project'
echo   4. 选择 'junhai-website' 仓库
echo   5. 点击 'Deploy' 按钮
echo.
echo   完成！你的网站将在 2-3 分钟内上线 🎉
echo.

echo 🎁 步骤 3: 配置自定义域名
echo ─────────────────────────────────────
echo.
echo   1. 注册域名（推荐 Namecheap：$0.88/年）
echo      https://www.namecheap.com
echo.
echo   2. 在 Vercel 项目设置中添加自定义域名
echo.
echo   3. 按指示配置 DNS 记录
echo.

echo ✨ 步骤 4: 修改网站信息
echo ─────────────────────────────────────
echo.
echo   编辑以下文件并提交到 GitHub：
echo.
echo   • src/config/site.ts
echo     - 修改 email、whatsapp、telegram
echo.
echo   • src/data/products.ts
echo     - 添加真实产品数据
echo     - 替换产品图片
echo.

echo 📚 相关文件
echo ─────────────────────────────────────
echo   • DEPLOYMENT_GUIDE.md
echo   • DEPLOYMENT_CHECKLIST.md
echo   • PROJECT_COMPLETION_REPORT.md
echo.

echo =========================================
echo   ✅ 项目已准备就绪！
echo =========================================
echo.
echo 提示：所有更改在 Vercel 上会自动重新部署
echo.

pause

