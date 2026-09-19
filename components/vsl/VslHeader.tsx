import { VslCtaButton } from '@/components/vsl/VslCtaButton';

/**
 * Deliberately minimal for a VSL page — no navigation to leak attention,
 * just the brand mark and the single conversion action.
 */
interface Props {
  /** Sub-pages link back to the VSL page instead of scrolling to the form. */
  ctaHref?: string;
  ctaLabel?: string;
  homeHref?: string;
}

export function VslHeader({ ctaHref, ctaLabel, homeHref = '/vsl' }: Props = {}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1D4231]/15 bg-white">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 md:px-[60px] md:py-3">
        <a href={homeHref} className="flex-shrink-0" aria-label="Aura Dental">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/aura-logo_ozknpu.jpg"
            alt="Aura Dental"
            className="h-9 w-auto rounded-md object-contain md:h-11"
          />
        </a>

        <div className="flex items-center gap-3">
          {/* <span className="font-body hidden items-center gap-2 text-[13.5px] font-bold uppercase tracking-[0.16em] text-[#1D4231] lg:inline-flex">
            <span className="material-symbols-outlined text-[17.5px]" style={{ fontVariationSettings: '"FILL" 1' }}>
              verified
            </span>
            12+ Years · Hyderabad
          </span> */}

          <VslCtaButton
            variant="green"
            href={ctaHref}
            label={ctaLabel}
            trailingIcon={null}
            className="!px-4 !py-2.5 !text-[11.5px] sm:!px-6 sm:!py-3 sm:!text-[13px]"
          />
        </div>
      </div>
    </header>
  );
}
