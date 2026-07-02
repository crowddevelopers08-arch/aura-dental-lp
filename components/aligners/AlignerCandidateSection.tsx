import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const signs = [
  { num: '01', text: 'Crooked teeth' },
  { num: '02', text: 'Gaps between teeth' },
  { num: '03', text: 'Crowded teeth' },
  { num: '04', text: 'Mild to moderate bite issues' },
  { num: '05', text: 'Previous orthodontic relapse' },
  { num: '06', text: 'Want a discreet alternative to metal braces' },
  { num: '07', text: 'Looking for a confident, beautiful smile' },
];

export function AlignerCandidateSection() {
  return (
    <section className="bg-[#ffffff] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">

          <AnimateOnScroll animation="fade-right" className="lg:sticky lg:top-24 lg:w-[38%] lg:self-start xl:w-[36%]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
              <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>help</span>
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">Are You a Candidate?</span>
            </span>

            <h2 className="mt-4 font-heading text-[22px] font-extrabold leading-[1.2] text-[#000000] sm:text-[26px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]">
              Are Invisible Aligners{' '}
              <span className="text-[#1D4231]">Right for You?</span>
            </h2>

            <p className="mt-3 font-body text-[12px] leading-[1.8] text-[#000000]/60 sm:text-[13px]">
              You may be a suitable candidate if you have any of the following. Book a free consultation and our specialists will evaluate your smile.
            </p>

            <a
              href="#consultation"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1D4231] px-6 py-3 font-body text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[14px]"
            >
              Check My Eligibility
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
          </AnimateOnScroll>

          <div className="flex-1">
            <div>
              {signs.map((item, i) => (
                <div key={item.num}>
                  <AnimateOnScroll animation="fade-left" delay={i * 60}>
                    <div className="group flex items-center gap-4 rounded-xl px-2 py-4 transition-colors hover:bg-[#DDD5CA]/50 md:gap-5 md:py-5">
                      <span className="w-8 shrink-0 font-body text-[11px] font-black tracking-[0.2em] text-[#D3BB71]">{item.num}</span>
                      <div className="h-7 w-px shrink-0 rounded-full bg-[#D3BB71]" />
                      <span className="material-symbols-outlined flex-shrink-0 text-[20px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                      <p className="flex-1 font-body text-[13px] font-semibold leading-[1.55] text-[#000000] sm:text-[14px] xl:text-[15px]">
                        {item.text}
                      </p>
                    </div>
                  </AnimateOnScroll>
                  {i < signs.length - 1 && <div className="mx-2 h-px bg-[#D3BB71]/25" />}
                </div>
              ))}
            </div>

            <AnimateOnScroll animation="fade-up" delay={480} className="mt-7 rounded-2xl bg-[#1D4231] p-5 md:mt-9 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-body text-[14px] font-bold text-white sm:text-[15px]">Not sure if aligners are right for you?</p>
                  <p className="font-body text-[12px] text-[#D3BB71]/80 sm:text-[13px]">Book a free consultation — we'll assess your suitability.</p>
                </div>
                <a
                  href="#consultation"
                  className="inline-flex self-start flex-shrink-0 items-center gap-2 rounded-full bg-[#D3BB71] px-5 py-2.5 font-body text-[12px] font-bold text-[#1D4231] transition-colors hover:bg-[#D3BB71] sm:self-auto sm:text-[13px]"
                >
                  Get Free Assessment
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
