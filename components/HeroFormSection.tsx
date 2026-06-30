'use client';

import { useRef, useState, useCallback } from 'react';

const TRUST_BADGES = [
  { icon: 'star',                     text: '5,000+ Happy Smiles Transformed' },
  { icon: 'dentistry',                text: '10,000+ Successful Dental Implants' },
  { icon: 'verified_user',            text: 'Experienced Implantologist & Prosthodontist' },
  { icon: 'local_hospital',           text: 'Highly Equipped Digital Dental Clinic' },
  { icon: 'biotech',                  text: 'Advanced 3D Implant Planning & Technology' },
  { icon: 'sentiment_very_satisfied', text: 'Painless & Precision-Based Treatment' },
];

function VideoPlayer({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted]     = useState(true);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 ${className ?? ''}`}>
      <video
        ref={videoRef}
        className="aspect-video w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/vidssave.mp4" type="video/mp4" />
      </video>

      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D3BB71]/20 text-[#D3BB71] backdrop-blur-sm transition hover:bg-[#D3BB71]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3BB71]"
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            {playing ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D3BB71]/20 text-[#D3BB71] backdrop-blur-sm transition hover:bg-[#D3BB71]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3BB71]"
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            {muted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>
    </div>
  );
}

export function HeroFormSection() {
  return (
    <section className="relative overflow-hidden bg-[#1D4231] px-4 pt-32 pb-14 sm:px-6 md:px-[60px] md:pt-36 md:pb-18 max-[470px]:pt-20 max-[470px]:pb-10">

      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #D3BB71 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[1280px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">

        {/* LEFT – headline + badges */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D3BB71]/30 bg-[#D3BB71]/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D3BB71]" />
            <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[11px]">
              Hyderabad&apos;s Advanced Dental Implant Centre
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-outfit text-[26px] font-extrabold leading-[1.18] text-white sm:text-[30px] md:text-[36px] lg:text-[30px] xl:text-[38px] 2xl:text-[44px]">
            Hyderabad&apos;s Best Dental Clinic for{' '}
            <span className="text-[#D3BB71]">Advanced Dental Implant</span>{' '}
            Treatment
          </h1>

          {/* Mobile video */}
          <div className="mt-5 w-full lg:hidden">
            <VideoPlayer />
          </div>

          {/* Subheadline */}
          <p className="mt-4 max-w-[560px] font-outfit text-[13px] leading-[1.8] text-white/65 sm:text-[14px] lg:max-w-none xl:text-[15px]">
            Restore your smile with permanent, natural-looking dental implants at Aura Dental. Our experienced implant specialists combine advanced technology with personalized care to deliver safe, precise, and long-lasting results.
          </p>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2.5">
                <span
                  className="material-symbols-outlined flex-shrink-0 text-[18px] text-[#D3BB71]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {badge.icon}
                </span>
                <span className="font-outfit text-[12px] font-medium text-white/80 sm:text-[13px]">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>

          {/* Call CTA */}
          <a
            href="tel:+917842474433"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-6 py-3 font-outfit text-[13px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[14px]"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
            Call Now to Book Appointment
          </a>
        </div>

        {/* RIGHT – desktop video */}
        <div className="hidden w-full flex-shrink-0 lg:block lg:w-[50%] xl:w-[52%]">
          <VideoPlayer />
        </div>

      </div>
    </section>
  );
}
