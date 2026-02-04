import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export function SupportHelpline() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Need Help? We're Available 24/7
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our support team is always ready to assist you with your blood request
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Helpline Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Emergency Helpline
                </h3>
                <p className="text-gray-600 mb-4">
                  Call us anytime for urgent blood requirements
                </p>
                <a 
                  href="tel:1-800-BLOOD-NOW" 
                  className="text-2xl font-bold text-red-600 hover:text-red-700 transition"
                >
                  1-800-BLOOD-NOW
                </a>
              </div>
            </div>
          </div>

          {/* Email Support Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email Support
                </h3>
                <p className="text-gray-600 mb-4">
                  Send us your requirements via email
                </p>
                <a 
                  href="mailto:urgent@bloodlife.org" 
                  className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
                >
                  urgent@bloodlife.org
                </a>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Available 24/7
                </h3>
                <p className="text-gray-600 mb-4">
                  Round-the-clock support for blood requests
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Every day, all year
                </p>
              </div>
            </div>
          </div>

          {/* Live Chat Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-600 mb-4">
                  Instant support via live chat
                </p>
                <button className="text-lg font-semibold text-purple-600 hover:text-purple-700 transition">
                  Start Chat →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-12 max-w-3xl mx-auto bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-yellow-900 mb-1">Important Reminder</p>
              <p className="text-yellow-800 text-sm leading-relaxed">
                While we work hard to connect you with donors, please ensure you're also coordinating with your hospital's blood bank. In critical emergencies, always call 911 or go directly to the nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
