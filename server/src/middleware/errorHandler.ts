import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

/**
 * Global error handling middleware
 */
export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', error);

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      res.status(409).json({
        success: false,
        error: {
          message: 'A record with this information already exists',
          code: 'DUPLICATE_ERROR',
          details: error.meta,
        },
      });
      return;
    }

    // Record not found
    if (error.code === 'P2025') {
      res.status(404).json({
        success: false,
        error: {
          message: 'Record not found',
          code: 'NOT_FOUND',
        },
      });
      return;
    }
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: {
        message: error.message || 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.details,
      },
    });
    return;
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: {
        message: 'Invalid or expired token',
        code: 'UNAUTHORIZED',
      },
    });
    return;
  }

  // Default error
  res.status(error.status || 500).json({
    success: false,
    error: {
      message: error.message || 'Internal server error',
      code: error.code || 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
  });
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.method} ${req.path} not found`,
      code: 'NOT_FOUND',
    },
  });
}
