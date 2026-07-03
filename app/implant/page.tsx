import { Header } from '@/components/Header';
import { HeroFormSection } from '@/components/HeroFormSection';
import { HeroLeadFormSection } from '@/components/HeroLeadFormSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FounderSection } from '@/components/FounderSection';
import { TreatmentsSection } from '@/components/TreatmentsSection';
import { ProgramsSection } from '@/components/ProgramsSection';
import { WhatYoullUnderstandSection } from '@/components/WhatYoullUnderstandSection';
import { WhyChooseSection } from '@/components/WhyChooseSection';
import { TestimonialVideoSection } from '@/components/TestimonialVideoSection';
import { TestimonialReviewsSection } from '@/components/TestimonialReviewsSection';
import { FAQSection } from '@/components/FAQSection';
import { ConsultationCtaSection } from '@/components/ConsultationCtaSection';
import { Footer } from '@/components/Footer';

const footerServices = [
  { label: 'Single Tooth Implant', href: '/#services' },
  { label: 'Multiple Teeth Implants', href: '/#services' },
  { label: 'Full Mouth Dental Implants', href: '/#services' },
  { label: 'All-on-4 Dental Implants', href: '/#services' },
  { label: 'Implant-Supported Dentures', href: '/#services' },
];

const footerQuickLinks = [
  { label: 'Our Procedure', href: '/#procedure' },
  { label: 'Our Doctor', href: '/#doctor' },
  { label: 'Technology', href: '/#technology' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Book Consultation', href: '/#consultation' },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroFormSection />
        <TestimonialVideoSection />
        <ProgramsSection />
        <HeroLeadFormSection />
        <HowItWorksSection />
        <FounderSection />
        <TreatmentsSection />
        <WhatYoullUnderstandSection />
        <WhyChooseSection />
        <TestimonialReviewsSection />
        <FAQSection />
        <ConsultationCtaSection />
      </main>
      <Footer
        services={footerServices}
        quickLinks={footerQuickLinks}
        description="Advanced dental implant care by experienced Prosthodontist & Implantologist. Restoring confident smiles in Hyderabad."
        ctaHref="/#consultation"
        ctaLabel="Book Free Consultation"
      />
    </>
  );
}
