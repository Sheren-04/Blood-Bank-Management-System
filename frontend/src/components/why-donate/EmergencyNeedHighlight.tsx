import { AlertTriangle } from 'lucide-react';

export function EmergencyNeedHighlight() {
  return (
    <section className="bg-gradient-to-br from-red-50 to-red-100/50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full mb-6">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            The Need Is Constant and Urgent
          </h2>
          
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Every single day, hospitals across the nation depend on the generosity of blood donors to save lives. Whether it's a planned surgery or an unexpected emergency, patients are counting on you.
            </p>
            
            <p>
              <span className="font-semibold text-gray-900">38,000 blood donations</span> are needed every day in the United States. Only <span className="font-semibold text-gray-900">3% of eligible Americans</span> donate blood annually, yet <span className="font-semibold text-gray-900">1 in 7 people</span> entering a hospital will need blood.
            </p>
            
            <p className="text-xl font-semibold text-red-600 pt-4">
              Someone you love may need blood someday. Will it be there?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
