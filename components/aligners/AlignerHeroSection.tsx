'use client';

import { HeroVideoPlayer } from '@/components/HeroVideoPlayer';

const TRUST_BADGES = [
  { icon: 'verified_user', text: 'Experienced Orthodontists & Smile Specialists' },
  { icon: 'visibility', text: 'Clear, Nearly Invisible Aligners' },
  { icon: 'biotech', text: 'Advanced 3D Digital Smile Planning' },
  { icon: 'sentiment_very_satisfied', text: 'Comfortable & Removable Aligners' },
  { icon: 'star', text: '5,000+ Happy Smiles Transformed' },
  { icon: 'local_hospital', text: 'Highly Equipped Digital Dental Clinic' },
];

export function AlignerHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1D4231] px-4 pb-14 pt-32 sm:px-6 md:px-[60px] md:pb-18 md:pt-36 max-[470px]:pb-10 max-[470px]:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #D3BB71 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D3BB71]/30 bg-[#D3BB71]/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D3BB71]" />
            <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[11px]">
              Hyderabad&apos;s Advanced Invisible Aligner Centre
            </span>
          </div>

          <h1 className="font-outfit text-[26px] font-extrabold leading-[1.18] text-white sm:text-[30px] md:text-[36px] lg:text-[30px] xl:text-[38px] 2xl:text-[44px]">
            Hyderabad&apos;s Best Dental Clinic for{' '}
            <span className="text-[#D3BB71]">Invisible Aligners</span>{' '}
            &amp; Smile Correction
          </h1>

          <div className="mt-5 w-full lg:hidden">
            <HeroVideoPlayer />
          </div>

          <p className="mt-4 max-w-[560px] font-outfit text-[13px] leading-[1.8] text-white/65 sm:text-[14px] lg:max-w-none xl:text-[15px]">
            Straighten your teeth comfortably with nearly invisible aligners at Aura Dental. Our experienced orthodontic specialists use advanced digital smile planning to create personalized treatment plans that help you achieve a confident, beautiful smile without traditional metal braces.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2.5">
                <span className="material-symbols-outlined flex-shrink-0 text-[18px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {badge.icon}
                </span>
                <span className="font-outfit text-[12px] font-medium text-white/80 sm:text-[13px]">{badge.text}</span>
              </div>
            ))}
          </div>

          <a
            href="tel:+917842474433"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-6 py-3 font-outfit text-[13px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[14px]"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
            Call Now to Book Appointment
          </a>
        </div>

        <div className="hidden w-full flex-shrink-0 lg:block lg:w-[50%] xl:w-[52%]">
          <HeroVideoPlayer />
        </div>
      </div>
    </section>
  );
}
