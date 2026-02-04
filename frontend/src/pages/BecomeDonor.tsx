import { Header } from '../components/Header';
import { BecomeDonorHero } from '../components/become-donor/BecomeDonorHero';
import { EligibilityCriteria } from '../components/become-donor/EligibilityCriteria';
import { DonationProcessOverview } from '../components/become-donor/DonationProcessOverview';
import { DonorRegistrationForm } from '../components/become-donor/DonorRegistrationForm';
import { TrustSafetyAssurance } from '../components/become-donor/TrustSafetyAssurance';
import { BecomeDonorCTA } from '../components/become-donor/BecomeDonorCTA';
import { FooterSection } from '../components/FooterSection';

export default function BecomeDonor() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BecomeDonorHero />
      <EligibilityCriteria />
      <DonationProcessOverview />
      <DonorRegistrationForm />
      <TrustSafetyAssurance />
      <BecomeDonorCTA />
      <FooterSection />
    </div>
  );
}
