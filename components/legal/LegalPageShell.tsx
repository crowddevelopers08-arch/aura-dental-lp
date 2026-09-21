import Link from 'next/link';

/** Every legal page lives under the same three routes, scoped to its funnel. */
const LEGAL_LINKS = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  { label: 'Cancellation & Refund', path: '/cancellation-and-refund' },
];

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#1D4231]/10 bg-white p-4 shadow-sm sm:p-5 md:p-6">
      <h2 className="mb-3 font-heading text-[15px] font-bold leading-[1.3] text-[#1D4231] sm:text-[17px] md:mb-4 md:text-[19px]">
        {title}
      </h2>
      <div className="space-y-2.5 break-words font-body text-[13px] leading-[1.8] text-[#000000]/65 sm:text-[14px] md:text-[15px] [&_a]:break-all [&_a]:font-semibold [&_a]:text-[#1D4231] [&_a]:hover:underline [&_strong]:font-semibold [&_strong]:text-[#000000] [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-4 [&_ul]:marker:text-[#D3BB71] sm:[&_ul]:space-y-2 sm:[&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}

export function LegalContactCard() {
  return (
    <div className="mt-3 overflow-hidden rounded-xl bg-[#1D4231]/5 p-4 sm:p-5">
      <p className="mb-1 font-body text-[14px] font-bold text-[#1D4231] sm:text-[15px]">Aura Dental</p>
      <p className="font-body text-[13px] text-[#000000]/60 sm:text-[14px]">Madeenaguda &amp; Kondapur, Hyderabad, Telangana</p>
      <div className="mt-2 flex flex-col gap-1.5">
        <a href="tel:+917842871414" className="font-body text-[13px] font-semibold text-[#1D4231] hover:underline sm:text-[14px]">+91 78428 71414</a>
        <a href="tel:+919963262774" className="font-body text-[13px] font-semibold text-[#1D4231] hover:underline sm:text-[14px]">+91 99632 62774</a>
        <a href="mailto:auradentalclinics1@gmail.com" className="break-all font-body text-[13px] font-semibold text-[#1D4231] hover:underline sm:text-[14px]">auradentalclinics1@gmail.com</a>
      </div>
    </div>
  );
}

/**
 * Sibling legal links for the slim footer on legal pages.
 * `basePath` scopes them to the funnel ('' for the root pages, '/vsl', etc.);
 * `currentPath` drops the page you are already on.
 */
export function LegalFooterLinks({ basePath = '', currentPath }: { basePath?: string; currentPath?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {LEGAL_LINKS.filter((link) => link.path !== currentPath).map((link) => (
        <Link
          key={link.path}
          href={`${basePath}${link.path}`}
          className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1D4231]/60 transition-colors hover:text-[#1D4231]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

type LegalPageShellProps = {
  /** Logo link — the funnel's landing page. */
  homeHref: string;
  /** Route prefix for the sibling legal links ('' for the root pages). */
  basePath?: string;
  /** Route of this page, so it is excluded from the footer links. */
  currentPath?: string;
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
};

export function LegalPageShell({
  homeHref,
  basePath = '',
  currentPath,
  title,
  lastUpdated,
  intro,
  backHref,
  backLabel,
  children,
}: LegalPageShellProps) {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden bg-[#f9f7f4]">
      <header className="sticky top-0 z-50 w-full border-b border-[#1D4231]/10 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-[60px]">
          <Link href={homeHref}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Aura Dental"
              className="h-9 w-auto object-contain sm:h-11 md:h-12"
              src="/images/aura-logo_ozknpu.jpg"
            />
          </Link>
          <a
            href="tel:+917842474433"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1D4231] px-3.5 py-2 font-body text-[12px] font-semibold text-white transition-opacity hover:opacity-90 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[14px]"
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
            <span className="hidden xs:inline">Call Now</span>
            <span className="xs:hidden">Call</span>
          </a>
        </div>
      </header>

      <div className="bg-[#1D4231] px-4 py-8 sm:px-6 sm:py-10 md:px-[60px] md:py-14">
        <div className="mx-auto max-w-[800px]">
          <p className="mb-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[12px]">Legal</p>
          <h1 className="font-heading text-[28px] font-extrabold leading-[1.2] text-white sm:text-[34px] md:text-[46px]">
            {title}
          </h1>
          <p className="mt-2 font-body text-[13px] leading-[1.6] text-white/50 sm:text-[14px]">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      <section className="flex-1 px-3 py-8 sm:px-6 sm:py-10 md:px-[60px] md:py-12">
        <div className="mx-auto w-full max-w-[800px]">
          <div className="mb-8 rounded-xl border border-[#1D4231]/10 bg-white p-4 shadow-sm sm:p-6 md:mb-10 md:p-8">
            <div className="space-y-3 font-body text-[14px] leading-[1.8] text-[#000000]/65 sm:text-[15px] md:text-[16px] [&_strong]:font-semibold [&_strong]:text-[#000000]">
              {intro}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 md:space-y-10">{children}</div>

          <div className="mt-10 border-t border-[#1D4231]/10 pt-7 sm:mt-12 md:mt-14">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 font-body text-[13px] font-semibold text-[#1D4231] hover:underline sm:text-[14px]"
            >
              <span className="material-symbols-outlined text-[17px]">arrow_back</span>
              {backLabel}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1D4231]/10 bg-white px-4 py-5 sm:px-6 md:px-[60px]">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-3">
          <LegalFooterLinks basePath={basePath} currentPath={currentPath} />
          <p className="font-body text-[12px] text-[#000000]/40 sm:text-[13px]">
            © 2026 Aura Dental. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
