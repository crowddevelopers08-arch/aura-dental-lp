import { ThankYouTemplate } from '@/components/legal/ThankYouTemplate';

export const metadata = {
  title: 'Thank You | Aura Dental - Invisible Aligners',
  description: 'Thank you for booking an invisible aligner consultation with Aura Dental. Our smile team will contact you shortly.',
};

export default function InvisibleAlignersThankYouPage() {
  return (
    <ThankYouTemplate
      homeHref="/invisible-aligners"
      backHref="/invisible-aligners"
      backLabel="Back to Invisible Aligners"
      callHref="tel:+917842871414"
      whatsappHref="https://wa.me/917842871414"
      eyebrow="Invisible Aligners Consultation Request Received"
      message="Thank you for choosing Aura Dental. Our smile experts will reach out to you within 30 minutes to confirm your consultation and understand your smile correction goals."
      steps={[
        {
          icon: 'phone_in_talk',
          title: 'Confirmation Call',
          desc: 'Our aligner care team will call you to confirm your appointment time and discuss your smile concerns.',
          iconBg: '#1D4231',
        },
        {
          icon: 'medical_information',
          title: 'Your Smile Assessment',
          desc: 'You will receive guidance on aligner suitability, treatment expectations, and digital smile planning.',
          iconBg: '#D3BB71',
        },
        {
          icon: 'verified',
          title: 'Personalized Aligner Plan',
          desc: 'Receive a tailored invisible aligner treatment roadmap with transparency on duration, follow-ups, and results.',
          iconBg: '#D3BB71',
        },
      ]}
    />
  );
}
