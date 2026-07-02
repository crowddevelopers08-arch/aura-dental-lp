import { AlignerHeader } from '@/components/aligners/AlignerHeader';
import { AlignerHeroSection } from '@/components/aligners/AlignerHeroSection';
import { AlignerLeadFormSection } from '@/components/aligners/AlignerLeadFormSection';
import { AlignerJourneySection } from '@/components/aligners/AlignerJourneySection';
import { AlignerDoctorSection } from '@/components/aligners/AlignerDoctorSection';
import { AlignerTechnologySection } from '@/components/aligners/AlignerTechnologySection';
import { AlignerConditionsSection } from '@/components/aligners/AlignerConditionsSection';
import { AlignerCandidateSection } from '@/components/aligners/AlignerCandidateSection';
import { AlignerBenefitsSection } from '@/components/aligners/AlignerBenefitsSection';
import { AlignerTestimonialVideoSection } from '@/components/aligners/AlignerTestimonialVideoSection';
import { AlignerFAQSection } from '@/components/aligners/AlignerFAQSection';
import { AlignerCtaSection } from '@/components/aligners/AlignerCtaSection';
import { Footer } from '@/components/Footer';

const footerServices = [
  { label: 'Crooked Teeth Correction', href: '/invisible-aligners#conditions' },
  { label: 'Crowded Teeth Alignment', href: '/invisible-aligners#conditions' },
  { label: 'Gapped Teeth Closure', href: '/invisible-aligners#conditions' },
  { label: 'Overbite Correction', href: '/invisible-aligners#conditions' },
  { label: 'Crossbite & Open Bite', href: '/invisible-aligners#conditions' },
];

const footerQuickLinks = [
  { label: 'Your Journey', href: '/invisible-aligners#journey' },
  { label: 'Our Doctor', href: '/invisible-aligners#doctor' },
  { label: 'Technology', href: '/invisible-aligners#technology' },
  { label: 'FAQ', href: '/invisible-aligners#faq' },
  { label: 'Book Consultation', href: '/invisible-aligners#consultation' },
];

export default function InvisibleAlignersPage() {
  return (
    <>
      <AlignerHeader />
      <main>
        <AlignerHeroSection />
        <AlignerConditionsSection />
        <AlignerLeadFormSection />
        <AlignerTestimonialVideoSection />
        <AlignerJourneySection />
        <AlignerDoctorSection />
        <AlignerTechnologySection />
        <AlignerCandidateSection />
        <AlignerBenefitsSection />
        <AlignerFAQSection />
        <AlignerCtaSection />
      </main>
      <Footer
        services={footerServices}
        quickLinks={footerQuickLinks}
        description="Comfortable smile correction with advanced invisible aligners, digital planning, and personalized orthodontic care in Hyderabad."
        ctaHref="/invisible-aligners#consultation"
        ctaLabel="Book Free Consultation"
        privacyHref="/invisible-aligners/privacy-policy"
      />
    </>
  );
}
