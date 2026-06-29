'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const VIDEOS = [
  { id: 1,  name: 'Apurva',               url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735591/Apurva-Aura-Dental-Customer-feedback_aodvac.webm' },
  { id: 2,  name: 'Amardeep',             url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735548/Amardeep-Big-Boss-Celebrity-Aura-Dental-Customer-feedback_ardlt9.webm' },
  { id: 3,  name: 'Anil Allam',           url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735545/Anil-Allam-Aura-Dental-Customer-feedback_x3fxtl.webm' },
  { id: 4,  name: 'Madhavi',              url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735540/Madhavi-Aura-Dental-Customer-feedback_tnvoom.webm' },
  { id: 5,  name: 'Vijay Prakash Sharma', url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735523/Vijay-Prakash-Sharma-Aura-Dental-Customer-feedback_vwmjib.webm' },
  { id: 6,  name: 'Bhikshapati',          url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735514/Bhikshapati-Aura-Dental-Customer-feedback_pgg0zt.webm' },
  { id: 7,  name: 'Annapurna',            url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735511/Annapurna-Aura-Dental-Customer-feedback_ddw3ao.webm' },
  { id: 8,  name: 'Likith Sai',           url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735507/likith-Sai-Aura-Dental-Customer-feedback_nw3mdn.webm' },
  { id: 9,  name: 'Shreyas',              url: 'https://res.cloudinary.com/dvj4ktxgl/video/upload/v1782735507/Shreyas-Aura-Dental-Customer-feedback_lip7ed.webm' },
];

const REVIEWS = [
  { id: 1, name: 'Apurva',               treatment: 'Single Tooth Implant',      rating: 5, quote: 'The entire process was smooth and painless. My implant looks completely natural and I have full confidence in my smile now.' },
  { id: 2, name: 'Amardeep',             treatment: 'All-on-4 Implants',          rating: 5, quote: 'As a public figure, my smile matters a lot. Aura Dental delivered beyond expectations — world-class technology and care.' },
  { id: 3, name: 'Anil Allam',           treatment: 'Multiple Teeth Implants',    rating: 5, quote: 'I was nervous at first, but the team made me feel completely at ease. The results are amazing — just like natural teeth.' },
  { id: 4, name: 'Madhavi',              treatment: 'Full Mouth Restoration',      rating: 5, quote: 'After losing multiple teeth, I had given up hope. Aura Dental gave me a brand new smile. I feel 20 years younger!' },
  { id: 5, name: 'Vijay Prakash Sharma', treatment: 'Implant-Supported Dentures', rating: 5, quote: 'No more loose dentures — my implants are rock solid. Eating, speaking, everything feels natural. Highly recommend!' },
  { id: 6, name: 'Shreyas',              treatment: 'Single Tooth Implant',       rating: 5, quote: 'Quick, precise, and zero discomfort. The 3D scan before the procedure gave me complete confidence in the outcome.' },
];

// Cloudinary auto-generates a JPEG thumbnail when you swap the extension
const getPoster = (url: string) => url.replace(/\.webm$/, '.jpg');

// ─── Individual video card ────────────────────────────────────────────────────
interface VideoCardProps {
  video: (typeof VIDEOS)[0];
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

function VideoCard({ video, isPlaying, onPlay, onPause }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlaying && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); onPlay(); }
    else          { v.pause(); onPause(); }
  };

  return (
    <div className="relative h-[620px] w-full flex-shrink-0 overflow-hidden rounded-2xl bg-[#0a1f17] lg:h-[680px]">
      <video
        ref={videoRef}
        src={video.url}
        poster={getPoster(video.url)}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        preload="none"
        onEnded={onPause}
      />

      {/* Always-on bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Play overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center"
          onClick={toggle}
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-[#D3BB71]/25" />
            <button
              aria-label={`Play ${video.name}'s testimonial`}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D3BB71] shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-[30px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
                play_arrow
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Tap to pause */}
      {isPlaying && (
        <div className="absolute inset-0 cursor-pointer" onClick={toggle} />
      )}

      {/* Name badge */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#D3BB71] font-outfit text-[12px] font-bold text-[#1D4231]">
            {video.name.charAt(0)}
          </div>
          <div>
            <p className="font-outfit text-[13px] font-bold leading-tight text-white">{video.name}</p>
            <p className="font-outfit text-[10px] text-[#D3BB71]/80">Aura Dental Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="material-symbols-outlined text-[14px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
      ))}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function TestimonialVideoSection() {
  // ── Video carousel state ─────────────────────────────────────────────────
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

  // ── Reviews carousel state ───────────────────────────────────────────────
  const reviewTrackRef = useRef<HTMLDivElement>(null);
  const [reviewPage, setReviewPage] = useState(0);
  const [reviewItemsPerPage, setReviewItemsPerPage] = useState(3);
  const reviewTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalReviewPages = Math.ceil(REVIEWS.length / reviewItemsPerPage);

  useEffect(() => {
    const update = () => setReviewItemsPerPage(window.innerWidth >= 1024 ? 3 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const el = reviewTrackRef.current;
    if (!el) return;
    el.scrollTo({ left: reviewPage * el.offsetWidth, behavior: 'smooth' });
  }, [reviewPage]);

  useEffect(() => { setReviewPage(0); }, [reviewItemsPerPage]);

  const advanceReview = useCallback(() => {
    setReviewPage((p) => (p + 1) % totalReviewPages);
  }, [totalReviewPages]);

  const startReviewTimer = useCallback(() => {
    if (reviewTimerRef.current) clearInterval(reviewTimerRef.current);
    reviewTimerRef.current = setInterval(advanceReview, 3500);
  }, [advanceReview]);

  useEffect(() => {
    startReviewTimer();
    return () => { if (reviewTimerRef.current) clearInterval(reviewTimerRef.current); };
  }, [startReviewTimer]);

  const goToReview = (page: number) => { setReviewPage(page); startReviewTimer(); };
  const goPrevReview = () => goToReview((reviewPage - 1 + totalReviewPages) % totalReviewPages);
  const goNextReview = () => goToReview((reviewPage + 1) % totalReviewPages);

  return (
    <section className="relative overflow-hidden bg-[#1D4231] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">

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
            <span className="material-symbols-outlined text-[12px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>play_circle</span>
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D3BB71] sm:text-[11px]">Real Patient Stories</span>
          </span>
          <h2 className="mt-3 font-outfit text-[20px] font-extrabold leading-[1.2] text-white sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
            Smiles That Speak for Themselves
          </h2>
          <p className="mx-auto mt-2 max-w-[560px] font-outfit text-[12px] leading-[1.8] text-white/60 sm:text-[13px] md:text-[14px]">
            Hear directly from patients who transformed their confidence with dental implants at Aura Dental.
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
            <span className="material-symbols-outlined text-[22px] text-[#1D4231]">chevron_left</span>
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#D3BB71] shadow-lg transition-all hover:scale-105 active:scale-95 max-lg:-translate-x-1 lg:translate-x-5"
          >
            <span className="material-symbols-outlined text-[22px] text-[#1D4231]">chevron_right</span>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-5 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === currentPage ? '24px' : '8px',
                backgroundColor: i === currentPage ? '#D3BB71' : '#D3BB7140',
              }}
            />
          ))}
        </div>

        {/* ── Reviews carousel ── */}
        <div className="mt-10 md:mt-12">
          <AnimateOnScroll animation="fade-up">
            <p className="mb-6 text-center font-outfit text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D3BB71]/70 sm:text-[12px]">
              What Our Patients Say
            </p>
          </AnimateOnScroll>

          <div className="relative">
            {/* Track */}
            <div className="overflow-hidden">
              <div ref={reviewTrackRef} className="flex overflow-x-hidden lg:gap-4">
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="w-full flex-shrink-0 lg:w-[calc((100%-32px)/3)]"
                  >
                    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-5 md:p-6">
                      <Stars count={review.rating} />
                      <p className="mt-3 flex-1 font-outfit text-[12px] leading-[1.85] text-white/70 sm:text-[13px]">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                      <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#D3BB71]/20 font-outfit text-[13px] font-bold text-[#D3BB71]">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-outfit text-[13px] font-bold leading-tight text-white">{review.name}</p>
                          <p className="font-outfit text-[10px] leading-tight text-[#D3BB71]/65 sm:text-[11px]">{review.treatment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev */}
            <button
              onClick={goPrevReview}
              aria-label="Previous review"
              className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-md backdrop-blur-sm transition-all hover:bg-[#D3BB71] hover:text-[#1D4231] active:scale-95 max-lg:translate-x-1 lg:-translate-x-5"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>

            {/* Next */}
            <button
              onClick={goNextReview}
              aria-label="Next review"
              className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-md backdrop-blur-sm transition-all hover:bg-[#D3BB71] hover:text-[#1D4231] active:scale-95 max-lg:-translate-x-1 lg:translate-x-5"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>

          {/* Dots */}
          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: totalReviewPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToReview(i)}
                aria-label={`Review page ${i + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === reviewPage ? '24px' : '8px',
                  backgroundColor: i === reviewPage ? '#D3BB71' : '#D3BB7140',
                }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimateOnScroll animation="fade-up" delay={200} className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-outfit inline-flex items-center gap-2 rounded-full bg-[#D3BB71] px-8 py-3.5 text-[13px] font-bold text-[#1D4231] shadow-lg transition-opacity hover:opacity-90 sm:text-[14px] md:px-10"
          >
            Start Your Smile Journey
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
