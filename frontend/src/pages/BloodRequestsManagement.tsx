import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { RequestStatsCards } from '../components/dashboard/RequestStatsCards';
import { BloodRequestsTable } from '../components/dashboard/BloodRequestsTable';
import { useState } from 'react';

export default function BloodRequestsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage="blood-requests" />
      <div className="flex-1 flex flex-col">
        <TopBar title="Blood Requests" />
        <main className="flex-1 overflow-auto p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Blood Requests</h2>
            <p className="text-gray-600">Manage and track all blood requests</p>
          </div>

          {/* Statistics Cards */}
          <RequestStatsCards />

          {/* Controls Row */}
          <div className="flex items-center gap-4 mb-6">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search request..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />

            {/* Blood Group Filter */}
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

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Create Request Button */}
            <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition whitespace-nowrap">
              Create Request
            </button>
          </div>

          {/* Blood Requests Table */}
          <BloodRequestsTable
            searchQuery={searchQuery}
            bloodGroupFilter={bloodGroupFilter}
            statusFilter={statusFilter}
          />
        </main>
      </div>
    </div>
  );
}
