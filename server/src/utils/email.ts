import nodemailer from 'nodemailer';
import { InsuranceType } from '@prisma/client';

interface QuoteEmailData {
  email: string;
  firstName: string;
  lastName: string;
  insuranceType: InsuranceType;
  coverageAmount: number;
  coveragePeriod: number;
  quoteId: number;
  partnerFirstName?: string;
  partnerLastName?: string;
}

interface PasswordResetEmailData {
  email: string;
  firstName: string;
  resetToken: string;
  resetUrl: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const emailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    // Only create transporter if SMTP credentials are configured
    if (emailConfig.auth.user && emailConfig.auth.pass) {
      this.transporter = nodemailer.createTransport(emailConfig);
    } else {
      console.warn('Email service not configured. Set SMTP_USER and SMTP_PASS in environment variables.');
    }
  }

  async sendQuoteConfirmation(data: QuoteEmailData): Promise<boolean> {
    if (!this.transporter) {
      console.warn('Email transporter not configured. Skipping email send.');
      return false;
    }

    try {
      const emailHtml = this.generateQuoteConfirmationEmail(data);
      const emailText = this.generateQuoteConfirmationText(data);

      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || '"InshureIt" <info@inshureit.com>',
        to: data.email,
        subject: 'Quote Request Received - InshureIt',
        text: emailText,
        html: emailHtml,
      });

      console.log(`Quote confirmation email sent to ${data.email}`);
      return true;
    } catch (error) {
      console.error('Error sending quote confirmation email:', error);
      return false;
    }
  }

  async sendPasswordResetEmail(data: PasswordResetEmailData): Promise<boolean> {
    if (!this.transporter) {
      console.warn('Email transporter not configured. Skipping email send.');
      return false;
    }

    try {
      const emailHtml = this.generatePasswordResetEmail(data);
      const emailText = this.generatePasswordResetText(data);

      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || '"InshureIt" <info@inshureit.com>',
        to: data.email,
        subject: 'Password Reset Request - InshureIt',
        text: emailText,
        html: emailHtml,
      });

      console.log(`Password reset email sent to ${data.email}`);
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }

  private generateQuoteConfirmationEmail(data: QuoteEmailData): string {
    const insuranceTypeText = data.insuranceType === 'SOLO' ? 'Individual Coverage' : 'Joint Coverage';
    const coverageAmountFormatted = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(data.coverageAmount);

    const partnerSection = data.partnerFirstName && data.partnerLastName
      ? `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Partner:</td>
          <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.partnerFirstName} ${data.partnerLastName}</td>
        </tr>
      `
      : '';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quote Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Thank You for Your Quote Request</h1>

          <p style="font-size: 16px; margin-bottom: 20px;">
            Dear ${data.firstName} ${data.lastName},
          </p>

          <p style="font-size: 16px; margin-bottom: 20px;">
            We have successfully received your life insurance quote request. Our team will review your information and get back to you shortly with personalized quotes from our trusted insurance providers.
          </p>

          <div style="background-color: white; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px;">Quote Summary</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Reference Number:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>#${data.quoteId}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Coverage Type:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${insuranceTypeText}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Coverage Amount:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${coverageAmountFormatted}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Coverage Period:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${data.coveragePeriod} years</td>
              </tr>
              ${partnerSection}
            </table>
          </div>

          <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;">
              <strong>What happens next?</strong><br>
              Our team of insurance specialists will review your request and compare quotes from leading UK insurance providers. We'll contact you within 1-2 business days with competitive quotes tailored to your needs.
            </p>
          </div>

          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            If you have any questions or need to update your information, please don't hesitate to contact us.
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            This is an automated confirmation email from InshureIt. Please do not reply to this email.
          </p>
        </div>
      </body>
      </html>
    `;
  }

  private generateQuoteConfirmationText(data: QuoteEmailData): string {
    const insuranceTypeText = data.insuranceType === 'SOLO' ? 'Individual Coverage' : 'Joint Coverage';
    const coverageAmountFormatted = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(data.coverageAmount);

    const partnerText = data.partnerFirstName && data.partnerLastName
      ? `\nPartner: ${data.partnerFirstName} ${data.partnerLastName}`
      : '';

    return `
Thank You for Your Quote Request

Dear ${data.firstName} ${data.lastName},

We have successfully received your life insurance quote request. Our team will review your information and get back to you shortly with personalized quotes from our trusted insurance providers.

QUOTE SUMMARY
Reference Number: #${data.quoteId}
Coverage Type: ${insuranceTypeText}
Coverage Amount: ${coverageAmountFormatted}
Coverage Period: ${data.coveragePeriod} years${partnerText}

WHAT HAPPENS NEXT?
Our team of insurance specialists will review your request and compare quotes from leading UK insurance providers. We'll contact you within 1-2 business days with competitive quotes tailored to your needs.

If you have any questions or need to update your information, please don't hesitate to contact us.

---
This is an automated confirmation email from InshureIt. Please do not reply to this email.
    `.trim();
  }

  private generatePasswordResetEmail(data: PasswordResetEmailData): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Password Reset Request</h1>

          <p style="font-size: 16px; margin-bottom: 20px;">
            Hello ${data.firstName},
          </p>

          <p style="font-size: 16px; margin-bottom: 20px;">
            We received a request to reset your password for your InshureIt backoffice account. Click the button below to reset your password:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Reset Password</a>
          </div>

          <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
            Or copy and paste this link into your browser:<br>
            <a href="${data.resetUrl}" style="color: #2563eb; word-break: break-all;">${data.resetUrl}</a>
          </p>

          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Security Notice:</strong><br>
              This password reset link will expire in 1 hour. If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            This is an automated email from InshureIt. Please do not reply to this email.<br>
            If you need assistance, please contact your system administrator.
          </p>
        </div>
      </body>
      </html>
    `;
  }

  private generatePasswordResetText(data: PasswordResetEmailData): string {
    return `
Password Reset Request

Hello ${data.firstName},

We received a request to reset your password for your InshureIt backoffice account.

To reset your password, click the link below or copy and paste it into your browser:
${data.resetUrl}

SECURITY NOTICE:
This password reset link will expire in 1 hour. If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.

---
This is an automated email from InshureIt. Please do not reply to this email.
If you need assistance, please contact your system administrator.
    `.trim();
  }
}

export const emailService = new EmailService();
