import { UserPlus, CheckCircle, Droplet, Users } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Register',
    description: 'Create an account and complete your profile',
  },
  {
    icon: CheckCircle,
    title: 'Get Verified',
    description: 'Complete health screening and eligibility check',
  },
  {
    icon: Droplet,
    title: 'Donate Blood',
    description: 'Visit a center and make your donation',
  },
  {
    icon: Users,
    title: 'Save Lives',
    description: 'Your donation helps patients in need',
  },
];

export function HowItWorksSteps() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Becoming a blood donor is easy. Follow these simple steps to start saving lives
        </p>
      </div>

      <div className="relative">
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
                  {/* Step Number Badge */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon className="w-14 h-14 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border-4 border-red-600 rounded-full flex items-center justify-center font-bold text-red-600 text-lg shadow-md">
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
    </section>
  );
}
