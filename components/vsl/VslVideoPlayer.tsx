'use client';

import { useCallback, useRef, useState } from 'react';

/** The `#t=2` fragment makes the browser show the frame at 2s as the poster. */
const VIDEO_SRC = '/herovideo_suvswc.mp4#t=2';

interface Props {
  /** Accessible name for the play button and the embed. */
  playLabel?: string;
  /** Small chip in the top corner — e.g. the runtime. */
  badge?: string;
  className?: string;
  autoPlayOnMount?: boolean;
  /** When set, the YouTube video is embedded instead of the Cloudinary file. */
  youtubeId?: string;
}

export function VslVideoPlayer({
  playLabel = 'Watch the 5-Minute Decision Guide',
  badge = '5 Min Watch',
  className = '',
  autoPlayOnMount = false,
  youtubeId,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(autoPlayOnMount);

  const start = useCallback(() => {
    setStarted(true);
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    void v.play().catch(() => {
      // Autoplay with sound can be blocked — fall back to muted playback.
      v.muted = true;
      void v.play();
    });
  }, []);

  const youtubeSrc = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1${
        autoPlayOnMount ? '&mute=1' : ''
      }`
    : null;

  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-[1.25rem] border-2 border-[#D3BB71] bg-black sm:rounded-[1.75rem]">
        {youtubeId ? (
          started ? (
            <iframe
              className="aspect-video w-full bg-black"
              src={youtubeSrc ?? ''}
              title={playLabel}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
              alt=""
              className="aspect-video w-full bg-black object-cover"
              loading="lazy"
            />
          )
        ) : (
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            preload="metadata"
            playsInline
            controls={started}
            autoPlay={autoPlayOnMount}
            muted={autoPlayOnMount}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        )}

        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={playLabel}
            className="group absolute inset-0 flex cursor-pointer items-center justify-center"
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
