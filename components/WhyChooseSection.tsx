import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const benefits = [
  { icon: 'timer', title: 'Permanent Tooth Replacement' },
  { icon: 'face_retouching_natural', title: 'Natural Look & Feel' },
  { icon: 'restaurant', title: 'Improved Chewing Efficiency' },
  { icon: 'record_voice_over', title: 'Clearer Speech' },
  { icon: 'healing', title: 'Preserves Jaw Bone Health' },
  { icon: 'face', title: 'Maintains Facial Structure' },
  { icon: 'hourglass_top', title: 'Long-Lasting Solution' },
  { icon: 'shield', title: 'Protects Adjacent Healthy Teeth' },
  { icon: 'cleaning_services', title: 'Easy to Clean & Maintain' },
] as const;

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-[#DDD5CA] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-down" className="mb-8 text-center md:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-white/70 px-3 py-1">
            <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
              star
            </span>
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">
              Benefits
            </span>
          </span>
          <h2 className="mt-3 font-outfit text-[20px] font-extrabold leading-[1.2] text-[#000000] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
            Why Choose Dental Implants?
          </h2>
          <p className="mt-2 font-outfit text-[13px] leading-[1.7] text-[#000000]/55 sm:text-[14px]">
            Dental implants are the gold standard for tooth replacement.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={80}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <AnimateOnScroll key={benefit.title} animation="fade-up" delay={index * 50}>
                <div className="flex items-center gap-4 rounded-2xl border border-[#1D4231]/10 bg-white px-4 py-4 shadow-sm md:px-5">
                  <div className="relative flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-[#D3BB71]" />
                    <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#1D4231]">
                      <span
                        className="material-symbols-outlined text-[19px] text-[#D3BB71]"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        {benefit.icon}
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="font-outfit text-[13px] font-bold leading-[1.3] text-[#1D4231] sm:text-[14px]">
                      {benefit.title}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll animation="fade-up" delay={300} className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-outfit inline-flex items-center gap-2 rounded-full bg-[#1D4231] px-8 py-3.5 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[14px] md:px-10"
          >
            Start My Smile Restoration Journey
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </span>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
