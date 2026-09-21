import { LegalContactCard, LegalPageShell, LegalSection } from '@/components/legal/LegalPageShell';

type RefundPolicyTemplateProps = {
  homeHref: string;
  basePath?: string;
  backHref: string;
  backLabel: string;
  /** Funnel-specific sentence appended to the intro. */
  introText?: string;
};

export function RefundPolicyTemplate({
  homeHref,
  basePath = '',
  backHref,
  backLabel,
  introText = 'This policy explains how appointment cancellations, rescheduling, and refunds are handled at Aura Dental.',
}: RefundPolicyTemplateProps) {
  return (
    <LegalPageShell
      homeHref={homeHref}
      basePath={basePath}
      currentPath="/cancellation-and-refund"
      title="Cancellation & Refund Policy"
      lastUpdated="September 21, 2026"
      backHref={backHref}
      backLabel={backLabel}
      intro={
        <>
          <p>
            At <strong>Aura Dental</strong>, we want every patient to be clear about what happens if plans change. {introText}
          </p>
          <p>
            This policy applies to consultations, treatment bookings, and any payment made to us online or at our clinics in Madeenaguda and Kondapur, Hyderabad.
          </p>
        </>
      }
    >
      <LegalSection title="1. Cancelling or Rescheduling an Appointment">
        <ul>
          <li>Appointments can be cancelled or rescheduled free of charge by informing us at least <strong>24 hours</strong> before your scheduled slot.</li>
          <li>You may cancel or reschedule by calling the clinic, replying to your confirmation message on WhatsApp, or emailing us.</li>
          <li>Cancellations made less than 24 hours in advance may not be eligible for a refund of any consultation or booking amount paid, as the slot is reserved exclusively for you.</li>
          <li>If we cancel or reschedule your appointment for any reason, you may choose an alternative slot or request a full refund of the amount paid for that appointment.</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. No-Shows">
        <p>
          If you do not attend a confirmed appointment and have not informed us in advance, any consultation or booking amount paid for that appointment is treated as non-refundable. We will, however, help you rebook at the earliest available slot.
        </p>
      </LegalSection>

      <LegalSection title="3. Consultation Fees">
        <ul>
          <li>Consultation fees paid online are fully refundable if cancelled at least 24 hours before the appointment.</li>
          <li>Once the consultation has taken place, the fee is non-refundable, as the service has been delivered.</li>
          <li>Where a consultation is offered free as part of a campaign, no payment is collected and no refund arises.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Booking & Advance Amounts for Treatment">
        <p>
          Treatment such as implants, aligners, crowns, and full-mouth rehabilitation requires a booking amount so that slots, implant components, and laboratory work can be scheduled.
        </p>
        <ul>
          <li><strong>Before any clinical work or lab order begins:</strong> the booking amount is refundable, after deducting any consultation or diagnostic charges already availed.</li>
          <li><strong>After treatment has commenced or materials have been ordered:</strong> the booking amount is adjusted against the work already done and the costs already incurred, and only the unutilised balance is refundable.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Discontinued or Incomplete Treatment">
        <p>
          If you choose to discontinue a multi-sitting treatment midway, a refund will be calculated on the unused portion of your treatment plan after deducting:
        </p>
        <ul>
          <li>The cost of clinical sittings already completed</li>
          <li>Diagnostics such as X-rays, CBCT scans, and scans or impressions already taken</li>
          <li>Custom laboratory work already fabricated or ordered for you</li>
          <li>Implant fixtures, aligner trays, or other components already placed or dispatched</li>
        </ul>
        <p>
          Refunds in such cases are assessed case by case by the treating dentist and confirmed to you in writing before processing.
        </p>
      </LegalSection>

      <LegalSection title="6. Non-Refundable Items">
        <p>The following are not refundable once completed, placed, or fabricated:</p>
        <ul>
          <li>Consultations, examinations, and diagnostic procedures already performed</li>
          <li>Implants already surgically placed</li>
          <li>Custom-made crowns, bridges, dentures, veneers, and aligner trays produced to your prescription</li>
          <li>Completed procedures such as extractions, root canal treatment, scaling, and fillings</li>
          <li>Treatment discontinued because of non-adherence to prescribed aftercare or review schedules</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Failed or Duplicate Online Payments">
        <ul>
          <li>If an online payment fails but the amount is debited from your account, it is usually auto-reversed by your bank within <strong>5 to 7 working days</strong>. No action is needed from our side.</li>
          <li>If a duplicate payment is made for the same service, write to us with the transaction details and the extra amount will be refunded in full.</li>
          <li>If the reversal does not reach you within the stated period, contact us with your transaction ID and we will follow it up with the payment gateway.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. How to Request a Refund">
        <p>To raise a refund request, send us the following by email or WhatsApp:</p>
        <ul>
          <li>Patient name and registered phone number</li>
          <li>Date of appointment or treatment</li>
          <li>Amount paid, payment mode, and transaction or receipt ID</li>
          <li>Reason for the refund request</li>
        </ul>
        <p>
          We acknowledge every request within <strong>2 working days</strong> and confirm the eligible refund amount after review by the treating dentist and our accounts team.
        </p>
      </LegalSection>

      <LegalSection title="9. Refund Processing Time & Method">
        <ul>
          <li>Approved refunds are initiated within <strong>7 working days</strong> of approval.</li>
          <li>Refunds are credited to the <strong>original payment method</strong> used for the transaction. Online payments are returned to the same card, UPI ID, or bank account; cash payments are refunded by bank transfer to an account in the patient&apos;s name.</li>
          <li>Depending on your bank or payment provider, the credit may take a further <strong>5 to 10 working days</strong> to reflect in your statement.</li>
          <li>Any payment gateway or bank charges deducted on the original transaction are not recoverable and may be adjusted in the refund amount.</li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Promotional Offers & Packages">
        <p>
          Amounts paid under discounted packages, limited-period offers, or bundled treatment plans are refunded on the same principles set out above, calculated on the discounted value actually paid rather than the standard list price.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to This Policy">
        <p>
          We may update this Cancellation &amp; Refund Policy from time to time. The revised version will be posted on this page with an updated date and will apply to payments made after that date.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact Us">
        <p>For any cancellation or refund query, please reach out to us:</p>
        <LegalContactCard />
        <p className="mt-3">
          You can also review our <a href={`${basePath}/terms-and-conditions`}>Terms &amp; Conditions</a> and{' '}
          <a href={`${basePath}/privacy-policy`}>Privacy Policy</a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
