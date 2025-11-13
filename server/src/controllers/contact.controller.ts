import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Submit contact form
 */
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: errors.array(),
        },
      });
    }

    const { name, email, subject, message }: ContactFormData = req.body;

    // Check if email service is configured
    const emailConfigured = process.env.SMTP_HOST &&
                           process.env.SMTP_USER &&
                           process.env.SMTP_PASS;

    if (emailConfigured) {
      // Send email notification
      try {
        const transporter = nodemailer.createTransport({
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
      } catch (emailError) {
        console.error('Failed to send contact form email:', emailError);
        // Continue even if email fails - we don't want to block the response
      }
    } else {
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
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Failed to process contact form. Please try again later.',
      },
    });
  }
};
