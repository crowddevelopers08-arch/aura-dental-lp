import { TermsTemplate } from '@/components/legal/TermsTemplate';

export const metadata = {
  title: 'Terms & Conditions | Aura Dental - General Dental Care',
  description: 'The terms that govern your use of the Aura Dental general dental care website, appointments, payments, and treatment.',
};

export default function GeneralDentalTermsPage() {
  return (
    <TermsTemplate
      homeHref="/general-dental"
      basePath="/general-dental"
      backHref="/general-dental"
      backLabel="Back to General Dental"
      introText="These Terms & Conditions govern your use of our website and the general dental care, check-ups, and restorative treatment we provide."
    />
  );
}
