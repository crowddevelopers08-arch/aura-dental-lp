import type { Metadata } from 'next';
import ThankYouPage from '@/app/thank-you/page';

// Separate URL so paid /overall bookings can be tracked on their own;
// the content is the shared thank-you page.
export const metadata: Metadata = {
  title: 'Booking Confirmed | Aura Dental',
  description: 'Thank you for booking your consultation with Aura Dental. Our team will call you shortly to confirm your slot.',
  robots: { index: false, follow: false },
};

export default ThankYouPage;
