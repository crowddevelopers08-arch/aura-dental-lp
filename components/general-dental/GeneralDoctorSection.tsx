import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const specializations = [
  'Dental Implants',
  'Invisible Aligners',
  'Smile Makeovers',
  'Root Canal Restoration',
  'Crowns & Bridges',
  'Veneers',
  'Full Mouth Rehabilitation',
  'Cosmetic Dentistry',
];

const stats = [
  { value: '12+', label: 'Years of Experience' },
  { value: '5,000+', label: 'Patients Treated' },
];

export function GeneralDoctorSection() {
  return (
    <section id="doctor" className="bg-[#DDD5CA] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[44%_56%] md:gap-12 lg:gap-16">

          <AnimateOnScroll animation="fade-right" className="hidden md:flex md:flex-col md:gap-4">
            <div className="overflow-hidden rounded-3xl">
              <div className="relative h-[480px] w-full lg:h-[540px]">
                <Image src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911260/Specialist_vvhs2o.png" alt="Dr. Siva Nagini Yalavarthi" fill className="object-cover object-center" sizes="(min-width: 1024px) 38vw, 44vw" priority />
              </div>
            </div>
            <div className="rounded-2xl bg-[#1D4231] px-5 py-4">
              <svg className="mb-2 h-6 w-6 text-[#D3BB71]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-2.74.315-.784.57-1.29.76-1.516.32-.36.46-.62.42-.78-.04-.15-.24-.23-.6-.23-.58 0-1.14.275-1.68.825-.54.55-1.02 1.26-1.44 2.13-.42.875-.68 1.76-.78 2.65-.1.89-.02 1.72.24 2.5.26.775.69 1.41 1.3 1.91.61.5 1.38.75 2.31.75.83 0 1.52-.22 2.07-.66.55-.44.82-1.02.82-1.74zm8.47 0c0-.88-.23-1.618-.69-2.217-.326-.42-.768-.69-1.327-.817-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.96.41-2.74.315-.784.57-1.29.76-1.516.32-.36.46-.62.42-.78-.04-.15-.24-.23-.6-.23-.58 0-1.14.275-1.68.825-.54.55-1.02 1.26-1.44 2.13-.42.875-.68 1.76-.78 2.65-.1.89-.02 1.72.24 2.5.26.775.69 1.41 1.3 1.91.61.5 1.38.75 2.31.75.83 0 1.52-.22 2.07-.66.55-.44.82-1.02.82-1.74z" />
              </svg>
              <p className="font-body text-[12px] font-medium italic leading-[1.7] text-[#D3BB71] sm:text-[13px]">
                Every patient deserves a smile that feels natural, functions perfectly, and lasts a lifetime.
              </p>
              <p className="mt-2 font-body text-[11px] font-bold uppercase tracking-[0.16em] text-[#D3BB71]/70">
                - Dr. Siva Nagini Yalavarthi
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-left" delay={100}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/20 bg-white px-3 py-1">
              <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">Meet Our Dental Expert</span>
            </span>

            <h2 className="mt-3 font-heading text-[24px] font-extrabold leading-[1.1] text-[#000000] sm:text-[28px] md:text-[30px] lg:text-[34px]">
              Dr. Siva Nagini Yalavarthi
            </h2>
            <p className="mt-1.5 font-body text-[14px] font-semibold text-[#1D4231] sm:text-[15px]">
              PhD, MDS – Oral & Maxillofacial Prosthodontist &amp; Implantologist
            </p>

            <div className="my-4 h-px bg-[#1D4231]/10" />

            <div className="mb-5 overflow-hidden rounded-3xl md:hidden">
              <div className="relative h-[380px] w-full">
                <Image src="https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911260/Specialist_vvhs2o.png" alt="Dr. Siva Nagini Yalavarthi" fill className="object-cover object-center" sizes="100vw" />
              </div>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-[#1D4231] px-4 py-3 text-center">
                  <p className="font-body text-[22px] font-extrabold text-white sm:text-[26px]">{s.value}</p>
                  <p className="font-body text-[11px] font-medium text-[#D3BB71] sm:text-[12px]">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mb-5 font-body text-[12px] leading-[1.8] text-[#000000]/70 sm:text-[13px] lg:text-[14px]">
              With over <strong className="font-bold text-[#1D4231]">12 years of clinical experience</strong>, Dr. Siva Nagini Yalavarthi specializes in restorative, cosmetic, and implant dentistry. Her patient-first approach, combined with advanced technology and minimally invasive techniques, has helped thousands of patients regain healthy, confident smiles.
            </p>

            <div className="mb-5">
              <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-[#000000] sm:text-[11px]">Areas of Expertise</p>
              <div className="overflow-hidden">
                <div className="marquee-track flex items-center gap-2" style={{ width: 'max-content', animationDuration: '22s' }}>
                  {[...specializations, ...specializations].map((s, i) => (
                    <div key={i} className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#1D4231]/15 bg-white px-3 py-1.5">
                      <span className="material-symbols-outlined text-[12px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                      <span className="font-body text-[11px] font-medium text-[#1D4231] sm:text-[12px]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="#consultation"
              className="font-body inline-flex items-center gap-2 rounded-full bg-[#1D4231] px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[14px] md:px-8"
            >
              Book Your Consultation
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
