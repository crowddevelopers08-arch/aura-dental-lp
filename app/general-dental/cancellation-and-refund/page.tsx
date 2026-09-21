import { RefundPolicyTemplate } from '@/components/legal/RefundPolicyTemplate';

export const metadata = {
  title: 'Cancellation & Refund Policy | Aura Dental - General Dental Care',
  description: 'How Aura Dental handles appointment cancellations, rescheduling, and refunds for general dental consultations and treatment.',
};

export default function GeneralDentalRefundPage() {
  return (
    <RefundPolicyTemplate
      homeHref="/general-dental"
      basePath="/general-dental"
      backHref="/general-dental"
      backLabel="Back to General Dental"
      introText="This policy explains how appointment cancellations, rescheduling, and refunds are handled for general dental consultations and treatment."
    />
  );
}
