import { ReviewTemplate } from '@/components/review/ReviewTemplate';
import { BRANCHES } from '@/components/review/branches';

const branch = BRANCHES.kondapur;

export const metadata = {
  title: 'Rate Your Visit | Aura Dental - Kondapur',
  description: 'Tell us how your visit to Aura Dental Kondapur went. Your feedback helps us improve our care.',
};

export default function KondapurReviewPage() {
  return (
    <ReviewTemplate
      googleReviewLink={branch.googleReviewLink}
      feedbackHref={branch.feedbackHref}
      branchLabel={branch.label}
    />
  );
}
