import type { Metadata } from 'next';
import { VslHeader } from '@/components/vsl/VslHeader';
import { VslThankYouSection } from '@/components/vsl/VslThankYouSection';
import { VslFooter } from '@/components/vsl/VslFooter';

export const metadata: Metadata = {
  title: 'Your Smile Assessment Is Reserved | Aura Dental',
  description:
    'Thank you for reserving your smile assessment with Aura Dental. Our team will be in touch shortly to confirm your appointment slot.',
  robots: { index: false, follow: false },
};

export default function VslThankYouPage() {
  return (
    <>
      <VslHeader ctaHref="/vsl" ctaLabel="Back to the Guide" />
      <main className="flex min-h-screen flex-col">
        <VslThankYouSection />
      </main>
      <VslFooter hasStickyCta={false} />
    </>
  );
}
