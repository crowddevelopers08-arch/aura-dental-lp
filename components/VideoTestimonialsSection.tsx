'use client';

import { useRef, useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { VIDEOS } from '@/components/TestimonialVideoSection';

// `oardefault` keeps the original 9:16 Shorts framing; `hqdefault` is the safe fallback
const getPoster = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/oardefault.jpg`;
const getPosterFallback = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

function VideoTile({
  video,
  isPlaying,
  onPlay,
  onClose,
}: {
  video: (typeof VIDEOS)[number];
  isPlaying: boolean;
  onPlay: () => void;
  onClose: () => void;
}) {
  const [poster, setPoster] = useState(getPoster(video.youtubeId));

  return (
    <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-[#0a1f17] shadow-[0_12px_30px_rgba(29,66,49,.18)] ring-1 ring-[#1D4231]/10">
      {isPlaying ? (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
            title={`${video.name} — Aura Dental patient testimonial`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <button
            onClick={onClose}
            aria-label={`Close ${video.name}`}
            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </>
      ) : (
        <button type="button" onClick={onPlay} aria-label={`Play ${video.name}`} className="absolute inset-0 h-full w-full text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={`${video.name} — Aura Dental patient testimonial`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setPoster(getPosterFallback(video.youtubeId))}
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1f17]/90 via-transparent to-transparent" />

          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D3BB71] shadow-[0_0_0_8px_rgba(211,187,113,.28)] transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[32px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
              play_arrow
            </span>
          </span>

          <span className="absolute inset-x-0 bottom-0 p-4">
            <span className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="material-symbols-outlined text-[14px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  star
                </span>
              ))}
            </span>
            <span className="mt-1 block font-body text-[14px] font-semibold text-white">{video.name}</span>
            <span className="block font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D3BB71]">Dental Implant</span>
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoTestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-tile]');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="video-testimonials" className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <AnimateOnScroll animation="fade-down" className="mb-8 flex flex-col items-center gap-5 text-center md:mb-10 md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            {/* <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/20 bg-[#1D4231]/[.06] px-3 py-1">
              <span className="material-symbols-outlined text-[13px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
                videocam
              </span>
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[12px]">
                Video Testimonials
              </span>
            </span> */}
            <h2 className="mt-3 font-heading text-[22px] font-extrabold leading-[1.2] text-[#1D4231] sm:text-[26px] md:text-[28px] lg:text-[34px] xl:text-[36px]">
              Hear It From <span className="text-[#B0913F]">Our Patients</span>
            </h2>
            <p className="mt-2 max-w-[520px] font-body text-[13px] leading-[1.8] text-[#000000]/60 sm:text-[14px] md:text-[15px]">
              Real people sharing their dental implant journey and life after treatment at Aura Dental.
            </p>
          </div>

          <div className="hidden gap-3 md:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous videos"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1D4231]/20 bg-white text-[#1D4231] transition-colors hover:border-[#1D4231] hover:bg-[#1D4231] hover:text-[#D3BB71]"
            >
              <span className="material-symbols-outlined text-[24px]">chevron_left</span>
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next videos"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1D4231]/20 bg-white text-[#1D4231] transition-colors hover:border-[#1D4231] hover:bg-[#1D4231] hover:text-[#D3BB71]"
            >
              <span className="material-symbols-outlined text-[24px]">chevron_right</span>
            </button>
          </div>
        </AnimateOnScroll>

        {/* Scrollable row */}
        <div
          ref={trackRef}
          className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              data-tile
              className="w-[62%] flex-shrink-0 snap-start sm:w-[40%] md:w-[calc((100%-40px)/3)] lg:w-[calc((100%-60px)/4)]"
            >
              <VideoTile
                video={video}
                isPlaying={playingId === video.id}
                onPlay={() => setPlayingId(video.id)}
                onClose={() => setPlayingId(null)}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <AnimateOnScroll animation="fade-up" delay={150} className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-body inline-flex items-center gap-2 rounded-full bg-[#1D4231] px-8 py-3.5 text-[14px] font-bold text-white shadow-lg transition-colors hover:bg-[#D3BB71] hover:text-[#1D4231] sm:text-[15px] md:px-10"
          >
            Book Your Consultation
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
