import { ShieldCheck, Syringe, Lock } from 'lucide-react';

const assurances = [
  {
    icon: ShieldCheck,
    title: 'Safe Donation Process',
    description: 'Our medical professionals follow strict safety protocols to ensure your comfort and well-being throughout the donation process.',
  },
  {
    icon: Syringe,
    title: 'Sterile Equipment',
    description: 'We use brand new, sterile, single-use needles and equipment for every donor. Cross-contamination is impossible.',
  },
  {
    icon: Lock,
    title: 'Data Privacy & Security',
    description: 'Your personal and medical information is encrypted and stored securely. We never share your data without consent.',
  },
];

export function TrustSafetyAssurance() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Safety Is Our Priority
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We maintain the highest standards of safety, hygiene, and data protection
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {assurances.map((assurance, index) => {
            const Icon = assurance.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {assurance.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {assurance.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
