'use client';

import { useMemo, useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { VslBeforeAfterSlider, type BeforeAfterCase } from '@/components/vsl/VslBeforeAfterSlider';

// ─── Content ────────────────────────────────────────────────────────
const VIDEO_STORIES = [
  { id: 1, name: 'Patient Story 1', youtubeId: 'waPn3FoErCw' },
  { id: 2, name: 'Patient Story 2', youtubeId: '8SUBjT9T5po' },
  { id: 3, name: 'Patient Story 3', youtubeId: 'rGRRReOytq4' },
  { id: 4, name: 'Patient Story 4', youtubeId: 'lD8TdVaOj6Y' },
  { id: 5, name: 'Patient Story 5', youtubeId: 'Gwt-Z5a55S4' },
  { id: 6, name: 'Patient Story 6', youtubeId: 'NosEryxtEjs' },
  { id: 7, name: 'Patient Story 7', youtubeId: '_84y5thI760' },
  { id: 8, name: 'Patient Story 8', youtubeId: '8AoBZECAwEQ' },
];

const WRITTEN_STORIES = [
  { id: 1, name: 'Apurva', treatment: 'Single Tooth Implant', quote: 'The entire process was smooth and painless. My implant looks completely natural and I have full confidence in my smile now.' },
  { id: 2, name: 'Amardeep', treatment: 'All-on-4 Implants', quote: 'As a public figure, my smile matters a lot. Aura Dental delivered beyond expectations — world-class technology and care.' },
  { id: 3, name: 'Anil Allam', treatment: 'Multiple Teeth Implants', quote: 'I was nervous at first, but the team made me feel completely at ease. The results are amazing — just like natural teeth.' },
  { id: 4, name: 'Madhavi', treatment: 'Full Mouth Restoration', quote: 'After losing multiple teeth, I had given up hope. Aura Dental gave me a brand new smile. I feel 20 years younger!' },
  { id: 5, name: 'Vijay Prakash Sharma', treatment: 'Implant-Supported Dentures', quote: 'No more loose dentures — my implants are rock solid. Eating, speaking, everything feels natural. Highly recommend!' },
  { id: 6, name: 'Shreyas', treatment: 'Single Tooth Implant', quote: 'Quick, precise, and zero discomfort. The 3D scan before the procedure gave me complete confidence in the outcome.' },
];

/**
 * Before/after clinical photography. Add `{ id, before, after, caption }`
 * entries and the "Before & After" tab appears automatically.
 */
const BEFORE_AFTER_CASES: BeforeAfterCase[] = [];

const getPoster = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/oardefault.jpg`;
const getPosterFallback = (youtubeId: string) => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

// ─── Video card ─────────────────────────────────────────────────────
function StoryVideoCard({
  story,
  isPlaying,
  onPlay,
  onStop,
}: {
  story: (typeof VIDEO_STORIES)[number];
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}) {
  const [poster, setPoster] = useState(getPoster(story.youtubeId));

  return (
    <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-[#1D4231]/15 bg-[#0a1f17] transition-colors duration-300 hover:border-[#D3BB71]">
      {isPlaying ? (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${story.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
            title={`${story.name} — Aura Dental patient testimonial`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <button
            onClick={onStop}
            aria-label={`Close ${story.name}`}
            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <span className="material-symbols-outlined text-[19.5px]">close</span>
          </button>
        </>
      ) : (
        <button type="button" onClick={onPlay} aria-label={`Play ${story.name}`} className="absolute inset-0 h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={`${story.name} — Aura Dental patient testimonial`}
            loading="lazy"
            onError={() => setPoster(getPosterFallback(story.youtubeId))}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-14 bg-[#0a1f17]/75" />
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D3BB71] transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
            <span className="material-symbols-outlined text-[28px] text-[#1D4231] sm:text-[32px]" style={{ fontVariationSettings: '"FILL" 1' }}>
              play_arrow
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 p-3">
            <span className="material-symbols-outlined text-[15.5px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
              verified
            </span>
            <span className="font-body text-[12px] font-bold uppercase tracking-[0.14em] text-white/85 sm:text-[12.5px]">
              Patient Story
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

// ─── Section ────────────────────────────────────────────────────────
type Tab = 'video' | 'written' | 'before-after';

export function VslPatientStoriesSection() {
  const tabs = useMemo(() => {
    const list: { key: Tab; label: string; icon: string }[] = [
      { key: 'video', label: 'Video Testimonials', icon: 'play_circle' },
      { key: 'written', label: 'Patient Testimonials', icon: 'format_quote' },
    ];
    if (BEFORE_AFTER_CASES.length) {
      list.splice(1, 0, { key: 'before-after', label: 'Before & After', icon: 'compare' });
    }
    return list;
  }, []);

  const [tab, setTab] = useState<Tab>('video');
  const [expanded, setExpanded] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const videos = expanded ? VIDEO_STORIES : VIDEO_STORIES.slice(0, 4);
  const written = expanded ? WRITTEN_STORIES : WRITTEN_STORIES.slice(0, 3);
  const cases = expanded ? BEFORE_AFTER_CASES : BEFORE_AFTER_CASES.slice(0, 2);

  const hasMore =
    (tab === 'video' && videos.length < VIDEO_STORIES.length) ||
    (tab === 'written' && written.length < WRITTEN_STORIES.length) ||
    (tab === 'before-after' && cases.length < BEFORE_AFTER_CASES.length);

  return (
    <section id="stories" className="bg-white px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px]">

        {/* Heading */}
        <AnimateOnScroll animation="fade-down" className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/25 bg-[#DDD5CA]/60 px-3 py-1">
            <span className="material-symbols-outlined text-[14.5px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
              favorite
            </span>
            <span className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1D4231] sm:text-[13px]">
              Patient Stories
            </span>
          </span>

          <h2 className="mt-4 font-heading text-[28px] font-extrabold leading-[1.15] text-[#000000] sm:text-[34px] md:text-[40px] lg:text-[44px]">
            Real Patients. <span className="text-[#1D4231]">Real Smiles.</span>
          </h2>
        </AnimateOnScroll>

        {/* Tabs */}
        <AnimateOnScroll animation="fade-up" delay={100} className="mt-7 flex justify-center md:mt-9">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-[#1D4231]/12 bg-[#DDD5CA]/45 p-1.5">
            {tabs.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => { setTab(t.key); setPlayingId(null); }}
                  aria-pressed={active}
                  className={`font-body inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 sm:px-6 sm:text-[14px] ${
                    active
                      ? 'bg-[#1D4231] text-white'
                      : 'text-[#1D4231]/60 hover:bg-white hover:text-[#1D4231]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17.5px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </AnimateOnScroll>

        {/* Panels */}
        <div className="mt-8 md:mt-10">
          {tab === 'video' && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {videos.map((story, i) => (
                <AnimateOnScroll key={story.id} animation="fade-up" delay={i * 60}>
                  <StoryVideoCard
                    story={story}
                    isPlaying={playingId === story.id}
                    onPlay={() => setPlayingId(story.id)}
                    onStop={() => setPlayingId(null)}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          )}

          {tab === 'before-after' && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((item, i) => (
                <AnimateOnScroll key={item.id} animation="fade-up" delay={i * 70}>
                  <VslBeforeAfterSlider item={item} />
                </AnimateOnScroll>
              ))}
            </div>
          )}

          {tab === 'written' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {written.map((review, i) => (
                <AnimateOnScroll key={review.id} animation="fade-up" delay={i * 70} className="h-full">
                  <figure className="flex h-full flex-col rounded-2xl border border-[#1D4231]/15 bg-[#DDD5CA]/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D3BB71] hover:bg-white sm:p-6">
                    <span className="material-symbols-outlined text-[28px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                      format_quote
                    </span>
                    <blockquote className="mt-2 flex-1 font-body font-medium text-[15px] leading-[1.85] text-[#000000]/70 sm:text-[15.5px]">
                      {review.quote}
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-[#1D4231]/10 pt-4">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1D4231] font-body text-[16.5px] font-bold text-[#D3BB71]">
                        {review.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block font-body text-[15.5px] font-bold leading-tight text-[#1D4231]">{review.name}</span>
                        <span className="block font-body font-medium text-[13px] leading-tight text-[#000000]/45">{review.treatment}</span>
                      </span>
                    </figcaption>
                  </figure>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>

        {/* See more */}
        {hasMore && (
          <div className="mt-8 flex justify-center md:mt-10">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="font-body inline-flex items-center gap-2 rounded-full border-2 border-[#1D4231] px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.13em] text-[#1D4231] transition-colors duration-200 hover:bg-[#1D4231] hover:text-white sm:px-9 sm:text-[14px]"
            >
              See More Patient Stories
              <span className="material-symbols-outlined text-[18.5px]">expand_more</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
