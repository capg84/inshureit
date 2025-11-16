/**
 * Hash a password using bcrypt
 */
export declare function hashPassword(password: string): Promise<string>;
/**
 * Compare a plain password with a hashed password
 */
export declare function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
/**
 * Generate a random temporary password
 */
export declare function generateTemporaryPassword(): string;
/**
 * Validate password against policy
 */
export declare function validatePasswordPolicy(password: string): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=password.d.ts.map