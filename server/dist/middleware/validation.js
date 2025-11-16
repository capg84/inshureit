"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = handleValidationErrors;
exports.validate = validate;
const express_validator_1 = require("express-validator");
/**
 * Middleware to handle validation results
 */
function handleValidationErrors(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            error: {
                message: 'Validation failed',
                code: 'VALIDATION_ERROR',
                details: errors.array(),
            },
        });
        return;
    }
    next();
}
/**
 * Helper to run validation chains
 */
function validate(validations) {
    return async (req, res, next) => {
        // Run all validations
        for (const validation of validations) {
            await validation.run(req);
        }
        // Check for errors
        handleValidationErrors(req, res, next);
    };
}
//# sourceMappingURL=validation.js.map