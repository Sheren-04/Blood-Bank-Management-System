import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

export function BloodRequestForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    bloodGroup: '',
    unitsRequired: '',
    requiredDate: '',
    urgency: '',
    hospitalName: '',
    city: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: '',
    additionalNotes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: formData.patientName,
          bloodGroup: formData.bloodGroup,
          unitsRequired: formData.unitsRequired,
          hospital: formData.hospitalName,
          contact: formData.phone,
          urgency: formData.urgency,
        })
      });

      if (response.ok) {
        alert('Blood request submitted successfully!');
        navigate('/about');
      } else {
        alert('Request submission failed!');
      }
    } catch (error) {
      alert('Error connecting to server!');
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Submit Blood Request
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fill in the details below and we'll connect you with available donors as quickly as possible
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          {/* Patient Information */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Patient Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="patientName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Patient Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient's full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

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
                  placeholder="Patient's age"
                  min="16"
                  max="50"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

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
            </div>
          </div>

          {/* Blood Requirements */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Blood Requirements
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-semibold text-gray-900 mb-2">
                  Blood Group Required <span className="text-red-600">*</span>
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

              <div>
                <label htmlFor="unitsRequired" className="block text-sm font-semibold text-gray-900 mb-2">
                  Units Required <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  id="unitsRequired"
                  name="unitsRequired"
                  value={formData.unitsRequired}
                  onChange={handleChange}
                  placeholder="Number of units"
                  min="1"
                  max="20"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div className="col-span-1">
                <label htmlFor="requiredDate" className="block text-sm font-semibold text-gray-900 mb-2">
                  Date Required <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="requiredDate"
                  name="requiredDate"
                  value={formData.requiredDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              {/* Urgency Dropdown */}
<div>
  <label htmlFor="urgency" className="block text-sm font-semibold text-gray-900 mb-2">
    Urgency Level <span className="text-red-600">*</span>
  </label>

  <select
    name="urgency"
    value={formData.urgency}
    onChange={handleChange}
    required
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
  >
    <option value="">Select urgency</option>

    <option value="Low">
      Low (within 3 days)
    </option>

    <option value="Medium">
      Medium (within 2 days)
    </option>

    <option value="High">
      High (within 1 day)
    </option>

    <option value="Critical">
      Critical (within 1 hour)
    </option>
  </select>
</div>

            </div>
          </div>

          {/* Hospital & Location */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Hospital & Location
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="hospitalName" className="block text-sm font-semibold text-gray-900 mb-2">
                  Hospital Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Name of hospital or medical facility"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
                  City <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                  Hospital Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Contact Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="contactPerson" className="block text-sm font-semibold text-gray-900 mb-2">
                  Contact Person Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Name of person to contact"
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
                max={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number without spaces or dashes</p>
            </div>

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
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-8">
            <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-900 mb-2">
              Additional Notes <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information that might be helpful (e.g., urgency level, special requirements)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition shadow-lg inline-flex items-center gap-3"
            >
              <Send className="w-6 h-6" />
              Request Blood
            </button>
            <p className="text-sm text-gray-600 mt-4">
              By submitting this request, you agree to be contacted by our team and verified donors.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}