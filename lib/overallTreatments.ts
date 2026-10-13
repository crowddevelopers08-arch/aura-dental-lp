// Treatment concerns offered by the home page (`dental-overall`) and /overall
// (`dental-overall-paid`) booking forms. Each maps to the TeleCRM "Treatment Type"
// value the lead is filed under — the same values the other landing pages use.
// Keep in sync with OVERALL_TREATMENTS in google-apps-script/Code.gs.
export const OVERALL_TREATMENTS = [
  { concern: 'Teeth Scaling', treatmentType: 'General Dental' },
  { concern: 'Root Canal Treatment', treatmentType: 'General Dental' },
  { concern: 'Dental Implants', treatmentType: 'Dental Implants' },
  { concern: 'Braces & Aligners', treatmentType: 'Invisible Aligners' },
  { concern: 'General Consultation', treatmentType: 'General Dental' },
] as const;

export const OVERALL_TREATMENT_CONCERNS: string[] = OVERALL_TREATMENTS.map((t) => t.concern);

const OVERALL_FORM_NAMES = ['dental-overall', 'dental-overall-paid'];

export function isOverallForm(formName: string | undefined) {
  return OVERALL_FORM_NAMES.includes((formName || '').trim().toLowerCase());
}

/** TeleCRM "Treatment Type" for an overall-form concern; General Dental if unrecognised. */
export function overallTreatmentType(concern: string | undefined) {
  const match = OVERALL_TREATMENTS.find((t) => t.concern === (concern || '').trim());
  return match ? match.treatmentType : 'General Dental';
}
