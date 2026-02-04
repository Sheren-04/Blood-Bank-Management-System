import { Users, Droplet, MapPin, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Active Donors',
  },
  {
    icon: Droplet,
    value: '150,000+',
    label: 'Lives Saved',
  },
  {
    icon: MapPin,
    value: '200+',
    label: 'Donation Centers',
  },
  {
    icon: Award,
    value: '25 Years',
    label: 'Of Service',
  },
];

export function Stats() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
