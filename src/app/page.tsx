import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import {
  AboutSection,
  WhyJoinSection,
  ResponsibilitiesSection,
  EligibilitySection,
  SocialProofSection,
  FAQSection,
  Footer,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <WhyJoinSection />
      <ResponsibilitiesSection />
      <EligibilitySection />
      <SocialProofSection />
      <FAQSection />
      <Footer />
    </main>
  );
}