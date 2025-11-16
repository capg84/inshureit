import { Request, Response } from 'express';
/**
 * Submit a new quote
 */
export declare function submitQuote(req: Request, res: Response): Promise<void>;
/**
 * Get all quotes (Backoffice access)
 */
export declare function getQuotes(req: Request, res: Response): Promise<void>;
/**
 * Get new quotes that haven't been downloaded
 */
export declare function getNewQuotes(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=quote.controller.d.ts.map