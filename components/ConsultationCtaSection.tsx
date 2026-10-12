import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const highlights = [
  { icon: 'dentistry', text: 'Advanced Dental Implant Care' },
  { icon: 'local_hospital', text: 'Highly Equipped Dental Clinic' },
  { icon: 'star', text: '5,000+ Happy Smiles Transformed' },
  { icon: 'location_on', text: 'Aura Dental - Madeenaguda, Hyderabad' },
];

type ConsultationCtaSectionProps = {
  bgClassName?: string;
  // Leave room at the bottom of the card for a form that overlaps it (see HomeHeroSection).
  overlapBottom?: boolean;
  showButtons?: boolean;
  // 'home' swaps in the home page's opening headline, sub-headline and locations.
  variant?: 'default' | 'home';
};

export function ConsultationCtaSection({
  bgClassName = 'bg-[#FBF8F3]',
  overlapBottom = false,
  showButtons = true,
  variant = 'default',
}: ConsultationCtaSectionProps = {}) {
  const mobileImage = (
    <div className="relative mt-5 h-[350px] w-full overflow-hidden rounded-xl md:hidden">
      <Image
        src="/images/auractamob_qonhml.png"
        alt="Aura Dental specialist"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1D4231]/30 to-transparent" />
    </div>
  );

  return (
    <section
      className={`${bgClassName} px-4 sm:px-6 md:px-[60px] ${overlapBottom ? 'pt-4 md:pt-6 lg:pt-8' : 'py-10 md:py-14 lg:py-18'}`}
    >
      <div className="mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-up">
          <div className="overflow-hidden rounded-[2rem] bg-[#1D4231]">
            <div className="flex flex-col md:flex-row md:items-stretch">
              <div
                className={`flex flex-1 flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14 ${overlapBottom ? 'pb-20 md:pb-28 lg:pb-32' : ''}`}
              >
                <AnimateOnScroll animation="fade-right" delay={80}>
                  {variant === 'home' ? (
                    <>
                      <h1 className="font-heading text-[26px] font-extrabold leading-[1.15] text-white sm:text-[30px] md:text-[32px] lg:text-[40px] xl:text-[44px]">
                        Most Advanced <span className="text-[#D3BB71]">Dental Care</span> in Hyderabad
                      </h1>

                      {mobileImage}

                      <p className="mt-4 font-body text-[15px] font-medium leading-[1.7] text-white/85 sm:text-[16px] md:text-[17px]">
                        <strong className="font-bold text-[#D3BB71]">12+ Years</strong> of Dental Experience with{' '}
                        <strong className="font-bold text-[#D3BB71]">5,000+ Patients</strong> Across Hyderabad
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-4 py-2">
                        <span className="material-symbols-outlined text-[18px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          location_on
                        </span>
                        <span className="font-body text-[14px] font-semibold text-white sm:text-[15px]">
                          Kondapur <span className="mx-1 text-[#D3BB71]">|</span> Madeenaguda
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-3 py-1">
                        <span className="material-symbols-outlined text-[13px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          verified
                        </span>
                        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D3BB71] sm:text-[12px]">
                          Final Call-to-Action
                        </span>
                      </span>

                      <h2 className="font-heading text-[24px] font-extrabold leading-[1.18] text-white sm:text-[28px] md:text-[28px] lg:text-[34px] xl:text-[36px]">
                        Restore Your Smile with Hyderabad&apos;s Trusted{' '}
                        <span className="text-[#D3BB71]">Dental Implant Experts</span>
                      </h2>

                      {/* Mobile-only image — between heading and para */}
                      {mobileImage}

                      <p className="mt-4 font-body text-[13px] leading-[1.8] text-white sm:text-[14px] md:text-[15px]">
                        Take the first step towards a confident, healthy smile with advanced dental implant treatment at Aura Dental. Our specialists are ready to help you.
                      </p>

                      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {highlights.map((highlight) => (
                          <div key={highlight.text} className="flex items-center gap-2.5">
                            <span
                              className="material-symbols-outlined text-[17px] text-[#D3BB71]"
                              style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                              {highlight.icon}
                            </span>
                            <span className="font-body text-[13px] font-medium text-white sm:text-[14px]">
                              {highlight.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {showButtons && (
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="#consultation"
                        className="font-body inline-flex items-center justify-center gap-2 rounded-full bg-[#D3BB71] px-7 py-3.5 text-[14px] font-bold text-[#1D4231] shadow-lg transition-colors hover:bg-[#D3BB71] sm:text-[15px]"
                      >
                        Book My Appointment
                        <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
                      </a>
                      <a
                        href="tel:+917842474433"
                        className="font-body inline-flex items-center justify-center gap-2 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-7 py-3.5 text-[14px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[15px]"
                      >
                        <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          call
                        </span>
                        Call Now
                      </a>
                    </div>
                  )}
                </AnimateOnScroll>
              </div>

              <div className="hidden md:block md:w-[38%] lg:w-[36%]">
                <AnimateOnScroll animation="fade-left" delay={140} className="h-full">
                  <div className="relative h-full min-h-[420px] w-full overflow-hidden bg-[#D3BB71]/10">
                    <Image
                      src="/images/auracta_zatauj.png"
                      alt="Aura Dental specialist"
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 36vw, 38vw"
                    />
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
