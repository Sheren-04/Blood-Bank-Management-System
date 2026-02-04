import { Calendar, Weight, Heart, Thermometer, CheckCircle2 } from 'lucide-react';

const criteria = [
  {
    icon: Calendar,
    title: 'Age Requirement',
    description: 'You must be between 17-65 years old. Some locations accept 16 with parental consent.',
  },
  {
    icon: Weight,
    title: 'Minimum Weight',
    description: 'You should weigh at least 110 pounds (50 kg) to safely donate blood.',
  },
  {
    icon: Heart,
    title: 'Good Health',
    description: 'You must be in good general health and feeling well on the day of donation.',
  },
  {
    icon: Thermometer,
    title: 'No Recent Illness',
    description: 'You should be free from cold, flu, or any infection for at least one week.',
  },
  {
    icon: CheckCircle2,
    title: 'Donation Interval',
    description: 'Wait at least 56 days (8 weeks) between whole blood donations.',
  },
];

export function EligibilityCriteria() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Eligibility Criteria
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Before you register, please ensure you meet these basic requirements
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        {criteria.slice(0, 3).map((criterion, index) => {
          const Icon = criterion.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {criterion.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {criterion.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
        {criteria.slice(3).map((criterion, index) => {
          const Icon = criterion.icon;
          return (
            <div
              key={index + 3}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {criterion.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {criterion.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-900">Note:</span> Additional screening will be performed before donation. Some medical conditions may temporarily or permanently defer you from donating.
        </p>
      </div>
    </section>
  );
}
