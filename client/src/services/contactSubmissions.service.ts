import { api } from './api';

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'NEW' | 'READ' | 'RESOLVED';
  submittedAt: string;
  resolvedAt?: string;
  resolvedBy?: number;
  notes?: string;
  resolver?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface ContactSubmissionsResponse {
  success: boolean;
  data: {
    submissions: ContactSubmission[];
    counts: {
      NEW: number;
      READ: number;
      RESOLVED: number;
      ALL: number;
    };
  };
  error?: {
    message: string;
  };
}

export interface SingleContactResponse {
  success: boolean;
  data: ContactSubmission;
  error?: {
    message: string;
  };
}

export const contactSubmissionsService = {
  // Get all submissions
  getAll: async (status?: string, search?: string): Promise<ContactSubmissionsResponse> => {
    const params: any = {};
    if (status) params.status = status;
    if (search) params.search = search;

    const response = await api.get<ContactSubmissionsResponse>('/contact/submissions', { params });
    return response.data;
  },

  // Get single submission
  getById: async (id: number): Promise<SingleContactResponse> => {
    const response = await api.get<SingleContactResponse>(`/contact/submissions/${id}`);
    return response.data;
  },

  // Update submission status
  updateStatus: async (id: number, status: string, notes?: string): Promise<SingleContactResponse> => {
    const response = await api.put<SingleContactResponse>(`/contact/submissions/${id}`, {
      status,
      notes,
    });
    return response.data;
  },

  // Delete submission
  delete: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/contact/submissions/${id}`
    );
    return response.data;
  },
};
