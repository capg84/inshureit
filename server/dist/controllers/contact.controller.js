"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactSubmission = exports.updateContactStatus = exports.getContactSubmission = exports.getAllContactSubmissions = exports.submitContactForm = void 0;
const express_validator_1 = require("express-validator");
const nodemailer_1 = __importDefault(require("nodemailer"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Submit contact form
 */
const submitContactForm = async (req, res) => {
    try {
        // Validate input
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: {
                    message: 'Validation failed',
                    details: errors.array(),
                },
            });
        }
        const { name, email, subject, message } = req.body;
        // Save to database first (most important - guaranteed to save)
        const contactSubmission = await prisma.contactSubmission.create({
            data: {
                name,
                email,
                subject,
                message,
                status: 'NEW',
            },
        });
        console.log('Contact form saved to database:', contactSubmission.id);
        // Check if email service is configured
        const emailConfigured = process.env.SMTP_HOST &&
            process.env.SMTP_USER &&
            process.env.SMTP_PASS;
        if (emailConfigured) {
            // Send email notification
            try {
                const transporter = nodemailer_1.default.createTransport({
                    host: process.env.SMTP_HOST,
                    port: parseInt(process.env.SMTP_PORT || '587'),
                    secure: process.env.SMTP_SECURE === 'true',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });
                // Email to admin
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
                    to: process.env.SMTP_USER, // Send to your email
                    subject: `Contact Form: ${subject}`,
                    html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted via InshureIt Contact Form</small></p>
          `,
                });
                // Auto-reply to user
                await transporter.sendMail({
                    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
                    to: email,
                    subject: 'Thank you for contacting InshureIt',
                    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Thank you for contacting us!</h2>
              <p>Dear ${name},</p>
              <p>We have received your message and will get back to you within 24 hours during business days.</p>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Your Message:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
              </div>

              <p>If you need immediate assistance, please email us directly at <a href="mailto:info@inshureit.com">info@inshureit.com</a></p>

              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

              <p style="color: #6b7280; font-size: 14px;">
                Best regards,<br>
                <strong>The InshureIt Team</strong><br>
                Limit Unlimited Technologies Ltd
              </p>
            </div>
          `,
                });
                console.log('Contact form email sent successfully');
            }
            catch (emailError) {
                console.error('Failed to send contact form email:', emailError);
                // Continue even if email fails - we don't want to block the response
            }
        }
        else {
            // Log contact form submission when email is not configured
            console.log('Contact form submission (email not configured):', {
                name,
                email,
                subject,
                message: message.substring(0, 100) + '...',
                timestamp: new Date().toISOString(),
            });
        }
        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Thank you for your message. We will get back to you within 24 hours.',
        });
    }
    catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Failed to process contact form. Please try again later.',
            },
        });
    }
};
exports.submitContactForm = submitContactForm;
/**
 * Get all contact submissions (Admin only)
 */
const getAllContactSubmissions = async (req, res) => {
    try {
        const { status, search } = req.query;
        const where = {};
        // Filter by status
        if (status && status !== 'ALL') {
            where.status = status;
        }
        // Search by name, email, or subject
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
                { subject: { contains: search } },
            ];
        }
        const submissions = await prisma.contactSubmission.findMany({
            where,
            include: {
                resolver: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                submittedAt: 'desc',
            },
        });
        // Get counts by status
        const counts = await prisma.contactSubmission.groupBy({
            by: ['status'],
            _count: true,
        });
        return res.status(200).json({
            success: true,
            data: {
                submissions,
                counts: {
                    NEW: counts.find((c) => c.status === 'NEW')?._count || 0,
                    READ: counts.find((c) => c.status === 'READ')?._count || 0,
                    RESOLVED: counts.find((c) => c.status === 'RESOLVED')?._count || 0,
                    ALL: submissions.length,
                },
            },
        });
    }
    catch (error) {
        console.error('Get contact submissions error:', error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Failed to fetch contact submissions',
            },
        });
    }
};
exports.getAllContactSubmissions = getAllContactSubmissions;
/**
 * Get single contact submission (Admin only)
 */
const getContactSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await prisma.contactSubmission.findUnique({
            where: { id: parseInt(id) },
            include: {
                resolver: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        if (!submission) {
            return res.status(404).json({
                success: false,
                error: {
                    message: 'Contact submission not found',
                },
            });
        }
        // Mark as READ if it was NEW
        if (submission.status === 'NEW') {
            await prisma.contactSubmission.update({
                where: { id: parseInt(id) },
                data: { status: 'READ' },
            });
        }
        return res.status(200).json({
            success: true,
            data: submission,
        });
    }
    catch (error) {
        console.error('Get contact submission error:', error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Failed to fetch contact submission',
            },
        });
    }
};
exports.getContactSubmission = getContactSubmission;
/**
 * Update contact submission status (Admin only)
 */
const updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        const userId = req.user.id;
        const updateData = {
            status,
        };
        if (notes !== undefined) {
            updateData.notes = notes;
        }
        if (status === 'RESOLVED') {
            updateData.resolvedAt = new Date();
            updateData.resolvedBy = userId;
        }
        const submission = await prisma.contactSubmission.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                resolver: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
        return res.status(200).json({
            success: true,
            data: submission,
            message: 'Contact submission updated successfully',
        });
    }
    catch (error) {
        console.error('Update contact status error:', error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Failed to update contact submission',
            },
        });
    }
};
exports.updateContactStatus = updateContactStatus;
/**
 * Delete contact submission (Admin only)
 */
const deleteContactSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.contactSubmission.delete({
            where: { id: parseInt(id) },
        });
        return res.status(200).json({
            success: true,
            message: 'Contact submission deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete contact submission error:', error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Failed to delete contact submission',
            },
        });
    }
};
exports.deleteContactSubmission = deleteContactSubmission;
//# sourceMappingURL=contact.controller.js.map