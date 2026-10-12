import type { Metadata } from 'next';
import { OverallHeader } from '@/components/overall/OverallHeader';
import { OverallHeroSection } from '@/components/overall/OverallHeroSection';
import { OverallPatientStoriesSection } from '@/components/overall/OverallPatientStoriesSection';
import { OverallFounderSection } from '@/components/overall/OverallFounderSection';
import { OverallTestimonialsSection } from '@/components/overall/OverallTestimonialsSection';
import { OverallFooter } from '@/components/overall/OverallFooter';

export const metadata: Metadata = {
  title: 'Most Advanced Dental Care in Hyderabad | Aura Dental',
  description:
    '12+ years of dental experience with 5,000+ patients across Hyderabad. Book your consultation at Aura Dental, Kondapur & Madeenaguda.',
};

const footerServices = [
  { label: 'Single Tooth Implant', href: '#consultation' },
  { label: 'Multiple Teeth Implants', href: '#consultation' },
  { label: 'Full Mouth Dental Implants', href: '#consultation' },
  { label: 'All-on-4 Dental Implants', href: '#consultation' },
  { label: 'Implant-Supported Dentures', href: '#consultation' },
];

const footerQuickLinks = [
  { label: 'Why Aura Dental', href: '#testimonials' },
  { label: 'Our Doctor', href: '#doctor' },
  { label: 'Video Testimonials', href: '#video-testimonials' },
  { label: 'Patient Reviews', href: '#reviews' },
  { label: 'Book Consultation', href: '#consultation' },
];

// Paid replica of the home page — the booking form takes payment via Razorpay
// and submits as `dental-overall-paid`.
export default function OverallPage() {
  return (
    <>
      <OverallHeader />
      {/* Offset for the fixed header */}
      <main className="pt-[65px] md:pt-[81px]">
        <OverallHeroSection />
        <OverallPatientStoriesSection />
        <OverallFounderSection />
        <OverallTestimonialsSection />
      </main>
      <OverallFooter
        services={footerServices}
        quickLinks={footerQuickLinks}
        description="Advanced dental implant care by experienced Prosthodontist & Implantologist. Restoring confident smiles in Hyderabad."
        ctaHref="#consultation"
        ctaLabel="Book Consultation"
      />
    </>
  );
}
