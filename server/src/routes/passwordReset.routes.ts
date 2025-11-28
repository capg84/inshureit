import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validation';
import {
  requestPasswordReset,
  verifyResetToken,
  resetPassword,
} from '../controllers/passwordReset.controller';

const router = Router();

/**
 * @route   POST /api/password-reset/request
 * @desc    Request password reset email
 * @access  Public
 */
router.post(
  '/request',
  [
    body('email')
      .isEmail()
      .withMessage('Valid email is required')
      .normalizeEmail(),
  ],
  validate,
  requestPasswordReset
);

/**
 * @route   GET /api/password-reset/verify/:token
 * @desc    Verify password reset token
 * @access  Public
 */
router.get(
  '/verify/:token',
  [
    param('token')
      .isLength({ min: 64, max: 64 })
      .withMessage('Invalid token format'),
  ],
  validate,
  verifyResetToken
);

/**
 * @route   POST /api/password-reset/reset
 * @desc    Reset password with token
 * @access  Public
 */
router.post(
  '/reset',
  [
    body('token')
      .isLength({ min: 64, max: 64 })
      .withMessage('Invalid token format'),
    body('newPassword')
      .isString()
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters'),
  ],
  validate,
  resetPassword
);

export default router;
