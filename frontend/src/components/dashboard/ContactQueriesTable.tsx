import { useState } from 'react';
import type { ContactQuery } from '../../pages/ContactQueriesManagement';

interface ContactQueriesTableProps {
  queries: ContactQuery[];
  loading: boolean;
  searchQuery: string;
  statusFilter: string;
  dateFilter: string;
  onStatusUpdate: (id: string, status: "New" | "Replied" | "Closed") => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ContactQueriesTable({
  queries,
  loading,
  searchQuery,
  statusFilter,
  dateFilter,
  onStatusUpdate,
  onDelete,
}: ContactQueriesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [replyText, setReplyText] = useState('');
  const itemsPerPage = 10;

  const safeQueries = queries ?? [];

  // Filter queries
  const filteredQueries = safeQueries.filter((query) => {
    const matchesSearch =
      query.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (query.subject && query.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      query.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || query.status === statusFilter;

    // Date filtering
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const queryDate = new Date(query.createdAt);
      const now = new Date();
      
      if (dateFilter === 'today') {
        matchesDate = queryDate.toDateString() === now.toDateString();
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = queryDate >= weekAgo;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesDate = queryDate >= monthAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQueries = filteredQueries.slice(startIndex, endIndex);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleView = (query: ContactQuery) => {
    setSelectedQuery(query);
    setReplyText('');
  };

  const handleCloseModal = () => {
    setSelectedQuery(null);
    setReplyText('');
  };

const handleSendReply = async () => {
  if (!replyText.trim() || !selectedQuery) return;

  try {
    await onStatusUpdate(selectedQuery._id, "Replied");

    setSelectedQuery({
      ...selectedQuery,
      status: "Replied",
    });

    alert("Reply sent successfully!");
    handleCloseModal();
  } catch {
    alert("Failed to update status");
  }
};



const handleMarkClosed = async (id: string, name: string) => {
  if (!confirm(`Mark message from "${name}" as closed?`)) return;

  try {
    await onStatusUpdate(id, "Closed");
  } catch {
    alert("Failed to update status");
  }
};



  return (
    <div>
      {/* Table Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="text-left p-4 font-semibold text-gray-900">Name</th>
              <th className="text-left p-4 font-semibold text-gray-900">Email</th>
              <th className="text-left p-4 font-semibold text-gray-900">Subject</th>
              <th className="text-left p-4 font-semibold text-gray-900">Message Preview</th>
              <th className="text-left p-4 font-semibold text-gray-900">Date</th>
              <th className="text-left p-4 font-semibold text-gray-900">Status</th>
              <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  Loading queries...
                </td>
              </tr>
            ) : currentQueries.length > 0 ? (
              currentQueries.map((query, index) => (
                <tr
                  key={query._id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    index % 2 === 1 ? 'bg-gray-50' : ''
                  }`}
                >
                  <td className="p-4 font-medium text-gray-900">{query.name}</td>
                  <td className="p-4 text-gray-700">{query.email}</td>
                  <td className="p-4 text-gray-700">{query.subject || "N/A"}</td>
                  <td className="p-4 text-gray-600 text-sm">
                    {truncateText(query.message, 50)}
                  </td>
                  <td className="p-4 text-gray-700">{formatDate(query.createdAt)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        query.status === 'New'
                          ? 'bg-red-100 text-red-700'
                          : query.status === 'Replied'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {query.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleView(query)}
                        className="text-gray-700 hover:text-gray-900 font-medium"
                      >
                        View
                      </button>
                      {query.status !== 'Closed' && (
                        <>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleView(query)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Reply
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleMarkClosed(query._id, query.name)}
                            className="text-gray-700 hover:text-gray-900 font-medium"
                          >
                            Mark Closed
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No contact queries found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredQueries.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-700">
            Showing {startIndex + 1}–{Math.min(endIndex, filteredQueries.length)} of{' '}
            {filteredQueries.length} messages
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

      {/* View Message Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b border-gray-300 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">View Message</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Full Name
                </label>
                <p className="text-gray-700">{selectedQuery.name}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                <p className="text-gray-700">{selectedQuery.email}</p>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Subject</label>
                <p className="text-gray-700">{selectedQuery.subject || "N/A"}</p>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Date</label>
                <p className="text-gray-700">{formatDate(selectedQuery.createdAt)}</p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Status</label>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedQuery.status === 'New'
                      ? 'bg-red-100 text-red-700'
                      : selectedQuery.status === 'Replied'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {selectedQuery.status}
                </span>
              </div>

              {/* Full Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Message</label>
                <div className="bg-gray-50 p-4 rounded border border-gray-300">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedQuery.message}</p>
                </div>
              </div>

              {/* Reply Section */}
              {selectedQuery.status !== 'Closed' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-300 p-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
              {selectedQuery.status !== 'Closed' && (
                <button
                  onClick={handleSendReply}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Send Reply
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
