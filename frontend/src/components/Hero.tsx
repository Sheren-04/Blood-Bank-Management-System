import { Heart, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <nav className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 fill-current" />
          <span className="text-xl font-semibold">LifeBlood</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-red-100 transition">About</a>
          <a href="#process" className="hover:text-red-100 transition">How It Works</a>
          <a href="#eligibility" className="hover:text-red-100 transition">Eligibility</a>
          <a href="#contact" className="hover:text-red-100 transition">Contact</a>
        </div>
        <button className="bg-white text-red-600 px-6 py-2 rounded-full hover:bg-red-50 transition">
          Sign In
        </button>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Give Blood, Save Lives
            </h1>
            <p className="text-lg md:text-xl text-red-100 mb-8">
              Every donation can save up to three lives. Join thousands of heroes making a difference in their community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1697192156499-d85cfe1452c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbHxlbnwxfHx8fDE3Njg2OTQxNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Blood donation"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
