'use client';

import { HeroVideoPlayer } from '@/components/HeroVideoPlayer';

const TRUST_BADGES = [
  { icon: 'verified_user',            text: 'Experienced Orthodontists & Smile Specialists' },
  { icon: 'visibility',               text: 'Clear, Nearly Invisible Aligners' },
  { icon: 'sentiment_very_satisfied', text: 'Comfortable & Removable Aligners' },
  { icon: 'star',                     text: '5,000+ Happy Smiles Transformed' },
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

          {/* Google Rating + Call CTA */}
          <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
            {/* Google Rating */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="#FBBC05" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span className="ml-1 font-outfit text-[15px] font-bold text-white">4.9</span>
              </div>
              <span className="font-outfit text-[13px] font-medium text-white/70">500+ Google Reviews</span>
            </div>

            {/* Call CTA */}
            <a
              href="tel:+917842474433"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-6 py-2.5 font-outfit text-[13px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[14px]"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
              Call Now to Book Appointment
            </a>
          </div>
        </div>

        <div className="hidden w-full flex-shrink-0 lg:block lg:w-[50%] xl:w-[52%]">
          <HeroVideoPlayer />
        </div>
      </div>
    </section>
  );
}
