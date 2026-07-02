'use client';
import { useState } from 'react';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const faqItems = [
  {
    question: 'Are dental implants painful?',
    answer: 'No. Dental implant placement is performed under local anesthesia using advanced techniques, ensuring a comfortable and virtually painless experience. Most patients report the procedure is far more comfortable than they expected.',
  },
  {
    question: 'How long do dental implants last?',
    answer: 'With proper oral hygiene and regular dental check-ups, dental implants can last for decades â€” often a lifetime. The titanium implant itself rarely needs replacement; only the crown on top may need renewal after 10â€“15 years.',
  },
  {
    question: 'Am I eligible for dental implants?',
    answer: 'Most adults with healthy gums and sufficient jawbone are suitable candidates. Our implant specialists will perform a comprehensive evaluation including 3D CBCT imaging during your consultation to determine your suitability.',
  },
  {
    question: 'How much do dental implants cost in Hyderabad?',
    answer: 'The cost depends on the number of implants required, bone condition, and the type of restoration chosen. We offer transparent pricing and flexible payment options. Visit Aura Dental for a personalized consultation and detailed treatment estimate.',
  },
  {
    question: 'How long does the treatment take?',
    answer: 'Implant placement usually takes 30â€“60 minutes per implant. The overall treatment duration â€” including healing and crown placement â€” typically ranges from 3 to 6 months, depending on your individual treatment plan and healing rate.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-3xl">

        <AnimateOnScroll animation="fade-down">
          <div className="mb-5 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
              <span className="material-symbols-outlined text-[13px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>help</span>
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[12px]">
                Frequently Asked Questions
              </span>
            </span>
          </div>

          <h2 className="mb-7 text-center font-heading text-[22px] font-bold leading-[1.2] text-[#000000] sm:text-[26px] md:mb-8 md:text-[28px] lg:text-[32px]">
            Questions About{' '}
            <span className="text-[#1D4231]">Dental Implants?</span>
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
            Book Your Free Consultation
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </a>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
