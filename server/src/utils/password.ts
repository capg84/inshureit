import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import config from '../config/env';

const SALT_ROUNDS = 12;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain password with a hashed password
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Generate a random temporary password
 */
export function generateTemporaryPassword(): string {
  const length = 12;
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*';

  let password = '';

  // Ensure at least one of each required character type
  password += uppercase.charAt(crypto.randomInt(uppercase.length));
  password += lowercase.charAt(crypto.randomInt(lowercase.length));
  password += numbers.charAt(crypto.randomInt(numbers.length));
  password += specialChars.charAt(crypto.randomInt(specialChars.length));

  // Fill the rest with random characters
  const allChars = uppercase + lowercase + numbers + specialChars;
  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(crypto.randomInt(allChars.length));
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => crypto.randomInt(3) - 1)
    .join('');
}

/**
 * Validate password against policy
 */
export function validatePasswordPolicy(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const { passwordPolicy } = config;

  if (password.length < passwordPolicy.minLength) {
    errors.push(`Password must be at least ${passwordPolicy.minLength} characters long`);
  }

  if (password.length > 128) {
    errors.push('Password must not exceed 128 characters');
  }

  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (passwordPolicy.requireNumber && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (passwordPolicy.requireSpecialChar && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
