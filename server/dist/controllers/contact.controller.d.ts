import { Request, Response } from 'express';
/**
 * Submit contact form
 */
export declare const submitContactForm: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get all contact submissions (Admin only)
 */
export declare const getAllContactSubmissions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get single contact submission (Admin only)
 */
export declare const getContactSubmission: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Update contact submission status (Admin only)
 */
export declare const updateContactStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Delete contact submission (Admin only)
 */
export declare const deleteContactSubmission: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=contact.controller.d.ts.map