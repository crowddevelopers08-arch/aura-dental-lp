import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';

const C = {
  green: '#1D4231',
  gold:  '#D3BB71',
  cream: '#DDD5CA',
  dark:  '#000000',
};

const steps = [
  {
    num:  '01',
    image: '/c1.png',
    title: ['Consultation', ''],
    desc: 'Dental exam, scans, and implant suitability check.',
    iconBg: C.green,
  },
  {
    num:  '02',
    image: '/c22.png',
    title: ['Digital Implant', 'Planning'],
    desc: 'A tailored plan for bone, bite, and smile goals.',
    iconBg: C.gold,
  },
  {
    num:  '03',
    image: '/c3.png',
    title: ['Implant', 'Placement'],
    desc: 'Implant placed gently under safe local anesthesia.',
    iconBg: C.green,
  },
  {
    num:  '04',
    image: '/c45.png',
    title: ['Healing &', 'Osseointegration'],
    desc: 'Bone heals around the implant for stable support.',
    iconBg: C.gold,
  },
  {
    num:  '05',
    image: '/c5.png',
    title: ['Final Crown', 'Placement'],
    desc: 'A custom crown completes your natural-looking smile.',
    iconBg: C.green,
  },
] as const;

function ConnectorArrows() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
      <defs>
        <marker id="ah" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
          <polygon points="0 0, 9 3.5, 0 7" fill={C.gold} />
        </marker>
      </defs>
      <circle cx="172" cy="100" r="5" fill={C.gold} />
      <path d="M 172,100 C 183,162 217,162 228,100" stroke={C.gold} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
      <circle cx="372" cy="100" r="5" fill={C.gold} />
      <path d="M 372,100 C 383,38 417,38 428,100"   stroke={C.gold} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
      <circle cx="572" cy="100" r="5" fill={C.gold} />
      <path d="M 572,100 C 583,162 617,162 628,100" stroke={C.gold} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
      <circle cx="772" cy="100" r="5" fill={C.gold} />
      <path d="M 772,100 C 783,38 817,38 828,100"   stroke={C.gold} strokeWidth="2.5" fill="none" markerEnd="url(#ah)" />
    </svg>
  );
}

function StepText({ step, above }: { step: typeof steps[number]; above: boolean }) {
  return (
    <div className={`flex flex-col items-center text-center ${above ? 'justify-end' : 'justify-start'}`}>
      <span className="font-outfit text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: C.gold }}>
        STEP {step.num}
      </span>
      <h3 className="mt-0.5 font-outfit text-[12px] font-bold leading-[1.35] text-[#1D4231] lg:text-[13px]">
        {step.title[0]}{step.title[1] ? <><br />{step.title[1]}</> : null}
      </h3>
      <p className="mt-1.5 max-w-[150px] font-outfit text-[10px] leading-[1.65] text-[#000000]/70 lg:text-[11px]">
        {step.desc}
      </p>
    </div>
  );
}

function StepCircle({ step, size = 'lg' }: { step: typeof steps[number]; size?: 'lg' | 'sm' }) {
  const dim = size === 'lg'
    ? 'h-[100px] w-[100px] xl:h-[110px] xl:w-[110px]'
    : 'h-[56px] w-[56px] sm:h-[64px] sm:w-[64px]';
  const imageSize = size === 'lg' ? 72 : 40;

  return (
    <div
      className={`${dim} relative flex items-center justify-center overflow-hidden rounded-full border border-white/60 shadow-xl`}
      style={{ backgroundColor: step.iconBg }}
    >
      <div className="absolute inset-[10%] rounded-full bg-white/12" />
      <Image
        src={step.image}
        alt={`${step.title[0]} ${step.title[1]}`.trim()}
        width={imageSize}
        height={imageSize}
        className="relative z-[1] h-auto w-auto object-contain"
      />
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="procedure" className="px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18" style={{ backgroundColor: '#ffffff' }}>
      <div className="mx-auto max-w-[1280px]">

        <AnimateOnScroll animation="fade-down" className="mb-8 text-center md:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
            <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>dentistry</span>
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">Our Procedure</span>
          </span>
          <h2 className="mt-3 font-outfit text-[20px] font-extrabold leading-[1.2] text-[#000000] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
            Our Dental Implant{' '}
            <span className="text-[#1D4231]">Procedure</span>
          </h2>
          <p className="mt-2 font-outfit text-[13px] font-medium tracking-wide text-[#D3BB71] sm:text-[14px]">
            Simple &nbsp;•&nbsp; Safe &nbsp;•&nbsp; Comfortable
          </p>
        </AnimateOnScroll>

        {/* Desktop layout */}
        <div className="hidden lg:block">
          <AnimateOnScroll animation="fade-down">
            <div className="grid grid-cols-5">
              <StepText step={steps[0]} above />
              <div />
              <StepText step={steps[2]} above />
              <div />
              <StepText step={steps[4]} above />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-up" delay={80}>
            <div className="relative grid grid-cols-5 items-center">
              {steps.map((step) => (
                <div key={step.num} className="flex justify-center py-2">
                  <StepCircle step={step} size="lg" />
                </div>
              ))}
              <ConnectorArrows />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fade-down" delay={80}>
            <div className="grid grid-cols-5">
              <div />
              <StepText step={steps[1]} above={false} />
              <div />
              <StepText step={steps[3]} above={false} />
              <div />
            </div>
          </AnimateOnScroll>
        </div>

        {/* Mobile / tablet layout */}
        <div className="space-y-4 lg:hidden">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.num} animation="fade-up" delay={i * 70}>
              <div className="flex items-start gap-3">
                <StepCircle step={step} size="sm" />
                <div className="pt-1">
                  <span className="font-outfit text-[10px] font-black uppercase tracking-[0.2em] text-[#D3BB71]">
                    STEP {step.num}
                  </span>
                  <h3 className="mt-0.5 font-outfit text-[13px] font-bold leading-[1.3] text-[#1D4231]">
                    {step.title[0]} {step.title[1]}
                  </h3>
                  <p className="mt-1 font-outfit text-[11px] leading-[1.65] text-[#000000]/70 sm:text-[12px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

      </div>
    </section>
  );
}
