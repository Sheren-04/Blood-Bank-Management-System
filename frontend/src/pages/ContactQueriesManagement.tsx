import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { QueryStatsCards } from '../components/dashboard/QueryStatsCards';
import { ContactQueriesTable } from '../components/dashboard/ContactQueriesTable';
import { useState } from 'react';

export default function ContactQueriesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDateFilter('all');
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage="contact-queries" />
      <div className="flex-1 flex flex-col">
        <TopBar title="Contact Queries" />
        <main className="flex-1 overflow-auto p-8">
          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Queries</h2>
            <p className="text-gray-600">View and respond to messages from users</p>
          </div>

          {/* Statistics Cards */}
          <QueryStatsCards />

          {/* Controls Row */}
          <div className="flex items-center gap-4 mb-6">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="New">New</option>
              <option value="Replied">Replied</option>
              <option value="Closed">Closed</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>

          {/* Contact Queries Table */}
          <ContactQueriesTable
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
          />
        </main>
      </div>
    </div>
  );
}
