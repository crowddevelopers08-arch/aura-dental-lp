import { ReviewTemplate } from '@/components/review/ReviewTemplate';
import { BRANCHES } from '@/components/review/branches';

const branch = BRANCHES.madeenaguda;

export const metadata = {
  title: 'Rate Your Visit | Aura Dental - Madeenaguda',
  description: 'Tell us how your visit to Aura Dental Madeenaguda went. Your feedback helps us improve our care.',
};

export default function MadeenagudaReviewPage() {
  return (
    <ReviewTemplate
      googleReviewLink={branch.googleReviewLink}
      feedbackHref={branch.feedbackHref}
      branchLabel={branch.label}
    />
  );
}
