import { Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CallToAction() {
  return (
    <div className="relative py-20 bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1628246987032-166e3280ba8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwaGFuZHMlMjBoZWxwaW5nfGVufDF8fHx8MTc2ODcxODA2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Healthcare"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Save Lives?
        </h2>
        <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
          Join our community of blood donors today. Schedule your appointment and become someone's hero.
        </p>
        <button className="bg-white text-red-600 px-10 py-4 rounded-full font-semibold hover:bg-red-50 transition inline-flex items-center gap-2 text-lg">
          <Calendar className="w-6 h-6" />
          Schedule Your Donation
        </button>
        
        <div className="mt-12 pt-12 border-t border-red-500/30">
          <p className="text-red-100 mb-4">Emergency blood needed?</p>
          <a href="tel:1-800-BLOOD-NOW" className="text-2xl font-bold hover:text-red-100 transition">
            1-800-BLOOD-NOW
          </a>
        </div>
      </div>
    </div>
  );
}
