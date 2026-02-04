import { useNavigate } from "react-router-dom";
export function WhyDonateCTA() {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 py-20">
      <div className="max-w-[1440px] mx-auto px-8 text-center">
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
          Your single donation can save up to three lives. Join our community of heroes and start your journey today.
        </p>
        <button 
          onClick={() => navigate('/become-donor')}
        className="bg-white text-red-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition shadow-lg">
          Become a Donor
        </button>
      </div>
    </section>
  );
}
