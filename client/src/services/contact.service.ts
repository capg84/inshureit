import { api } from './api';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message?: string;
  error?: {
    message: string;
    details?: any;
  };
}

export const contactService = {
  submitContactForm: async (data: ContactFormData): Promise<ContactResponse> => {
    return await api.post<ContactResponse>('/contact', data);
  },
};
