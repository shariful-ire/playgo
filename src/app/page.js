import Hero from "@/components/layout/Hero";
import FeaturedFacilities from "@/components/layout/FeaturedFacilities";
import HowItWorks from "@/components/layout/HowItWorks";
import StatsSection from "@/components/layout/StatsSection";
import PageTransition from "@/components/layout/PageTransition";

export default function Home() {
  return (
    <PageTransition className="flex-1">
      <Hero />
      <FeaturedFacilities />
      <HowItWorks />
      <StatsSection />
    </PageTransition>
  );
}
