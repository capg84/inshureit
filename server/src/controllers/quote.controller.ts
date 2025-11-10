import { Request, Response } from 'express';
import prisma from '../config/database';
import { InsuranceType } from '@prisma/client';

/**
 * Submit a new quote
 */
export async function submitQuote(req: Request, res: Response): Promise<void> {
  try {
    const {
      insuranceType,
      title,
      firstName,
      lastName,
      dateOfBirth,
      email,
      mobile,
      postcode,
      smokingStatus,
      coverageAmount,
      coveragePeriod,
      partnerTitle,
      partnerFirstName,
      partnerLastName,
      partnerDateOfBirth,
      partnerSmokingStatus,
    } = req.body;

    // Validate partner details for JOINT insurance
    if (insuranceType === InsuranceType.JOINT) {
      if (
        !partnerTitle ||
        !partnerFirstName ||
        !partnerLastName ||
        !partnerDateOfBirth ||
        partnerSmokingStatus === undefined
      ) {
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
    const quote = await prisma.quote.create({
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
        ...(insuranceType === InsuranceType.JOINT && {
          partnerTitle,
          partnerFirstName,
          partnerLastName,
          partnerDateOfBirth: new Date(partnerDateOfBirth),
          partnerSmokingStatus,
        }),
      },
    });

    res.status(201).json({
      success: true,
      data: {
        message: 'Your quote request has been submitted successfully. An insurance advisor will contact you soon.',
        quoteId: quote.id,
      },
    });
  } catch (error) {
    console.error('Submit quote error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while submitting your quote. Please try again.',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Get all quotes (Backoffice access)
 */
export async function getQuotes(req: Request, res: Response): Promise<void> {
  try {
    const { startDate, endDate, insuranceType, downloadStatus } = req.query;

    const quotes = await prisma.quote.findMany({
      where: {
        ...(startDate && {
          submittedAt: {
            gte: new Date(startDate as string),
          },
        }),
        ...(endDate && {
          submittedAt: {
            lte: new Date(endDate as string),
          },
        }),
        ...(insuranceType && { insuranceType: insuranceType as InsuranceType }),
        ...(downloadStatus && { downloadStatus: downloadStatus as any }),
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
  } catch (error) {
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
export async function getNewQuotes(req: Request, res: Response): Promise<void> {
  try {
    const quotes = await prisma.quote.findMany({
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
  } catch (error) {
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
