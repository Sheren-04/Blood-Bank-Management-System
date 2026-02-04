import { FileText, Search, Phone } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Submit Request',
    description: 'Fill out the blood request form with patient details and requirements.',
  },
  {
    icon: Search,
    title: 'We Find Donors',
    description: 'Our system instantly searches and notifies matching verified donors in your area.',
  },
  {
    icon: Phone,
    title: 'Get Connected',
    description: 'Receive donor contacts within minutes and coordinate directly for the donation.',
  },
];

export function HowItWorksNeedBlood() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to connect with blood donors quickly
          </p>
        </div>

        <div className="grid grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                <div className="flex flex-col items-center">
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border-4 border-red-600 rounded-full flex items-center justify-center font-bold text-red-600 text-lg shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-6 text-red-300">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
