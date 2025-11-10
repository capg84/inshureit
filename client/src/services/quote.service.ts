import { api } from './api';
import { ApiResponse } from './auth.service';

export interface QuoteFormData {
  insuranceType: 'SOLO' | 'JOINT';
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: string;
  postcode: string;
  smokingStatus: boolean;
  coverageAmount: number;
  coveragePeriod: number;
  partnerTitle?: string;
  partnerFirstName?: string;
  partnerLastName?: string;
  partnerDateOfBirth?: string;
  partnerSmokingStatus?: boolean;
}

export interface Quote extends QuoteFormData {
  id: number;
  downloadStatus: 'NEW' | 'DOWNLOADED';
  submittedAt: string;
}

class QuoteService {
  async submitQuote(data: QuoteFormData): Promise<ApiResponse<{ message: string; quoteId: number }>> {
    return api.post<ApiResponse<{ message: string; quoteId: number }>>('/quotes', data);
  }

  async getQuotes(): Promise<ApiResponse<Quote[]>> {
    return api.get<ApiResponse<Quote[]>>('/quotes');
  }

  async getNewQuotes(): Promise<ApiResponse<{ count: number; quotes: Quote[] }>> {
    return api.get<ApiResponse<{ count: number; quotes: Quote[] }>>('/quotes/new');
  }
}

export const quoteService = new QuoteService();
