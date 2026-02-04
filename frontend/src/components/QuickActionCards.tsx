import { Search, Heart, ClipboardCheck, Phone } from 'lucide-react';
import path from 'path';
import { useNavigate } from 'react-router-dom';

const actions = [
  {
    icon: Search,
    title: 'Find Blood',
    description: 'Search blood availability',
    path: '/need-blood',
  },
  {
    icon: Heart,
    title: 'Become a Donor',
    description: 'Register to donate',
    path: '/become-donor',
  },
  {
    icon: ClipboardCheck,
    title: 'Eligibility',
    description: 'Check if you can donate',
    path: '/why-donate',
  },
  {
    icon: Phone,
    title: 'Emergency Contact',
    description: '24/7 helpline support',
    path: '/contact',
  },
];

export function QuickActionCards() {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1440px] mx-auto px-8 -mt-12 relative z-10">
      <div className="grid grid-cols-4 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              onClick={() => navigate(action.path)}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
