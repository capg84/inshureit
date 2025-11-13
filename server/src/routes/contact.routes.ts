import { Router } from 'express';
import { body } from 'express-validator';
import {
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmission,
  updateContactStatus,
  deleteContactSubmission
} from '../controllers/contact.controller';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  submitContactForm
);

/**
 * @route   GET /api/contact/submissions
 * @desc    Get all contact submissions
 * @access  Admin only
 */
router.get('/submissions', authenticate, requireAdmin, getAllContactSubmissions);

/**
 * @route   GET /api/contact/submissions/:id
 * @desc    Get single contact submission
 * @access  Admin only
 */
router.get('/submissions/:id', authenticate, requireAdmin, getContactSubmission);

/**
 * @route   PUT /api/contact/submissions/:id
 * @desc    Update contact submission status
 * @access  Admin only
 */
router.put(
  '/submissions/:id',
  authenticate,
  requireAdmin,
  [
    body('status').isIn(['NEW', 'READ', 'RESOLVED']).withMessage('Invalid status'),
  ],
  updateContactStatus
);

/**
 * @route   DELETE /api/contact/submissions/:id
 * @desc    Delete contact submission
 * @access  Admin only
 */
router.delete('/submissions/:id', authenticate, requireAdmin, deleteContactSubmission);

export default router;
