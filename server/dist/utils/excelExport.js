"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuotesExcel = generateQuotesExcel;
exports.getExportFilePath = getExportFilePath;
exports.fileExists = fileExists;
const exceljs_1 = __importDefault(require("exceljs"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const env_1 = __importDefault(require("../config/env"));
/**
 * Generate Excel file from quotes
 */
async function generateQuotesExcel(quotes) {
    const workbook = new exceljs_1.default.Workbook();
    const worksheet = workbook.addWorksheet('Quotes');
    // Set up columns
    worksheet.columns = [
        { header: 'Quote ID', key: 'id', width: 10 },
        { header: 'Insurance Type', key: 'insuranceType', width: 15 },
        { header: 'Submitted Date', key: 'submittedAt', width: 20 },
        { header: 'Title', key: 'title', width: 10 },
        { header: 'First Name', key: 'firstName', width: 20 },
        { header: 'Last Name', key: 'lastName', width: 20 },
        { header: 'Date of Birth', key: 'dateOfBirth', width: 15 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Mobile', key: 'mobile', width: 15 },
        { header: 'Postcode', key: 'postcode', width: 12 },
        { header: 'Smoking Status', key: 'smokingStatus', width: 15 },
        { header: 'Coverage Amount (£)', key: 'coverageAmount', width: 18 },
        { header: 'Coverage Period (years)', key: 'coveragePeriod', width: 20 },
        { header: 'Partner Title', key: 'partnerTitle', width: 12 },
        { header: 'Partner First Name', key: 'partnerFirstName', width: 20 },
        { header: 'Partner Last Name', key: 'partnerLastName', width: 20 },
        { header: 'Partner Date of Birth', key: 'partnerDateOfBirth', width: 18 },
        { header: 'Partner Smoking Status', key: 'partnerSmokingStatus', width: 22 },
    ];
    // Style header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF0074C9' },
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    // Add data rows
    quotes.forEach((quote) => {
        worksheet.addRow({
            id: quote.id,
            insuranceType: quote.insuranceType,
            submittedAt: quote.submittedAt.toISOString(),
            title: quote.title,
            firstName: quote.firstName,
            lastName: quote.lastName,
            dateOfBirth: quote.dateOfBirth.toISOString().split('T')[0],
            email: quote.email,
            mobile: quote.mobile,
            postcode: quote.postcode,
            smokingStatus: quote.smokingStatus ? 'Yes' : 'No',
            coverageAmount: quote.coverageAmount,
            coveragePeriod: quote.coveragePeriod,
            partnerTitle: quote.partnerTitle || '',
            partnerFirstName: quote.partnerFirstName || '',
            partnerLastName: quote.partnerLastName || '',
            partnerDateOfBirth: quote.partnerDateOfBirth
                ? quote.partnerDateOfBirth.toISOString().split('T')[0]
                : '',
            partnerSmokingStatus: quote.partnerSmokingStatus === null
                ? ''
                : quote.partnerSmokingStatus
                    ? 'Yes'
                    : 'No',
        });
    });
    // Auto-filter
    worksheet.autoFilter = {
        from: 'A1',
        to: 'R1',
    };
    // Freeze header row
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];
    // Ensure export directory exists
    const exportDir = path_1.default.resolve(env_1.default.files.exportDirectory);
    await promises_1.default.mkdir(exportDir, { recursive: true });
    // Generate filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `quotes_${timestamp}.xlsx`;
    const filePath = path_1.default.join(exportDir, fileName);
    // Write file
    await workbook.xlsx.writeFile(filePath);
    return fileName;
}
/**
 * Get file path for download
 */
function getExportFilePath(fileName) {
    return path_1.default.join(path_1.default.resolve(env_1.default.files.exportDirectory), fileName);
}
/**
 * Check if file exists
 */
async function fileExists(fileName) {
    try {
        const filePath = getExportFilePath(fileName);
        await promises_1.default.access(filePath);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=excelExport.js.map