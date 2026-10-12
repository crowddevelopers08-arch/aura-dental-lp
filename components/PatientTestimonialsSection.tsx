import { VideoTestimonialsSection } from '@/components/VideoTestimonialsSection';
import { TestimonialReviewsSection } from '@/components/TestimonialReviewsSection';

// Video testimonials + written reviews shown as one continuous dark-green block.
export function PatientTestimonialsSection() {
  return (
    <div className="bg-[#1D4231]">
      <VideoTestimonialsSection />
      <TestimonialReviewsSection />
    </div>
  );
}
