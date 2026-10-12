import { ConsultationCtaSection } from '@/components/ConsultationCtaSection';
import { ImplantLeadFormSection } from '@/components/ImplantLeadFormSection';

// Opening banner with the booking form overlapping its bottom edge.
export function HomeHeroSection() {
  return (
    <div className="bg-[#DDD5CA]">
      <ConsultationCtaSection bgClassName="bg-transparent" overlapBottom showButtons={false} variant="home" />
      <ImplantLeadFormSection overlap />
    </div>
  );
}
