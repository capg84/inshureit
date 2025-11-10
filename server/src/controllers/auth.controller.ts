import { Request, Response } from 'express';
import prisma from '../config/database';
import { comparePassword, hashPassword, validatePasswordPolicy } from '../utils/password';
import { generateToken } from '../utils/jwt';

/**
 * Login user
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        },
      });
      return;
    }

    // Check if user is active
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

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        },
      });
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      userType: user.userType,
    });

    // Create session
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType,
          status: user.status,
          mustChangePassword: user.mustChangePassword,
          createdAt: user.createdAt.toISOString(),
        },
        token,
        expiresIn: '24h',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred during login',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Logout user
 */
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      // Delete session
      await prisma.session.deleteMany({
        where: { token },
      });
    }

    res.json({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred during logout',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Change password
 */
export async function changePassword(req: Request, res: Response): Promise<void> {
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

    const { currentPassword, newPassword } = req.body;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      });
      return;
    }

    // Verify current password
    const isValidPassword = await comparePassword(currentPassword, user.password);

    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Current password is incorrect',
          code: 'INVALID_CREDENTIALS',
        },
      });
      return;
    }

    // Validate new password
    const validation = validatePasswordPolicy(newPassword);

    if (!validation.valid) {
      res.status(400).json({
        success: false,
        error: {
          message: 'New password does not meet security requirements',
          code: 'WEAK_PASSWORD',
          details: validation.errors,
        },
      });
      return;
    }

    // Hash and update password
    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        mustChangePassword: false,
      },
    });

    res.json({
      success: true,
      data: {
        message: 'Password changed successfully',
      },
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while changing password',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Verify token
 */
export async function verifyToken(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Invalid token',
          code: 'UNAUTHORIZED',
        },
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        status: true,
        mustChangePassword: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          ...user,
          createdAt: user.createdAt.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while verifying token',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}
