import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import api from "../../services/api";

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
    deliveryMethod: 'pickup',
    paymentMode: 'online',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    additionalNotes: '',
    amount: ''
  });

  const [inventory, setInventory] = useState<any[]>([]);


  // Fetch inventory on mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await api.get("/inventory");
        setInventory(res.data.inventory);
      } catch (err) {
        console.error("Failed to fetch inventory");
      }
    };

    fetchInventory();
  }, []);

const selectedInventory =
  inventory.find(i => i.bloodGroup === formData.bloodGroup) || null;


  // Calculate values
  const availableUnits = selectedInventory?.unitsAvailable || 0;
  const pricePerUnit = selectedInventory?.pricePerUnit || 0;
  const unitsRequired = parseInt(formData.unitsRequired) || 0;
  const bloodPrice = unitsRequired * pricePerUnit;
  const deliveryCharge = formData.deliveryMethod === "delivery" ? 200 : 0;
  const totalPayable = bloodPrice + deliveryCharge;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    // Prevent over-order
    if (unitsRequired > availableUnits) {
      alert("Not enough blood units available");
      return;
    }

    // Validate units is at least 1
    if (unitsRequired < 1) {
      alert("Please enter at least 1 unit");
      return;
    }

    try {
      // Submit the blood request - send empty string for deliveryAddress if pickup
      await api.post("/requests", {
        patientName: formData.patientName,
        age: formData.age,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        unitsRequired: formData.unitsRequired,
        requiredDate: formData.requiredDate,
        urgency: formData.urgency,
        deliveryMethod: formData.deliveryMethod,
        paymentMode: formData.paymentMode,
        contactPerson: formData.contactPerson,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        deliveryAddress: formData.deliveryMethod === 'delivery' ? formData.deliveryAddress : '',
        additionalNotes: formData.additionalNotes,
        amount: totalPayable,
        paymentStatus: "pending",
      });

      // Update inventory by deducting the units
      if (selectedInventory && selectedInventory._id) {
        const newUnitsAvailable = availableUnits - unitsRequired;
        await api.put(`/inventory/${selectedInventory._id}`, {
          unitsAvailable: newUnitsAvailable
        });
      }

      alert("Blood request submitted successfully!");
      navigate('/');
    } catch (error: any) {
      console.error(
        "Submit failed:",
        error.response?.data || error.message
      );
      alert("Failed to submit request. Please try again.");
    }
  };

  // Fixed button disabled logic
  const isButtonDisabled = 
    !formData.bloodGroup || 
    !availableUnits || 
    unitsRequired < 1 || 
    unitsRequired > availableUnits;

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
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                {/* Out of Stock */}
                {formData.bloodGroup && availableUnits === 0 && (
                  <p className="text-xs text-red-600 mt-1 font-medium">
                    Out of stock
                  </p>
                )}

                {/* Limited Stock */}
                {formData.bloodGroup &&
                  availableUnits > 0 &&
                  unitsRequired > availableUnits && (
                    <p className="text-xs text-red-600 mt-1">
                      Only {availableUnits} units available
                    </p>
                )}

              </div>
              {/*Date Required */}
              <div>
                <label htmlFor="requiredDate" className="block text-sm font-semibold text-gray-900 mb-2">
                  Date Required <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="requiredDate"
                  name="requiredDate"
                  value={formData.requiredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-semibold text-gray-900 mb-2">
                  Urgency Level <span className="text-red-600">*</span>
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Select urgency</option>
                  <option value="Low">Low (within 3 days)</option>
                  <option value="Medium">Medium (within 2 days)</option>
                  <option value="High">High (within 1 day)</option>
                  <option value="Critical">Critical (within 1 hour)</option>
                </select>
              </div>

              {/* Availability & Price Info Card */}
              {formData.bloodGroup && unitsRequired > 0 && (
                <div className="col-span-2 bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Available Units:</span>
                      <span className="text-gray-900 font-medium">{availableUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Price Per Unit:</span>
                      <span className="text-gray-900">₹{pricePerUnit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-300">
                      <span className="text-gray-700">Blood Cost:</span>
                      <span className="text-gray-900 font-bold">₹{bloodPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Delivery & Payment
            </h3>
            <div className="space-y-6">
              {/* Delivery Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Delivery Method <span className="text-red-600">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-900">Hospital Pickup (Free)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === 'delivery'}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-900">Home Delivery (+ ₹200)</span>
                  </label>
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Payment Mode <span className="text-red-600">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="online"
                      checked={formData.paymentMode === 'online'}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-900">Online Payment (Instant confirmation)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="cod"
                      checked={formData.paymentMode === 'cod'}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-gray-900">Cash on Delivery (Pay at time of delivery)</span>
                  </label>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Online payment reserves blood units immediately
                </p>
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

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone no."
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  maxLength={10}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
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

              {/* Conditional Delivery Address - only required when delivery method is 'delivery' */}
              {formData.deliveryMethod === 'delivery' && (
                <div className="col-span-2">
                  <label htmlFor="deliveryAddress" className="block text-sm font-semibold text-gray-900 mb-2">
                    Delivery Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    placeholder="Complete delivery address"
                    required={formData.deliveryMethod === 'delivery'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>
              )}
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
              placeholder="Any additional information that might be helpful"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Order Summary */}
          {formData.bloodGroup && unitsRequired > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Order Summary
              </h3>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Blood Group:</span>
                    <span className="font-medium text-gray-900">{formData.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Units:</span>
                    <span className="font-medium text-gray-900">{unitsRequired}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Blood Cost:</span>
                    <span className="font-medium text-gray-900">₹{bloodPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charge:</span>
                    <span className="font-medium text-gray-900">
                      {deliveryCharge > 0 ? `₹${deliveryCharge}` : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-300">
                    <span className="text-gray-900 font-semibold text-lg">Total Payable:</span>
                    <span className="text-2xl font-bold text-red-600">₹{totalPayable.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="bg-red-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition shadow-lg inline-flex items-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
              Confirm & Proceed to Payment
            </button>
            <p className="text-sm text-gray-600 mt-4">
              By submitting this request, you agree to be contacted by our team.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
