export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

const RAZORPAY_ORDERS_URL = 'https://api.razorpay.com/v1/orders';

// The amount is decided here, on the server, and never taken from the client —
// otherwise a user could edit the request and pay ₹1 for the assessment.
function assessmentAmountInPaise() {
  const rupees = Number(process.env.RAZORPAY_CONSULTATION_AMOUNT);
  if (!Number.isFinite(rupees) || rupees <= 0) return null;
  return Math.round(rupees * 100);
}

function basicAuth(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;
}

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error('[Razorpay] RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set');
    return NextResponse.json(
      { error: 'Payments are not configured yet. Please call us to book.' },
      { status: 500 }
    );
  }

  const amount = assessmentAmountInPaise();
  if (amount === null) {
    console.error('[Razorpay] RAZORPAY_CONSULTATION_AMOUNT is missing or invalid');
    return NextResponse.json(
      { error: 'Payments are not configured yet. Please call us to book.' },
      { status: 500 }
    );
  }

  // Optional context from the page, stored on the order for reconciliation only.
  let pageUrl = '';
  let leadName = '';
  let leadPhone = '';
  let leadEmail = '';
  let concern = '';
  try {
    const body = await req.json();
    if (typeof body?.pageUrl === 'string') pageUrl = body.pageUrl.slice(0, 200);
    if (typeof body?.name === 'string') leadName = body.name.trim().slice(0, 80);
    if (typeof body?.phone === 'string') leadPhone = body.phone.replace(/\D/g, '').slice(0, 15);
    if (typeof body?.email === 'string') leadEmail = body.email.trim().slice(0, 120);
    if (typeof body?.concern === 'string') concern = body.concern.trim().slice(0, 200);
  } catch {
    // No body is fine — nothing here is required.
  }

  // Razorpay notes travel with the payment and are what the webhook reads back,
  // so the lead's details are stamped on the order rather than looked up later.
  const fullPhone = leadPhone ? leadPhone.replace(/^91(?=\d{10}$)/, '') : '';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(RAZORPAY_ORDERS_URL, {
      method: 'POST',
      headers: {
        Authorization: basicAuth(keyId, keySecret),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        // Razorpay caps receipt at 40 chars.
        receipt: `aura_vsl_${Date.now()}`.slice(0, 40),
        notes: {
          product: 'Dental Implant Smile Assessment',
          source: pageUrl || 'vsl',
          ...(leadName ? { name: leadName } : {}),
          ...(fullPhone ? { phone: fullPhone } : {}),
          ...(leadEmail ? { email: leadEmail } : {}),
          ...(concern ? { concern } : {}),
        },
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    const order = await res.json();
    if (!res.ok) {
      throw new Error(order?.error?.description || `Razorpay HTTP ${res.status}`);
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId, // publishable key — safe to expose to the browser
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error('[Razorpay create-order] Error:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: 'Could not start the payment. Please try again.' },
      { status: 502 }
    );
  }
}
