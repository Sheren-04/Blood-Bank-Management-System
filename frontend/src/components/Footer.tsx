import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 fill-current text-red-500" />
              <span className="text-xl font-semibold text-white">LifeBlood</span>
            </div>
            <p className="text-sm mb-4">
              Saving lives through blood donation since 2001. Together, we can make a difference.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Donation Process</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Eligibility</a></li>
              <li><a href="#" className="hover:text-red-500 transition">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Find a Center</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Book Appointment</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Blood Types</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Health & Safety</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Healthcare Ave, Medical District, CA 90210</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>1-800-BLOOD-NOW</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@lifeblood.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>&copy; 2026 LifeBlood. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
