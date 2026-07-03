'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

type TestimonialReviewsSectionProps = {
  reviewsLabel?: string;
  ctaLabel?: string;
};

const REVIEWS = [
  { id: 1, name: 'Apurva',               treatment: 'Single Tooth Implant',      rating: 5, quote: 'The entire process was smooth and painless. My implant looks completely natural and I have full confidence in my smile now.' },
  { id: 2, name: 'Amardeep',             treatment: 'All-on-4 Implants',          rating: 5, quote: 'As a public figure, my smile matters a lot. Aura Dental delivered beyond expectations â€” world-class technology and care.' },
  { id: 3, name: 'Anil Allam',           treatment: 'Multiple Teeth Implants',    rating: 5, quote: 'I was nervous at first, but the team made me feel completely at ease. The results are amazing â€” just like natural teeth.' },
  { id: 4, name: 'Madhavi',              treatment: 'Full Mouth Restoration',      rating: 5, quote: 'After losing multiple teeth, I had given up hope. Aura Dental gave me a brand new smile. I feel 20 years younger!' },
  { id: 5, name: 'Vijay Prakash Sharma', treatment: 'Implant-Supported Dentures', rating: 5, quote: 'No more loose dentures â€” my implants are rock solid. Eating, speaking, everything feels natural. Highly recommend!' },
  { id: 6, name: 'Shreyas',              treatment: 'Single Tooth Implant',       rating: 5, quote: 'Quick, precise, and zero discomfort. The 3D scan before the procedure gave me complete confidence in the outcome.' },
];

// ─── Star rating ─────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="material-symbols-outlined text-[15px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
      ))}
    </div>
  );
}

// ─── Main section ───────────────────────────────────────────────────
export function TestimonialReviewsSection({
  reviewsLabel = 'What Our Patients Say',
  ctaLabel = 'Start Your Smile Journey',
}: TestimonialReviewsSectionProps = {}) {
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
    <section id="reviews" className="relative overflow-hidden bg-[#1D4231] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">

      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #D3BB71 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}
      />

      <div className="relative z-[1] mx-auto max-w-[1280px]">

        <AnimateOnScroll animation="fade-up">
          <h2 className="mb-8 text-center font-heading text-[22px] font-extrabold leading-[1.2] text-white sm:text-[26px] md:text-[28px] lg:text-[34px] xl:text-[36px] md:mb-10">
            {reviewsLabel}
          </h2>
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
                    <div className="flex items-center justify-between">
                      <Stars count={review.rating} />
                      <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google review">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <p className="mt-3 flex-1 font-body text-[13px] leading-[1.85] text-white/70 sm:text-[14px]">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#D3BB71]/20 font-body text-[14px] font-bold text-[#D3BB71]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body text-[14px] font-bold leading-tight text-white">{review.name}</p>
                        <p className="font-body text-[11px] leading-tight text-[#D3BB71]/65 sm:text-[12px]">{review.treatment}</p>
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
            <span className="material-symbols-outlined text-[22px]">chevron_left</span>
          </button>

          {/* Next */}
          <button
            onClick={goNextReview}
            aria-label="Next review"
            className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-md backdrop-blur-sm transition-all hover:bg-[#D3BB71] hover:text-[#1D4231] active:scale-95 max-lg:-translate-x-1 lg:translate-x-5"
          >
            <span className="material-symbols-outlined text-[22px]">chevron_right</span>
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
