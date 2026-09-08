import Script from 'next/script';
import { VslCtaButton } from '@/components/vsl/VslCtaButton';

const NEXT_STEPS = [
  {
    num: '01',
    icon: 'phone_in_talk',
    title: 'Confirmation Call',
    desc: 'Our team will call you to confirm your smile assessment slot and answer any questions before you visit.',
  },
  {
    num: '02',
    icon: 'clinical_notes',
    title: 'Your Smile Assessment',
    desc: 'Clinical assessment, digital evaluation where required, and a discussion of your goals with Dr Siva Nagini.',
  },
  {
    num: '03',
    icon: 'assignment_ind',
    title: 'Your Personalised Plan',
    desc: 'You receive a personalised treatment recommendation, estimated timeline and cost — then you decide.',
  },
];

export function VslThankYouSection() {
  return (
    <section className="flex flex-1 items-center bg-white px-4 py-12 pt-28 sm:px-6 md:px-[60px] md:py-16 md:pt-32">
      <div className="mx-auto w-full max-w-[720px]">

        {/* Confirmation */}
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D3BB71] sm:h-20 sm:w-20">
            <span
              className="material-symbols-outlined text-[38px] text-[#1D4231] sm:text-[46px]"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          </span>

          <span className="mt-6 font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#D3BB71] sm:text-[13px]">
            Assessment Reserved
          </span>

          <h1 className="mt-3 font-heading text-[30px] font-extrabold leading-[1.15] text-[#000000] sm:text-[38px] md:text-[44px]">
            You&rsquo;re <span className="text-[#1D4231]">All Set</span>
          </h1>

          <p className="mt-4 max-w-[560px] font-body font-medium text-[15.5px] leading-[1.85] text-[#000000]/60 sm:text-[17px]">
            Thank you for booking your smile assessment with{' '}
            <strong className="font-bold text-[#1D4231]">Aura Dental</strong>. Our team will be
            in touch shortly to confirm your appointment slot.
          </p>
        </div>

        {/* What happens next */}
        <div className="mt-10 overflow-hidden rounded-[1.25rem] border-2 border-[#D3BB71] bg-white sm:rounded-[1.5rem] md:mt-12">
          <p className="border-b border-[#1D4231]/15 bg-[#DDD5CA]/30 px-5 py-3.5 font-body text-[12px] font-bold uppercase tracking-[0.2em] text-[#1D4231] sm:px-7 sm:text-[13px]">
            What Happens Next
          </p>

          <ul>
            {NEXT_STEPS.map((step, i) => (
              <li
                key={step.num}
                className={`flex items-start gap-4 px-5 py-5 sm:gap-5 sm:px-7 sm:py-6 ${
                  i > 0 ? 'border-t border-[#1D4231]/15' : ''
                }`}
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#1D4231] sm:h-12 sm:w-12">
                  <span
                    className="material-symbols-outlined text-[23px] text-[#D3BB71] sm:text-[25px]"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    {step.icon}
                  </span>
                </span>

                <div className="flex-1">
                  <span className="font-body text-[12px] font-black uppercase tracking-[0.2em] text-[#D3BB71]">
                    Step {step.num}
                  </span>
                  <h2 className="mt-1 font-heading text-[17.5px] font-bold leading-[1.3] text-[#1D4231] sm:text-[19.5px]">
                    {step.title}
                  </h2>
                  <p className="mt-1.5 font-body font-medium text-[14.5px] leading-[1.8] text-[#000000]/60 sm:text-[15.5px]">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center sm:gap-4">
          <a
            href="https://wa.me/917842871414"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[13.5px] font-bold uppercase tracking-[0.13em] text-white transition-colors duration-200 hover:bg-[#1D4231] sm:w-auto sm:px-9 sm:py-4 sm:text-[14.5px]"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>

          <VslCtaButton
            label="Back to the Decision Guide"
            variant="outline-green"
            href="/vsl"
            leadingIcon="arrow_back"
            trailingIcon={null}
            className="w-full sm:w-auto"
          />
        </div>

        {/* Call nudge */}
        <p className="mt-8 text-center font-body font-medium text-[14.5px] text-[#000000]/50 sm:text-[15.5px]">
          Need immediate assistance?{' '}
          <a href="tel:+917842871414" className="font-bold text-[#1D4231] hover:underline">
            Call us now
          </a>
        </p>

      </div>

      {/* Google Ads conversion */}
      <Script id="vsl-google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': 'AW-17425479208/HZA8CPiu6LQcEKjsjvVA',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>
    </section>
  );
}
