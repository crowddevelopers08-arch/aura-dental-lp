import { TermsTemplate } from '@/components/legal/TermsTemplate';

export const metadata = {
  title: 'Terms & Conditions | Aura Dental – Advanced Dental Implant Centre',
  description: 'The terms that govern your use of the Aura Dental website, appointments, payments, and dental treatment.',
};

export default function TermsAndConditionsPage() {
  return (
    <TermsTemplate
      homeHref="/"
      backHref="/"
      backLabel="Back to Home"
      introText="These Terms & Conditions govern your use of our website and the dental implant and general dental services we provide."
    />
  );
}
