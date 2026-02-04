import { Quote } from 'lucide-react';

const testimonials = [
  {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    quote: 'Donating blood has been one of the most rewarding experiences. Knowing that I can help save lives with such a simple act is incredibly fulfilling.',
    name: 'Sarang Bhagne',
    role: 'Regular Donor since 2020',
  },
  {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    quote: 'The staff is professional and caring. The entire process is smooth and comfortable. I encourage everyone eligible to become a donor.',
    name: 'Abhishek Upadhyay',
    role: 'Donor & Volunteer',
  },
  {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    quote: 'After receiving blood during surgery, I understood its importance. Now I donate regularly to give back and help others in their time of need.',
    name: 'Ankit Sah',
    role: 'Recipient & Donor',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Donors Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from people making a difference
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition duration-300"
            >
              <Quote className="w-10 h-10 text-red-200 mb-4" />
              
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full bg-gray-100"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
