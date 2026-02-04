import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { QuickActionCards } from '../components/QuickActionCards';
import { WhyDonationMatters } from '../components/WhyDonationMatters';
import { ImpactStats } from '../components/ImpactStats';
import { HowItWorksSteps } from '../components/HowItWorksSteps';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FinalCTA } from '../components/FinalCTA';
import { FooterSection } from '../components/FooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <QuickActionCards />
      <WhyDonationMatters />
      <ImpactStats />
      <HowItWorksSteps />
      <TestimonialsSection />
      <FinalCTA />
      <FooterSection />
    </div>
  );
}
