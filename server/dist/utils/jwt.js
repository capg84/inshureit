"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.decodeToken = decodeToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
/**
 * Generate a JWT token
 */
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_1.default.jwt.secret, {
        expiresIn: env_1.default.jwt.expiresIn,
    });
}
/**
 * Verify and decode a JWT token
 */
function verifyToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, env_1.default.jwt.secret);
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
}
/**
 * Decode a JWT token without verification (for debugging only)
 */
function decodeToken(token) {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=jwt.js.map