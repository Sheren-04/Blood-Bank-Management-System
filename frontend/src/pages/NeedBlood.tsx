import { Header } from '../components/Header';
import { NeedBloodHero } from '../components/need-blood/NeedBloodHero';
import { EmergencyNoticeStrip } from '../components/need-blood/EmergencyNoticeStrip';
import { BloodRequestForm } from '../components/need-blood/BloodRequestForm';
import { HowItWorksNeedBlood } from '../components/need-blood/HowItWorksNeedBlood';
import { SupportHelpline } from '../components/need-blood/SupportHelpline';
import { FooterSection } from '../components/FooterSection';

export default function NeedBlood() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NeedBloodHero />
      <EmergencyNoticeStrip />
      <BloodRequestForm />
      <HowItWorksNeedBlood />
      <SupportHelpline />
      <FooterSection />
    </div>
  );
}
