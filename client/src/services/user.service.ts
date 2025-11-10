import { api } from './api';
import { ApiResponse, User } from './auth.service';

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  userType: 'BACKOFFICE' | 'ADMIN';
}

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  userType: 'BACKOFFICE' | 'ADMIN';
}

export interface UserSearchParams {
  firstName?: string;
  lastName?: string;
  email?: string;
}

class UserService {
  async createUser(data: CreateUserData): Promise<ApiResponse<{ user: User; temporaryPassword: string; message: string }>> {
    return api.post<ApiResponse<{ user: User; temporaryPassword: string; message: string }>>('/users', data);
  }

  async getUsers(): Promise<ApiResponse<User[]>> {
    return api.get<ApiResponse<User[]>>('/users');
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    return api.get<ApiResponse<User>>(`/users/${id}`);
  }

  async updateUser(id: number, data: UpdateUserData): Promise<ApiResponse<{ user: User; forcedLogout: boolean }>> {
    return api.put<ApiResponse<{ user: User; forcedLogout: boolean }>>(`/users/${id}`, data);
  }

  async deactivateUser(id: number): Promise<ApiResponse<{ message: string }>> {
    return api.post<ApiResponse<{ message: string }>>(`/users/${id}/deactivate`);
  }

  async resetPassword(id: number): Promise<ApiResponse<{ temporaryPassword: string; message: string }>> {
    return api.post<ApiResponse<{ temporaryPassword: string; message: string }>>(`/users/${id}/reset-password`);
  }

  async searchUsers(params: UserSearchParams): Promise<ApiResponse<User[]>> {
    const queryString = new URLSearchParams(params as any).toString();
    return api.get<ApiResponse<User[]>>(`/users/search?${queryString}`);
  }
}

export const userService = new UserService();
