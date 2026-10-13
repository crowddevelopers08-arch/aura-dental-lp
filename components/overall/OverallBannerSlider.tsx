'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Slide = { src: string; alt: string };

interface Props {
  slides: Slide[];
  // Tailwind aspect class matching the artwork, e.g. "aspect-[8/3]".
  aspectClassName: string;
  sizes: string;
  className?: string;
  interval?: number;
}

export function OverallBannerSlider({ slides, aspectClassName, sizes, className = '', interval = 4500 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => goTo(index + 1), interval);
    return () => window.clearTimeout(id);
  }, [index, paused, count, interval, goTo]);

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] bg-[#1D4231] ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        setPaused(false);
        if (start === null) return;
        const delta = e.changedTouches[0].clientX - start;
        if (Math.abs(delta) > 40) goTo(index + (delta < 0 ? 1 : -1));
      }}
      aria-roledescription="carousel"
    >
      <div
        className={`flex transition-transform duration-700 ease-out motion-reduce:transition-none ${aspectClassName}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="relative h-full w-full flex-shrink-0"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes={sizes}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1D4231] opacity-0 shadow-md transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 md:flex"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1D4231] opacity-0 shadow-md transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 md:flex"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </>
      )}
    </div>
  );
}
