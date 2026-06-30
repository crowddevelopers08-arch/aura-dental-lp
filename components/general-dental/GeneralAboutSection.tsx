import { AnimateOnScroll } from '@/components/AnimateOnScroll';

export function GeneralAboutSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">

          <AnimateOnScroll animation="fade-right" className="lg:w-[42%]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
              <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>health_and_safety</span>
              <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">Complete Dental Care</span>
            </span>

            <h2 className="mt-3 font-outfit text-[22px] font-extrabold leading-[1.2] text-[#000000] sm:text-[26px] md:text-[30px] lg:text-[28px] xl:text-[34px]">
              Complete Dental Care{' '}
              <span className="text-[#1D4231]">Under One Roof</span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" delay={100} className="flex-1">
            <p className="mb-4 font-outfit text-[13px] leading-[1.8] text-[#000000]/70 sm:text-[14px]">
              Whether you&apos;re dealing with a toothache, missing teeth, stained teeth, or looking for a complete smile makeover, Aura Dental provides comprehensive dental treatments tailored to your needs.
            </p>
            <p className="font-outfit text-[13px] leading-[1.8] text-[#000000]/70 sm:text-[14px]">
              Our experienced team uses advanced technology to ensure every treatment is comfortable, precise, and delivers long-lasting results.
            </p>

            <a
              href="#consultation"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1D4231] px-6 py-3 font-outfit text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[14px]"
            >
              Book My Appointment
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
