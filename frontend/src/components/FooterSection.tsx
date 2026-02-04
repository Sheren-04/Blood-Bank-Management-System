import { Droplet, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Droplet className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-xl font-semibold text-white">BloodLife</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Connecting donors with those in need. Together, we save lives through the gift of blood donation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-400 hover:text-red-500 transition text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/why-donate" className="text-gray-400 hover:text-red-500 transition text-sm">
                  Why Donate Blood
                </a>
              </li>
              <li>
                <a href="/become-donor" className="text-gray-400 hover:text-red-500 transition text-sm">
                  Become a Donor
                </a>
              </li>
              <li>
                <a href="/need-blood" className="text-gray-400 hover:text-red-500 transition text-sm">
                  Request Blood
                </a>
              </li>
              <li>
                <a href="/become-donor" className="text-gray-400 hover:text-red-500 transition text-sm">
                  Eligibility Criteria
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition text-sm">
                  Find a Blood Bank
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  123 Healthcare Avenue<br />Medical District, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  +1 (800) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  info@bloodlife.org
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Mon - Sat: 8:00 AM - 8:00 PM<br />
                  Sunday: 9:00 AM - 5:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency Column */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Emergency</h3>
            <div className="bg-red-600 rounded-xl p-6 text-center">
              <div className="text-sm text-red-100 mb-2">24/7 Emergency Helpline</div>
              <div className="text-2xl font-bold text-white mb-4">911</div>
              <div className="text-xs text-red-100 leading-relaxed">
                For urgent blood requirements, call our emergency hotline anytime
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex items-center justify-between text-sm">
          <div className="text-gray-400">
            © 2026 BloodLife. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-red-500 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
