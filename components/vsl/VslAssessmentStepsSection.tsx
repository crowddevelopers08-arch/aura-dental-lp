import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { VslCtaButton } from '@/components/vsl/VslCtaButton';

const STEPS = [
  {
    num: '01',
    icon: 'clinical_notes',
    title: 'Clinical Assessment',
    desc: 'We examine your oral health and understand your dental concerns.',
  },
  {
    num: '02',
    icon: 'monitor_heart',
    title: 'Digital Evaluation',
    desc: 'Where required, appropriate imaging is reviewed to assess your implant suitability.',
  },
  {
    num: '03',
    icon: 'forum',
    title: 'Discuss Your Goals',
    desc: 'We discuss what you want to achieve and any concerns you may have about treatment.',
  },
  {
    num: '04',
    icon: 'fact_check',
    title: 'Review Your Options',
    desc: 'We explain the treatment options that may be appropriate for your condition.',
  },
  {
    num: '05',
    icon: 'assignment_ind',
    title: 'Personalise Your Plan',
    desc: 'You receive a personalised treatment recommendation, estimated timeline and cost.',
  },
  {
    num: '06',
    icon: 'help_center',
    title: 'Get Your Questions Answered',
    desc: 'Understand the procedure, alternatives, healing and next steps before you decide.',
  },
];

export function VslAssessmentStepsSection() {
  return (
    <section id="assessment" className="bg-white px-4 py-12 sm:px-6 md:px-[60px] md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1280px]">

        {/* Heading */}
        <AnimateOnScroll animation="fade-down" className="mx-auto max-w-[760px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/25 bg-[#DDD5CA]/60 px-3 py-1">
            <span className="material-symbols-outlined text-[14.5px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>
              event_available
            </span>
            <span className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#1D4231] sm:text-[13px]">
              Your Smile Assessment
            </span>
          </span>

          <h2 className="mt-4 font-heading text-[27px] font-extrabold leading-[1.15] text-[#000000] sm:text-[33px] md:text-[39px] lg:text-[42px]">
            What Happens During Your{' '}
            <span className="text-[#1D4231]">Smile Assessment?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[620px] font-body font-medium text-[15px] leading-[1.85] text-[#000000]/55 sm:text-[16.5px]">
            Your consultation begins with understanding your teeth, your concerns and your goals.
          </p>
        </AnimateOnScroll>

        {/* Steps */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-5">
          {STEPS.map((step, i) => (
            <AnimateOnScroll key={step.num} animation="fade-up" delay={i * 70} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#1D4231]/15 bg-[#DDD5CA]/30 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D3BB71] hover:bg-white sm:p-6">

                {/* Ghost number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 font-heading text-[76px] font-extrabold leading-none text-[#1D4231]/[0.05] transition-colors duration-300 group-hover:text-[#D3BB71]/25 sm:text-[92px]"
                >
                  {step.num}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D4231] transition-transform duration-300 group-hover:scale-105 sm:h-[52px] sm:w-[52px]">
                  <span
                    className="material-symbols-outlined text-[25px] text-[#D3BB71] sm:text-[27px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    {step.icon}
                  </span>
                </span>

                <p className="relative mt-4 font-body text-[12px] font-black uppercase tracking-[0.2em] text-[#D3BB71]">
                  Step {step.num}
                </p>

                <h3 className="relative mt-1.5 font-heading text-[18.5px] font-bold leading-[1.25] text-[#1D4231] sm:text-[20.5px]">
                  {step.title}
                </h3>

                <p className="relative mt-2.5 flex-1 font-body font-medium text-[14.5px] leading-[1.8] text-[#000000]/60 sm:text-[15px]">
                  {step.desc}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Closing CTA */}
        <AnimateOnScroll animation="fade-up" delay={120} className="mt-10 md:mt-14">
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 rounded-[1.5rem] border border-[#1D4231]/10 bg-[#DDD5CA]/35 px-6 py-8 text-center sm:rounded-[2rem] sm:px-10 sm:py-10">
            <p className="font-heading text-[20.5px] font-bold leading-[1.35] text-[#1D4231] sm:text-[26px] md:text-[28px]">
              Get a personalised assessment. Then make your decision with confidence.
            </p>
            <VslCtaButton variant="green" />
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
