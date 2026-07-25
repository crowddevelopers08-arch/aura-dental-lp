import { ClientFeedbackTemplate } from '@/components/review/ClientFeedbackTemplate';
import { BRANCHES } from '@/components/review/branches';

const branch = BRANCHES.madinaguda;

export const metadata = {
  title: 'Share Your Feedback | Aura Dental - Madinaguda',
  description: 'Tell us what went wrong during your visit to Aura Dental Madinaguda so we can put it right.',
};

export default function MadinagudaClientFeedbackPage() {
  return <ClientFeedbackTemplate reviewHref={branch.reviewHref} branchLabel={branch.label} />;
}
