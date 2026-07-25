import { ClientFeedbackTemplate } from '@/components/review/ClientFeedbackTemplate';

export const metadata = {
  title: 'Share Your Feedback | Aura Dental',
  description: 'Tell us what went wrong during your visit to Aura Dental so we can put it right.',
};

export default function ClientFeedbackPage() {
  return <ClientFeedbackTemplate reviewHref="/review" />;
}
