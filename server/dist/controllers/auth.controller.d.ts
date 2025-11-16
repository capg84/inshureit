import { Request, Response } from 'express';
/**
 * Login user
 */
export declare function login(req: Request, res: Response): Promise<void>;
/**
 * Logout user
 */
export declare function logout(req: Request, res: Response): Promise<void>;
/**
 * Change password
 */
export declare function changePassword(req: Request, res: Response): Promise<void>;
/**
 * Verify token
 */
export declare function verifyToken(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map