import { Sidebar } from '../components/dashboard/Sidebar';
import { TopBar } from '../components/dashboard/TopBar';
import { QueryStatsCards } from '../components/dashboard/QueryStatsCards';
import { ContactQueriesTable } from '../components/dashboard/ContactQueriesTable';
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';

// =====================
// TYPES
// =====================

export interface ContactQuery {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "New" | "Replied" | "Closed";
  createdAt: string;
}

export interface QuerySummary {
  total: number;
  new: number;
  replied: number;
  closed: number;
} 

interface ContactQueriesResponse {
  success: boolean;
  queries: ContactQuery[];
  summary: QuerySummary;
}

// =====================
// COMPONENT
// =====================

export default function ContactQueriesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  const [queries, setQueries] = useState<ContactQuery[]>([]);
const summary: QuerySummary = {
  total: queries.length,
  new: queries.filter(q => q.status === "New").length,
  replied: queries.filter(q => q.status === "Replied").length,
  closed: queries.filter(q => q.status === "Closed").length,
};


  const [loading, setLoading] = useState(true);

  // const token = sessionStorage.getItem("token");

  // =====================
  // FETCH CONTACT QUERIES
  // =====================

  const fetchContactQueries = async () => {
  try {
    setLoading(true);

    const response = await api.get<ContactQueriesResponse>("/contact");

    setQueries(response.data.data);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Fetch contact queries failed:", error.response?.data);

      if (error.response?.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/admin/login";
      }
    } else {
      console.error("Fetch contact queries failed:", error);
    }
  } finally {
    setLoading(false);
  }
};


  // =====================
  // UPDATE QUERY STATUS
  // =====================

  const handleStatusUpdate = async (id: string, newStatus: "New" | "Replied" | "Closed") => {
    try {
      await api.put(
        `/contact/${id}`,
        { status: newStatus }
      );

      await fetchContactQueries();
    } catch (error) {
      console.error("Update status failed:", error);
      alert("Failed to update status");
    }
  };

  // =====================
  // DELETE QUERY
  // =====================

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this query?")) {
      return;
    }

    try {
      await api.delete(`/contact/${id}`);

      await fetchContactQueries();
    } catch (error) {
      console.error("Delete query failed:", error);
      alert("Failed to delete query");
    }
  };

  // =====================
  // FETCH ON MOUNT
  // =====================

  useEffect(() => {
    fetchContactQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <QueryStatsCards summary={summary} />

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
            queries={queries}
            loading={loading}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}
