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
    await api.download('/downloads/new', `quotes_${timestamp}.xlsx`);
  }

  async getDownloads(): Promise<ApiResponse<Download[]>> {
    return api.get<ApiResponse<Download[]>>('/downloads');
  }

  async downloadFile(id: number, fileName: string): Promise<void> {
    await api.download(`/downloads/${id}/file`, fileName);
  }
}

export const downloadService = new DownloadService();
