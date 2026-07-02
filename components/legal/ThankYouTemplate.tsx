import Link from 'next/link';
import Script from 'next/script';

type ThankYouStep = {
  icon: string;
  title: string;
  desc: string;
  iconBg: string;
};

type ThankYouTemplateProps = {
  homeHref: string;
  backHref: string;
  backLabel: string;
  callHref: string;
  whatsappHref: string;
  eyebrow: string;
  message: string;
  steps: ThankYouStep[];
};

export function ThankYouTemplate({
  homeHref,
  backHref,
  backLabel,
  callHref,
  whatsappHref,
  eyebrow,
  message,
  steps,
}: ThankYouTemplateProps) {
  return (
    <main className="min-h-screen flex flex-col bg-[#ffffff]">
      <header className="w-full border-b border-[#1D4231]/10 bg-[#fffffff2] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 md:px-[80px] md:py-5">
          <Link href={homeHref}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Aura Dental Logo"
              className="h-12 w-auto object-contain md:h-14"
              src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910678/aura-logo_ozknpu.jpg"
            />
          </Link>
          <a
            href={callHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#1D4231] px-4 py-2 font-body text-[12px] font-semibold text-white transition-colors hover:bg-[#1D4231] sm:px-5 sm:py-2.5 sm:text-[13px]"
          >
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
            Call Now
          </a>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 md:px-[80px] max-[470px]:py-6 lg:py-10">
        <div className="mx-auto w-full max-w-[640px] text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#1D4231]/10 md:h-24 md:w-24">
            <span
              className="material-symbols-outlined text-[44px] text-[#1D4231] md:text-[52px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          </div>

          <h1 className="font-heading text-[32px] font-extrabold leading-[1.2] text-[#1A1A1A] sm:text-[40px] md:text-[48px]">
            You&apos;re All Set!
          </h1>
          <p className="mt-3 font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D3BB71]">
            {eyebrow}
          </p>

          <p className="mt-5 font-body text-[16px] leading-[1.8] text-[#000000]/70 md:text-[17px]">
            {message}
          </p>

          <div className="mt-10 rounded-[1.25rem] border border-[#1D4231]/10 bg-white p-6 text-left shadow-sm md:mt-12 md:p-8">
            <h2 className="mb-5 font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-[#1D4231]">
              What Happens Next
            </h2>
            <ul className="space-y-5">
              {steps.map(({ icon, title, desc, iconBg }) => (
                <li key={title} className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${iconBg}1a` }}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ color: iconBg, fontVariationSettings: '"FILL" 1' }}
                    >
                      {icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-[14px] font-semibold leading-[1.4] text-[#1A1A1A] md:text-[15px]">{title}</p>
                    <p className="mt-0.5 font-body text-[13px] leading-[1.6] text-[#000000]/60 md:text-[14px]">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-body text-[13px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              href={backHref}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1D4231]/30 px-8 py-3.5 font-body text-[13px] font-semibold text-[#1D4231] transition-all hover:bg-[#1D4231]/5 sm:w-auto"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              {backLabel}
            </Link>
          </div>

          <p className="mt-10 font-body text-[13px] text-[#000000]/50">
            Need immediate assistance?{' '}
            <a href={callHref} className="font-semibold text-[#1D4231] hover:underline">
              Call us now
            </a>
          </p>
        </div>
      </section>

      <footer className="border-t border-[#1D4231]/10 px-4 py-6 text-center sm:px-6 md:px-[80px]">
        <p className="font-body text-[12px] italic text-[#000000]/40">
          © 2026 Aura Dental. All rights reserved.
        </p>
      </footer>

      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17425479208/HZA8CPiu6LQcEKjsjvVA',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>
    </main>
  );
}
