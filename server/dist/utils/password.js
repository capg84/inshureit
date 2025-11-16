"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.generateTemporaryPassword = generateTemporaryPassword;
exports.validatePasswordPolicy = validatePasswordPolicy;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = __importDefault(require("../config/env"));
const SALT_ROUNDS = 12;
/**
 * Hash a password using bcrypt
 */
async function hashPassword(password) {
    return bcryptjs_1.default.hash(password, SALT_ROUNDS);
}
/**
 * Compare a plain password with a hashed password
 */
async function comparePassword(plainPassword, hashedPassword) {
    return bcryptjs_1.default.compare(plainPassword, hashedPassword);
}
/**
 * Generate a random temporary password
 */
function generateTemporaryPassword() {
    const length = 12;
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*';
    let password = '';
    // Ensure at least one of each required character type
    password += uppercase.charAt(crypto_1.default.randomInt(uppercase.length));
    password += lowercase.charAt(crypto_1.default.randomInt(lowercase.length));
    password += numbers.charAt(crypto_1.default.randomInt(numbers.length));
    password += specialChars.charAt(crypto_1.default.randomInt(specialChars.length));
    // Fill the rest with random characters
    const allChars = uppercase + lowercase + numbers + specialChars;
    for (let i = password.length; i < length; i++) {
        password += allChars.charAt(crypto_1.default.randomInt(allChars.length));
    }
    // Shuffle the password
    return password
        .split('')
        .sort(() => crypto_1.default.randomInt(3) - 1)
        .join('');
}
/**
 * Validate password against policy
 */
function validatePasswordPolicy(password) {
    const errors = [];
    const { passwordPolicy } = env_1.default;
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
//# sourceMappingURL=password.js.map