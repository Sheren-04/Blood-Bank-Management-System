import { AlertCircle, CheckCircle2 } from 'lucide-react';

const mythsFacts = [
  {
    myth: 'Blood donation is painful',
    fact: 'Most donors report feeling only a slight pinch. The process uses modern, sterile needles and is performed by trained professionals. Any discomfort is minimal and brief.',
  },
  {
    myth: 'Donating blood is unsafe',
    fact: 'Blood donation is completely safe. We use sterile, single-use equipment for every donor. You cannot contract any disease by donating blood.',
  },
  {
    myth: 'It takes too much time',
    fact: 'The entire process takes about 45-60 minutes, with the actual donation taking only 8-10 minutes. Most of the time is for registration and post-donation rest.',
  },
  {
    myth: 'I can\'t donate because of my age',
    fact: 'Most healthy individuals aged 17-65 can donate. Some locations accept donors as young as 16 (with parental consent) and over 65 (with doctor approval).',
  },
];

export function MythsVsFacts() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Myths vs Facts
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Let's clear up common misconceptions about blood donation
        </p>
      </div>

      <div className="space-y-6 max-w-5xl mx-auto">
        {mythsFacts.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
          >
            <div className="grid grid-cols-2">
              {/* Myth Column */}
              <div className="bg-red-50 p-6 border-r border-red-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-red-600 mb-2 uppercase tracking-wide">
                      Myth
                    </div>
                    <p className="text-gray-900 font-medium">
                      {item.myth}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fact Column */}
              <div className="bg-white p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-600 mb-2 uppercase tracking-wide">
                      Fact
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {item.fact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
