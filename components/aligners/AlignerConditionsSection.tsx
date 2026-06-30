import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { CardCarousel } from '@/components/CardCarousel';

const conditions = [
  {
    icon: 'format_align_center',
    title: 'Crooked Teeth',
    desc: 'Gently straighten misaligned teeth without traditional braces.',
    image: '/Crooked.png',
  },
  {
    icon: 'compress',
    title: 'Crowded Teeth',
    desc: 'Create proper spacing and improve oral hygiene.',
    image: '/CrowdedTeeth.png',
  },
  {
    icon: 'space_bar',
    title: 'Gapped Teeth',
    desc: 'Close unwanted spaces for a balanced, even smile.',
    image: '/GappedTeeth.png',
  },
  {
    icon: 'keyboard_double_arrow_up',
    title: 'Overbite',
    desc: 'Correct excessive overlap of the upper teeth over the lower.',
    image: '/Overbite.png',
  },
  {
    icon: 'keyboard_double_arrow_down',
    title: 'Underbite',
    desc: 'Improve bite function and jaw alignment.',
    image: '/Underbite.png',
  },
  {
    icon: 'swap_horiz',
    title: 'Crossbite & Open Bite',
    desc: 'Enhance chewing comfort and smile aesthetics.',
    image: '/Crossbite.png',
  },
] as const;

function ConditionCard({ condition }: { condition: (typeof conditions)[number] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#1D4231]/10 bg-[#DDD5CA]/20 shadow-sm transition-colors hover:bg-[#DDD5CA]/45">
      <div className="relative overflow-hidden">
        <Image
          src={condition.image}
          alt={condition.title}
          width={500}
          height={280}
          className="h-[220px] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-outfit text-[14px] font-bold leading-snug text-[#1D4231] sm:text-[15px]">
          {condition.title}
        </h3>
        <p className="mt-1.5 font-outfit text-[12px] leading-[1.7] text-[#000000]/60 sm:text-[13px]">
          {condition.desc}
        </p>
      </div>
    </div>
  );
}

export function AlignerConditionsSection() {
  return (
    <section id="conditions" className="bg-white px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-down" className="mb-8 text-center md:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
            <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>healing</span>
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">Conditions We Treat</span>
          </span>
          <h2 className="mt-3 font-outfit text-[20px] font-bold leading-[1.2] text-[#000000] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
            Conditions Invisible Aligners Can Treat
          </h2>
          <p className="mt-2 font-outfit text-[13px] leading-[1.7] text-[#000000]/55 sm:text-[14px]">
            Invisible aligners can effectively correct a wide range of dental alignment concerns.
          </p>
        </AnimateOnScroll>

        <div className="overflow-hidden sm:hidden">
          <CardCarousel dotColor="#1D4231" btnTop="110px">
            {conditions.map((condition) => (
              <ConditionCard key={condition.title} condition={condition} />
            ))}
          </CardCarousel>
        </div>

        <div className="hidden grid-cols-1 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition, i) => (
            <AnimateOnScroll key={condition.title} animation="fade-up" delay={i * 60}>
              <ConditionCard condition={condition} />
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-outfit flex items-center gap-2 rounded-full bg-[#1D4231] px-8 py-3.5 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[14px] md:px-10"
          >
            Book a Free Smile Assessment
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
