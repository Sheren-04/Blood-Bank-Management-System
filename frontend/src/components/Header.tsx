import { Droplet } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div 
      className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
        onClick={() => navigate('/')}
        className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <Droplet className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="text-xl font-semibold text-gray-900">BloodLife</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-8">
          <button 
          onClick={() => navigate('/')}
          className="text-gray-900 hover:text-red-600 transition font-medium">
            Home
          </button>
          <button 
          onClick={() => navigate('/about')}
          className="text-gray-600 hover:text-red-600 transition font-medium">
            About Us
          </button>
          <button 
           onClick={() => navigate('/why-donate')}
          className="text-gray-600 hover:text-red-600 transition font-medium">
            Why Donate
          </button>
          <button 
            onClick={() => navigate('/become-donor')}
          className="text-gray-600 hover:text-red-600 transition font-medium">
            Become a Donor
          </button>
          <button 
            onClick={() => navigate('/need-blood')}
          className="text-gray-600 hover:text-red-600 transition font-medium">
            Need Blood
          </button>
          <button 
            onClick={() => navigate('/Contact')}
          className="text-gray-600 hover:text-red-600 transition font-medium">
            Contact
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button 
          onClick={() => navigate('/need-blood')}
          variant="outline">Need Blood</Button>
          <Button 
          onClick={() => navigate('/become-donor')}
          variant="primary">Become a Donor</Button>
        </div>
      </div>
    </header>
  );
}
