import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const USPS = [
  { icon: 'workspace_premium', label: '12+ Years' },
  { icon: 'biotech', label: 'Digital Diagnostics' },
  { icon: 'diversity_1', label: 'Personalised Care' },
  { icon: 'psychology_alt', label: 'Expert Guidance' },
];

const LOCATIONS = ['Madinaguda', 'Kondapur', 'Hyderabad'];

export function VslUspBannerSection() {
  return (
    <section className="bg-[#DDD5CA] px-4 py-10 sm:px-6 md:px-[60px] md:py-14">
      <AnimateOnScroll animation="scale-in" className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#1D4231] px-5 py-8 sm:rounded-[2rem] sm:px-8 sm:py-10 md:px-12 md:py-12">

          <div className="relative z-[1]">
            <h2 className="text-center font-heading text-[26px] font-extrabold leading-[1.15] text-white sm:text-[32px] md:text-[38px]">
              Why <span className="text-[#D3BB71]">Aura Dental?</span>
            </h2>

            {/* USP row */}
            <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-9 md:grid-cols-4 md:gap-x-0">
              {USPS.map((usp, i) => (
                <div
                  key={usp.label}
                  className={`flex flex-col items-center gap-2.5 px-2 text-center md:px-5 ${
                    i > 0 ? 'md:border-l md:border-[#D3BB71]/20' : ''
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D3BB71] sm:h-12 sm:w-12">
                    <span
                      className="material-symbols-outlined text-[23px] text-[#D3BB71] sm:text-[25px]"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      {usp.icon}
                    </span>
                  </span>
                  <span className="font-body text-[13px] font-bold uppercase leading-[1.4] tracking-[0.14em] text-white sm:text-[14.5px]">
                    {usp.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Locations */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-[#D3BB71]/15 pt-6 sm:mt-10 sm:gap-x-5">
              <span
                className="material-symbols-outlined text-[18.5px] text-[#D3BB71]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                location_on
              </span>
              {LOCATIONS.map((loc, i) => (
                <span key={loc} className="flex items-center gap-3 sm:gap-5">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-[#D3BB71]/60" />}
                  <span className="font-body text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#D3BB71]/85 sm:text-[14px]">
                    {loc}
                  </span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </AnimateOnScroll>
    </section>
  );
}
