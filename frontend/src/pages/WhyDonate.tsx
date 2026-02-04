import React from 'react';
import { Header } from "../components/Header";
import { WhyDonateHero } from "../components/why-donate/WhyDonateHero";
import { WhyBloodIsNeeded } from "../components/why-donate/WhyBloodIsNeeded";
import { WhoBenefits } from "../components/why-donate/WhoBenefits";
import { MythsVsFacts } from "../components/why-donate/MythsVsFacts";
import { HealthBenefits } from "../components/why-donate/HealthBenefits";
import { EmergencyNeedHighlight } from "../components/why-donate/EmergencyNeedHighlight";
import { WhyDonateCTA } from "../components/why-donate/WhyDonateCTA";
import { FooterSection } from "../components/FooterSection";

export default function WhyDonate() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhyDonateHero />
      <WhyBloodIsNeeded />
      <WhoBenefits />
      <MythsVsFacts />
      <HealthBenefits />
      <EmergencyNeedHighlight />
      <WhyDonateCTA />
      <FooterSection />
    </div>
  );
}
