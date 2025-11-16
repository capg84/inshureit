"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const contact_controller_1 = require("../controllers/contact.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post('/', [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('subject').trim().notEmpty().withMessage('Subject is required'),
    (0, express_validator_1.body)('message').trim().notEmpty().withMessage('Message is required'),
], contact_controller_1.submitContactForm);
/**
 * @route   GET /api/contact/submissions
 * @desc    Get all contact submissions
 * @access  Admin only
 */
router.get('/submissions', auth_1.authenticate, auth_1.requireAdmin, contact_controller_1.getAllContactSubmissions);
/**
 * @route   GET /api/contact/submissions/:id
 * @desc    Get single contact submission
 * @access  Admin only
 */
router.get('/submissions/:id', auth_1.authenticate, auth_1.requireAdmin, contact_controller_1.getContactSubmission);
/**
 * @route   PUT /api/contact/submissions/:id
 * @desc    Update contact submission status
 * @access  Admin only
 */
router.put('/submissions/:id', auth_1.authenticate, auth_1.requireAdmin, [
    (0, express_validator_1.body)('status').isIn(['NEW', 'READ', 'RESOLVED']).withMessage('Invalid status'),
], contact_controller_1.updateContactStatus);
/**
 * @route   DELETE /api/contact/submissions/:id
 * @desc    Delete contact submission
 * @access  Admin only
 */
router.delete('/submissions/:id', auth_1.authenticate, auth_1.requireAdmin, contact_controller_1.deleteContactSubmission);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map