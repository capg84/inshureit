import { Request, Response } from 'express';
import prisma from '../config/database';
import { generateQuotesExcel, getExportFilePath, fileExists } from '../utils/excelExport';

/**
 * Download new quotes as Excel file
 */
export async function downloadNewQuotes(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          code: 'UNAUTHORIZED',
        },
      });
      return;
    }

    // Get all new quotes
    const newQuotes = await prisma.quote.findMany({
      where: {
        downloadStatus: 'NEW',
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    if (newQuotes.length === 0) {
      res.status(404).json({
        success: false,
        error: {
          message: 'No new quotes available for download',
          code: 'NO_NEW_QUOTES',
        },
      });
      return;
    }

    // Generate Excel file
    const fileName = await generateQuotesExcel(newQuotes);

    // Create download record
    const download = await prisma.download.create({
      data: {
        fileName,
        downloadedBy: req.user.userId,
        quoteCount: newQuotes.length,
        quotes: {
          create: newQuotes.map((quote) => ({
            quoteId: quote.id,
          })),
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Update quote statuses to DOWNLOADED
    await prisma.quote.updateMany({
      where: {
        id: {
          in: newQuotes.map((q) => q.id),
        },
      },
      data: {
        downloadStatus: 'DOWNLOADED',
      },
    });

    // Send file
    const filePath = getExportFilePath(fileName);
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('File download error:', err);
      }
    });
  } catch (error) {
    console.error('Download new quotes error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while downloading quotes',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Get download history
 */
export async function getDownloads(req: Request, res: Response): Promise<void> {
  try {
    const downloads = await prisma.download.findMany({
      orderBy: {
        downloadedAt: 'desc',
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: downloads.map((download) => ({
        id: download.id,
        fileName: download.fileName,
        downloadedBy: download.downloadedBy,
        downloadedAt: download.downloadedAt.toISOString(),
        quoteCount: download.quoteCount,
        user: download.user,
      })),
    });
  } catch (error) {
    console.error('Get downloads error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while fetching downloads',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

/**
 * Download a previous export file
 */
export async function downloadFile(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const download = await prisma.download.findUnique({
      where: { id: parseInt(id) },
    });

    if (!download) {
      res.status(404).json({
        success: false,
        error: {
          message: 'Download not found',
          code: 'DOWNLOAD_NOT_FOUND',
        },
      });
      return;
    }

    // Check if file exists
    const exists = await fileExists(download.fileName);

    if (!exists) {
      res.status(404).json({
        success: false,
        error: {
          message: 'File not found',
          code: 'FILE_NOT_FOUND',
        },
      });
      return;
    }

    // Send file
    const filePath = getExportFilePath(download.fileName);
    res.download(filePath, download.fileName, (err) => {
      if (err) {
        console.error('File download error:', err);
      }
    });
  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while downloading file',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}
