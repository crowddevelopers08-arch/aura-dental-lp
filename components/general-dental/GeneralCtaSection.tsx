import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const highlights = [
  { icon: 'location_on',    text: 'Aura Dental – Madinaguda, Hyderabad' },
  { icon: 'dentistry',      text: 'Complete Dental Care Under One Roof' },
  { icon: 'sentiment_satisfied', text: 'Personalized Treatment Plans' },
  { icon: 'local_hospital', text: 'Highly Equipped Dental Clinic' },
];

export function GeneralCtaSection() {
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
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D3BB71] sm:text-[11px]">Book Your Appointment</span>
                  </span>

                  <h2 className="font-heading text-[22px] font-extrabold leading-[1.18] text-white sm:text-[26px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
                    Your Healthy Smile{' '}
                    <span className="text-[#D3BB71]">Starts Here</span>
                  </h2>

                  <div className="relative mt-5 h-[350px] w-full overflow-hidden rounded-xl md:hidden">
                    <Image src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910680/auractamob_qonhml.png" alt="Aura Dental specialist" fill className="object-cover object-center" sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D4231]/30 to-transparent" />
                  </div>

                  <p className="mt-4 font-body text-[12px] leading-[1.8] text-white sm:text-[13px] md:text-[14px]">
                    Whether you need preventive dental care, cosmetic treatment, dental implants, invisible aligners, or a complete smile makeover, Aura Dental is here to help. Visit Hyderabad&apos;s trusted dental clinic today.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {highlights.map((highlight) => (
                      <div key={highlight.text} className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[16px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          {highlight.icon}
                        </span>
                        <span className="font-body text-[12px] font-medium text-white sm:text-[13px]">{highlight.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#consultation"
                      className="font-body inline-flex items-center justify-center gap-2 rounded-full bg-[#D3BB71] px-7 py-3.5 text-[13px] font-bold text-[#1D4231] shadow-lg transition-colors hover:bg-[#D3BB71] sm:text-[14px]"
                    >
                      Book My Appointment
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </a>
                    <a
                      href="tel:+917842474433"
                      className="font-body inline-flex items-center justify-center gap-2 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-7 py-3.5 text-[13px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[14px]"
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
                    <Image src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910680/auracta_zatauj.png" alt="Aura Dental specialist" fill className="object-cover object-center" sizes="(min-width: 1024px) 36vw, 38vw" />
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
