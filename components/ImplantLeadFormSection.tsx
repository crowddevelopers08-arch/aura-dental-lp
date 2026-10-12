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

// Same fields and submission as HeroLeadFormSection — single-row card layout for the implant page.
export function ImplantLeadFormSection() {
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
    setLoading(true);
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          healthGoal: form.concern,
          location: '',
          source: 'Aura Dental - Dental Implant LP',
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong. Please try again.'); return; }
      router.push('/thank-you');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  const labelClass = 'mb-2 block pl-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white sm:text-[12px]';
  const fieldClass =
    'h-[52px] w-full rounded-full border border-white/10 bg-white/[.09] px-5 text-[15px] text-white outline-none transition placeholder:text-white/45 focus:border-[#D3BB71]/70 focus:bg-white/[.13]';

  return (
    <section id="consultation" className={`${outfit.className} bg-[#DDD5CA] px-4 py-12 sm:px-6 md:px-[60px] md:py-16`}>
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-[28px] bg-[#1D4231] px-5 py-8 shadow-[0_30px_60px_rgba(29,66,49,.22)] sm:px-8 md:px-10 md:py-11">
          <h2 className="text-center text-[24px] leading-tight font-bold text-white sm:text-[28px] md:text-[30px]">
            Book Your Appointment
          </h2>

          <form onSubmit={handleSubmit} noValidate className="mt-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-5">
              <div>
                <label htmlFor="implant-name" className={labelClass}>Name</label>
                <input
                  id="implant-name"
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
                <label htmlFor="implant-email" className={labelClass}>Email</label>
                <input
                  id="implant-email"
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
                <label htmlFor="implant-phone" className={labelClass}>Mobile</label>
                <div className="flex h-[52px] items-center gap-2.5 rounded-full border border-white/10 bg-white/[.09] px-5 transition focus-within:border-[#D3BB71]/70 focus-within:bg-white/[.13]">
                  <span className="shrink-0 text-[15px] font-semibold text-white/75">+91</span>
                  <span className="h-5 w-px shrink-0 bg-white/25" />
                  <input
                    id="implant-phone"
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
                <label htmlFor="implant-concern" className={labelClass}>Treatment Concern</label>
                <div className="relative">
                  <select
                    id="implant-concern"
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
                className="h-[52px] w-full rounded-full bg-[#D3BB71] px-6 text-[14px] font-bold uppercase tracking-[0.04em] text-[#1D4231] shadow-[0_10px_24px_rgba(211,187,113,.3)] transition-colors hover:bg-[#c7ad5e] disabled:opacity-70 sm:col-span-2 lg:col-span-1 lg:text-[15px]"
              >
                {loading ? 'Submitting…' : 'Book Consultation'}
              </button>
            </div>

            {error && (
              <p className="mt-4 text-center text-[13px] font-semibold text-[#ffb4a8]">{error}</p>
            )}

            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[12px] text-white/60 sm:text-[13px]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-3.5 w-3.5">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              No obligation · We&apos;ll call you within 30 minutes
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
