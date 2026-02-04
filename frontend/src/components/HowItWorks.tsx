import { ClipboardCheck, User, Droplet, Coffee } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Registration',
    description: 'Sign up and complete a brief health questionnaire to ensure you\'re eligible to donate.',
  },
  {
    icon: User,
    title: 'Health Screening',
    description: 'Our medical staff will check your vitals and hemoglobin levels to ensure it\'s safe to donate.',
  },
  {
    icon: Droplet,
    title: 'Donation',
    description: 'Relax for about 10 minutes while you donate blood. Most donors report minimal discomfort.',
  },
  {
    icon: Coffee,
    title: 'Refreshments',
    description: 'Enjoy snacks and drinks in our recovery area. Rest for 10-15 minutes before leaving.',
  },
];

export function HowItWorks() {
  return (
    <div id="process" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Donating blood is a simple four-step process. Here's what to expect when you visit us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-red-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
