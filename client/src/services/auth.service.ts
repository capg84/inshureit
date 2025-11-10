import { api } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'BACKOFFICE' | 'ADMIN';
  status: 'ACTIVE' | 'DEACTIVATED';
  mustChangePassword: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    expiresIn: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);

    if (response.success && response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  async changePassword(data: ChangePasswordData): Promise<ApiResponse<{ message: string }>> {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/change-password', data);

    if (response.success) {
      // Update user to reflect password change
      const user = this.getCurrentUser();
      if (user) {
        user.mustChangePassword = false;
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    return response;
  }

  async verifyToken(): Promise<ApiResponse<{ user: User }>> {
    return api.get<ApiResponse<{ user: User }>>('/auth/verify');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.userType === 'ADMIN';
  }
}

export const authService = new AuthService();
