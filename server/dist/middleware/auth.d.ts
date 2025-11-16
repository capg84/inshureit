import { Request, Response, NextFunction } from 'express';
import { JWTPayload } from '../utils/jwt';
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}
/**
 * Middleware to authenticate JWT token
 */
export declare function authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
/**
 * Middleware to check if user is admin
 */
export declare function requireAdmin(req: Request, res: Response, next: NextFunction): void;
/**
 * Middleware to check if password change is required
 */
export declare function checkPasswordChangeRequired(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=auth.d.ts.map