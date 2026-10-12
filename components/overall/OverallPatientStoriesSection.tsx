import Image from 'next/image';
import { Outfit } from 'next/font/google';
import OverallPatientVideoCarousel from './OverallPatientVideoCarousel';

const outfit = Outfit({ subsets: ['latin'] });

const features = [
  { icon: 'smile-makeover', title: 'Digital Smile Design', text: 'Visualize your smile transformation.' },
  { icon: 'cbct', title: '3D CBCT Imaging', text: 'Detailed imaging for dental assessment.' },
  { icon: 'full-arch', title: 'Intraoral Digital Scanner', text: 'Accurate digital dental impressions.' },
  { icon: 'guided-surgery', title: 'Computer-Guided Implant Surgery', text: 'Precision-focused implant planning.' },
  { icon: 'cosmetic', title: 'Advanced Sterilization Systems', text: 'Strict infection-control practices.' },
  { icon: 'dental-implant', title: 'Premium International Implant Systems', text: 'Quality implant options tailored to your needs.' },
];

export function OverallPatientStoriesSection() {
  return (
    <section id="testimonials" className={`${outfit.className} overflow-hidden bg-gradient-to-br from-white via-[#FBF8F3] to-[#EEF3EF]`}>
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-10 pb-10 sm:px-6 sm:pt-12 sm:pb-12 md:px-10 md:pt-14 md:pb-14 lg:px-8 lg:pt-16 lg:pb-16">
        {/* Three blocks: heading, video, features. On phones they stack in that order, so the
            video sits between the heading and the list. On desktop the video spans the left
            column and the heading + features share the right column (the empty first/last rows
            centre them vertically). */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_minmax(0,620px)] lg:grid-rows-[1fr_auto_auto_1fr] lg:justify-center lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          {/* Heading */}
          <div className="flex min-w-0 flex-col items-center text-center lg:col-start-2 lg:row-start-2 lg:items-start lg:text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D3BB71]/50 bg-[#D3BB71]/[.15] px-3.5 py-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#D3BB71]" />
              <span className="text-[11px] font-semibold text-[#1D4231] sm:text-xs lg:text-sm">Why Aura Dental?</span>
            </div>

            <h2 className="text-[26px] leading-[1.18] font-extrabold text-[#1D4231] sm:text-[32px] md:text-[38px] lg:text-[40px] xl:text-[46px]">
              Most Advanced <span className="text-[#B0913F]">Dental Clinic</span> in Hyderabad
            </h2>
          </div>

          {/* Patient video carousel */}
          <div className="min-w-0 lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:self-center">
            <OverallPatientVideoCarousel />
          </div>

          {/* Features */}
          <ul className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:col-start-2 lg:row-start-3 lg:mt-7 lg:gap-4">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="flex items-start gap-3 rounded-2xl border border-[#D3BB71]/30 bg-white/70 p-4 shadow-[0_6px_18px_rgba(29,66,49,.06)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1D4231] shadow-[0_8px_18px_-8px_rgba(29,66,49,.7)]">
                  <Image
                    src={`/images/service-icons/${feature.icon}.png`}
                    alt=""
                    width={28}
                    height={28}
                    className="h-[26px] w-[26px] object-contain"
                  />
                </span>
                <div>
                  <p className="text-[15px] leading-snug font-semibold text-[#1D4231] lg:text-base">{feature.title}</p>
                  <p className="mt-0.5 text-[13px] leading-[1.6] text-[#1D4231]/70 lg:text-sm">{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
