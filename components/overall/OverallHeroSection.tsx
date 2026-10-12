import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { OverallLeadFormSection } from '@/components/overall/OverallLeadFormSection';

// Opening banner with the paid booking form overlapping its bottom edge.
export function OverallHeroSection() {
  return (
    <div className="bg-[#DDD5CA]">
      <section className="px-4 pt-4 sm:px-6 md:px-[60px] md:pt-6 lg:pt-8">
        <div className="mx-auto max-w-[1280px]">
          <AnimateOnScroll animation="fade-up">
            <div className="overflow-hidden rounded-[2rem] bg-[#1D4231]">
              <div className="flex flex-col md:flex-row md:items-stretch">
                <div className="flex flex-1 flex-col justify-center px-6 py-10 pb-20 md:px-10 md:py-12 md:pb-28 lg:px-14 lg:py-14 lg:pb-32">
                  <AnimateOnScroll animation="fade-right" delay={80}>
                    <h1 className="font-heading text-[26px] font-extrabold leading-[1.15] text-white sm:text-[30px] md:text-[32px] lg:text-[40px] xl:text-[44px]">
                      Most Advanced <span className="text-[#D3BB71]">Dental Care</span> in Hyderabad
                    </h1>

                    {/* Mobile-only image */}
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

      <OverallLeadFormSection />
    </div>
  );
}
