import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * Middleware to handle validation results
 */
export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errors.array(),
      },
    });
    return;
  }

  next();
}

/**
 * Helper to run validation chains
 */
export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Run all validations
    for (const validation of validations) {
      await validation.run(req);
    }

    // Check for errors
    handleValidationErrors(req, res, next);
  };
}
