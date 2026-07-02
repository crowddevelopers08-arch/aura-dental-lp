'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TREATMENT_CONCERNS = [
  'Crooked Teeth',
  'Gapped Teeth',
  'Crowded Teeth',
  'Overbite',
  'Underbite',
  'Crossbite',
  'General Consultation',
];

export function AlignerLeadFormSection() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', concern: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Please enter your full name.'); return; }
    if (!form.phone.trim()) { setError('Please enter your mobile number.'); return; }
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
          pageUrl: 'Aura Dental - Invisible Aligners LP',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      router.push('/invisible-aligners/thank-you');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="consultation" className="bg-[#DDD5CA]/30 px-4 py-12 sm:px-6 md:px-[60px] md:py-16">
      <div className="mx-auto max-w-[860px]">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#1D4231]/8 px-3 py-1">
            <span className="material-symbols-outlined text-[13px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>dentistry</span>
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[12px]">Book Your Consultation</span>
          </span>
          <h2 className="mt-3 font-heading text-[24px] font-extrabold leading-[1.2] text-[#1D4231] sm:text-[28px] md:text-[32px]">
            Book Your Free Invisible Aligners Consultation <span className="text-[#D3BB71]">Today</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[520px] font-body text-[13px] leading-[1.8] text-[#000000]/55 sm:text-[14px]">
            Complete the form below and our smile experts will contact you shortly.
          </p>
        </div>

        <div className="rounded-[1.75rem] bg-white p-6 shadow-xl ring-1 ring-[#1D4231]/8 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-3 font-body text-[14px] text-[#000000] outline-none transition placeholder:text-[#000000]/35 focus:border-[#1D4231]/40 focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-3 font-body text-[14px] text-[#000000] outline-none transition placeholder:text-[#000000]/35 focus:border-[#1D4231]/40 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Mobile Number
                </label>
                <div className="flex items-center gap-1.5 rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-3 transition focus-within:border-[#1D4231]/40 focus-within:bg-white">
                  <span className="shrink-0 font-body text-[14px] font-semibold text-[#000000]/40">+91</span>
                  <span className="shrink-0 text-[#000000]/20">|</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                    autoComplete="tel"
                    className="min-w-0 flex-1 bg-transparent font-body text-[14px] text-[#000000] outline-none placeholder:text-[#000000]/35"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Treatment Concern
                </label>
                <div className="relative">
                  <select
                    name="concern"
                    value={form.concern}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-3 font-body text-[14px] text-[#000000]/60 outline-none transition focus:border-[#1D4231]/40 focus:bg-white"
                  >
                    <option value="" disabled>Select treatment concern</option>
                    {TREATMENT_CONCERNS.map((concern) => (
                      <option key={concern} value={concern} className="text-[#000000]">{concern}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[17px] text-[#1D4231]/40">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-center font-body text-[12px] font-semibold text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#1D4231] py-3.5 font-body text-[14px] font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Book My Consultation'}
            </button>

            <p className="text-center font-body text-[11px] text-[#000000]/40 sm:text-[12px]">
              No obligation Â· We&apos;ll call you within 30 minutes
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
