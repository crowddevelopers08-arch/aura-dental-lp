const LOCATIONS = ['Madinaguda', 'Kondapur', 'Hyderabad'];

/**
 * Slim footer — a VSL page keeps exits to a minimum.
 * Extra bottom padding clears the mobile sticky CTA bar.
 */
interface Props {
  /** Sub-pages have no sticky CTA bar, so they don't need the extra clearance. */
  hasStickyCta?: boolean;
  homeHref?: string;
}

export function VslFooter({ hasStickyCta = true, homeHref = '/vsl' }: Props = {}) {
  return (
    <footer
      className={`border-t border-[#1D4231]/15 bg-white px-4 pt-8 sm:px-6 md:px-[60px] md:pb-8 ${
        hasStickyCta ? 'pb-[104px]' : 'pb-8'
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">

        <a href={homeHref} className="flex-shrink-0" aria-label="Aura Dental">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910678/aura-logo_ozknpu.jpg"
            alt="Aura Dental"
            className="h-10 w-auto rounded-md object-contain"
          />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="material-symbols-outlined text-[17.5px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
            location_on
          </span>
          {LOCATIONS.map((loc, i) => (
            <span key={loc} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-[#D3BB71]" />}
              <span className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1D4231] sm:text-[13px]">
                {loc}
              </span>
            </span>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-5">
          <a
            href="/vsl/privacy-policy"
            className="font-body text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#1D4231]/60 transition-colors hover:text-[#1D4231]"
          >
            Privacy Policy
          </a>
          <p className="font-body font-medium text-[13.5px] text-[#000000]/45">© 2026 Aura Dental</p>
        </div>

      </div>
    </footer>
  );
}
