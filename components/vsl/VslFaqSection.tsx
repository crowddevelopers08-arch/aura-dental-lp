'use client';

import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { VslCtaButton } from '@/components/vsl/VslCtaButton';

const FAQS = [
  {
    q: 'Am I suitable for dental implants?',
    a: 'Suitability depends on your oral health, gums, jawbone and individual condition. An assessment is required to determine this.',
  },
  {
    q: 'Are dental implants painful?',
    a: 'The procedure is performed under local anaesthesia. Your dentist will explain what to expect and the appropriate aftercare.',
  },
  {
    q: 'How long does implant treatment take?',
    a: 'Treatment time varies depending on your condition, healing requirements and the restoration planned.',
  },
  {
    q: 'How much do dental implants cost?',
    a: 'There is no single price. Your cost depends on your individual treatment requirements.',
  },
  {
    q: 'Can I get implants if I’ve been missing teeth for years?',
    a: 'You may still have options. Your jawbone and oral health will first need to be assessed.',
  },
  {
    q: 'Can implants replace multiple missing teeth?',
    a: 'Yes. Depending on your condition, options can include multiple implants, implant-supported bridges, dentures or full-arch solutions.',
  },
];

export function VslFaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#DDD5CA]/35 px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[36%_64%] lg:gap-14">

          {/* Sticky heading */}
          <AnimateOnScroll animation="fade-right" className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/25 bg-white px-3 py-1">
              <span className="material-symbols-outlined text-[14.5px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
                help
              </span>
              <span className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1D4231] sm:text-[13px]">
                Frequently Asked
              </span>
            </span>

            <h2 className="mt-4 font-heading text-[28px] font-extrabold leading-[1.15] text-[#000000] sm:text-[34px] md:text-[40px]">
              Frequently <span className="text-[#1D4231]">Asked</span>
            </h2>

            <div className="mt-6 hidden lg:block">
              <VslCtaButton variant="green" />
            </div>
          </AnimateOnScroll>

          {/* Accordion */}
          <AnimateOnScroll animation="fade-left" delay={100}>
            <div className="overflow-hidden rounded-[1.25rem] border border-[#1D4231]/10 bg-white sm:rounded-[1.5rem]">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q} className={i > 0 ? 'border-t border-[#1D4231]/10' : ''}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-[#DDD5CA]/25 sm:px-7 sm:py-5"
                    >
                      <span
                        className={`font-body mt-0.5 flex-shrink-0 text-[12.5px] font-black tracking-[0.1em] transition-colors ${
                          isOpen ? 'text-[#D3BB71]' : 'text-[#1D4231]/30'
                        }`}
                      >
                        0{i + 1}
                      </span>

                      <span className="flex-1 font-body text-[15.5px] font-bold leading-[1.5] text-[#1D4231] sm:text-[17px]">
                        {item.q}
                      </span>

                      <span
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? 'rotate-45 bg-[#1D4231] text-[#D3BB71]' : 'bg-[#DDD5CA]/60 text-[#1D4231]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[19.5px]">add</span>
                      </span>
                    </button>

                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 pl-[52px] font-body font-medium text-[14.5px] leading-[1.85] text-[#000000]/60 sm:px-7 sm:pb-6 sm:pl-[62px] sm:text-[15.5px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex justify-center lg:hidden">
              <VslCtaButton variant="green" />
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
