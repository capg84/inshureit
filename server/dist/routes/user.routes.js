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
const userController = __importStar(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// All user routes require authentication and admin access
router.use(auth_1.authenticate);
router.use(auth_1.checkPasswordChangeRequired);
router.use(auth_1.requireAdmin);
// Create user
router.post('/', (0, validation_1.validate)([
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('userType').isIn(['BACKOFFICE', 'ADMIN']).withMessage('Invalid user type'),
]), userController.createUser);
// Search users
router.get('/search', userController.searchUsers);
// Get all users
router.get('/', userController.getUsers);
// Get specific user
router.get('/:id', userController.getUser);
// Update user
router.put('/:id', (0, validation_1.validate)([
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('userType').isIn(['BACKOFFICE', 'ADMIN']).withMessage('Invalid user type'),
]), userController.updateUser);
// Deactivate user
router.post('/:id/deactivate', userController.deactivateUser);
// Reset password
router.post('/:id/reset-password', userController.resetPassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map