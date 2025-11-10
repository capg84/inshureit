// Shared constants for InshureIt Application

// Coverage amounts (in GBP)
export const COVERAGE_AMOUNTS = [
  30000, 50000, 75000, 100000, 150000, 200000, 250000, 300000, 400000, 500000,
  750000, 1000000,
];

// Coverage periods (in years)
export const COVERAGE_PERIODS = Array.from({ length: 68 }, (_, i) => i + 5); // 5 to 72 years

// Title options
export const TITLES = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'];

// Password validation regex
export const PASSWORD_REGEX = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL_CHAR: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

// API Routes
export const API_ROUTES = {
  // Auth
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  CHANGE_PASSWORD: '/api/auth/change-password',
  VERIFY_TOKEN: '/api/auth/verify',

  // Quotes
  SUBMIT_QUOTE: '/api/quotes',
  GET_QUOTES: '/api/quotes',
  GET_NEW_QUOTES: '/api/quotes/new',

  // Downloads
  DOWNLOAD_NEW: '/api/downloads/new',
  GET_DOWNLOADS: '/api/downloads',
  GET_DOWNLOAD_FILE: '/api/downloads/:id/file',

  // Users (Admin only)
  CREATE_USER: '/api/users',
  GET_USERS: '/api/users',
  GET_USER: '/api/users/:id',
  UPDATE_USER: '/api/users/:id',
  DEACTIVATE_USER: '/api/users/:id/deactivate',
  RESET_PASSWORD: '/api/users/:id/reset-password',
  SEARCH_USERS: '/api/users/search',
};

// Error codes
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',

  // Not found
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  QUOTE_NOT_FOUND: 'QUOTE_NOT_FOUND',
  DOWNLOAD_NOT_FOUND: 'DOWNLOAD_NOT_FOUND',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
};

// Success messages
export const SUCCESS_MESSAGES = {
  QUOTE_SUBMITTED: 'Your quote request has been submitted successfully. An insurance advisor will contact you soon.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  USER_CREATED: 'User created successfully.',
  USER_UPDATED: 'User updated successfully.',
  USER_DEACTIVATED: 'User deactivated successfully.',
  PASSWORD_RESET: 'Password reset successfully.',
  DOWNLOAD_COMPLETE: 'Download completed successfully.',
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password.',
  WEAK_PASSWORD: 'Password does not meet security requirements.',
  DUPLICATE_EMAIL: 'A user with this email already exists.',
  USER_DEACTIVATED: 'This user account has been deactivated.',
  MUST_CHANGE_PASSWORD: 'You must change your temporary password before continuing.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  INTERNAL_ERROR: 'An unexpected error occurred. Please try again later.',
};

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+44|0)[0-9]{10}$/,
  POSTCODE_REGEX: /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i,
  MIN_AGE: 18,
  MAX_AGE: 100,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
};
