import { HeartPulse, Activity, Smile, Award } from 'lucide-react';

const benefits = [
  {
    icon: HeartPulse,
    title: 'Free Health Checkup',
    description: 'Every donation includes a mini physical examination, blood pressure check, hemoglobin test, and screening for various conditions at no cost.',
  },
  {
    icon: Activity,
    title: 'Reduces Iron Overload',
    description: 'Regular donation helps reduce excess iron in your blood, which can lower the risk of heart disease and improve cardiovascular health.',
  },
  {
    icon: Smile,
    title: 'Emotional Satisfaction',
    description: 'Experience the profound joy and fulfillment of knowing your simple act has potentially saved up to three lives.',
  },
  {
    icon: Award,
    title: 'Stimulates Blood Production',
    description: 'Your body naturally replenishes donated blood within 24-48 hours, promoting healthy blood cell production and circulation.',
  },
];

export function HealthBenefits() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Health Benefits for Donors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Donating blood isn't just good for others—it's beneficial for you too
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
