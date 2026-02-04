import { Header } from '../components/Header';
import { AboutHero } from '../components/about/AboutHero';
import { OurMission } from '../components/about/OurMission';
import { OurStory } from '../components/about/OurStory';
import { WhyTrustUs } from '../components/about/WhyTrustUs';
import { AboutImpactHighlights } from '../components/about/AboutImpactHighlights';
import { AboutCTA } from '../components/about/AboutCTA';
import { FooterSection } from '../components/FooterSection';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutHero />
      <OurMission />
      <OurStory />
      <WhyTrustUs />
      <AboutImpactHighlights />
      <AboutCTA />
      <FooterSection />
    </div>
  );
}
