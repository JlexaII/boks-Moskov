import { HeroSection } from "@/components/sections/hero-section"
import { PinnedStorySection } from "@/components/sections/pinned-story-section"
import { CoachesSection } from "@/components/sections/coaches-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { BookingSection } from "@/components/sections/booking-section"
import { StickyBottomBar } from "@/components/sticky-bottom-bar"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen">
        <HeroSection />
        <PinnedStorySection />
        <CoachesSection />
        <TestimonialsSection />
        <BookingSection />
        <StickyBottomBar />
      </main>
    </SmoothScrollProvider>
  )
}
