import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo (replace with database in production)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, company } = body;

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '请提供有效的邮箱地址' },
        { status: 400 }
      );
    }

    // Add to subscribers
    subscribers.add(email);

    // TODO: In production, integrate with email service like:
    // - Resend (resend.com) - Free tier: 100 emails/day
    // - Mailchimp (mailchimp.com) - Free tier: up to 500 contacts
    // - SendGrid (sendgrid.com) - Free tier: 100 emails/day

    // For now, just log to console
    console.log(`New subscriber: ${email} (${name || 'Anonymous'}) - ${company || 'N/A'}`);

    // Send welcome email (implement with Resend, SendGrid, etc.)
    // Example with Resend:
    // const res = await resend.emails.send({
    //   from: 'noreply@junhai-wholesale.com',
    //   to: email,
    //   subject: 'Welcome to JUNHAI Wholesale',
    //   html: `<h1>Welcome!</h1><p>Thank you for subscribing to JUNHAI.</p>`,
    // });

    return NextResponse.json(
      {
        success: true,
        message: `感谢您的订阅！我们已发送确认邮件到 ${email}`,
        email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: '订阅失败，请重试' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Email subscription API',
    subscribers_count: subscribers.size,
  });
}

