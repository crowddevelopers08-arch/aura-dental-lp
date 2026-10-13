export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { overallTreatmentType } from '@/lib/overallTreatments';

// Razorpay calls this endpoint server-to-server after a payment settles. It is
// the reliable half of the flow: the browser callback (VslSelfCheckSection or
// OverallLeadFormSection) can be lost if the patient closes the tab mid-payment,
// but this still fires, so a paid booking always reaches Sheets and TeleCRM.

interface RazorpayPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method?: string;
  email?: string;
  contact?: string;
  created_at?: number;
  notes?: Record<string, string>;
}

function signatureMatches(rawBody: string, signature: string, secret: string) {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function rupees(paise: number) {
  return (paise / 100).toFixed(2);
}

function payerName(payment: RazorpayPayment) {
  return payment.notes?.name?.trim() || 'Razorpay customer';
}

function payerPhone(payment: RazorpayPayment) {
  return (payment.notes?.phone || payment.contact || '')
    .replace(/^\+/, '')
    .replace(/^91(?=\d{10}$)/, '');
}

function payerEmail(payment: RazorpayPayment) {
  return payment.notes?.email?.trim() || payment.email || '';
}

function payerConcern(payment: RazorpayPayment) {
  return payment.notes?.concern?.trim() || '';
}

function payerSituation(payment: RazorpayPayment) {
  return payment.notes?.situation?.trim() || '';
}

function payerPriority(payment: RazorpayPayment) {
  return payment.notes?.priority?.trim() || '';
}

function payerPhoneNote(payment: RazorpayPayment) {
  const phone = payerPhone(payment);
  return phone ? `+91${phone}` : 'Not specified';
}

// ── Funnel routing ───────────────────────────────────────────────────────────
// Two pages take payments: the VSL smile assessment and the /overall replica.
// The form name is stamped on the order notes (create-order), so it comes back
// on every payment and decides where the row and the CRM lead go.
type Funnel = {
  formName: string;
  landingPage: string;
  sheetTab: string;
  telecrmPageName: string;
  product: string;
  paidRequestType: string;
};

const VSL_FUNNEL: Funnel = {
  formName: '',
  landingPage: 'Aura Dental - paid vsl LP',
  sheetTab: 'VSL Leads',
  telecrmPageName: 'aura-dental-implant-vsl',
  product: 'smile assessment',
  paidRequestType: 'paid-smile-assessment',
};

const OVERALL_PAID_FUNNEL: Funnel = {
  formName: 'dental-overall-paid',
  landingPage: 'Aura Dental - Dental Overall Paid LP',
  sheetTab: 'Overall-Paid',
  telecrmPageName: 'dental-overall-paid',
  product: 'consultation booking',
  paidRequestType: 'paid-consultation',
};

// The VSL is an implant funnel; /overall bookings are filed by the selected concern.
function treatmentTypeFor(payment: RazorpayPayment, funnel: Funnel) {
  return funnel === OVERALL_PAID_FUNNEL ? overallTreatmentType(payerConcern(payment)) : 'Dental Implants';
}

function funnelFor(payment: RazorpayPayment): Funnel {
  const formName = payment.notes?.formName?.trim().toLowerCase() || '';
  const source = payment.notes?.source || '';
  if (formName === OVERALL_PAID_FUNNEL.formName || /\/overall(?:[/?#]|$)/i.test(source)) {
    return OVERALL_PAID_FUNNEL;
  }
  return VSL_FUNNEL;
}

// ── Google Sheets ────────────────────────────────────────────────────────────
// Same base shape as app/api/submit-lead plus the payment fields — the Apps
// Script writes rows by header name, so each lands in its own VSL column.
async function appendToGoogleSheet(payment: RazorpayPayment, event: string) {
  const endpoint = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!endpoint) throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not set');

  const paid = event === 'payment.captured';
  const funnel = funnelFor(payment);

  const payload = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: payerName(payment),
    email: payerEmail(payment),
    phone: payerPhone(payment),
    location: 'Not specified',
    treatment: payerConcern(payment) || 'Not specified',
    treatmentType: treatmentTypeFor(payment, funnel),
    situation: payerSituation(payment),
    priority: payerPriority(payment),
    paymentStatus: paid ? 'Paid' : 'Failed',
    amount: `${payment.currency} ${rupees(payment.amount)}`,
    paymentId: payment.id,
    orderId: payment.order_id,
    paymentMethod: payment.method || '',
    source: payment.notes?.source || funnel.landingPage,
    sheetTab: funnel.sheetTab,
    formName: funnel.formName,
    landingPage: funnel.landingPage,
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text || `Google Sheets responded with ${res.status}`);
  try { return text ? JSON.parse(text) : { success: true }; }
  catch { return { success: true }; }
}

// ── TeleCRM ──────────────────────────────────────────────────────────────────
// TeleCRM ignores `fields` keys that don't match a field defined on the
// enterprise, so only send the canonical keys used by app/api/submit-lead.
async function sendToTeleCRM(payment: RazorpayPayment, event: string) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error('TELECRM_API_URL is not set');

  const paid = event === 'payment.captured';
  const funnel = funnelFor(payment);
  const amount = `INR ${rupees(payment.amount)}`;
  const name = payerName(payment);
  const phone = payerPhone(payment);
  const email = payerEmail(payment);
  const concern = payerConcern(payment);
  const situation = payerSituation(payment);
  const priority = payerPriority(payment);
  const source = payment.notes?.source || funnel.landingPage;

  const fields: Record<string, string> = {
    name,
    phone,
    'Lead Status': 'new',
    'Lead Request Type': paid ? funnel.paidRequestType : 'payment-failed',
    'Treatment Type': treatmentTypeFor(payment, funnel),
    Source: source,
    PageName: funnel.telecrmPageName,
    Country: 'India',
  };

  if (email) fields.email = email;
  fields['Treatment Concern'] = paid
    ? `Paid ${funnel.product} – ${amount} (Payment ${payment.id})${concern ? ` | ${concern}` : ''}`
    : `Failed payment for ${funnel.product} – ${amount} (Payment ${payment.id})${concern ? ` | ${concern}` : ''}`;
  // Only land if these exist as TeleCRM fields; the notes carry them either way.
  if (situation) fields['Your Situation'] = situation;
  if (priority) fields['Your Priority'] = priority;

  // TeleCRM lists notes newest-first, so the self-check details go in first and
  // the payment block last — it then reads top-down exactly like the other
  // Grow Medico payment funnels: Lead Source, Method, Order ID, Payment ID,
  // Phone, Name, Amount, Payment status.
  const leadDetails =
    funnel === VSL_FUNNEL
      ? [
          { type: 'SYSTEM_NOTE', text: `Your Priority: ${priority || 'Not selected'}` },
          { type: 'SYSTEM_NOTE', text: `Your Situation: ${situation || 'Not selected'}` },
        ]
      : [
          { type: 'SYSTEM_NOTE', text: `Treatment Concern: ${concern || 'Not specified'}` },
          { type: 'SYSTEM_NOTE', text: `Treatment Type: ${fields['Treatment Type']}` },
          { type: 'SYSTEM_NOTE', text: `Form Name: ${funnel.formName}` },
        ];

  const payload = {
    fields,
    actions: [
      ...leadDetails,
      { type: 'SYSTEM_NOTE', text: `Email: ${email || 'Not provided'}` },
      { type: 'SYSTEM_NOTE', text: `Landing Page: ${funnel.landingPage}` },
      { type: 'SYSTEM_NOTE', text: `Payment status: ${paid ? 'Captured' : 'Failed'}` },
      { type: 'SYSTEM_NOTE', text: `Amount: ${amount}` },
      { type: 'SYSTEM_NOTE', text: `Name: ${name}` },
      { type: 'SYSTEM_NOTE', text: `Phone: ${payerPhoneNote(payment)}` },
      { type: 'SYSTEM_NOTE', text: `Razorpay Payment ID: ${payment.id}` },
      { type: 'SYSTEM_NOTE', text: `Razorpay Order ID: ${payment.order_id}` },
      { type: 'SYSTEM_NOTE', text: `Method: ${payment.method || 'Not specified'}` },
      { type: 'SYSTEM_NOTE', text: `Lead Source: ${source}` },
    ],
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        'X-Client-ID': 'aura-dental-website',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.status === 204) return { status: 'success' };

    const text = await res.text();
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      throw new Error('TeleCRM returned an HTML response — check the API URL');
    }

    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(json.message || `TeleCRM HTTP ${res.status}`);
    return json;
  } catch (err) {
    clearTimeout(timeout);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[Razorpay webhook] RAZORPAY_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 500 });
  }

  const signature = req.headers.get('x-razorpay-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature.' }, { status: 400 });
  }

  // The signature is computed over the exact bytes Razorpay sent, so the raw
  // text must be read before any JSON parsing.
  const rawBody = await req.text();

  if (!signatureMatches(rawBody, signature, secret)) {
    console.error('[Razorpay webhook] Signature mismatch — request rejected');
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  let body: { event?: string; payload?: { payment?: { entity?: RazorpayPayment } } };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const event = body.event || '';
  const payment = body.payload?.payment?.entity;

  // Anything we don't act on is acknowledged with 200 so Razorpay stops retrying.
  if (event !== 'payment.captured' && event !== 'payment.failed') {
    return NextResponse.json({ received: true, ignored: event }, { status: 200 });
  }
  if (!payment?.id) {
    return NextResponse.json({ received: true, ignored: 'no payment entity' }, { status: 200 });
  }

  const [sheetResult, crmResult] = await Promise.allSettled([
    appendToGoogleSheet(payment, event),
    sendToTeleCRM(payment, event),
  ]);

  if (sheetResult.status === 'rejected') {
    console.error('[Razorpay webhook Sheets] Error:', sheetResult.reason?.message);
  }
  if (crmResult.status === 'rejected') {
    console.error('[Razorpay webhook TeleCRM] Error:', crmResult.reason?.message);
  }

  // Always 200 on a verified event. Returning an error would make Razorpay
  // retry and duplicate the row that did succeed.
  return NextResponse.json(
    {
      received: true,
      event,
      paymentId: payment.id,
      sheet: sheetResult.status === 'fulfilled' ? 'ok' : 'failed',
      crm: crmResult.status === 'fulfilled' ? 'ok' : 'failed',
    },
    { status: 200 }
  );
}
