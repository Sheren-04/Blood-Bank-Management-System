import { Button } from './Button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-white via-red-50/30 to-red-50/50 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Donate Blood.<br />
              Save Lives.
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Every donation has the power to save up to three lives. Join our community of heroes and make a lasting impact in someone's life today.
            </p>
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={() => navigate('/become-donor')}
              variant="primary">Become a Donor</Button>
              <Button 
                onClick={() => navigate('/need-blood')}
              variant="secondary">Request Blood</Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1739185069005-8cb46fef2702?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBtZWRpY2FsJTIwc3RhZmYlMjBjbGluaWN8ZW58MXx8fHwxNzY4NzE4NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy blood donor with medical staff"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 top-8 right-8 w-full h-full bg-red-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
