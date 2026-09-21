import { TermsTemplate } from '@/components/legal/TermsTemplate';

export const metadata = {
  title: 'Terms & Conditions | Aura Dental - Invisible Aligners',
  description: 'The terms that govern your use of the Aura Dental invisible aligners website, appointments, payments, and treatment.',
};

export default function InvisibleAlignersTermsPage() {
  return (
    <TermsTemplate
      homeHref="/invisible-aligners"
      basePath="/invisible-aligners"
      backHref="/invisible-aligners"
      backLabel="Back to Invisible Aligners"
      introText="These Terms & Conditions govern your use of our website and the invisible aligner and smile correction treatment we provide."
    />
  );
}
