import { Header } from '../components/Header';
import { ContactHero } from '../components/contact/ContactHero';
import { ContactInfoCards } from '../components/contact/ContactInfoCards';
import { ContactForm } from '../components/contact/ContactForm';
import { EmergencyContactNotice } from '../components/contact/EmergencyContactNotice';
import { FooterSection } from '../components/FooterSection';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ContactHero />
      <ContactInfoCards />
      <ContactForm />
      <EmergencyContactNotice />
      <FooterSection />
    </div>
  );
}
