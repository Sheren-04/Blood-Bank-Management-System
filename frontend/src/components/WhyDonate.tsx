import { Heart, Clock, Shield, Users } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Save Lives',
    description: 'One donation can save up to three lives. Be a hero in your community.',
  },
  {
    icon: Clock,
    title: 'Quick & Easy',
    description: 'The entire process takes about an hour, with donation time of just 10 minutes.',
  },
  {
    icon: Shield,
    title: 'Health Check',
    description: 'Free mini health screening including blood pressure, hemoglobin, and more.',
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'Join a community of caring individuals making a real difference.',
  },
];

export function WhyDonate() {
  return (
    <div id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Donate Blood?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Blood donation is a simple act that can make an extraordinary difference in someone's life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
