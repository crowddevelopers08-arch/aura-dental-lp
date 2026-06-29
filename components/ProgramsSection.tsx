import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { CardCarousel } from '@/components/CardCarousel';

const implantTypes = [
  {
    id: 1,
    image: '/single-teeth.jpg',
    title: 'Single Tooth Dental Implant',
    description: 'Ideal for replacing a single missing tooth while preserving adjacent healthy teeth. Looks, feels, and functions exactly like a natural tooth.',
    highlight: 'Most Common',
    highlightColor: '#1D4231',
  },
  {
    id: 2,
    image: '/multiple-teeth.jpg',
    title: 'Multiple Teeth Implants',
    description: 'Restore multiple missing teeth with implant-supported bridges for enhanced function and aesthetics without affecting surrounding teeth.',
    highlight: 'Popular Choice',
    highlightColor: '#1D4231',
  },
  {
    id: 3,
    image: '/full-mouth.jpg',
    title: 'Full Mouth Dental Implants',
    description: 'A complete smile restoration solution for patients with extensive tooth loss, giving you a full set of permanent, natural-looking teeth.',
    highlight: 'Complete Restoration',
    highlightColor: '#1D4231',
  },
  {
    id: 4,
    image: '/all-on-4.jpg',
    title: 'All-on-4 Dental Implants',
    description: 'Replace an entire arch of missing teeth using just four strategically placed implants. A faster, more affordable full-arch solution.',
    highlight: 'Advanced Solution',
    highlightColor: '#D3BB71',
  },
  {
    id: 5,
    image: '/implant.jpg',
    title: 'Implant-Supported Dentures',
    description: 'Enjoy improved comfort, stability, and confidence with securely fixed dentures. No more slipping, clicking, or adhesive creams.',
    highlight: 'Denture Alternative',
    highlightColor: '#D3BB71',
  },
] as const;

function ImplantCard({ type }: { type: (typeof implantTypes)[number] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1D4231]/10 bg-[#DDD5CA]/30 shadow-sm transition-colors hover:bg-[#DDD5CA]/60">
      <div className="overflow-hidden">
        <Image
          src={type.image}
          alt={type.title}
          width={600}
          height={300}
          className="h-[240px] w-full object-cover"
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <h3 className="font-outfit text-[13px] font-bold leading-snug text-[#1D4231] sm:text-[14px] lg:text-[15px]">
            {type.title}
          </h3>
          <span
            className="rounded-full px-2 py-0.5 font-outfit text-[9px] font-bold uppercase tracking-[0.12em] text-white"
            style={{ backgroundColor: type.highlightColor }}
          >
            {type.highlight}
          </span>
        </div>
        <p className="font-outfit text-[11px] leading-[1.7] text-[#000000]/65 sm:text-[12px] md:text-[13px]">
          {type.description}
        </p>
      </div>
    </div>
  );
}

export function ProgramsSection() {
  return (
    <section id="services" className="bg-white px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">

        {/* Header */}
        <AnimateOnScroll animation="fade-down" className="mb-8 text-center md:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
            <span className="material-symbols-outlined text-[12px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>dentistry</span>
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[11px]">Implant Solutions</span>
          </span>
          <h2 className="mt-3 font-outfit text-[20px] font-bold leading-[1.2] text-[#000000] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
            Types of Dental Implants We Offer
          </h2>
          <p className="mt-2 font-outfit text-[13px] leading-[1.7] text-[#000000]/55 sm:text-[14px]">
            We offer a full range of implant solutions tailored to every patient's needs and budget.
          </p>
        </AnimateOnScroll>

        {/* Mobile carousel */}
        <div className="overflow-hidden sm:hidden">
          <CardCarousel dotColor="#1D4231" btnTop="120px">
            {implantTypes.map((type) => (
              <ImplantCard key={type.id} type={type} />
            ))}
          </CardCarousel>
        </div>

        {/* Desktop grid */}
        <AnimateOnScroll animation="fade-in" delay={100} className="hidden sm:block">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 md:gap-5">
            {implantTypes.map((type, i) => (
              <AnimateOnScroll
                key={type.id}
                animation="fade-up"
                delay={i * 60}
                className={`sm:col-span-2 ${i === 3 ? 'sm:col-start-2' : ''}`}
              >
                <ImplantCard type={type} />
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        {/* CTA */}
        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-outfit flex items-center gap-2 rounded-full bg-[#1D4231] px-8 py-3.5 text-[13px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[14px] md:px-10"
          >
            Find the Right Implant Solution for Me
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

      </div>
    </section>
  );
}
