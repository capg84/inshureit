import { Request, Response } from 'express';
/**
 * Create a new user (Admin only)
 */
export declare function createUser(req: Request, res: Response): Promise<void>;
/**
 * Get all users (Admin only)
 */
export declare function getUsers(req: Request, res: Response): Promise<void>;
/**
 * Get a specific user (Admin only)
 */
export declare function getUser(req: Request, res: Response): Promise<void>;
/**
 * Update user (Admin only)
 */
export declare function updateUser(req: Request, res: Response): Promise<void>;
/**
 * Deactivate user (Admin only)
 */
export declare function deactivateUser(req: Request, res: Response): Promise<void>;
/**
 * Reset user password (Admin only)
 */
export declare function resetPassword(req: Request, res: Response): Promise<void>;
/**
 * Search users (Admin only)
 */
export declare function searchUsers(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map