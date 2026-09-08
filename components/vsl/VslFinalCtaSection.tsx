'use client';

import { useEffect, useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { VslCtaButton } from '@/components/vsl/VslCtaButton';
import { VslVideoPlayer } from '@/components/vsl/VslVideoPlayer';

const TRUST_POINTS = ['Professional guidance', 'Personalised planning', 'No pressure'];

export function VslFinalCtaSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVideoOpen(false); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [videoOpen]);

  return (
    <section
      className="relative overflow-hidden bg-[#1D4231] px-4 py-14 sm:px-6 md:px-[60px] md:py-20 lg:py-24"
      style={{
        // Painted as a real background rather than an <img> layer: no lazy-load,
        // no stacking order to get wrong. 100% 100% stretches the artwork to the
        // section instead of cropping its corner arcs away.
        backgroundImage: "url('/ban-vsl.png')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >

      <AnimateOnScroll animation="scale-in" className="relative z-[1] mx-auto max-w-[840px]">
        <div className="flex flex-col items-center text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#D3BB71] px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3BB71]" />
            <span className="font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[13px]">
              Before You Decide
            </span>
          </span>

          <h2 className="mt-5 font-heading text-[30px] font-extrabold leading-[1.14] text-white sm:text-[38px] md:text-[46px] lg:text-[52px]">
            Watch Before <span className="text-[#D3BB71]">You Choose</span>
          </h2>

          <p className="mt-4 max-w-[600px] font-body font-medium text-[15.5px] leading-[1.85] text-white/65 sm:text-[17px]">
            5 minutes could help you make a more informed decision about your dental implants.
          </p>

          {/* Actions */}
          <div className="mt-9 flex w-full flex-col items-center gap-3.5 sm:w-auto sm:flex-row sm:justify-center sm:gap-4">
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="font-body inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-[#D3BB71] px-7 py-3.5 text-[13.5px] font-bold uppercase tracking-[0.13em] text-[#D3BB71] transition-colors duration-200 hover:bg-[#D3BB71] hover:text-[#1D4231] sm:w-auto sm:px-9 sm:py-4 sm:text-[14.5px]"
            >
              <span className="material-symbols-outlined text-[20.5px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                play_arrow
              </span>
              Watch the Decision Guide
            </button>

            <VslCtaButton variant="gold" className="w-full sm:w-auto" />
          </div>

          {/* Trust line */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 border-t border-[#D3BB71]/15 pt-7 sm:gap-x-7">
            {TRUST_POINTS.map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[17.5px] text-[#D3BB71]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  check_circle
                </span>
                <span className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-white/70 sm:text-[14px]">
                  {point}
                </span>
              </span>
            ))}
          </div>

        </div>
      </AnimateOnScroll>

      {/* Video lightbox */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="The 5-minute dental implant decision guide"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full max-w-[960px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-[#1D4231]"
            >
              <span className="material-symbols-outlined text-[21.5px]">close</span>
            </button>
            <VslVideoPlayer autoPlayOnMount />
          </div>
        </div>
      )}

    </section>
  );
}
