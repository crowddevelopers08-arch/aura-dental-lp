import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const highlights = [
  { icon: 'location_on',    text: 'Aura Dental – Madinaguda, Hyderabad' },
  { icon: 'call',           text: 'Call Now' },
  { icon: 'dentistry',      text: 'Advanced Clear Aligner Treatment' },
  { icon: 'local_hospital', text: 'Highly Equipped Dental Clinic' },
  { icon: 'credit_card',    text: 'No Cost EMI Available' },
];

export function AlignerCtaSection() {
  return (
    <section className="bg-[#DDD5CA] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-up">
          <div className="overflow-hidden rounded-[2rem] bg-[#1D4231]">
            <div className="flex flex-col md:flex-row md:items-stretch">
              <div className="flex flex-1 flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
                <AnimateOnScroll animation="fade-right" delay={80}>
                  <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-3 py-1">
                    <span className="material-symbols-outlined text-[12px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                    <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D3BB71] sm:text-[11px]">Transform Your Smile</span>
                  </span>

                  <h2 className="font-outfit text-[22px] font-extrabold leading-[1.18] text-white sm:text-[26px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
                    Transform Your Smile with Hyderabad&apos;s Trusted{' '}
                    <span className="text-[#D3BB71]">Invisible Aligner Experts</span>
                  </h2>

                  <div className="relative mt-5 h-[350px] w-full overflow-hidden rounded-xl md:hidden">
                    <Image src="/auractamob.png" alt="Aura Dental specialist" fill className="object-cover object-center" sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D4231]/30 to-transparent" />
                  </div>

                  <p className="mt-4 font-outfit text-[12px] leading-[1.8] text-white/65 sm:text-[13px] md:text-[14px]">
                    Take the first step toward a straighter, healthier smile with customized invisible aligners at Aura Dental.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {highlights.map((highlight) => (
                      <div key={highlight.text} className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[16px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          {highlight.icon}
                        </span>
                        <span className="font-outfit text-[12px] font-medium text-white/75 sm:text-[13px]">{highlight.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#consultation"
                      className="font-outfit inline-flex items-center justify-center gap-2 rounded-full bg-[#D3BB71] px-7 py-3.5 text-[13px] font-bold text-[#1D4231] shadow-lg transition-colors hover:bg-[#D3BB71] sm:text-[14px]"
                    >
                      Book My Smile Consultation
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                    <a
                      href="tel:+917842474433"
                      className="font-outfit inline-flex items-center justify-center gap-2 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-7 py-3.5 text-[13px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[14px]"
                    >
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
                      Call Now
                    </a>
                  </div>
                </AnimateOnScroll>
              </div>

              <div className="hidden md:block md:w-[38%] lg:w-[36%]">
                <AnimateOnScroll animation="fade-left" delay={140} className="h-full">
                  <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-[#D3BB71]/10">
                    <Image src="/auracta.png" alt="Aura Dental specialist" fill className="object-cover object-center" sizes="(min-width: 1024px) 36vw, 38vw" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1D4231]/18" />
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
