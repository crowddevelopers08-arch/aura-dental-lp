'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RESERVE_ANCHOR, VslPaymentNote } from '@/components/vsl/VslCtaButton';

/** Measure before paint on the client; fall back to useEffect during SSR. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// ─── Content ────────────────────────────────────────────────────────
const SITUATIONS = [
  { label: 'One missing tooth', icon: 'looks_one' },
  { label: 'Multiple missing teeth', icon: 'grid_view' },
  { label: 'Loose dentures', icon: 'swap_vert' },
  { label: 'Difficulty chewing', icon: 'restaurant' },
  { label: 'Just exploring my options', icon: 'travel_explore' },
];

const PRIORITIES = [
  { label: 'A natural-looking smile', icon: 'sentiment_very_satisfied' },
  { label: 'Better chewing', icon: 'restaurant_menu' },
  { label: 'A stable, fixed solution', icon: 'anchor' },
  { label: 'Understanding my options', icon: 'menu_book' },
];

const HOW_IT_WORKS = [
  { num: '01', title: 'Implant', icon: 'dentistry', desc: 'Titanium implant placed into the jawbone.' },
  { num: '02', title: 'Integration', icon: 'healing', desc: 'The implant bonds with the surrounding bone during healing.' },
  { num: '03', title: 'New Tooth', icon: 'auto_awesome', desc: 'A customised crown is attached to restore the missing tooth.' },
];

const TOTAL_STEPS = 5;

// ─── Razorpay checkout ──────────────────────────────────────────────
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

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

/** Loaded on demand — visitors who never reach the form never download it. */
function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

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

// ─── Selectable chip ────────────────────────────────────────────────
function ChoiceChip({
  label,
  icon,
  selected,
  active,
  onToggle,
}: {
  label: string;
  icon: string;
  selected: boolean;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      tabIndex={active ? 0 : -1}
      onClick={onToggle}
      className={`group flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-300 sm:gap-3.5 sm:p-4 ${
        selected
          ? 'border-[#D3BB71] bg-[#D3BB71]/12'
          : 'border-[#1D4231]/15 bg-[#DDD5CA]/30 hover:border-[#1D4231] hover:bg-white'
      }`}
    >
      <span
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
          selected ? 'bg-[#1D4231] text-[#D3BB71]' : 'bg-white text-[#1D4231]/55 group-hover:text-[#1D4231]'
        }`}
      >
        <span className="material-symbols-outlined text-[20.5px]" style={{ fontVariationSettings: '"FILL" 1' }}>
          {icon}
        </span>
      </span>

      <span className="flex-1 font-body text-[15px] font-bold leading-[1.45] text-[#1D4231] sm:text-[16px]">
        {label}
      </span>

      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all duration-300 ${
          selected ? 'border-[#1D4231] bg-[#1D4231]' : 'border-[#1D4231]/25 bg-white'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[15.5px] text-[#D3BB71] transition-opacity duration-200 ${
            selected ? 'opacity-100' : 'opacity-0'
          }`}
        >
          check
        </span>
      </span>
    </button>
  );
}

// ─── Step button ────────────────────────────────────────────────────
function StepButton({
  label,
  active,
  onClick,
  type = 'button',
  disabled = false,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      className="vsl-glow-btn vsl-glow-btn-green font-body inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#1D4231] px-8 py-3.5 text-[13.5px] font-bold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-[#D3BB71] hover:text-[#1D4231] disabled:opacity-60 sm:w-auto sm:text-[14.5px]"
    >
      {label}
      <span className="material-symbols-outlined text-[18.5px]">arrow_forward</span>
    </button>
  );
}

