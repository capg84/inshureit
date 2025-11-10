import { Request, Response, NextFunction } from 'express';
import { UserType } from '@prisma/client';
import { verifyToken, JWTPayload } from '../utils/jwt';
import prisma from '../config/database';

// Extend Express Request type to include user
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
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: {
          message: 'No authentication token provided',
          code: 'UNAUTHORIZED',
        },
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const payload = verifyToken(token);

      // Verify user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, status: true, mustChangePassword: true },
      });

      if (!user) {
        res.status(401).json({
          success: false,
          error: {
            message: 'User not found',
            code: 'USER_NOT_FOUND',
          },
        });
        return;
      }

      if (user.status !== 'ACTIVE') {
        res.status(401).json({
          success: false,
          error: {
            message: 'User account is deactivated',
            code: 'USER_DEACTIVATED',
          },
        });
        return;
      }

      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Invalid or expired token',
          code: 'TOKEN_EXPIRED',
        },
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Authentication error',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Middleware to check if user is admin
 */
export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: {
        message: 'Authentication required',
        code: 'UNAUTHORIZED',
      },
    });
    return;
  }

  if (req.user.userType !== UserType.ADMIN) {
    res.status(403).json({
      success: false,
      error: {
        message: 'Admin access required',
        code: 'FORBIDDEN',
      },
    });
    return;
  }

  next();
}

/**
 * Middleware to check if password change is required
 */
export async function checkPasswordChangeRequired(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          code: 'UNAUTHORIZED',
        },
      });
      return;
    }

    // Skip check for password change endpoint itself
    if (req.path === '/api/auth/change-password') {
      next();
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { mustChangePassword: true },
    });

    if (user?.mustChangePassword) {
      res.status(403).json({
        success: false,
        error: {
          message: 'Password change required',
          code: 'MUST_CHANGE_PASSWORD',
        },
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Error checking password status',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}
