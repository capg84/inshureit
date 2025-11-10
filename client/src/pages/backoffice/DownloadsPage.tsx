import { useEffect, useState } from 'react';
import { BackofficeLayout } from '../../components/BackofficeLayout';
import { downloadService, Download } from '../../services/download.service';
import { Download as DownloadIcon, FileSpreadsheet, Clock } from 'lucide-react';

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const response = await downloadService.getDownloads();
      if (response.success && response.data) {
        setDownloads(response.data);
      }
    } catch (error) {
      console.error('Failed to load downloads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadNew = async () => {
    setError('');
    setSuccess('');
    setDownloading(true);

    try {
      await downloadService.downloadNewQuotes();
      setSuccess('Quotes downloaded successfully!');
      // Reload downloads after successful download
      await loadDownloads();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to download quotes');
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadFile = async (download: Download) => {
    try {
      await downloadService.downloadFile(download.id, download.fileName);
    } catch (err) {
      setError('Failed to download file');
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Downloads</h2>
            <p className="text-gray-600">Download new quotes and view download history</p>
          </div>

          <button
            onClick={handleDownloadNew}
            disabled={downloading}
            className="btn-primary flex items-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download New Quotes'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Download History</h3>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-gray-600 mt-4">Loading downloads...</p>
            </div>
          ) : downloads.length === 0 ? (
            <div className="text-center py-12">
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No downloads yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Click "Download New Quotes" to create your first export
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      File Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Downloaded By
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quote Count
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Downloaded At
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {downloads.map((download) => (
                    <tr key={download.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-900">{download.fileName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {download.user.firstName} {download.user.lastName}
                        <div className="text-xs text-gray-500">{download.user.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="badge badge-info">{download.quoteCount} quotes</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {formatDate(download.downloadedAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDownloadFile(download)}
                          className="text-sm text-primary hover:text-primary-600 font-medium flex items-center gap-1"
                        >
                          <DownloadIcon className="w-4 h-4" />
                          Re-download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </BackofficeLayout>
  );
}
