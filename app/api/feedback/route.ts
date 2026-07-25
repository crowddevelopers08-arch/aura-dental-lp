export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

interface FeedbackInput {
  name: string;
  phone: string;
  requestCallback: 'yes' | 'no';
  message: string;
  pageUrl?: string;
  branch: string;
  telecrmPageName: string;
}

const FEEDBACK_SOURCE = 'Aura Dental – Client Feedback';

type FeedbackBranch = { label: string; telecrmPageName: string };

const DEFAULT_BRANCH: FeedbackBranch = {
  label: 'Not specified',
  telecrmPageName: 'aura-dental-feedback',
};

/**
 * Resolve the branch from whatever hints the client sent. The live URL is the
 * reliable signal (…/client-feedback/kondapur), so it works even if an older
 * cached bundle posts without an explicit `branch`.
 */
function getFeedbackBranch(...hints: (string | undefined)[]): FeedbackBranch {
  const normalized = hints.filter(Boolean).join(' ').toLowerCase().replace(/[^a-z0-9]+/g, ' ');

  if (normalized.includes('kondapur')) {
    return { label: 'Kondapur', telecrmPageName: 'aura-dental-feedback-kondapur' };
  }
  // Accept both spellings so older cards / links keep resolving.
  if (normalized.includes('madeenaguda') || normalized.includes('madinaguda')) {
    return { label: 'Madeenaguda', telecrmPageName: 'aura-dental-feedback-madeenaguda' };
  }

  return DEFAULT_BRANCH;
}

// ── Google Sheets ─────────────────────────────────────────────────────────────
async function appendFeedbackToSheet(data: FeedbackInput) {
  const endpoint =
    process.env.GOOGLE_SHEETS_FEEDBACK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!endpoint) throw new Error('Google Sheets webhook URL is not set');

  const payload = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: data.name.trim(),
    phone: data.phone.replace(/[\s\-\(\)]/g, '').replace(/^\+91/, ''),
    requestCallback: data.requestCallback === 'yes' ? 'Yes' : 'No',
    message: data.message.trim(),
    branch: data.branch,
    pageUrl: data.pageUrl?.trim() || '',
    source: data.pageUrl?.trim() || FEEDBACK_SOURCE,
    sheetTab: 'Client Feedback',
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

  // The live page URL is the source of record; fall back to the static label
  // only when the client could not report one.
  const sourceUrl = data.pageUrl?.trim() || FEEDBACK_SOURCE;

  // TeleCRM ignores `fields` keys that don't match a field defined on the
  // enterprise, so only send canonical keys — matching the submit-lead payload.
  const payload = {
    fields: {
      name: data.name.trim(),
      phone: data.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, ''),
      message: `Client feedback: ${data.message.trim()}`,
      'Lead Status': 'new',
      'Lead Request Type': 'feedback',
      Source: sourceUrl,
      PageName: data.telecrmPageName,
      Branch: data.branch,
      Country: 'India',
    },
    actions: [
      { type: 'SYSTEM_NOTE', text: `Lead Source: ${sourceUrl}` },
      { type: 'SYSTEM_NOTE', text: `Branch: ${data.branch}` },
      { type: 'SYSTEM_NOTE', text: `Feedback: ${data.message.trim()}` },
      { type: 'SYSTEM_NOTE', text: `Callback Requested: ${data.requestCallback === 'yes' ? 'Yes' : 'No'}` },
      { type: 'SYSTEM_NOTE', text: 'Consent Given: Yes' },
    ],
  };

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

  const { name = '', phone = '', requestCallback = 'no', message = '', pageUrl = '', branch = '' } = body;

  if (!name.trim())
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!phone.trim())
    return NextResponse.json({ error: 'Please enter your phone number.' }, { status: 400 });
  if (!/^\d{10}$/.test(phone.replace(/[\s\-\(\)]/g, '').replace(/^\+91/, '')))
    return NextResponse.json({ error: 'Please enter a valid 10-digit phone number.' }, { status: 400 });
  if (!message.trim())
    return NextResponse.json({ error: 'Please tell us what went wrong.' }, { status: 400 });

  const branchConfig = getFeedbackBranch(pageUrl, branch);

  const feedbackData: FeedbackInput = {
    name,
    phone,
    requestCallback: requestCallback === 'yes' ? 'yes' : 'no',
    message,
    pageUrl,
    branch: branchConfig.label,
    telecrmPageName: branchConfig.telecrmPageName,
  };

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
      branch: branchConfig.label,
      timestamp: new Date().toISOString(),
    },
    { status: 201 }
  );
}
