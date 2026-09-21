import { RefundPolicyTemplate } from '@/components/legal/RefundPolicyTemplate';

export const metadata = {
  title: 'Cancellation & Refund Policy | Aura Dental – Advanced Dental Implant Centre',
  description: 'How Aura Dental handles appointment cancellations, rescheduling, and refunds on consultations and treatment payments.',
};

export default function CancellationAndRefundPage() {
  return (
    <RefundPolicyTemplate
      homeHref="/"
      backHref="/"
      backLabel="Back to Home"
      introText="This policy explains how appointment cancellations, rescheduling, and refunds are handled for consultations and dental implant treatment."
    />
  );
}
