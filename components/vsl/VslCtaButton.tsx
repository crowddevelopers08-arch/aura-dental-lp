'use client';

/**
 * Shared CTA for the VSL page.
 *
 * Every "Reserve my smile assessment" button on the page points at the same
 * destination: the self-check panel. It scrolls there and leaves the panel on
 * whatever step it is showing, so visitors always start the quiz at step 1.
 */

export const RESERVE_ANCHOR = 'reserve';

export function scrollToReserve() {
  if (typeof window === 'undefined') return;
  document.getElementById(RESERVE_ANCHOR)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

type Variant = 'gold' | 'green' | 'outline-gold' | 'outline-green';

/**
 * Flat colour only — hover swaps between the two brand colours rather than
 * shading or fading the button.
 */
const VARIANTS: Record<Variant, string> = {
  gold: 'bg-[#D3BB71] text-[#1D4231] hover:bg-[#1D4231] hover:text-[#D3BB71]',
  green: 'bg-[#1D4231] text-white hover:bg-[#D3BB71] hover:text-[#1D4231]',
  'outline-gold': 'border-2 border-[#D3BB71] bg-transparent text-[#D3BB71] hover:bg-[#D3BB71] hover:text-[#1D4231]',
  'outline-green': 'border-2 border-[#1D4231] bg-transparent text-[#1D4231] hover:bg-[#1D4231] hover:text-white',
};

/** Glow tint per variant — green buttons pulse green, gold buttons gold. */
const GLOW: Record<Variant, string> = {
  gold: 'vsl-glow-btn',
  green: 'vsl-glow-btn vsl-glow-btn-green',
  'outline-gold': 'vsl-glow-btn',
  'outline-green': 'vsl-glow-btn vsl-glow-btn-green',
};

interface Props {
  label?: string;
  variant?: Variant;
  leadingIcon?: string;
  trailingIcon?: string | null;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  /** Renders a link instead of the scroll-to-form button — for VSL sub-pages. */
  href?: string;
  /** Shrinking glow pulse. Defaults on for solid variants, off for outlines. */
  glow?: boolean;
}

export function VslCtaButton({
  label = 'Reserve My Smile Assessment',
  variant = 'gold',
  leadingIcon,
  trailingIcon = 'arrow_forward',
  className = '',
  onClick,
  fullWidth = false,
  href,
  glow,
}: Props) {
  const showGlow = glow ?? (variant === 'gold' || variant === 'green');

  const classes = `font-body inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13.5px] font-bold uppercase tracking-[0.13em] transition-colors duration-200 sm:px-9 sm:py-4 sm:text-[14.5px] ${VARIANTS[variant]} ${showGlow ? GLOW[variant] : ''} ${fullWidth ? 'w-full' : ''} ${className}`;

  const content = (
    <>
      {leadingIcon && (
        <span className="material-symbols-outlined text-[20.5px]" style={{ fontVariationSettings: '"FILL" 1' }}>
          {leadingIcon}
        </span>
      )}
      {label}
      {trailingIcon && <span className="material-symbols-outlined text-[18.5px]">{trailingIcon}</span>}
    </>
  );

  if (href) {
    return <a href={href} className={classes}>{content}</a>;
  }

  return (
    <button type="button" onClick={onClick ?? scrollToReserve} className={classes}>
      {content}
    </button>
  );
}

/** "Secure payment via Razorpay · Pick your appointment slot right after" */
export function VslPaymentNote({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const color = tone === 'light' ? 'text-white/55' : 'text-[#000000]/45';
  const accent = tone === 'light' ? 'text-[#D3BB71]' : 'text-[#1D4231]';

  return (
    <p className={`font-body font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[12.5px] leading-[1.6] sm:text-[13.5px] ${color}`}>
      <span className={`material-symbols-outlined text-[16.5px] ${accent}`} style={{ fontVariationSettings: '"FILL" 1' }}>
        lock
      </span>
      Secure payment via Razorpay
      <span className={accent}>·</span>
      Pick your appointment slot right after
    </p>
  );
}
