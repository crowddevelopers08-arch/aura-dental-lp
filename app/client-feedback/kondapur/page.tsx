import { ClientFeedbackTemplate } from '@/components/review/ClientFeedbackTemplate';
import { BRANCHES } from '@/components/review/branches';

const branch = BRANCHES.kondapur;

export const metadata = {
  title: 'Share Your Feedback | Aura Dental - Kondapur',
  description: 'Tell us what went wrong during your visit to Aura Dental Kondapur so we can put it right.',
};

export default function KondapurClientFeedbackPage() {
  return <ClientFeedbackTemplate reviewHref={branch.reviewHref} branchLabel={branch.label} />;
}
