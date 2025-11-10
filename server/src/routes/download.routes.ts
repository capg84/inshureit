import { Router } from 'express';
import * as downloadController from '../controllers/download.controller';
import { authenticate, checkPasswordChangeRequired } from '../middleware/auth';

const router = Router();

// All download routes require authentication
router.use(authenticate);
router.use(checkPasswordChangeRequired);

// Download new quotes
router.post('/new', downloadController.downloadNewQuotes);

// Get download history
router.get('/', downloadController.getDownloads);

// Download a specific file
router.get('/:id/file', downloadController.downloadFile);

export default router;
