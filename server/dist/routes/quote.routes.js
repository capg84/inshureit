"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const quoteController = __importStar(require("../controllers/quote.controller"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Submit quote (public route)
router.post('/', (0, validation_1.validate)([
    (0, express_validator_1.body)('insuranceType').isIn(['SOLO', 'JOINT']).withMessage('Invalid insurance type'),
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('mobile').notEmpty().withMessage('Mobile number is required'),
    (0, express_validator_1.body)('postcode').notEmpty().withMessage('Postcode is required'),
    (0, express_validator_1.body)('smokingStatus').isBoolean().withMessage('Smoking status is required'),
    (0, express_validator_1.body)('coverageAmount').isInt({ min: 30000 }).withMessage('Valid coverage amount is required'),
    (0, express_validator_1.body)('coveragePeriod').isInt({ min: 5, max: 72 }).withMessage('Valid coverage period is required'),
]), quoteController.submitQuote);
// Get all quotes (Backoffice access)
router.get('/', auth_1.authenticate, auth_1.checkPasswordChangeRequired, quoteController.getQuotes);
// Get new quotes (Backoffice access)
router.get('/new', auth_1.authenticate, auth_1.checkPasswordChangeRequired, quoteController.getNewQuotes);
exports.default = router;
//# sourceMappingURL=quote.routes.js.map