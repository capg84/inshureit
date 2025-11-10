import { Router } from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/user.controller';
import { authenticate, requireAdmin, checkPasswordChangeRequired } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = Router();

// All user routes require authentication and admin access
router.use(authenticate);
router.use(checkPasswordChangeRequired);
router.use(requireAdmin);

// Create user
router.post(
  '/',
  validate([
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('userType').isIn(['BACKOFFICE', 'ADMIN']).withMessage('Invalid user type'),
  ]),
  userController.createUser
);

// Search users
router.get('/search', userController.searchUsers);

// Get all users
router.get('/', userController.getUsers);

// Get specific user
router.get('/:id', userController.getUser);

// Update user
router.put(
  '/:id',
  validate([
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('userType').isIn(['BACKOFFICE', 'ADMIN']).withMessage('Invalid user type'),
  ]),
  userController.updateUser
);

// Deactivate user
router.post('/:id/deactivate', userController.deactivateUser);

// Reset password
router.post('/:id/reset-password', userController.resetPassword);

export default router;
