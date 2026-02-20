import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import api from '../../services/api';

interface Request {
  _id: string;
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

export function RecentRequestsTable() {
  const [requests, setRequests] = useState<Request[]>([]);
  const navigate = useNavigate();

  // Fetch from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // const token = sessionStorage.getItem("token");

        const res = await api.get("/admin/recent-requests");

        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchRequests();
  }, []);

  
  
  // Navigate to full requests page
  const handleView = () => {
    navigate("/admin/requests");
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Recent Blood Requests
      </h3>

      <div className="bg-white border border-gray-300">
        <table className="w-full">
          <thead>
          <tr className="bg-gray-50 border-b border-gray-300">
            <th className="text-left p-4">Contact Person</th>
            <th className="text-left p-4">Phone</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Blood Group</th>
            <th className="text-left p-4">Units</th>
            <th className="text-left p-4">Required Date</th>
            <th className="text-left p-4">Urgency</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Created At</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>


          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center p-6 text-gray-400">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{request.contactPerson}</td>
                  <td className="p-4">{request.phoneNumber}</td>
                  <td className="p-4">{request.email}</td>
                  <td className="p-4 font-medium">{request.bloodGroup}</td>
                  <td className="p-4">{request.unitsRequired}</td>
                  <td className="p-4">
                    {new Date(request.requiredDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-sm rounded ${
                        request.urgency === "Critical"
                          ? "bg-red-100 text-red-700"
                          : request.urgency === "High"
                          ? "bg-blue-100 text-blue-700"
                          : request.urgency === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {request.urgency}
                    </span>
                  </td>

                  <td className="p-4">{request.status}</td>

                  <td className="p-4 text-sm">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={handleView}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>

              ))
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
