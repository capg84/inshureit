import { Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../config/database';
import { emailService } from '../utils/email';
import { hashPassword, validatePasswordPolicy } from '../utils/password';

/**
 * Request password reset
 */
export async function requestPasswordReset(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration attacks
    // But only send email if user exists
    if (user && user.status === 'ACTIVE') {
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

      // Set expiration to 1 hour from now
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      // Save token to database
      await prisma.passwordResetToken.create({
        data: {
          token: hashedToken,
          userId: user.id,
          expiresAt,
        },
      });

      // Generate reset URL (use frontend URL from environment)
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

      // Send password reset email
      await emailService.sendPasswordResetEmail({
        email: user.email,
        firstName: user.firstName,
        resetToken,
        resetUrl,
      });

      console.log(`Password reset email sent to ${user.email}`);
    } else {
      console.log(`Password reset requested for non-existent or inactive email: ${email}`);
    }

    // Always return success message
    res.json({
      success: true,
      data: {
        message: 'If an account exists with this email, a password reset link has been sent.',
      },
    });
  } catch (error) {
    console.error('Request password reset error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while processing your request',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Verify password reset token
 */
export async function verifyResetToken(req: Request, res: Response): Promise<void> {
  try {
    const { token } = req.params;

    // Hash the provided token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find token in database
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: hashedToken,
        used: false,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!resetToken) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Invalid or expired reset token',
          code: 'INVALID_TOKEN',
        },
      });
      return;
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: resetToken.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
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

    res.json({
      success: true,
      data: {
        valid: true,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Verify reset token error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while verifying the token',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(req: Request, res: Response): Promise<void> {
  try {
    const { token, newPassword } = req.body;

    // Hash the provided token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find token in database
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: hashedToken,
        used: false,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!resetToken) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Invalid or expired reset token',
          code: 'INVALID_TOKEN',
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
          message: 'Password does not meet security requirements',
          code: 'WEAK_PASSWORD',
          details: validation.errors,
        },
      });
      return;
    }

    // Get user and check status
    const user = await prisma.user.findUnique({
      where: { id: resetToken.userId },
    });

    if (!user || user.status !== 'ACTIVE') {
      res.status(401).json({
        success: false,
        error: {
          message: 'User account not found or deactivated',
          code: 'USER_NOT_FOUND',
        },
      });
      return;
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and mark token as used in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: {
          password: hashedPassword,
          mustChangePassword: false,
        },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
      // Invalidate all existing sessions for this user
      prisma.session.deleteMany({
        where: { userId: resetToken.userId },
      }),
    ]);

    console.log(`Password reset successfully for user ID: ${resetToken.userId}`);

    res.json({
      success: true,
      data: {
        message: 'Password has been reset successfully. You can now login with your new password.',
      },
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while resetting your password',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}
