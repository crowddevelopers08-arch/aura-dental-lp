import { ClientFeedbackTemplate } from '@/components/review/ClientFeedbackTemplate';
import { BRANCHES } from '@/components/review/branches';

const branch = BRANCHES.madeenaguda;

export const metadata = {
  title: 'Share Your Feedback | Aura Dental - Madeenaguda',
  description: 'Tell us what went wrong during your visit to Aura Dental Madeenaguda so we can put it right.',
};

export default function MadeenagudaClientFeedbackPage() {
  return <ClientFeedbackTemplate reviewHref={branch.reviewHref} branchLabel={branch.label} />;
}
