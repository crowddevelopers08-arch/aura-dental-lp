'use client';
import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const faqItems = [
  {
    question: 'How often should I visit the dentist?',
    answer: 'We recommend visiting your dentist every six months for routine check-ups and professional cleaning to maintain optimal oral health.',
  },
  {
    question: 'Do you provide painless dental treatment?',
    answer: 'Yes. We use modern equipment, advanced anesthesia techniques, and minimally invasive procedures to ensure maximum patient comfort during every treatment.',
  },
  {
    question: 'Which treatment is right for me?',
    answer: 'Our dental specialists will perform a comprehensive examination and recommend the most suitable treatment based on your oral health and smile goals.',
  },
  {
    question: 'Do you offer cosmetic dentistry?',
    answer: 'Yes. We provide smile makeovers, veneers, teeth whitening, invisible aligners, and other cosmetic dental treatments tailored to your goals.',
  },
  {
    question: 'Do you offer EMI?',
    answer: 'Yes. Flexible No Cost EMI options are available for eligible treatments. Ask our team for more details during your consultation.',
  },
];

export function GeneralFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-3xl">

        <AnimateOnScroll animation="fade-down">
          <div className="mb-5 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
              <span className="material-symbols-outlined text-[13px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>help</span>
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[12px]">Frequently Asked Questions</span>
            </span>
          </div>
          <h2 className="mb-7 text-center font-heading text-[22px] font-bold leading-[1.2] text-[#000000] sm:text-[26px] md:mb-8 md:text-[28px] lg:text-[32px]">
            Questions About{' '}
            <span className="text-[#1D4231]">Our Dental Treatments?</span>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={120}>
          <div className="space-y-0.5">
            {faqItems.map((item, index) => (
              <div key={item.question} className="border-b border-[#1D4231]/15 py-3 md:py-4">
                <button
                  className="group flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-body text-[14px] font-semibold leading-[1.5] text-[#000000] transition-colors group-hover:text-[#1D4231] sm:text-[15px] lg:text-[16px]">
                    {item.question}
                  </span>
                  <span
                    className="material-symbols-outlined flex-shrink-0 text-[19px] text-[#1D4231] transition-transform duration-300"
                    style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    add
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-2.5 font-body text-[13px] leading-[1.8] text-[#000000]/70 sm:text-[14px] md:mt-3 lg:text-[15px]">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={280} className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-body flex items-center gap-2 rounded-full bg-[#1D4231] px-8 py-3.5 text-[14px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[15px] md:px-10"
          >
            Book Your Appointment
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </a>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
