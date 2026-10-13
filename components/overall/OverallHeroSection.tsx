import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { OverallBannerSlider } from '@/components/overall/OverallBannerSlider';
import { OverallLeadFormSection } from '@/components/overall/OverallLeadFormSection';

const desktopSlides = [
  { src: '/images/overall-banners/family-offer-desktop.jpg', alt: 'Special dental family offer — family consultation ₹399 at Aura Dental' },
  { src: '/images/overall-banners/membership-desktop.jpg', alt: 'Aura Dental family dental membership' },
  { src: '/images/overall-banners/extraction-desktop.jpg', alt: 'Complete, painless tooth extraction at Aura Dental' },
  { src: '/images/overall-banners/aligners-desktop.jpg', alt: 'Clear aligners for crooked teeth at Aura Dental' },
  { src: '/images/overall-banners/doctor-desktop.jpg', alt: 'Family dentist Dr. Siva Nagini Yalavarthi — 12 years of clinical experience' },
];

// No mobile artwork exists for the family offer banner, so it is desktop-only.
const mobileSlides = [
  { src: '/images/overall-banners/membership-mobile.png', alt: 'Aura Dental family dental membership' },
  { src: '/images/overall-banners/extraction-mobile.png', alt: 'Complete, painless tooth extraction at Aura Dental' },
  { src: '/images/overall-banners/aligners-mobile.png', alt: 'Clear aligners for crooked teeth at Aura Dental' },
  { src: '/images/overall-banners/doctor-mobile.png', alt: 'Family dentist Dr. Siva Nagini Yalavarthi — 12 years of clinical experience' },
];

// Opening banner slider with the paid booking form below it.
export function OverallHeroSection() {
  return (
    <div className="bg-[#DDD5CA]">
      {/* Bottom padding lets the form overlap only the banner's bottom edge */}
      <section className="px-4 pb-8 pt-4 sm:px-6 md:px-[60px] md:pb-14 md:pt-6 lg:pt-8">
        <div className="mx-auto max-w-[1280px]">
          <AnimateOnScroll animation="fade-up">
            <OverallBannerSlider
              slides={mobileSlides}
              aspectClassName="aspect-[941/1672]"
              sizes="100vw"
              className="md:hidden"
            />
            <OverallBannerSlider
              slides={desktopSlides}
              aspectClassName="aspect-[8/3]"
              sizes="(min-width: 1400px) 1280px, 100vw"
              className="hidden md:block"
            />
          </AnimateOnScroll>
        </div>
      </section>

      <OverallLeadFormSection />
    </div>
  );
}
