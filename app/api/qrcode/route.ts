import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'whatsapp'; // 'whatsapp', 'linkedin', 'wechat'
    const size = searchParams.get('size') || '200'; // QR code size in pixels

    // Generate QR codes using qr-server.com (free service)
    // You can replace with qrcode library if needed

    let data = '';

    switch (type) {
      case 'whatsapp':
        // WhatsApp contact link
        data = encodeURIComponent('+8615017742798');
        break;
      case 'linkedin':
        // LinkedIn profile
        data = encodeURIComponent('https://www.linkedin.com/in/clint-huang-1aa4a5352');
        break;
      case 'wechat':
        // WeChat QR code (would need WeChat ID)
        data = encodeURIComponent('junhai_sales');
        break;
      default:
        return NextResponse.json(
          { error: '无效的二维码类型' },
          { status: 400 }
        );
    }

    // Use qr-server.com API (free and no auth required)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`;

    // Fetch the QR code from external service
    const response = await fetch(qrCodeUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: '二维码生成失败' },
        { status: 500 }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('QR code error:', error);
    return NextResponse.json(
      { error: '二维码生成出错' },
      { status: 500 }
    );
  }
}

// Return JSON with QR code URLs for frontend usage
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type = 'all', size = '200' } = body;

    const qrCodes: { [key: string]: string } = {};

    if (type === 'all' || type === 'whatsapp') {
      qrCodes.whatsapp = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent('+8615017742798')}`;
    }

    if (type === 'all' || type === 'linkedin') {
      qrCodes.linkedin = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent('https://www.linkedin.com/in/clint-huang-1aa4a5352')}`;
    }

    if (type === 'all' || type === 'wechat') {
      qrCodes.wechat = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent('junhai_sales')}`;
    }

    return NextResponse.json({
      success: true,
      qrCodes,
      info: {
        whatsapp: '+86 15017742798',
        linkedin: 'https://www.linkedin.com/in/clint-huang-1aa4a5352',
        wechat: 'junhai_sales',
      },
    });
  } catch (error) {
    console.error('QR code generation error:', error);
    return NextResponse.json(
      { error: '生成失败' },
      { status: 500 }
    );
  }
}

