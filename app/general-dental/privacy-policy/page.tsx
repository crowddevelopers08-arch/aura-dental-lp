import { PrivacyPolicyTemplate } from '@/components/legal/PrivacyPolicyTemplate';

export const metadata = {
  title: 'Privacy Policy | Aura Dental - General Dental Care',
  description: 'Learn how Aura Dental collects, uses, and protects your information for general dental consultations and treatments.',
};

export default function GeneralDentalPrivacyPolicyPage() {
  return (
    <PrivacyPolicyTemplate
      homeHref="/general-dental"
      backHref="/general-dental"
      backLabel="Back to General Dental"
      titleSuffix="General Dental Care"
      introText="At Aura Dental, your privacy is very important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our general dental care website or enquire about our treatments."
      usageText="Plan and personalize your general dental treatment, check-ups, smile correction, and restorative care"
    />
  );
}
