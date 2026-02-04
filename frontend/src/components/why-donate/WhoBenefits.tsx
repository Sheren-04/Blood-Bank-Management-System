import { Car, Activity, Stethoscope, Baby } from 'lucide-react';

const beneficiaries = [
  {
    icon: Car,
    title: 'Accident Victims',
    description: 'Trauma patients from car accidents and emergencies often require immediate blood transfusions to survive critical injuries.',
  },
  {
    icon: Activity,
    title: 'Cancer Patients',
    description: 'Chemotherapy and radiation treatments can destroy blood cells, requiring regular transfusions to maintain health during treatment.',
  },
  {
    icon: Stethoscope,
    title: 'Surgical Patients',
    description: 'Major surgeries including organ transplants, cardiovascular procedures, and orthopedic operations rely on blood availability.',
  },
  {
    icon: Baby,
    title: 'Mothers During Childbirth',
    description: 'Complications during pregnancy and delivery can result in significant blood loss requiring emergency transfusions.',
  },
];

export function WhoBenefits() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who Benefits From Blood Donation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation can help a wide range of patients in critical need
          </p>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {beneficiaries.map((beneficiary, index) => {
            const Icon = beneficiary.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {beneficiary.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {beneficiary.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
