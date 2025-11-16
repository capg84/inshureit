import { Request, Response } from 'express';
/**
 * Download new quotes as Excel file
 */
export declare function downloadNewQuotes(req: Request, res: Response): Promise<void>;
/**
 * Get download history
 */
export declare function getDownloads(req: Request, res: Response): Promise<void>;
/**
 * Download a previous export file
 */
export declare function downloadFile(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=download.controller.d.ts.map