import { LegalContactCard, LegalPageShell, LegalSection } from '@/components/legal/LegalPageShell';

type TermsTemplateProps = {
  homeHref: string;
  basePath?: string;
  backHref: string;
  backLabel: string;
  /** Funnel-specific sentence appended to the intro. */
  introText?: string;
};

export function TermsTemplate({
  homeHref,
  basePath = '',
  backHref,
  backLabel,
  introText = 'These Terms & Conditions govern your use of our website and the dental services we provide.',
}: TermsTemplateProps) {
  return (
    <LegalPageShell
      homeHref={homeHref}
      basePath={basePath}
      currentPath="/terms-and-conditions"
      title="Terms & Conditions"
      lastUpdated="September 21, 2026"
      backHref={backHref}
      backLabel={backLabel}
      intro={
        <>
          <p>
            Welcome to <strong>Aura Dental</strong>. {introText} By accessing this website, submitting an enquiry, booking an appointment, or making a payment, you agree to be bound by these Terms &amp; Conditions.
          </p>
          <p>
            If you do not agree with any part of these terms, please do not use this website or our services.
          </p>
        </>
      }
    >
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By using this website or availing our dental services, you confirm that you are at least 18 years of age, or that you are accessing our services with the consent and supervision of a parent or legal guardian, and that the information you provide to us is accurate and complete.
        </p>
      </LegalSection>

      <LegalSection title="2. About Our Services">
        <p>
          Aura Dental operates dental clinics in Madeenaguda and Kondapur, Hyderabad, Telangana, offering services that include general dentistry, dental implants, invisible aligners, cosmetic dentistry, and restorative treatment.
        </p>
        <p>
          All treatment is delivered by qualified dental professionals. The scope, duration, and suitability of any treatment is determined only after a clinical examination and, where required, diagnostic imaging.
        </p>
      </LegalSection>

      <LegalSection title="3. Website Content Is Not Medical Advice">
        <p>
          The information published on this website, including treatment descriptions, before-and-after images, videos, blog content, and FAQs, is provided for general awareness only. It is <strong>not</strong> a substitute for a professional dental consultation, diagnosis, or treatment plan.
        </p>
        <p>
          You should not delay seeking, or disregard, professional dental advice because of anything you have read or seen on this website. Any reliance you place on such information is strictly at your own risk.
        </p>
      </LegalSection>

      <LegalSection title="4. Appointments & Consultations">
        <ul>
          <li>Appointment requests submitted through this website are enquiries, not confirmed bookings. An appointment is confirmed only once our team contacts you and allots a slot.</li>
          <li>Please arrive at least 10 minutes before your scheduled time. Arriving late may shorten your appointment or require rescheduling.</li>
          <li>We reserve the right to reschedule an appointment due to clinical emergencies, doctor unavailability, or other unforeseen circumstances. We will notify you at the earliest and offer the next available slot.</li>
          <li>Promotional offers, free consultations, and discounted packages are valid only for the period stated in the campaign and may be withdrawn or modified at any time.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Treatment Plans & Cost Estimates">
        <p>
          Any cost shared before a clinical examination is an indicative estimate only. The final treatment plan and cost are confirmed after examination and diagnostics.
        </p>
        <p>
          Treatment plans may need to be revised mid-course based on healing response, bone condition, oral hygiene, or other clinical findings. Where a revision affects the cost, we will inform you and seek your consent before proceeding.
        </p>
      </LegalSection>

      <LegalSection title="6. Fees & Payments">
        <ul>
          <li>All fees are quoted in Indian Rupees (INR) and are payable as per the schedule agreed at the time of treatment planning.</li>
          <li>Online payments are processed through a secure third-party payment gateway. We do not store your card, UPI, or net-banking credentials on our servers.</li>
          <li>Treatment involving multiple sittings may require a booking amount or stage-wise payments before the corresponding stage begins.</li>
          <li>Laboratory-fabricated components such as crowns, dentures, and aligner trays are ordered only after the applicable payment is received.</li>
          <li>You are responsible for any bank, gateway, or currency conversion charges levied by your payment provider.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Cancellations & Refunds">
        <p>
          Cancellations, rescheduling, and refunds are governed by our{' '}
          <a href={`${basePath}/cancellation-and-refund`}>Cancellation &amp; Refund Policy</a>, which forms part of these Terms &amp; Conditions.
        </p>
      </LegalSection>

      <LegalSection title="8. Patient Responsibilities">
        <ul>
          <li>Disclose your complete medical history, current medications, allergies, and any existing conditions before treatment begins.</li>
          <li>Follow all pre-treatment and post-treatment care instructions provided by your dentist.</li>
          <li>Attend scheduled review and maintenance appointments, which are essential to the success of implants and aligner treatment.</li>
          <li>Maintain the oral hygiene standards advised by your dental team.</li>
        </ul>
        <p>
          Outcomes may be adversely affected, and any applicable warranty on treatment may be void, if these responsibilities are not met.
        </p>
      </LegalSection>

      <LegalSection title="9. Treatment Outcomes">
        <p>
          Dentistry is not an exact science. While our team follows established clinical protocols and uses quality materials, we cannot guarantee a specific result. Outcomes vary between patients based on bone quality, healing capacity, general health, habits such as smoking, and adherence to aftercare.
        </p>
        <p>
          Testimonials, reviews, and result images shown on this website reflect individual experiences and should not be taken as a promise of similar results in your case.
        </p>
      </LegalSection>

      <LegalSection title="10. Communications & Marketing">
        <p>
          By sharing your phone number or email address, you consent to being contacted by our team through calls, SMS, WhatsApp, or email regarding your enquiry, appointments, and follow-up care, including on numbers registered under DND.
        </p>
        <p>
          Promotional messages are sent only where you have consented, and you may opt out at any time by replying to the message or writing to us.
        </p>
      </LegalSection>

      <LegalSection title="11. Intellectual Property">
        <p>
          All content on this website, including text, logos, graphics, photographs, videos, and page design, is the property of Aura Dental or its licensors and is protected under applicable intellectual property laws.
        </p>
        <p>
          You may not copy, reproduce, republish, or distribute any part of this website for commercial purposes without our prior written permission.
        </p>
      </LegalSection>

      <LegalSection title="12. Third-Party Links & Services">
        <p>
          This website may link to or embed third-party services such as Google Maps, Google Reviews, social media platforms, video hosting, and payment gateways. We do not control and are not responsible for the content, policies, or availability of these services.
        </p>
      </LegalSection>

      <LegalSection title="13. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Aura Dental shall not be liable for any indirect, incidental, or consequential loss arising from your use of this website, from reliance on information published on it, or from interruptions in website availability.
        </p>
        <p>
          Nothing in these terms limits our liability for our clinical duty of care, or any other liability that cannot be excluded under applicable law.
        </p>
      </LegalSection>

      <LegalSection title="14. Privacy">
        <p>
          Your personal and health information is handled in accordance with our{' '}
          <a href={`${basePath}/privacy-policy`}>Privacy Policy</a>, which explains what we collect, how we use it, and the rights available to you.
        </p>
      </LegalSection>

      <LegalSection title="15. Governing Law & Jurisdiction">
        <p>
          These Terms &amp; Conditions are governed by the laws of India. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts at Hyderabad, Telangana.
        </p>
      </LegalSection>

      <LegalSection title="16. Changes to These Terms">
        <p>
          We may revise these Terms &amp; Conditions from time to time. The revised version will be posted on this page with an updated date. Your continued use of our website or services after such changes constitutes acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="17. Contact Us">
        <p>For any questions about these Terms &amp; Conditions, please reach out to us:</p>
        <LegalContactCard />
      </LegalSection>
    </LegalPageShell>
  );
}
