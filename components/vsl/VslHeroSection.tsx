import Image from 'next/image';
import { VslCtaButton, VslPaymentNote } from '@/components/vsl/VslCtaButton';
import { VslVideoPlayer } from '@/components/vsl/VslVideoPlayer';

export function VslHeroSection() {
  return (
    <section
      id="watch"
      className="relative overflow-hidden max-[470px]:pt-[76px] max-[470px]:pb-10 bg-[#1D4231] px-4 pb-14 pt-[90px] sm:px-6 md:px-[60px] md:pb-16 md:pt-[108px] lg:pb-16 lg:pt-[116px]"
    >
      {/*
        Mobile/tablet: single centred column — eyebrow, headline, video, credit, CTA.
        lg and up: two columns — all copy on the left, video alone on the right.
        The copy wrapper is `display: contents` below lg so its children stay in the
        mobile flex flow and the video can be ordered between headline and credit.
      */}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1000px] flex-col items-center text-center lg:grid lg:max-w-[1180px] lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-center lg:gap-x-8 lg:text-left xl:max-w-[1270px] xl:gap-x-10">

        <div className="contents lg:block">

          {/* Eyebrow */}
          {/* <span className="hero-anim-label order-1 inline-flex items-center gap-2 rounded-full border border-[#D3BB71] px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D3BB71]" />
            <span className="font-body text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[13px]">
              Watch This First
            </span>
          </span> */}

          {/* Headline */}
          <h1 className="hero-anim-title order-2 font-heading text-[30px] font-extrabold leading-[1.15] text-white sm:text-[38px] md:text-[46px] lg:text-[54px] xl:text-[62px]">
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

          {/* Speaker credit — small headshot beside the name, on one row */}
          <div className="hero-anim-desc order-4 mt-7 flex items-center gap-3 sm:mt-8 sm:gap-3.5 lg:mt-6">
            <span className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#D3BB71] sm:h-[54px] sm:w-[54px] lg:h-[66px] lg:w-[66px]">
              <Image
                src="https://res.cloudinary.com/dvj4ktxgl/image/upload/c_fill,g_face,w_216,h_216/v1782911260/Specialist_vvhs2o.png"
                alt="Dr Siva Nagini Yalavarthi"
                fill
                sizes="66px"
                className="object-cover object-center"
              />
            </span>

            <p className="font-body text-left font-medium text-[14.5px] leading-[1.45] text-white/70 sm:text-[16px] lg:text-[19px]">
              <strong className="block font-bold text-white">Dr Siva Nagini</strong>
              <span className="text-[#D3BB71]">Prosthodontist &amp; Implantologist</span>
            </p>
          </div>

          {/* CTA
              The Razorpay note is forced onto one line here only: nowrap plus a
              viewport-scaled size so it still fits a 360px phone. */}
          <div className="hero-anim-ctas order-5 mt-8 flex flex-col items-center gap-4 [&_p]:flex-nowrap [&_p]:gap-x-1.5 [&_p]:whitespace-nowrap [&_p]:text-[clamp(9px,2.5vw,13px)] [&_p_.material-symbols-outlined]:text-[14px] lg:mt-7 lg:items-start lg:[&_p]:justify-start">
            <VslCtaButton variant="gold" className="lg:!px-11 lg:!py-5 lg:!text-[17px]" />

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

        {/* Video */}
        <div className="hero-anim-video order-3 mt-9 w-full sm:mt-11 lg:mt-0">
          <VslVideoPlayer youtubeId="M5-mVhm687A" className="mx-auto max-w-[680px] lg:max-w-none" />
        </div>

      </div>
    </section>
  );
}
