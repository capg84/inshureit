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
declare class EmailService {
    private transporter;
    constructor();
    private initializeTransporter;
    sendQuoteConfirmation(data: QuoteEmailData): Promise<boolean>;
    private generateQuoteConfirmationEmail;
    private generateQuoteConfirmationText;
}
export declare const emailService: EmailService;
export {};
//# sourceMappingURL=email.d.ts.map