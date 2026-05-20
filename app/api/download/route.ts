import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/src/data/products';

function generateProductsCatalog() {
  const headers = ['Product ID', 'Product Name', 'Category', 'Price(USD)', 'MOQ', 'Weight', 'Certification', 'Stock Status'];
  
  const rows = products.map((product) => [
    product.id,
    product.name,
    product.category,
    product.price.toString(),
    product.moq,
    product.weight || 'N/A',
    (product.certified || []).join('; '),
    product.inStock ? 'In Stock' : 'Out of Stock',
  ]);

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csv;
}

function generatePriceList() {
  const content = `
GILOK WHOLESALE - PRICE LIST
================================
Company: GILOK International Trading Co., Ltd.
Website: https://gilok-wholesale.com

PRODUCT CATALOG (${products.length} SKUs)
================================
${products.map((p, i) => `${i + 1}. ${p.name} (${p.id})\n   Price: $${p.price}\n   MOQ: ${p.moq}`).join('\n')}
`;
  return content;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'catalog';

    if (type === 'catalog') {
      const csv = generateProductsCatalog();
      const filename = `GILOK_Product_Catalog_${new Date().toISOString().split('T')[0]}.csv`;
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else if (type === 'pricelist') {
      const pricelist = generatePriceList();
      const filename = `GILOK_Price_List_${new Date().toISOString().split('T')[0]}.txt`;
      return new NextResponse(pricelist, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    } else {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type } = body;
  if (type === 'catalog') {
    return NextResponse.json({ success: true, data: generateProductsCatalog() });
  } else if (type === 'pricelist') {
    return NextResponse.json({ success: true, data: generatePriceList() });
  }
  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
}
