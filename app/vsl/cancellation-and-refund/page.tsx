import type { Metadata } from 'next';
import { RefundPolicyTemplate } from '@/components/legal/RefundPolicyTemplate';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Aura Dental – Dental Implant Decision Guide',
  description:
    'How Aura Dental handles cancellations, rescheduling, and refunds for smile assessments and dental implant treatment.',
};

export default function VslRefundPage() {
  return (
    <RefundPolicyTemplate
      homeHref="/vsl"
      basePath="/vsl"
      backHref="/vsl"
      backLabel="Back to the Decision Guide"
      introText="This policy explains how cancellations, rescheduling, and refunds are handled for your smile assessment and any implant treatment you go ahead with."
    />
  );
}
