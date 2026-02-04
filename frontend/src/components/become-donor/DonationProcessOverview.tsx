import { UserPlus, Stethoscope, Droplet, Coffee } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Register',
    description: 'Complete registration form',
  },
  {
    icon: Stethoscope,
    title: 'Health Check',
    description: 'Quick health screening',
  },
  {
    icon: Droplet,
    title: 'Donate',
    description: '8-10 minute donation',
  },
  {
    icon: Coffee,
    title: 'Recover',
    description: 'Rest and refreshments',
  },
];

export function DonationProcessOverview() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Donation Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From registration to recovery, we make the process quick and comfortable
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-red-200 via-red-300 to-red-200 hidden lg:block" 
               style={{ left: '12%', right: '12%' }}>
          </div>

          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    {/* Step Badge */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 bg-white border-4 border-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-12 h-12 text-red-600" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
