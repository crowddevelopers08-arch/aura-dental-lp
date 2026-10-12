'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  // e.g. "12+", "5,000+", "10,000+" — the number counts up, any prefix/suffix stays as-is.
  value: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, duration = 1800, className = '' }: Props) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = match ? Number(match[2].replace(/,/g, '')) : 0;
  const suffix = match?.[3] ?? '';

  const ref = useRef<HTMLSpanElement>(null);
  // Server render shows the final value; the client resets to 0 until the number scrolls into view.
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setCurrent(0);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out
          setCurrent(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {current.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
