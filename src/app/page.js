import Hero from "@/components/layout/Hero";
import FeaturedFacilities from "@/components/layout/FeaturedFacilities";
import PageTransition from "@/components/layout/PageTransition";

export default function Home() {
  return (
    <PageTransition className="flex-1">
      <Hero />
      <FeaturedFacilities />
    </PageTransition>
  );
}
