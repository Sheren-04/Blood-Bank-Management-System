import { Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const reasons = [
  'Blood cannot be manufactured – it can only come from donors',
  'Every 2 seconds, someone needs blood in the United States',
  'A single donation can potentially save up to three lives',
  'Only 3% of age-eligible people donate blood yearly',
  'Blood is essential for surgeries, cancer treatment, chronic illnesses',
  'Donated blood has a limited shelf life and constant supply is needed',
];

export function WhyDonationMatters() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="grid grid-cols-2 gap-16 items-center">
        {/* Left Side - Illustration */}
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1695048441269-41b4d75351c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3Njg1OTM0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Blood donation illustration"
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </div>

        {/* Right Side - Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Blood Donation Matters
          </h2>
          
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-red-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>

          <a href="/why-donate" className="inline-block text-red-600 font-medium hover:text-red-700 transition pt-2">
            Learn More →
          </a>
        </div>
      </div>
    </section>
  );
}
