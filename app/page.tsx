import { Header } from '@/components/Header';
import { HeroFormSection } from '@/components/HeroFormSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FounderSection } from '@/components/FounderSection';
import { TreatmentsSection } from '@/components/TreatmentsSection';
import { ProgramsSection } from '@/components/ProgramsSection';
import { WhatYoullUnderstandSection } from '@/components/WhatYoullUnderstandSection';
import { WhyChooseSection } from '@/components/WhyChooseSection';
import { FAQSection } from '@/components/FAQSection';
import { ConsultationCtaSection } from '@/components/ConsultationCtaSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroFormSection />
        <HowItWorksSection />
        <FounderSection />
        <TreatmentsSection />
        <ProgramsSection />
        <WhatYoullUnderstandSection />
        <WhyChooseSection />
        <FAQSection />
        <ConsultationCtaSection />
      </main>
      <Footer />
    </>
  );
}
