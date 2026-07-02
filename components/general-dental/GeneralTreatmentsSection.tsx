import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { CardCarousel } from '@/components/CardCarousel';

const treatments = [
  {
    id: 1,
    icon: 'dentistry',
    title: 'Invisible Aligners',
    desc: 'Straighten your teeth discreetly with clear, removable aligners that fit seamlessly into your lifestyle.',
    tags: ['Crooked Teeth', 'Gaps Between Teeth', 'Crowded Teeth', 'Bite Correction'],
    highlight: 'Most Popular',
    highlightColor: '#1D4231',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910832/invisible-aligners_kx9xnw.png',
  },
  {
    id: 2,
    icon: 'medical_information',
    title: 'Dental Implants',
    desc: 'Replace missing teeth with permanent, natural-looking dental implants that restore both function and confidence.',
    tags: ['Single Missing Tooth', 'Multiple Missing Teeth', 'Full Mouth Restoration'],
    highlight: 'Permanent Solution',
    highlightColor: '#1D4231',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910796/dental-implant_x2luam.png',
  },
  {
    id: 3,
    icon: 'healing',
    title: 'Root Canal Treatment',
    desc: 'Save infected or damaged teeth with painless root canal treatment that eliminates pain while preserving your natural tooth.',
    tags: ['Infected Teeth', 'Tooth Pain Relief', 'Natural Tooth Preservation'],
    highlight: 'Pain-Free',
    highlightColor: '#D3BB71',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911264/root-canal-treatment_ohf8es.png',
  },
  {
    id: 4,
    icon: 'shield',
    title: 'Dental Crowns',
    desc: 'Protect damaged or weakened teeth with durable, natural-looking crowns designed to restore strength and appearance.',
    tags: ['Metal Ceramic Crowns', 'Zirconia Crowns'],
    highlight: 'Durable',
    highlightColor: '#1D4231',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910795/DentalCrowns_u19acf.png',
  },
  {
    id: 5,
    icon: 'circle',
    title: 'Tooth Fillings',
    desc: 'Treat cavities early using high-quality tooth-colored restorations for a natural finish.',
    tags: ['Composite Fillings', 'GIC Restorations'],
    highlight: 'Natural Look',
    highlightColor: '#1D4231',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911267/tooth-filling_q8ygfl.png',
  },
  {
    id: 6,
    icon: 'remove',
    title: 'Tooth Extraction',
    desc: 'Safe and comfortable removal of damaged or severely infected teeth when required.',
    tags: ['Normal Tooth Extraction', 'Wisdom Tooth Extraction'],
    highlight: 'Comfortable',
    highlightColor: '#D3BB71',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911267/ToothExtraction_w655mm.png',
  },
  {
    id: 7,
    icon: 'auto_fix_high',
    title: 'Veneers',
    desc: 'Transform chipped, discoloured, uneven, or worn teeth with ultra-thin porcelain veneers for a flawless smile.',
    tags: ['Porcelain Veneers', 'Smile Makeover'],
    highlight: 'Flawless Smile',
    highlightColor: '#1D4231',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911271/vaneers_hpsulr.png',
  },
  {
    id: 8,
    icon: 'brightness_high',
    title: 'Teeth Whitening',
    desc: 'Brighten your smile with professional whitening treatments that safely remove stains and discoloration.',
    tags: ['Professional Whitening', 'Zoom Teeth Whitening'],
    highlight: 'Instant Glow',
    highlightColor: '#D3BB71',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782911268/TeethWhitening_bij82z.png',
  },
  {
    id: 9,
    icon: 'health_and_safety',
    title: 'Advanced Gum Treatment',
    desc: 'Protect your gums and teeth with advanced periodontal care, including flap surgery for severe gum disease.',
    tags: ['Gum Disease Treatment', 'Flap Surgery', 'Deep Cleaning'],
    highlight: 'Periodontal Care',
    highlightColor: '#1D4231',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910683/AdvancedGumTreatment_okzztr.png',
  },
  {
    id: 10,
    icon: 'sentiment_satisfied',
    title: 'Complete Dentures',
    desc: 'Restore your smile and chewing ability with custom-made complete dentures designed for comfort, function, and a natural appearance.',
    tags: ['Full Dentures', 'Partial Dentures'],
    highlight: 'Full Restoration',
    highlightColor: '#1D4231',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910794/CompleteDentures_xqa7jy.png',
  },
] as const;

function TreatmentCard({ treatment }: { treatment: (typeof treatments)[number] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#1D4231]/10 bg-[#DDD5CA]/30 shadow-sm transition-colors hover:bg-[#DDD5CA]/60">
      <div className="relative overflow-hidden">
        <Image
          src={treatment.image}
          alt={treatment.title}
          width={500}
          height={280}
          className="h-[220px] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <h3 className="font-heading text-[16px] font-bold leading-snug text-white sm:text-[17px]">
            {treatment.title}
          </h3>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.12em] text-white"
            style={{ backgroundColor: treatment.highlightColor }}
          >
            {treatment.highlight}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-3 flex-1 font-body text-[12px] leading-[1.7] text-[#000000]/65 sm:text-[13px]">{treatment.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {treatment.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#1D4231]/15 bg-white px-2.5 py-0.5 font-body text-[11px] font-medium text-[#1D4231] sm:text-[12px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GeneralTreatmentsSection() {
  return (
    <section id="treatments" className="bg-white px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <AnimateOnScroll animation="fade-down" className="mb-8 text-center md:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4231]/30 bg-[#DDD5CA]/60 px-3 py-1">
            <span className="material-symbols-outlined text-[13px] text-[#1D4231]" style={{ fontVariationSettings: '"FILL" 1' }}>dentistry</span>
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D4231] sm:text-[12px]">Our Dental Treatments</span>
          </span>
          <h2 className="mt-3 font-heading text-[22px] font-bold leading-[1.2] text-[#000000] sm:text-[26px] md:text-[28px] lg:text-[34px] xl:text-[36px]">
            Our Dental Treatments
          </h2>
          <p className="mt-2 font-body text-[14px] leading-[1.7] text-[#000000]/55 sm:text-[15px]">
            Comprehensive dental care tailored to every patient&apos;s unique needs and goals.
          </p>
        </AnimateOnScroll>

        <div className="overflow-hidden sm:hidden">
          <CardCarousel dotColor="#1D4231" btnTop="110px">
            {treatments.map((t) => <TreatmentCard key={t.id} treatment={t} />)}
          </CardCarousel>
        </div>

        <AnimateOnScroll animation="fade-in" delay={100} className="hidden sm:block">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {treatments.map((t, i) => (
              <AnimateOnScroll
                key={t.id}
                animation="fade-up"
                delay={i * 50}
                className={i === treatments.length - 1 ? 'lg:col-start-2' : undefined}
              >
                <TreatmentCard treatment={t} />
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>

        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-body flex items-center gap-2 rounded-full bg-[#1D4231] px-8 py-3.5 text-[14px] font-semibold text-white shadow-md transition-colors hover:bg-[#1D4231] sm:text-[15px] md:px-10"
          >
            Book a Consultation
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
