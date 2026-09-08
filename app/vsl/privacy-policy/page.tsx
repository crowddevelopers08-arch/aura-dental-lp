import type { Metadata } from 'next';
import { PrivacyPolicyTemplate } from '@/components/legal/PrivacyPolicyTemplate';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aura Dental – Dental Implant Decision Guide',
  description:
    'Learn how Aura Dental collects, uses, and protects your information when you watch the dental implant decision guide or reserve a smile assessment.',
};

export default function VslPrivacyPolicyPage() {
  return (
    <PrivacyPolicyTemplate
      homeHref="/vsl"
      backHref="/vsl"
      backLabel="Back to the Decision Guide"
      titleSuffix="Your Smile Assessment"
      introText="At Aura Dental, your privacy is very important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you watch our dental implant decision guide, complete the self-check, or reserve a smile assessment with us."
      usageText="Assess your implant suitability and prepare your personalised treatment recommendation, estimated timeline, and cost"
    />
  );
}
