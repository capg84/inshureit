// Shared types for InshureIt Application

export enum UserType {
  BACKOFFICE = 'BACKOFFICE',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

export enum InsuranceType {
  SOLO = 'SOLO',
  JOINT = 'JOINT',
}

export enum DownloadStatus {
  NEW = 'NEW',
  DOWNLOADED = 'DOWNLOADED',
}

// User DTOs
export interface CreateUserDTO {
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  userType?: UserType;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  status: UserStatus;
  mustChangePassword: boolean;
  createdAt: string;
}

// Quote DTOs
export interface CreateQuoteDTO {
  insuranceType: InsuranceType;

  // Primary person
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

  // Partner (for JOINT only)
  partnerTitle?: string;
  partnerFirstName?: string;
  partnerLastName?: string;
  partnerDateOfBirth?: string;
  partnerSmokingStatus?: boolean;
}

export interface QuoteResponseDTO {
  id: number;
  insuranceType: InsuranceType;
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
  downloadStatus: DownloadStatus;
  submittedAt: string;
}

// Download DTOs
export interface DownloadResponseDTO {
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

export interface NewQuotesResponseDTO {
  count: number;
  quotes: QuoteResponseDTO[];
}

// Authentication DTOs
export interface AuthResponseDTO {
  user: UserResponseDTO;
  token: string;
  expiresIn: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

// Password policy
export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
}

// Search/Filter DTOs
export interface UserSearchDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface QuoteFilterDTO {
  startDate?: string;
  endDate?: string;
  insuranceType?: InsuranceType;
  downloadStatus?: DownloadStatus;
}
