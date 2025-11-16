import { Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';
/**
 * Middleware to handle validation results
 */
export declare function handleValidationErrors(req: Request, res: Response, next: NextFunction): void;
/**
 * Helper to run validation chains
 */
export declare function validate(validations: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validation.d.ts.map