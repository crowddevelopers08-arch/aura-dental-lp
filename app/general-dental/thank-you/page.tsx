import { ThankYouTemplate } from '@/components/legal/ThankYouTemplate';

export const metadata = {
  title: 'Thank You | Aura Dental - General Dental Care',
  description: 'Thank you for booking a general dental consultation with Aura Dental. Our team will contact you shortly.',
};

export default function GeneralDentalThankYouPage() {
  return (
    <ThankYouTemplate
      homeHref="/general-dental"
      backHref="/general-dental"
      backLabel="Back to General Dental"
      callHref="tel:+917842871414"
      whatsappHref="https://wa.me/917842871414"
      eyebrow="General Dental Consultation Request Received"
      message="Thank you for choosing Aura Dental. Our dental team will reach out to you within 30 minutes to confirm your consultation and better understand your dental concerns."
      steps={[
        {
          icon: 'phone_in_talk',
          title: 'Confirmation Call',
          desc: 'Our dental team will call you to confirm your appointment time and understand your concern in detail.',
          iconBg: '#1D4231',
        },
        {
          icon: 'medical_information',
          title: 'Your Dental Consultation',
          desc: 'You will receive a detailed evaluation with treatment guidance, oral health recommendations, and next steps.',
          iconBg: '#D3BB71',
        },
        {
          icon: 'verified',
          title: 'Personalized Treatment Plan',
          desc: 'Receive a customized dental care plan with clarity on treatment options, timelines, and expected outcomes.',
          iconBg: '#D3BB71',
        },
      ]}
    />
  );
}
