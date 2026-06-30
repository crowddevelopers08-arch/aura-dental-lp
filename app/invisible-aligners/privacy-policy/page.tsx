import { PrivacyPolicyTemplate } from '@/components/legal/PrivacyPolicyTemplate';

export const metadata = {
  title: 'Privacy Policy | Aura Dental - Invisible Aligners',
  description: 'Learn how Aura Dental collects, uses, and protects your information for invisible aligner consultations and smile correction treatments.',
};

export default function InvisibleAlignersPrivacyPolicyPage() {
  return (
    <PrivacyPolicyTemplate
      homeHref="/invisible-aligners"
      backHref="/invisible-aligners"
      backLabel="Back to Invisible Aligners"
      titleSuffix="Invisible Aligner Treatment"
      introText="At Aura Dental, your privacy is very important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our invisible aligners website or enquire about smile correction treatment."
      usageText="Plan and personalize your invisible aligner treatment, smile assessment, and bite correction journey"
    />
  );
}
