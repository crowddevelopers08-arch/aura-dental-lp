import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const reasons = [
  { num: '01', text: 'Experienced Dental Specialists' },
  { num: '02', text: 'Modern Digital Dentistry' },
  { num: '03', text: 'Advanced Equipment' },
  { num: '04', text: 'Personalized Treatment Plans' },
  { num: '05', text: 'Comfortable Treatment Experience' },
  { num: '06', text: 'Hygienic & Sterile Environment' },
  { num: '07', text: 'Comprehensive Dental Care Under One Roof' },
  { num: '08', text: 'Affordable & Transparent Treatment Plans' },
];

export function GeneralWhyTrustSection() {
  return (
    <section id="why-us" className="bg-[#ffffff] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">

          <AnimateOnScroll animation="fade-right" className="lg:sticky lg:top-24 lg:w-[38%] lg:self-start xl:w-[36%]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
              <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
              <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">Why Patients Trust Us</span>
            </span>

            <h2 className="mt-4 font-outfit text-[22px] font-extrabold leading-[1.2] text-[#000000] sm:text-[26px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]">
              Why Patients{' '}
              <span className="text-[#1D4231]">Trust Aura Dental</span>
            </h2>

            <p className="mt-3 font-outfit text-[12px] leading-[1.8] text-[#000000]/60 sm:text-[13px]">
              We are committed to delivering exceptional dental care with every visit. Here&apos;s why thousands of patients choose us.
            </p>

            <a
              href="#consultation"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1D4231] px-6 py-3 font-outfit text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[14px]"
            >
              Book My Appointment
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
          </AnimateOnScroll>

          <div className="flex-1">
            <div>
              {reasons.map((item, i) => (
                <div key={item.num}>
                  <AnimateOnScroll animation="fade-left" delay={i * 60}>
                    <div className="group flex items-center gap-4 rounded-xl px-2 py-4 transition-colors hover:bg-[#DDD5CA]/50 md:gap-5 md:py-5">
                      <span className="w-8 shrink-0 font-outfit text-[11px] font-black tracking-[0.2em] text-[#D3BB71]">{item.num}</span>
                      <div className="h-7 w-px shrink-0 rounded-full bg-[#D3BB71]" />
                      <span className="material-symbols-outlined flex-shrink-0 text-[20px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                      <p className="flex-1 font-outfit text-[13px] font-semibold leading-[1.55] text-[#000000] sm:text-[14px] xl:text-[15px]">
                        {item.text}
                      </p>
                    </div>
                  </AnimateOnScroll>
                  {i < reasons.length - 1 && <div className="mx-2 h-px bg-[#D3BB71]/25" />}
                </div>
              ))}
            </div>

            <AnimateOnScroll animation="fade-up" delay={560} className="mt-7 rounded-2xl bg-[#1D4231] p-5 md:mt-9 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-outfit text-[14px] font-bold text-white sm:text-[15px]">Ready to experience world-class dental care?</p>
                  <p className="font-outfit text-[12px] text-[#D3BB71]/80 sm:text-[13px]">Book a consultation — our specialists are here to help.</p>
                </div>
                <a
                  href="#consultation"
                  className="inline-flex self-start flex-shrink-0 items-center gap-2 rounded-full bg-[#D3BB71] px-5 py-2.5 font-outfit text-[12px] font-bold text-[#1D4231] transition-colors hover:bg-[#D3BB71] sm:self-auto sm:text-[13px]"
                >
                  Book Now
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </a>
              </div>
            </AnimateOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
