import { ImageWithFallback } from '../figma/ImageWithFallback';

export function NeedBloodHero() {
  return (
    <section className="relative bg-gradient-to-br from-white via-red-50/30 to-red-50/50 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Need Blood?<br />
              We're Here to Help
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Connect with verified donors quickly and efficiently. Our platform helps you find the blood you need when every moment counts.
            </p>
            <div className="flex items-center gap-3 pt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-blue-900 font-medium">
                Average response time: Under 30 minutes
              </p>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1683792337566-e305745c15ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBlbWVyZ2VuY3l8ZW58MXx8fHwxNzY4ODg1ODA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Hospital medical care"
                className="w-full h-[450px] object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -top-8 -right-8 w-full h-full bg-red-100 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
