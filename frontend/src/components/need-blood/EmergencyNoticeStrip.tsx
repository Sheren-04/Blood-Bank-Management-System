import { AlertCircle, Phone } from 'lucide-react';

export function EmergencyNoticeStrip() {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border-y border-orange-200">
      <div className="max-w-[1440px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">Life-Threatening Emergency?</p>
              <p className="text-sm text-gray-600">For critical situations, please call 911 or visit the nearest emergency room immediately.</p>
            </div>
          </div>
          <a 
            href="tel:911" 
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-md"
          >
            <Phone className="w-5 h-5" />
            Emergency: 911
          </a>
        </div>
      </div>
    </div>
  );
}
