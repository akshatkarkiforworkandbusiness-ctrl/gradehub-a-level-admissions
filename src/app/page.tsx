import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { ProgressDashboard } from "@/components/landing/progress-dashboard";
import { FeaturesShowcase } from "@/components/landing/features-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FinalCta } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <div className="bg-bg-page">
      <Hero />
      <Stats />
      <ProgressDashboard />
      <FeaturesShowcase />
      <HowItWorks />
      <FinalCta />
    </div>
  );
}
