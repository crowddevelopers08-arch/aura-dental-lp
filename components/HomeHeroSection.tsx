import { OverallBannerSection } from '@/components/overall/OverallHeroSection';
import { ImplantLeadFormSection } from '@/components/ImplantLeadFormSection';

// Opening banner slider (same as /overall) with the free booking form overlapping its bottom edge.
export function HomeHeroSection() {
  return (
    <div className="bg-[#DDD5CA]">
      <OverallBannerSection />
      <ImplantLeadFormSection overlap />
    </div>
  );
}
