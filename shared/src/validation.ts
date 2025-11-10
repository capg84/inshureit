// Shared validation utilities

import { PASSWORD_REGEX, VALIDATION } from './constants';
import { PasswordPolicy } from './types';

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION.EMAIL_REGEX.test(email);
}

/**
 * Validate UK phone number
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION.PHONE_REGEX.test(phone.replace(/\s/g, ''));
}

/**
 * Validate UK postcode
 */
export function isValidPostcode(postcode: string): boolean {
  return VALIDATION.POSTCODE_REGEX.test(postcode);
}

/**
 * Validate age is within acceptable range
 */
export function isValidAge(dateOfBirth: Date): boolean {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  const actualAge =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
      ? age - 1
      : age;

  return actualAge >= VALIDATION.MIN_AGE && actualAge <= VALIDATION.MAX_AGE;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  return monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ? age - 1
    : age;
}

/**
 * Validate password against policy
 */
export function validatePassword(
  password: string,
  policy: PasswordPolicy
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < policy.minLength) {
    errors.push(`Password must be at least ${policy.minLength} characters long`);
  }

  if (password.length > VALIDATION.MAX_PASSWORD_LENGTH) {
    errors.push(`Password must not exceed ${VALIDATION.MAX_PASSWORD_LENGTH} characters`);
  }

  if (policy.requireUppercase && !PASSWORD_REGEX.UPPERCASE.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (policy.requireLowercase && !PASSWORD_REGEX.LOWERCASE.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (policy.requireNumber && !PASSWORD_REGEX.NUMBER.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (policy.requireSpecialChar && !PASSWORD_REGEX.SPECIAL_CHAR.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Format date to ISO string
 */
export function formatDateToISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parse date from string
 */
export function parseDate(dateString: string): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}
