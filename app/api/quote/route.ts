import { NextRequest, NextResponse } from 'next/server';

const normalizeBaseUrl = (raw: string) => raw.replace(/\/+$/, '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name = '',
      company = '',
      country = '',
      email = '',
      contact = '',
      productType = '',
      quantity = '',
      requirements = '',
      language = 'en',
    } = body || {};

    if (!name && !company) {
      return NextResponse.json(
        { error: 'Name or company is required' },
        { status: 400 }
      );
    }

    const backendBase =
      process.env.BACKEND_API_BASE_URL ||
      process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ||
      '';

    if (!backendBase) {
      return NextResponse.json(
        {
          error: 'Backend API is not configured',
          fallbackToWhatsApp: true,
        },
        { status: 503 }
      );
    }

    const notes = [
      requirements ? `Requirements: ${requirements}` : '',
      quantity ? `Estimated Quantity: ${quantity}` : '',
      contact ? `Contact: ${contact}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const leadPayload = {
      company: company || name,
      contact_name: name || undefined,
      email: email || undefined,
      phone: contact || undefined,
      country: country || undefined,
      source: 'website_quote',
      language: language || 'en',
      product_interest: productType || undefined,
      notes: notes || undefined,
      status: 'new',
      score: 10,
    };

    const resp = await fetch(`${normalizeBaseUrl(backendBase)}/api/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadPayload),
      cache: 'no-store',
    });

    if (!resp.ok) {
      const message = await resp.text();
      return NextResponse.json(
        {
          error: 'Failed to submit quote lead to backend',
          detail: message.slice(0, 300),
          fallbackToWhatsApp: true,
        },
        { status: 502 }
      );
    }

    const data = await resp.json();
    return NextResponse.json({ success: true, lead: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Unexpected server error',
        fallbackToWhatsApp: true,
        detail: error instanceof Error ? error.message : 'unknown error',
      },
      { status: 500 }
    );
  }
}