// ─── Section ────────────────────────────────────────────────────────
export function VslSelfCheckSection() {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mounted = useRef(false);

  const [step, setStep] = useState(0);
  const [trackHeight, setTrackHeight] = useState<number | undefined>(undefined);
  const [situation, setSituation] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Collapse the track to the active slide so short steps don't leave dead space.
  useIsomorphicLayoutEffect(() => {
    const el = slideRefs.current[step];
    if (!el) return;
    const measure = () => setTrackHeight(el.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [step]);

  // Keep the panel in view as the slides change height.
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const el = panelRef.current;
    if (!el) return;
    const { top } = el.getBoundingClientRect();
    if (top < 72 || top > window.innerHeight * 0.6) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  // The lead is saved BEFORE checkout opens, so an abandoned payment still
  // reaches the CRM. The payment itself is confirmed twice: here (fast, for the
  // redirect) and again by Razorpay's webhook (reliable, even if the tab closes).
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Please enter your name.'); return; }
    if (!form.phone.trim()) { setError('Please enter your mobile number.'); return; }
    if (!form.email.trim()) { setError('Please enter your email address.'); return; }

    const concern = [...situation, ...priority].join(', ');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    setLoading(true);
    try {
      const leadRes = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          healthGoal: concern,
          location: '',
          source: 'Aura Dental - Dental Implant VSL',
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
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, concern, pageUrl }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) {
        setError(order.error || 'Could not start the payment. Please try again.');
        setLoading(false);
        return;
      }

      const scriptReady = await loadRazorpayScript();
      if (!scriptReady || !window.Razorpay) {
        setError('Could not open the secure payment window. Please try again.');
        setLoading(false);
        return;
      }

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'Aura Dental',
        description: 'Smile Assessment Reservation',
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: `+91${form.phone.replace(/\D/g, '').slice(-10)}`,
        },
        notes: { concern },
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
            router.push('/vsl/thank-you');
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

  const inputClass =
    'w-full rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/35 px-4 py-3 font-body font-medium text-[15.5px] text-[#000000] outline-none transition placeholder:text-[#000000]/30 focus:border-[#D3BB71] focus:bg-white';
  const labelClass = 'mb-1 block font-body text-[11.5px] font-bold uppercase tracking-[0.18em] text-[#1D4231]';

  return (
    <section
      id={RESERVE_ANCHOR}
      className="relative overflow-hidden bg-[#1D4231] px-4 py-10 sm:px-6 md:px-[60px] md:py-12 lg:py-16"
    >
      <div className="relative z-[1] mx-auto max-w-[900px]">

        {/* Heading */}
        <div className="mb-6 text-center md:mb-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D3BB71]/35 bg-[#D3BB71]/10 px-3 py-1">
            <span className="material-symbols-outlined text-[14.5px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
              quiz
            </span>
            <span className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#D3BB71] sm:text-[13px]">
              30-Second Self-Check
            </span>
          </span>
          <h2 className="mt-3 font-heading text-[26px] font-extrabold leading-[1.15] text-white sm:text-[31px] md:text-[36px] lg:text-[40px]">
            Is <span className="text-[#D3BB71]">This You?</span>
          </h2>
        </div>

        {/* Panel */}
        <div
          ref={panelRef}
          className="scroll-mt-24 overflow-hidden rounded-[1.5rem] border-2 border-[#D3BB71] bg-white sm:rounded-[2rem]"
        >
          {/* Progress header */}
          <div className="flex items-center gap-3 border-b border-[#1D4231]/10 bg-[#DDD5CA]/30 px-5 py-3 sm:px-8">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              aria-label="Go to previous step"
              disabled={step === 0}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#1D4231]/15 text-[#1D4231] transition-all hover:bg-[#1D4231] hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              <span className="material-symbols-outlined text-[19.5px]">arrow_back</span>
            </button>

            <div className="flex flex-1 gap-1.5">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? 'bg-[#D3BB71]' : 'bg-[#1D4231]/12'
                  }`}
                />
              ))}
            </div>

            <span className="font-body flex-shrink-0 text-[12px] font-bold uppercase tracking-[0.16em] text-[#1D4231]/50 sm:text-[13px]">
              {step + 1} / {TOTAL_STEPS}
            </span>
          </div>

          {/* Sliding track */}
          <div
            className="overflow-hidden transition-[height] duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ height: trackHeight }}
          >
            <div
              className="flex items-start transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateX(-${step * 100}%)` }}
            >

              {/* ── 1 · START ── */}
              <div
                ref={(el) => { slideRefs.current[0] = el; }}
                aria-hidden={step !== 0}
                className={`w-full flex-shrink-0 px-5 py-8 sm:px-8 sm:py-10 md:px-12 ${step !== 0 ? 'pointer-events-none' : ''}`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D4231] sm:h-16 sm:w-16">
                    <span className="material-symbols-outlined text-[30px] text-[#D3BB71] sm:text-[34px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                      dentistry
                    </span>
                  </span>
                  <h3 className="mt-5 font-heading text-[23px] font-extrabold leading-[1.2] text-[#1D4231] sm:text-[28px] md:text-[31px]">
                    Is a dental implant right for you?
                  </h3>
                  <p className="mt-2.5 font-body font-medium text-[15px] leading-[1.7] text-[#000000]/55 sm:text-[16px]">
                    Take this 30-second self-check.
                  </p>
                  <div className="mt-6 w-full sm:w-auto">
                    <StepButton label="Start" active={step === 0} onClick={() => setStep(1)} />
                  </div>
                </div>
              </div>

              {/* ── 2 · YOUR SITUATION ── */}
              <div
                ref={(el) => { slideRefs.current[1] = el; }}
                aria-hidden={step !== 1}
                className={`w-full flex-shrink-0 px-5 py-7 sm:px-8 sm:py-9 md:px-12 ${step !== 1 ? 'pointer-events-none' : ''}`}
              >
                <span className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#D3BB71]">
                  Your Situation
                </span>
                <h3 className="mt-2 font-heading text-[23px] font-extrabold leading-[1.2] text-[#1D4231] sm:text-[27px] md:text-[30px]">
                  What best describes you?
                </h3>
                <p className="mt-1.5 font-body text-[14px] font-semibold text-[#000000]/45 sm:text-[15px]">
                  Select all that apply
                </p>

                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {SITUATIONS.map((item, i) => (
                    <div key={item.label} className={i === SITUATIONS.length - 1 && SITUATIONS.length % 2 ? 'sm:col-span-2' : ''}>
                      <ChoiceChip
                        label={item.label}
                        icon={item.icon}
                        selected={situation.includes(item.label)}
                        active={step === 1}
                        onToggle={() => toggle(situation, setSituation, item.label)}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center sm:justify-start">
                  <StepButton label="Continue" active={step === 1} onClick={() => setStep(2)} />
                </div>
              </div>

              {/* ── 3 · YOUR PRIORITY ── */}
              <div
                ref={(el) => { slideRefs.current[2] = el; }}
                aria-hidden={step !== 2}
                className={`w-full flex-shrink-0 px-5 py-7 sm:px-8 sm:py-9 md:px-12 ${step !== 2 ? 'pointer-events-none' : ''}`}
              >
                <span className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#D3BB71]">
                  Your Priority
                </span>
                <h3 className="mt-2 font-heading text-[23px] font-extrabold leading-[1.2] text-[#1D4231] sm:text-[27px] md:text-[30px]">
                  What matters most to you?
                </h3>
                <p className="mt-1.5 font-body text-[14px] font-semibold text-[#000000]/45 sm:text-[15px]">
                  Select all that apply
                </p>

                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {PRIORITIES.map((item) => (
                    <ChoiceChip
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      selected={priority.includes(item.label)}
                      active={step === 2}
                      onToggle={() => toggle(priority, setPriority, item.label)}
                    />
                  ))}
                </div>

                <div className="mt-6 flex justify-center sm:justify-start">
                  <StepButton label="Continue" active={step === 2} onClick={() => setStep(3)} />
                </div>
              </div>

              {/* ── 4 · HOW IT WORKS ── */}
              <div
                ref={(el) => { slideRefs.current[3] = el; }}
                aria-hidden={step !== 3}
                className={`w-full flex-shrink-0 px-5 py-7 sm:px-8 sm:py-9 md:px-12 ${step !== 3 ? 'pointer-events-none' : ''}`}
              >
                <div className="text-center">
                  <span className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#D3BB71]">
                    How It Works
                  </span>
                  <h3 className="mt-2 font-heading text-[23px] font-extrabold leading-[1.2] text-[#1D4231] sm:text-[27px] md:text-[30px]">
                    How dental implants work
                  </h3>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {HOW_IT_WORKS.map((s) => (
                    <div
                      key={s.num}
                      className="flex h-full items-center gap-3.5 rounded-2xl border border-[#1D4231]/15 bg-[#DDD5CA]/25 p-3.5 sm:flex-col sm:items-center sm:gap-0 sm:p-5 sm:text-center"
                    >
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1D4231] sm:h-14 sm:w-14">
                        <span
                          className="material-symbols-outlined text-[24px] text-[#D3BB71] sm:text-[28px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          {s.icon}
                        </span>
                      </span>

                      <div className="min-w-0 flex-1 sm:mt-4 sm:flex-none">
                        <span className="block font-body text-[12px] font-black uppercase tracking-[0.2em] text-[#D3BB71]">
                          {s.num} — {s.title}
                        </span>
                        <p className="mt-1.5 font-body font-medium text-[14px] leading-[1.65] text-[#000000]/65 sm:text-[14.5px]">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-center gap-2.5 rounded-xl border border-[#D3BB71] bg-[#D3BB71]/10 px-4 py-3">
                  <span
                    className="material-symbols-outlined flex-shrink-0 text-[18.5px] text-[#1D4231]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    info
                  </span>
                  <p className="font-body text-[13.5px] font-semibold leading-[1.6] text-[#1D4231] sm:text-[14.5px]">
                    Your suitability can only be confirmed after a professional assessment.
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <StepButton label="See My Options" active={step === 3} onClick={() => setStep(4)} />
                </div>
              </div>

              {/* ── 5 · GET YOUR ASSESSMENT ── */}
              <div
                ref={(el) => { slideRefs.current[4] = el; }}
                aria-hidden={step !== 4}
                className={`w-full flex-shrink-0 px-5 py-7 sm:px-8 sm:py-9 md:px-12 ${step !== 4 ? 'pointer-events-none' : ''}`}
              >
                <div className="text-center">
                  <span className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#D3BB71]">
                    Get Your Assessment
                  </span>
                  <h3 className="mt-2 font-heading text-[23px] font-extrabold leading-[1.2] text-[#1D4231] sm:text-[27px] md:text-[30px]">
                    Ready to know what&rsquo;s right for you?
                  </h3>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-3.5">
                  <div>
                    <label htmlFor="vsl-name" className={labelClass}>Name</label>
                    <input
                      id="vsl-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      disabled={step !== 4}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="vsl-phone" className={labelClass}>Phone</label>
                      <div className="flex items-center gap-1.5 rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/35 px-4 py-3 transition focus-within:border-[#D3BB71] focus-within:bg-white">
                        <span className="shrink-0 font-body text-[15.5px] font-bold text-[#000000]/40">+91</span>
                        <span className="shrink-0 text-[#000000]/20">|</span>
                        <input
                          id="vsl-phone"
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="10-digit number"
                          maxLength={10}
                          autoComplete="tel"
                          disabled={step !== 4}
                          className="min-w-0 flex-1 bg-transparent font-body font-medium text-[15.5px] text-[#000000] outline-none placeholder:text-[#000000]/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="vsl-email" className={labelClass}>Email</label>
                      <input
                        id="vsl-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        autoComplete="email"
                        disabled={step !== 4}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-center font-body text-[13.5px] font-bold text-red-500">{error}</p>
                  )}

                  <div className="mt-1 flex justify-center">
                    <StepButton
                      type="submit"
                      label={loading ? 'Opening secure payment…' : 'Reserve My Smile Assessment'}
                      active={step === 4}
                      disabled={loading}
                    />
                  </div>

                  {/* Accepted payment methods */}
                  <div className="mx-auto w-full max-w-[340px] sm:max-w-[380px]">
                    <Image
                      src="/newpaynxt.png"
                      alt="Accepted payment methods: RuPay, Visa, UPI, Maestro, MasterCard and American Express"
                      width={2172}
                      height={275}
                      sizes="(min-width: 640px) 380px, 340px"
                      className="h-auto w-full"
                    />
                  </div>

                  <VslPaymentNote tone="dark" />
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
