import Image from 'next/image';
import { VslCtaButton, VslPaymentNote } from '@/components/vsl/VslCtaButton';
import { VslVideoPlayer } from '@/components/vsl/VslVideoPlayer';

export function VslHeroSection() {
  return (
    <section
      id="watch"
      className="relative overflow-hidden max-[470px]:pt-20 max-[470px]:pb-10 bg-[#1D4231] px-4 pb-14 pt-24 sm:px-6 md:px-[60px] md:pb-14 md:pt-26 lg:pb-14 lg:pt-26"
    >
      <div className="relative z-[1] mx-auto flex max-w-[1000px] flex-col items-center text-center">

        {/* Eyebrow */}
        <span className="hero-anim-label inline-flex items-center gap-2 rounded-full border border-[#D3BB71] px-4 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3BB71]" />
          <span className="font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[13px]">
            Watch This First
          </span>
        </span>

        {/* Headline */}
        <h1 className="hero-anim-title mt-5 font-heading text-[30px] font-extrabold leading-[1.15] text-white sm:text-[38px] md:text-[46px] lg:text-[54px]">
          Before You Choose Dental Implants,{' '}
          <span className="relative inline-block text-[#D3BB71]">
            Watch This First
            {/* Hand-drawn brush underline — tapers at both ends, solid gold */}
            <svg
              aria-hidden
              viewBox="0 0 340 16"
              preserveAspectRatio="none"
              fill="#D3BB71"
              className="absolute -bottom-1.5 left-0 h-[8px] w-full sm:-bottom-2 sm:h-[11px]"
            >
              <path d="M2 9.5C55 5 115 3.2 172 3.2c57 0 116 1 166 1.3v2c-50 .3-109 1.9-166 2.5-57 .6-117 1.4-170 2.5Z" />
            </svg>
          </span>
        </h1>

        {/* Video */}
        <div className="hero-anim-video mt-9 w-full sm:mt-11">
          <VslVideoPlayer className="mx-auto max-w-[680px]" />
        </div>

        {/* Speaker credit */}
        <p className="hero-anim-desc mt-7 max-w-[680px] font-body font-medium text-[15px] leading-[1.85] text-white/70 sm:mt-8 sm:text-[16.5px]">
          <strong className="font-bold text-white">Dr Siva Nagini</strong>{' '}
          <span className="text-[#D3BB71]">(prosthodontist &amp; implantologist)</span> shares key
          factors for selecting an implant, covering suitability, options, planning, and care.
        </p>

        {/* CTA */}
        <div className="hero-anim-ctas mt-8 flex flex-col items-center gap-4">
          <VslCtaButton variant="gold" />

          {/* Accepted payment methods */}
          <div className="w-full max-w-[360px] rounded-xl bg-white px-4 py-2.5 sm:max-w-[400px]">
            <Image
              src="/newpaynxt.png"
              alt="Accepted payment methods: RuPay, Visa, UPI, Maestro, MasterCard and American Express"
              width={2172}
              height={275}
              sizes="(min-width: 640px) 400px, 360px"
              className="h-auto w-full"
            />
          </div>

          <VslPaymentNote tone="light" />
        </div>

      </div>
    </section>
  );
}
