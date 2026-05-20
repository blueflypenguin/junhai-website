import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/src/data/products';

// Generate a simple CSV catalog
function generateProductsCatalog() {
  const headers = ['产品编号', '产品名称', '分类', '价格(USD)', 'MOQ', '重量', '认证', '备货状态'];
  
  const rows = products.map((product) => [
    product.id,
    product.name,
    product.category,
    product.price.toString(),
    product.moq,
    product.weight || 'N/A',
    (product.certified || []).join('; '),
    product.inStock ? '现货' : '缺货',
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csv;
}

// Generate price list
function generatePriceList() {
  const content = `
GILOK WHOLESALE - PRICE LIST
================================

Company: GILOK International Trading Co., Ltd.
Website: https://gilok-wholesale.com
Email: sales@gilok.com
WhatsApp: +86 138 0013 8889

PRODUCT CATALOG (${products.length} SKUs)
================================

${products
  .map(
    (p, i) => `
${i + 1}. ${p.name} (${p.id})
   Description: ${p.description}
   Price: $${p.price}
   MOQ: ${p.moq}
   Weight: ${p.weight}
   Features: ${p.features.join(', ')}
   Status: ${p.inStock ? '在货' : '缺货'}
   ---`
  )
  .join('\n')}

GENERAL TERMS
================================
• All prices in USD (ex-factory)
• MOQ: 30 pieces per SKU mixed orders welcome
• Payment: TT (50% deposit, 50% before shipment)
• Shipping: DHL/FedEx (5-10 business days worldwide)
• Packing: Discreet carton packaging
• Quality: 100% tested before shipment
• Warranty: 1 year against manufacturing defects

CERTIFICATIONS
================================
✓ CE Certified
✓ RoHS Compliant  
✓ FDA Approved (selected items)
✓ ISO 9001:2015

WHY CHOOSE GILOK?
================================
✓ 10+ years international trade experience
✓ 1000+ satisfied distributors
✓ 500+ SKUs available
✓ Professional OEM/Private Label service
✓ 24/7 customer support
✓ Competitive wholesale pricing
✓ Fast delivery & reliable logistics

CONTACT US
================================
Sales: sales@gilok.com
WhatsApp: +86 138 0013 8889
Telegram: @gilok_sales
LinkedIn: /company/gilok

This price list is valid for 30 days.
For latest updates, please visit: https://gilok-wholesale.com/products
`;

  return content;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const type = params.type || 'catalog';

    if (type === 'catalog') {
      // Return CSV file
      const csv = generateProductsCatalog();
      const filename = `GILOK_Product_Catalog_${new Date().toISOString().split('T')[0]}.csv`;

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else if (type === 'pricelist') {
      // Return price list as text file
      const pricelist = generatePriceList();
      const filename = `GILOK_Price_List_${new Date().toISOString().split('T')[0]}.txt`;

      return new NextResponse(pricelist, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else {
      return NextResponse.json(
        { error: '无效的文件类型' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: '文件生成失败' },
      { status: 500 }
    );
  }
}

// Handle /api/download/[type] dynamic route
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type } = body;

  if (type === 'catalog') {
    const csv = generateProductsCatalog();
    return NextResponse.json({ success: true, data: csv });
  } else if (type === 'pricelist') {
    const pricelist = generatePriceList();
    return NextResponse.json({ success: true, data: pricelist });
  }

  return NextResponse.json({ error: '无效的请求' }, { status: 400 });
}
