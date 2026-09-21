import type { Metadata } from 'next';
import { TermsTemplate } from '@/components/legal/TermsTemplate';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Aura Dental – Dental Implant Decision Guide',
  description:
    'The terms that govern your use of the Aura Dental decision guide, smile assessment bookings, payments, and treatment.',
};

export default function VslTermsPage() {
  return (
    <TermsTemplate
      homeHref="/vsl"
      basePath="/vsl"
      backHref="/vsl"
      backLabel="Back to the Decision Guide"
      introText="These Terms & Conditions govern your use of our dental implant decision guide, the smile assessment you reserve through it, and the treatment we provide."
    />
  );
}
