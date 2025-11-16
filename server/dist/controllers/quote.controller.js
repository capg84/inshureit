"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuote = submitQuote;
exports.getQuotes = getQuotes;
exports.getNewQuotes = getNewQuotes;
const database_1 = __importDefault(require("../config/database"));
const client_1 = require("@prisma/client");
const email_1 = require("../utils/email");
/**
 * Submit a new quote
 */
async function submitQuote(req, res) {
    try {
        const { insuranceType, title, firstName, lastName, dateOfBirth, email, mobile, postcode, smokingStatus, coverageAmount, coveragePeriod, partnerTitle, partnerFirstName, partnerLastName, partnerDateOfBirth, partnerSmokingStatus, } = req.body;
        // Validate partner details for JOINT insurance
        if (insuranceType === client_1.InsuranceType.JOINT) {
            if (!partnerTitle ||
                !partnerFirstName ||
                !partnerLastName ||
                !partnerDateOfBirth ||
                partnerSmokingStatus === undefined) {
                res.status(400).json({
                    success: false,
                    error: {
                        message: 'Partner details are required for joint insurance',
                        code: 'VALIDATION_ERROR',
                    },
                });
                return;
            }
        }
        // Create quote
        const quote = await database_1.default.quote.create({
            data: {
                insuranceType,
                title,
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                email: email.toLowerCase(),
                mobile,
                postcode: postcode.toUpperCase(),
                smokingStatus,
                coverageAmount: parseInt(coverageAmount),
                coveragePeriod: parseInt(coveragePeriod),
                ...(insuranceType === client_1.InsuranceType.JOINT && {
                    partnerTitle,
                    partnerFirstName,
                    partnerLastName,
                    partnerDateOfBirth: new Date(partnerDateOfBirth),
                    partnerSmokingStatus,
                }),
            },
        });
        // Send confirmation email (non-blocking - don't fail request if email fails)
        try {
            await email_1.emailService.sendQuoteConfirmation({
                email: email.toLowerCase(),
                firstName,
                lastName,
                insuranceType,
                coverageAmount: parseInt(coverageAmount),
                coveragePeriod: parseInt(coveragePeriod),
                quoteId: quote.id,
                partnerFirstName,
                partnerLastName,
            });
        }
        catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Continue even if email fails - quote was saved successfully
        }
        res.status(201).json({
            success: true,
            data: {
                message: 'Your quote request has been submitted successfully. An insurance advisor will contact you soon.',
                quoteId: quote.id,
            },
        });
    }
    catch (error) {
        console.error('Submit quote error:', error);
        // Provide more specific error messages based on the error type
        let errorMessage = 'We were unable to submit your quote request. Please check your information and try again.';
        let errorCode = 'INTERNAL_ERROR';
        if (error instanceof Error) {
            // Handle specific database errors
            if (error.message.includes('Unique constraint')) {
                errorMessage = 'A quote with this email has already been submitted recently. Please contact us if you need assistance.';
                errorCode = 'DUPLICATE_ENTRY';
            }
            else if (error.message.includes('Invalid')) {
                errorMessage = 'Some of the information provided is invalid. Please verify your details and try again.';
                errorCode = 'VALIDATION_ERROR';
            }
            else if (error.message.includes('connect') || error.message.includes('database')) {
                errorMessage = 'We are experiencing technical difficulties. Please try again in a few moments.';
                errorCode = 'DATABASE_ERROR';
            }
        }
        res.status(500).json({
            success: false,
            error: {
                message: errorMessage,
                code: errorCode,
            },
        });
    }
}
/**
 * Get all quotes (Backoffice access)
 */
async function getQuotes(req, res) {
    try {
        const { startDate, endDate, insuranceType, downloadStatus } = req.query;
        const quotes = await database_1.default.quote.findMany({
            where: {
                ...(startDate && {
                    submittedAt: {
                        gte: new Date(startDate),
                    },
                }),
                ...(endDate && {
                    submittedAt: {
                        lte: new Date(endDate),
                    },
                }),
                ...(insuranceType && { insuranceType: insuranceType }),
                ...(downloadStatus && { downloadStatus: downloadStatus }),
            },
            orderBy: {
                submittedAt: 'desc',
            },
        });
        res.json({
            success: true,
            data: quotes.map((quote) => ({
                ...quote,
                dateOfBirth: quote.dateOfBirth.toISOString(),
                partnerDateOfBirth: quote.partnerDateOfBirth?.toISOString(),
                submittedAt: quote.submittedAt.toISOString(),
            })),
        });
    }
    catch (error) {
        console.error('Get quotes error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'An error occurred while fetching quotes',
                code: 'INTERNAL_ERROR',
            },
        });
    }
}
/**
 * Get new quotes that haven't been downloaded
 */
async function getNewQuotes(req, res) {
    try {
        const quotes = await database_1.default.quote.findMany({
            where: {
                downloadStatus: 'NEW',
            },
            orderBy: {
                submittedAt: 'desc',
            },
        });
        res.json({
            success: true,
            data: {
                count: quotes.length,
                quotes: quotes.map((quote) => ({
                    ...quote,
                    dateOfBirth: quote.dateOfBirth.toISOString(),
                    partnerDateOfBirth: quote.partnerDateOfBirth?.toISOString(),
                    submittedAt: quote.submittedAt.toISOString(),
                })),
            },
        });
    }
    catch (error) {
        console.error('Get new quotes error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'An error occurred while fetching new quotes',
                code: 'INTERNAL_ERROR',
            },
        });
    }
}
//# sourceMappingURL=quote.controller.js.map