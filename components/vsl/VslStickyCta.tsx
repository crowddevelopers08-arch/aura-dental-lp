'use client';

import { useEffect, useState } from 'react';
import { VslCtaButton } from '@/components/vsl/VslCtaButton';

/**
 * Mobile-only conversion bar. Appears once the hero video has scrolled away
 * and hides again while the assessment form itself is on screen.
 */
export function VslStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#D3BB71] bg-[#1D4231] px-4 pb-3 pt-2.5 transition-transform duration-500 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <VslCtaButton variant="gold" fullWidth trailingIcon="arrow_forward" className="!py-3.5" />
      <p className="mt-1.5 flex items-center justify-center gap-1.5 font-body font-medium text-[11px] leading-tight text-white/45">
        <span className="material-symbols-outlined text-[13.5px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
          lock
        </span>
        Secure payment via Razorpay · Pick your appointment slot right after
      </p>
    </div>
  );
}
