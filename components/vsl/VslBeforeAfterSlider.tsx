'use client';

import { useCallback, useRef, useState } from 'react';

export interface BeforeAfterCase {
  id: string | number;
  /** Image shown on the left of the handle. */
  before: string;
  /** Image revealed on the right of the handle. */
  after: string;
  /** Short caption under the frame — e.g. the treatment performed. */
  caption?: string;
}

/**
 * Drag-to-reveal before/after comparison. Works with pointer, touch and
 * keyboard (arrow keys move the handle).
 */
export function VslBeforeAfterSlider({ item }: { item: BeforeAfterCase }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const moveTo = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <figure className="group">
      <div
        ref={frameRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-[#0a1f17] ring-1 ring-[#1D4231]/10"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging && moveTo(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.after} alt="After treatment" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />

        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.before}
            alt="Before treatment"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: frameRef.current ? `${frameRef.current.offsetWidth}px` : '100%', maxWidth: 'none' }}
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#0a1f17]/75 px-3 py-1 font-body text-[11.5px] font-bold uppercase tracking-[0.16em] text-white/85">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#D3BB71] px-3 py-1 font-body text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#1D4231]">
          After
        </span>

        {/* Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 4));
            if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 4));
          }}
          className="absolute inset-y-0 z-[2] w-1 -translate-x-1/2 cursor-ew-resize bg-[#D3BB71] outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#D3BB71] text-[#1D4231]">
            <span className="material-symbols-outlined text-[21.5px]">drag_indicator</span>
          </span>
        </div>
      </div>

      {item.caption && (
        <figcaption className="mt-3 text-center font-body text-[14px] font-semibold text-[#000000]/60 sm:text-[14.5px]">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
