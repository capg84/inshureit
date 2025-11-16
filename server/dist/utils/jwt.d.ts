import { UserType } from '@prisma/client';
export interface JWTPayload {
    userId: number;
    email: string;
    userType: UserType;
}
/**
 * Generate a JWT token
 */
export declare function generateToken(payload: JWTPayload): string;
/**
 * Verify and decode a JWT token
 */
export declare function verifyToken(token: string): JWTPayload;
/**
 * Decode a JWT token without verification (for debugging only)
 */
export declare function decodeToken(token: string): JWTPayload | null;
//# sourceMappingURL=jwt.d.ts.map