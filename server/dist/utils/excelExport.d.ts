import { Quote } from '@prisma/client';
/**
 * Generate Excel file from quotes
 */
export declare function generateQuotesExcel(quotes: Quote[]): Promise<string>;
/**
 * Get file path for download
 */
export declare function getExportFilePath(fileName: string): string;
/**
 * Check if file exists
 */
export declare function fileExists(fileName: string): Promise<boolean>;
//# sourceMappingURL=excelExport.d.ts.map