'use client';

import { useRef, useState, useCallback } from 'react';

const TRUST_BADGES = [
  { icon: 'star',          text: '5,000+ Happy Smiles Transformed' },
  { icon: 'dentistry',     text: '10,000+ Successful Dental Implants' },
  { icon: 'verified_user', text: 'Experienced Implantologist & Prosthodontist' },
  { icon: 'local_hospital', text: 'Highly Equipped Dental Clinic' },
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
        <source src="https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782909161/herovideo_suvswc.mp4" type="video/mp4" />
      </video>

      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D3BB71]/20 text-[#D3BB71] backdrop-blur-sm transition hover:bg-[#D3BB71]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3BB71]"
        >
          <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            {playing ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D3BB71]/20 text-[#D3BB71] backdrop-blur-sm transition hover:bg-[#D3BB71]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3BB71]"
        >
          <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: '"FILL" 1' }}>
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

        {/* LEFT â€“ headline + badges */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

          {/* Eyebrow */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D3BB71]/30 bg-[#D3BB71]/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D3BB71]" />
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[12px]">
              Hyderabad&apos;s Advanced Dental Implant Centre
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-[28px] font-extrabold leading-[1.18] text-white sm:text-[32px] md:text-[36px] lg:text-[32px] xl:text-[38px] 2xl:text-[46px]">
            Hyderabad&apos;s Best Dental Clinic for{' '}
            <span className="text-[#D3BB71]">Advanced Dental Implant</span>{' '}
            Treatment
          </h1>

          {/* Mobile video */}
          <div className="mt-5 w-full lg:hidden">
            <VideoPlayer />
          </div>

          {/* Subheadline */}
          <p className="mt-4 max-w-[560px] font-body text-[14px] leading-[1.8] text-white sm:text-[15px] lg:max-w-none xl:text-[16px]">
            Restore your smile with permanent, natural-looking dental implants at Aura Dental. Our experienced implant specialists combine advanced technology with personalized care to deliver safe, precise, and long-lasting results.
          </p>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2.5">
                <span
                  className="material-symbols-outlined flex-shrink-0 text-[19px] text-[#D3BB71]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  {badge.icon}
                </span>
                <span className="font-body text-[13px] font-medium text-white/80 sm:text-[14px]">
                  {badge.text}
                </span>
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
                <span className="ml-1 font-body text-[16px] font-bold text-white">4.9</span>
              </div>
              <span className="font-body text-[14px] font-medium text-white/70">500+ Google Reviews</span>
            </div>

            {/* Call CTA */}
            <a
              href="tel:+917842474433"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-6 py-2.5 font-body text-[14px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[15px]"
            >
              <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
              Call Now to Book Appointment
            </a>
          </div>
        </div>

        {/* RIGHT â€“ desktop video */}
        <div className="hidden w-full flex-shrink-0 lg:block lg:w-[50%] xl:w-[52%]">
          <VideoPlayer />
        </div>

      </div>
    </section>
  );
}
