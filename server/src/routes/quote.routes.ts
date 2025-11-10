import { Router } from 'express';
import { body } from 'express-validator';
import * as quoteController from '../controllers/quote.controller';
import { authenticate, checkPasswordChangeRequired } from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = Router();

// Submit quote (public route)
router.post(
  '/',
  validate([
    body('insuranceType').isIn(['SOLO', 'JOINT']).withMessage('Invalid insurance type'),
    body('title').notEmpty().withMessage('Title is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('mobile').notEmpty().withMessage('Mobile number is required'),
    body('postcode').notEmpty().withMessage('Postcode is required'),
    body('smokingStatus').isBoolean().withMessage('Smoking status is required'),
    body('coverageAmount').isInt({ min: 30000 }).withMessage('Valid coverage amount is required'),
    body('coveragePeriod').isInt({ min: 5, max: 72 }).withMessage('Valid coverage period is required'),
  ]),
  quoteController.submitQuote
);

// Get all quotes (Backoffice access)
router.get(
  '/',
  authenticate,
  checkPasswordChangeRequired,
  quoteController.getQuotes
);

// Get new quotes (Backoffice access)
router.get(
  '/new',
  authenticate,
  checkPasswordChangeRequired,
  quoteController.getNewQuotes
);

export default router;
