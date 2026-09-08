'use client';

import { useCallback, useRef, useState } from 'react';

const VIDEO_SRC = 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782909161/herovideo_suvswc.mp4';
/** Cloudinary renders a still from the same asset when the extension is swapped. */
const VIDEO_POSTER = 'https://res.cloudinary.com/dvj4ktxgl/video/upload/so_2/v1782909161/herovideo_suvswc.jpg';

interface Props {
  /** Overlay label shown on the poster, before playback starts. */
  playLabel?: string;
  /** Small chip in the top corner — e.g. the runtime. */
  badge?: string;
  className?: string;
  autoPlayOnMount?: boolean;
}

export function VslVideoPlayer({
  playLabel = 'Watch the 5-Minute Decision Guide',
  badge = '5 Min Watch',
  className = '',
  autoPlayOnMount = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(autoPlayOnMount);

  const start = useCallback(() => {
    setStarted(true);
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    void v.play().catch(() => {
      // Autoplay with sound can be blocked — fall back to muted playback.
      v.muted = true;
      void v.play();
    });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-[1.25rem] border-2 border-[#D3BB71] bg-black sm:rounded-[1.75rem]">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black object-cover"
          poster={VIDEO_POSTER}
          preload="metadata"
          playsInline
          controls={started}
          autoPlay={autoPlayOnMount}
          muted={autoPlayOnMount}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={playLabel}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 px-4 text-center sm:gap-5"
          >
            <span className="relative flex items-center justify-center">
              <span aria-hidden className="vsl-pulse-ring absolute h-16 w-16 rounded-full border-2 border-[#D3BB71] sm:h-20 sm:w-20" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D3BB71] transition-transform duration-300 group-hover:scale-110 sm:h-[68px] sm:w-[68px]">
                <span
                  className="material-symbols-outlined ml-0.5 text-[32px] text-[#1D4231] sm:text-[38px]"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  play_arrow
                </span>
              </span>
            </span>

            {/* Solid pill keeps the label readable now that the scrim is gone */}
            <span className="font-body max-w-[440px] rounded-full bg-[#1D4231] px-5 py-2.5 text-[12.5px] font-bold uppercase leading-[1.5] tracking-[0.16em] text-[#D3BB71] sm:px-6 sm:text-[14.5px]">
              {playLabel}
            </span>
          </button>
        )}

        {/* Runtime chip */}
        {!started && badge && (
          <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#1D4231] px-3 py-1 sm:left-5 sm:top-5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3BB71]" />
            <span className="font-body text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#D3BB71] sm:text-[12.5px]">
              {badge}
            </span>
          </span>
        )}
      </div>

      {/* Gold corner brackets */}
      <span aria-hidden className="pointer-events-none absolute -left-1.5 -top-1.5 h-8 w-8 rounded-tl-[1.25rem] border-l-2 border-t-2 border-[#D3BB71]/70 sm:-left-3 sm:-top-3 sm:h-14 sm:w-14 sm:rounded-tl-[1.75rem]" />
      <span aria-hidden className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-8 w-8 rounded-br-[1.25rem] border-b-2 border-r-2 border-[#D3BB71]/70 sm:-bottom-3 sm:-right-3 sm:h-14 sm:w-14 sm:rounded-br-[1.75rem]" />
    </div>
  );
}
