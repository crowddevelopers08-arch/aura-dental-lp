'use client';

import Image from 'next/image';

export function GeneralHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1D4231] via-[#153226] to-[#0D1F17] px-4 pb-14 pt-32 sm:px-6 md:px-[60px] md:pb-18 md:pt-36 max-[470px]:pb-10 max-[470px]:pt-20">
      <div className="relative z-[1] mx-auto max-w-[1280px]">
        {/* <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D3BB71]/30 bg-[#D3BB71]/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D3BB71]" />
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[12px]">
            Hyderabad&apos;s Trusted Dental Clinic
          </span>
        </div> */}

        <h1 className="font-heading text-[28px] font-extrabold leading-[1.18] text-white text-center sm:text-[32px] md:text-[36px] lg:text-[32px] xl:text-[38px] 2xl:text-[46px]">
          Hyderabad&apos;s Trusted Dental Clinic for{' '}
          <span className="text-[#D3BB71]">Complete Dental Care</span>
        </h1>

        <div className="relative mx-auto mt-6 h-[250px] w-full max-w-[560px] overflow-hidden rounded-2xl lg:hidden">
          <Image
            src="/gban.png"
            alt="Aura Dental"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="mt-10 max-[470px]:mt-6 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
        <div className="flex flex-col items-center text-center lg:w-[60%] lg:items-start lg:text-left">
          <p className="max-w-[700px] font-semibold font-body text-[16px] leading-[1.8] text-white sm:text-[18px] lg:max-w-none xl:text-[19px]">
            From preventive care to advanced smile transformations, Aura Dental offers comprehensive dental treatments under one roof. Our experienced dentists combine modern technology with personalized care to help you achieve a healthy, confident smile.
          </p>

          <div className="relative mt-6 h-[200px] w-full max-w-[560px] md:hidden">
            <Image
              src="/statmob.png"
              alt="Aura Dental credentials and reviews"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative mt-6 hidden h-[170px] w-full max-w-[600px] md:block">
            <Image
              src="/statss.png"
              alt="Aura Dental credentials and reviews"
              fill
              className="object-cover object-center"
            />
          </div>

          <a
            href="tel:+917842474433"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-6 py-2.5 font-body text-[14px] font-semibold text-[#D3BB71] transition-colors hover:bg-[#D3BB71]/20 sm:text-[15px]"
          >
            <span className="material-symbols-outlined text-[19px]" style={{ fontVariationSettings: '"FILL" 1' }}>call</span>
            Call Now to Book Appointment
          </a>
        </div>

        <div className="relative hidden h-[350px] w-full flex-shrink-0 overflow-hidden rounded-2xl lg:block lg:w-[40%]">
          <Image
            src="/gban.png"
            alt="Aura Dental"
            fill
            className="object-cover object-center"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
