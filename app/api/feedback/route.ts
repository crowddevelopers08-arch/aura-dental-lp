export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

interface FeedbackInput {
  name: string;
  email: string;
  phone: string;
  suggestions: string;
}

// ── Google Sheets ─────────────────────────────────────────────────────────────
async function appendFeedbackToSheet(data: FeedbackInput) {
  const endpoint =
    process.env.GOOGLE_SHEETS_FEEDBACK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!endpoint) throw new Error('Google Sheets webhook URL is not set');

  const payload = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.replace(/[\s\-\(\)]/g, '').replace(/^\+91/, ''),
    suggestions: data.suggestions.trim(),
    source: 'Next door nutrition – Client Feedback',
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

// ── TeleCRM ───────────────────────────────────────────────────────────────────
async function sendFeedbackToTeleCRM(data: FeedbackInput) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error('TELECRM_API_URL is not set');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const createdOn = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  });

  const payload = {
    fields: {
      Id: '',
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.replace(/\D/g, ''),
      city_1: 'Anna Nagar, Chennai',
      message: `Client feedback: ${data.suggestions.trim()}`,
      Country: 'India',
      LeadID: '',
      CreatedOn: createdOn,
      'Lead Stage': '',
      'Lead Status': 'new',
      'Lead Request Type': 'feedback',
      PageName: 'le-thia-cares-feedback',
      State: 'Tamil Nadu',
    },
    actions: [
      { type: 'SYSTEM_NOTE', text: 'Lead Source: le-thia-cares-client-feedback' },
      { type: 'SYSTEM_NOTE', text: `Feedback: ${data.suggestions.trim()}` },
      { type: 'SYSTEM_NOTE', text: 'Consent Given: Yes' },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        'X-Client-ID': 'le-thia-cares-website',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (res.status === 204) return { status: 'success', message: 'Lead created (204)' };

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
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name = '', email = '', phone = '', suggestions = '' } = body;

  if (!name.trim())
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!email.trim())
    return NextResponse.json({ error: 'Please enter your email address.' }, { status: 400 });
  if (!phone.trim())
    return NextResponse.json({ error: 'Please enter your phone number.' }, { status: 400 });
  if (!suggestions.trim())
    return NextResponse.json({ error: 'Please share your suggestions.' }, { status: 400 });

  const feedbackData: FeedbackInput = { name, email, phone, suggestions };

  const [sheetResult, crmResult] = await Promise.allSettled([
    appendFeedbackToSheet(feedbackData),
    sendFeedbackToTeleCRM(feedbackData),
  ]);

  if (sheetResult.status === 'rejected') {
    console.error('[Google Sheets – Feedback] Error:', sheetResult.reason?.message);
  }
  if (crmResult.status === 'rejected') {
    console.error('[TeleCRM – Feedback] Error:', crmResult.reason?.message);
  }

  return NextResponse.json(
    {
      success: true,
      sheet: sheetResult.status === 'fulfilled' ? 'ok' : 'failed',
      crm: crmResult.status === 'fulfilled' ? 'ok' : 'failed',
      timestamp: new Date().toISOString(),
    },
    { status: 201 }
  );
}
