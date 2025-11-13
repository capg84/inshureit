import { useState, useEffect } from 'react';
import { Mail, Search, Trash2, CheckCircle, Eye } from 'lucide-react';
import { contactSubmissionsService, ContactSubmission } from '../../services/contactSubmissions.service';

type StatusFilter = 'ALL' | 'NEW' | 'READ' | 'RESOLVED';

export default function ContactMessagesPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [counts, setCounts] = useState({ NEW: 0, READ: 0, RESOLVED: 0, ALL: 0 });

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await contactSubmissionsService.getAll(
        statusFilter === 'ALL' ? undefined : statusFilter,
        searchQuery || undefined
      );

      if (response.success) {
        setSubmissions(response.data.submissions);
        setCounts(response.data.counts);
      } else {
        setError(response.error?.message || 'Failed to fetch contact submissions');
      }
    } catch (err: any) {
      console.error('Error fetching contact submissions:', err);
      setError(err.response?.data?.error?.message || 'Failed to fetch contact submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter, searchQuery]);

  const handleViewDetails = async (submission: ContactSubmission) => {
    try {
      const response = await contactSubmissionsService.getById(submission.id);
      if (response.success) {
        setSelectedSubmission(response.data);
        // Refresh list to update status if it changed from NEW to READ
        if (submission.status === 'NEW') {
          fetchSubmissions();
        }
      }
    } catch (err) {
      console.error('Error fetching submission details:', err);
      setError('Failed to load submission details');
    }
  };

  const handleUpdateStatus = async (id: number, status: string, notes?: string) => {
    try {
      const response = await contactSubmissionsService.updateStatus(id, status, notes);
      if (response.success) {
        setSelectedSubmission(response.data);
        fetchSubmissions();
      }
    } catch (err: any) {
      console.error('Error updating status:', err);
      setError(err.response?.data?.error?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
      return;
    }

    try {
      const response = await contactSubmissionsService.delete(id);
      if (response.success) {
        setSelectedSubmission(null);
        fetchSubmissions();
      }
    } catch (err: any) {
      console.error('Error deleting submission:', err);
      setError(err.response?.data?.error?.message || 'Failed to delete submission');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      NEW: 'bg-blue-100 text-blue-800',
      READ: 'bg-yellow-100 text-yellow-800',
      RESOLVED: 'bg-green-100 text-green-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">Manage customer contact form submissions</p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['ALL', 'NEW', 'READ', 'RESOLVED'] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status} ({counts[status]})
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Submissions ({submissions.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading submissions...
              </div>
            ) : submissions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No contact submissions found</p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => handleViewDetails(submission)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedSubmission?.id === submission.id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{submission.name}</p>
                      <p className="text-sm text-gray-600 truncate">{submission.email}</p>
                    </div>
                    {getStatusBadge(submission.status)}
                  </div>
                  <p className="font-medium text-sm text-gray-900 mb-1 truncate">
                    {submission.subject}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(submission.submittedAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submission Details */}
        <div className="bg-white rounded-lg shadow">
          {selectedSubmission ? (
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Message Details
                  </h2>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
                <button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="text-red-600 hover:text-red-800 p-2"
                  title="Delete submission"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">From</label>
                  <p className="text-gray-900">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">
                    <a href={`mailto:${selectedSubmission.email}`} className="text-primary hover:underline">
                      {selectedSubmission.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subject</label>
                  <p className="text-gray-900">{selectedSubmission.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Submitted</label>
                  <p className="text-gray-900">{formatDate(selectedSubmission.submittedAt)}</p>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-500 block mb-2">Message</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-500 block mb-2">Update Status</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedSubmission.id, 'READ')}
                    disabled={selectedSubmission.status === 'READ'}
                    className="flex-1 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    Mark as Read
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedSubmission.id, 'RESOLVED')}
                    disabled={selectedSubmission.status === 'RESOLVED'}
                    className="flex-1 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Mark as Resolved
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-gray-500 block mb-2">Notes</label>
                <textarea
                  value={selectedSubmission.notes || ''}
                  onChange={(e) => setSelectedSubmission({ ...selectedSubmission, notes: e.target.value })}
                  className="input resize-none"
                  rows={4}
                  placeholder="Add internal notes about this submission..."
                />
                <button
                  onClick={() => handleUpdateStatus(
                    selectedSubmission.id,
                    selectedSubmission.status,
                    selectedSubmission.notes
                  )}
                  className="mt-2 btn-primary w-full"
                >
                  Save Notes
                </button>
              </div>

              {/* Resolution Info */}
              {selectedSubmission.status === 'RESOLVED' && selectedSubmission.resolver && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="text-sm font-medium text-gray-500 block mb-2">Resolution Details</label>
                  <p className="text-sm text-gray-900">
                    Resolved by {selectedSubmission.resolver.firstName} {selectedSubmission.resolver.lastName}
                  </p>
                  {selectedSubmission.resolvedAt && (
                    <p className="text-sm text-gray-600">
                      on {formatDate(selectedSubmission.resolvedAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No submission selected</p>
              <p className="text-sm mt-2">Select a submission from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
