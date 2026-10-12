import { OverallVideoTestimonialsSection } from '@/components/overall/OverallVideoTestimonialsSection';
import { OverallReviewsSection } from '@/components/overall/OverallReviewsSection';

// Video testimonials + written reviews shown as one continuous dark-green block.
export function OverallTestimonialsSection() {
  return (
    <div className="bg-[#1D4231]">
      <OverallVideoTestimonialsSection />
      <OverallReviewsSection />
    </div>
  );
}
