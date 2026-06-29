import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const services = [
  { label: 'Single Tooth Implant',       href: '#services' },
  { label: 'Multiple Teeth Implants',    href: '#services' },
  { label: 'Full Mouth Dental Implants', href: '#services' },
  { label: 'All-on-4 Dental Implants',  href: '#services' },
  { label: 'Implant-Supported Dentures',href: '#services' },
];

const quickLinks = [
  { label: 'Our Procedure',   href: '#procedure' },
  { label: 'Our Doctor',      href: '#doctor' },
  { label: 'Technology',      href: '#technology' },
  { label: 'FAQ',             href: '#faq' },
  { label: 'Book Consultation', href: '#consultation' },
];

export function Footer() {
  return (
    <footer className="bg-[#1D4231]">

      {/* Main grid */}
      <AnimateOnScroll
        animation="fade-up"
        className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 md:grid-cols-4 md:gap-10 md:px-[60px] md:py-12"
      >

        {/* Brand column */}
        <div className="space-y-5 sm:col-span-2 md:col-span-1">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aura-logo.jpeg"
            alt="Aura Dental"
            className="h-10 w-auto object-contain md:h-12"
          />

          <p className="font-outfit max-w-[260px] text-[13px] leading-[1.75] text-[#D3BB71]/70">
            Advanced dental implant care by experienced Prosthodontist &amp; Implantologist. Restoring confident smiles in Hyderabad.
          </p>

          {/* Social / contact icons */}
          <div className="flex gap-3 pt-1">
            {/* Instagram placeholder */}
            <a
              href="#"
              aria-label="Aura Dental on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D3BB71]/30 text-[#D3BB71]/70 transition-colors hover:border-[#D3BB71] hover:text-[#D3BB71]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Facebook placeholder */}
            <a
              href="#"
              aria-label="Aura Dental on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D3BB71]/30 text-[#D3BB71]/70 transition-colors hover:border-[#D3BB71] hover:text-[#D3BB71]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Our Services
          </h4>
          <ul className="space-y-3">
            {services.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-outfit flex items-center gap-2 text-[13px] leading-[1.5] text-[#D3BB71]/70 transition-colors hover:text-[#D3BB71]"
                >
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#D3BB71]/50" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-outfit flex items-center gap-2 text-[13px] leading-[1.5] text-[#D3BB71]/70 transition-colors hover:text-[#D3BB71]"
                >
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#D3BB71]/50" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-5">
          <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Contact Us
          </h4>
          <div className="space-y-4">
            <a
              href="mailto:auradentalclinics1@gmail.com"
              className="group flex items-start gap-3"
            >
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>mail</span>
              <span className="font-outfit text-[13px] leading-[1.6] text-[#D3BB71]/70 transition-colors group-hover:text-[#D3BB71]">
                auradentalclinics1@gmail.com
              </span>
            </a>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>schedule</span>
              <span className="font-outfit text-[13px] leading-[1.6] text-[#D3BB71]/70">
                Mon - Sat: 9:00 AM to 9:00 PM<br />
                Sunday: 10:00 AM to 5:00 PM<br />
                Personal: 7:00 PM - 9:00 PM
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>location_on</span>
              <div className="font-outfit grid gap-3 text-[13px] leading-[1.6] text-[#D3BB71]/70 md:grid-cols-2 md:gap-6">
                <div className="min-w-0">
                  <a href="https://maps.app.goo.gl/JhzsPSCMk49nHjkH6" className="transition-colors hover:text-[#D3BB71]">
                    Madinaguda
                  </a>
                  <br />
                  <a href="tel:+917842871414" className="transition-colors hover:text-[#D3BB71]">
                    +91 7842871414
                  </a>
                </div>
                <div className="min-w-0">
                  <a href="https://maps.app.goo.gl/9MmEEkXKP2ob5zcq8" className="transition-colors hover:text-[#D3BB71]">
                    Kondapur
                  </a>
                  <br />
                  <a href="tel:+919963262774" className="transition-colors hover:text-[#D3BB71]">
                    +91 9963262774
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#consultation"
            className="font-outfit mt-2 inline-flex items-center gap-2 rounded-full bg-[#D3BB71] px-5 py-2.5 text-[13px] font-semibold text-[#1D4231] shadow-sm transition-colors hover:bg-[#D3BB71]"
          >
            Book Free Consultation
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

      </AnimateOnScroll>

      {/* Bottom bar */}
      <div className="border-t border-[#ffffff12]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 md:px-[60px]">
          <p className="font-outfit text-[12px] text-[#D3BB71]/50">
            © 2026 Aura Dental. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a className="font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D3BB71]/50 transition-colors hover:text-[#D3BB71]" href="/privacy-policy">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
