"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL || '',
    jwt: {
        secret: process.env.JWT_SECRET || 'change-this-secret-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    passwordPolicy: {
        minLength: parseInt(process.env.MIN_PASSWORD_LENGTH || '8', 10),
        requireUppercase: process.env.REQUIRE_UPPERCASE === 'true',
        requireLowercase: process.env.REQUIRE_LOWERCASE === 'true',
        requireNumber: process.env.REQUIRE_NUMBER === 'true',
        requireSpecialChar: process.env.REQUIRE_SPECIAL_CHAR === 'true',
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
    },
    files: {
        exportDirectory: process.env.EXPORT_DIRECTORY || './exports',
        maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB || '10', 10),
    },
};
// Validate required environment variables
if (!config.databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required');
}
if (config.nodeEnv === 'production' && config.jwt.secret === 'change-this-secret-in-production') {
    throw new Error('JWT_SECRET must be set in production environment');
}
exports.default = config;
//# sourceMappingURL=env.js.map