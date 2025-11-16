import { Request, Response, NextFunction } from 'express';
/**
 * Global error handling middleware
 */
export declare function errorHandler(error: any, req: Request, res: Response, next: NextFunction): void;
/**
 * 404 Not Found handler
 */
export declare function notFoundHandler(req: Request, res: Response): void;
//# sourceMappingURL=errorHandler.d.ts.map