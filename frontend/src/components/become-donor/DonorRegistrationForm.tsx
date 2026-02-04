import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function DonorRegistrationForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodGroup: '',
    age: '',
    gender: '',
    city: '',
    lastDonation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          age: formData.age,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          phone: formData.phone,
          city: formData.city,
          lastDonation: formData.lastDonation,
        })
      });

      if (response.ok) {
        alert('Registration successful!');
        navigate('/');
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      alert('Error connecting to server!');
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Donor Registration Form
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fill in your details to register as a blood donor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div className="col-span-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone no."
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number without spaces or dashes</p>
            </div>

            {/* Blood Group */}
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-semibold text-gray-900 mb-2">
                Blood Group <span className="text-red-600">*</span>
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-gray-900 mb-2">
                Age <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="16"
                max="70"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-900 mb-2">
                Gender <span className="text-red-600">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* City / Location */}
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
                City / Location <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* Last Donation Date */}
            <div>
              <label htmlFor="lastDonation" className="block text-sm font-semibold text-gray-900 mb-2">
                Last Donation Date <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="date"
                id="lastDonation"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I confirm that the information provided is accurate and I meet the eligibility criteria. I understand that I will undergo a health screening before donation and consent to the collection and processing of my data in accordance with privacy policies.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition shadow-lg"
            >
              Register as Donor
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}