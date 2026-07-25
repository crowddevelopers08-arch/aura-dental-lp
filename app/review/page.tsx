import { ReviewTemplate } from '@/components/review/ReviewTemplate';

export const metadata = {
  title: 'Rate Your Visit | Aura Dental',
  description: 'Tell us how your visit to Aura Dental went. Your feedback helps us improve our care.',
};

export default function ReviewPage() {
  return (
    <ReviewTemplate
      googleReviewLink="https://g.page/r/CeVzC4gxJ2NtEBM/review"
      feedbackHref="/client-feedback"
    />
  );
}
