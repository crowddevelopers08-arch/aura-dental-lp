'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

type TestimonialVideoSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
};

// YouTube Shorts — patient testimonials
const VIDEOS = [
  { id: 1, name: 'Patient Story 1', youtubeId: 'waPn3FoErCw' },
  { id: 2, name: 'Patient Story 2', youtubeId: '8SUBjT9T5po' },
  { id: 3, name: 'Patient Story 3', youtubeId: 'rGRRReOytq4' },
  { id: 4, name: 'Patient Story 4', youtubeId: 'lD8TdVaOj6Y' },
  { id: 5, name: 'Patient Story 5', youtubeId: 'Gwt-Z5a55S4' },
  { id: 6, name: 'Patient Story 6', youtubeId: 'NosEryxtEjs' },
  { id: 7, name: 'Patient Story 7', youtubeId: '_84y5thI760' },
  { id: 8, name: 'Patient Story 8', youtubeId: '8AoBZECAwEQ' },
];

// `oardefault` keeps the original 9:16 Shorts framing; `hqdefault` is the safe fallback
const getPoster = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/oardefault.jpg`;
const getPosterFallback = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

// ─── Individual video card ─────────────────────────────────────────
interface VideoCardProps {
  video: (typeof VIDEOS)[0];
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

function VideoCard({ video, isPlaying, onPlay, onPause }: VideoCardProps) {
  const [poster, setPoster] = useState(getPoster(video.youtubeId));

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl bg-[#0a1f17] sm:max-w-[320px] lg:h-[460px] lg:max-w-[300px]">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title={`${video.name} — Aura Dental patient testimonial`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={`${video.name} — Aura Dental patient testimonial`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setPoster(getPosterFallback(video.youtubeId))}
          />

          {/* Always-on bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Play overlay */}
          <div
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center"
            onClick={onPlay}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-[#D3BB71]/25" />
              <button
                aria-label={`Play ${video.name}`}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D3BB71] shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                <span className="material-symbols-outlined text-[32px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
                  play_arrow
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Close / stop playback */}
      {isPlaying && (
        <button
          onClick={onPause}
          aria-label={`Close ${video.name}`}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      )}
    </div>
  );
}

// ─── Main section ───────────────────────────────────────────────────
export function TestimonialVideoSection({
  eyebrow = 'Real Patient Stories',
  title = 'Smiles That Speak for Themselves',
  description = 'Hear directly from patients who transformed their confidence with dental implants at Aura Dental.',
  ctaLabel = 'Start Your Smile Journey',
}: TestimonialVideoSectionProps = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalPages = Math.ceil(VIDEOS.length / itemsPerPage);

  useEffect(() => {
    const update = () => setItemsPerPage(window.innerWidth >= 1024 ? 3 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: currentPage * el.offsetWidth, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => { setCurrentPage(0); }, [itemsPerPage]);

  const advance = useCallback(() => {
    if (playingId !== null) return;
    setCurrentPage((p) => (p + 1) % totalPages);
  }, [playingId, totalPages]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 4500);
  }, [advance]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (page: number) => { setCurrentPage(page); startTimer(); };
  const goPrev = () => goTo((currentPage - 1 + totalPages) % totalPages);
  const goNext = () => goTo((currentPage + 1) % totalPages);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#1D4231] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">

      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #D3BB71 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}
      />

      <div className="relative z-[1] mx-auto max-w-[1280px]">

        {/* Header */}
        <AnimateOnScroll animation="fade-down" className="mb-8 text-center md:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-3 py-1">
            <span className="material-symbols-outlined text-[13px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>play_circle</span>
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D3BB71] sm:text-[12px]">{eyebrow}</span>
          </span>
          <h2 className="mt-3 font-heading text-[22px] font-extrabold leading-[1.2] text-white sm:text-[26px] md:text-[28px] lg:text-[34px] xl:text-[36px]">
            {title}
          </h2>
          <p className="mx-auto mt-2 max-w-[560px] font-body text-[13px] leading-[1.8] text-white/60 sm:text-[14px] md:text-[15px]">
            {description}
          </p>
        </AnimateOnScroll>

        {/* ── Video carousel ── */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div ref={trackRef} className="flex overflow-x-hidden lg:gap-4">
              {VIDEOS.map((video) => (
                <div key={video.id} className="w-full flex-shrink-0 lg:w-[calc((100%-32px)/3)]">
                  <VideoCard
                    video={video}
                    isPlaying={playingId === video.id}
                    onPlay={() => setPlayingId(video.id)}
                    onPause={() => setPlayingId(null)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#D3BB71] shadow-lg transition-all hover:scale-105 active:scale-95 max-lg:translate-x-1 lg:-translate-x-5"
          >
            <span className="material-symbols-outlined text-[24px] text-[#1D4231]">chevron_left</span>
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#D3BB71] shadow-lg transition-all hover:scale-105 active:scale-95 max-lg:-translate-x-1 lg:translate-x-5"
          >
            <span className="material-symbols-outlined text-[24px] text-[#1D4231]">chevron_right</span>
          </button>
        </div>

        {/* CTA */}
        <AnimateOnScroll animation="fade-up" delay={200} className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-body inline-flex items-center gap-2 rounded-full bg-[#D3BB71] px-8 py-3.5 text-[14px] font-bold text-[#1D4231] shadow-lg transition-opacity hover:opacity-90 sm:text-[15px] md:px-10"
          >
            {ctaLabel}
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </a>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
