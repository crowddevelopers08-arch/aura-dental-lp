import Image from 'next/image';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { CardCarousel } from '@/components/CardCarousel';

const TECHNOLOGIES = [
  {
    num: '01',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910795/digital_veebcu.jpg',
    title: 'Digital Smile Design',
    desc: 'Visualize your smile transformation before treatment begins using advanced digital design software.',
  },
  {
    num: '02',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910677/3d_cbt_uu2us1.jpg',
    title: '3D CBCT Imaging',
    desc: 'Cone Beam CT scanning provides precise 3D visualization of your jawbone for accurate implant planning.',
  },
  {
    num: '03',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910797/intraoral_i8blf0.jpg',
    title: 'Intraoral Digital Scanner',
    desc: 'Eliminates traditional impressions for faster, more comfortable and precise digital models.',
  },
  {
    num: '04',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910788/computer-guided_r4b1ew.jpg',
    title: 'Computer-Guided Implant Surgery',
    desc: 'Digital surgical guides ensure millimeter-precise implant placement for optimal outcomes.',
  },
  {
    num: '05',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910677/advanced-sterlization_uokgz9.webp',
    title: 'Advanced Sterilization Systems',
    desc: 'Hospital-grade sterilization protocols ensure the highest standards of safety and hygiene.',
  },
  {
    num: '06',
    image: 'https://res.cloudinary.com/dvj4ktxgl/image/upload/v1782910795/dental-implants_qc7amq.jpg',
    title: 'Premium International Implant Systems',
    desc: 'We use globally trusted, FDA-approved implant brands backed by decades of clinical research.',
  },
];

function TechCard({ tech }: { tech: (typeof TECHNOLOGIES)[0] }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10 md:p-6">
      <div className="mb-4 overflow-hidden rounded-xl">
        <Image
          src={tech.image}
          alt={tech.title}
          width={400}
          height={200}
          className="h-[260px] w-full object-cover"
        />
      </div>
      <span className="mb-2 block font-body text-[10px] font-black uppercase tracking-[0.2em] text-[#D3BB71]/60">
        {tech.num}
      </span>
      <h3 className="mb-2 font-heading text-[14px] font-bold leading-[1.35] text-white sm:text-[15px]">
        {tech.title}
      </h3>
    </div>
  );
}

export function TreatmentsSection() {
  return (
    <section id="technology" className="relative overflow-hidden bg-[#1D4231] px-4 py-10 sm:px-6 md:px-[60px] md:py-14 lg:py-18">

      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle, #D3BB71 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }}
      />

      <AnimateOnScroll animation="fade-up" className="relative z-[1] mx-auto max-w-[1280px]">

        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center md:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D3BB71]/40 bg-[#D3BB71]/10 px-3 py-1">
            <span className="material-symbols-outlined text-[12px] text-[#D3BB71]" style={{ fontVariationSettings: '"FILL" 1' }}>settings_suggest</span>
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-[#D3BB71] sm:text-[11px]">Advanced Technology</span>
          </span>
          <h2 className="font-heading text-[20px] font-extrabold leading-[1.2] text-white sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]">
            Modern Dentistry Powered by Innovation
          </h2>
          <p className="max-w-[600px] font-body text-[12px] leading-[1.8] text-white/60 sm:text-[13px] md:text-[14px]">
            At Aura Dental, every implant procedure is supported by advanced digital technology to ensure accurate diagnosis, predictable treatment planning, and long-lasting outcomes.
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="overflow-hidden sm:hidden">
          <CardCarousel dotColor="#D3BB71" btnTop="130px">
            {TECHNOLOGIES.map((tech) => (
              <TechCard key={tech.num} tech={tech} />
            ))}
          </CardCarousel>
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGIES.map((tech, i) => (
            <AnimateOnScroll key={tech.num} animation="fade-up" delay={i * 60}>
              <TechCard tech={tech} />
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href="#consultation"
            className="font-body flex items-center gap-2 rounded-full bg-[#D3BB71] px-8 py-3.5 text-[13px] font-bold text-[#1D4231] shadow-lg transition-colors hover:bg-[#D3BB71] sm:text-[14px] md:px-10"
          >
            Experience Advanced Dental Care
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>

      </AnimateOnScroll>
    </section>
  );
}
