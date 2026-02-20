import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export interface BloodRequest {
  _id: string;
  patientName: string;
  age: number;
  gender: string;
  deliveryMethod: string;
  paymentMode: string;
  deliveryAddress: string;
  additionalNotes: string;
  amount: number;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  bloodGroup: string;
  unitsRequired: number;
  requiredDate: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'Out for delivery' | 'Completed';
  createdAt: string;
}

interface BloodRequestsTableProps {
  requests: BloodRequest[];
  loading: boolean;
  searchQuery: string;
  bloodGroupFilter: string;
  statusFilter: string;
  urgencyFilter: string;
  onStatusUpdate: (id: string, status: string) => void;
}

export function BloodRequestsTable({
  requests,
  loading,
  searchQuery,
  bloodGroupFilter,
  statusFilter,
  urgencyFilter,
  onStatusUpdate,
}: BloodRequestsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const itemsPerPage = 10;

  /* ================= Filtering ================= */

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.phoneNumber.includes(searchQuery);

    const matchesBloodGroup =
      bloodGroupFilter === 'all' || request.bloodGroup === bloodGroupFilter;

    const matchesStatus =
      statusFilter === 'all' || request.status === statusFilter;

    const matchesUrgency =
      urgencyFilter === 'all' || request.urgency === urgencyFilter;

    return matchesSearch && matchesBloodGroup && matchesStatus && matchesUrgency;
  });

  /* ================= Sorting ================= */

  const urgencyPriority: Record<string, number> = {
    Critical: 4,
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const sortedRequests = [...filteredRequests].sort(
    (a, b) => urgencyPriority[b.urgency] - urgencyPriority[a.urgency]
  );

  /* ================= Pagination ================= */

  const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = sortedRequests.slice(startIndex, endIndex);

  /* ================= Handlers ================= */

  const handleStatusUpdate = (id: string, newStatus: string) => {
    if (!newStatus) return;
    onStatusUpdate(id, newStatus);
  };

  const handleMarkDelivered = (id: string, contactPerson: string) => {
    if (confirm(`Mark blood request for "${contactPerson}" as delivered?`)) {
      onStatusUpdate(id, "Completed");
    }
  };

  const handleView = (request: BloodRequest) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  /* ================= Badge Helpers ================= */

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Low':
        return 'bg-gray-100 text-gray-700';
      case 'Medium':
        return 'bg-blue-100 text-blue-700';
      case 'High':
        return 'bg-orange-100 text-orange-700';
      case 'Critical':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Out for delivery':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const InfoItem = ({ label, value }: { label: string; value: any }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        {label}
      </label>
      <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-800">
        {value || "N/A"}
      </div>
    </div>
  );

  /* ================= JSX ================= */

  return (
    <div>
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-900">Contact Person</th>
              <th className="text-left p-4 font-semibold text-gray-900">Phone Number</th>
              <th className="text-left p-4 font-semibold text-gray-900">Email</th>
              <th className="text-left p-4 font-semibold text-gray-900">Blood Group</th>
              <th className="text-left p-4 font-semibold text-gray-900">Units</th>
              <th className="text-left p-4 font-semibold text-gray-900">Required Date</th>
              <th className="text-left p-4 font-semibold text-gray-900">Urgency</th>
              <th className="text-left p-4 font-semibold text-gray-900">Status</th>
              <th className="text-left p-4 font-semibold text-gray-900">Request Created</th>
              <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} className="p-8 text-center text-gray-500">
                  Loading requests...
                </td>
              </tr>
            ) : currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <tr
                  key={request._id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    request.urgency === 'Critical' ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {request.urgency === 'Critical' && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="font-medium text-gray-900">
                        {request.contactPerson}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-gray-700">{request.phoneNumber}</td>
                  <td className="p-4 text-gray-700">{request.email}</td>

                  <td className="p-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-900">
                      {request.bloodGroup}
                    </span>
                  </td>

                  <td className="p-4 text-gray-700">{request.unitsRequired}</td>

                  <td className="p-4 text-gray-700">
                    {new Date(request.requiredDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getUrgencyBadge(request.urgency)}`}>
                      {request.urgency}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(request.status)}`}>
                      {request.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-700 text-sm">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleView(request)}
                        className="text-gray-700 hover:text-gray-900 font-medium text-sm"
                      >
                        View
                      </button>

                      <span className="text-gray-300">|</span>

                      <select
                        onChange={(e) => handleStatusUpdate(request._id, e.target.value)}
                        className="text-sm text-gray-700 hover:text-gray-900 font-medium border-none bg-transparent cursor-pointer focus:outline-none"
                      >
                        <option value="">Update Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <span className="text-gray-300">|</span>

                      <button
                        onClick={() => handleMarkDelivered(request._id, request.contactPerson)}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Mark Delivered
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="p-8 text-center text-gray-500">
                  No blood requests found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {sortedRequests.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-700">
            Showing {startIndex + 1}–{Math.min(endIndex, sortedRequests.length)} of{' '}
            {sortedRequests.length} requests
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border border-gray-300 rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="border-b border-gray-200 px-8 py-6 bg-gray-50 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Contact Details
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Complete blood request information
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6 space-y-8">
              {/* Patient Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Patient Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem label="Patient Name" value={selectedRequest.patientName} />
                  <InfoItem label="Age" value={selectedRequest.age} />
                  <InfoItem label="Gender" value={selectedRequest.gender} />
                  <InfoItem label="Blood Group" value={selectedRequest.bloodGroup} />
                  <InfoItem label="Units Required" value={selectedRequest.unitsRequired} />
                  <InfoItem 
                    label="Required Date" 
                    value={new Date(selectedRequest.requiredDate).toLocaleDateString()} 
                  />
                  <InfoItem label="Urgency" value={selectedRequest.urgency} />
                  <InfoItem label="Amount" value={`₹ ${selectedRequest.amount}`} />
                </div>
              </div>

              {/* Delivery & Payment */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Delivery & Payment Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem label="Delivery Method" value={selectedRequest.deliveryMethod} />
                  <InfoItem label="Payment Mode" value={selectedRequest.paymentMode} />
                  <InfoItem label="Contact Person" value={selectedRequest.contactPerson} />
                  <InfoItem label="Phone Number" value={selectedRequest.phoneNumber} />
                  <InfoItem label="Email" value={selectedRequest.email} />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    Delivery Address
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800">
                    {selectedRequest.deliveryAddress}
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Additional Notes
                </h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-800 whitespace-pre-wrap">
                  {selectedRequest.additionalNotes || "No additional notes provided."}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-8 py-5 flex justify-end bg-gray-50 rounded-b-xl">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
