import { RefundPolicyTemplate } from '@/components/legal/RefundPolicyTemplate';

export const metadata = {
  title: 'Cancellation & Refund Policy | Aura Dental - Invisible Aligners',
  description: 'How Aura Dental handles appointment cancellations, rescheduling, and refunds for invisible aligner consultations and treatment.',
};

export default function InvisibleAlignersRefundPage() {
  return (
    <RefundPolicyTemplate
      homeHref="/invisible-aligners"
      basePath="/invisible-aligners"
      backHref="/invisible-aligners"
      backLabel="Back to Invisible Aligners"
      introText="This policy explains how appointment cancellations, rescheduling, and refunds are handled for invisible aligner consultations and treatment."
    />
  );
}
