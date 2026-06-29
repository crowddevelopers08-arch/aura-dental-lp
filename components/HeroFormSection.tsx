'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TRUST_BADGES = [
  { icon: 'star',                    text: '5,000+ Happy Smiles Transformed' },
  { icon: 'dentistry',               text: '10,000+ Successful Dental Implants' },
  { icon: 'verified_user',           text: 'Experienced Implantologist & Prosthodontist' },
  { icon: 'local_hospital',          text: 'Highly Equipped Digital Dental Clinic' },
  { icon: 'biotech',                 text: 'Advanced 3D Implant Planning & Technology' },
  { icon: 'sentiment_very_satisfied',text: 'Painless & Precision-Based Treatment' },
];

const TREATMENT_CONCERNS = [
  'Single Tooth Implant',
  'Multiple Teeth Implants',
  'Full Mouth Implants',
  'Implant Supported Dentures',
  'General Consultation',
];

export function HeroFormSection() {
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
          pageUrl: 'Aura Dental – Dental Implant LP',
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

  return (
    <section className="relative w-full overflow-hidden">
      <video
        className="hero-anim-video absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/nwd.png"
      >
        <source src="/vidssave.mp4" type="video/mp4" />
      </video>

      {/* Subtle white wash for text legibility */}
      <div className="absolute inset-0 z-0 bg-white/40" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-10 px-4 pt-32 pb-20 sm:px-6 md:px-[60px] md:pt-36 md:pb-24 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">

        {/* LEFT – headline + badges */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

          {/* Eyebrow badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1D4231]/30 bg-[#1D4231]/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1D4231]" />
            <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.2em] text-[#1D4231] sm:text-[11px]">
              Hyderabad's Advanced Dental Implant Centre
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-outfit text-[26px] font-extrabold leading-[1.18] text-[#1D4231] sm:text-[30px] md:text-[36px] lg:text-[30px] xl:text-[38px] 2xl:text-[44px]">
            Hyderabad's Best Dental Clinic for{' '}
            <span className="text-[#D3BB71]">Advanced Dental Implant</span>{' '}
            Treatment
          </h1>

          {/* Subheadline */}
          <p className="mt-4 max-w-[560px] font-outfit text-[13px] leading-[1.8] text-[#000000]/70 sm:text-[14px] lg:max-w-none xl:text-[15px]">
            Restore your smile with permanent, natural-looking dental implants at Aura Dental. Our experienced implant specialists combine advanced technology with personalized care to deliver safe, precise, and long-lasting results.
          </p>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2.5">
                <span
                  className="material-symbols-outlined flex-shrink-0 text-[18px] text-[#1D4231]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {badge.icon}
                </span>
                <span className="font-outfit text-[12px] font-medium text-[#000000]/80 sm:text-[13px]">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>

          {/* Call CTA */}
          <a
            href="tel:+91XXXXXXXXXX"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#1D4231]/40 bg-[#1D4231]/10 px-6 py-3 font-outfit text-[13px] font-semibold text-[#1D4231] backdrop-blur-sm transition-colors hover:bg-[#1D4231]/20 sm:text-[14px]"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
            Call Now to Book Appointment
          </a>
        </div>

        {/* RIGHT – form card */}
        <div id="consultation" className="w-full max-w-[420px] flex-shrink-0 lg:w-[380px] xl:w-[420px]">
          <div className="rounded-[1.75rem] bg-white p-6 shadow-2xl xl:p-7">

            <div className="mb-5 text-center">
              <h3 className="font-outfit text-[16px] font-extrabold leading-[1.3] text-[#1D4231] xl:text-[18px]">
                Book Your Free Dental Implant Consultation
              </h3>
              <p className="mt-1.5 font-outfit text-[11px] leading-[1.6] text-[#000000]/50 sm:text-[12px]">
                Complete the form below and our dental experts will contact you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

              {/* Full Name */}
              <div>
                <label className="mb-1 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-2.5 font-outfit text-[13px] text-[#000000] outline-none transition placeholder:text-[#000000]/35 focus:border-[#1D4231]/40 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-2.5 font-outfit text-[13px] text-[#000000] outline-none transition placeholder:text-[#000000]/35 focus:border-[#1D4231]/40 focus:bg-white"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-1 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Mobile Number
                </label>
                <div className="flex items-center gap-1.5 rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-2.5 transition focus-within:border-[#1D4231]/40 focus-within:bg-white">
                  <span className="shrink-0 font-outfit text-[13px] font-semibold text-[#000000]/40">+91</span>
                  <span className="shrink-0 text-[#000000]/20">|</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                    autoComplete="tel"
                    className="min-w-0 flex-1 bg-transparent font-outfit text-[13px] text-[#000000] outline-none placeholder:text-[#000000]/35"
                  />
                </div>
              </div>

              {/* Treatment Concern */}
              <div>
                <label className="mb-1 block font-outfit text-[9px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
                  Treatment Concern
                </label>
                <div className="relative">
                  <select
                    name="concern"
                    value={form.concern}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-[#1D4231]/15 bg-[#DDD5CA]/50 px-4 py-2.5 font-outfit text-[13px] text-[#000000]/60 outline-none transition focus:border-[#1D4231]/40 focus:bg-white"
                  >
                    <option value="" disabled>Select treatment concern</option>
                    {TREATMENT_CONCERNS.map(c => (
                      <option key={c} value={c} className="text-[#000000]">{c}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-[#1D4231]/40">
                    expand_more
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-center font-outfit text-[11px] font-semibold text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-full bg-[#1D4231] py-3.5 font-outfit text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#1D4231] disabled:opacity-70"
              >
                {loading ? 'Submitting…' : 'Book My Consultation'}
              </button>

              <p className="text-center font-outfit text-[10px] text-[#000000]/40 sm:text-[11px]">
                Free consultation · No obligation · We'll call you within 30 minutes
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
