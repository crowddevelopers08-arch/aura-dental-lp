import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { VslCtaButton } from '@/components/vsl/VslCtaButton';

const SPECIALISMS = [
  'Dental Implants',
  'Prosthodontics',
  'Smile Rehabilitation',
  'Restorative Dentistry',
];

/**
 * Rendered twice: as the left column on desktop, and inline between the name
 * and the credentials once the layout stacks.
 */
function SpecialistPortrait({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden
        className="absolute -left-3 -top-3 h-24 w-24 rounded-tl-[2rem] border-l-2 border-t-2 border-[#D3BB71] sm:-left-4 sm:-top-4 sm:h-32 sm:w-32"
      />
      <span
        aria-hidden
        className="absolute -bottom-3 -right-3 h-24 w-24 rounded-br-[2rem] border-b-2 border-r-2 border-[#1D4231]/35 sm:-bottom-4 sm:-right-4 sm:h-32 sm:w-32"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#1D4231]/5">
        <div className="relative h-[380px] w-full sm:h-[460px] lg:h-[520px]">
          <Image
            src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911260/Specialist_vvhs2o.png"
            alt="Dr Siva Nagini Yalavarthi"
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        </div>

        {/* Experience badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-[#1D4231] px-4 py-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D3BB71]">
            <span className="material-symbols-outlined text-[21.5px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
              workspace_premium
            </span>
          </span>
          <span className="font-body text-[14px] font-bold leading-[1.5] text-white sm:text-[15px]">
            12+ years of clinical experience
          </span>
        </div>
      </div>
    </div>
  );
}

export function VslSpecialistSection() {
  return (
    <section id="doctor" className="bg-[#DDD5CA] px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[42%_58%] lg:gap-14">

          {/* Portrait — desktop column only */}
          <AnimateOnScroll animation="fade-right" className="hidden lg:block">
            <SpecialistPortrait />
          </AnimateOnScroll>

          {/* Content */}
          <AnimateOnScroll animation="fade-left" delay={100}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/25 bg-white px-3 py-1">
              <span className="material-symbols-outlined text-[14.5px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
                stethoscope
              </span>
              <span className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1D4231] sm:text-[13px]">
                Meet Your Implant Specialist
              </span>
            </span>

            <h2 className="mt-4 font-heading text-[29px] font-extrabold leading-[1.12] text-[#000000] sm:text-[35px] md:text-[40px]">
              Dr Siva Nagini Yalavarthi
            </h2>

            <p className="mt-2 font-body text-[15.5px] font-bold text-[#1D4231] sm:text-[17px]">
              MDS – Prosthodontist &amp; Implantologist
            </p>

            {/* Portrait — sits under the credentials once the layout stacks */}
            <SpecialistPortrait className="mt-6 lg:hidden" />

            <div className="mt-6">
              <p className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#000000]/45">
                Specialising in
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SPECIALISMS.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/12 bg-white px-3.5 py-2 transition-colors hover:border-[#D3BB71]"
                  >
                    <span className="material-symbols-outlined text-[15.5px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>
                      check_circle
                    </span>
                    <span className="font-body text-[14px] font-bold text-[#1D4231] sm:text-[15px]">{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Positioning statement */}
            <blockquote className="mt-6 rounded-2xl border-l-[3px] border-[#D3BB71] bg-white/70 px-5 py-4">
              <p className="font-body font-medium text-[15px] leading-[1.85] text-[#000000]/70 sm:text-[16px]">
                Her role is <strong className="font-bold text-[#1D4231]">not to pressure you</strong> into
                treatment. It is to help you understand your options and make an informed decision about your
                smile.
              </p>
            </blockquote>

            <div className="mt-7">
              <VslCtaButton label="Meet Dr Siva Nagini" variant="green" />
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </section>
  );
}
