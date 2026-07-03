import { GeneralHeader } from '@/components/general-dental/GeneralHeader';
import { GeneralHeroSection } from '@/components/general-dental/GeneralHeroSection';
import { GeneralLeadFormSection } from '@/components/general-dental/GeneralLeadFormSection';
import { GeneralAboutSection } from '@/components/general-dental/GeneralAboutSection';
import { GeneralTreatmentsSection } from '@/components/general-dental/GeneralTreatmentsSection';
import { GeneralWhyTrustSection } from '@/components/general-dental/GeneralWhyTrustSection';
import { GeneralTechnologySection } from '@/components/general-dental/GeneralTechnologySection';
import { GeneralExperienceSection } from '@/components/general-dental/GeneralExperienceSection';
import { GeneralDoctorSection } from '@/components/general-dental/GeneralDoctorSection';
import { GeneralTestimonialVideoSection } from '@/components/general-dental/GeneralTestimonialVideoSection';
import { GeneralTestimonialReviewsSection } from '@/components/general-dental/GeneralTestimonialReviewsSection';
import { GeneralFAQSection } from '@/components/general-dental/GeneralFAQSection';
import { GeneralCtaSection } from '@/components/general-dental/GeneralCtaSection';
import { Footer } from '@/components/Footer';

const footerServices = [
  { label: 'Invisible Aligners', href: '/general-dental#treatments' },
  { label: 'Dental Implants', href: '/general-dental#treatments' },
  { label: 'Root Canal Treatment', href: '/general-dental#treatments' },
  { label: 'Dental Crowns', href: '/general-dental#treatments' },
  { label: 'Teeth Whitening', href: '/general-dental#treatments' },
];

const footerQuickLinks = [
  { label: 'Our Treatments', href: '/general-dental#treatments' },
  { label: 'Our Doctor', href: '/general-dental#doctor' },
  { label: 'Technology', href: '/general-dental#technology' },
  { label: 'FAQ', href: '/general-dental#faq' },
  { label: 'Book Consultation', href: '/general-dental#consultation' },
];

export default function GeneralDentalPage() {
  return (
    <>
      <GeneralHeader />
      <main>
        <GeneralHeroSection />
        <GeneralTestimonialVideoSection />
        <GeneralTreatmentsSection />
        <GeneralLeadFormSection />
        <GeneralWhyTrustSection />
        <GeneralTechnologySection />
        <GeneralExperienceSection />
        <GeneralDoctorSection />
        <GeneralTestimonialReviewsSection />
        <GeneralFAQSection />
        <GeneralCtaSection />
      </main>
      <Footer
        services={footerServices}
        quickLinks={footerQuickLinks}
        description="Complete dental care for families in Hyderabad, from preventive check-ups to cosmetic and restorative dentistry under one roof."
        ctaHref="/general-dental#consultation"
        ctaLabel="Book Appointment"
        privacyHref="/general-dental/privacy-policy"
      />
    </>
  );
}
