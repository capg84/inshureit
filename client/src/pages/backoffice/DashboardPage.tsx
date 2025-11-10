import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BackofficeLayout } from '../../components/BackofficeLayout';
import { quoteService, Quote } from '../../services/quote.service';
import { Download, FileText, Users as UsersIcon } from 'lucide-react';

export default function DashboardPage() {
  const [newQuotes, setNewQuotes] = useState<Quote[]>([]);
  const [newQuotesCount, setNewQuotesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewQuotes();
  }, []);

  const loadNewQuotes = async () => {
    try {
      const response = await quoteService.getNewQuotes();
      if (response.success && response.data) {
        setNewQuotes(response.data.quotes);
        setNewQuotesCount(response.data.count);
      }
    } catch (error) {
      console.error('Failed to load new quotes:', error);
    } finally {
      setLoading(false);
    }
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
    <BackofficeLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Overview of recent quote submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Quotes</p>
                <p className="text-3xl font-bold text-primary mt-1">{newQuotesCount}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Link
              to="/backoffice/downloads"
              className="text-sm text-primary hover:text-primary-600 mt-4 inline-flex items-center gap-1"
            >
              Download new quotes →
            </Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quick Actions</p>
                <p className="text-sm text-gray-500 mt-2">Access common tasks</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Link
              to="/backoffice/downloads"
              className="text-sm text-primary hover:text-primary-600 mt-4 inline-flex items-center gap-1"
            >
              View all downloads →
            </Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Settings</p>
                <p className="text-sm text-gray-500 mt-2">Manage your account</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <Link
              to="/backoffice/change-password"
              className="text-sm text-primary hover:text-primary-600 mt-4 inline-flex items-center gap-1"
            >
              Change password →
            </Link>
          </div>
        </div>

        {/* Recent Quotes Table */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Quotes</h3>
            {newQuotesCount > 0 && (
              <Link to="/backoffice/downloads" className="btn-primary">
                Download {newQuotesCount} New Quote{newQuotesCount !== 1 ? 's' : ''}
              </Link>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-gray-600 mt-4">Loading quotes...</p>
            </div>
          ) : newQuotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No new quotes available</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Coverage
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {newQuotes.slice(0, 10).map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">#{quote.id}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`badge ${
                            quote.insuranceType === 'SOLO' ? 'badge-info' : 'badge-success'
                          }`}
                        >
                          {quote.insuranceType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {quote.title} {quote.firstName} {quote.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{quote.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        £{quote.coverageAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(quote.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {newQuotes.length > 10 && (
            <div className="mt-4 text-center">
              <Link to="/backoffice/downloads" className="text-sm text-primary hover:text-primary-600">
                View all {newQuotesCount} quotes →
              </Link>
            </div>
          )}
        </div>
      </div>
    </BackofficeLayout>
  );
}
