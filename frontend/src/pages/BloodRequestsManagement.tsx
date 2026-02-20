import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { RequestStatsCards } from '../components/dashboard/RequestStatsCards';
import { BloodRequestsTable } from '../components/dashboard/BloodRequestsTable';
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import api from '../services/api';

export interface BloodRequest {
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

export default function BloodRequestsManagement() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      setRequests(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch blood requests', err);
      setRequests([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/requests/${id}`, { status: newStatus });

      // Update local state
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus as BloodRequest['status'] } : req
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const criticalNotifications = requests.filter(
    (req) => req.urgency === 'Critical' && req.status === 'Pending'
  );

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage="blood-requests" />

      <div className="flex-1 flex flex-col">
        {/* Custom TopBar Layout */}
        <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Blood Requests Management
          </h2>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell className="w-6 h-6" />
                {criticalNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">
                      Critical Requests
                    </h3>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {criticalNotifications.length > 0 ? (
                      criticalNotifications.map((req) => (
                        <div
                          key={req._id}
                          className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        >
                          <p className="text-sm text-gray-900">
                            {req.contactPerson} – {req.bloodGroup} – {req.unitsRequired} units
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-sm text-gray-500">
                        No critical requests
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className="text-gray-700">Admin</span>

            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Blood Requests Management
            </h2>
            <p className="text-gray-600">
              Monitor, prioritize and manage all incoming blood requests
            </p>
          </div>

          {/* Statistics Cards */}
          <RequestStatsCards requests={requests} />

          {/* Controls Row */}
          <div className="flex items-center gap-4 mb-6">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by contact person, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />

            {/* Blood Group */}
            <select
              value={bloodGroupFilter}
              onChange={(e) => setBloodGroupFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="all">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            {/* Urgency */}
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="all">All Urgency</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Table */}
          <BloodRequestsTable
            requests={requests}
            loading={loading}
            searchQuery={searchQuery}
            bloodGroupFilter={bloodGroupFilter}
            statusFilter={statusFilter}
            urgencyFilter={urgencyFilter}
            onStatusUpdate={updateRequestStatus}
          />
        </main>
      </div>
    </div>
  );
}
