'use client';
import { useState } from 'react';

const navLinks = [
  { label: 'Journey', href: '/invisible-aligners#journey' },
  { label: 'Our Doctor', href: '/invisible-aligners#doctor' },
  { label: 'Technology', href: '/invisible-aligners#technology' },
  { label: 'Conditions', href: '/invisible-aligners#conditions' },
  { label: 'Testimonials', href: '/invisible-aligners#testimonials' },
  { label: 'FAQ', href: '/invisible-aligners#faq' },
];

export function AlignerHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#1D4231]/20 bg-white/95 shadow-sm backdrop-blur-sm transition-all duration-300">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6 md:px-[80px] md:py-4">

        <a href="/invisible-aligners" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910678/aura-logo_ozknpu.jpg" alt="Aura Dental" className="h-10 w-auto object-contain md:h-12" />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-outfit relative py-1 text-[13px] font-semibold tracking-[0.04em] text-[#444] transition-colors duration-200 hover:text-[#1D4231]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/invisible-aligners#consultation"
            className="font-outfit hidden rounded-full bg-[#1D4231] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1D4231] sm:inline-flex md:px-7 md:py-3 md:text-[14px]"
          >
            Book Free Consultation
          </a>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#1D4231] transition-colors hover:bg-[#1D423110] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#1D423115] bg-white px-4 pb-5 pt-3 sm:px-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-outfit block rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#333] transition-colors hover:bg-[#1D423108] hover:text-[#1D4231]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/invisible-aligners#consultation"
              className="font-outfit mt-3 inline-flex justify-center rounded-full bg-[#1D4231] px-5 py-2.5 text-[14px] font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
