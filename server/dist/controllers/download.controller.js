"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadNewQuotes = downloadNewQuotes;
exports.getDownloads = getDownloads;
exports.downloadFile = downloadFile;
const database_1 = __importDefault(require("../config/database"));
const excelExport_1 = require("../utils/excelExport");
/**
 * Download new quotes as Excel file
 */
async function downloadNewQuotes(req, res) {
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
        const newQuotes = await database_1.default.quote.findMany({
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
        const fileName = await (0, excelExport_1.generateQuotesExcel)(newQuotes);
        // Create download record
        const download = await database_1.default.download.create({
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
        await database_1.default.quote.updateMany({
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
        const filePath = (0, excelExport_1.getExportFilePath)(fileName);
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('File download error:', err);
            }
        });
    }
    catch (error) {
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
async function getDownloads(req, res) {
    try {
        const downloads = await database_1.default.download.findMany({
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
    }
    catch (error) {
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
async function downloadFile(req, res) {
    try {
        const { id } = req.params;
        const download = await database_1.default.download.findUnique({
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
        const exists = await (0, excelExport_1.fileExists)(download.fileName);
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
        const filePath = (0, excelExport_1.getExportFilePath)(download.fileName);
        res.download(filePath, download.fileName, (err) => {
            if (err) {
                console.error('File download error:', err);
            }
        });
    }
    catch (error) {
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
//# sourceMappingURL=download.controller.js.map