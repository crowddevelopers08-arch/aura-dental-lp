import { ReviewTemplate } from '@/components/review/ReviewTemplate';
import { BRANCHES } from '@/components/review/branches';

const branch = BRANCHES.madinaguda;

export const metadata = {
  title: 'Rate Your Visit | Aura Dental - Madinaguda',
  description: 'Tell us how your visit to Aura Dental Madinaguda went. Your feedback helps us improve our care.',
};

export default function MadinagudaReviewPage() {
  return (
    <ReviewTemplate
      googleReviewLink={branch.googleReviewLink}
      feedbackHref={branch.feedbackHref}
      branchLabel={branch.label}
    />
  );
}
