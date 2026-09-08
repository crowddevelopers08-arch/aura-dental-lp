import type { Metadata } from 'next';
import { VslHeader } from '@/components/vsl/VslHeader';
import { VslHeroSection } from '@/components/vsl/VslHeroSection';
import { VslPatientStoriesSection } from '@/components/vsl/VslPatientStoriesSection';
import { VslUspBannerSection } from '@/components/vsl/VslUspBannerSection';
import { VslSelfCheckSection } from '@/components/vsl/VslSelfCheckSection';
import { VslSpecialistSection } from '@/components/vsl/VslSpecialistSection';
import { VslAssessmentStepsSection } from '@/components/vsl/VslAssessmentStepsSection';
import { VslFaqSection } from '@/components/vsl/VslFaqSection';
import { VslFinalCtaSection } from '@/components/vsl/VslFinalCtaSection';
import { VslStickyCta } from '@/components/vsl/VslStickyCta';
import { VslFooter } from '@/components/vsl/VslFooter';

export const metadata: Metadata = {
  title: 'Before You Choose Dental Implants, Watch This First | Aura Dental',
  description:
    'Dr Siva Nagini (prosthodontist & implantologist) shares key factors for selecting an implant, covering suitability, options, planning, and care. Take the 30-second self-check and reserve your smile assessment.',
};

export default function VslPage() {
  return (
    <>
      <VslHeader />
      <main>
        <VslHeroSection />
        <VslPatientStoriesSection />
        <VslUspBannerSection />
        <VslSelfCheckSection />
        <VslSpecialistSection />
        <VslAssessmentStepsSection />
        <VslFaqSection />
        <VslFinalCtaSection />
      </main>
      <VslFooter />
      <VslStickyCta />
    </>
  );
}
