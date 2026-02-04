import { ImageWithFallback } from '../figma/ImageWithFallback';

export function WhyBloodIsNeeded() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="grid grid-cols-2 gap-16 items-center">
        {/* Left Side - Content */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Blood Is Needed
          </h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <span className="font-semibold text-gray-900">Every 2 seconds</span>, someone in the United States needs blood. Despite advances in medicine, blood cannot be manufactured—it can only come from generous donors like you.
            </p>
            
            <p>
              Blood is essential for a wide range of medical situations. From routine surgeries to emergency trauma care, from cancer treatment to chronic disease management, safe blood transfusions are critical to saving lives and improving health outcomes.
            </p>
            
            <p>
              <span className="font-semibold text-gray-900">Emergency situations</span> such as natural disasters, accidents, and mass casualty events can create sudden, critical shortages. A readily available blood supply ensures hospitals can respond immediately when lives are at stake.
            </p>
            
            <p>
              <span className="font-semibold text-gray-900">Surgeries and medical procedures</span> require significant amounts of blood. A single car accident victim can require up to 100 units of blood, while heart surgery patients may need 6 units or more during their procedure.
            </p>
            
            <p>
              Blood has a limited shelf life—red blood cells can be stored for only 42 days, and platelets for just 5 days. This means hospitals need a constant, reliable supply from dedicated donors to meet ongoing patient needs.
            </p>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1636249253913-40e83d5423e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaW5mb2dyYXBoaWMlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc2ODcyMDEyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Medical healthcare infographic"
              className="w-full h-[500px] object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-red-100 rounded-2xl"></div>
        </div>
      </div>
    </section>
  );
}
