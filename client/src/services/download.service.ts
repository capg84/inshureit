import { api } from './api';
import { ApiResponse } from './auth.service';

export interface Download {
  id: number;
  fileName: string;
  downloadedBy: number;
  downloadedAt: string;
  quoteCount: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

class DownloadService {
  async downloadNewQuotes(): Promise<void> {
    // The backend returns a file download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `quotes_${timestamp}.xlsx`;

    // We need to use POST and handle the file download response
    const response = await api.post('/downloads/new', {}, { responseType: 'blob' });

    // Create a download link
    const blob = new Blob([response as any]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }

  async getDownloads(): Promise<ApiResponse<Download[]>> {
    return api.get<ApiResponse<Download[]>>('/downloads');
  }

  async downloadFile(id: number, fileName: string): Promise<void> {
    await api.download(`/downloads/${id}/file`, fileName);
  }
}

export const downloadService = new DownloadService();
