'use client';

import { Outfit } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const outfit = Outfit({ subsets: ['latin'] });

const TREATMENT_CONCERNS = [
  'Single Tooth Implant',
  'Multiple Teeth Implants',
  'Full Mouth Implants',
  'Implant Supported Dentures',
  'General Consultation',
];

const FORM_NAME = 'dental-overall-paid';
const SOURCE_LABEL = 'Aura Dental - Dental Overall Paid LP';

// ─── Razorpay checkout (same flow as the VSL self-check) ────────────
const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js';

interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
}

type RazorpayConstructor = new (options: Record<string, unknown>) => RazorpayInstance;

function getRazorpay() {
  return (window as unknown as { Razorpay?: RazorpayConstructor }).Razorpay;
}

/** Loaded on demand — visitors who never submit the form never download it. */
function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (getRazorpay()) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT}"]`);
    const target = existing ?? document.createElement('script');

    target.addEventListener('load', () => resolve(true), { once: true });
    target.addEventListener('error', () => resolve(false), { once: true });

    if (!existing) {
      target.src = RAZORPAY_SCRIPT;
      target.async = true;
      document.body.appendChild(target);
    }
  });
}

// Overlapping booking card for /overall. The lead is saved first (form name
// dental-overall-paid), then Razorpay checkout opens; the webhook records the
// payment result even if the tab is closed mid-payment.
export function OverallLeadFormSection() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', concern: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Please enter your full name.'); return; }
    if (!form.email.trim()) { setError('Please enter your email address.'); return; }
    if (!form.phone.trim()) { setError('Please enter your mobile number.'); return; }
    if (!form.concern) { setError('Please select a treatment concern.'); return; }
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const phone = form.phone.replace(/\D/g, '').slice(-10);

    setLoading(true);
    try {
      const leadRes = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          healthGoal: form.concern,
          location: '',
          formName: FORM_NAME,
          source: SOURCE_LABEL,
          pageUrl,
        }),
      });
      const leadData = await leadRes.json();
      if (!leadRes.ok) {
        setError(leadData.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          concern: form.concern,
          formName: FORM_NAME,
          pageUrl,
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) {
        setError(order.error || 'Could not start the payment. Please try again.');
        setLoading(false);
        return;
      }

      const scriptReady = await loadRazorpayScript();
      const Razorpay = getRazorpay();
      if (!scriptReady || !Razorpay) {
        setError('Could not open the secure payment window. Please try again.');
        setLoading(false);
        return;
      }

      const checkout = new Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'Aura Dental',
        description: 'Dental Consultation Booking',
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: `+91${phone}`,
        },
        // Mirrors the order notes so the webhook can read every detail back.
        notes: {
          concern: form.concern,
          name: form.name.trim(),
          phone,
          email: form.email.trim(),
          formName: FORM_NAME,
          source: pageUrl,
        },
        theme: { color: '#1D4231' },
        modal: {
          // Patient closed checkout without paying — the lead is already saved.
          ondismiss: () => {
            setLoading(false);
            setError('Payment cancelled. Your details are saved — you can try again.');
          },
        },
        handler: async (response: RazorpaySuccess) => {
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            const verified = await verifyRes.json();
            if (!verifyRes.ok || !verified.verified) {
              setError(verified.error || 'We could not verify this payment. Please contact us.');
              setLoading(false);
              return;
            }
            router.push('/overall/thank-you');
          } catch {
            setError('Payment received, but we could not confirm it here. Our team will call you.');
            setLoading(false);
          }
        },
      });

      checkout.on('payment.failed', (response) => {
        setError(response?.error?.description || 'Payment failed. Please try again.');
        setLoading(false);
      });

      checkout.open();
    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  }

  const labelClass = 'mb-1.5 block pl-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:text-[12px]';
  const fieldClass =
    'h-[46px] w-full rounded-full border border-white/10 bg-white/[.09] px-5 text-[15px] text-white outline-none transition placeholder:text-white/45 focus:border-[#D3BB71]/70 focus:bg-white/[.13]';

  return (
    <section
      id="consultation"
      className={`${outfit.className} relative z-10 -mt-12 px-4 pb-12 sm:px-6 md:-mt-20 md:px-[60px] md:pb-16`}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[28px] bg-[#142F23] px-5 py-6 shadow-[0_30px_60px_rgba(0,0,0,.35)] ring-1 ring-[#D3BB71]/30 sm:px-8 md:px-10 md:py-7">
          <h2 className="text-center text-[22px] leading-tight font-bold text-white sm:text-[24px] md:text-[26px]">
            Book Your Appointment
          </h2>

          <form onSubmit={handleSubmit} noValidate className="mt-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-end lg:gap-4">
              <div>
                <label htmlFor="overall-name" className={labelClass}>Name</label>
                <input
                  id="overall-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  autoComplete="name"
                  required
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="overall-email" className={labelClass}>Email</label>
                <input
                  id="overall-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="overall-phone" className={labelClass}>Mobile</label>
                <div className="flex h-[46px] items-center gap-2.5 rounded-full border border-white/10 bg-white/[.09] px-5 transition focus-within:border-[#D3BB71]/70 focus-within:bg-white/[.13]">
                  <span className="shrink-0 text-[15px] font-semibold text-white/75">+91</span>
                  <span className="h-5 w-px shrink-0 bg-white/25" />
                  <input
                    id="overall-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                    autoComplete="tel"
                    required
                    className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/45"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="overall-concern" className={labelClass}>Treatment Concern</label>
                <div className="relative">
                  <select
                    id="overall-concern"
                    name="concern"
                    value={form.concern}
                    onChange={handleChange}
                    required
                    className={`${fieldClass} appearance-none pr-11 ${form.concern ? 'text-white' : 'text-white/45'}`}
                  >
                    <option value="" disabled className="text-black">Treatment concern</option>
                    {TREATMENT_CONCERNS.map(c => (
                      <option key={c} value={c} className="text-black">{c}</option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2 text-white/70"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-[46px] w-full whitespace-nowrap rounded-full bg-[#D3BB71] px-6 text-[14px] font-bold uppercase tracking-[0.04em] text-[#1D4231] shadow-[0_10px_24px_rgba(211,187,113,.3)] transition-colors hover:bg-[#c7ad5e] disabled:opacity-70 sm:col-span-2 lg:col-span-1 lg:w-auto lg:px-8 lg:text-[15px]"
              >
                {loading ? 'Please wait…' : 'Book Consultation'}
              </button>
            </div>

            {error && (
              <p className="mt-4 text-center text-[13px] font-semibold text-[#ffb4a8]">{error}</p>
            )}

            <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-[12px] text-white/60 sm:text-[13px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-3.5 w-3.5">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secure payment via Razorpay · We&apos;ll call you to confirm your slot
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
