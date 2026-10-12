import { Header } from '@/components/Header';
import { HomeHeroSection } from '@/components/HomeHeroSection';
import { FounderSection } from '@/components/FounderSection';
import { PatientTestimonialsSection } from '@/components/PatientTestimonialsSection';
import PatientStoriesSection from '@/components/patient-stories/PatientStoriesSection';
import { Footer } from '@/components/Footer';

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

export default function Home() {
  return (
    <>
      <Header />
      {/* Offset for the fixed header (the hero used to provide this spacing) */}
      <main className="pt-[65px] md:pt-[81px]">
        <HomeHeroSection />
        <PatientStoriesSection />
        <FounderSection />
        <PatientTestimonialsSection />
      </main>
      <Footer
        services={footerServices}
        quickLinks={footerQuickLinks}
        description="Advanced dental implant care by experienced Prosthodontist & Implantologist. Restoring confident smiles in Hyderabad."
        ctaHref="#consultation"
        ctaLabel="Book Free Consultation"
      />
    </>
  );
}
